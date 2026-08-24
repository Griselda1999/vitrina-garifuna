/**
 * EMPRENDIMIENTO GARÍFUNA — Aplicación principal
 * JavaScript vanilla — Demo / prototipo visual
 */

(function () {
  'use strict';

  let currentFilter = 'all';
  const IMPACT_VISIBLE = 4;
  let impactExpanded = false;
  let carouselIndex = 0;
  let carouselSlidesPerView = 3;
  let carouselFilteredList = [];
  let carouselAutoTimer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const mainContent = document.getElementById('mainContent');
  const profileView = document.getElementById('profileView');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalClose = document.getElementById('modalClose');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupHeroBanner();
    populateCategorySelect();
    renderCategories();
    renderStats();
    renderProductOfMonth();
    renderImpactStats();
    setupImpactToggle();
    renderEvents();
    renderEntrepreneursCarousel();
    setupEventListeners();
    setupScrollAnimations();
    updateCarouselSlidesPerView();
    window.addEventListener('resize', debounce(handleCarouselResize, 200));
    requestAnimationFrame(() => {
      requestAnimationFrame(startCarouselAutoPlay);
    });
  }

  function setupHeroBanner() {
    const banner = document.getElementById('heroBanner');
    const hero = document.querySelector('.hero');
    if (!banner || !hero) return;
    banner.addEventListener('error', () => {
      hero.classList.add('hero-fallback');
      banner.style.display = 'none';
    });
  }

  function populateCategorySelect() {
    const select = document.getElementById('filterCategory');
    if (!select) return;
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      select.appendChild(opt);
    });
  }

  function setupEventListeners() {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });

    hamburger.addEventListener('click', toggleMobileMenu);
    navMobile.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenuIfOpen);
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.querySelectorAll('[data-scroll]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(el.getAttribute('data-scroll'));
        if (target) {
          closeMobileMenuIfOpen();
          scrollToElement(target);
        }
      });
    });

    bindPlaceholders(document);

    document.getElementById('headerUser')?.addEventListener('click', () => {
      showModal('Inicio de sesión', 'El sistema de autenticación estará disponible próximamente.');
    });

    document.getElementById('heroCta')?.addEventListener('click', () => {
      scrollToElement(document.getElementById('emprendedores'));
    });

    document.querySelectorAll('#registerBtn, .register-btn-secondary').forEach(btn => {
      btn.addEventListener('click', handleRegister);
    });

    document.getElementById('searchInput')?.addEventListener('input', applySearchFilter);
    document.getElementById('filterCategory')?.addEventListener('change', applySearchFilter);
    document.querySelector('.search-submit')?.addEventListener('click', applySearchFilter);
    document.getElementById('clearFilters')?.addEventListener('click', clearAllFilters);

    document.getElementById('carouselPrev')?.addEventListener('click', () => moveCarousel(-1));
    document.getElementById('carouselNext')?.addEventListener('click', () => moveCarousel(1));
    document.getElementById('viewAllEntrepreneurs')?.addEventListener('click', openEntrepreneursModal);
    document.getElementById('entrepreneursModalClose')?.addEventListener('click', closeEntrepreneursModal);
    document.getElementById('entrepreneursModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'entrepreneursModal') closeEntrepreneursModal();
    });

    const carouselTrack = document.getElementById('carouselTrack');
    if (carouselTrack) {
      carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchStartX - touchEndX) > 50) {
          moveCarousel(touchStartX > touchEndX ? 1 : -1);
        }
      }, { passive: true });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopCarouselAutoPlay();
      else startCarouselAutoPlay();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeEntrepreneursModal();
        closeMobileMenuIfOpen();
      }
    });
  }

  function bindPlaceholders(root) {
    root.querySelectorAll('[data-placeholder]').forEach(el => {
      if (el._placeholderBound) return;
      el._placeholderBound = true;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('Próximamente', el.getAttribute('data-placeholder') || 'Esta función estará disponible próximamente.');
      });
    });
  }

  function handleRegister() {
    if (GOOGLE_FORMS_URL.includes('PLACEHOLDER')) {
      showModal('Registro de emprendedores', 'El formulario de registro se conectará próximamente.');
    } else {
      window.open(GOOGLE_FORMS_URL, '_blank');
    }
  }

  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => `
      <div class="category-card fade-in" data-category="${cat.id}" role="button" tabindex="0">
        <div class="category-icon" style="background-color:${cat.color}">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <span class="category-name">${cat.label || cat.name}</span>
      </div>
    `).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      const go = () => {
        const category = card.getAttribute('data-category');
        filterEntrepreneurs(category);
        scrollToElement(document.getElementById('emprendedores'));
      };
      card.addEventListener('click', go);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }

  function renderStats() {
    const grid = document.getElementById('statsGrid');
    if (!grid) return;
    grid.innerHTML = STATS.map(s => `
      <div class="stat-card fade-in">
        <div class="stat-card-icon" style="color:${s.color}; background:${s.color}18">
          <i class="fa-solid ${s.icon}"></i>
        </div>
        <div class="stat-card-value">${s.value}</div>
        <div class="stat-card-label">${s.label}</div>
      </div>
    `).join('');
  }

  function renderProductOfMonth() {
    const el = document.getElementById('productOfMonth');
    if (!el) return;
    const p = PRODUCT_OF_MONTH;
    el.innerHTML = `
      <h3 class="feature-title">
        <span class="feature-title-icon feature-title-icon-gold"><i class="fa-solid fa-star"></i></span>
        Producto Garífuna del Mes
      </h3>
      <div class="product-card-body">
        <div class="product-card-image">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product-card-info">
          <h4>${p.title}</h4>
          <p class="product-desc">${p.description}</p>
          <hr class="product-divider">
          <p class="product-maker">Por: ${p.maker}</p>
          <p class="product-location"><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
          <p class="product-price">${p.price}</p>
          <div class="product-actions">
            <button class="btn btn-green btn-sm" data-placeholder="Catálogo de productos estará disponible próximamente.">Ver producto</button>
            <button class="entrepreneur-card-whatsapp" data-placeholder="WhatsApp estará disponible próximamente." aria-label="WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    bindPlaceholders(el);
  }

  function renderImpactStats() {
    const list = document.getElementById('impactList');
    const toggle = document.getElementById('impactToggle');
    if (!list) return;

    list.innerHTML = IMPACT_STATS.map((s, i) => `
      <li class="impact-item${i >= IMPACT_VISIBLE ? ' impact-item-extra' : ''}">
        <div class="impact-item-left">
          <div class="impact-icon"><i class="${s.icon.startsWith('fa-brands') ? s.icon : 'fa-solid ' + s.icon}"></i></div>
          <span class="impact-label">${s.label}</span>
        </div>
        <span class="impact-value">${s.value}</span>
      </li>
    `).join('');

    if (toggle) {
      const hasMore = IMPACT_STATS.length > IMPACT_VISIBLE;
      toggle.hidden = !hasMore;
      toggle.setAttribute('aria-expanded', 'false');
      updateImpactToggleLabel();
    }
    impactExpanded = false;
    updateImpactVisibility();
  }

  function setupImpactToggle() {
    document.getElementById('impactToggle')?.addEventListener('click', () => {
      impactExpanded = !impactExpanded;
      updateImpactVisibility();
      updateImpactToggleLabel();
    });
  }

  function updateImpactVisibility() {
    document.querySelectorAll('.impact-item-extra').forEach(item => {
      item.classList.toggle('impact-item-hidden', !impactExpanded);
    });
    document.getElementById('impactToggle')?.setAttribute('aria-expanded', String(impactExpanded));
  }

  function updateImpactToggleLabel() {
    const toggle = document.getElementById('impactToggle');
    if (!toggle) return;
    toggle.innerHTML = impactExpanded
      ? 'Ver menos <i class="fa-solid fa-chevron-up"></i>'
      : 'Ver más <i class="fa-solid fa-chevron-down"></i>';
  }

  function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    grid.innerHTML = EVENTS.map(ev => `
      <article class="event-card fade-in">
        <div class="event-date" style="background:${ev.color}">
          <span class="event-date-day">${ev.day}</span>
          <span class="event-date-month">${ev.month}</span>
        </div>
        <div class="event-body">
          <h4>${ev.title}</h4>
          <p class="event-meta"><i class="fa-solid fa-location-dot"></i> ${ev.location}</p>
          <p class="event-meta"><i class="fa-solid fa-clock"></i> ${ev.detail}</p>
          <a href="#" class="event-cta" data-placeholder="Inscripciones estarán disponibles próximamente.">${ev.cta} <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>
    `).join('');
    bindPlaceholders(grid);
  }

  function createEntrepreneurCard(entrepreneur) {
    const badgeColor = getCategoryColor(entrepreneur.category);
    return `
      <article class="entrepreneur-card" data-id="${entrepreneur.id}" data-category="${entrepreneur.category}" data-name="${entrepreneur.name.toLowerCase()}">
        <div class="entrepreneur-card-image">
          <img src="${entrepreneur.image}" alt="${entrepreneur.name}" loading="lazy">
          <span class="entrepreneur-card-badge" style="background:${badgeColor}">${entrepreneur.categoryLabel}</span>
        </div>
        <div class="entrepreneur-card-body">
          <h3 class="entrepreneur-card-name">${entrepreneur.name}</h3>
          <p class="entrepreneur-card-location"><i class="fa-solid fa-location-dot"></i> ${entrepreneur.location}</p>
          <p class="entrepreneur-card-desc">${entrepreneur.shortDescription}</p>
          <div class="entrepreneur-card-actions">
            <button class="btn btn-profile btn-sm view-profile-btn" data-id="${entrepreneur.id}">
              Ver perfil <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button class="entrepreneur-card-whatsapp" aria-label="WhatsApp" data-name="${entrepreneur.name}">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function attachCardEvents(container) {
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => showProfile(parseInt(btn.getAttribute('data-id'))));
    });
    container.querySelectorAll('.entrepreneur-card-whatsapp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showModal('WhatsApp', `Contacto demo para "${btn.getAttribute('data-name') || 'este emprendimiento'}". Próximamente disponible.`);
      });
    });
  }

  function getFilteredEntrepreneurs() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const category = document.getElementById('filterCategory')?.value || currentFilter;

    return ENTREPRENEURS.filter(e => {
      const name = e.name.toLowerCase();
      const owner = (e.ownerName || '').toLowerCase();
      const cat = e.category;
      const matchQuery = !query || name.includes(query) || owner.includes(query) || cat.includes(query);
      const matchCat = !category || category === 'all' || cat === category;
      return matchQuery && matchCat;
    });
  }

  function renderEntrepreneursCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    carouselFilteredList = getFilteredEntrepreneurs();

    if (!carouselFilteredList.length) {
      track.innerHTML = '<div class="carousel-empty"><i class="fa-solid fa-search"></i><p>No se encontraron emprendimientos.</p></div>';
      renderCarouselDots(0);
      updateCarousel();
      return;
    }

    track.innerHTML = carouselFilteredList.map(e =>
      `<div class="carousel-slide">${createEntrepreneurCard(e)}</div>`
    ).join('');
    attachCardEvents(track);
    renderCarouselDots(carouselFilteredList.length);
    updateCarousel();
    startCarouselAutoPlay();
  }

  function renderCarouselDots(total) {
    const dots = document.getElementById('carouselDots');
    if (!dots) return;
    const maxDots = Math.max(1, total - carouselSlidesPerView + 1);
    if (total === 0) {
      dots.innerHTML = '';
      return;
    }
    dots.innerHTML = Array.from({ length: maxDots }, (_, i) =>
      `<button type="button" class="carousel-dot ${i === carouselIndex ? 'active' : ''}" data-index="${i}" aria-label="Grupo ${i + 1}"></button>`
    ).join('');
    dots.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        carouselIndex = parseInt(dot.getAttribute('data-index'), 10);
        updateCarousel();
        resetCarouselAutoPlay();
      });
    });
  }

  function moveCarousel(direction) {
    const maxIndex = Math.max(0, carouselFilteredList.length - carouselSlidesPerView);
    carouselIndex = Math.max(0, Math.min(carouselIndex + direction, maxIndex));
    updateCarousel();
    resetCarouselAutoPlay();
  }

  function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = track?.querySelectorAll('.carousel-slide');
    if (!slides?.length) {
      document.getElementById('carouselPrev')?.setAttribute('disabled', 'disabled');
      document.getElementById('carouselNext')?.setAttribute('disabled', 'disabled');
      return;
    }

    const gap = parseInt(getComputedStyle(track).gap, 10) || 20;
    const offset = carouselIndex * (slides[0].offsetWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === carouselIndex);
    });

    const maxIndex = Math.max(0, carouselFilteredList.length - carouselSlidesPerView);
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (prevBtn) prevBtn.disabled = carouselIndex === 0;
    if (nextBtn) nextBtn.disabled = carouselIndex >= maxIndex;
  }

  function updateCarouselSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 768) carouselSlidesPerView = 1;
    else if (w <= 1024) carouselSlidesPerView = 2;
    else carouselSlidesPerView = 3;

    const maxIndex = Math.max(0, carouselFilteredList.length - carouselSlidesPerView);
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;

    renderCarouselDots(carouselFilteredList.length);
    updateCarousel();
  }

  function handleCarouselResize() {
    updateCarouselSlidesPerView();
  }

  function startCarouselAutoPlay() {
    if (document.getElementById('entrepreneursModal')?.classList.contains('open')) return;
    if (profileView?.classList.contains('active')) return;

    stopCarouselAutoPlay();
    carouselAutoTimer = setInterval(() => {
      const maxIndex = Math.max(0, carouselFilteredList.length - carouselSlidesPerView);
      if (maxIndex <= 0) return;
      carouselIndex = carouselIndex >= maxIndex ? 0 : carouselIndex + 1;
      updateCarousel();
    }, 4000);
  }

  function stopCarouselAutoPlay() {
    if (carouselAutoTimer) {
      clearInterval(carouselAutoTimer);
      carouselAutoTimer = null;
    }
  }

  function resetCarouselAutoPlay() {
    stopCarouselAutoPlay();
    startCarouselAutoPlay();
  }

  function openEntrepreneursModal() {
    const modal = document.getElementById('entrepreneursModal');
    const grid = document.getElementById('entrepreneursModalGrid');
    if (!modal || !grid) return;

    const list = getFilteredEntrepreneurs();
    grid.innerHTML = list.length
      ? list.map(e => createEntrepreneurCard(e)).join('')
      : '<div class="no-results"><i class="fa-solid fa-search"></i><p>No se encontraron emprendimientos.</p></div>';
    attachCardEvents(grid);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    stopCarouselAutoPlay();
  }

  function closeEntrepreneursModal() {
    const modal = document.getElementById('entrepreneursModal');
    if (!modal?.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    startCarouselAutoPlay();
  }

  function filterEntrepreneurs(category) {
    currentFilter = category;
    const catSelect = document.getElementById('filterCategory');
    if (catSelect) catSelect.value = category === 'all' ? '' : category;
    applySearchFilter();
  }

  function applySearchFilter() {
    carouselIndex = 0;
    renderEntrepreneursCarousel();
  }

  function clearAllFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterLocation').value = '';
    document.getElementById('filterProduct').value = '';
    document.getElementById('filterMunicipio').value = '';
    currentFilter = 'all';
    applySearchFilter();
  }

  function showProfile(id) {
    closeEntrepreneursModal();
    const entrepreneur = ENTREPRENEURS.find(e => e.id === id);
    if (!entrepreneur) return;

    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = `
      <div class="profile-hero">
        <img src="${entrepreneur.image}" alt="${entrepreneur.name}">
        <div class="profile-hero-overlay"></div>
        <div class="profile-hero-content">
          <div class="container">
            <button class="profile-back" id="profileBack"><i class="fa-solid fa-arrow-left"></i> Volver</button>
            <h1 class="profile-name">${entrepreneur.name}</h1>
            ${entrepreneur.ownerName ? `<p class="profile-owner">${entrepreneur.ownerName}</p>` : ''}
            <div class="profile-meta">
              <span><i class="fa-solid fa-tag"></i> ${entrepreneur.categoryLabel}</span>
              <span><i class="fa-solid fa-location-dot"></i> ${entrepreneur.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-body">
        <div class="container">
          <div class="profile-grid">
            <div class="profile-main">
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Sobre el emprendimiento</h2>
                <p>${entrepreneur.description}</p>
              </div>
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Historia</h2>
                <p>${entrepreneur.history}</p>
              </div>
              ${entrepreneur.significance ? `
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Significado para la comunidad</h2>
                <p>${entrepreneur.significance}</p>
              </div>` : ''}
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Productos</h2>
                <div class="profile-products">${entrepreneur.products.map(p => `<span class="product-tag">${p}</span>`).join('')}</div>
              </div>
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Galería</h2>
                <div class="profile-gallery">${entrepreneur.gallery.map(img => `<img src="${img}" alt="Galería" class="gallery-img" loading="lazy">`).join('')}</div>
              </div>
            </div>
            <div class="profile-sidebar">
              <div class="profile-contact-card fade-in">
                <h3>Contacto</h3>
                <div class="contact-item"><i class="fa-solid fa-phone"></i><span>${entrepreneur.contact.phone}</span></div>
                <div class="contact-item"><i class="fa-solid fa-envelope"></i><span>${entrepreneur.contact.email}</span></div>
                ${entrepreneur.social?.facebook && entrepreneur.social.facebook !== '#'
                  ? `<a href="${entrepreneur.social.facebook}" target="_blank" rel="noopener noreferrer" class="btn btn-facebook-profile"><i class="fa-brands fa-facebook-f"></i> Ver perfil en Facebook</a>`
                  : ''}
                <button class="btn btn-whatsapp" id="profileWhatsapp"><i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('profileBack').addEventListener('click', hideProfile);
    document.getElementById('profileWhatsapp').addEventListener('click', () => {
      showModal('WhatsApp', `Contacto demo para "${entrepreneur.name}". Próximamente disponible.`);
    });
    profileContent.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src));
    });

    mainContent.classList.add('hidden');
    profileView.classList.add('active');
    stopCarouselAutoPlay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      profileContent.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
  }

  function hideProfile() {
    profileView.classList.remove('active');
    mainContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startCarouselAutoPlay();
  }

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenuIfOpen() {
    if (navMobile.classList.contains('open')) {
      hamburger.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  function scrollToElement(el) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
})();
