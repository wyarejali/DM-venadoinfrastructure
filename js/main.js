/* ==========================================================================
   VENADO INFRASTRUCTURE — main.js
   Vanilla, no dependencies, no build step. Same construction as the Venado
   Commercial and Venado Restoration builds.

   1. Header scroll state + scroll progress
   2. Mobile navigation drawer
   3. Active section tracking in the nav
   4. Reveal on scroll
   5. Bid invitation form (front-end only, no endpoint wired yet)
   6. Footer year
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------ 1. HEADER STATE + SCROLL PROGRESS ------------------- */
  var header = document.getElementById('header');
  var progress = document.getElementById('progress');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-stuck', y > 24);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* --------------------------- 2. MOBILE NAV ------------------------------ */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!burger || !nav) return;
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('is-locked');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    });

    // Any link closes the drawer, including the bid CTA.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1160) closeNav();
    });
  }

  /* --------------------- 3. ACTIVE SECTION IN THE NAV --------------------- */
  /* Each nav item points at a section; the last one past the header wins. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link[data-nav]'));
  var watched = navLinks
    .map(function (link) {
      var el = document.getElementById(link.getAttribute('href').slice(1));
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (watched.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function () {
      var offset = (header ? header.offsetHeight : 80) + 40;
      var current = null;

      watched.forEach(function (item) {
        if (item.el.getBoundingClientRect().top - offset <= 0) current = item;
      });

      watched.forEach(function (item) {
        item.link.classList.toggle('is-active', item === current);
      });
    }, { rootMargin: '-25% 0px -70% 0px', threshold: 0 });

    watched.forEach(function (item) { spy.observe(item.el); });
  }

  /* -------------------------- 4. REVEAL ON SCROLL ------------------------- */
  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ----------------------- 5. BID INVITATION FORM ------------------------- */
  /* Front-end validation only. There is no endpoint in the design build —
     hook this to the WordPress form handler during conversion. The rules
     match what an estimator actually needs in order to act on an invitation:
     a company, a working email, and a project to look at. */
  var form = document.getElementById('bid-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var company = form.querySelector('[name="company"]');
      var email = form.querySelector('[name="email"]');
      var project = form.querySelector('[name="project"]');

      var missing = null;
      if (company.value.trim() === '') missing = company;
      else if (!/\S+@\S+\.\S+/.test(email.value)) missing = email;
      else if (project.value.trim() === '') missing = project;

      if (missing) {
        note.textContent = 'We need a company, a working email and the project to bid.';
        note.classList.remove('is-ok');
        note.classList.add('is-err');
        missing.focus();
        return;
      }

      note.textContent = 'Received. We will confirm whether we are bidding this one.';
      note.classList.remove('is-err');
      note.classList.add('is-ok');
      form.reset();
    });
  }

  /* ----------------------------- 6. YEAR ---------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

})();
