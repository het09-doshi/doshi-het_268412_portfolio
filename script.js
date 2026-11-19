document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // 2. Typing Animation in Hero
  const roles = [
    'Python & AI/ML Solutions.',
    'Responsive Web Applications.',
    'Data Structures & Algorithms.',
    'Interactive Software Projects.'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 45 : 85;
    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }
    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // 3. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // 4. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  });

  // 5. Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Scroll Reveal & Skill Progress Bar Animation
  const revealElements = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when skills section becomes visible
        if (entry.target.classList.contains('skills-grid')) {
          progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // 7. Copy Email / Phone Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = original), 1500);
      });
    });
  });

  // 8. Contact Form Submission Handler (Opens Mail Client + Shows Confirmation)
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const mailtoLink = `mailto:hetdoshi45@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;
    feedback.textContent = `Thank you, ${name}! Your email client has been opened to send your message.`;
    contactForm.reset();
  });
});