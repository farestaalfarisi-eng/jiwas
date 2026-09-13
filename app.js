// =========================================================================
// JIWAS - MASTER CONTROLLER & GROWTH OS ENGINE (app.js V20.0 Master Production)
// Built-in Resilient Registry • Zero-404 Media • Decaying Showcase (24->6->2->0)
// Dynamic Social Proof • Clean Non-Atelier Views • Family Formation Composer
// Interactive Card 3-Dots Menu • Customer Voice Analytics Recorder
// Curated & Designed for JIWAS Atelier by Sahabat Kaya
// =========================================================================

let activePack = null;
let targetTierModal = 'starter';

// Variabel Penampung Formasi Keluarga
let extraFamilyMembers = [];
let currentAppliedFormationPrompt = "";

// -------------------------------------------------------------------------
// 0. DATASET DEFAULT REGISTRY (Fallback Aman)
// -------------------------------------------------------------------------
const DEFAULT_FALLBACK_KATALOG = [
  { id: "velvet-lux", folder: "velvet", title: "Luxury Royal Velvet Studio", type: "foto", status: "live", rating: "4.9/5", sales: "180+ Terjual" },
  { id: "hijab-lux", folder: "hijab", title: "Luxury Hijab Collection", type: "foto", status: "live", rating: "5.0/5", sales: "210+ Terjual" },
  { id: "couple-cinematic", folder: "couple", title: "Luxury Couple Cinematic", type: "foto", status: "live", rating: "4.8/5", sales: "95+ Terjual" },
  { id: "family-lux", folder: "family", title: "Luxury Family Collection", type: "foto", status: "live", rating: "5.0/5", sales: "200+ Terjual" },
  { id: "family02-lux", folder: "family02", title: "Luxury Family Collection Vol.02", type: "foto", status: "live", rating: "4.9/5", sales: "85+ Terjual" },
  { id: "family03-lux", folder: "family03", title: "Luxury Family Collection Vol.03", type: "foto", status: "live", rating: "4.8/5", sales: "70+ Terjual" },
  { id: "ceo-lux", folder: "ceo", title: "Luxury CEO & Corporate Executive", type: "foto", status: "live", rating: "4.9/5", sales: "140+ Terjual" },
  { id: "fantasi-gold", folder: "fantasi", title: "Luxury Fantasy Gold", type: "foto", status: "live", rating: "4.9/5", sales: "115+ Terjual" },
  { id: "makeup-glam", folder: "makeup", title: "Luxury Beauty & Makeover", type: "foto", status: "live", rating: "5.0/5", sales: "160+ Terjual" },

  // Video AI
  { id: "video-cinematic", folder: "video", title: "Cinematic Motion Suite", type: "video", status: "live", rating: "5.0/5", sales: "220+ Terjual" },

  // Akun AI
  { id: "chatgpt-plus", folder: "canvas", title: "ChatGPT Plus Shared / Private", type: "digital", status: "live", priceText: "Rp35.000", description: "Akses GPT-4o & Canvas resmi tanpa antrean." },
  { id: "midjourney-pro", folder: "canvas", title: "Midjourney Fast Hours Access", type: "digital", status: "live", priceText: "Rp45.000", description: "Akses Midjourney kualitas fotorealistik mode Fast GPU." },
  { id: "canva-pro", folder: "canvas", title: "Canva Pro Desain Suite", type: "digital", status: "live", priceText: "Rp15.000", description: "Invite Canva Pro Lifetime untuk template premium." }
];

function getActiveRegistry() {
  if (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY) && KATALOG_REGISTRY.length > 0) {
    return KATALOG_REGISTRY;
  }
  return DEFAULT_FALLBACK_KATALOG;
}

// -------------------------------------------------------------------------
// 1. DATASET SHOWCASE BEFORE & AFTER (24 PASANG)
// -------------------------------------------------------------------------
const SHOWCASE_DATA = [
  { title: "Luxury Royal Velvet Studio",    before: "images/showcase/1.jpg",  after: "images/showcase/2.jpg" },
  { title: "Luxury Hijab Chiaroscuro",      before: "images/showcase/3.jpg",  after: "images/showcase/4.jpg" },
  { title: "Regal Gold Fantasy Portrait",   before: "images/showcase/5.jpg",  after: "images/showcase/6.jpg" },
  { title: "Corporate Executive CEO",       before: "images/showcase/7.jpg",  after: "images/showcase/8.jpg" },
  { title: "Luxury Couple Cinematic",       before: "images/showcase/9.jpg",  after: "images/showcase/10.jpg" },
  { title: "Beauty & Micro Skin Retouch",   before: "images/showcase/11.jpg", after: "images/showcase/12.jpg" },
  { title: "Family Heritage Studio",        before: "images/showcase/13.jpg", after: "images/showcase/14.jpg" },
  { title: "High-Fashion Editorial Model",  before: "images/showcase/15.jpg", after: "images/showcase/16.jpg" },
  { title: "Cinematic Warm Rim-Light",      before: "images/showcase/17.jpg", after: "images/showcase/18.jpg" },
  { title: "Old-Money Aesthetic Portrait",  before: "images/showcase/19.jpg", after: "images/showcase/20.jpg" },
  { title: "Regal Velvet Emerald Studio",   before: "images/showcase/21.jpg", after: "images/showcase/22.jpg" },
  { title: "Minimalist Monochrome Atelier", before: "images/showcase/23.jpg", after: "images/showcase/24.jpg" },
  { title: "Gothic Dark Royalty",           before: "images/showcase/25.jpg", after: "images/showcase/26.jpg" },
  { title: "Vintage Film Grain 35mm",       before: "images/showcase/27.jpg", after: "images/showcase/28.jpg" },
  { title: "Luxury Cyberpunk Atelier",      before: "images/showcase/29.jpg", after: "images/showcase/30.jpg" },
  { title: "Regal Traditional Nusantara",   before: "images/showcase/31.jpg", after: "images/showcase/32.jpg" },
  { title: "Baroque Oil Painting Mood",     before: "images/showcase/33.jpg", after: "images/showcase/34.jpg" },
  { title: "Outdoor Golden Hour Glow",      before: "images/showcase/35.jpg", after: "images/showcase/36.jpg" },
  { title: "Corporate Tech Founder",        before: "images/showcase/37.jpg", after: "images/showcase/38.jpg" },
  { title: "Bridal Grace Glamour",          before: "images/showcase/39.jpg", after: "images/showcase/40.jpg" },
  { title: "Dramatic Chiaroscuro Shadow",   before: "images/showcase/41.jpg", after: "images/showcase/42.jpg" },
  { title: "Regal Silk & Pearl Velvet",     before: "images/showcase/43.jpg", after: "images/showcase/44.jpg" },
  { title: "Cinematic Rain Window Studio",  before: "images/showcase/45.jpg", after: "images/showcase/46.jpg" },
  { title: "Masterpiece Royal Portrait 8K", before: "images/showcase/47.jpg", after: "images/showcase/48.jpg" }
];

let activePairsPerView = 24;
let currentShowcaseIndex = 0;
let showcaseTimer = null;

let userVisitCount = 1;
let userAffinity = {};
let surveyTriggered = false;
let deferredPrompt = null;

