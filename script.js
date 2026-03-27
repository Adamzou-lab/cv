  (() => {
    // -------------------------------------------
    // MENU HAMBURGER (mobile)
    // -------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    const nav       = document.querySelector('nav');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });


    // -------------------------------------------
    // INTERSECTION OBSERVER — Animations au scroll
    // Ajoute la classe 'visible' aux .reveal qui entrent en vue
    // -------------------------------------------
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // -------------------------------------------
    // SCROLL SPY — lien actif dans la nav
    // -------------------------------------------
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => spyObserver.observe(s));


    // -------------------------------------------
    // ONGLETS SKILLS
    // -------------------------------------------
    document.querySelectorAll('.skills-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      });
    });


    // -------------------------------------------
    // PARALLAXE LÉGÈRE sur les blobs au scroll
    // Crée une sensation de profondeur
    // -------------------------------------------
    const blobs = document.querySelectorAll('.blob');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          blobs[0].style.transform = `translateY(${y * 0.08}px)`;
          blobs[1].style.transform = `translateY(${-y * 0.06}px)`;
          if (blobs[2]) blobs[2].style.transform = `translateY(${y * 0.04}px)`;
          if (blobs[3]) blobs[3].style.transform = `translateY(${-y * 0.05}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // -------------------------------------------
    // CAROUSEL PROJETS
    // -------------------------------------------
    const track     = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-track-container');
    const prevBtn   = document.querySelector('.carousel-prev');
    const nextBtn   = document.querySelector('.carousel-next');
    const dotsWrap  = document.querySelector('.carousel-dots');

    if (track && prevBtn && nextBtn) {
      const cards = Array.from(track.querySelectorAll('.project-card'));
      const STEP   = 234;   // 220px carte + 14px gap
      const VISIBLE = 4;
      const MAX    = Math.max(0, cards.length - VISIBLE);
      let idx = 0;

      if (dotsWrap) {
        for (let i = 0; i <= MAX; i++) {
          const dot = document.createElement('span');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => go(i));
          dotsWrap.appendChild(dot);
        }
      }

      function go(i) {
        idx = Math.max(0, Math.min(i, MAX));
        track.style.transform = 'translateX(-' + (idx * STEP) + 'px)';
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx >= MAX;
        if (dotsWrap) {
          Array.from(dotsWrap.querySelectorAll('.carousel-dot'))
            .forEach(function(d, j) { d.classList.toggle('active', j === idx); });
        }
      }

      prevBtn.addEventListener('click', function() { go(idx - 1); });
      nextBtn.addEventListener('click', function() { go(idx + 1); });
      go(0);
    }
  })();
