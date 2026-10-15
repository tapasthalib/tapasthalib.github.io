/* =========================================================
   Tapasthali Briddha Ashram — Website Scripts
   Handles: page switching + English/Nepali translation
   ========================================================= */

// Wait until the HTML is fully loaded before running any code
document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. PAGE SWITCHING
     --------------------------------------------------------- */
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');

  function showPage(pageId) {
    // Hide every page
    pages.forEach(function (page) {
      page.classList.remove('active');
    });

    // Show the page with matching id
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    }

    // Update the "active" class on the nav links
    navLinks.forEach(function (link) {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Attach click handler to every nav link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) showPage(pageId);
    });
  });

  // Attach click handler to any element with data-goto (like the "Learn more" button)
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
  let currentLang = 'en'; // start in English

  const langBtn = document.getElementById('langToggle');

  // Every element that has data-en and data-ne will be translated
  const translatableEls = document.querySelectorAll('[data-en][data-ne]');

  function setLanguage(lang) {
    translatableEls.forEach(function (el) {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        // If the element is a form input/textarea, change placeholder
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', text);
        } else {
          el.textContent = text;
        }
      }
    });

    // Update the button label to show what you can switch TO
    if (lang === 'en') {
      langBtn.textContent = '🇳🇵 नेपाली';
      document.documentElement.lang = 'en';
    } else {
      langBtn.textContent = '🇬🇧 English';
      document.documentElement.lang = 'ne';
    }
  }

  // Toggle on button click
  langBtn.addEventListener('click', function () {
    currentLang = (currentLang === 'en') ? 'ne' : 'en';
    setLanguage(currentLang);
  });

  // Make sure everything starts in English
  setLanguage('en');

});