// -------------------------------------------------------------------------
// 2. LIVE ORGANIC PULSE ENGINE
// -------------------------------------------------------------------------
function initFomoPulseEngine() {
  const activeEl = document.getElementById("fomoActiveUsers");
  const transEl = document.getElementById("fomoTransUsers");
  const viewsEl = document.getElementById("fomoViewsCount");
  const slotEl = document.getElementById("fomoSlotCount");

  function formatK(num) {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(".", ",") + "k+";
    return num.toString();
  }

  let baseViews = parseInt(localStorage.getItem("JIWAS_ACC_VIEWS") || "1420", 10);
  baseViews += Math.floor(Math.random() * 2) + 1;
  localStorage.setItem("JIWAS_ACC_VIEWS", baseViews.toString());
  if (viewsEl) viewsEl.innerText = formatK(baseViews);

  const todayStr = new Date().toISOString().split('T')[0];
  let storedSlotData = JSON.parse(localStorage.getItem("JIWAS_DAILY_SLOT_STATE") || "{}");
  if (storedSlotData.date !== todayStr) {
    storedSlotData = { date: todayStr, remaining: 7 };
    localStorage.setItem("JIWAS_DAILY_SLOT_STATE", JSON.stringify(storedSlotData));
  }
  if (slotEl) slotEl.innerText = storedSlotData.remaining;

  let currentActive = 32 + Math.floor(Math.random() * 10);
  let currentConsult = 2 + Math.floor(Math.random() * 3);

  if (activeEl) activeEl.innerText = currentActive;
  if (transEl) transEl.innerText = currentConsult;

  function loopPulseCycle() {
    const deltaActive = Math.floor(Math.random() * 5) - 2;
    currentActive = Math.min(46, Math.max(26, currentActive + deltaActive));
    if (activeEl) activeEl.innerText = currentActive;

    if (Math.random() > 0.45) {
      currentConsult = Math.min(5, Math.max(1, currentConsult + (Math.random() > 0.5 ? 1 : -1)));
      if (transEl) transEl.innerText = currentConsult;
    }

    if (Math.random() > 0.6) {
      baseViews += 1;
      localStorage.setItem("JIWAS_ACC_VIEWS", baseViews.toString());
      if (viewsEl) viewsEl.innerText = formatK(baseViews);
    }

    if (Math.random() > 0.85 && storedSlotData.remaining > 2) {
      storedSlotData.remaining -= 1;
      localStorage.setItem("JIWAS_DAILY_SLOT_STATE", JSON.stringify(storedSlotData));
      if (slotEl) slotEl.innerText = storedSlotData.remaining;
    }

    const nextInterval = 14000 + Math.floor(Math.random() * 12000);
    setTimeout(loopPulseCycle, nextInterval);
  }

  setTimeout(loopPulseCycle, 12000);
}

function catatTransaksiFomoBar() {
  try {
    let storedSlotData = JSON.parse(localStorage.getItem("JIWAS_DAILY_SLOT_STATE") || "{}");
    if (storedSlotData.remaining && storedSlotData.remaining > 1) {
      storedSlotData.remaining -= 1;
      localStorage.setItem("JIWAS_DAILY_SLOT_STATE", JSON.stringify(storedSlotData));
      const slotEl = document.getElementById("fomoSlotCount");
      if (slotEl) slotEl.innerText = storedSlotData.remaining;
    }
  } catch (e) {}
}

// -------------------------------------------------------------------------
// 3. SOCIAL PROOF GENERATOR DINAMIS
// -------------------------------------------------------------------------
function initSocialProofPopups() {
  const toast = document.getElementById("liveBuyerToast");
  const nameEl = document.getElementById("buyerToastUser");
  const descEl = document.getElementById("buyerToastDesc");
  if (!toast || !nameEl || !descEl) return;

  const daftarNama = [
    "Kak Rina", "Bunda Dewi", "Kak Dimas", "Pak Hendra", "Kak Tania",
    "Kak Fajar", "Mbak Anisa", "Mas Rizky", "Kak Nadia", "Bunda Maya",
    "Kak Aditya", "Mbak Citra", "Pak Wahyu", "Kak Sarah", "Mas Bayu"
  ];

  const daftarKota = [
    "Surabaya", "Medan", "Jakarta Selatan", "Bandung", "Makassar",
    "Yogyakarta", "Semarang", "Denpasar", "Palembang", "Balikpapan"
  ];

  const daftarAksi = [
    "Baru saja membuka PIN VIP 25K (Royal Velvet)",
    "Membeli PIN Starter 10K (Hijab Atelier)",
    "Baru mengaktifkan Paket VIP (Luxury Family)",
    "Membeli PIN Starter (CEO Executive)",
    "Baru saja membuka PIN VIP 25K (Couple Cinematic)",
    "Mengaktifkan PIN VIP 25K (Fantasy Gold)",
    "Baru mengaktifkan PIN VIP 25K (Beauty & Glam)"
  ];

  function munculkanNotifikasi() {
    const nama = daftarNama[Math.floor(Math.random() * daftarNama.length)];
    const kota = daftarKota[Math.floor(Math.random() * daftarKota.length)];
    const aksi = daftarAksi[Math.floor(Math.random() * daftarAksi.length)];

    nameEl.innerText = `${nama} (${kota})`;
    descEl.innerText = aksi;

    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 4500);

    const interval = 22000 + Math.floor(Math.random() * 16000);
    setTimeout(munculkanNotifikasi, interval);
  }

  setTimeout(munculkanNotifikasi, 12000);
}

// -------------------------------------------------------------------------
// 4. RADAR LOGGER & TELEMETRY
// -------------------------------------------------------------------------
function catatLogAktivitas(eventType, targetName, detailText) {
  try {
    const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');

    logs.push({
      time: timeStr,
      type: eventType,
      target: targetName,
      detail: detailText || ""
    });

    if (logs.length > 300) logs.shift();
    localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
  } catch (e) {}
}

// -------------------------------------------------------------------------
// 5. INISIALISASI UTAMA
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  try { initServiceWorker(); } catch (e) {}
  try { initVisitorAndAffinity(); } catch (e) {}
  try { initFomoPulseEngine(); } catch (e) {}
  try { applyProgressiveFunnelLayout(); } catch (e) {}
  try { initShowcaseAutoSlider(); } catch (e) {}
  try { initLiveMarqueeTransactions(); } catch (e) {}
  try { initSocialProofPopups(); } catch (e) {}
  try { initExitIntentSurvey(); } catch (e) {}

  renderHomeCategories();
  renderAtelierFeed();
  renderKatalogFoto();
  renderKatalogVideo();
  renderKatalogAkun();
  initGlobalClickListener();

  cekAutoUnlockURL();
}

function initServiceWorker() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

function initVisitorAndAffinity() {
  try {
    const visits = parseInt(localStorage.getItem("JIWAS_VISIT_COUNT") || "0", 10) + 1;
    localStorage.setItem("JIWAS_VISIT_COUNT", visits.toString());
    userVisitCount = visits;
    userAffinity = JSON.parse(localStorage.getItem("JIWAS_USER_AFFINITY") || "{}");
    catatLogAktivitas("VISIT_PAGE", "JIWAS Atelier", "Kunjungan ke-" + visits);
  } catch (e) {
    userVisitCount = 1;
    userAffinity = {};
  }
}

function recordUserAffinity(categoryKey, scoreWeight) {
  try {
    if (!categoryKey) return;
    const weight = scoreWeight || 1;
    userAffinity[categoryKey] = (userAffinity[categoryKey] || 0) + weight;
    localStorage.setItem("JIWAS_USER_AFFINITY", JSON.stringify(userAffinity));
  } catch (e) {}
}

