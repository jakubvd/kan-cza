document.addEventListener('DOMContentLoaded', function () {
  // Wybieramy wszystkie liczniki w hero
  const counters = document.querySelectorAll('.home-hero_stats-number');

  if (!counters.length) return;

  // Sprawdzamy prefers-reduced-motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Funkcja: parsuje tekst typu "+100%" na { prefix: "+", value: 100, suffix: "%" }
  function parseNumberText(text) {
    const trimmed = text.trim();
    const match = trimmed.match(/^([^0-9\-+]*)([-+]?\d+)(.*)$/);

    if (!match) {
      return {
        prefix: '',
        value: 0,
        suffix: '',
      };
    }

    return {
      prefix: match[1] || '',
      value: parseInt(match[2], 10) || 0,
      suffix: match[3] || '',
    };
  }

  // Vanilla fallback (bez GSAP) – płynna animacja liczby
  function animateNumberVanilla(el, from, to, duration, prefix, suffix) {
    const start = performance.now();
    const diff = to - from;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      // delikatne ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + diff * eased);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  // Główna funkcja odpalająca animację dla jednego elementu
  function runCounter(el) {
    const originalText = el.textContent;
    const { prefix, value, suffix } = parseNumberText(originalText);

    // Jeśli coś poszło nie tak z parsowaniem, nie kombinujemy
    if (!Number.isFinite(value)) return;

    // Jeśli użytkownik ma wyłączone animacje – ustawiamy od razu wynik
    if (reduceMotion) {
      el.textContent = prefix + value + suffix;
      return;
    }

    const duration = 2000; // czas animacji w ms (2s)

    // GSAP wersja
    if (window.gsap) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: duration / 1000, // GSAP liczy w sekundach
        ease: 'power3.out',
        onUpdate: function () {
          el.textContent = prefix + Math.round(obj.val) + suffix;
        },
      });
    } else {
      // Vanilla fallback
      animateNumberVanilla(el, 0, value, duration, prefix, suffix);
    }
  }

  // IntersectionObserver – odpalamy licznik, gdy wejdzie w viewport
  const observerOptions = {
    root: null,
    threshold: 0.45, // ok. 45% elementu w viewport
  };

  const seen = new WeakSet();

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        runCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(function (el) {
    observer.observe(el);
  });
});