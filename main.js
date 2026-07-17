document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Contact form: gentle inline confirmation, no backend wired yet
  const form = document.querySelector('.inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent';
      form.reset();
      setTimeout(() => { btn.textContent = original; }, 3200);
    });
  }
});
