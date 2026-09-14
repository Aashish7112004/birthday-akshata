// ==========================================================
// COSMIC VIRGO BIRTHDAY EXPERIENCE - ULTRA-SMOOTH ENGINE
// Default Instagram Story + Draggable Scrapbook + Accurate Scratching
// ==========================================================

(function() {
  'use strict';

  // --- 1. STATE & NAVIGATION (8 CHAPTERS) ---
  let currentStep = 0;
  const totalSteps = 8;
  const stepDots = document.querySelectorAll('.step-dot');
  const chapters = document.querySelectorAll('.chapter-card');

  function goToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= totalSteps) return;
    currentStep = stepIndex;

    chapters.forEach((chap, idx) => {
      chap.classList.toggle('active', idx === currentStep);
    });

    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentStep);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentStep === 1) updateCosmicStats();
    if (currentStep === 2) {
      const storyView = document.getElementById('inlineStoryView');
      if (!storyView || !storyView.classList.contains('hidden')) {
        startInlineStory(true);
      }
    } else {
      stopInlineStory();
    }
    if (currentStep === 4) initBalloonGame();
    if (currentStep === 5) initLuxuryScratchCards();
  }

  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetStep = parseInt(dot.getAttribute('data-step'), 10);
      goToStep(targetStep);
    });
  });

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep + 1));
  });

  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep - 1));
  });

  const startBtn = document.getElementById('startJourneyBtn');
  const giftBox = document.getElementById('giftBoxTrigger');
  if (startBtn) startBtn.addEventListener('click', startExperience);
  if (giftBox) giftBox.addEventListener('click', startExperience);

  function startExperience() {
    triggerConfetti(2);
    startAudio();
    goToStep(1);
  }

  const replayBtn = document.getElementById('replayJourneyBtn');
  if (replayBtn) replayBtn.addEventListener('click', () => goToStep(0));

  // --- 2. SINGLE LIGHTWEIGHT AMBIENT CANVAS (ZERO LAG) ---
  const ambientCanvas = document.getElementById('ambientCanvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const hearts = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 12,
      speed: Math.random() * 0.7 + 0.4,
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      char: ['💖', '💕', '✨', '🌸'][Math.floor(Math.random() * 4)]
    }));

    function renderAmbient() {
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      hearts.forEach(h => {
        h.y -= h.speed;
        h.sway += h.swaySpeed;
        const currentX = h.x + Math.sin(h.sway) * 20;

        ctx.font = `${h.size}px Outfit, sans-serif`;
        ctx.fillText(h.char, currentX, h.y);

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
      });

      requestAnimationFrame(renderAmbient);
    }
    renderAmbient();
  }

  // Click Heart Effect
  window.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.polaroid-draggable-card') || e.target.closest('canvas')) return;
    createClickHeart(e.clientX, e.clientY);
  });

  function createClickHeart(x, y) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = ['💖', '💕', '✨', '🌸'][Math.floor(Math.random() * 4)];
    h.style.left = `${x}px`;
    h.style.top = `${y}px`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }

  // --- 3. PERSONALIZATION SYNC FROM CONFIG ---
  function applyConfig() {
    if (typeof BIRTHDAY_CONFIG === 'undefined') return;

    document.querySelectorAll('.recipient-name').forEach(el => {
      el.textContent = BIRTHDAY_CONFIG.nickname;
    });

    const salutationEl = document.getElementById('letterSalutation');
    if (salutationEl && BIRTHDAY_CONFIG.letter) {
      salutationEl.textContent = BIRTHDAY_CONFIG.letter.salutation;
    }
    const letterBodyEl = document.getElementById('letterBody');
    if (letterBodyEl && BIRTHDAY_CONFIG.letter) {
      letterBodyEl.textContent = BIRTHDAY_CONFIG.letter.body;
    }
    const letterSigEl = document.getElementById('letterSignature');
    if (letterSigEl && BIRTHDAY_CONFIG.letter) {
      letterSigEl.textContent = BIRTHDAY_CONFIG.letter.signature;
    }

    initInlineStory();
    initDraggableScrapbook();
    initSlideshow();
  }

  // --- 4. COSMIC STATS ENGINE (SEPT 18 @ 8:10 PM) ---
  function updateCosmicStats() {
    const birthYear = BIRTHDAY_CONFIG.birthYear || 2004;
    const birthMonth = BIRTHDAY_CONFIG.birthMonth !== undefined ? BIRTHDAY_CONFIG.birthMonth : 8;
    const birthDay = BIRTHDAY_CONFIG.birthDay || 18;
    const birthHour = BIRTHDAY_CONFIG.birthHour || 20;
    const birthMinute = BIRTHDAY_CONFIG.birthMinute || 10;

    const birthDate = new Date(birthYear, birthMonth, birthDay, birthHour, birthMinute, 0);
    const now = new Date();
    const diffMs = Math.max(0, now - birthDate);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    const totalHeartbeats = Math.floor((diffMs / (1000 * 60)) * 75);
    const heartbeatsFormatted = (totalHeartbeats / 1_000_000_000).toFixed(2) + 'B';

    const kmTraveled = Math.floor(diffHours * 107000);
    const kmFormatted = (kmTraveled / 1_000_000).toFixed(1) + 'M';

    animateCounter('counterDays', diffDays);
    animateCounter('counterHours', diffHours);
    
    const hbEl = document.getElementById('counterHeartbeats');
    if (hbEl) hbEl.textContent = heartbeatsFormatted;

    const orbitEl = document.getElementById('counterSunOrbit');
    if (orbitEl) orbitEl.textContent = kmFormatted;
  }

  function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * ease).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // --- 5. CHAPTER 2: PHOTO JOURNEY MODES ---
  // Mode Switcher Tabs
  const tabStoryBtn = document.getElementById('tabStoryBtn');
  const tabPolaroidsBtn = document.getElementById('tabPolaroidsBtn');
  const tabSlideshowBtn = document.getElementById('tabSlideshowBtn');

  const inlineStoryView = document.getElementById('inlineStoryView');
  const draggableScrapbookView = document.getElementById('draggableScrapbookView');
  const slideshowView = document.getElementById('slideshowView');

  if (tabStoryBtn && tabPolaroidsBtn && tabSlideshowBtn) {
    tabStoryBtn.addEventListener('click', () => {
      setActivePhotoTab(tabStoryBtn, inlineStoryView);
      startInlineStory();
    });

    tabPolaroidsBtn.addEventListener('click', () => {
      setActivePhotoTab(tabPolaroidsBtn, draggableScrapbookView);
      stopInlineStory();
    });

    tabSlideshowBtn.addEventListener('click', () => {
      setActivePhotoTab(tabSlideshowBtn, slideshowView);
      stopInlineStory();
    });
  }

  function setActivePhotoTab(activeBtn, activeView) {
    [tabStoryBtn, tabPolaroidsBtn, tabSlideshowBtn].forEach(b => b.classList.remove('active'));
    [inlineStoryView, draggableScrapbookView, slideshowView].forEach(v => v.classList.add('hidden'));

    activeBtn.classList.add('active');
    activeView.classList.remove('hidden');
  }

  // 1. DEFAULT: INLINE INSTAGRAM STORY ENGINE (4 PHOTOS)
  let storyIdx = 0;
  let storyTimer = null;
  const storyDuration = 4500; // 4.5s
  const storyBarsContainer = document.getElementById('inlineStoryBars');
  const storyImg = document.getElementById('inlineStoryImg');
  const storyCaption = document.getElementById('inlineStoryCaption');
  const storyTouchLeft = document.getElementById('storyTouchLeft');
  const storyTouchRight = document.getElementById('storyTouchRight');
  const storyLikeBtn = document.getElementById('storyLikeBtn');
  const storyWishOverlay = document.getElementById('storyWishOverlay');
  const wishStyleBadge = document.getElementById('wishStyleBadge');
  const wishBannerTitle = document.getElementById('wishBannerTitle');
  const wishBannerSub = document.getElementById('wishBannerSub');

  function initInlineStory() {
    if (!storyBarsContainer || !BIRTHDAY_CONFIG.storyPhotos) return;

    storyBarsContainer.innerHTML = '';
    BIRTHDAY_CONFIG.storyPhotos.forEach((_, idx) => {
      const seg = document.createElement('div');
      seg.className = 'story-bar-seg';
      seg.id = `inline-story-bar-${idx}`;
      seg.innerHTML = '<div class="story-bar-fill"></div>';
      storyBarsContainer.appendChild(seg);
    });

    storyIdx = 0;
    showInlineStorySlide(0, false);
  }

  function startInlineStory(resetToFirst = false) {
    if (resetToFirst) {
      storyIdx = 0;
    }
    showInlineStorySlide(storyIdx, true);
  }

  function stopInlineStory() {
    clearTimeout(storyTimer);
    storyTimer = null;
    const seg = document.getElementById(`inline-story-bar-${storyIdx}`);
    if (seg) {
      const fill = seg.querySelector('.story-bar-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
      }
    }
  }

  function showInlineStorySlide(idx, autoPlay = true) {
    const list = BIRTHDAY_CONFIG.storyPhotos;
    if (!list || !list.length) return;

    if (idx >= list.length) {
      idx = 0; // Loop back
    } else if (idx < 0) {
      idx = list.length - 1;
    }

    storyIdx = idx;
    const photo = list[storyIdx];
    if (storyImg) storyImg.src = photo.image;
    if (storyCaption) storyCaption.textContent = photo.caption;

    // Apply 4 distinct wish styles
    if (storyWishOverlay) {
      // Remove any previous style classes
      storyWishOverlay.className = 'story-wish-overlay';
      const styleType = photo.style || `style-${(storyIdx % 4) + 1}`;
      storyWishOverlay.classList.add(`wish-${styleType}`);

      if (wishStyleBadge) wishStyleBadge.textContent = photo.tag || `STYLE ${(storyIdx % 4) + 1}`;
      if (wishBannerTitle) wishBannerTitle.textContent = photo.title || 'HAPPY BIRTHDAY';
      if (wishBannerSub) wishBannerSub.textContent = photo.subtitle || 'To My Tai 💖';
    }

    // Update progress bars
    list.forEach((_, i) => {
      const seg = document.getElementById(`inline-story-bar-${i}`);
      if (!seg) return;
      const fill = seg.querySelector('.story-bar-fill');
      if (!fill) return;
      if (i < storyIdx) {
        fill.style.width = '100%';
        fill.style.transition = 'none';
      } else if (i === storyIdx) {
        fill.style.width = '0%';
        fill.style.transition = 'none';
        if (autoPlay) {
          setTimeout(() => {
            fill.style.transition = `width ${storyDuration}ms linear`;
            fill.style.width = '100%';
          }, 40);
        }
      } else {
        fill.style.width = '0%';
        fill.style.transition = 'none';
      }
    });

    clearTimeout(storyTimer);
    storyTimer = null;
    if (autoPlay) {
      storyTimer = setTimeout(() => {
        showInlineStorySlide(storyIdx + 1, true);
      }, storyDuration);
    }
  }

  if (storyTouchLeft) {
    storyTouchLeft.addEventListener('click', () => {
      showInlineStorySlide(storyIdx - 1, true);
    });
  }
  if (storyTouchRight) {
    storyTouchRight.addEventListener('click', () => {
      showInlineStorySlide(storyIdx + 1, true);
    });
  }

  if (storyLikeBtn) {
    storyLikeBtn.addEventListener('click', (e) => {
      createClickHeart(e.clientX || window.innerWidth / 2, e.clientY || 400);
      playPopSound();
      triggerConfetti(1);
    });
  }

  if (storyConfettiBtn) {
    storyConfettiBtn.addEventListener('click', () => {
      triggerConfetti(2);
      playCelebrationChime();
    });
  }

  // 2. FREELY DRAGGABLE SCRAPBOOK DESK (8 PHOTOS)
  let topZIndex = 50;

  function initDraggableScrapbook() {
    const desk = document.getElementById('scrapbookDesk');
    if (!desk || !BIRTHDAY_CONFIG.polaroids) return;

    desk.innerHTML = '';
    const deskWidth = desk.clientWidth || 650;
    const deskHeight = desk.clientHeight || 560;

    BIRTHDAY_CONFIG.polaroids.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-draggable-card';
      card.id = `draggable-card-${idx}`;

      // Calculate organic scattered positions across the desk
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const posX = Math.max(10, Math.min(deskWidth - 220, (col * (deskWidth / 4.2)) + (Math.random() * 20 - 10)));
      const posY = Math.max(15, Math.min(deskHeight - 280, (row * 240) + (Math.random() * 20 - 10)));
      const rot = (Math.random() * 10 - 5);

      card.style.left = `${posX}px`;
      card.style.top = `${posY}px`;
      card.style.transform = `rotate(${rot}deg)`;
      card.dataset.rotation = rot;

      card.innerHTML = `
        <div class="polaroid-card-flipper">
          <div class="polaroid-front-side">
            <div class="polaroid-tape-badge"></div>
            <div class="polaroid-thumb-wrap">
              <img src="${item.image}" alt="Polaroid ${idx + 1}" loading="lazy">
            </div>
            <div class="polaroid-hand-caption">${item.caption}</div>
            <div class="polaroid-meta-row">
              <span>${item.date || 'Golden Moment'}</span>
              <button class="flip-icon-btn">Flip 🔄</button>
            </div>
          </div>

          <div class="polaroid-back-side">
            <div class="scrapbook-back-stamp">18.09 ✦ 8:10 PM</div>
            <div class="scrapbook-back-msg">"${item.backNote}"</div>
            <button class="scrapbook-flip-back-btn">↩️ Flip Back</button>
          </div>
        </div>
      `;

      // Drag and Drop Physics
      setupDraggableCard(card, desk);

      // 3D Flip Action
      const flipBtn = card.querySelector('.flip-icon-btn');
      const flipBackBtn = card.querySelector('.scrapbook-flip-back-btn');
      if (flipBtn) {
        flipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('flipped');
          playSynthNote(523.25, 0.12, 0);
        });
      }
      if (flipBackBtn) {
        flipBackBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('flipped');
        });
      }

      desk.appendChild(card);
    });
  }

  function setupDraggableCard(card, desk) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let cardLeft = 0, cardTop = 0;
    let hasMoved = false;

    function onPointerDown(e) {
      if (e.target.closest('button')) return;
      isDragging = true;
      hasMoved = false;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;

      cardLeft = parseFloat(card.style.left) || 0;
      cardTop = parseFloat(card.style.top) || 0;

      topZIndex++;
      card.style.zIndex = topZIndex;
      card.style.transform = `scale(1.06) rotate(${card.dataset.rotation || 0}deg)`;

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved = true;

      const newLeft = cardLeft + dx;
      const newTop = cardTop + dy;

      card.style.left = `${newLeft}px`;
      card.style.top = `${newTop}px`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      card.style.transform = `scale(1) rotate(${card.dataset.rotation || 0}deg)`;

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    }

    card.addEventListener('mousedown', onPointerDown);
    card.addEventListener('touchstart', onPointerDown, { passive: true });
  }

  const realignBtn = document.getElementById('realignPolaroidsBtn');
  if (realignBtn) {
    realignBtn.addEventListener('click', () => {
      initDraggableScrapbook();
      triggerConfetti(1);
    });
  }

  // 3. PHOTO SLIDESHOW CAROUSEL
  let slideIdx = 0;
  const slideImg = document.getElementById('slideImg');
  const slideTitle = document.getElementById('slideTitle');
  const slideDesc = document.getElementById('slideDesc');
  const slideEra = document.getElementById('slideEra');
  const slidePrevBtn = document.getElementById('slidePrevBtn');
  const slideNextBtn = document.getElementById('slideNextBtn');
  const slideshowDots = document.getElementById('slideshowDots');

  function initSlideshow() {
    const list = BIRTHDAY_CONFIG.slideshow || BIRTHDAY_CONFIG.polaroids;
    if (!list || !list.length || !slideshowDots) return;

    slideshowDots.innerHTML = '';
    list.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => showSlide(i));
      slideshowDots.appendChild(dot);
    });

    showSlide(0);
  }

  function showSlide(index) {
    const list = BIRTHDAY_CONFIG.slideshow || BIRTHDAY_CONFIG.polaroids;
    if (!list || !list.length) return;

    if (index >= list.length) index = 0;
    if (index < 0) index = list.length - 1;

    slideIdx = index;
    const item = list[slideIdx];

    if (slideImg) {
      slideImg.style.opacity = '0.5';
      setTimeout(() => {
        slideImg.src = item.image;
        slideImg.style.opacity = '1';
      }, 150);
    }

    if (slideEra) slideEra.textContent = item.era || `STAGE ${slideIdx + 1} // LIFE TIMELINE`;
    if (slideTitle) slideTitle.textContent = item.title || item.caption || 'Birthday Queen';
    if (slideDesc) slideDesc.textContent = item.desc || item.date || 'Priceless Moment';

    document.querySelectorAll('.slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === slideIdx);
    });
  }

  if (slidePrevBtn) slidePrevBtn.addEventListener('click', () => showSlide(slideIdx - 1));
  if (slideNextBtn) slideNextBtn.addEventListener('click', () => showSlide(slideIdx + 1));

  // --- 6. LUXURY BIRTHDAY CAKE & CANDLE BLOW ---
  const candleWrappers = document.querySelectorAll('.candle-wrapper');
  const blowBtn = document.getElementById('blowBtn');
  const cutCakeBtn = document.getElementById('cutCakeBtn');
  const cakeSlicePlate = document.getElementById('cakeSlicePlate');
  const celebrationBanner = document.getElementById('celebrationBanner');
  let blownCandlesCount = 0;
  const totalCandles = candleWrappers.length;

  candleWrappers.forEach(cw => {
    cw.addEventListener('click', () => {
      const flame = cw.querySelector('.candle-flame');
      if (!flame.classList.contains('blown')) {
        extinguishFlame(flame);
        playPopSound();
      }
    });
  });

  function extinguishFlame(flame) {
    flame.classList.add('blown');
    blownCandlesCount++;

    if (blownCandlesCount >= totalCandles) {
      triggerConfetti(4);
      playCelebrationChime();
      if (celebrationBanner) celebrationBanner.classList.remove('hidden');
      if (blowBtn) {
        blowBtn.style.opacity = '0.6';
        blowBtn.style.pointerEvents = 'none';
        document.getElementById('blowBtnText').textContent = 'All Candles Blown Out! 🎂';
      }
    }
  }

  if (blowBtn) {
    blowBtn.addEventListener('click', () => {
      candleWrappers.forEach((cw, idx) => {
        setTimeout(() => {
          const flame = cw.querySelector('.candle-flame');
          extinguishFlame(flame);
        }, idx * 120);
      });
    });
  }

  if (cutCakeBtn && cakeSlicePlate) {
    cutCakeBtn.addEventListener('click', () => {
      cakeSlicePlate.classList.remove('hidden');
      cutCakeBtn.style.display = 'none';
      playSynthNote(659.25, 0.2, 0);
      triggerConfetti(2);
    });
  }

  // --- 7. VIRAL MINI-GAMES ARCADE (CHAPTER 4) ---
  const gameTabs = document.querySelectorAll('.game-tab-btn');
  const gamePanels = document.querySelectorAll('.game-panel');

  gameTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      gameTabs.forEach(t => t.classList.remove('active'));
      gamePanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `game-${tab.dataset.game}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');

      if (tab.dataset.game === 'balloon') initBalloonGame();
      if (tab.dataset.game === 'jigsaw') initJigsawPuzzle();
    });
  });

  // BALLOON POP
  const balloonCompliments = [
    "Warmest heart on earth! 💖",
    "Unlimited boba on me! 🧋",
    "World is 100x funnier with you! 😂",
    "Flawless aesthetic taste! 👑",
    "Perfectionist Virgo Queen! ✨",
    "Forever my #1 partner in crime! 👯‍♀️"
  ];
  const balloonColors = ['#ff7597', '#ffd27d', '#c084fc', '#70b8ff', '#ff9ebb', '#48cae4'];
  let poppedCount = 0;

  function initBalloonGame() {
    const arena = document.getElementById('balloonArena');
    const counterEl = document.getElementById('poppedCount');
    if (!arena) return;

    arena.innerHTML = '';
    poppedCount = 0;
    if (counterEl) counterEl.textContent = '0';

    balloonCompliments.forEach((comp, idx) => {
      const bItem = document.createElement('div');
      bItem.className = 'balloon-item';
      const color = balloonColors[idx % balloonColors.length];

      bItem.innerHTML = `
        <div class="balloon-body" style="background: radial-gradient(circle at 35% 35%, #fff 0%, ${color} 45%, #b51740 100%);">
          🎈
        </div>
        <div class="balloon-knot" style="background: ${color};"></div>
        <div class="balloon-string"></div>
        <div class="balloon-pop-msg">${comp}</div>
      `;

      bItem.addEventListener('click', () => {
        if (!bItem.classList.contains('popped')) {
          bItem.classList.add('popped');
          poppedCount++;
          if (counterEl) counterEl.textContent = poppedCount;
          playPopSound();
          triggerConfetti(1);

          if (poppedCount === balloonCompliments.length) {
            triggerConfetti(3);
          }
        }
      });

      arena.appendChild(bItem);
    });
  }

  const resetBalloonsBtn = document.getElementById('resetBalloonsBtn');
  if (resetBalloonsBtn) {
    resetBalloonsBtn.addEventListener('click', () => {
      initBalloonGame();
      triggerConfetti(1);
    });
  }

  // CATCHER GAME
  let catcherScore = 0;
  let catcherActive = false;
  let catcherInterval = null;
  const catcherArena = document.getElementById('catcherArena');
  const catcherBasket = document.getElementById('catcherBasket');
  const catcherScoreEl = document.getElementById('catcherScore');
  const startCatcherBtn = document.getElementById('startCatcherBtn');

  const catchableItems = ['🍓', '🍰', '💖', '🧁', '🎁', '✨', '🎀'];

  if (catcherArena && catcherBasket) {
    catcherArena.addEventListener('mousemove', (e) => {
      const rect = catcherArena.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(30, Math.min(rect.width - 30, x));
      catcherBasket.style.left = `${x}px`;
    });

    catcherArena.addEventListener('touchmove', (e) => {
      const rect = catcherArena.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left;
      x = Math.max(30, Math.min(rect.width - 30, x));
      catcherBasket.style.left = `${x}px`;
    }, { passive: true });
  }

  if (startCatcherBtn) {
    startCatcherBtn.addEventListener('click', () => {
      if (catcherActive) return;
      catcherActive = true;
      catcherScore = 0;
      if (catcherScoreEl) catcherScoreEl.textContent = '0';
      startCatcherBtn.textContent = 'Catching in Progress! 🧺';
      startCatcherBtn.style.opacity = '0.7';

      catcherInterval = setInterval(spawnFallingItem, 800);
      setTimeout(stopCatcherGame, 25000);
    });
  }

  function spawnFallingItem() {
    if (!catcherActive || !catcherArena) return;
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.textContent = catchableItems[Math.floor(Math.random() * catchableItems.length)];
    const arenaWidth = catcherArena.clientWidth || 300;
    const startX = Math.random() * (arenaWidth - 40) + 20;
    item.style.left = `${startX}px`;
    item.style.top = '0px';
    catcherArena.appendChild(item);

    let posY = 0;
    const fallSpeed = Math.random() * 2 + 2.5;

    function fall() {
      if (!catcherActive) {
        item.remove();
        return;
      }
      posY += fallSpeed;
      item.style.top = `${posY}px`;

      const bRect = catcherBasket.getBoundingClientRect();
      const iRect = item.getBoundingClientRect();

      if (
        iRect.bottom >= bRect.top &&
        iRect.top <= bRect.bottom &&
        iRect.right >= bRect.left &&
        iRect.left <= bRect.right
      ) {
        catcherScore++;
        if (catcherScoreEl) catcherScoreEl.textContent = catcherScore;
        playCatchChime();
        item.remove();
        return;
      }

      if (posY > catcherArena.clientHeight) {
        item.remove();
      } else {
        requestAnimationFrame(fall);
      }
    }
    requestAnimationFrame(fall);
  }

  function stopCatcherGame() {
    catcherActive = false;
    clearInterval(catcherInterval);
    if (startCatcherBtn) {
      startCatcherBtn.textContent = '▶️ Play Again';
      startCatcherBtn.style.opacity = '1';
    }
    triggerConfetti(2);
    alert(`🎉 Awesome! You caught ${catcherScore} treats for the birthday girl! 💖`);
  }

  // FORTUNE WHEEL
  const fortuneWheel = document.getElementById('fortuneWheel');
  const spinWheelBtn = document.getElementById('spinWheelBtn');
  const wheelResult = document.getElementById('wheelResult');
  let isWheelSpinning = false;
  let currentWheelAngle = 0;

  const wheelPrizes = [
    "✈️ Dream Trip with Bestie!",
    "🧋 Endless Free Boba & Coffee!",
    "👑 Ultimate Main Character Year!",
    "💸 Huge Wealth & Career Wins!",
    "💖 Boundless Joy & Peaceful Sleep!",
    "✨ Glow-Up of the Century!"
  ];

  if (spinWheelBtn && fortuneWheel) {
    spinWheelBtn.addEventListener('click', () => {
      if (isWheelSpinning) return;
      isWheelSpinning = true;
      spinWheelBtn.style.opacity = '0.6';

      const randomSpins = Math.floor(Math.random() * 5 + 5);
      const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
      const segmentAngle = 360 / wheelPrizes.length;
      const targetAngle = currentWheelAngle + randomSpins * 360 + (prizeIndex * segmentAngle) + segmentAngle / 2;

      currentWheelAngle = targetAngle;
      fortuneWheel.style.transform = `rotate(${targetAngle}deg)`;

      playSynthNote(440, 0.2, 0);

      setTimeout(() => {
        isWheelSpinning = false;
        spinWheelBtn.style.opacity = '1';
        if (wheelResult) wheelResult.textContent = `🎉 Prophecy: ${wheelPrizes[prizeIndex]}`;
        playCelebrationChime();
        triggerConfetti(2);
      }, 4000);
    });
  }

  // --- 7B. MINI-GAME 4: 25-PIECE PHOTO JIGSAW PUZZLE (IN-PLACE JUMBLED SWAP) ---
  const jigsawBoard = document.getElementById('jigsawBoard');
  const jigsawPlacedCountEl = document.getElementById('jigsawPlacedCount');
  const jigsawStatusHint = document.getElementById('jigsawStatusHint');
  const resetJigsawBtn = document.getElementById('resetJigsawBtn');
  const autoSolveJigsawBtn = document.getElementById('autoSolveJigsawBtn');
  const toggleJigsawPreviewBtn = document.getElementById('toggleJigsawPreviewBtn');
  const jigsawPreviewBox = document.getElementById('jigsawPreviewBox');
  const jigsawPreviewImg = document.getElementById('jigsawPreviewImg');
  const jigsawWinBanner = document.getElementById('jigsawWinBanner');

  let jigsawSelectedTile = null; // Track selected tile for swapping
  let jigsawPiecesState = []; // Current array of 25 piece IDs in board positions 0..24
  let jigsawInitialized = false;

  const JIGSAW_GRID_SIZE = 5; // 5x5 = 25 pieces
  const JIGSAW_TOTAL_PIECES = 25;

  function getJigsawImageSrc() {
    if (BIRTHDAY_CONFIG.jigsawImage) {
      return BIRTHDAY_CONFIG.jigsawImage;
    }
    return "images/jigsaw_hero_square.jpg";
  }

  // Pre-calculate puzzle tab types for an authentic 5x5 jigsaw lock:
  // Each interior edge has a matching tab (+) and blank (-)
  function getJigsawEdgeTypes(row, col) {
    // 0 = flat boundary edge
    // 1 = tab (outward bump)
    // -1 = blank (inward socket)
    const top = (row === 0) ? 0 : ((row % 2 === 0) ? 1 : -1);
    const right = (col === JIGSAW_GRID_SIZE - 1) ? 0 : ((col % 2 === 0) ? 1 : -1);
    const bottom = (row === JIGSAW_GRID_SIZE - 1) ? 0 : ((row % 2 === 0) ? -1 : 1);
    const left = (col === 0) ? 0 : ((col % 2 === 0) ? -1 : 1);
    return { top, right, bottom, left };
  }

  function initJigsawPuzzle() {
    if (!jigsawBoard) return;
    const imgSrc = getJigsawImageSrc();

    if (jigsawPreviewImg) jigsawPreviewImg.src = imgSrc;
    if (jigsawWinBanner) jigsawWinBanner.classList.add('hidden');
    if (jigsawStatusHint) jigsawStatusHint.textContent = 'Tap any piece to select it';
    jigsawBoard.classList.remove('puzzle-finished');

    jigsawBoard.innerHTML = '';
    jigsawSelectedTile = null;

    // Create array of 25 piece indices
    let pieces = Array.from({ length: JIGSAW_TOTAL_PIECES }, (_, i) => i);

    // Shuffle into a jumbled layout (guaranteeing it is not already solved)
    let isShuffled = false;
    while (!isShuffled) {
      for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
      }
      // Make sure at least 20 pieces are not in their original spots
      const misplaced = pieces.filter((val, idx) => val !== idx).length;
      if (misplaced >= 20) isShuffled = true;
    }

    jigsawPiecesState = pieces;

    // Render the 25 in-place jumbled jigsaw tiles
    renderJigsawBoard(imgSrc);
    updateJigsawScore();
    jigsawInitialized = true;
  }

  function renderJigsawBoard(imgSrc) {
    if (!jigsawBoard) return;
    jigsawBoard.innerHTML = '';

    jigsawPiecesState.forEach((pieceIdx, currentSlot) => {
      // Piece's correct intrinsic row & col (for image background)
      const correctRow = Math.floor(pieceIdx / JIGSAW_GRID_SIZE);
      const correctCol = pieceIdx % JIGSAW_GRID_SIZE;

      // Jigsaw interlocking shape class based on correct row & col
      const edges = getJigsawEdgeTypes(correctRow, correctCol);
      let shapeClass = 'jigsaw-tab-standard';
      if (correctRow === 0 && correctCol === 0) shapeClass = 'jigsaw-corner-tl';
      else if (correctRow === 0 && correctCol === JIGSAW_GRID_SIZE - 1) shapeClass = 'jigsaw-corner-tr';
      else if (correctRow === JIGSAW_GRID_SIZE - 1 && correctCol === 0) shapeClass = 'jigsaw-corner-bl';
      else if (correctRow === JIGSAW_GRID_SIZE - 1 && correctCol === JIGSAW_GRID_SIZE - 1) shapeClass = 'jigsaw-corner-br';
      else if (correctRow === 0) shapeClass = 'jigsaw-edge-top';
      else if (correctRow === JIGSAW_GRID_SIZE - 1) shapeClass = 'jigsaw-edge-bottom';
      else if (correctCol === 0) shapeClass = 'jigsaw-edge-left';
      else if (correctCol === JIGSAW_GRID_SIZE - 1) shapeClass = 'jigsaw-edge-right';

      const tile = document.createElement('div');
      tile.className = `jigsaw-tile ${shapeClass}`;
      tile.id = `jigsaw-tile-slot-${currentSlot}`;
      tile.dataset.slot = currentSlot;
      tile.dataset.pieceIndex = pieceIdx;

      // Exact pixel-perfect tile image (eliminates any seams or doubled parts!)
      const inner = document.createElement('div');
      inner.className = 'jigsaw-piece-inner';
      inner.style.backgroundImage = `url("images/jigsaw_tiles/tile_${pieceIdx}.jpg")`;
      inner.style.backgroundSize = 'cover';
      inner.style.backgroundPosition = 'center';
      inner.style.backgroundRepeat = 'no-repeat';

      // Realistic jigsaw puzzle tab / notch overlays
      const jigsawTabTop = document.createElement('span');
      jigsawTabTop.className = `j-edge j-top ${edges.top === 1 ? 'tab-out' : (edges.top === -1 ? 'tab-in' : '')}`;
      const jigsawTabRight = document.createElement('span');
      jigsawTabRight.className = `j-edge j-right ${edges.right === 1 ? 'tab-out' : (edges.right === -1 ? 'tab-in' : '')}`;
      const jigsawTabBottom = document.createElement('span');
      jigsawTabBottom.className = `j-edge j-bottom ${edges.bottom === 1 ? 'tab-out' : (edges.bottom === -1 ? 'tab-in' : '')}`;
      const jigsawTabLeft = document.createElement('span');
      jigsawTabLeft.className = `j-edge j-left ${edges.left === 1 ? 'tab-out' : (edges.left === -1 ? 'tab-in' : '')}`;

      inner.appendChild(jigsawTabTop);
      inner.appendChild(jigsawTabRight);
      inner.appendChild(jigsawTabBottom);
      inner.appendChild(jigsawTabLeft);

      // Mini indicator badge for piece
      const numBadge = document.createElement('span');
      numBadge.className = 'jigsaw-tile-badge';
      numBadge.textContent = pieceIdx + 1;
      inner.appendChild(numBadge);

      tile.appendChild(inner);

      // Check if this piece is in its correct place
      if (pieceIdx === currentSlot) {
        tile.classList.add('is-correct');
      }

      // Tap / Click to select and swap
      tile.addEventListener('click', () => handleTileClick(tile, currentSlot));

      // Touch drag and drop support
      tile.draggable = true;
      tile.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', currentSlot);
        tile.classList.add('is-dragging');
      });
      tile.addEventListener('dragend', () => {
        tile.classList.remove('is-dragging');
      });
      tile.addEventListener('dragover', (e) => {
        e.preventDefault();
        tile.classList.add('swap-target-hover');
      });
      tile.addEventListener('dragleave', () => {
        tile.classList.remove('swap-target-hover');
      });
      tile.addEventListener('drop', (e) => {
        e.preventDefault();
        tile.classList.remove('swap-target-hover');
        const fromSlot = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (!isNaN(fromSlot) && fromSlot !== currentSlot) {
          executeSwap(fromSlot, currentSlot);
        }
      });

      jigsawBoard.appendChild(tile);
    });
  }

  function handleTileClick(tile, slot) {
    if (!jigsawSelectedTile) {
      // Step 1: Select First Piece
      jigsawSelectedTile = { tile, slot };
      tile.classList.add('is-selected');
      playPopSound();
      if (jigsawStatusHint) {
        jigsawStatusHint.textContent = `Piece #${parseInt(tile.dataset.pieceIndex) + 1} selected! Now tap another piece to SWAP`;
      }
    } else {
      // Step 2: Clicked piece again? Deselect
      if (jigsawSelectedTile.slot === slot) {
        tile.classList.remove('is-selected');
        jigsawSelectedTile = null;
        if (jigsawStatusHint) jigsawStatusHint.textContent = 'Tap any piece to select it';
        return;
      }

      // Execute in-place swap between jigsawSelectedTile.slot and current slot
      const fromSlot = jigsawSelectedTile.slot;
      const toSlot = slot;
      jigsawSelectedTile.tile.classList.remove('is-selected');
      jigsawSelectedTile = null;

      executeSwap(fromSlot, toSlot);
    }
  }

  function executeSwap(slotA, slotB) {
    // Swap items in state array
    const temp = jigsawPiecesState[slotA];
    jigsawPiecesState[slotA] = jigsawPiecesState[slotB];
    jigsawPiecesState[slotB] = temp;

    playPopSound();
    renderJigsawBoard(getJigsawImageSrc());
    updateJigsawScore();

    // Check if new positions are correct
    if (jigsawPiecesState[slotA] === slotA || jigsawPiecesState[slotB] === slotB) {
      playCatchChime();
    }

    if (jigsawStatusHint) {
      jigsawStatusHint.textContent = 'Pieces swapped! Tap next piece to rearrange';
    }
  }

  function updateJigsawScore() {
    let correctCount = 0;
    jigsawPiecesState.forEach((pieceIdx, slotIdx) => {
      if (pieceIdx === slotIdx) correctCount++;
    });

    if (jigsawPlacedCountEl) jigsawPlacedCountEl.textContent = correctCount;

    if (correctCount === JIGSAW_TOTAL_PIECES) {
      // Completed! Seamlessly join pieces into one continuous photograph
      triggerConfetti(4);
      playCelebrationChime();
      if (jigsawWinBanner) jigsawWinBanner.classList.remove('hidden');
      if (jigsawStatusHint) jigsawStatusHint.textContent = '🎉 Completed! All 25 pieces matched perfectly!';
      if (jigsawBoard) jigsawBoard.classList.add('puzzle-finished');
      document.querySelectorAll('.jigsaw-tile').forEach(t => t.classList.add('puzzle-finished'));
    } else {
      if (jigsawBoard) jigsawBoard.classList.remove('puzzle-finished');
    }
  }

  function autoSolveJigsaw() {
    jigsawPiecesState = Array.from({ length: JIGSAW_TOTAL_PIECES }, (_, i) => i);
    renderJigsawBoard(getJigsawImageSrc());
    updateJigsawScore();
    triggerConfetti(3);
    playCelebrationChime();
  }

  if (resetJigsawBtn) {
    resetJigsawBtn.addEventListener('click', () => {
      initJigsawPuzzle();
      triggerConfetti(1);
    });
  }

  if (autoSolveJigsawBtn) {
    autoSolveJigsawBtn.addEventListener('click', () => {
      autoSolveJigsaw();
    });
  }

  if (toggleJigsawPreviewBtn && jigsawPreviewBox) {
    toggleJigsawPreviewBtn.addEventListener('click', () => {
      jigsawPreviewBox.classList.toggle('hidden');
      toggleJigsawPreviewBtn.textContent = jigsawPreviewBox.classList.contains('hidden') ? '👁️ Show Reference Photo' : '🙈 Hide Reference';
    });
  }

  // --- 8. REALISTIC GOLDEN FOIL SCRATCH CARDS (100% ACCURATE HIT POINT) ---
  let scratchInitialized = false;

  function initLuxuryScratchCards() {
    if (scratchInitialized) return;
    const grid = document.getElementById('scratchCardGrid');
    if (!grid || !BIRTHDAY_CONFIG.scratchCards) return;

    grid.innerHTML = '';
    BIRTHDAY_CONFIG.scratchCards.forEach((cardData, idx) => {
      const box = document.createElement('div');
      box.className = 'scratch-card-box-luxury';

      const secretContent = document.createElement('div');
      secretContent.className = 'scratch-revealed-content';
      secretContent.innerHTML = `
        <span class="scratch-card-badge">SECRET FORTUNE #${idx + 1}</span>
        <h4>${cardData.title}</h4>
        <p>${cardData.secret}</p>
      `;

      const progressPill = document.createElement('div');
      progressPill.className = 'scratch-progress-pill';
      progressPill.textContent = '🪙 Scratch with Coin: 0%';

      const canvas = document.createElement('canvas');
      canvas.className = 'scratch-canvas';
      canvas.id = `scratch-canvas-${idx}`;

      box.appendChild(secretContent);
      box.appendChild(progressPill);
      box.appendChild(canvas);
      grid.appendChild(box);

      setupAccurateScratchCanvas(canvas, progressPill, cardData.preview);
    });

    scratchInitialized = true;
  }

  function setupAccurateScratchCanvas(canvas, progressPill, previewText) {
    // Exact sizing calculation to eliminate cursor offset bug on Cards 1 & 2
    const rect = canvas.getBoundingClientRect();
    const width = (canvas.width = rect.width || 240);
    const height = (canvas.height = rect.height || 220);
    const ctx = canvas.getContext('2d');

    // Luxurious Brushed Gold Metallic Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#eacda3');
    grad.addColorStop(0.25, '#d6ae7b');
    grad.addColorStop(0.5, '#fce7ba');
    grad.addColorStop(0.75, '#e6b980');
    grad.addColorStop(1, '#caa066');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Star sparkle dots pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.arc((i * 37) % width, (i * 29) % height, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH WITH COIN ✨', width / 2, height / 2 - 14);

    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = '11px Outfit, sans-serif';
    ctx.fillText(previewText || 'Rub to reveal', width / 2, height / 2 + 16);

    let isScratching = false;
    let strokeCount = 0;
    let throttleTimer = null;

    function scratch(e) {
      if (!isScratching) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const cRect = canvas.getBoundingClientRect();

      // Precise Scale Ratio ensures hit point is 100% under cursor
      const scaleX = canvas.width / cRect.width;
      const scaleY = canvas.height / cRect.height;
      const x = (clientX - cRect.left) * scaleX;
      const y = (clientY - cRect.top) * scaleY;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();

      strokeCount++;
      if (strokeCount % 4 === 0) playScratchSound();

      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          checkScratchProgress(canvas, ctx, width, height, progressPill);
          throttleTimer = null;
        }, 120);
      }
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
    canvas.addEventListener('touchmove', scratch, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });
  }

  function checkScratchProgress(canvas, ctx, w, h, pill) {
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let clearCount = 0;
      for (let i = 3; i < data.length; i += 4 * 24) {
        if (data[i] === 0) clearCount++;
      }
      const totalSampled = data.length / (4 * 24);
      const percent = Math.min(100, Math.floor((clearCount / totalSampled) * 100));

      if (pill) pill.textContent = `🪙 Scratched: ${percent}%`;

      if (percent > 45) {
        canvas.style.opacity = '0';
        if (pill) pill.style.display = 'none';
        setTimeout(() => canvas.remove(), 400);
        triggerConfetti(1);
        playCelebrationChime();
      }
    } catch(e) {}
  }

  const autoScratchBtn = document.getElementById('autoScratchBtn');
  if (autoScratchBtn) {
    autoScratchBtn.addEventListener('click', () => {
      document.querySelectorAll('.scratch-canvas').forEach(canvas => {
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 350);
      });
      document.querySelectorAll('.scratch-progress-pill').forEach(p => p.remove());
      triggerConfetti(2);
      playCelebrationChime();
    });
  }

  // --- 9. SKY LANTERN WISHING WELL ---
  const releaseBtn = document.getElementById('releaseLanternBtn');
  const wishInput = document.getElementById('wishInput');
  const wishesTray = document.getElementById('wishesTray');

  if (releaseBtn && wishInput) {
    releaseBtn.addEventListener('click', releaseWish);
    wishInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') releaseWish();
    });
  }

  function releaseWish() {
    const wishText = wishInput.value.trim();
    if (!wishText) return;

    const tag = document.createElement('span');
    tag.className = 'wish-tag';
    tag.innerHTML = `🏮 "${wishText}"`;
    wishesTray.appendChild(tag);

    createFlyingLantern();

    wishInput.value = '';
    triggerConfetti(1);
  }

  function createFlyingLantern() {
    const lantern = document.createElement('div');
    lantern.className = 'flying-lantern';
    lantern.style.left = `${Math.random() * 70 + 15}vw`;
    lantern.style.bottom = '10px';
    document.body.appendChild(lantern);
    setTimeout(() => lantern.remove(), 7000);
  }

  // --- 10. AUDIO ENGINE ---
  let audioCtx = null;
  let isPlayingAudio = false;
  let audioLoopTimeout = null;

  const audioPill = document.getElementById('audioPill');
  const vinylIcon = document.getElementById('vinylIcon');
  const audioWaves = document.getElementById('audioWaves');
  const trackStatus = document.getElementById('trackStatus');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  const melody = [
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.6 },
    { f: 261.63, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 1.0 },
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.6 },
    { f: 261.63, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.0 },
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 523.25, d: 0.6 },
    { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 0.6 }, { f: 293.66, d: 0.8 },
    { f: 466.16, d: 0.3 }, { f: 466.16, d: 0.3 }, { f: 440.00, d: 0.6 },
    { f: 349.23, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.2 }
  ];

  function playSynthNote(freq, duration, timeOffset = 0) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + timeOffset);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime + timeOffset);
    gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + timeOffset + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + timeOffset + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + timeOffset);
    osc.stop(audioCtx.currentTime + timeOffset + duration + 0.1);
  }

  function playMelodyLoop() {
    if (!isPlayingAudio) return;
    initAudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    let offset = 0;
    melody.forEach(note => {
      playSynthNote(note.f, note.d, offset);
      offset += note.d + 0.08;
    });

    audioLoopTimeout = setTimeout(() => {
      if (isPlayingAudio) playMelodyLoop();
    }, (offset + 1.5) * 1000);
  }

  function startAudio() {
    if (isPlayingAudio) return;
    initAudioContext();
    isPlayingAudio = true;
    vinylIcon.classList.add('spinning');
    audioWaves.classList.add('playing');
    trackStatus.textContent = 'Playing Pastel Lo-Fi 🎵';
    playMelodyLoop();
  }

  function pauseAudio() {
    isPlayingAudio = false;
    clearTimeout(audioLoopTimeout);
    vinylIcon.classList.remove('spinning');
    audioWaves.classList.remove('playing');
    trackStatus.textContent = 'Tap to Play 🎵';
  }

  if (audioPill) {
    audioPill.addEventListener('click', () => {
      if (isPlayingAudio) pauseAudio();
      else startAudio();
    });
  }

  function playPopSound() {
    initAudioContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  }

  function playScratchSound() {
    initAudioContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320 + Math.random() * 80, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.07);
  }

  function playCatchChime() {
    initAudioContext();
    if (!audioCtx) return;
    [659.25, 783.99].forEach((f, idx) => playSynthNote(f, 0.15, idx * 0.08));
  }

  function playCelebrationChime() {
    initAudioContext();
    if (!audioCtx) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      playSynthNote(freq, 0.4, idx * 0.12);
    });
  }

  // --- 11. HIGH-PERFORMANCE CONFETTI ---
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiPieces = [];
  let confettiLoopRunning = false;

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  const confettiColors = ['#ff7597', '#ffd27d', '#c084fc', '#70b8ff', '#ffffff', '#ff477e'];

  function triggerConfetti(burstCount = 3) {
    if (!confettiCanvas) return;
    for (let b = 0; b < burstCount; b++) {
      setTimeout(() => {
        const originX = Math.random() * confettiCanvas.width;
        for (let i = 0; i < 35; i++) {
          confettiPieces.push({
            x: originX,
            y: confettiCanvas.height * 0.4,
            w: Math.random() * 8 + 4,
            h: Math.random() * 6 + 4,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            vx: (Math.random() - 0.5) * 14,
            vy: Math.random() * -12 - 4,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 8,
            gravity: 0.35,
            opacity: 1
          });
        }
        if (!confettiLoopRunning) {
          confettiLoopRunning = true;
          updateConfetti();
        }
      }, b * 160);
    }
  }

  function updateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.01;

      if (p.opacity <= 0 || p.y > confettiCanvas.height + 50) {
        confettiPieces.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    }

    if (confettiPieces.length > 0) {
      requestAnimationFrame(updateConfetti);
    } else {
      confettiLoopRunning = false;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  const burstMoreBtn = document.getElementById('burstMoreConfettiBtn');
  if (burstMoreBtn) burstMoreBtn.addEventListener('click', () => triggerConfetti(3));

  // --- 12. IN-BROWSER CUSTOMIZER DRAWER ---
  const customizerDrawer = document.getElementById('customizerDrawer');
  const openCustomizerBtn = document.getElementById('openCustomizerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const saveCustomizerBtn = document.getElementById('saveCustomizerBtn');

  if (openCustomizerBtn) {
    openCustomizerBtn.addEventListener('click', () => {
      customizerDrawer.classList.add('open');
      renderPhotoUploadInputs();
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      customizerDrawer.classList.remove('open');
    });
  }

  function renderPhotoUploadInputs() {
    const list = document.getElementById('photoUploadList');
    if (!list || !BIRTHDAY_CONFIG.polaroids) return;

    list.innerHTML = '';
    BIRTHDAY_CONFIG.polaroids.forEach((pol, idx) => {
      const item = document.createElement('div');
      item.className = 'photo-upload-item';
      item.innerHTML = `
        <span>Photo #${idx + 1}</span>
        <label class="file-input-btn">
          Swap Image
          <input type="file" accept="image/*" style="display:none;" data-index="${idx}">
        </label>
      `;

      item.querySelector('input[type="file"]').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            BIRTHDAY_CONFIG.polaroids[idx].image = evt.target.result;
            if (BIRTHDAY_CONFIG.storyPhotos[idx]) {
              BIRTHDAY_CONFIG.storyPhotos[idx].image = evt.target.result;
            }
            if (BIRTHDAY_CONFIG.slideshow[idx]) {
              BIRTHDAY_CONFIG.slideshow[idx].image = evt.target.result;
            }
            initInlineStory();
            initDraggableScrapbook();
            initSlideshow();
            initJigsawPuzzle();
            triggerConfetti(1);
          };
          reader.readAsDataURL(file);
        }
      });

      list.appendChild(item);
    });
  }

  if (saveCustomizerBtn) {
    saveCustomizerBtn.addEventListener('click', () => {
      const nicknameInput = document.getElementById('custNickname');
      const birthYearInput = document.getElementById('custBirthYear');

      if (nicknameInput) BIRTHDAY_CONFIG.nickname = nicknameInput.value.trim() || 'Bestie';
      if (birthYearInput) BIRTHDAY_CONFIG.birthYear = parseInt(birthYearInput.value, 10) || 2004;

      applyConfig();
      updateCosmicStats();
      customizerDrawer.classList.remove('open');
      triggerConfetti(1);
    });
  }

  // --- INITIALIZE ---
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
  });
  applyConfig();

})();
