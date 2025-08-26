  (function () {
    // Dodaj klasę po gotowości obu rodzin
    Promise.all([
      document.fonts.load('1em Inter'),
      document.fonts.load('700 1em FrankRuhlLibre')
    ]).then(function () {
      document.documentElement.classList.add('fonts-ready');
    });
  })();
