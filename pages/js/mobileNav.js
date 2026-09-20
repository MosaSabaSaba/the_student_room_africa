/* ═══════════════════════════════════════════════════════════════
   mobileNav.js
   WhatsApp-style mobile navigation for CONTENT PAGES ONLY.
   ═══════════════════════════════════════════════════════════════ */
(function () {
    const ROOT = document.body.getAttribute('data-root') || '';

    const NAV_ITEMS = [
        {
            label: 'Study Guides',
            href: ROOT + 'pages/lesotho/conversions.html',
            bodyClass: 'nav-study-guides',
            match: ['conversions', 'interest', 'linear-equations', 'functions', 'lgcse'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.64-2.58-1-4-1-2.52 0-5.1.8-7 2-1.9-1.2-4.48-2-7-2-1.42 0-2.89.36-4 1v15c1.11-.64 2.58-1 4-1 2.52 0 5.1.8 7 2 1.9-1.2 4.48-2 7-2 1.42 0 2.89.36 4 1V5zm-2 13c-1.2-.5-2.61-.7-4-.7-2.52 0-5.1.8-7 2V7c1.9-1.2 4.48-2 7-2 1.39 0 2.8.2 4 .7v12z"/></svg>'
        },
        {
            label: 'Tracker',
            href: ROOT + 'pages/lesotho/tracker.html',
            bodyClass: 'nav-tracker',
            match: ['tracker'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>'
        },
        {
            label: 'Question Bank',
            href: ROOT + 'pages/lesotho/questionBank/question-bank.html',
            bodyClass: 'nav-question-bank',
            match: ['question-bank', 'questionbank'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5.5 11h-2v-2h2v2zm1.07-5.75c-.32.46-.77.71-1.16 1.05-.44.38-.91.83-.91 1.7h-2c0-1.44.62-1.97 1.16-2.42.36-.31.68-.58.89-.92.22-.34.35-.78.35-1.16 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5h-2c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 .73-.25 1.35-.93 1.75z"/></svg>'
        },
        {
            label: 'Past Papers',
            href: ROOT + 'pages/lesotho/past-papers.html',
            bodyClass: 'nav-past-papers',
            match: ['past-paper'],
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'
        }
    ];

    function detectActiveIndex() {
        for (let i = 0; i < NAV_ITEMS.length; i++) {
            const cls = NAV_ITEMS[i].bodyClass;
            if (cls && document.body.classList.contains(cls)) return i;
        }

        const path = window.location.pathname.toLowerCase();
        const fallbackOrder = [2, 1, 3, 0];
        for (const i of fallbackOrder) {
            for (const key of NAV_ITEMS[i].match) {
                if (path.indexOf(key) !== -1) return i;
            }
        }
        return -1;
    }

    function buildBottomNav() {
        if (document.querySelector('.bottom-nav')) return;

        const activeIndex = detectActiveIndex();

        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.setAttribute('aria-label', 'Main sections');

        const inner = document.createElement('div');
        inner.className = 'bottom-nav-inner';

        NAV_ITEMS.forEach((item, index) => {
            const a = document.createElement('a');
            a.className = 'bottom-nav-item' + (index === activeIndex ? ' active' : '');
            a.href = item.href;
            a.innerHTML = '<span class="nav-icon">' + item.icon + '</span><span class="nav-label">' + item.label + '</span>';
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
        // Use Pagefind's trigger on mobile too — same modal as desktop
        row.innerHTML = '<pagefind-modal-trigger aria-label="Search"></pagefind-modal-trigger>';

        topNav.insertAdjacentElement('afterend', row);
    }

    function restyleHamburgerIcon() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        if (!hamburgerBtn) return;

        hamburgerBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" stroke-linejoin="round">' +
                '<rect x="3" y="4" width="18" height="16" rx="2"/>' +
                '<line x1="9" y1="4" x2="9" y2="20"/>' +
                '<line x1="5.5" y1="8" x2="6.5" y2="8"/>' +
                '<line x1="5.5" y1="11.5" x2="6.5" y2="11.5"/>' +
                '<line x1="5.5" y1="15" x2="6.5" y2="15"/>' +
            '</svg>';
        hamburgerBtn.setAttribute('aria-label', 'Open topics menu');
    }

    buildBottomNav();
    buildMobileSearchBar();
    restyleHamburgerIcon();
})();