/* ===== PORTFOLIO SCRIPTS ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Dynamic Typewriter Hero Effect */
  const typedTextSpan = document.getElementById('typed-text');
  const roles = [
    'Aspiring Software Developer',
    'Machine Learning Enthusiast',
    'Full Stack Web Developer',
    'Python & Java Programmer',
    'Problem Solver'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 40;
  const newRoleDelay = 1800;

  function type() {
    if (!typedTextSpan) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, newRoleDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  setTimeout(type, 500);

  /* 2. Dark / Light Theme Toggle with LocalStorage */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('selected-theme');

  if (savedTheme) {
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      document.body.classList.add('dark-theme');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('selected-theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('selected-theme', 'light');
    }
  });

  /* 3. Mobile Navigation Menu */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  /* 4. Active Nav Link on Scroll */
  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active-link');
        } else {
          targetNav.classList.remove('active-link');
        }
      }
    });
  }
  window.addEventListener('scroll', scrollActive);

  /* 5. Scroll to Top Button Visibility */
  const scrollTop = document.getElementById('scroll-top');
  function handleScrollTop() {
    if (window.scrollY >= 400) {
      scrollTop.classList.add('show-scroll');
    } else {
      scrollTop.classList.remove('show-scroll');
    }
  }
  window.addEventListener('scroll', handleScrollTop);

  /* 6. Project Category Filter */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project__card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 7. Contact Form Handler (Opens Default Mail Client or Shows Success) */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please complete all required fields.';
        formStatus.className = 'form__status error';
        return;
      }

      // Build mailto URI to directly allow the sender to dispatch from their email client
      const mailtoUrl = `mailto:rruchitha0104@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}
Email: ${email}

Message:
${message}`
      )}`;

      window.location.href = mailtoUrl;

      formStatus.textContent = 'Thank you! Your email client has been launched with your message.';
      formStatus.className = 'form__status success';
      contactForm.reset();
    });
  }

  /* 8. Dynamic Copyright Year */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
