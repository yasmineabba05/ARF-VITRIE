 const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

hamburger.addEventListener('click', toggleMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

// ✅ Dropdown mobile (click)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownId = this.dataset.toggle; 
      const dropdown = document.getElementById(dropdownId);

      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });

      dropdown.classList.toggle('active');
    }
  });
});

// Fermer menu quand on clique lien normal
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 768 && !this.classList.contains('dropdown-toggle') && this.getAttribute('href') !== '#') {
      closeMobileMenu();
    }
  });
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeMobileMenu();
});

// Desktop hover (اختياري)
document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) this.classList.add('active');
  });
  dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) this.classList.remove('active');
  });
});

// Anim scroll
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-pop');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-item, .hero-cta').forEach(el => observer.observe(el));

  window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-minimal');
    if (!hero) return;
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  });
});
