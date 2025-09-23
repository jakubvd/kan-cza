/**
 * Prevents "orphans" (single-letter words left at the end of a line).
 * - Works on elements marked with [data-nbsp].
 * - Replaces normal spaces after single-letter words (a, i, o, u, w, z) with non-breaking spaces.
 * - Skips SCRIPT, STYLE, CODE, PRE.
 * - Optional: join the last 2 words with data-nbsp-last="2".
 */
(function () {
  const ORPHAN_REGEX = /(^|\s)([aiouwzAIUOWZ])\s+(?=\S)/g; // replace " a " → " a&nbsp;"
  const SKIP = new Set(["SCRIPT","STYLE","CODE","PRE"]);

  function processTextNode(node) {
    // Replace spaces after single-letter words with NBSP
    node.nodeValue = node.nodeValue.replace(ORPHAN_REGEX, (_, p1, p2) => `${p1}${p2}\u00A0`);
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE && !SKIP.has(node.nodeName)) {
      // If attribute data-nbsp-last="2" → also join the last 2 words
      const keepLast = node.hasAttribute("data-nbsp-last") ? parseInt(node.getAttribute("data-nbsp-last"), 10) : 0;

      for (let child = node.firstChild; child; child = child.nextSibling) walk(child);

      if (keepLast > 0) joinLastWords(node, keepLast);
    }
  }

  function joinLastWords(el, count) {
    // Join the last `count` spaces between words into NBSP
    const endText = el.textContent;
    if (!endText) return;

    let replaced = endText;
    for (let i = 0; i < count; i++) {
      replaced = replaced.replace(/(\S)\s+(\S+)\s*$/u, (_, a, b) => `${a}\u00A0${b}`);
    }

    if (replaced !== endText) {
      if (el.lastChild && el.lastChild.nodeType === Node.TEXT_NODE) {
        el.lastChild.nodeValue = replaced.slice(endText.length - el.lastChild.nodeValue.length);
      } else {
        el.textContent = replaced;
      }
    }
  }

  function applyNbsp(root = document) {
    root.querySelectorAll("[data-nbsp]").forEach(el => {
      walk(el);
    });
  }

  function observeMutations() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute && node.hasAttribute("data-nbsp")) {
              walk(node);
            }
            // Also check descendants with data-nbsp attribute
            node.querySelectorAll && node.querySelectorAll("[data-nbsp]").forEach(el => walk(el));
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyNbsp();
    observeMutations();
  });
})();