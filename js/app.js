/**
 * VITRINA VIRTUAL GARÍFUNA — Aplicación principal
 * JavaScript vanilla — Demo / prototipo visual
 */

(function () {
  'use strict';

  /* --- State --- */
  let carouselIndex = 0;
  let carouselSlidesPerView = 4;
  let currentFilter = 'all';
  let touchStartX = 0;
  let touchEndX = 0;

  /* --- DOM Elements --- */
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

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderCategories();
    renderFeaturedCarousel();
    renderEntrepreneursGrid();
    setupEventListeners();
    setupScrollAnimations();
    updateCarouselSlidesPerView();
    window.addEventListener('resize', debounce(handleResize, 200));
  }

  /* --- Event Listeners --- */
  function setupEventListeners() {
    // Header scroll
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    navMobile.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Modal close
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Smooth scroll for anchor links
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

    // Placeholder links
    document.querySelectorAll('[data-placeholder]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const message = el.getAttribute('data-placeholder') ||
          'Esta función estará disponible próximamente.';
        showModal('Próximamente', message);
      });
    });

    // User icon
    const userBtn = document.getElementById('headerUser');
    if (userBtn) {
      userBtn.addEventListener('click', () => {
        showModal('Inicio de sesión', 'El sistema de autenticación estará disponible próximamente.');
      });
    }

    // Floating CTA
    const floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
      floatingCta.addEventListener('click', () => {
        scrollToElement(document.getElementById('emprendedores'));
      });
    }

    // Hero CTA
    const heroCta = document.getElementById('heroCta');
    if (heroCta) {
      heroCta.addEventListener('click', () => {
        scrollToElement(document.getElementById('emprendedores'));
      });
    }

    // Register button
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        if (GOOGLE_FORMS_URL.includes('PLACEHOLDER')) {
          showModal(
            'Registro de emprendedores',
            'El formulario de Google Forms se conectará próximamente. Enlace placeholder: ' + GOOGLE_FORMS_URL
          );
        } else {
          window.open(GOOGLE_FORMS_URL, '_blank');
        }
      });
    }

    // Carousel controls
    document.getElementById('carouselPrev')?.addEventListener('click', () => moveCarousel(-1));
    document.getElementById('carouselNext')?.addEventListener('click', () => moveCarousel(1));

    // Carousel touch
    const carouselTrack = document.getElementById('carouselTrack');
    if (carouselTrack) {
      carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeMobileMenuIfOpen();
      }
    });
  }

  /* --- Render Categories --- */
  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => `
      <div class="category-card fade-in" data-category="${cat.id}" role="button" tabindex="0">
        <div class="category-icon">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <span class="category-name">${cat.name}</span>
      </div>
    `).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        filterEntrepreneurs(category);
        scrollToElement(document.getElementById('emprendedores'));
        highlightCategory(category);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  function highlightCategory(categoryId) {
    document.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-category') === categoryId);
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === categoryId);
    });
    currentFilter = categoryId;
  }

  /* --- Entrepreneur Card Template --- */
  function createEntrepreneurCard(entrepreneur) {
    return `
      <article class="entrepreneur-card" data-id="${entrepreneur.id}" data-category="${entrepreneur.category}">
        <div class="entrepreneur-card-image">
          <img src="${entrepreneur.image}" alt="${entrepreneur.name}" loading="lazy">
          <span class="entrepreneur-card-badge">${entrepreneur.categoryLabel}</span>
          <button class="entrepreneur-card-whatsapp" aria-label="Contactar por WhatsApp"
            data-whatsapp="${entrepreneur.contact.whatsapp}" data-name="${entrepreneur.name}">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
        <div class="entrepreneur-card-body">
          <h3 class="entrepreneur-card-name">${entrepreneur.name}</h3>
          <p class="entrepreneur-card-location">
            <i class="fa-solid fa-location-dot"></i> ${entrepreneur.location}
          </p>
          <p class="entrepreneur-card-desc">${entrepreneur.shortDescription}</p>
          <div class="entrepreneur-card-actions">
            <button class="btn btn-primary btn-sm view-profile-btn" data-id="${entrepreneur.id}">
              Ver perfil
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function attachCardEvents(container) {
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showProfile(parseInt(btn.getAttribute('data-id')));
      });
    });

    container.querySelectorAll('.entrepreneur-card-whatsapp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.getAttribute('data-name');
        showModal(
          'WhatsApp',
          `Contacto demo para "${name}". La integración con WhatsApp estará disponible próximamente.`
        );
      });
    });
  }

  /* --- Featured Carousel --- */
  function renderFeaturedCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    if (!track) return;

    const featured = ENTREPRENEURS.filter(e => e.featured);

    track.innerHTML = featured.map(e => `
      <div class="carousel-slide">${createEntrepreneurCard(e)}</div>
    `).join('');

    attachCardEvents(track);
    renderCarouselDots(featured.length);
    updateCarousel();
  }

  function renderCarouselDots(total) {
    const dots = document.getElementById('carouselDots');
    if (!dots) return;

    const maxDots = Math.max(1, total - carouselSlidesPerView + 1);
    dots.innerHTML = Array.from({ length: maxDots }, (_, i) =>
      `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join('');

    dots.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        carouselIndex = parseInt(dot.getAttribute('data-index'));
        updateCarousel();
      });
    });
  }

  function moveCarousel(direction) {
    const featured = ENTREPRENEURS.filter(e => e.featured);
    const maxIndex = Math.max(0, featured.length - carouselSlidesPerView);
    carouselIndex = Math.max(0, Math.min(carouselIndex + direction, maxIndex));
    updateCarousel();
  }

  function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = track?.querySelectorAll('.carousel-slide');
    if (!slides || !slides.length) return;

    const slideWidth = slides[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    const offset = carouselIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === carouselIndex);
    });

    // Update buttons
    const featured = ENTREPRENEURS.filter(e => e.featured);
    const maxIndex = Math.max(0, featured.length - carouselSlidesPerView);
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (prevBtn) prevBtn.disabled = carouselIndex === 0;
    if (nextBtn) nextBtn.disabled = carouselIndex >= maxIndex;
  }

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      moveCarousel(diff > 0 ? 1 : -1);
    }
  }

  function updateCarouselSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 480) {
      carouselSlidesPerView = 1;
    } else if (width <= 768) {
      carouselSlidesPerView = 2;
    } else if (width <= 1024) {
      carouselSlidesPerView = 3;
    } else if (width >= 1400) {
      carouselSlidesPerView = 5;
    } else {
      carouselSlidesPerView = 4;
    }

    carouselIndex = 0;
    const featured = ENTREPRENEURS.filter(e => e.featured);
    renderCarouselDots(featured.length);
    updateCarousel();
  }

  function handleResize() {
    updateCarouselSlidesPerView();
  }

  /* --- Entrepreneurs Grid --- */
  function renderEntrepreneursGrid() {
    const grid = document.getElementById('entrepreneursGrid');
    const filterBar = document.getElementById('filterBar');
    if (!grid || !filterBar) return;

    // Render filter buttons
    const filters = [
      { id: 'all', name: 'Todos' },
      { id: 'gastronomia', name: 'Gastronomía' },
      { id: 'artesanias', name: 'Artesanías' },
      { id: 'moda', name: 'Moda' },
      { id: 'cosmetica', name: 'Cosmética Natural' },
      { id: 'arte', name: 'Arte y Cultura' },
      { id: 'turismo', name: 'Turismo Cultural' },
      { id: 'servicios', name: 'Servicios' }
    ];

    filterBar.innerHTML = filters.map(f => `
      <button class="filter-btn ${f.id === 'all' ? 'active' : ''}" data-filter="${f.id}">
        ${f.name}
      </button>
    `).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterEntrepreneurs(btn.getAttribute('data-filter'));
      });
    });

    // Render all cards
    grid.innerHTML = ENTREPRENEURS.map(e => createEntrepreneurCard(e)).join('');
    attachCardEvents(grid);
  }

  function filterEntrepreneurs(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    document.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-category') === category);
    });

    const grid = document.getElementById('entrepreneursGrid');
    const cards = grid.querySelectorAll('.entrepreneur-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const show = category === 'all' || cardCategory === category;
      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    // Show/hide no results
    let noResults = grid.querySelector('.no-results');
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
          <i class="fa-solid fa-search"></i>
          <p>No se encontraron emprendimientos en esta categoría.</p>
        `;
        grid.appendChild(noResults);
      }
    } else if (noResults) {
      noResults.remove();
    }
  }

  /* --- Profile View --- */
  function showProfile(id) {
    const entrepreneur = ENTREPRENEURS.find(e => e.id === id);
    if (!entrepreneur) return;

    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = `
      <div class="profile-hero">
        <img src="${entrepreneur.image}" alt="${entrepreneur.name}">
        <div class="profile-hero-overlay"></div>
        <div class="profile-hero-content">
          <div class="container">
            <button class="profile-back" id="profileBack">
              <i class="fa-solid fa-arrow-left"></i> Volver
            </button>
            <h1 class="profile-name">${entrepreneur.name}</h1>
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
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Productos</h2>
                <div class="profile-products">
                  ${entrepreneur.products.map(p => `<span class="product-tag">${p}</span>`).join('')}
                </div>
              </div>
              <div class="profile-section fade-in">
                <h2 class="profile-section-title">Galería</h2>
                <div class="profile-gallery">
                  ${entrepreneur.gallery.map(img => `
                    <img src="${img}" alt="Galería ${entrepreneur.name}" class="gallery-img" loading="lazy">
                  `).join('')}
                </div>
              </div>
            </div>
            <div class="profile-sidebar">
              <div class="profile-contact-card fade-in">
                <h3>Contacto</h3>
                <div class="contact-item">
                  <i class="fa-solid fa-phone"></i>
                  <span>${entrepreneur.contact.phone}</span>
                </div>
                <div class="contact-item">
                  <i class="fa-solid fa-envelope"></i>
                  <span>${entrepreneur.contact.email}</span>
                </div>
                <button class="btn btn-whatsapp" style="width:100%; margin-top:16px; justify-content:center;"
                  id="profileWhatsapp">
                  <i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
                </button>
                <div class="profile-social">
                  <a href="#" class="social-link" data-placeholder="Facebook estará disponible próximamente.">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social-link" data-placeholder="Instagram estará disponible próximamente.">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" class="social-link" data-placeholder="TikTok estará disponible próximamente.">
                    <i class="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Events
    document.getElementById('profileBack').addEventListener('click', hideProfile);
    document.getElementById('profileWhatsapp').addEventListener('click', () => {
      showModal('WhatsApp', `Contacto demo para "${entrepreneur.name}". La integración con WhatsApp estará disponible próximamente.`);
    });

    profileContent.querySelectorAll('[data-placeholder]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('Próximamente', el.getAttribute('data-placeholder'));
      });
    });

    profileContent.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src));
    });

    mainContent.classList.add('hidden');
    profileView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger fade-in animations
    setTimeout(() => {
      profileContent.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    }, 100);
  }

  function hideProfile() {
    profileView.classList.remove('active');
    mainContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --- Mobile Menu --- */
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

  /* --- Modal --- */
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

  /* --- Lightbox --- */
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* --- Scroll Animations --- */
  function setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /* --- Utilities --- */
  function scrollToElement(el) {
    if (!el) return;
    const offset = header.offsetHeight + 10;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
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
