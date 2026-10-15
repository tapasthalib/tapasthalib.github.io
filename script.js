/* =========================================================
   Tapasthali Briddha Ashram — Website Scripts
   Handles: page switching + English/Nepali translation
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. PAGE SWITCHING
     --------------------------------------------------------- */
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');

  function showPage(pageId) {
    pages.forEach(function (page) {
      page.classList.remove('active');
    });

    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    }

    navLinks.forEach(function (link) {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Nav link clicks
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) showPage(pageId);
    });
  });

  // Any element with data-goto (e.g. "Learn more" button)
  const gotoButtons = document.querySelectorAll('[data-goto]');
  gotoButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const pageId = btn.getAttribute('data-goto');
      if (pageId) showPage(pageId);
    });
  });

  /* ---------------------------------------------------------
     2. LANGUAGE TOGGLE (English <-> Nepali)
     --------------------------------------------------------- */
  let currentLang = 'en';
  const langBtn = document.getElementById('langToggle');
  const translatableEls = document.querySelectorAll('[data-en][data-ne]');

  function setLanguage(lang) {
    translatableEls.forEach(function (el) {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    });

    if (lang === 'en') {
      langBtn.textContent = '🇳🇵 नेपाली';
      document.documentElement.lang = 'en';
    } else {
      langBtn.textContent = '🇬🇧 English';
      document.documentElement.lang = 'ne';
    }
  }

  langBtn.addEventListener('click', function () {
    currentLang = (currentLang === 'en') ? 'ne' : 'en';
    setLanguage(currentLang);
  });

  setLanguage('en');

});
