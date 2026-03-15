/* ============================================================
   main.js — Temperate Okhiria Portfolio
   Handles: page routing, animations, cursor,
            mobile nav, service tabs, contact form,
            skill bars, number counters
   ============================================================ */

// ── PAGE ROUTING ──────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  var btn = document.querySelector('[data-page="' + id + '"]');
  if (btn) btn.classList.add('active');
  // sync mobile nav active state
  ['Home','Projects','Contact'].forEach(function(name) {
    var mb = document.getElementById('mn' + name);
    if (mb) mb.classList.toggle('active', name.toLowerCase() === id);
  });
  window.scrollTo(0, 0);
  setTimeout(runAnimations, 60);
}

// ── MOBILE NAV ────────────────────────────────────
function closeMobileNav() {
  var nav = document.getElementById('mobileNav');
  var ham = document.getElementById('hamburger');
  nav.classList.remove('open');
  ham.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function() {
  var ham = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  ham.addEventListener('click', function(e) {
    e.stopPropagation();
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // close when tapping outside
  document.addEventListener('click', function(e) {
    if (!mobileNav.contains(e.target) && e.target !== ham) {
      closeMobileNav();
    }
  });

  setTimeout(runAnimations, 100);
});

// ── SCROLL ANIMATIONS ─────────────────────────────
function runAnimations() {
  var elements = document.querySelectorAll('.anim:not(.in)');
  elements.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('in');
    }
  });
  // animate skill bars
  document.querySelectorAll('.skill-fill').forEach(function(bar) {
    var rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      bar.style.width = bar.getAttribute('data-w') + '%';
    }
  });
}

window.addEventListener('scroll', runAnimations, { passive: true });


// ── CURSOR ────────────────────────────────────────
var cursor = document.getElementById('cursor');
var ring   = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .svc-card, .project-card, .future-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    ring.style.width    = '56px';
    ring.style.height   = '56px';
    ring.style.borderColor = 'rgba(0,229,160,.7)';
  });
  el.addEventListener('mouseleave', function() {
    cursor.style.width  = '8px';
    cursor.style.height = '8px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
    ring.style.borderColor = 'rgba(0,229,160,.4)';
  });
});

// ── NAV SCROLL EFFECT ─────────────────────────────
window.addEventListener('scroll', function() {
  var nav = document.getElementById('mainNav');
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// ── SERVICE TAB FILTER ────────────────────────────
document.querySelectorAll('.svc-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.svc-tab').forEach(function(t) { t.classList.remove('active'); });
    this.classList.add('active');
    var filter = this.getAttribute('data-filter');
    document.querySelectorAll('.svc-card').forEach(function(card) {
      var cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── CONTACT FORM ──────────────────────────────────
function handleFormSubmit() {
  var fname   = document.getElementById('fname').value.trim();
  var femail  = document.getElementById('femail').value.trim();
  var fmsg    = document.getElementById('fmsg').value.trim();

  if (!fname || !femail || !fmsg) {
    // shake the button
    var btn = document.getElementById('submitBtn');
    btn.style.animation = 'none';
    btn.style.background = '#e05252';
    btn.style.transform = 'translateX(-6px)';
    setTimeout(function() { btn.style.transform = 'translateX(6px)'; }, 80);
    setTimeout(function() { btn.style.transform = 'translateX(-4px)'; }, 160);
    setTimeout(function() { btn.style.transform = ''; btn.style.background = ''; }, 240);
    return;
  }

  // show success
  var fc = document.getElementById('formContent');
  var fs = document.getElementById('formSuccess');
  fc.style.opacity = '0';
  fc.style.transform = 'translateY(-10px)';
  fc.style.transition = 'opacity .3s, transform .3s';
  setTimeout(function() {
    fc.style.display = 'none';
    fs.classList.add('show');
    fs.style.animation = 'fadeSlideUp .5s ease both';
  }, 300);
}

// ── NUMBER COUNTER ANIMATION ─────────────────────
var countersDone = false;
function animateCounters() {
  if (countersDone) return;
  countersDone = true;
  document.querySelectorAll('.stat-n').forEach(function(el) {
    var full = el.textContent;
    var target = parseInt(full);
    if (isNaN(target)) return;
    var suffix = full.replace(String(target), '');
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

setTimeout(animateCounters, 800);
window.addEventListener('scroll', function() {
  var stats = document.querySelector('.hero-stats');
  if (stats && stats.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
  }
}, { passive: true });