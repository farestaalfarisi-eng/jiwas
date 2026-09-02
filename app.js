// =========================================================================
// JIWAS STUDIO - MASTER CONTROLLER ENGINE (app.js V9.5 Pure Build)
// 1-Click WA, Infinite Feed, Dynamic Marquee, PIN Sync, Radar Activity, PWA
// =========================================================================

let activePack = null;
let targetTierModal = 'starter';

// Konfigurasi Showcase Before/After
const TOTAL_SHOWCASE_PAIRS = 12;
const PAIRS_PER_VIEW = 4;
let currentShowcaseIndex = 0;
let showcaseTimer = null;

// Konfigurasi Kuota Generate Gratis & Gemini API Engine
const MAX_FREE_DAILY_QUOTA = 3;
const GEMINI_API_KEY = ""; // Masukkan Gemini API Key jika ingin direct REST call

// =========================================================================
// 0. AUDIT & RADAR ACTIVITY LOGGER (INTEGRASI ANALYTICS.HTML)
// =========================================================================
function catatLogAktivitas(eventType, targetName, detailText = "") {
  try {
    const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} (${now.getDate()}/${now.getMonth() + 1})`;

    logs.push({
      time: timeStr,
      type: eventType,
      target: targetName,
      detail: detailText
    });

    if (logs.length > 100) logs.shift();
    localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
  } catch (e) {
    console.warn("Sensor Radar Activity Error:", e);
  }
}

// =========================================================================
// 1. PROGRESSIVE FUNNEL & AFFINITY ENGINE
// =========================================================================
let userVisitCount = 1;
let userAffinity = {};

document.addEventListener("DOMContentLoaded", () => {
  try {
    initApp();
  } catch (err) {
    console.error("Inisialisasi Controller Error:", err);
  }
});

function initApp() {
  initServiceWorker();
  initVisitorAndAffinity();
  applyProgressiveFunnelLayout();
  initShowcaseAutoSlider();
  initLiveMarqueeTransactions();
  renderHomeCategories();
  renderAtelierFeed();
  renderKatalogFoto();
  renderKatalogVideo();
  renderKatalogAkun();
  initGlobalClickListener();
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('✅ JIWAS Studio PWA: Service Worker terdaftar:', reg.scope);
        })
        .catch((err) => {
          console.warn('JIWAS Studio PWA SW status:', err);
        });
    });
  }
}

function initVisitorAndAffinity() {
  try {
    const visits = parseInt(localStorage.getItem("JIWAS_VISIT_COUNT") || "0", 10) + 1;
    localStorage.setItem("JIWAS_VISIT_COUNT", visits.toString());
    userVisitCount = visits;

    userAffinity = JSON.parse(localStorage.getItem("JIWAS_USER_AFFINITY") || "{}");
    catatLogAktivitas("VISIT_PAGE", "Beranda Studio", `Kunjungan ke-${visits}`);
  } catch (e) {
    userVisitCount = 1;
    userAffinity = {};
  }
}

function recordUserAffinity(categoryKey, scoreWeight = 1) {
  try {
    if (!categoryKey) return;
    userAffinity[categoryKey] = (userAffinity[categoryKey] || 0) + scoreWeight;
    localStorage.setItem("JIWAS_USER_AFFINITY", JSON.stringify(userAffinity));
  } catch (e) {
    console.warn("Gagal merekam affinity:", e);
  }
}

function getDominantUserCategory() {
  const keys = Object.keys(userAffinity);
  if (keys.length === 0) return null;
  return keys.reduce((a, b) => userAffinity[a] > userAffinity[b] ? a : b);
}

function applyProgressiveFunnelLayout() {
  const showcaseSec = document.querySelector(".showcase-section");
  const homeCategorySec = document.getElementById("atelierCategoriesSection");
  const mainHeader = document.getElementById("atelierMainHeader");
  const dominantCat = getDominantUserCategory();

  if (userVisitCount <= 2) {
    if (showcaseSec) showcaseSec.classList.remove("hidden");
    if (homeCategorySec) homeCategorySec.classList.remove("hidden");
  } else {
    // Kunjungan 3+: Sembunyikan sesi showcase & kartu harga depan agar 100% fokus eksplorasi tak terbatas
    if (showcaseSec) showcaseSec.classList.add("hidden");
    if (homeCategorySec) homeCategorySec.classList.add("hidden");

    if (mainHeader) {
      const badge = mainHeader.querySelector(".hero-badge");
      const title = mainHeader.querySelector(".hero-title");
      const tagline = mainHeader.querySelector(".brand-tagline");

      if (badge) badge.innerHTML = `<i class="fa-solid fa-compass"></i> EKSPLORASI FORMULA VISUAL`;
      if (title) title.innerText = dominantCat ? `ATELIER: ${dominantCat.toUpperCase()}` : `ATELIER DISCOVERY FEED`;
      if (tagline) tagline.innerText = "Jelajahi karya visual tanpa batas. Klik gambar untuk melihat 100 formula sejenis.";
    }
  }
}

function initGlobalClickListener() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".card-menu-container")) {
      document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
    }
  });
}

// -------------------------------------------------------------------------
// 2. LIVE MARQUEE & SISTEM TRANSAKSI NYATA
// -------------------------------------------------------------------------
function initLiveMarqueeTransactions() {
  const counterEl = document.getElementById("salesCounterText");
  const marquee = document.getElementById("liveMarqueeContainer") || document.querySelector(".marquee-text");
  
  const realSalesCount = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10);
  if (counterEl) {
    counterEl.innerText = `${realSalesCount.toLocaleString('id-ID')}+`;
  }

  const lastSalesTitle = localStorage.getItem("JIWAS_LAST_SALES_TITLE");
  const lastSalesTier = localStorage.getItem("JIWAS_LAST_SALES_TIER");

  if (marquee && lastSalesTitle && lastSalesTier) {
    const liveSpan = document.createElement("span");
    liveSpan.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> AKTIVASI TERAKHIR: PIN ${lastSalesTier} (${lastSalesTitle})`;
    marquee.prepend(liveSpan);
  }
}

