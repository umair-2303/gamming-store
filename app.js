/* ============================================================
   FGS — Final Gear Store
   app.js — all interactivity, rendering, and animation logic
   Vanilla ES6+. No frameworks, no build step.
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   0. CONFIG — edit these two values to go live
   ------------------------------------------------------------ */
const STORE_CONFIG = {
  // Replace with your real WhatsApp number in international format, digits only.
  whatsappNumber: '923256419082',
  displayNumber: '+92 325 6419082',
};

/* ------------------------------------------------------------
   1. GAME DATA
   All covers are CSS-generated gradients (see style.css .cover-N)
   so the demo needs zero external image assets.
   ------------------------------------------------------------ */
const GAMES = [
  { id: 1, title: 'Grand Theft Auto V', platform: 'PC / PS5 / Xbox', genre: 'Action', rating: 4.8, price: 29.99, oldPrice: 39.99, cover: 'assets/gta-5.png', tier: 'S', desc: 'The open-world classic — three criminals, one sprawling city of chaos.', stock: 'in', featured: true, bestseller: 1, newRelease: false, releaseDate: null },
  { id: 2, title: 'Forza Horizon 5', platform: 'PC / Xbox', genre: 'Racing', rating: 4.7, price: 59.99, oldPrice: null, cover: 'assets/forza-5.png', tier: 'S', desc: 'An open-world racing festival set across a vibrant, ever-changing Mexico.', stock: 'in', featured: true, bestseller: null, newRelease: false, releaseDate: null },
  { id: 3, title: 'God of War Ragnarök', platform: 'PS5 / PC', genre: 'Adventure', rating: 4.9, price: 69.99, oldPrice: null, cover: 'assets/god-of-war.png', tier: 'S', desc: 'Kratos and Atreus face the onset of Ragnarök in this cinematic saga.', stock: 'in', featured: true, bestseller: 4, newRelease: false, releaseDate: null },
  { id: 4, title: 'Taken 7', platform: 'PC / PS5', genre: 'Action', rating: 4.2, price: 39.99, oldPrice: null, cover: 'assets/TEKKEN7.PNG', tier: 'B', desc: 'A high-stakes rescue thriller, brought to life as an action shooter.', stock: 'in', featured: false, bestseller: null, newRelease: true, releaseDate: 'Aug 2026' },
  { id: 5, title: 'Grand Theft Auto: San Andreas', platform: 'PC / PS5 / Xbox / Switch', genre: 'Action', rating: 4.6, price: 19.99, oldPrice: null, cover: 'assets/gta-sa.png', tier: 'A', desc: 'The definitive edition of the legendary trip through San Andreas.', stock: 'in', featured: true, bestseller: 2, newRelease: false, releaseDate: null },
  { id: 6, title: 'Grand Theft Auto VI (Pre-Order)', platform: 'PS5 / Xbox', genre: 'Action', rating: 5.0, price: 69.99, oldPrice: null, cover: 'assets/Grand Theft Auto VI.png', tier: 'S', desc: 'Reserve your copy now and step into Vice City on day one.', stock: 'low', featured: true, bestseller: null, newRelease: true, releaseDate: 'Pre-Order · 2026' },
  { id: 7, title: 'Red Dead Redemption 2', platform: 'PC / PS5 / Xbox', genre: 'Adventure', rating: 4.9, price: 39.99, oldPrice: 49.99, cover: 'assets/RDR-2.PNG', tier: 'S', desc: 'An epic tale of outlaws and loyalty at the end of the Wild West.', stock: 'in', featured: true, bestseller: 3, newRelease: false, releaseDate: null },
  { id: 8, title: 'Call of Duty: Modern Warfare III', platform: 'PC / PS5 / Xbox', genre: 'Shooter', rating: 4.3, price: 69.99, oldPrice: null, cover: 'assets/COD.PNG', tier: 'A', desc: 'Fast, cinematic modern combat across an all-new campaign and multiplayer.', stock: 'in', featured: true, bestseller: null, newRelease: false, releaseDate: null },
  { id: 9, title: 'Cyberpunk 2077', platform: 'PC / PS5 / Xbox', genre: 'RPG', rating: 4.5, price: 49.99, oldPrice: null, cover: 'assets/CBP.PNG', tier: 'A', desc: 'A neon-soaked open-world RPG set in the sprawl of Night City.', stock: 'in', featured: true, bestseller: null, newRelease: false, releaseDate: null },
  { id: 10, title: 'EA Sports FC 26', platform: 'PC / PS5 / Xbox', genre: 'Sports', rating: 4.1, price: 69.99, oldPrice: null, cover: 'assets/FC26.PNG', tier: 'B', desc: 'The latest season of the world\u2019s biggest football sim.', stock: 'in', featured: false, bestseller: null, newRelease: true, releaseDate: 'Sep 2026' },
  { id: 11, title: "Marvel's Spider-Man 2", platform: 'PS5', genre: 'Adventure', rating: 4.8, price: 69.99, oldPrice: null, cover: 'assets/SP.PNG', tier: 'S', desc: 'Swing through New York as Peter Parker and Miles Morales.', stock: 'in', featured: true, bestseller: null, newRelease: false, releaseDate: null },
  { id: 12, title: 'The Last of Us Part II', platform: 'PS5 / PC', genre: 'Adventure', rating: 4.7, price: 39.99, oldPrice: null, cover: 'assets/THELAST.PNG', tier: 'A', desc: 'A brutal, emotional survival story years after the outbreak.', stock: 'low', featured: false, bestseller: null, newRelease: false, releaseDate: null },
  { id: 13, title: 'Elden Ring', platform: 'PC / PS5 / Xbox', genre: 'RPG', rating: 4.9, price: 59.99, oldPrice: null, cover: 'assets/ED.PNG', tier: 'S', desc: 'A sprawling dark-fantasy world built with FromSoftware\u2019s legendary difficulty.', stock: 'in', featured: true, bestseller: 5, newRelease: false, releaseDate: null },
  { id: 14, title: 'Minecraft', platform: 'PC / Xbox / Switch', genre: 'Sandbox', rating: 4.6, price: 26.99, oldPrice: null, cover: 'assets/MC.PNG', tier: 'B', desc: 'Build, mine, and survive in the world\u2019s most iconic sandbox.', stock: 'in', featured: false, bestseller: null, newRelease: false, releaseDate: null },
  { id: 15, title: 'Diablo IV', platform: 'PC / PS5 / Xbox', genre: 'RPG', rating: 4.4, price: 49.99, oldPrice: null, cover: 'assets/DBB.PNG', tier: 'A', desc: 'Return to Sanctuary in this dark, relentless action-RPG.', stock: 'in', featured: false, bestseller: null, newRelease: true, releaseDate: 'Jul 2026' },
  { id: 16, title: "Assassin's Creed Shadows", platform: 'PC / PS5 / Xbox', genre: 'Adventure', rating: 4.3, price: 69.99, oldPrice: null, cover: 'assets/ASC.PNG', tier: 'A', desc: 'Stalk feudal Japan as a shinobi and a samurai in one dual saga.', stock: 'in', featured: false, bestseller: null, newRelease: true, releaseDate: 'Mar 2026' },
  { id: 17, title: 'Far Cry 6', platform: 'PC / PS5 / Xbox', genre: 'Shooter', rating: 4.1, price: 29.99, oldPrice: null, cover: 'assets/FRC6.PNG', tier: 'B', desc: 'Spark a guerrilla revolution across the island nation of Yara.', stock: 'in', featured: false, bestseller: null, newRelease: false, releaseDate: null },
  { id: 18, title: 'Resident Evil 4', platform: 'PC / PS5 / Xbox', genre: 'Horror', rating: 4.8, price: 49.99, oldPrice: null, cover: 'assets/RE4.PNG', tier: 'S', desc: 'A ground-up reimagining of the survival-horror landmark.', stock: 'in', featured: false, bestseller: null, newRelease: false, releaseDate: null },
  { id: 19, title: 'Mortal Kombat 1', platform: 'PC / PS5 / Xbox', genre: 'Fighting', rating: 4.4, price: 59.99, oldPrice: null, cover: 'assets/cover-19.svg', tier: 'B', desc: 'A rebooted timeline reignites the franchise\u2019s brutal rivalries.', stock: 'out', featured: false, bestseller: null, newRelease: false, releaseDate: null },
  { id: 20, title: 'Horizon Forbidden West', platform: 'PS5 / PC', genre: 'RPG', rating: 4.6, price: 49.99, oldPrice: null, cover: 'assets/cover-20.svg', tier: 'A', desc: 'Aloy ventures into a deadly frontier of machines and mystery.', stock: 'in', featured: false, bestseller: null, newRelease: false, releaseDate: null },
];

