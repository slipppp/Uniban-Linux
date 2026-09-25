document.querySelectorAll('a[href$="_URL"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    alert('Este é um link de exemplo. Coloque aqui o endereço real do download.');
  });
});


/* =========================
   LIGHTBOX DA GALERIA
   ========================= */

(function () {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');

  if (!items.length || !lightbox) return;

  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const countEl = document.getElementById('lightboxCount');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;

    const item = items[current];

    img.src = item.dataset.src || item.querySelector('img').src;
    img.alt = item.dataset.title || item.querySelector('img').alt || '';

    titleEl.textContent = item.dataset.title || '';
    countEl.textContent = (current + 1) + ' / ' + items.length;
  }

  function open(index) {
    show(index);

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(current - 1));
  btnNext.addEventListener('click', () => show(current + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();


/* =========================
   SIDEBAR DA DOCUMENTAÇÃO
   ========================= */

(function () {
  const sidebar = document.getElementById('docsSidebar');

  if (!sidebar) return;

  const collapseBtn = document.getElementById('docsCollapseBtn');
  const collapseIcon = document.getElementById('docsCollapseIcon');
  const mobileToggle = document.getElementById('docsMobileToggle');
  const overlay = document.getElementById('docsOverlay');
  const links = Array.from(sidebar.querySelectorAll('nav a'));

  const isMobile = () => window.matchMedia('(max-width: 850px)').matches;

  // recolher/expandir (desktop)
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('collapsed');

      collapseIcon.classList.toggle('fa-angles-left', !collapsed);
      collapseIcon.classList.toggle('fa-angles-right', collapsed);
    });
  }

  // gaveta (celular)
  function openMobile() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobile() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.contains('mobile-open') ? closeMobile() : openMobile();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobile);
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobile()) closeMobile();
    });
  });

  // destaca o link da seção visível (scrollspy)
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = '#' + entry.target.id;

          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