function rekamTransaksiNyata(packTitle, tierName) {
  try {
    const currentSales = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10) + 1;
    localStorage.setItem("JIWAS_REAL_SALES_COUNT", currentSales.toString());
    localStorage.setItem("JIWAS_LAST_SALES_TITLE", packTitle);
    localStorage.setItem("JIWAS_LAST_SALES_TIER", tierName);

    const counterEl = document.getElementById("salesCounterText");
    if (counterEl) counterEl.innerText = `${currentSales.toLocaleString('id-ID')}+`;

    const marquee = document.getElementById("liveMarqueeContainer") || document.querySelector(".marquee-text");
    if (marquee) {
      const newLiveSpan = document.createElement("span");
      newLiveSpan.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> PEMBELIAN BARU: PIN ${tierName} (${packTitle}) Berhasil Diaktifkan!`;
      marquee.prepend(newLiveSpan);
    }
  } catch (e) {
    console.warn("Gagal merekam transaksi:", e);
  }
}

// -------------------------------------------------------------------------
// 3. 1-CLICK DIRECT WA DISPATCHER
// -------------------------------------------------------------------------
function getAdminWhatsAppNumber() {
  return localStorage.getItem("JIWAS_CUSTOM_WA") || 
         (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6281234567890");
}

function kirimPesananLangsungWA(packTitle, tierName, hargaTeks) {
  const waNumber = getAdminWhatsAppNumber();
  catatLogAktivitas("CLICK_WA", packTitle, `Klik Beli ${tierName} (${hargaTeks})`);

  const pesan = `Halo Admin JIWAS Studio,%0A%0ASaya ingin membeli *PIN Akses ${tierName} (${hargaTeks})* untuk katalog *${packTitle}*.%0A%0AMohon info rekening / QRIS pembayarannya ya. Terima kasih!`;
  window.open(`https://wa.me/${waNumber}?text=${pesan}`, "_blank");
}

function hubungiAdminWaLangsung() {
  const waNumber = getAdminWhatsAppNumber();
  const pesan = `Halo Admin JIWAS Studio, saya ingin bertanya tentang produk dan layanan AI Studio.`;
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`, "_blank");
}

// -------------------------------------------------------------------------
// 4. KUOTA HARIAN & THREE-DOTS MENU
// -------------------------------------------------------------------------
function getDailyQuotaStatus() {
  const today = new Date().toISOString().split('T')[0];
  let usage = JSON.parse(localStorage.getItem("JIWAS_DAILY_GEN_USAGE") || "{}");

  if (usage.date !== today) {
    usage = { date: today, used: 0 };
    localStorage.setItem("JIWAS_DAILY_GEN_USAGE", JSON.stringify(usage));
  }

  const remaining = Math.max(0, MAX_FREE_DAILY_QUOTA - usage.used);
  return { remaining, used: usage.used, date: today };
}

function consumeDailyQuota() {
  const status = getDailyQuotaStatus();
  if (status.remaining <= 0) return false;

  const usage = { date: status.date, used: status.used + 1 };
  localStorage.setItem("JIWAS_DAILY_GEN_USAGE", JSON.stringify(usage));
  return true;
}

function toggleCardMenu(event, menuId) {
  event.stopPropagation();
  document.querySelectorAll(".card-dropdown-menu").forEach(el => {
    if (el.id !== menuId) el.classList.add("hidden");
  });
  const targetMenu = document.getElementById(menuId);
  if (targetMenu) {
    targetMenu.classList.toggle("hidden");
  }
}

function handleMenuAction(action, packId, itemIndex, event) {
  event.stopPropagation();
  document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));

  const allRegistry = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) ? KATALOG_REGISTRY : [];
  const pack = allRegistry.find(p => p.id === packId);
  if (!pack) return;

  const promptArray = (pack.promptVarName && window[pack.promptVarName]) ? window[pack.promptVarName] : [];
  let promptText = `Hyperrealistic portrait of ${pack.title}, item #${itemIndex}, 8k studio lighting, master quality --ar 9:16`;

  if (promptArray && promptArray[itemIndex - 1]) {
    const pItem = promptArray[itemIndex - 1];
    promptText = typeof pItem === "object" ? (pItem.rawPrompt || promptText) : pItem;
  }

  const isFree = itemIndex <= 3;
  const isLocked = !isFree && !cekAksesKatalog(pack.id, itemIndex >= 24 ? "vip" : "starter");

  if (isLocked) {
    bukaDetailPackTarget(pack.id, itemIndex, true);
    return;
  }

  recordUserAffinity(pack.folder || pack.id, 2);

  switch (action) {
    case 'save':
      simpanBookmarkItem(pack, itemIndex);
      catatLogAktivitas("SAVE_FAVORITE", pack.title, `Menyimpan item #${itemIndex}`);
      break;
    case 'share':
      bagikanItem(pack, itemIndex);
      catatLogAktivitas("SHARE_LINK", pack.title, `Membagikan item #${itemIndex}`);
      break;
    case 'prompt':
      copasPrompt(promptText);
      recordUserAffinity(pack.folder || pack.id, 3);
      catatLogAktivitas("COPY_PROMPT", pack.title, `Menyalin item #${itemIndex}`);
      break;
    case 'use':
      eksekusiGenerateUjiCoba(promptText, pack.title, isFree);
      recordUserAffinity(pack.folder || pack.id, 4);
      catatLogAktivitas("USE_ENGINE", pack.title, `Engine item #${itemIndex}`);
      break;
  }
}

function simpanBookmarkItem(pack, itemIndex) {
  try {
    let saved = JSON.parse(localStorage.getItem("JIWAS_SAVED_ITEMS") || "[]");
    const itemKey = `${pack.id}_${itemIndex}`;
    if (!saved.includes(itemKey)) {
      saved.push(itemKey);
      localStorage.setItem("JIWAS_SAVED_ITEMS", JSON.stringify(saved));
      tampilkanToast("💾 FOTO DISIMPAN KE FAVORIT!");
    } else {
      tampilkanToast("ℹ️ SUDAH TERSIMPAN DI FAVORIT");
    }
  } catch (e) {
    console.warn(e);
  }
}

function bagikanItem(pack, itemIndex) {
  const shareData = {
    title: `${pack.title} - JIWAS Studio`,
    text: `Lihat hasil prompt foto AI ${pack.title} item #${itemIndex} di JIWAS Studio!`,
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(() => {
      tampilkanToast("🔗 LINK BERHASIL DISALIN!");
    });
  }
}

// -------------------------------------------------------------------------
// 5. ONE-CLICK GEMINI ENGINE MODULE
// -------------------------------------------------------------------------
function eksekusiGenerateUjiCoba(promptText, title, isFree) {
  const quota = getDailyQuotaStatus();

  if (isFree && quota.remaining <= 0) {
    alert("⚠️ Kuota gratis harian Anda (3x/hari) sudah habis.\nBuka akses VIP 25K untuk akses tanpa batas!");
    return;
  }

  if (isFree) consumeDailyQuota();

  const modal = document.getElementById("geminiModal");
  const statusEl = document.getElementById("geminiEngineStatus");
  const outputEl = document.getElementById("geminiOutput");
  const currentQuota = getDailyQuotaStatus();

  if (modal) modal.classList.remove("hidden");
  if (statusEl) statusEl.innerText = `Menghubungkan ke Engine: ${title}`;
  if (outputEl) {
    outputEl.innerHTML = `
      <div class="quota-indicator-box">
        <span><i class="fa-solid fa-clock"></i> Sisa Kuota Uji Coba:</span>
        <strong>${isFree ? currentQuota.remaining + ' / ' + MAX_FREE_DAILY_QUOTA : 'UNLIMITED (VIP)'}</strong>
      </div>
      <div style="margin-top:8px;">
        <p><strong>[OPTIMIZED PROMPT]</strong><br>${promptText}</p>
        <p style="margin-top:8px; color:var(--gold-light);"><strong>[STUDIO SPECIFICATION]</strong><br>Hasselblad H6D-100c • 85mm f/1.4 Lens • Cinematic Softbox Lighting --ar 9:16</p>
      </div>
    `;
  }
}

function tutupModalGemini() {
  const modal = document.getElementById("geminiModal");
  if (modal) modal.classList.add("hidden");
}

// -------------------------------------------------------------------------
// 6. SHOWCASE BEFORE/AFTER (AUTO SLIDER & MANUAL CONTROLS)
// -------------------------------------------------------------------------
function initShowcaseAutoSlider() {
  renderShowcaseCards();
  startShowcaseTimer();
}

function renderShowcaseCards() {
  const container = document.getElementById("gridShowcaseBA");
  const dotsContainer = document.getElementById("showcaseDots");
  if (!container) return;

  const totalPages = Math.ceil(TOTAL_SHOWCASE_PAIRS / PAIRS_PER_VIEW);
  const startPair = currentShowcaseIndex * PAIRS_PER_VIEW;
  
  container.style.opacity = "0.2";

  setTimeout(() => {
    container.innerHTML = "";

    for (let i = 0; i < PAIRS_PER_VIEW; i++) {
      const pairNum = (startPair + i) % TOTAL_SHOWCASE_PAIRS;
      const beforeImgNum = (pairNum * 2) + 1;
      const afterImgNum = (pairNum * 2) + 2;

      const card = document.createElement("div");
      card.className = "ba-card-unit";
      card.innerHTML = `
        <div class="ba-dual-image-box">
          <div class="ba-half-view">
            <img src="images/showcase/${beforeImgNum}.jpg" alt="Before" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
            <span class="badge-tag-side tag-before">BEFORE</span>
          </div>
          <div class="ba-half-view">
            <img src="images/showcase/${afterImgNum}.jpg" alt="After" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
            <span class="badge-tag-side tag-after">AFTER (AI)</span>
          </div>
        </div>
        <div class="ba-card-footer">
          <span>Transformation #${pairNum + 1}</span>
          <span style="color:#22c55e; font-weight:700;">✓ 8K AI</span>
        </div>
      `;
      container.appendChild(card);
    }
    container.style.opacity = "1";
  }, 120);

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let p = 0; p < totalPages; p++) {
      const dot = document.createElement("div");
      dot.className = `dot-indicator ${p === currentShowcaseIndex ? 'active' : ''}`;
      dot.onclick = () => {
        currentShowcaseIndex = p;
        renderShowcaseCards();
        restartShowcaseTimer();
      };
      dotsContainer.appendChild(dot);
    }
  }
}