const CATEGORIES = [
  { name: 'Action', art: 'cat-art-action', icon: 'bolt' },
  { name: 'Racing', art: 'cat-art-racing', icon: 'flag' },
  { name: 'Adventure', art: 'cat-art-adventure', icon: 'compass' },
  { name: 'Shooter', art: 'cat-art-shooter', icon: 'target' },
  { name: 'RPG', art: 'cat-art-rpg', icon: 'sword' },
  { name: 'Sports', art: 'cat-art-sports', icon: 'ball' },
  { name: 'Sandbox', art: 'cat-art-strategy', icon: 'chess' },
  { name: 'Horror', art: 'cat-art-horror', icon: 'skull' },
  { name: 'Fighting', art: 'cat-art-action', icon: 'bolt' },
];

const REVIEWS = [
  { name: 'D. Marsh', handle: 'PC / Steam', rating: 5, text: 'Ordered Grand Theft Auto V at 11pm, had my key before midnight. Cleanest checkout I have used for a key reseller.' },
  { name: 'K. Oyelaran', handle: 'PS5', rating: 5, text: 'The tier badges are actually accurate — grabbed God of War Ragnarök as an S-tier pick and it held up. Will keep coming back.' },
  { name: 'R. Falk', handle: 'Xbox Series X', rating: 4, text: 'Fast replies on WhatsApp, fair prices versus the storefront. Only wish the horror section was bigger.' },
  { name: 'A. Novak', handle: 'PC / Epic', rating: 5, text: 'Bought Red Dead Redemption 2 during the sale, saved a real amount over retail. No bots, no drama.' },
  { name: 'T. Ibarra', handle: 'Switch', rating: 5, text: 'Support actually knows the catalog. Asked about the GTA VI pre-order and got a real, specific answer in minutes.' },
  { name: 'S. Whitlock', handle: 'PC / PS5', rating: 4, text: 'Solid best-sellers list, matches what my squad is actually playing. Delivery took about ten minutes.' },
];