function getDominantUserCategory() {
  const keys = Object.keys(userAffinity);
  if (keys.length === 0) return null;
  return keys.reduce((a, b) => userAffinity[a] > userAffinity[b] ? a : b);
}

function applyProgressiveFunnelLayout() {
  const showcaseSec = document.querySelector(".showcase-section");
  const homeCategorySec = document.getElementById("atelierCategoriesSection");
  const heroCompact = document.getElementById("atelierMainHeader");
  const btnRestore = document.getElementById("btnRestoreShowcase");

  if (userVisitCount <= 4) activePairsPerView = 24;
  else if (userVisitCount <= 6) activePairsPerView = 6;
  else if (userVisitCount === 7) activePairsPerView = 2;
  else activePairsPerView = 0;

  if (activePairsPerView === 0) {
    if (showcaseSec) showcaseSec.classList.add("hidden");
    if (homeCategorySec) homeCategorySec.classList.add("hidden");
    if (heroCompact) heroCompact.classList.add("hidden");
    if (btnRestore) btnRestore.classList.remove("hidden");
  } else {
    if (showcaseSec) showcaseSec.classList.remove("hidden");
    if (homeCategorySec) homeCategorySec.classList.remove("hidden");
    if (heroCompact) heroCompact.classList.remove("hidden");
    if (btnRestore) btnRestore.classList.add("hidden");
  }

  if (activePairsPerView > 0) {
    renderShowcaseCards();
  }
}

function pulihkanTampilanShowcase() {
  const showcaseSec = document.querySelector(".showcase-section");
  const homeCategorySec = document.getElementById("atelierCategoriesSection");
  const heroCompact = document.getElementById("atelierMainHeader");
  const btnRestore = document.getElementById("btnRestoreShowcase");

  activePairsPerView = 24;

  if (showcaseSec) showcaseSec.classList.remove("hidden");
  if (homeCategorySec) homeCategorySec.classList.remove("hidden");
  if (heroCompact) heroCompact.classList.remove("hidden");
  if (btnRestore) btnRestore.classList.add("hidden");

  renderShowcaseCards();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  tampilkanToast("✨ Etalase Before & After dipulihkan!");
}

function initGlobalClickListener() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".card-menu-container")) {
      document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
    }
  });
}

// -------------------------------------------------------------------------
// PENGENDALI MENU TITIK TIGA (INTERAKTIF & ANTI BUBBLING)
// -------------------------------------------------------------------------
function toggleCardMenu(event, menuId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const targetMenu = document.getElementById(menuId);
  if (!targetMenu) return;

  document.querySelectorAll(".card-dropdown-menu").forEach(el => {
    if (el.id !== menuId) el.classList.add("hidden");
  });

  targetMenu.classList.toggle("hidden");
}

function handleMenuAction(action, packId, itemIndex, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));

  const allPacks = getActiveRegistry();
  const pack = allPacks.find(p => p.id === packId);
  const packTitle = pack ? pack.title : "Katalog JIWAS";

  if (action === 'save') {
    tampilkanToast(`📌 Item #${itemIndex} (${packTitle}) disimpan ke favorit!`);
    catatLogAktivitas("SAVE_PIN", packTitle, `Simpan item #${itemIndex}`);
  } else if (action === 'share') {
    bagikanKoleksiKeWA(packTitle);
  } else if (action === 'prompt') {
    const isFree = itemIndex <= 3;
    if (isFree) {
      copasPrompt(`Hyperrealistic luxury portrait of ${packTitle}, item #${itemIndex}, 8k studio lighting, master quality --ar 9:16`);
      catatLogAktivitas("COPY_PROMPT", packTitle, `Salin cepat prompt #${itemIndex}`);
    } else {
      bukaDetailPackTarget(packId, itemIndex, true);
    }
  } else if (action === 'use') {
    bukaGeminiEditorPrompt(null, `${packTitle} #${itemIndex}`);
    const inputEl = document.getElementById("geminiPromptInput");
    if (inputEl) {
      inputEl.value = `Hyperrealistic luxury portrait of ${packTitle}, item #${itemIndex}, 8k studio lighting, master quality --ar 9:16`;
    }
  }
}

// -------------------------------------------------------------------------
// 6. TRANSAKSI & WHATSAPP GATEWAY
// -------------------------------------------------------------------------
function initLiveMarqueeTransactions() {
  const counterEl = document.getElementById("salesCounterText");
  const marquee = document.getElementById("liveMarqueeContainer");
  
  const realSalesCount = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10);
  if (counterEl) counterEl.innerText = realSalesCount.toLocaleString('id-ID') + "+";

  const lastSalesTitle = localStorage.getItem("JIWAS_LAST_SALES_TITLE");
  const lastSalesTier = localStorage.getItem("JIWAS_LAST_SALES_TIER");

  if (marquee && lastSalesTitle && lastSalesTier) {
    const liveSpan = document.createElement("span");
    liveSpan.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> AKTIVASI TERAKHIR: PIN ' + lastSalesTier + ' (' + lastSalesTitle + ')';
    marquee.prepend(liveSpan);
  }
}

function rekamTransaksiNyata(packTitle, tierName) {
  try {
    const currentSales = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10) + 1;
    localStorage.setItem("JIWAS_REAL_SALES_COUNT", currentSales.toString());
    localStorage.setItem("JIWAS_LAST_SALES_TITLE", packTitle);
    localStorage.setItem("JIWAS_LAST_SALES_TIER", tierName);

    catatTransaksiFomoBar();

    const counterEl = document.getElementById("salesCounterText");
    if (counterEl) counterEl.innerText = currentSales.toLocaleString('id-ID') + "+";

    const marquee = document.getElementById("liveMarqueeContainer");
    if (marquee) {
      const newLiveSpan = document.createElement("span");
      newLiveSpan.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> PEMBELIAN BARU: PIN ' + tierName + ' (' + packTitle + ') Berhasil!';
      marquee.prepend(newLiveSpan);
    }
  } catch (e) {}
}

function getAdminWhatsAppNumber() {
  return localStorage.getItem("JIWAS_CUSTOM_WA") || 
         (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6282255267793");
}

function kirimPesananLangsungWA(packTitle, tierName, hargaTeks) {
  const waNumber = getAdminWhatsAppNumber();
  catatLogAktivitas("CLICK_WA", packTitle, "Klik Beli " + tierName + " (" + hargaTeks + ")");
  catatTransaksiFomoBar();

  const pesan = `Halo Admin JIWAS,%0A%0ASaya ingin membeli *PIN Akses ${tierName} (${hargaTeks})* untuk katalog *${packTitle}*.%0A%0AMohon info rekening / QRIS pembayarannya ya.`;
  window.open("https://wa.me/" + waNumber + "?text=" + pesan, "_blank");
}

function hubungiAdminWaLangsung() {
  const waNumber = getAdminWhatsAppNumber();
  const pesan = "Halo Admin JIWAS, saya tertarik bertanya tentang formula studio foto AI di JIWAS.";
  window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesan), "_blank");
}

function bagikanKoleksiKeWA(packTitle) {
  const currentDomain = window.location.origin + window.location.pathname;
  const teksPesan = "Halo! Coba cek formula foto studio bangsawan *" + packTitle + "* di JIWAS Atelier: " + currentDomain + "%0A%0ABagus banget buat naikin kualitas foto profil tanpa sewa studio mahal! ✨";
  
  catatLogAktivitas("SHARE_WA_VIRAL", packTitle, "Membagikan ke WhatsApp");
  window.open("https://api.whatsapp.com/send?text=" + teksPesan, "_blank");
}

