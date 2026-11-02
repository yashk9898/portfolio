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

document.querySelectorAll('a, button, .proj-card, .xp-card, .cinfo-card, .ach-item, .proj-featured, .ats-card-preview').forEach(el => {
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
    '"React Native & Next.js Engineer"',
    '"xTrendz & ATS.AI Builder"',
    '"Node.js & MongoDB Architect"',
    '"Docker, Redis & Cloud DevOps"',
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
  const card = wrap?.querySelector('.dev-card') || wrap?.querySelector('.card-3d');
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
document.querySelectorAll('.proj-card, .exp-body, .xp-card, .ats-card-preview').forEach(card => {
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

/* ── 10. CONTACT FORM (FormSubmit + Mailto Resilience) ── */
(function initForm() {
  const form       = document.getElementById('contactForm');
  const statusBox  = document.getElementById('cfStatusBox');
  const directLink = document.getElementById('directMailtoLink');
  if (!form) return;

  // Dynamically update mailto link as user types
  function updateMailto() {
    const name    = document.getElementById('fname')?.value.trim() || '';
    const email   = document.getElementById('femail')?.value.trim() || '';
    const subject = document.getElementById('fsubject')?.value.trim() || 'New Portfolio Message';
    const message = document.getElementById('fmessage')?.value.trim() || '';
    
    if (directLink) {
      const body = `Hi Yash,\n\n${message}\n\n---\nFrom: ${name} (${email})`;
      directLink.href = `mailto:yashkava98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updateMailto);
  });
  updateMailto();

  function setStatus(type, html) {
    if (!statusBox) return;
    statusBox.className = `cf-status-box show ${type}`;
    statusBox.innerHTML = html;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn     = form.querySelector('button[type=submit]');
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('fmessage').value.trim();

    btn.disabled = true;
    btn.innerHTML = 'Sending… <span class="spinner-mini"></span>';
    setStatus('info', 'Connecting to mail server…');

    try {
      const response = await fetch("https://formsubmit.co/ajax/yashkava98@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject,
          message: message,
          _captcha: "false",
          _template: "table"
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && (data.success === "true" || data.success === true)) {
        btn.innerHTML = 'Sent Successfully! ✅';
        setStatus('success', '<span>✅</span> Message sent! I will reply to <strong>' + email + '</strong> within 24 hours.');
        form.reset();
        updateMailto();
        setTimeout(() => {
          btn.innerHTML = 'Send Message 🚀';
          btn.disabled = false;
        }, 5000);
      } else if (data && data.message && data.message.toLowerCase().includes('activate')) {
        // FormSubmit requires one-time account activation
        btn.innerHTML = 'Action Needed ⚠️';
        btn.disabled = false;
        setStatus('warning', '<strong>⚠️ FormSubmit One-Time Activation:</strong> FormSubmit sent an activation email to <code>yashkava98@gmail.com</code>.<br/>Please open Gmail and click <strong>"Activate Form"</strong> once. Subsequent submissions will arrive immediately!<br/><a href="' + (directLink?.href || 'mailto:yashkava98@gmail.com') + '" class="status-action-link">Click here to send directly via your Mail app ›</a>');
      } else {
        throw new Error(data?.message || 'Server returned an error');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX issue:', err);
      btn.innerHTML = 'Open Mail Client ✉️';
      btn.disabled = false;
      setStatus('error', '<span>⚠️</span> Unable to send via web form directly.<br/><a href="' + (directLink?.href || 'mailto:yashkava98@gmail.com') + '" class="status-action-link">Click here to dispatch directly via your Email Client ›</a> or write directly to <strong>yashkava98@gmail.com</strong>.');
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
      background:linear-gradient(90deg, #6366f1, #0ea5e9); border-radius:2px;
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

/* ── 14. COPY EMAIL BUTTONS ── */
(function initCopyEmail() {
  function handleCopy(btn, textSelector) {
    if (!btn) return;
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'yashkava98@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        btn.classList.add('copied');
        const textSpan = textSelector ? btn.querySelector(textSelector) : null;
        const prevText = textSpan ? textSpan.textContent : '';
        if (textSpan) textSpan.textContent = 'Copied! ✓';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (textSpan) textSpan.textContent = prevText;
        }, 2200);
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });
  }

  handleCopy(document.getElementById('copyEmailBtn'), '#copyEmailText');
  handleCopy(document.getElementById('copyEmailMini'));
})();