/* Simple icon paths keyed by name, used for category tiles */
const ICONS = {
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  sword: '<path d="M14.5 2 21 8.5 12 17.5 8 21l-1.5-1.5 4-4L2 6l4-4 8.5 8.5"/>',
  chess: '<path d="M9 20h6M10 20V16c2 0 2-2 1-3s-2-2-1-4a3 3 0 1 1 4 0c1 2 0 3-1 4s-1 3 1 3v4"/>',
  flag: '<path d="M5 3v18M5 4h11l-2 4 2 4H5"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/>',
  skull: '<path d="M12 3a7 7 0 0 0-7 7v3l-1 3h4l1 3h6l1-3h4l-1-3v-3a7 7 0 0 0-7-7Z"/><circle cx="9.5" cy="11" r="1"/><circle cx="14.5" cy="11" r="1"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-6 2 2-6 6-2Z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
};

/* ------------------------------------------------------------
   2. UTILITIES
   ------------------------------------------------------------ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function whatsappLink(gameTitle) {
  const message = `Hello, I'm interested in buying ${gameTitle} from FGS.`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function starString(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function stockMeta(stock) {
  if (stock === 'in') return { label: 'In Stock', color: '#8DB355' };
  if (stock === 'low') return { label: 'Low Stock', color: '#FFEA93' };
  return { label: 'Out of Stock', color: '#D90000' };
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/* ------------------------------------------------------------
   3. TOASTS
   ------------------------------------------------------------ */
