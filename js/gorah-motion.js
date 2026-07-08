/* GORAH — reveal on scroll. Additivo e sicuro: se JS non c'è, nulla viene nascosto. */
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var SELECTORS = [
    '.grid-item',
    '.title-section',
    '.services-text',
    '.contact-form',
    '.clients-container',
    '.work-image-wrapper',
    '.text-line',
    '.container-50w',
    '.image-wrapper-hero-about'
  ];

  var candidates = document.querySelectorAll(SELECTORS.join(','));
  var targets = [];
  candidates.forEach(function (el) {
    // non interferire con le animazioni Webflow (ix2) e col menu
    if (el.closest('[data-w-id]') || el.closest('.header-screen')) return;
    targets.push(el);
  });
  if (!targets.length) return;

  // stagger: ritardo crescente tra fratelli nello stesso contenitore
  var byParent = new Map();
  targets.forEach(function (el) {
    var p = el.parentElement;
    var n = byParent.get(p) || 0;
    el.style.transitionDelay = Math.min(n * 70, 350) + 'ms';
    byParent.set(p, n + 1);
    el.classList.add('gr-reveal');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('gr-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  targets.forEach(function (el) {
    // elementi già in viewport al load: mostra subito senza scatto
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
      requestAnimationFrame(function () { el.classList.add('gr-in'); });
      return;
    }
    io.observe(el);
  });
})();