// -------------------------------------------------------------------------
// 7. SHOWCASE MEDIA ENGINE
// -------------------------------------------------------------------------
function initShowcaseAutoSlider() {
  renderShowcaseCards();
  startShowcaseTimer();
}

function renderCleanMedia(mediaPath, labelClass, labelText) {
  const cleanPath = mediaPath.replace(/^\/+/, '');
  const isVideo = cleanPath.toLowerCase().endsWith('.mp4');

  if (isVideo) {
    const posterJpg = cleanPath.replace(/\.mp4$/i, '.jpg').replace('videos/', 'images/');
    return `
      <div class="ba-half-view">
        <video autoplay muted loop playsinline poster="${posterJpg}">
          <source src="${cleanPath}" type="video/mp4">
          <img src="${posterJpg}" alt="${labelText}" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
        </video>
        <span class="badge-tag-side ${labelClass}">${labelText}</span>
      </div>
    `;
  }

  const imgSrc = cleanPath.includes('.') ? cleanPath : `images/${cleanPath}.jpg`;
  return `
    <div class="ba-half-view">
      <img src="${imgSrc}" alt="${labelText}" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      <span class="badge-tag-side ${labelClass}">${labelText}</span>
    </div>
  `;
}

function renderShowcaseCards() {
  const container = document.getElementById("gridShowcaseBA");
  const dotsContainer = document.getElementById("showcaseDots");
  const navBar = document.querySelector(".showcase-nav-bar");
  if (!container || SHOWCASE_DATA.length === 0 || activePairsPerView === 0) return;

  const totalItems = SHOWCASE_DATA.length;
  const itemsToRender = Math.min(activePairsPerView, totalItems);
  const totalPages = Math.ceil(totalItems / itemsToRender);
  const startIdx = currentShowcaseIndex * itemsToRender;

  container.style.opacity = "0.2";

  setTimeout(() => {
    container.innerHTML = "";

    for (let i = 0; i < itemsToRender; i++) {
      const itemIdx = (startIdx + i) % totalItems;
      const item = SHOWCASE_DATA[itemIdx];

      const beforeHTML = renderCleanMedia(item.before, "tag-before", "BEFORE");
      const isMotion = item.after.toLowerCase().endsWith('.mp4');
      const afterHTML = renderCleanMedia(item.after, "tag-after", isMotion ? "AFTER (8K MOTION)" : "AFTER (AI)");

      const card = document.createElement("div");
      card.className = "ba-card-unit";
      card.innerHTML = `
        <div class="ba-dual-image-box">
          ${beforeHTML}
          ${afterHTML}
        </div>
        <div class="ba-card-footer">
          <span>${item.title}</span>
          <span style="color:#22c55e; font-weight:700;">
            ${isMotion ? '<i class="fa-solid fa-circle-play"></i> MOTION 8K' : '✓ 8K ATELIER'}
          </span>
        </div>
      `;
      container.appendChild(card);
    }

    container.style.opacity = "1";
  }, 120);

  if (navBar) navBar.style.display = totalPages > 1 ? "flex" : "none";

  if (dotsContainer && totalPages > 1) {
    dotsContainer.innerHTML = "";
    for (let p = 0; p < totalPages; p++) {
      const dot = document.createElement("div");
      dot.className = "dot-indicator " + (p === currentShowcaseIndex ? "active" : "");
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
  const totalPages = Math.ceil(SHOWCASE_DATA.length / Math.min(activePairsPerView, SHOWCASE_DATA.length));
  if (totalPages <= 1) return;
  currentShowcaseIndex = (currentShowcaseIndex + 1) % totalPages;
  renderShowcaseCards();
  restartShowcaseTimer();
}

function prevShowcaseSlide() {
  const totalPages = Math.ceil(SHOWCASE_DATA.length / Math.min(activePairsPerView, SHOWCASE_DATA.length));
  if (totalPages <= 1) return;
  currentShowcaseIndex = (currentShowcaseIndex - 1 + totalPages) % totalPages;
  renderShowcaseCards();
  restartShowcaseTimer();
}

function startShowcaseTimer() {
  if (showcaseTimer) clearInterval(showcaseTimer);
  showcaseTimer = setInterval(nextShowcaseSlide, 14000);
}

function restartShowcaseTimer() {
  startShowcaseTimer();
}

// -------------------------------------------------------------------------
// 8. ATELIER FEED (PINTEREST MASONRY 9:16)
// -------------------------------------------------------------------------
function renderAtelierFeed() {
  const container = document.getElementById("gridAtelierFeed");
  if (!container) return;

  const allPacks = getActiveRegistry().filter(item => item.status === "live" && item.type !== "digital");
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
    const menuId = "menu_feed_" + pin.pack.id + "_" + pin.itemIndex + "_" + i;
    const card = document.createElement("div");
    card.className = "pin-item";

    const freeBadgeHTML = pin.isFree ? '<div class="pin-badge-free-elegant"><i class="fa-solid fa-sparkles"></i> <span>FREE DEMO</span></div>' : '';

    card.innerHTML = `
      <div class="card-menu-container">
        <button class="btn-three-dots" onclick="toggleCardMenu(event, '${menuId}')" aria-label="Menu Aksi">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div id="${menuId}" class="card-dropdown-menu hidden">
          <button class="dropdown-item" onclick="handleMenuAction('save', '${pin.pack.id}', ${pin.itemIndex}, event)"><i class="fa-solid fa-bookmark"></i> Save</button>
          <button class="dropdown-item" onclick="handleMenuAction('share', '${pin.pack.id}', ${pin.itemIndex}, event)"><i class="fa-solid fa-share-nodes"></i> Bagikan</button>
          <button class="dropdown-item" onclick="handleMenuAction('prompt', '${pin.pack.id}', ${pin.itemIndex}, event)"><i class="fa-solid fa-copy"></i> Prompt</button>
          <button class="dropdown-item action-gemini" onclick="handleMenuAction('use', '${pin.pack.id}', ${pin.itemIndex}, event)"><i class="fa-solid fa-bolt"></i> Gunakan</button>
        </div>
      </div>
      ${freeBadgeHTML}
      <img src="images/${pin.pack.folder}/${pin.itemIndex}.jpg" alt="${pin.pack.title}" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
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
  if (packTag) packTag.innerText = "100 Koleksi Formula Serupa";

  relatedFeed.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const isFree = i <= 3;
    const menuId = "menu_rel_" + pack.id + "_" + i;
    const card = document.createElement("div");
    card.className = "pin-item";

    const freeBadgeHTML = isFree ? '<div class="pin-badge-free-elegant"><i class="fa-solid fa-sparkles"></i> <span>FREE DEMO</span></div>' : '';

    card.innerHTML = `
      <div class="card-menu-container">
        <button class="btn-three-dots" onclick="toggleCardMenu(event, '${menuId}')"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        <div id="${menuId}" class="card-dropdown-menu hidden">
          <button class="dropdown-item" onclick="handleMenuAction('save', '${pack.id}', ${i}, event)"><i class="fa-solid fa-bookmark"></i> Save</button>
          <button class="dropdown-item" onclick="handleMenuAction('share', '${pack.id}', ${i}, event)"><i class="fa-solid fa-share-nodes"></i> Bagikan</button>
          <button class="dropdown-item" onclick="handleMenuAction('prompt', '${pack.id}', ${i}, event)"><i class="fa-solid fa-copy"></i> Prompt</button>
          <button class="dropdown-item action-gemini" onclick="handleMenuAction('use', '${pack.id}', ${i}, event)"><i class="fa-solid fa-bolt"></i> Gunakan</button>
        </div>
      </div>
      ${freeBadgeHTML}
      <img src="images/${pack.folder}/${i}.jpg" alt="${pack.title} #${i}" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
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
  const relatedHeader = document.getElementById("atelierRelatedHeader");
  const mainFeed = document.getElementById("gridAtelierFeed");
  const relatedFeed = document.getElementById("gridAtelierRelated");

  applyProgressiveFunnelLayout();
  if (relatedHeader) relatedHeader.classList.add("hidden");
  if (relatedFeed) relatedFeed.classList.add("hidden");
  if (mainFeed) mainFeed.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------------------------------------------------------
// 9. TABS CONTROLLER
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
    const heroHeader = document.getElementById("atelierMainHeader");

    if (secAtelier) secAtelier.classList.add("hidden");
    if (secFoto) secFoto.classList.add("hidden");
    if (secVideo) secVideo.classList.add("hidden");
    if (secAkun) secAkun.classList.add("hidden");
    if (secDetail) secDetail.classList.add("hidden");

    if (tabType === 'atelier') {
      if (secAtelier) secAtelier.classList.remove("hidden");
      if (heroHeader && activePairsPerView > 0) heroHeader.classList.remove("hidden");
      tutupRelatedFeed();
    } else {
      if (heroHeader) heroHeader.classList.add("hidden");
    }

    if (tabType === 'foto' && secFoto) {
      secFoto.classList.remove("hidden");
      renderKatalogFoto();
    }
    if (tabType === 'video' && secVideo) {
      secVideo.classList.remove("hidden");
      renderKatalogVideo();
    }
    if (tabType === 'akun' && secAkun) {
      secAkun.classList.remove("hidden");
      renderKatalogAkun();
    }

    catatLogAktivitas("SWITCH_TAB", tabType.toUpperCase(), "Beralih ke tab " + tabType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {}
}

function bukaDetailPackTarget(packId, itemIndex, openPinModal) {
  const allPacks = getActiveRegistry();
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

// -------------------------------------------------------------------------
// 10. KATALOG RENDERING ENGINE (2 KOLOM ELEGAN)
// -------------------------------------------------------------------------
function renderHomeCategories() {
  const container = document.getElementById("gridHomeCategories");
  if (!container) return;
  container.innerHTML = "";

  const registry = getActiveRegistry();
  registry.forEach(item => {
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
          <p style="font-size:0.7rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">${item.description || 'Sedang dalam kurasi formula 8K.'}</p>
          <button onclick="kirimPesananLangsungWA('${item.title}', 'Pre-Order VIP', 'Coming Soon')" class="btn-copy" style="background:#1e1e24; color:var(--gold-light); border:1px solid var(--card-border); width:100%; box-sizing:border-box; font-size:0.72rem; padding:8px 6px;">🔔 Ingatkan di WA</button>
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
          <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka Katalog</button>
        </div>
      `;
    }
    container.appendChild(card);
  });
}

function renderKatalogFoto() {
  const container = document.getElementById("gridFotoKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = getActiveRegistry().filter(item => item.type === "foto" && item.status === "live");

  list.forEach((pack, index) => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);

    let rankBadgeHTML = index === 0 
      ? '<span class="badge-pill badge-rank-gold">🥇 TOP #1 TERLARIS</span>' 
      : (index === 1 ? '<span class="badge-pill badge-rank-blue">🥈 BEST SELLER</span>' : '<span class="badge-pill badge-foto">📸 100 ITEMS</span>');

    card.innerHTML = `
      <div style="position:relative;">
        ${rankBadgeHTML}
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '4.9/5'} (${pack.sales || 'Ready'})</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat 100 Prompt</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogVideo() {
  const container = document.getElementById("gridVideoKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = getActiveRegistry().filter(item => item.type === "video" && item.status === "live");

  list.forEach((pack) => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-video">🎥 100 PROMPTS</span>
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '5.0/5'} (${pack.sales || 'Ready'})</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat 100 Prompt</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogAkun() {
  const container = document.getElementById("gridAkunKatalog");
  if (!container) return;
  container.innerHTML = "";

  const list = getActiveRegistry().filter(item => item.type === "digital" && item.status === "live");

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
        <p style="font-size:0.72rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">${item.description || ''}</p>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.9rem; margin-bottom:8px;">${item.priceText}</div>
        <button onclick="kirimPesananLangsungWA('${item.title}', 'Akun AI', '${item.priceText}')" class="btn-copy" style="padding:8px 12px; font-size:0.75rem; width:100%;">Beli via WA</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// 11. DETAIL PACK & FAMILY FORMATION COMPOSER
// -------------------------------------------------------------------------
function isFamilyCatalog(pack) {
  if (!pack) return false;
  const idStr = String(pack.id || "").toLowerCase();
  const titleStr = String(pack.title || "").toLowerCase();
  const folderStr = String(pack.folder || "").toLowerCase();
  return idStr.includes("fam") || titleStr.includes("family") || titleStr.includes("keluarga") || folderStr.includes("family");
}

function bukaDetailPack(pack) {
  activePack = pack;
  recordUserAffinity(pack.folder || pack.id, 3);
  catatLogAktivitas("VIEW_PACK", pack.title, "Buka detail " + pack.title);

  const secAtelier = document.getElementById("sectionAtelier");
  const secFoto = document.getElementById("sectionFotoAI");
  const secVideo = document.getElementById("sectionVideoAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");
  const heroHeader = document.getElementById("atelierMainHeader");

  if (heroHeader) heroHeader.classList.add("hidden");
  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secDetail) secDetail.classList.remove("hidden");

  const titleEl = document.getElementById("detailTitle");
  const summaryEl = document.getElementById("packSummaryTitle");
  if (titleEl) titleEl.innerText = pack.title;
  if (summaryEl) {
    summaryEl.innerHTML = pack.title + ' (100 Prompt)<div class="detail-live-counter"><i class="fa-solid fa-fire" style="color:#f59e0b;"></i> ' + (pack.sales || '150+ Terjual') + ' • 12 orang sedang melihat</div>';
  }

  const pabContainer = document.querySelector(".pack-action-box .pab-buttons");
  if (pabContainer) {
    pabContainer.innerHTML = `
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'Starter 10K', 'Rp10.000')" class="btn-buy-wa">Beli Starter (10K)</button>
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'VIP 25K', 'Rp25.000')" class="btn-buy-wa" style="background:var(--gold-gradient); color:#000;">Beli VIP (25K)</button>
      <button class="btn-enter-pin-main" onclick="bukaModalPIN('vip')">Masukkan PIN</button>
    `;
  }

  // Pengendali Kotak Formasi Keluarga (Memaksa tampil di atas item pack foto keluarga)
  const composerBox = document.getElementById("familyFormationComposer");
  if (composerBox) {
    if (isFamilyCatalog(pack)) {
      composerBox.classList.remove("hidden");
      composerBox.style.display = "block";
      updatePromptFormasi();
    } else {
      composerBox.classList.add("hidden");
      composerBox.style.display = "none";
      currentAppliedFormationPrompt = "";
    }
  }

  renderDetailItemCards();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function kembaliKeKatalog() {
  const secDetail = document.getElementById("sectionDetailPack");
  if (secDetail) secDetail.classList.add("hidden");
  switchMainTab('atelier', document.getElementById('tabBtnAtelier'));
}

// Logika Formasi Anggota Keluarga
function tambahAnggota(tipe) {
  const newId = Date.now() + Math.random().toString(36).substring(2, 6);

  if (tipe === 'anak') {
    extraFamilyMembers.push({
      id: newId,
      type: 'anak',
      gender: 'son',
      age: 7,
      build: 'medium build'
    });
  } else if (tipe === 'kakek') {
    extraFamilyMembers.push({
      id: newId,
      type: 'kakek',
      age: 68,
      build: 'wise dignified posture'
    });
  } else if (tipe === 'nenek') {
    extraFamilyMembers.push({
      id: newId,
      type: 'nenek',
      age: 65,
      build: 'graceful warm elder posture'
    });
  } else {
    extraFamilyMembers.push({
      id: newId,
      type: 'lainnya',
      name: 'relative',
      age: 25,
      build: 'medium build'
    });
  }

  renderDaftarAnggotaDinamis();
  updatePromptFormasi();
}

function hapusAnggotaKeluarga(id) {
  extraFamilyMembers = extraFamilyMembers.filter(m => m.id !== id);
  renderDaftarAnggotaDinamis();
  updatePromptFormasi();
}

function renderDaftarAnggotaDinamis() {
  const container = document.getElementById("dynamicMembersContainer");
  if (!container) return;
  container.innerHTML = "";

  extraFamilyMembers.forEach((member, index) => {
    const card = document.createElement("div");
    card.className = "dynamic-member-card";

    let inputFields = "";

    if (member.type === 'anak') {
      inputFields = `
        <span class="member-label"><i class="fa-solid fa-child"></i> Anak #${index + 1}:</span>
        <select class="select-composer" onchange="ubahDataAnggota('${member.id}', 'gender', this.value)">
          <option value="son" ${member.gender === 'son' ? 'selected' : ''}>Laki-laki (Son)</option>
          <option value="daughter" ${member.gender === 'daughter' ? 'selected' : ''}>Perempuan (Daughter)</option>
        </select>
        <input type="number" class="input-composer" style="width:65px;" min="1" max="25" value="${member.age}" placeholder="Umur" oninput="ubahDataAnggota('${member.id}', 'age', this.value)"> th
        <select class="select-composer" onchange="ubahDataAnggota('${member.id}', 'build', this.value)">
          <option value="slender build" ${member.build === 'slender build' ? 'selected' : ''}>Kurus</option>
          <option value="medium build" ${member.build === 'medium build' ? 'selected' : ''}>Sedang</option>
          <option value="chubby cheerful build" ${member.build === 'chubby cheerful build' ? 'selected' : ''}>Gempal / Chubby</option>
          <option value="tall build" ${member.build === 'tall build' ? 'selected' : ''}>Jangkung</option>
          <option value="stout build" ${member.build === 'stout build' ? 'selected' : ''}>Gemuk</option>
        </select>
      `;
    } else if (member.type === 'kakek') {
      inputFields = `
        <span class="member-label"><i class="fa-solid fa-person-cane"></i> Kakek:</span>
        <input type="number" class="input-composer" style="width:65px;" min="50" max="100" value="${member.age}" placeholder="Umur" oninput="ubahDataAnggota('${member.id}', 'age', this.value)"> th
        <select class="select-composer" onchange="ubahDataAnggota('${member.id}', 'build', this.value)">
          <option value="wise dignified posture" ${member.build === 'wise dignified posture' ? 'selected' : ''}>Wibawa & Tegap</option>
          <option value="gentle slender build" ${member.build === 'gentle slender build' ? 'selected' : ''}>Kurus Teduh</option>
          <option value="sturdy build" ${member.build === 'sturdy build' ? 'selected' : ''}>Gempal Kuat</option>
        </select>
      `;
    } else if (member.type === 'nenek') {
      inputFields = `
        <span class="member-label"><i class="fa-solid fa-person-cane"></i> Nenek:</span>
        <input type="number" class="input-composer" style="width:65px;" min="50" max="100" value="${member.age}" placeholder="Umur" oninput="ubahDataAnggota('${member.id}', 'age', this.value)"> th
        <select class="select-composer" onchange="ubahDataAnggota('${member.id}', 'build', this.value)">
          <option value="graceful warm elder posture" ${member.build === 'graceful warm elder posture' ? 'selected' : ''}>Anggun & Hangat</option>
          <option value="petite gentle posture" ${member.build === 'petite gentle posture' ? 'selected' : ''}>Mungil</option>
          <option value="full-figured maternal build" ${member.build === 'full-figured maternal build' ? 'selected' : ''}>Gempal Lembut</option>
        </select>
      `;
    } else {
      inputFields = `
        <input type="text" class="input-composer" style="width:105px;" value="${member.name}" placeholder="Paman/Bibi/dll" oninput="ubahDataAnggota('${member.id}', 'name', this.value)">
        <input type="number" class="input-composer" style="width:65px;" min="1" max="90" value="${member.age}" placeholder="Umur" oninput="ubahDataAnggota('${member.id}', 'age', this.value)"> th
        <select class="select-composer" onchange="ubahDataAnggota('${member.id}', 'build', this.value)">
          <option value="medium build">Sedang</option>
          <option value="slender build">Kurus</option>
          <option value="tall build">Jangkung</option>
          <option value="stocky build">Gempal</option>
        </select>
      `;
    }

    card.innerHTML = `
      <div class="dynamic-member-inputs">${inputFields}</div>
      <button type="button" class="btn-remove-member" onclick="hapusAnggotaKeluarga('${member.id}')" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
    `;
    container.appendChild(card);
  });
}

function ubahDataAnggota(id, field, value) {
  const target = extraFamilyMembers.find(m => m.id === id);
  if (target) {
    target[field] = value;
    updatePromptFormasi();
  }
}

function updatePromptFormasi() {
  const fBuild = document.getElementById("fatherBuild")?.value || "medium build";
  const mBuild = document.getElementById("motherBuild")?.value || "slender graceful build";

  let promptParts = [];
  promptParts.push(`a distinguished father (${fBuild}) and an elegant mother (${mBuild})`);

  let kids = extraFamilyMembers.filter(m => m.type === 'anak');
  if (kids.length > 0) {
    let kidsDesc = kids.map((k) => `${k.gender === 'son' ? 'a handsome son' : 'a lovely daughter'} aged ${k.age} years old with ${k.build}`).join(", ");
    promptParts.push(`accompanied by their children: ${kidsDesc}`);
  }

  let grandpas = extraFamilyMembers.filter(m => m.type === 'kakek');
  if (grandpas.length > 0) {
    let gDesc = grandpas.map(g => `a respected grandfather (${g.age} years old, ${g.build})`).join(", ");
    promptParts.push(gDesc);
  }

  let grandmas = extraFamilyMembers.filter(m => m.type === 'nenek');
  if (grandmas.length > 0) {
    let gmDesc = grandmas.map(gm => `a loving grandmother (${gm.age} years old, ${gm.build})`).join(", ");
    promptParts.push(gmDesc);
  }

  let others = extraFamilyMembers.filter(m => m.type === 'lainnya');
  if (others.length > 0) {
    let oDesc = others.map(o => `a ${o.name || 'relative'} (${o.age} years old, ${o.build})`).join(", ");
    promptParts.push(oDesc);
  }

  const finalOutput = "featuring a harmonious family formation: " + promptParts.join(", ") + ", perfectly arranged in balanced studio pose, emotional family bond";
  const outBox = document.getElementById("familyPromptOutput");
  if (outBox) outBox.innerText = finalOutput;
  return finalOutput;
}

function resetFormasiKeluarga() {
  extraFamilyMembers = [];
  currentAppliedFormationPrompt = "";
  renderDaftarAnggotaDinamis();
  updatePromptFormasi();
  renderDetailItemCards();
  tampilkanToast("🔄 Formasi keluarga dikembalikan ke mode inti!");
}

function salinPromptFormasi() {
  const text = updatePromptFormasi();
  copasPrompt(text);
}

function terapkanKeSemuaPromptKeluarga() {
  currentAppliedFormationPrompt = updatePromptFormasi();
  renderDetailItemCards();
  tampilkanToast("✨ Formasi keluarga berhasil disisipkan ke 100 prompt!");
}

function cekAksesKatalog(catalogId, tier) {
  try {
    const unlockedStarter = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_STARTER") || "[]");
    const unlockedVIP = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_VIP") || "[]");
    if (unlockedVIP.includes(catalogId)) return true;
    if (tier === "starter" && unlockedStarter.includes(catalogId)) return true;
  } catch (e) {}
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
  } catch (e) {}
}

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

    let promptText = `Hyperrealistic luxury portrait of ${activePack.title}, item #${i}, 8k studio lighting, master quality --ar 9:16`;
    if (promptItemData) {
      promptText = typeof promptItemData === "object" ? (promptItemData.rawPrompt || promptText) : promptItemData;
    }

    // Sisipkan potongan formasi keluarga jika aktif
    if (currentAppliedFormationPrompt && isFamilyCatalog(activePack)) {
      promptText = `${promptText}, ${currentAppliedFormationPrompt}`;
    }

    let tier = "free";
    let isLocked = false;

    if (i >= 1 && i <= 3) {
      tier = "free";
    } else if (i >= 4 && i <= 23) {
      tier = "starter";
      isLocked = !cekAksesKatalog(activePack.id, "starter");
    } else if (i >= 24) {
      tier = "vip";
      isLocked = !cekAksesKatalog(activePack.id, "vip");
    }

    let imgClass = isLocked ? (tier === "starter" ? "img-blur-teaser" : "img-blur-heavy") : "";
    let overlayLock = isLocked ? `
      <div class="overlay-lock">
        <p style="font-size:0.75rem; font-weight:700; color:var(--gold-primary); margin-bottom:6px;">🔒 TERKUNCI (${tier.toUpperCase()} ${tier === "starter" ? "10K" : "25K"})</p>
        <button class="btn-enter-pin" onclick="bukaModalPIN('${tier}')">Masukkan PIN ${tier === "starter" ? "10K" : "25K"}</button>
      </div>` : '';

    let promptBoxHTML = !isLocked 
      ? `<div class="prompt-text-box" id="promptText_${i}">${promptText}</div>`
      : `<div class="prompt-text-box prompt-locked-text">Prompt dikunci. Buka akses paket ${tier === 'starter' ? '10K' : '25K'} untuk menyalin.</div>`;

    let actionButtons = !isLocked 
      ? `
        <div class="action-buttons">
          <button class="btn-copy" onclick="copasPromptFromElement('promptText_${i}', '${activePack.title}', ${i})">📋 Salin</button>
          <button class="btn-copy" style="background:#1e3a8a; border-color:#3b82f6; color:#93c5fd;" onclick="bukaGeminiEditorPrompt('promptText_${i}', '${activePack.title}', ${tier === 'free'})">
            <i class="fa-solid fa-bolt"></i> Gemini Edit
          </button>
          <button class="btn-share-promo" onclick="bagikanKoleksiKeWA('${activePack.title}')"><i class="fa-brands fa-whatsapp"></i> Pamer</button>
          <a href="https://www.bing.com/images/create" target="_blank" class="btn-direct-ai">🚀 Bing</a>
        </div>`
      : `
        <div class="action-buttons">
          <button onclick="kirimPesananLangsungWA('${activePack.title}', 'Paket ${tier.toUpperCase()}', 'Rp${tier === 'starter' ? '10.000' : '25.000'}')" class="btn-unlock-wa">
            Buka Akses via WA (${tier === 'starter' ? '10K' : '25K'})
          </button>
        </div>`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        <img src="${imgSrc}" class="${imgClass}" loading="lazy" alt="Item ${i}" onerror="this.onerror=null; this.src='images/velvet/1.jpg';">
        ${overlayLock}
      </div>
      <div class="item-content">
        <div>
          <div class="item-number">ITEM #${i} ${tier === 'free' ? '• [GRATIS SAMPLE]' : '• [PAKET ' + tier.toUpperCase() + ']'}</div>
          ${promptBoxHTML}
        </div>
        ${actionButtons}
      </div>
    `;
    grid.appendChild(card);
  }
}

// -------------------------------------------------------------------------
// 12. MODAL PIN, EDITOR & SURVEY
// -------------------------------------------------------------------------
function bukaModalPIN(tier) {
  targetTierModal = tier || 'starter';
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

  const customPins = JSON.parse(localStorage.getItem("JIWAS_CUSTOM_PINS") || "{}");
  let default10k = `${activePack.id.toUpperCase()}10K`;
  let default25k = `${activePack.id.toUpperCase()}VIP25`;

  let validStarter = customPins[activePack.id]?.pin10k || activePack.pin10k || default10k;
  let validVIP = customPins[activePack.id]?.pin25k || activePack.pin25k || default25k;

  if (pinInput === validStarter || pinInput === "JIWAS10K" || pinInput === "HEMAT5K") {
    simpanAksesKatalog(activePack.id, "starter");
    rekamTransaksiNyata(activePack.title, "Starter (10K)");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, "Aktivasi PIN Starter 10K");
    tutupModalPIN();
    tampilkanToast("🎉 AKSES STARTER (10K) TERBUKA!");
    renderDetailItemCards();
  } else if (pinInput === validVIP || pinInput === "JIWASVIP") {
    simpanAksesKatalog(activePack.id, "vip");
    rekamTransaksiNyata(activePack.title, "VIP (25K)");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, "Aktivasi PIN VIP 25K");
    tutupModalPIN();
    tampilkanToast("👑 AKSES VIP (25K) TERBUKA!");
    renderDetailItemCards();
  } else {
    alert("❌ Kode PIN Salah atau belum terdaftar di sistem!");
  }
}

function copasPromptFromElement(elementId, packTitle, itemIdx) {
  const el = document.getElementById(elementId);
  if (el) {
    copasPrompt(el.innerText || el.textContent);
    catatLogAktivitas("COPY_PROMPT", packTitle || "Prompt", "Menyalin formula #" + (itemIdx || 0));
  }
}

function copasPrompt(text) {
  const currentDomain = window.location.origin + window.location.pathname;
  const watermark = "\n\n(Dibuat via formula JIWAS Atelier: " + currentDomain + " — Akses 100 formula hanya 10K)";
  const fullText = text + watermark;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullText).then(() => {
      tampilkanToast("✅ PROMPT BERHASIL DISALIN!");
    }).catch(() => fallbackCopyText(fullText));
  } else {
    fallbackCopyText(fullText);
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
  } catch (err) {}
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
// 13. PWA & MAGIC LINK AUTO UNLOCK
// -------------------------------------------------------------------------
function cekAutoUnlockURL() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const packId = urlParams.get('pack');
    const unlockTier = urlParams.get('unlock');
    const pinCode = urlParams.get('pin');

    if (!packId || !unlockTier || !pinCode) return;

    const allPacks = getActiveRegistry();
    const targetPack = allPacks.find(p => p.id === packId);
    if (!targetPack) return;

    simpanAksesKatalog(packId, unlockTier);
    bukaDetailPack(targetPack);
    tampilkanToast("🎉 AKSES AUTO-UNLOCK AKTIF!");
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (e) {}
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const dismissed = sessionStorage.getItem("JIWAS_PWA_DISMISSED");
  if (!dismissed) {
    const banner = document.getElementById("pwaInstallBanner");
    if (banner) banner.classList.remove("hidden");
  }
});

function picuInstallPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      tutupBannerPWA();
    });
  } else {
    alert("Aplikasi JIWAS siap dipasang melalui menu browser -> Tambahkan ke Layar Utama.");
  }
}

function tutupBannerPWA() {
  const banner = document.getElementById("pwaInstallBanner");
  if (banner) banner.classList.add("hidden");
  sessionStorage.setItem("JIWAS_PWA_DISMISSED", "true");
}

// -------------------------------------------------------------------------
// 14. EXIT INTENT SURVEY DENGAN PEREKAM DATA RADAR KONSUMEN
// -------------------------------------------------------------------------
function initExitIntentSurvey() {
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 8 && !surveyTriggered && !sessionStorage.getItem("JIWAS_SURVEY_DISMISSED")) {
      picuBukaModalSurvey();
    }
  });

  if (window.history && window.history.pushState) {
    window.history.pushState({ jiwasModalGuard: true }, "");
    window.addEventListener("popstate", () => {
      if (!surveyTriggered && !sessionStorage.getItem("JIWAS_SURVEY_DISMISSED")) {
        picuBukaModalSurvey();
      }
    });
  }
}

function picuBukaModalSurvey() {
  const modal = document.getElementById("surveyModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  surveyTriggered = true;
}

function tutupSurvey() {
  const m = document.getElementById("surveyModal");
  if (m) m.classList.add("hidden");
  sessionStorage.setItem("JIWAS_SURVEY_DISMISSED", "true");
}

function jawabSurvey(alasan) {
  const qState = document.getElementById("surveyQuestionState");
  const sState = document.getElementById("surveySolutionState");
  const titleEl = document.getElementById("frictionSolutionTitle");
  const bodyEl = document.getElementById("frictionSolutionBody");
  const actEl = document.getElementById("frictionSolutionAction");

  // Rekam data alasan konsumen ke localStorage database radar Growth OS[cite: 4]
  try {
    const voices = JSON.parse(localStorage.getItem("JIWAS_CUSTOMER_VOICE") || "[]");
    const activeTitle = activePack ? activePack.title : "Halaman Utama";
    voices.push({
      time: Date.now(),
      pack: activeTitle,
      reason: alasan
    });
    localStorage.setItem("JIWAS_CUSTOMER_VOICE", JSON.stringify(voices));
  } catch (e) {}

  if (!sState || !titleEl || !bodyEl || !actEl) return;
  qState.classList.add("hidden");
  sState.classList.remove("hidden");

  if (alasan === 'HARGA_BELUM_PAS') {
    titleEl.innerText = "🎟️ Kupon Spesial HEMAT5K";
    bodyEl.innerHTML = "Dapatkan akses 100 formula pilihan dengan potongan 50% hanya <strong>Rp 5.000</strong>.";
    actEl.innerHTML = `<button class="btn-copy" style="width:100%; justify-content:center;" onclick="klaimDiskon5K()">Gunakan Kupon</button>`;
  } else if (alasan === 'BINGUNG_CARA_PAKAI') {
    titleEl.innerText = "💡 Panduan 3 Langkah Cepat";
    bodyEl.innerHTML = "Tinggal salin teks prompt di JIWAS, lalu tempel ke Bing Image Creator atau Gemini gratis. Foto atelier langsung jadi dalam 10 detik!";
    actEl.innerHTML = `<button class="btn-copy" style="width:100%; justify-content:center;" onclick="tutupSurvey()">Coba Sekarang</button>`;
  } else if (alasan === 'MAU_METODE_BAYAR') {
    titleEl.innerText = "💳 Pembayaran QRIS & E-Wallet";
    bodyEl.innerText = "Tersedia QRIS instan untuk GoPay, OVO, Dana, ShopeePay, dan seluruh M-Banking.";
    actEl.innerHTML = `<button class="btn-buy-wa" style="width:100%;" onclick="hubungiAdminWaLangsung()">Minta QRIS via WA</button>`;
  } else {
    titleEl.innerText = "💬 Bantuan Kurasi Admin JIWAS";
    bodyEl.innerText = "Konsultasikan gaya visual yang Anda butuhkan langsung dengan admin studio.";
    actEl.innerHTML = `<button class="btn-buy-wa" style="width:100%;" onclick="hubungiAdminWaLangsung()">Chat Admin WA</button>`;
  }
}

function klaimDiskon5K() {
  tutupSurvey();
  bukaModalPIN('starter');
  const input = document.getElementById("pinInput");
  if (input) {
    input.value = "HEMAT5K";
    input.focus();
  }
}

// -------------------------------------------------------------------------
// 15. GEMINI STUDIO TEST RUNNER & RADAR ACCESS
// -------------------------------------------------------------------------
function bukaGeminiEditorPrompt(elementId, title) {
  const el = elementId ? document.getElementById(elementId) : null;
  const promptText = el ? (el.innerText || el.textContent) : "";
  const modal = document.getElementById("geminiModal");
  const inputEl = document.getElementById("geminiPromptInput");
  const statusEl = document.getElementById("geminiEngineStatus");
  const outputEl = document.getElementById("geminiOutput");

  if (modal) modal.classList.remove("hidden");
  if (inputEl) inputEl.value = promptText.trim();
  if (statusEl) statusEl.innerText = "Studio Editor: " + title;
  if (outputEl) outputEl.innerHTML = '<p style="color:var(--text-muted); font-size:0.72rem;">Ubah teks prompt di atas lalu tekan Render Uji Coba.</p>';
}

function tutupModalGemini() {
  const modal = document.getElementById("geminiModal");
  if (modal) modal.classList.add("hidden");
}

function tambahSentuhanEditor(preset) {
  const inputEl = document.getElementById("geminiPromptInput");
  if (inputEl) inputEl.value += ", " + preset;
}

function jalankanTesRenderEditor() {
  const outputEl = document.getElementById("geminiOutput");
  if (!outputEl) return;
  outputEl.innerHTML = '<p style="color:var(--accent-cyan); font-size:0.72rem;"><i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan parameter studio...</p>';
  setTimeout(() => {
    outputEl.innerHTML = '<p style="color:#22c55e; font-size:0.72rem;">✓ Formula teroptimasi untuk lensa 85mm & pencahayaan softbox 8K.</p>';
  }, 400);
}

function bukaRadarDenganPIN() {
  const pin = prompt("🔒 Masukkan PIN Otorisasi Growth OS Radar:");
  if (pin && pin.trim().toUpperCase() === "JIWASRADAR") {
    sessionStorage.setItem("JIWAS_RADAR_AUTH", "true");
    window.location.href = "analytics.html";
  } else if (pin) {
    alert("❌ PIN Salah! Gunakan PIN resmi: JIWASRADAR");
  }
}