function showToast(message, icon = '✓') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color:#FFEA93;font-weight:700;">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ------------------------------------------------------------
   4. CARD RENDERING
   ------------------------------------------------------------ */
function tierBadge(tier) {
  const cls = tier === 'S' ? 'tier-s' : tier === 'A' ? 'tier-a' : 'tier-b';
  return `<span class="tier-badge ${cls}">${tier}-TIER</span>`;
}

function gameCardHTML(game, opts = {}) {
  const meta = stockMeta(game.stock);
  const disabled = game.stock === 'out';
  const rankBadge = opts.rank ? `<span class="rank-medal absolute -top-3 -left-3 z-10">${opts.rank}</span>` : '';
  const newRibbon = game.newRelease && !opts.rank
    ? `<span class="absolute top-3 left-3 z-10 bg-gold text-ink-900 text-[10px] font-mono font-bold tracking-wider px-2 py-1 corner-cut-sm">NEW · ${game.releaseDate || ''}</span>`
    : '';
  const priceBlock = game.oldPrice
    ? `<span class="text-white/35 line-through text-xs mr-2">$${game.oldPrice.toFixed(2)}</span><span class="font-mono text-gold font-bold">$${game.price.toFixed(2)}</span>`
    : `<span class="font-mono text-gold font-bold">$${game.price.toFixed(2)}</span>`;

  return `
  <article class="game-card corner-cut relative flex flex-col" data-id="${game.id}" reveal>
    ${rankBadge}
    <div class="cover-wrap corner-cut-sm h-44 relative m-3 mb-0 bg-ink-700">
      <img class="cover-art w-full h-full object-cover corner-cut-sm lazy-fade" data-src="${game.cover}" alt="${game.title} cover art" loading="lazy" width="400" height="400">
      ${newRibbon}
      ${!opts.rank ? `<span class="absolute top-3 right-3 z-10">${tierBadge(game.tier)}</span>` : ''}
    </div>
    <div class="p-5 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-2 mb-1">
        <h3 class="font-display font-700 text-lg leading-tight">${game.title}</h3>
      </div>
      <p class="text-xs text-white/45 font-mono mb-2">${game.platform} · ${game.genre}</p>
      <p class="text-sm text-white/55 leading-snug mb-3 flex-1">${game.desc}</p>
      <div class="flex items-center justify-between mb-3">
        <span class="stars text-sm" aria-label="${game.rating} out of 5 stars">${starString(game.rating)}</span>
        <span class="text-xs text-white/40 font-mono">${game.rating.toFixed(1)}</span>
      </div>
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-mono flex items-center" style="color:${meta.color}">
          <span class="stock-dot" style="background:${meta.color}"></span>${meta.label}
        </span>
        ${priceBlock}
      </div>
      <button
        class="buy-btn btn-primary w-full py-3 text-sm relative ${disabled ? 'opacity-40 pointer-events-none' : ''}"
        data-title="${game.title}" ${disabled ? 'disabled' : ''}>
        ${disabled ? 'Out of Stock' : 'Buy Now'}
      </button>
    </div>
  </article>`;
}

function renderGrid(containerId, games, opts = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (games.length === 0) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = games.map((g, i) => gameCardHTML(g, opts.rank ? { rank: i + 1 } : {})).join('');
  observeReveal(el);
  observeLazyImages(el);
}

function renderCategories() {
  const el = document.getElementById('category-grid');
  if (!el) return;
  el.innerHTML = CATEGORIES.map(cat => `
    <button class="category-tile group relative h-32 corner-cut-sm overflow-hidden text-left" data-category="${cat.name}" reveal>
      <div class="absolute inset-0 ${cat.art} transition-transform duration-500 group-hover:scale-110"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span class="font-display font-700 text-lg">${cat.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[cat.icon]}</svg>
      </div>
    </button>
  `).join('');
  observeReveal(el);
  $$('.category-tile', el).forEach(tile => {
    tile.addEventListener('click', () => {
      const cat = tile.dataset.category;
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setActiveCategory(cat), 400);
    });
  });
}

