// Hamburger toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const leftSidebar = document.getElementById('leftSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

hamburgerBtn.addEventListener('click', () => {
    leftSidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
});
sidebarOverlay.addEventListener('click', () => {
    leftSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
});

// Copy code
function copyCode(btn, codeId) {
    const pre = document.getElementById(codeId);
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
}

// Active TOC on scroll
const sections = document.querySelectorAll('h2[id]');
const tocLinks = document.querySelectorAll('.toc-list li');

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

// Show search label based on width
function updateNav() {
    const label = document.querySelector('.search-label');
    if (label) label.style.display = window.innerWidth > 900 ? 'inline' : 'none';
}
window.addEventListener('resize', updateNav);
updateNav();