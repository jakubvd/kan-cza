/**
 * text.js — Professional Non-Breaking Space Handler
 * -----------------------------------------------------------------------------
 * Purpose:
 *   This script prevents typographical "orphans" (single-letter words left at the
 *   end of a line) by replacing spaces after specific single-letter words with
 *   non-breaking spaces. It also allows joining the last N words in marked elements.
 *
 * Usage:
 *   1. Add the attribute `data-nbsp` to any HTML element whose text should be processed.
 *   2. Optionally, add `data-nbsp-last="N"` to join the last N words with non-breaking spaces.
 *
 * Parameters:
 *   - [data-nbsp]: Marks elements to process.
 *   - [data-nbsp-last]: (Optional) Number of last words to join with NBSP.
 *
 * Behavior:
 *   - Replaces spaces after single-letter words (a, i, o, u, w, z and their uppercase forms)
 *     with non-breaking spaces (&nbsp;).
 *   - Skips SCRIPT, STYLE, CODE, and PRE elements to avoid interfering with code and styles.
 *   - Optionally joins the last N words using NBSP if data-nbsp-last is set.
 *   - Processes elements on DOMContentLoaded and observes future DOM mutations.
 *
 * Example:
 *   <div data-nbsp data-nbsp-last="2">
 *     This is a test of i o u a orphan prevention.
 *   </div>
 *   // Output: "This is a test of&nbsp;i&nbsp;o&nbsp;u&nbsp;a&nbsp;orphan&nbsp;prevention."
 *
 * -----------------------------------------------------------------------------
 * Author: Jakub Michalak Vision Devs
 * Website: https://visiondevs.pl
 * License: MIT
 */

/**
 * Prevents "orphans" (single-letter words left at the end of a line).
 * - Works on elements marked with [data-nbsp].
 * - Replaces normal spaces after single-letter words (a, i, o, u, w, z) with non-breaking spaces.
 * - Skips SCRIPT, STYLE, CODE, PRE.
 * - Optional: join the last 2 words with data-nbsp-last="2".
 */
(function () {
  // Regular expression to match single-letter words (orphans)
  // Example: " a " → " a&nbsp;"
  const ORPHAN_REGEX = /(^|\s)([aiouwzAIUOWZ])\s+(?=\S)/g;
  // Set of tag names to skip (do not process inside these elements)
  const SKIP = new Set(["SCRIPT", "STYLE", "CODE", "PRE"]);

  /**
   * Processes a single text node, replacing spaces after single-letter words with NBSP.
   * @param {Text} node - The text node to process.
   */
  function processTextNode(node) {
    // Replace spaces after single-letter words with NBSP (Unicode 0xA0)
    node.nodeValue = node.nodeValue.replace(ORPHAN_REGEX, (_, p1, p2) => `${p1}${p2}\u00A0`);
  }

  /**
   * Recursively walks the DOM tree, processing text nodes and handling data-nbsp-last.
   * @param {Node} node - The node to process.
   */
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
      return;
    }
    // Only process element nodes that are not in the SKIP set
    if (node.nodeType === Node.ELEMENT_NODE && !SKIP.has(node.nodeName)) {
      // Check if the element has the data-nbsp-last attribute, and parse its value
      const keepLast = node.hasAttribute("data-nbsp-last") ? parseInt(node.getAttribute("data-nbsp-last"), 10) : 0;

      // Recursively process all child nodes
      for (let child = node.firstChild; child; child = child.nextSibling) walk(child);

      // If keepLast > 0, join the last N words with NBSP
      if (keepLast > 0) joinLastWords(node, keepLast);
    }
  }

  /**
   * Joins the last `count` words in the element's textContent using non-breaking spaces.
   * This prevents line breaks between the last N words.
   * @param {Element} el - The element whose text content to modify.
   * @param {number} count - Number of last words to join.
   */
  function joinLastWords(el, count) {
    // Get the full text content of the element
    const endText = el.textContent;
    if (!endText) return;

    let replaced = endText;
    // For each count, replace the last space between words with NBSP, working right-to-left
    for (let i = 0; i < count; i++) {
      // (\S) - any non-whitespace character (end of word)
      // \s+  - one or more spaces
      // (\S+) - next word (may be more than one character)
      // \s*$ - optional trailing whitespace at end
      replaced = replaced.replace(/(\S)\s+(\S+)\s*$/u, (_, a, b) => `${a}\u00A0${b}`);
    }

    if (replaced !== endText) {
      // If the last child is a text node, update only its value to preserve other nodes
      if (el.lastChild && el.lastChild.nodeType === Node.TEXT_NODE) {
        // Update only the trailing text node part
        el.lastChild.nodeValue = replaced.slice(endText.length - el.lastChild.nodeValue.length);
      } else {
        // Otherwise, replace the entire textContent
        el.textContent = replaced;
      }
    }
  }

  /**
   * Applies NBSP processing to all elements with [data-nbsp] within the given root.
   * @param {Document|Element} [root=document] - The root node to search within.
   */
  function applyNbsp(root = document) {
    // Select all elements with the data-nbsp attribute and process them
    root.querySelectorAll("[data-nbsp]").forEach(el => {
      walk(el);
    });
  }

  /**
   * Observes DOM mutations and applies NBSP processing to newly added nodes with [data-nbsp].
   */
  function observeMutations() {
    // Create a MutationObserver to track added nodes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          // Only process element nodes
          if (node.nodeType === Node.ELEMENT_NODE) {
            // If the node itself has data-nbsp, process it
            if (node.hasAttribute && node.hasAttribute("data-nbsp")) {
              walk(node);
            }
            // Also process all descendants with data-nbsp, if any
            node.querySelectorAll && node.querySelectorAll("[data-nbsp]").forEach(el => walk(el));
          }
        });
      });
    });
    // Observe the document body for new child nodes and subtree changes
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // On DOMContentLoaded, apply NBSP processing and start observing DOM mutations
  document.addEventListener("DOMContentLoaded", () => {
    applyNbsp();
    observeMutations();
  });
})();