function renderReviews() {
  const el = document.getElementById('reviews-grid');
  if (!el) return;
  el.innerHTML = REVIEWS.map(r => `
    <div class="glass-panel corner-cut-sm p-6 flex flex-col gap-4" reveal>
      <span class="stars text-lg">${starString(r.rating)}</span>
      <p class="text-white/70 text-sm leading-relaxed flex-1">"${r.text}"</p>
      <div class="flex items-center gap-3 pt-3 border-t border-white/8">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-red to-gold flex items-center justify-center font-display font-700 text-ink-900 text-sm">${r.name.charAt(0)}</div>
        <div>
          <p class="font-display font-600 text-sm">${r.name}</p>
          <p class="text-xs text-white/40 font-mono">${r.handle}</p>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal(el);
}

/* ------------------------------------------------------------
   5. SHOP FILTER / SEARCH / SORT STATE
   ------------------------------------------------------------ */
const shopState = { query: '', category: 'All', price: 'all', sort: 'default' };

function setActiveCategory(cat) {
  shopState.category = cat;
  $$('#category-chips .chip').forEach(c => c.classList.toggle('chip-active', c.dataset.chip === cat));
  applyShopFilters();
}

function renderCategoryChips() {
  const el = document.getElementById('category-chips');
  const names = ['All', ...CATEGORIES.map(c => c.name)];
  el.innerHTML = names.map(n => `<button class="chip ${n === 'All' ? 'chip-active' : ''}" data-chip="${n}">${n}</button>`).join('');
  $$('.chip', el).forEach(chip => chip.addEventListener('click', () => setActiveCategory(chip.dataset.chip)));
}

function applyShopFilters() {
  let list = [...GAMES];

  if (shopState.query.trim()) {
    const q = shopState.query.trim().toLowerCase();
    list = list.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      g.platform.toLowerCase().includes(q)
    );
  }

  if (shopState.category !== 'All') {
    list = list.filter(g => g.genre === shopState.category);
  }

  if (shopState.price === 'under30') list = list.filter(g => g.price < 30);
  else if (shopState.price === '30-50') list = list.filter(g => g.price >= 30 && g.price <= 50);
  else if (shopState.price === 'over50') list = list.filter(g => g.price > 50);

  if (shopState.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (shopState.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (shopState.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (shopState.sort === 'name') list.sort((a, b) => a.title.localeCompare(b.title));

  renderGrid('shop-grid', list);
  const countEl = document.getElementById('results-count');
  countEl.textContent = `${list.length} title${list.length === 1 ? '' : 's'} found`;
  document.getElementById('no-results').classList.toggle('hidden', list.length !== 0);
  document.getElementById('shop-grid').classList.toggle('hidden', list.length === 0);
}

function initShopControls() {
  renderCategoryChips();
  applyShopFilters();

  $('#shop-search').addEventListener('input', debounce(e => {
    shopState.query = e.target.value;
    applyShopFilters();
  }, 180));

  $('#sort-select').addEventListener('change', e => { shopState.sort = e.target.value; applyShopFilters(); });
  $('#price-select').addEventListener('change', e => { shopState.price = e.target.value; applyShopFilters(); });

  $('#clear-filters').addEventListener('click', () => {
    shopState.query = ''; shopState.category = 'All'; shopState.price = 'all'; shopState.sort = 'default';
    $('#shop-search').value = ''; $('#sort-select').value = 'default'; $('#price-select').value = 'all';
    $$('#category-chips .chip').forEach(c => c.classList.toggle('chip-active', c.dataset.chip === 'All'));
    applyShopFilters();
  });
}

/* ------------------------------------------------------------
   6. GLOBAL SEARCH OVERLAY (nav search icon)
   ------------------------------------------------------------ */
function initGlobalSearch() {
  const overlay = $('#search-overlay');
  const input = $('#global-search');
  const resultsEl = $('#search-results');

  function open() {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
    input.value = '';
    resultsEl.innerHTML = '';
  }

  $('#search-toggle').addEventListener('click', open);
  $('#search-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim().toLowerCase();
    if (!q) { resultsEl.innerHTML = ''; return; }
    const matches = GAMES.filter(g => g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q)).slice(0, 6);
    resultsEl.innerHTML = matches.length
      ? matches.map(g => `
        <button class="search-result-item flex items-center gap-4 p-3 rounded hover:bg-white/5 transition-colors text-left w-full" data-id="${g.id}">
          <img src="${g.cover}" alt="" class="w-12 h-12 corner-cut-sm shrink-0 object-cover bg-ink-700" loading="lazy">
          <div class="flex-1">
            <p class="font-display font-600">${g.title}</p>
            <p class="text-xs text-white/40 font-mono">${g.genre} · $${g.price.toFixed(2)}</p>
          </div>
        </button>`).join('')
      : `<p class="text-white/40 text-sm py-4">No titles match "${q}".</p>`;

    $$('.search-result-item', resultsEl).forEach(btn => {
      btn.addEventListener('click', () => {
        close();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          $('#shop-search').value = GAMES.find(g => g.id == btn.dataset.id).title;
          shopState.query = $('#shop-search').value;
          applyShopFilters();
        }, 400);
      });
    });
  }, 150));
}

/* ------------------------------------------------------------
   7. NAVBAR: sticky style + mobile menu + active link highlight
   ------------------------------------------------------------ */
function initNavbar() {
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    toggleBackToTop();
  }, { passive: true });

  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';
  });

  // Close mobile menu after clicking a link
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.style.maxHeight = '0px';
  }));
}

function initSmoothScroll() {
  $$('[data-scroll]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

function initActiveNavHighlight() {
  const sections = $$('main section[id], main#home');
  const navLinks = $$('[data-nav]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach(sec => spy.observe(sec));
}

/* ------------------------------------------------------------
   8. SCROLL REVEAL (IntersectionObserver)
   ------------------------------------------------------------ */
let revealObserver;
function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  }
  return revealObserver;
}
function observeReveal(scope = document) {
  const obs = getRevealObserver();
  $$('[reveal]', scope).forEach(el => {
    if (!el.classList.contains('revealed')) obs.observe(el);
  });
}

/* ------------------------------------------------------------
   9. HERO: fade-in, parallax, floating orbs (orbs animate via CSS)
   ------------------------------------------------------------ */
function initHero() {
  requestAnimationFrame(() => {
    $$('[data-hero-fade]').forEach((el, i) => {
      setTimeout(() => el.classList.add('hero-visible'), i * 150);
    });
  });

  const stage = $('#hero-parallax');
  if (!stage) return;
  const cards = $$('.parallax-card', stage);
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    cards.forEach(card => {
      const depth = parseFloat(card.dataset.depth || 20);
      card.style.transform = `translate(${relX * depth}px, ${relY * depth}px)`;
    });
  }, { passive: true });
}

/* ------------------------------------------------------------
   10. ANIMATED COUNTERS
   ------------------------------------------------------------ */
function initCounters() {
  const counters = $$('[data-counter]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ------------------------------------------------------------
   11. BUY NOW — event delegation + WhatsApp redirect
   ------------------------------------------------------------ */
function initBuyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.buy-btn');
    if (!btn || btn.disabled) return;
    createRipple(e, btn);
    const title = btn.dataset.title;
    showToast(`Redirecting to WhatsApp for "${title}"…`, '↗');
    setTimeout(() => {
      window.open(whatsappLink(title), '_blank', 'noopener');
    }, 550);
  });
}

function createRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.style.position = 'relative';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
}

/* Generic ripple + hover pulse for all buttons with .btn-primary / .btn-ghost */
function initButtonRipples() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('.btn-primary, .btn-ghost');
    if (!el || el.classList.contains('buy-btn')) return; // buy-btn handled separately
    createRipple(e, el);
  });
}

/* ------------------------------------------------------------
   12. BACK TO TOP
   ------------------------------------------------------------ */
function toggleBackToTop() {
  const btn = $('#back-to-top');
  const show = window.scrollY > 600;
  btn.classList.toggle('opacity-0', !show);
  btn.classList.toggle('pointer-events-none', !show);
}
function initBackToTop() {
  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ------------------------------------------------------------
   13. FORM VALIDATION (contact + newsletter) — frontend only
   ------------------------------------------------------------ */
function setFieldError(input, message) {
  const errEl = document.querySelector(`[data-error-for="${input.id}"]`);
  if (errEl) errEl.textContent = message || '';
  input.classList.toggle('input-error', Boolean(message));
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#cf-name'), email = $('#cf-email'), subject = $('#cf-subject'), message = $('#cf-message');
    let valid = true;

    if (!name.value.trim()) { setFieldError(name, 'Please enter your name.'); valid = false; } else setFieldError(name, '');
    if (!email.value.trim() || !validEmail(email.value.trim())) { setFieldError(email, 'Enter a valid email address.'); valid = false; } else setFieldError(email, '');
    if (!subject.value.trim()) { setFieldError(subject, 'Please add a subject.'); valid = false; } else setFieldError(subject, '');
    if (!message.value.trim() || message.value.trim().length < 10) { setFieldError(message, 'Message should be at least 10 characters.'); valid = false; } else setFieldError(message, '');

    if (!valid) return;

    showToast('Message sent — we\'ll reply soon!', '✓');
    form.reset();
  });
}

function initNewsletterForm() {
  const form = $('#newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletter-email');
    if (!validEmail(email.value.trim())) {
      setFieldError(email, 'Enter a valid email address.');
      return;
    }
    setFieldError(email, '');
    showToast('Subscribed! Watch your inbox for drops.', '✓');
    form.reset();
  });
}

/* ------------------------------------------------------------
   14. LAZY-LOAD READY HOOK (for future <img data-src> use)
   Cover art here is CSS-based, but this observer is wired up
   so any <img data-src> added later lazy-loads automatically.
   ------------------------------------------------------------ */
let lazyImgObserver;
function getLazyImgObserver() {
  if (!lazyImgObserver) {
    lazyImgObserver = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          o.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
  }
  return lazyImgObserver;
}
function observeLazyImages(scope = document) {
  const obs = getLazyImgObserver();
  $$('img[data-src]', scope).forEach(img => obs.observe(img));
}
/* Kept for the initial call name used at boot */
function initLazyImages() { observeLazyImages(document); }

/* ------------------------------------------------------------
   15. LOADING SCREEN
   ------------------------------------------------------------ */
function initLoadingScreen() {
  const screen = $('#loading-screen');
  const bar = $('#loading-bar');
  requestAnimationFrame(() => { bar.style.transition = 'width 0.9s ease'; bar.style.width = '100%'; });
  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
      screen.style.opacity = '0';
      setTimeout(() => { screen.style.visibility = 'hidden'; screen.remove(); }, 650);
    }, 500);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => { if (document.getElementById('loading-screen')) window.dispatchEvent(new Event('load')); }, 2500);
}

/* ------------------------------------------------------------
   16. INIT — wire up static store config + boot everything
   ------------------------------------------------------------ */
function applyStoreConfig() {
  $('#contact-whatsapp-number').textContent = STORE_CONFIG.displayNumber;
  $('#footer-whatsapp-number').textContent = STORE_CONFIG.displayNumber;
  $('#footer-whatsapp').href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
}

document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();

  applyStoreConfig();
  initLoadingScreen();
  initNavbar();
  initSmoothScroll();
  initActiveNavHighlight();
  initGlobalSearch();
  initHero();
  initCounters();

  renderGrid('featured-grid', GAMES.filter(g => g.featured));
  renderCategories();
  initShopControls();
  renderGrid('bestsellers-grid', GAMES.filter(g => g.bestseller).sort((a, b) => a.bestseller - b.bestseller), { rank: true });
  renderGrid('new-releases-grid', GAMES.filter(g => g.newRelease));
  renderReviews();

  observeReveal(document);
  initBuyButtons();
  initButtonRipples();
  initBackToTop();
  initContactForm();
  initNewsletterForm();
  initLazyImages();
});
