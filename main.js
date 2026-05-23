/* ══════════════════════════════════════════════
   YASH KAVA PORTFOLIO — main.js (v2)
   ══════════════════════════════════════════════ */

/* ── 1. PROGRESS BAR ── */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* ── 2. CUSTOM CURSOR ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * .14; ry += (my - ry) * .14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .proj-card, .xp-card, .cinfo-card, .ach-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

/* ── 3. NAVBAR ── */
(function initNav() {
  const nav    = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-links a');
  const secs   = document.querySelectorAll('section[id]');
  const toggle = document.getElementById('menuToggle');
  const mobNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.dataset.nav === cur));
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = mobNav.classList.toggle('open');
    toggle.querySelector('span:first-child').style.transform  = open ? 'rotate(45deg) translate(5px,5px)'  : '';
    toggle.querySelector('span:last-child').style.transform   = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  mobNav.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => {
    mobNav.classList.remove('open');
    toggle.querySelectorAll('span').forEach(s => s.style.transform = '');
  }));
})();

/* ── 4. SCROLL-REVEAL (AOS-lite) ── */
(function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('aos-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ── 5. ROLE TYPEWRITER ── */
(function initTypewriter() {
  const el = document.getElementById('roleText');
  if (!el) return;
  const roles = [
    '"Full Stack Developer"',
    '"React & Next.js Expert"',
    '"Node.js Engineer"',
    '"MongoDB Architect"',
    '"Real-Time App Builder"',
  ];
  let pi = 0, ci = 0, del = false;

  function tick() {
    const cur = roles[pi];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; setTimeout(tick, 1800); return; }
    if (del && ci === 0) { del = false; pi = (pi + 1) % roles.length; }
    setTimeout(tick, del ? 40 : 75);
  }
  tick();
})();

/* ── 6. 3D HERO CARD MOUSE TILT ── */
(function initHeroTilt() {
  const wrap = document.getElementById('card3dWrap');
  const card = wrap?.querySelector('.card-3d');
  if (!wrap || !card) return;

  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 20;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 20;
    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
})();

/* ── 7. PROJECT CARD TILT ── */
document.querySelectorAll('.proj-card, .exp-body, .xp-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

/* ── 8. ANIMATED COUNTERS ── */
(function initCounters() {
  document.querySelectorAll('.xp-num, .ms-num').forEach(el => {
    const original = el.textContent;
    const num = parseInt(original.replace(/\D/g, ''));
    const suffix = original.replace(/[0-9]/g, '');
    let started = false;

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      let count = 0;
      const step = Math.max(1, Math.ceil(num / 45));
      const t = setInterval(() => {
        count = Math.min(count + step, num);
        el.textContent = count + suffix;
        if (count >= num) clearInterval(t);
      }, 35);
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
  });
})();

/* ── 9. MOCK CHART ANIMATION ── */
(function animMockChart() {
  const bars = document.querySelectorAll('.mc-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    bars.forEach(b => {
      const h = b.style.height;
      b.style.height = '0%';
      setTimeout(() => { b.style.transition = 'height .8s ease'; b.style.height = h; }, 200);
    });
    io.disconnect();
  }, { threshold: 0.5 });
  io.observe(bars[0].closest('.mock-chart'));
})();

/* ── 10. CONTACT FORM (FormSubmit AJAX) ── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('cfSuccess');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    
    // Get form data
    const name = document.getElementById('fname').value;
    const email = document.getElementById('femail').value;
    const subject = document.getElementById('fsubject').value || 'New Portfolio Message';
    const message = document.getElementById('fmessage').value;

    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Derive AJAX endpoint from form action (replaces formsubmit.co/ with formsubmit.co/ajax/)
    const ajaxUrl = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

    try {
      const response = await fetch(ajaxUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject,
          message: message
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        btn.textContent = 'Send Message 🚀';
        btn.disabled = false;
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      } else {
        throw new Error(result.message || 'Failed to send');
      }
    } catch (error) {
      console.error(error);
      btn.textContent = 'Error! Try Again';
      btn.disabled = false;
      setTimeout(() => btn.textContent = 'Send Message 🚀', 3000);
    }
  });
})();
(function initSkillStagger() {
  const rows = document.querySelectorAll('.skill-row');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const idx = [...rows].indexOf(e.target);
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateX(0)';
        }, idx * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  rows.forEach(r => {
    r.style.opacity = '0';
    r.style.transform = 'translateX(-20px)';
    r.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(r);
  });
})();

/* ── 12. ACHIEVEMENT ITEM STAGGER ── */
(function initAchStagger() {
  const items = document.querySelectorAll('.ach-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const siblings = [...e.target.parentElement.querySelectorAll('.ach-item')];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, idx * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(12px)';
    item.style.transition = 'opacity .4s ease, transform .4s ease';
    io.observe(item);
  });
})();

/* ── 13. ACTIVE NAV LINK UNDERLINE (decorative) ── */
(function initNavIndicator() {
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(l => {
    l.style.position = 'relative';
    const ind = document.createElement('span');
    ind.style.cssText = `
      position:absolute; bottom:-2px; left:50%; width:0; height:2px;
      background:linear-gradient(90deg,#7c3aed,#06b6d4); border-radius:2px;
      transform:translateX(-50%); transition:width .25s ease;
    `;
    l.appendChild(ind);
    l.addEventListener('mouseenter', () => ind.style.width = '70%');
    l.addEventListener('mouseleave', () => { if (!l.classList.contains('active')) ind.style.width = '0'; });
    const obs = new MutationObserver(() => {
      ind.style.width = l.classList.contains('active') ? '70%' : '0';
    });
    obs.observe(l, { attributes: true, attributeFilter: ['class'] });
  });
})();