function nextShowcaseSlide() {
  const totalPages = Math.ceil(TOTAL_SHOWCASE_PAIRS / PAIRS_PER_VIEW);
  currentShowcaseIndex = (currentShowcaseIndex + 1) % totalPages;
  renderShowcaseCards();
  restartShowcaseTimer();
}

function prevShowcaseSlide() {
  const totalPages = Math.ceil(TOTAL_SHOWCASE_PAIRS / PAIRS_PER_VIEW);
  currentShowcaseIndex = (currentShowcaseIndex - 1 + totalPages) % totalPages;
  renderShowcaseCards();
  restartShowcaseTimer();
}

function startShowcaseTimer() {
  if (showcaseTimer) clearInterval(showcaseTimer);
  showcaseTimer = setInterval(() => {
    nextShowcaseSlide();
  }, 5000);
}

function restartShowcaseTimer() {
  startShowcaseTimer();
}

// -------------------------------------------------------------------------
// 7. ATELIER FEED: EKSPLORASI VISUAL TANPA AKHIR
// -------------------------------------------------------------------------
function renderAtelierFeed() {
  const container = document.getElementById("gridAtelierFeed");
  if (!container) return;

  const allPacks = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) 
    ? KATALOG_REGISTRY.filter(item => item.status === "live" && item.type !== "digital") 
    : [];

  if (allPacks.length === 0) {
    container.innerHTML = `<p style="text-align:center; grid-column:1/-1; color:var(--gold-light); font-size:0.85rem; padding:30px;">⚠️ Memuat katalog eksplorasi...</p>`;
    return;
  }
  container.innerHTML = "";

  const dominantCat = getDominantUserCategory();
  let feedItems = [];

  allPacks.forEach(pack => {
    const isPreferred = dominantCat && (pack.folder === dominantCat || pack.id === dominantCat);
    const maxSample = isPreferred ? 20 : 10;

    for (let idx = 1; idx <= maxSample; idx++) {
      feedItems.push({
        pack: pack,
        itemIndex: idx,
        isFree: idx <= 3,
        weight: isPreferred ? 3 : 1
      });
    }
  });

  feedItems.sort((a, b) => (b.weight - a.weight) || (Math.random() - 0.5));

  feedItems.forEach((pin, i) => {
    const menuId = `menu_feed_${pin.pack.id}_${pin.itemIndex}_${i}`;
    const card = document.createElement("div");
    card.className = "pin-item";

    const freeBadgeHTML = pin.isFree ? `
      <div class="pin-badge-free-elegant">
        <i class="fa-solid fa-sparkles"></i> <span>FREE DEMO</span>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="card-menu-container">
        <button class="btn-three-dots" onclick="toggleCardMenu(event, '${menuId}')" aria-label="Menu Aksi">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div id="${menuId}" class="card-dropdown-menu hidden">
          <button class="dropdown-item" onclick="handleMenuAction('save', '${pin.pack.id}', ${pin.itemIndex}, event)">
            <i class="fa-solid fa-bookmark"></i> Save
          </button>
          <button class="dropdown-item" onclick="handleMenuAction('share', '${pin.pack.id}', ${pin.itemIndex}, event)">
            <i class="fa-solid fa-share-nodes"></i> Bagikan
          </button>
          <button class="dropdown-item" onclick="handleMenuAction('prompt', '${pin.pack.id}', ${pin.itemIndex}, event)">
            <i class="fa-solid fa-copy"></i> Prompt
          </button>
          <button class="dropdown-item action-gemini" onclick="handleMenuAction('use', '${pin.pack.id}', ${pin.itemIndex}, event)">
            <i class="fa-solid fa-bolt"></i> Gunakan
          </button>
        </div>
      </div>

      ${freeBadgeHTML}

      <img src="images/${pin.pack.folder}/${pin.itemIndex}.jpg" 
           alt="${pin.pack.title}" 
           loading="lazy" 
           onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
      <div class="pin-info-overlay">
        <div class="pin-title">${pin.pack.title}</div>
        <div class="pin-sub">Item #${pin.itemIndex} • Eksplorasi 100 Serupa</div>
      </div>
    `;

    card.onclick = () => {
      recordUserAffinity(pin.pack.folder || pin.pack.id, 3);
      bukaRelatedFeed(pin.pack);
    };

    container.appendChild(card);
  });
}

