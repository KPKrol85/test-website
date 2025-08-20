document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const sectionLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  const sections = Array.from(sectionLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = nav.querySelector(`a[href="#${id}"]`);
        if (entry.isIntersecting) {
          sectionLinks.forEach(l => l.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.6 });
    sections.forEach(section => observer.observe(section));
  }

  const form = document.querySelector('form.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      const status = document.getElementById('form-message');

      if (name.value.trim() && validateEmail(email.value) && message.value.trim()) {
        status.textContent = 'Dziękujemy za wiadomość!';
        form.reset();
      } else {
        status.textContent = 'Proszę wypełnić wszystkie pola poprawnie.';
      }
      status.focus();
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
