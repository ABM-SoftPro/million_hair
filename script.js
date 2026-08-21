/* ══════════════════════════════════════
   Millionhair Salon — Shared Interactions
   Works across Home 1, Home 2, Home 3
   ══════════════════════════════════════ */

// ─── Mobile Menu ───
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.textContent = nav.classList.contains('open') ? '×' : '☰';
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav a').forEach(a =>
  a.addEventListener('click', () => {
    if (a.getAttribute('href').startsWith('#')) {
      nav.classList.remove('open');
      menuBtn.textContent = '☰';
      document.body.style.overflow = '';
    }
  })
);

// ─── Header Scroll Effect ───
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Reveal on Scroll ───
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Cursor Glow (Home 1 only) ───
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });

  (function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  })();
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// ─── Gallery Modal (works on all pages) ───
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

// Select gallery figures from any page layout
const galleryFigures = document.querySelectorAll(
  '.masonry figure, .gallery-grid figure, .gm-grid figure'
);

galleryFigures.forEach(fig =>
  fig.addEventListener('click', () => {
    const img = fig.querySelector('img');
    if (img && modal && modalImage) {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  })
);

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
});

// ─── Gallery Shuffle (Home 1 only) ───
const shuffle = document.getElementById('galleryShuffle');

shuffle?.addEventListener('click', () => {
  const grid = document.getElementById('masonry');
  if (!grid) return;
  const items = [...grid.children];

  items.forEach(item => {
    item.style.transition = 'opacity 0.25s, transform 0.25s';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
  });

  setTimeout(() => {
    items.sort(() => Math.random() - 0.5).forEach(item => grid.appendChild(item));

    requestAnimationFrame(() => {
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, i * 60);
      });
    });

    shuffle.textContent = 'LOOKS SHUFFLED ✓';
    setTimeout(() => (shuffle.textContent = 'SHUFFLE THE LOOKS ↻'), 1500);
  }, 280);
});

// ─── Booking Form (works on all pages) ───
const form = document.getElementById('bookingForm');
const msg = document.getElementById('formMessage');

form?.addEventListener('submit', e => {
  e.preventDefault();

  const btn = form.querySelector('.submit');
  if (btn) {
    btn.textContent = 'SENDING...';
    btn.style.pointerEvents = 'none';
  }

  setTimeout(() => {
    if (msg) {
      msg.textContent = '✓ Thank you! Your appointment request has been sent.';
      msg.style.opacity = '0';
      msg.style.transform = 'translateY(6px)';

      requestAnimationFrame(() => {
        msg.style.transition = 'opacity 0.4s, transform 0.4s';
        msg.style.opacity = '1';
        msg.style.transform = 'translateY(0)';
      });
    }

    form.reset();
    if (btn) {
      btn.innerHTML = 'SEND REQUEST <span>→</span>';
      btn.style.pointerEvents = '';
    }
  }, 800);
});

// ─── Year ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Smooth Anchor Scroll ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