function bukaRelatedFeed(pack) {
  const mainHeader = document.getElementById("atelierMainHeader");
  const relatedHeader = document.getElementById("atelierRelatedHeader");
  const mainFeed = document.getElementById("gridAtelierFeed");
  const relatedFeed = document.getElementById("gridAtelierRelated");
  const packTitle = document.getElementById("relatedPackTitle");
  const packTag = document.getElementById("relatedPackTag");

  document.querySelectorAll(".showcase-section, .section-divider, .category-section").forEach(el => el.classList.add("hidden"));

  if (!relatedFeed) return;

  if (mainHeader) mainHeader.classList.add("hidden");
  if (mainFeed) mainFeed.classList.add("hidden");
  if (relatedHeader) relatedHeader.classList.remove("hidden");
  if (relatedFeed) relatedFeed.classList.remove("hidden");

  if (packTitle) packTitle.innerText = pack.title;
  if (packTag) packTag.innerText = `100 Koleksi Formula Serupa`;

  relatedFeed.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const isFree = i <= 3;
    const menuId = `menu_rel_${pack.id}_${i}`;
    const card = document.createElement("div");
    card.className = "pin-item";

    const freeBadgeHTML = isFree ? `
      <div class="pin-badge-free-elegant">
        <i class="fa-solid fa-sparkles"></i> <span>FREE DEMO</span>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="card-menu-container">
        <button class="btn-three-dots" onclick="toggleCardMenu(event, '${menuId}')">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div id="${menuId}" class="card-dropdown-menu hidden">
          <button class="dropdown-item" onclick="handleMenuAction('save', '${pack.id}', ${i}, event)">
            <i class="fa-solid fa-bookmark"></i> Save
          </button>
          <button class="dropdown-item" onclick="handleMenuAction('share', '${pack.id}', ${i}, event)">
            <i class="fa-solid fa-share-nodes"></i> Bagikan
          </button>
          <button class="dropdown-item" onclick="handleMenuAction('prompt', '${pack.id}', ${i}, event)">
            <i class="fa-solid fa-copy"></i> Prompt
          </button>
          <button class="dropdown-item action-gemini" onclick="handleMenuAction('use', '${pack.id}', ${i}, event)">
            <i class="fa-solid fa-bolt"></i> Gunakan
          </button>
        </div>
      </div>

      ${freeBadgeHTML}

      <img src="images/${pack.folder}/${i}.jpg" 
           alt="${pack.title} #${i}" 
           loading="lazy" 
           onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
      <div class="pin-info-overlay">
        <div class="pin-title">${pack.title}</div>
        <div class="pin-sub">Item #${i} ${isFree ? '• Sample Gratis' : '• Premium Prompt'}</div>
      </div>
    `;

    card.onclick = () => bukaDetailPackTarget(pack.id, i, !isFree);
    relatedFeed.appendChild(card);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tutupRelatedFeed() {
  const mainHeader = document.getElementById("atelierMainHeader");
  const relatedHeader = document.getElementById("atelierRelatedHeader");
  const mainFeed = document.getElementById("gridAtelierFeed");
  const relatedFeed = document.getElementById("gridAtelierRelated");

  applyProgressiveFunnelLayout();

  if (relatedHeader) relatedHeader.classList.add("hidden");
  if (relatedFeed) relatedFeed.classList.add("hidden");
  if (mainHeader) mainHeader.classList.remove("hidden");
  if (mainFeed) mainFeed.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------------------------------------------------------
// 8. ROUTER TAB, KATALOG ETALASE & RANKING BADGES
// -------------------------------------------------------------------------
function switchMainTab(tabType, btnEl) {
  try {
    document.querySelectorAll(".b-nav-item").forEach(b => b.classList.remove("active"));
    if (btnEl) {
      btnEl.classList.add("active");
    } else {
      const targetBtn = document.getElementById(
        tabType === 'atelier' ? 'tabBtnAtelier' :
        tabType === 'foto' ? 'tabBtnFoto' :
        tabType === 'video' ? 'tabBtnVideo' : 'tabBtnAkun'
      );
      if (targetBtn) targetBtn.classList.add("active");
    }

    const secAtelier = document.getElementById("sectionAtelier");
    const secFoto = document.getElementById("sectionFotoAI");
    const secVideo = document.getElementById("sectionVideoAI");
    const secAkun = document.getElementById("sectionAkunAI");
    const secDetail = document.getElementById("sectionDetailPack");

    if (secAtelier) secAtelier.classList.add("hidden");
    if (secFoto) secFoto.classList.add("hidden");
    if (secVideo) secVideo.classList.add("hidden");
    if (secAkun) secAkun.classList.add("hidden");
    if (secDetail) secDetail.classList.add("hidden");

    if (tabType === 'atelier' && secAtelier) {
      secAtelier.classList.remove("hidden");
      tutupRelatedFeed();
    }
    if (tabType === 'foto' && secFoto) secFoto.classList.remove("hidden");
    if (tabType === 'video' && secVideo) secVideo.classList.remove("hidden");
    if (tabType === 'akun' && secAkun) secAkun.classList.remove("hidden");

    catatLogAktivitas("SWITCH_TAB", tabType.toUpperCase(), `Beralih ke tab ${tabType}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    console.error("Tab switch error:", e);
  }
}

function bukaDetailPackTarget(packId, itemIndex, openPinModal) {
  const allPacks = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) ? KATALOG_REGISTRY : [];
  const target = allPacks.find(p => p.id === packId);
  
  if (target) {
    bukaDetailPack(target);
    if (openPinModal && itemIndex > 3) {
      setTimeout(() => {
        bukaModalPIN(itemIndex >= 24 ? 'vip' : 'starter');
      }, 350);
    }
  }
}

function renderKatalogFoto() {
  const container = document.getElementById("gridFotoKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) 
    ? KATALOG_REGISTRY.filter(item => item.type === "foto" && item.status === "live") 
    : [];

  list.forEach((pack, index) => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);

    let rankBadgeHTML = "";
    if (index === 0) rankBadgeHTML = `<span class="badge-pill badge-rank-gold">🥇 TOP #1 PALING BANYAK DIBELI</span>`;
    else if (index === 1) rankBadgeHTML = `<span class="badge-pill badge-rank-blue">🥈 BEST SELLER (150+ TERJUAL)</span>`;
    else if (index === 2) rankBadgeHTML = `<span class="badge-pill badge-rank-green">🥉 FAVORIT BULAN INI</span>`;
    else rankBadgeHTML = `<span class="badge-pill badge-foto">📸 100 ITEMS</span>`;

    card.innerHTML = `
      <div style="position:relative;">
        ${rankBadgeHTML}
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '4.9/5'} (${pack.sales || 'Ready'})</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">
          Lihat 100 Prompt
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogVideo() {
  const container = document.getElementById("gridVideoKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) 
    ? KATALOG_REGISTRY.filter(item => item.type === "video" && item.status === "live") 
    : [];

  list.forEach((pack, index) => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);

    let rankBadgeHTML = index === 0 
      ? `<span class="badge-pill badge-rank-gold">🥇 TOP VIDEO SUITE (200+ TERJUAL)</span>` 
      : `<span class="badge-pill badge-video">🎥 100 PROMPTS</span>`;

    card.innerHTML = `
      <div style="position:relative;">
        ${rankBadgeHTML}
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '5.0/5'} (${pack.sales || 'Ready'})</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">
          Lihat 100 Prompt
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogAkun() {
  const container = document.getElementById("gridAkunKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) 
    ? KATALOG_REGISTRY.filter(item => item.type === "digital" && item.status === "live") 
    : [];

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "catalog-card";

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-app">🤖 AKUN AI</span>
        <img src="images/${item.folder}/cover.jpg" alt="${item.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      </div>
      <div class="card-info">
        <h3 class="card-title">${item.title}</h3>
        <p style="font-size:0.72rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">${item.description}</p>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.9rem; margin-bottom:8px;">${item.priceText}</div>
        <button onclick="kirimPesananLangsungWA('${item.title}', 'Akun AI', '${item.priceText}')" class="btn-copy" style="padding:8px 12px; font-size:0.75rem; width:100%;">
          Beli via WA
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// 9. DETAIL PACK & MICRO-COUNTER
// -------------------------------------------------------------------------
function bukaDetailPack(pack) {
  activePack = pack;
  recordUserAffinity(pack.folder || pack.id, 3);
  catatLogAktivitas("VIEW_PACK", pack.title, `Melihat katalog ${pack.category}`);

  const secAtelier = document.getElementById("sectionAtelier");
  const secFoto = document.getElementById("sectionFotoAI");
  const secVideo = document.getElementById("sectionVideoAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");

  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secDetail) secDetail.classList.remove("hidden");

  const titleEl = document.getElementById("detailTitle");
  const summaryEl = document.getElementById("packSummaryTitle");
  if (titleEl) titleEl.innerText = pack.title;
  
  if (summaryEl) {
    summaryEl.innerHTML = `
      ${pack.title} (100 Prompt)
      <div class="detail-live-counter">
        <i class="fa-solid fa-fire" style="color:#f59e0b;"></i> ${pack.sales || '150+ Terjual'} • 12 orang sedang melihat
      </div>
    `;
  }

  // Tombol 1-Click Direct WA (Murni JIWAS tanpa formulir)
  const pabContainer = document.querySelector(".pack-action-box .pab-buttons");
  if (pabContainer) {
    pabContainer.innerHTML = `
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'Starter 10K', 'Rp10.000')" class="btn-buy-wa">
        Beli Starter (10K)
      </button>
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'VIP 25K', 'Rp25.000')" class="btn-buy-wa" style="background:var(--gold-gradient); color:#000;">
        Beli VIP (25K)
      </button>
      <button class="btn-enter-pin-main" onclick="bukaModalPIN('vip')">
        Masukkan PIN
      </button>
    `;
  }

  // Dynamic Asynchronous Script Loader
  if (pack.promptVarName && window[pack.promptVarName] && Array.isArray(window[pack.promptVarName])) {
    renderDetailItemCards();
  } else if (pack.scriptUrl) {
    const existingScript = document.querySelector(`script[src="${pack.scriptUrl}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = pack.scriptUrl;
      script.onload = () => renderDetailItemCards();
      script.onerror = () => renderDetailItemCards();
      document.head.appendChild(script);
    } else {
      renderDetailItemCards();
    }
  } else {
    renderDetailItemCards();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function kembaliKeKatalog() {
  const secDetail = document.getElementById("sectionDetailPack");
  if (secDetail) secDetail.classList.add("hidden");
  switchMainTab('atelier', document.getElementById('tabBtnAtelier'));
}

function cekAksesKatalog(catalogId, tier) {
  try {
    const unlockedStarter = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_STARTER") || "[]");
    const unlockedVIP = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_VIP") || "[]");
    if (unlockedVIP.includes(catalogId)) return true;
    if (tier === "starter" && unlockedStarter.includes(catalogId)) return true;
  } catch (e) {
    console.warn(e);
  }
  return false;
}

function simpanAksesKatalog(catalogId, tier) {
  try {
    let unlockedStarter = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_STARTER") || "[]");
    let unlockedVIP = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_VIP") || "[]");

    if (tier === "starter" || tier === "vip") {
      if (!unlockedStarter.includes(catalogId)) unlockedStarter.push(catalogId);
      localStorage.setItem("TIGAJIWA_UNLOCKED_STARTER", JSON.stringify(unlockedStarter));
    }
    if (tier === "vip") {
      if (!unlockedVIP.includes(catalogId)) unlockedVIP.push(catalogId);
      localStorage.setItem("TIGAJIWA_UNLOCKED_VIP", JSON.stringify(unlockedVIP));
    }
  } catch (e) {
    console.warn(e);
  }
}

// -------------------------------------------------------------------------
// 10. DETAIL CARDS RENDERING & SAFE DOM COPY
// -------------------------------------------------------------------------
function renderDetailItemCards() {
  const grid = document.getElementById("itemsGrid");
  if (!grid || !activePack) return;
  grid.innerHTML = "";

  const promptArray = (activePack.promptVarName && window[activePack.promptVarName]) ? window[activePack.promptVarName] : [];

  for (let i = 1; i <= 100; i++) {
    const card = document.createElement("div");
    card.className = "item-card";

    const imgSrc = `images/${activePack.folder}/${i}.jpg`;
    const promptItemData = (promptArray && promptArray[i - 1]) ? promptArray[i - 1] : null;

    let promptText = `Hyperrealistic luxury photography of ${activePack.title}, item #${i}, 8k studio lighting, master quality --ar 9:16`;
    let customGuideHTML = "";

    if (promptItemData) {
      if (typeof promptItemData === "object") {
        promptText = promptItemData.rawPrompt || promptText;

        if (promptItemData.customGuide) {
          const g = promptItemData.customGuide;
          const b = promptItemData.blueprint || {};

          let anakLakiHTML = Array.isArray(g.anakLaki) ? g.anakLaki.map(a => `<li>${a}</li>`).join('') : (g.anakLaki ? `<li>${g.anakLaki}</li>` : '');
          let anakPerempuanHTML = Array.isArray(g.anakPerempuan) ? g.anakPerempuan.map(a => `<li>${a}</li>`).join('') : (g.anakPerempuan ? `<li>${g.anakPerempuan}</li>` : '');

          customGuideHTML = `
            <details class="custom-guide-accordion">
              <summary class="custom-guide-summary">
                <span><i class="fa-solid fa-sliders"></i> Panduan Kustomisasi Anggota</span>
                <i class="fa-solid fa-chevron-down chevron-icon"></i>
              </summary>
              <div class="custom-guide-content">
                <p class="guide-note">💡 <em>Ubah data di bawah ini pada teks prompt sesuai kebutuhan Anda:</em></p>
                <ul class="guide-list">
                  ${g.ayah ? `<li><strong>Ayah:</strong> ${g.ayah}</li>` : ''}
                  ${g.ibu ? `<li><strong>Ibu:</strong> ${g.ibu}</li>` : ''}
                  ${anakLakiHTML}
                  ${anakPerempuanHTML}
                </ul>
                <div class="guide-specs">
                  <span>📷 <strong>Setup Studio:</strong> ${b.camera || 'Hasselblad H6D-100c'} • ${b.lighting || 'Softbox Rim Light'}</span>
                </div>
              </div>
            </details>
          `;
        }
      } else {
        promptText = promptItemData;
      }
    }

    let tier = "free";
    let isLocked = false;

    if (i >= 1 && i <= 3) {
      tier = "free";
      isLocked = false;
    } else if (i >= 4 && i <= 23) {
      tier = "starter";
      isLocked = !cekAksesKatalog(activePack.id, "starter");
    } else if (i >= 24) {
      tier = "vip";
      isLocked = !cekAksesKatalog(activePack.id, "vip");
    }

    let imgClass = "";
    let overlayLock = "";
    let promptBoxHTML = "";
    let actionButtons = "";

    const encodedPrompt = encodeURIComponent(promptText);

    if (!isLocked) {
      promptBoxHTML = `${customGuideHTML}<div class="prompt-text-box" id="promptText_${i}">${promptText}</div>`;
      actionButtons = `
        <div class="action-buttons">
          <button class="btn-copy" onclick="copasPromptFromElement('promptText_${i}', '${activePack.title}', ${i})">
            📋 SALIN
          </button>
          <button class="btn-copy" style="background:#2563eb; color:#fff;" onclick="eksekusiGenerateUjiCoba(decodeURIComponent('${encodedPrompt}'), '${activePack.title}', false)">
            ⚡ ENGINE
          </button>
          <a href="https://www.bing.com/images/create" target="_blank" class="btn-direct-ai">🚀 Bing</a>
        </div>
      `;
    } else {
      imgClass = tier === "starter" ? "img-blur-teaser" : "img-blur-heavy";
      const hargaTeks = tier === "starter" ? "10K" : "25K";

      overlayLock = `
        <div class="overlay-lock">
          <p style="font-size:0.75rem; font-weight:700; color:var(--gold-primary); margin-bottom:6px;">🔒 TERKUNCI (${tier.toUpperCase()} ${hargaTeks})</p>
          <button class="btn-enter-pin" onclick="bukaModalPIN('${tier}')">
            Masukkan PIN ${hargaTeks}
          </button>
        </div>
      `;

      promptBoxHTML = `<div class="prompt-text-box prompt-locked-text">Prompt dikunci. Buka akses paket ${hargaTeks} untuk menyalin prompt ini.</div>`;
      
      actionButtons = `
        <div class="action-buttons">
          <button onclick="kirimPesananLangsungWA('${activePack.title}', 'Paket ${tier.toUpperCase()}', 'Rp${hargaTeks === '10K' ? '10.000' : '25.000'}')" class="btn-unlock-wa">
            Buka Akses via WA (${hargaTeks})
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="item-image-wrapper">
        <img src="${imgSrc}" class="${imgClass}" loading="lazy" alt="Item ${i}" onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
        ${overlayLock}
      </div>
      <div class="item-content">
        <div>
          <div class="item-number">ITEM #${i} ${tier === 'free' ? '• [GRATIS SAMPLE]' : `• [PAKET ${tier.toUpperCase()}]`}</div>
          ${promptBoxHTML}
        </div>
        ${actionButtons}
      </div>
    `;
    grid.appendChild(card);
  }
}

// -------------------------------------------------------------------------
// 11. VERIFIKASI PIN MASTER DARI DASHBOARD
// -------------------------------------------------------------------------
function bukaModalPIN(tier = 'starter') {
  targetTierModal = tier;
  const modal = document.getElementById("pinModal");
  if (modal) {
    modal.classList.remove("hidden");
    const input = document.getElementById("pinInput");
    if (input) {
      input.value = "";
      input.focus();
    }
  }
}

function tutupModalPIN() {
  const modal = document.getElementById("pinModal");
  if (modal) modal.classList.add("hidden");
}

function verifikasiPIN() {
  const pinInput = document.getElementById("pinInput").value.trim().toUpperCase();
  if (!activePack) return;

  // 1. Baca PIN yang diatur melalui analytics.html
  const customPins = JSON.parse(localStorage.getItem("JIWAS_CUSTOM_PINS") || "{}");
  let starterPIN = customPins[activePack.id]?.pin10k || "";
  let vipPIN = customPins[activePack.id]?.pin25k || "";

  // 2. Fallback ke data.js atau config-pin.js
  if (!starterPIN) starterPIN = activePack.pin10k ? activePack.pin10k.toUpperCase() : "";
  if (!vipPIN) vipPIN = activePack.pin25k ? activePack.pin25k.toUpperCase() : "";

  if (!starterPIN && typeof LIST_PIN_KATALOG !== 'undefined') {
    const paketKey = `paket${activePack.id}`;
    if (LIST_PIN_KATALOG[paketKey]) {
      starterPIN = (LIST_PIN_KATALOG[paketKey].pin10k || "").toUpperCase();
      vipPIN = (LIST_PIN_KATALOG[paketKey].pin25k || "").toUpperCase();
    }
  }

  if (pinInput && pinInput === starterPIN) {
    simpanAksesKatalog(activePack.id, "starter");
    rekamTransaksiNyata(activePack.title, "Starter (10K)");
    tutupModalPIN();
    tampilkanToast("🎉 AKSES STARTER (10K) TERBUKA!");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, `Sukses unlock STARTER 10K (PIN: ${pinInput})`);
    renderDetailItemCards();
  } else if (pinInput && pinInput === vipPIN) {
    simpanAksesKatalog(activePack.id, "vip");
    rekamTransaksiNyata(activePack.title, "VIP (25K)");
    tutupModalPIN();
    tampilkanToast("👑 AKSES VIP (25K) TERBUKA!");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, `Sukses unlock VIP 25K (PIN: ${pinInput})`);
    renderDetailItemCards();
  } else {
    alert("❌ Kode PIN Salah atau belum terdaftar!");
    catatLogAktivitas("PIN_FAILED", activePack.title, `Gagal aktivasi (Input: ${pinInput})`);
  }
}

function copasPromptFromElement(elementId, packTitle = "Prompt", itemIdx = 0) {
  const el = document.getElementById(elementId);
  if (el) {
    const text = el.innerText || el.textContent;
    copasPrompt(text);
    catatLogAktivitas("COPY_PROMPT", packTitle, `Menyalin item #${itemIdx}`);
  }
}

function copasPrompt(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      tampilkanToast("✅ PROMPT BERHASIL DISALIN!");
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    tampilkanToast("✅ PROMPT BERHASIL DISALIN!");
  } catch (err) {
    console.error("Gagal menyalin:", err);
  }
  document.body.removeChild(textArea);
}

function tampilkanToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  if (!toast || !toastMsg) return;
  toastMsg.innerText = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

// -------------------------------------------------------------------------
// 12. SESI KATEGORI BERANDA (KUNJUNGAN 1-2)
// -------------------------------------------------------------------------
function renderHomeCategories() {
  const container = document.getElementById("gridHomeCategories");
  if (!container || typeof KATALOG_REGISTRY === "undefined") return;
  container.innerHTML = "";

  KATALOG_REGISTRY.forEach(item => {
    if (item.type === "digital") return;

    const card = document.createElement("div");
    card.className = "catalog-card";

    if (item.status === "teaser") {
      card.innerHTML = `
        <div style="position:relative; overflow:hidden;">
          <span class="badge-pill" style="background:#dc2626; color:#fff; border-color:#ef4444;">🔒 COMING SOON</span>
          <img src="images/${item.folder}/cover.jpg" alt="${item.title}" class="aspect-9-16 img-blur-heavy" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
        </div>
        <div class="card-info">
          <h3 class="card-title">${item.title}</h3>
          <p style="font-size:0.7rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">${item.description || 'Sedang dalam proses kurasi prompt 8K studio.'}</p>
          <button onclick="kirimPesananLangsungWA('${item.title}', 'Pre-Order VIP', 'Coming Soon')" class="btn-copy" style="background:#1e1e24; color:var(--gold-light); border:1px solid var(--border-color); width:100%; box-sizing:border-box; font-size:0.72rem; padding:8px 6px;">
            🔔 Ingatkan Saya di WA
          </button>
        </div>
      `;
    } else {
      card.onclick = () => bukaDetailPack(item);
      card.innerHTML = `
        <div style="position:relative;">
          <span class="badge-pill">${item.type === 'video' ? '🎥 VIDEO AI' : '📸 100 PROMPT'}</span>
          <img src="images/${item.folder}/cover.jpg" alt="${item.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
        </div>
        <div class="card-info">
          <h3 class="card-title">${item.title}</h3>
          <div class="card-rating-badge">★ ${item.rating || '4.9/5'} (${item.sales || 'Ready'})</div>
          <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
          <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">
            Buka Katalog (100 Item)
          </button>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

// =========================================================================
// 13. PINTU RAHASIA ADMIN KE ANALYTICS.HTML (TERPROTEKSI SANDI PIN)
// =========================================================================
function bukaPortalAdmin() {
  // Ganti "JIWAS99" dengan kode PIN khusus admin yang Anda kehendaki
  const MASTER_ADMIN_PIN = "JIWAS99";

  const inputPin = prompt("Masukkan PIN Akses Admin JIWAS Studio:");
  if (inputPin === null) return; // Pengguna klik Cancel/Batal

  if (inputPin.trim().toUpperCase() === MASTER_ADMIN_PIN) {
    window.location.href = "analytics.html";
  } else {
    alert("Akses ditolak: PIN salah!");
  }
}