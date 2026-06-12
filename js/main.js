/* ============================================================
   main.js — T. Okhiria Portfolio
   Handles: Nav scroll, Mobile drawer, Animations, 
            Skill bars, Form submission
   ============================================================ */

/* ── NAV SCROLL EFFECT ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ── ACTIVE NAV LINK ── */
const navBtns = document.querySelectorAll('.nav-btn');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navBtns.forEach(btn => {
  const href = btn.getAttribute('href');
  if (href === currentPage) {
    btn.classList.add('active');
  }
});

/* ── MOBILE DRAWER ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
}

/* Close drawer when a link is clicked */
document.querySelectorAll('.mobile-nav-btn, .mobile-nav-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ── SCROLL ANIMATIONS ── */
const animEls = document.querySelectorAll('.anim');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animEls.forEach(el => observer.observe(el));

/* ── SKILL BARS ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.getAttribute('data-w');
      target.style.width = width + '%';
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── CONTACT FORM ── */
async function handleFormSubmit() {
  const btn = document.getElementById('submitBtn');
  const fname = document.getElementById('fname')?.value.trim();
  const lname = document.getElementById('lname')?.value.trim();
  const email = document.getElementById('femail')?.value.trim();
  const service = document.getElementById('fservice')?.value;
  const msg = document.getElementById('fmsg')?.value.trim();

  if (!fname || !email || !msg || !service) {
    alert('Please fill in all required fields.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xjgdalzk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fname + ' ' + lname,
        email: email,
        service: service,
        message: msg
      })
    });

    if (res.ok) {
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'flex';
    } else {
      throw new Error('Form failed');
    }
  } catch (err) {
    alert('Something went wrong. Please email me directly at otemperate@gmail.com');
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}