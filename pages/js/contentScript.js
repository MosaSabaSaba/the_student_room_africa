// Hamburger toggle (guarded — not every page has this sidebar)
const hamburgerBtn = document.getElementById('hamburgerBtn');
const leftSidebar = document.getElementById('leftSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (hamburgerBtn && leftSidebar && sidebarOverlay) {
    hamburgerBtn.addEventListener('click', () => {
        leftSidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });
    sidebarOverlay.addEventListener('click', () => {
        leftSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });
}

// Copy code
function copyCode(btn, codeId) {
    const pre = document.getElementById(codeId);
    if (!pre) return;
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
}

// Active TOC on scroll (guarded — only runs on pages that have a TOC)
const sections = document.querySelectorAll('h2[id]');
const tocLinks = document.querySelectorAll('.toc-list li');

if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(li => li.classList.remove('active'));
            const id = entry.target.id;
            document.querySelectorAll(`.toc-list li a[href="#${id}"]`).forEach(a => {
              a.closest('li').classList.add('active');
            });
          }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
}

// Show search label based on width (desktop-only search button)
function updateNav() {
    const label = document.querySelector('.search-label');
    if (label) label.style.display = window.innerWidth > 900 ? 'inline' : 'none';
}
window.addEventListener('resize', updateNav);
updateNav();


/* ═══════════════════════════════════════════════════════════════
   MOBILE APP NAVIGATION (WhatsApp-style)
   Added by Claude.

   This builds two things and inserts them into every page that
   loads this script:
     1. A bottom tab bar with your 4 main features
     2. A search bar row under the top nav (mobile only)

   Both are hidden on desktop by CSS (see contentStyles.css), so
   this is safe to include everywhere without affecting the
   desktop layout.

   IMPORTANT — path depth:
   Your site uses relative links (e.g. "pages/lesotho/tracker.html"),
   so a page's distance from the site root changes what the links
   need to look like. Tell this script how deep the current page is
   by adding a `data-root` attribute to <body>:

     <body>                          → for index.html (site root)
     <body data-root="../../">       → for pages/lesotho/tracker.html
     <body data-root="../../../">    → for pages/lesotho/questionBank/question-bank.html

   If you don't add the attribute, ROOT defaults to "" (root-level).
═══════════════════════════════════════════════════════════════ */
(function () {
    const ROOT = document.body.getAttribute('data-root') || '';

    // Edit hrefs/labels/match keywords here if your file names change,
    // or if you add more pages under a given feature.
    const NAV_ITEMS = [
        {
            label: 'Study Guides',
            href: ROOT + 'pages/lesotho/conversions.html',
            match: ['conversions', 'interest', 'linear-equations', 'functions', 'lgcse'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.64-2.58-1-4-1-2.52 0-5.1.8-7 2-1.9-1.2-4.48-2-7-2-1.42 0-2.89.36-4 1v15c1.11-.64 2.58-1 4-1 2.52 0 5.1.8 7 2 1.9-1.2 4.48-2 7-2 1.42 0 2.89.36 4 1V5zm-2 13c-1.2-.5-2.61-.7-4-.7-2.52 0-5.1.8-7 2V7c1.9-1.2 4.48-2 7-2 1.39 0 2.8.2 4 .7v12z"/></svg>'
        },
        {
            label: 'Tracker',
            href: ROOT + 'pages/lesotho/tracker.html',
            match: ['tracker'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>'
        },
        {
            label: 'Question Bank',
            href: ROOT + 'pages/lesotho/questionBank/question-bank.html',
            match: ['question-bank', 'questionbank'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 11h-2v-2h2v2zm1.07-5.75c-.32.46-.77.71-1.16 1.05-.44.38-.91.83-.91 1.7h-2c0-1.44.62-1.97 1.16-2.42.36-.31.68-.58.89-.92.22-.34.35-.78.35-1.16 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5H7c0-2.48 2.02-4.5 4.5-4.5S16 4.02 16 6.5c0 .73-.25 1.35-.93 1.75z"/></svg>'
        },
        {
            label: 'Past Papers',
            href: ROOT + 'pages/lesotho/tracker.html#past-papers',
            match: ['past-paper'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'
        }
    ];

    function buildBottomNav() {
        if (document.querySelector('.bottom-nav')) return;

        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();

        let activeIndex = -1;
        if (hash === '#past-papers') {
            activeIndex = 3;
        } else {
            outer:
            for (let i = 0; i < NAV_ITEMS.length; i++) {
                for (const key of NAV_ITEMS[i].match) {
                    if (path.indexOf(key) !== -1) { activeIndex = i; break outer; }
                }
            }
        }

        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.setAttribute('aria-label', 'Main sections');

        const inner = document.createElement('div');
        inner.className = 'bottom-nav-inner';

        NAV_ITEMS.forEach((item, index) => {
            const a = document.createElement('a');
            a.className = 'bottom-nav-item' + (index === activeIndex ? ' active' : '');
            a.href = item.href;
            a.innerHTML = item.icon + '<span class="nav-label">' + item.label + '</span>';
            inner.appendChild(a);
        });

        nav.appendChild(inner);
        document.body.appendChild(nav);
        document.body.classList.add('has-bottom-nav');
    }

    function buildMobileSearchBar() {
        if (document.querySelector('.mobile-search-row')) return;

        const topNav = document.querySelector('.top-nav');
        if (!topNav) return;

        const row = document.createElement('div');
        row.className = 'mobile-search-row';
        row.innerHTML =
            '<div class="mobile-search-wrap">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                '<input type="text" class="mobile-search-input" placeholder="Search topics..." aria-label="Search">' +
            '</div>';

        topNav.insertAdjacentElement('afterend', row);

        // Hook: listen for this event anywhere else in your app to wire
        // up real search results, or swap this for a redirect to a
        // dedicated search page.
        const input = row.querySelector('.mobile-search-input');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                document.dispatchEvent(new CustomEvent('site:search', {
                    detail: { query: input.value.trim() }
                }));
            }
        });
    }

    buildBottomNav();
    buildMobileSearchBar();
})();
