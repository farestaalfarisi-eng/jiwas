// =========================================================================
// JIWAS - MASTER CONTROLLER & GROWTH OS ENGINE (Full Master Edition V5.3)
// Theme: Dark Luxury & Gold Atelier • Strict 9:16 Ratio & 1:1 Digital Store
// Core Brand: Family Atelier Collection Top Priority
// Dual-Vendor Digital Store Engine (Inca Store & Finshop) with 7D & 30D Variants
// Dual-Tier PIN Verification • Dynamic Script Injector • Family Formation Composer
// Curated & Designed for JIWAS Atelier by Sahabat Kaya
// =========================================================================

let activePack = null;
let targetTierModal = 'starter';
let extraFamilyMembers = [];
let currentAppliedFormationPrompt = "";
const loadedPromptScripts = new Set();

// -------------------------------------------------------------------------
// 1. REGISTRY UTAMA KATALOG ATELIER
// -------------------------------------------------------------------------
const DEFAULT_FALLBACK_KATALOG = [
  { id: "family-lux", folder: "family", title: "Luxury Family Collection", type: "foto", status: "live", rating: "5.0/5", sales: "200+ Terjual" },
  { id: "family02-lux", folder: "family02", title: "Luxury Family Collection Vol.02", type: "foto", status: "live", rating: "4.9/5", sales: "85+ Terjual" },
  { id: "family03-lux", folder: "family03", title: "Luxury Family Collection Vol.03", type: "foto", status: "live", rating: "4.8/5", sales: "70+ Terjual" },
  { id: "sekolah-yearbook", folder: "sekolah", title: "Yearbook & Formal Identity Studio", type: "foto", status: "live", rating: "5.0/5", sales: "Baru Rilis" },
  { id: "retouch-restoration", folder: "retouch", title: "ID Photo & Beauty Restoration", type: "foto", status: "live", rating: "4.9/5", sales: "Baru Rilis" },
  { id: "velvet-lux", folder: "velvet", title: "Luxury Royal Velvet Studio", type: "foto", status: "live", rating: "4.9/5", sales: "180+ Terjual" },
  { id: "hijab-lux", folder: "hijab", title: "Luxury Hijab Collection", type: "foto", status: "live", rating: "5.0/5", sales: "210+ Terjual" },
  { id: "couple-cinematic", folder: "couple", title: "Luxury Couple Cinematic", type: "foto", status: "live", rating: "4.8/5", sales: "95+ Terjual" },
  { id: "ceo-lux", folder: "ceo", title: "Luxury CEO & Corporate Executive", type: "foto", status: "live", rating: "4.9/5", sales: "140+ Terjual" },
  { id: "fantasi-gold", folder: "fantasi", title: "Luxury Fantasy Gold", type: "foto", status: "live", rating: "4.9/5", sales: "115+ Terjual" },
  { id: "makeup-glam", folder: "makeup", title: "Luxury Beauty & Makeover", type: "foto", status: "live", rating: "5.0/5", sales: "160+ Terjual" },
  { id: "lifestyle-lux", folder: "lifestyle", title: "Luxury Urban Lifestyle", type: "foto", status: "live", rating: "4.7/5", sales: "50+ Terjual" },
  { id: "video-cinematic", folder: "video", title: "Cinematic Motion Suite", type: "video", status: "live", rating: "5.0/5", sales: "220+ Terjual" },
  { id: "umkm-commercial", folder: "umkm", title: "Commercial UMKM & Product Studio", type: "foto", status: "live", rating: "5.0/5", sales: "Baru Rilis" }
];

function getActiveRegistry() {
  if (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY) && KATALOG_REGISTRY.length > 0) {
    return KATALOG_REGISTRY;
  }
  return DEFAULT_FALLBACK_KATALOG;
}

function getDatabaseAkun() {
  try {
    const customAi = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
    if (customAi) {
      const parsed = JSON.parse(customAi);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(item => item.aktif !== false);
      }
    }
  } catch (e) {
    console.warn("Gagal membaca produk custom:", e);
  }

  if (typeof DATABASE_AI_ACCOUNT !== "undefined" && Array.isArray(DATABASE_AI_ACCOUNT) && DATABASE_AI_ACCOUNT.length > 0) {
    return DATABASE_AI_ACCOUNT;
  }
  return [];
}

// -------------------------------------------------------------------------
// 2. SHOWCASE POOL SELECTION (12 Pasang / 24 Aset Foto)
// -------------------------------------------------------------------------
function getShowcasePool() {
  const titles = [
    "Luxury Royal Velvet Studio",
    "Luxury Hijab Chiaroscuro",
    "Luxury Couple Aesthetic",
    "Luxury Family Atelier",
    "Corporate Executive CEO",
    "Regal Gold Fantasy Portrait",
    "Luxury Beauty & Makeover",
    "Urban Lifestyle Aesthetic",
    "Old Money Aristocrat",
    "Cinematic Noir Studio",
    "Ethereal Editorial Vogue",
    "Masterpiece Fine Art 8K"
  ];

  let pool = [];
  for (let i = 1; i <= 24; i += 2) {
    const pairIndex = Math.floor(i / 2);
    pool.push({
      title: titles[pairIndex] || `Luxury Atelier Collection #${pairIndex + 1}`,
      before: `images/showcase/${i}.jpg`,
      after: `images/showcase/${i + 1}.jpg`
    });
  }
  return pool;
}

let SHOWCASE_DATA = [];
let currentShowcaseIndex = 0;
let showcaseTimer = null;
let userVisitCount = 1;
let userAffinity = {};
let surveyTriggered = false;
let deferredPrompt = null;

// -------------------------------------------------------------------------
// 3. INITIALIZATION APP
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  SHOWCASE_DATA = getShowcasePool();
  try { initVisitorAndAffinity(); } catch (e) {}
  try { initFomoPulseEngine(); } catch (e) {}
  try { initDecayingShowcase(); } catch (e) {}
  try { initLiveMarqueeTransactions(); } catch (e) {}
  try { initSocialProofPopups(); } catch (e) {}
  try { initExitIntentSurvey(); } catch (e) {}
  try { initPwaInstaller(); } catch (e) {}
  try { initInvisibleAdminDoorway(); } catch (e) {}

  sinkronkanKatalogOnline();
  sinkronkanStokIncaRealtime();

  renderHomeCategories();
  renderHomeDigitalAi();
  renderAtelierFeed();
  renderKatalogFoto();
  renderKatalogVideo();
  renderKatalogAkun();
  initGlobalClickListener();
  cekAutoUnlockURL();
}

// -------------------------------------------------------------------------
// 4. SINKRONISASI SERVER KATALOG & STOK LIVE
// -------------------------------------------------------------------------
async function sinkronkanKatalogOnline() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && Array.isArray(data.products) && data.products.length > 0) {
      localStorage.setItem("JIWAS_AI_PRODUCTS_OVERRIDE", JSON.stringify(data.products));
      renderHomeDigitalAi();
      renderKatalogAkun();
    }
  } catch (e) {
    // Mode offline / fallback bawaan
  }
}

async function sinkronkanStokIncaRealtime() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const LIVE_URL = isLocal ? "http://localhost:3001/api/live-stock" : "/api/live-stock";

  try {
    const res = await fetch(LIVE_URL);
    if (!res.ok) return;
    const result = await res.json();

    if (!result.success || !Array.isArray(result.products)) return;
    const currentList = getDatabaseAkun();

    result.products.forEach(remoteItem => {
      const localItem = currentList.find(item =>
        item.apiConfig && (
          String(item.apiConfig.productId).toLowerCase() === String(remoteItem.id || "").toLowerCase() ||
          String(item.nama).toLowerCase().includes(String(remoteItem.name || "").toLowerCase())
        )
      );

      if (localItem && remoteItem.variants && Array.isArray(remoteItem.variants)) {
        localItem.variants = remoteItem.variants.map(rv => {
          const cost = Number(rv.price || rv.cost || 0);
          return {
            name: rv.name,
            cost: cost,
            price: rv.selling_price || (cost > 10000 ? cost + 15000 : cost + 6000),
            stock: Number(rv.stock || 0),
            ready: Number(rv.stock || 0) > 0
          };
        });
      }
    });

    renderHomeDigitalAi();
    renderKatalogAkun();
  } catch (err) {
    // Tetap menggunakan basis data lokal tanpa crash
  }
}

// -------------------------------------------------------------------------
// 5. VISITOR, AFFINITY & DECAYING SHOWCASE
// -------------------------------------------------------------------------
function initVisitorAndAffinity() {
  try {
    const visits = parseInt(localStorage.getItem("JIWAS_VISIT_COUNT") || "0", 10) + 1;
    localStorage.setItem("JIWAS_VISIT_COUNT", visits.toString());
    userVisitCount = visits;
    userAffinity = JSON.parse(localStorage.getItem("JIWAS_USER_AFFINITY") || "{}");
  } catch (e) {
    userVisitCount = 1;
    userAffinity = {};
  }
}

function initDecayingShowcase() {
  const showcaseSec = document.querySelector(".showcase-section");
  const restoreBtn = document.getElementById("btnRestoreShowcase");
  const userDismissed = localStorage.getItem("JIWAS_SHOWCASE_MANUAL_HIDE") === "true";

  if ((userVisitCount > 3 || userDismissed) && showcaseSec) {
    showcaseSec.classList.add("hidden");
    if (restoreBtn) restoreBtn.classList.remove("hidden");
  } else {
    if (showcaseSec) showcaseSec.classList.remove("hidden");
    if (restoreBtn) restoreBtn.classList.add("hidden");
    initShowcaseAutoSlider();
  }
}

function pulihkanTampilanShowcase() {
  const showcaseSec = document.querySelector(".showcase-section");
  const restoreBtn = document.getElementById("btnRestoreShowcase");
  localStorage.removeItem("JIWAS_SHOWCASE_MANUAL_HIDE");
  if (showcaseSec) showcaseSec.classList.remove("hidden");
  if (restoreBtn) restoreBtn.classList.add("hidden");
  initShowcaseAutoSlider();
  tampilkanToast("Showcase Before & After ditampilkan kembali.");
}

function recordUserAffinity(categoryKey, scoreWeight) {
  try {
    if (!categoryKey) return;
    const weight = scoreWeight || 1;
    userAffinity[categoryKey] = (userAffinity[categoryKey] || 0) + weight;
    localStorage.setItem("JIWAS_USER_AFFINITY", JSON.stringify(userAffinity));
  } catch (e) {}
}

function catatLogAktivitas(eventType, targetName, detailText) {
  try {
    const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
    logs.push({ time: timeStr, type: eventType, target: targetName, detail: detailText || "" });
    if (logs.length > 200) logs.shift();
    localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
  } catch (e) {}
}

function initFomoPulseEngine() {
  const activeEl = document.getElementById("fomoActiveUsers");
  const transEl = document.getElementById("fomoTransUsers");
  const viewsEl = document.getElementById("fomoViewsCount");
  const slotEl = document.getElementById("fomoSlotCount");

  let baseViews = parseInt(localStorage.getItem("JIWAS_ACC_VIEWS") || "1420", 10);
  baseViews += Math.floor(Math.random() * 2) + 1;
  localStorage.setItem("JIWAS_ACC_VIEWS", baseViews.toString());
  if (viewsEl) viewsEl.innerText = (baseViews >= 1000 ? (baseViews / 1000).toFixed(1) + "k+" : baseViews);

  if (activeEl) activeEl.innerText = 32 + Math.floor(Math.random() * 10);
  if (transEl) transEl.innerText = 2 + Math.floor(Math.random() * 3);
  if (slotEl) slotEl.innerText = "7";
}

function initSocialProofPopups() {
  const toast = document.getElementById("liveBuyerToast");
  const nameEl = document.getElementById("buyerToastUser");
  const descEl = document.getElementById("buyerToastDesc");
  if (!toast || !nameEl || !descEl) return;

  const daftarNama = ["Kak Rina (Surabaya)", "Bunda Dewi (Jakarta)", "Kak Dimas (Bandung)", "Pak Hendra (Medan)", "Kak Maya (Yogyakarta)"];
  const daftarAksi = ["Baru saja membuka PIN VIP 25K", "Membeli PIN Starter 10K", "Mengaktifkan CapCut Pro 30 Hari", "Membeli Canva Pro 7 Hari"];

  setInterval(() => {
    nameEl.innerText = daftarNama[Math.floor(Math.random() * daftarNama.length)];
    descEl.innerText = daftarAksi[Math.floor(Math.random() * daftarAksi.length)];
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 4000);
  }, 25000);
}

function initGlobalClickListener() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".card-menu-container")) {
      document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
    }
  });
}

function initLiveMarqueeTransactions() {
  const counterEl = document.getElementById("salesCounterText");
  const currentSales = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10);
  if (counterEl) counterEl.innerText = currentSales.toLocaleString('id-ID') + "+";
}

// -------------------------------------------------------------------------
// 6. WHATSAPP & ORDER ROUTING
// -------------------------------------------------------------------------
function getAdminWhatsAppNumber() {
  return localStorage.getItem("JIWAS_CUSTOM_WA") || 
         (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6285181780429");
}

function kirimPesananLangsungWA(packTitle, tierName, hargaTeks) {
  catatLogAktivitas("CLICK_WA", packTitle, `Order ${tierName} (${hargaTeks})`);
  const waNumber = getAdminWhatsAppNumber();
  const pesan = `Halo Admin JIWAS,%0A%0ASaya ingin memesan *PIN Akses ${tierName} (${hargaTeks})* untuk katalog *${packTitle}*.%0A%0AMohon petunjuk pembayarannya.`;
  window.open("https://wa.me/" + waNumber + "?text=" + pesan, "_blank");
}

function hubungiAdminWaLangsung() {
  catatLogAktivitas("CLICK_WA", "Bantuan Umum", "Konsultasi Formula");
  const waNumber = getAdminWhatsAppNumber();
  const pesan = "Halo Admin JIWAS, saya ingin bertanya tentang formula studio foto, video AI, atau akun digital premium.";
  window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesan), "_blank");
}

function bagikanKoleksiKeWA(packTitle) {
  const currentDomain = window.location.origin + window.location.pathname;
  const teksPesan = "Cek formula kreatif *" + packTitle + "* di JIWAS: " + currentDomain;
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(teksPesan), "_blank");
}

// -------------------------------------------------------------------------
// 7. SHOWCASE BEFORE & AFTER SLIDER
// -------------------------------------------------------------------------
function initShowcaseAutoSlider() {
  renderShowcaseCards();
  if (showcaseTimer) clearInterval(showcaseTimer);
  showcaseTimer = setInterval(nextShowcaseSlide, 10000);
}

function renderShowcaseCards() {
  const container = document.getElementById("gridShowcaseBA");
  const dotsContainer = document.getElementById("showcaseDots");
  if (!container || SHOWCASE_DATA.length === 0) return;
  container.innerHTML = "";
  if (dotsContainer) dotsContainer.innerHTML = "";

  SHOWCASE_DATA.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = `ba-card-unit ${idx === currentShowcaseIndex ? "active" : ""}`;
    card.innerHTML = `
      <div class="ba-dual-image-box">
        <div class="ba-half-view">
          <img src="${item.before}" alt="Before" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
          <span class="badge-tag-side tag-before">BEFORE</span>
        </div>
        <div class="ba-half-view">
          <img src="${item.after}" alt="After" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
          <span class="badge-tag-side tag-after">AFTER 8K</span>
        </div>
      </div>
      <div class="ba-card-footer">
        <span>${item.title}</span>
        <span style="color:#22c55e; font-weight:700;">✓ 8K ATELIER</span>
      </div>
    `;
    container.appendChild(card);

    if (dotsContainer) {
      const dot = document.createElement("span");
      dot.className = `dot-indicator ${idx === currentShowcaseIndex ? "active" : ""}`;
      dot.onclick = () => lompatKeShowcaseSlide(idx);
      dotsContainer.appendChild(dot);
    }
  });
}

function nextShowcaseSlide() {
  if (SHOWCASE_DATA.length === 0) return;
  currentShowcaseIndex = (currentShowcaseIndex + 1) % SHOWCASE_DATA.length;
  renderShowcaseCards();
}

function prevShowcaseSlide() {
  if (SHOWCASE_DATA.length === 0) return;
  currentShowcaseIndex = (currentShowcaseIndex - 1 + SHOWCASE_DATA.length) % SHOWCASE_DATA.length;
  renderShowcaseCards();
}

function lompatKeShowcaseSlide(idx) {
  currentShowcaseIndex = idx;
  renderShowcaseCards();
}

// -------------------------------------------------------------------------
// 8. ATELIER FEED & TABS CONTROLLER
// -------------------------------------------------------------------------
function renderAtelierFeed() {
  const container = document.getElementById("gridAtelierFeed");
  if (!container) return;
  const allPacks = getActiveRegistry().filter(item => item.status === "live" && item.type !== "digital");
  container.innerHTML = "";

  allPacks.forEach(pack => {
    const isVideo = pack.type === "video";
    const isProduct = pack.type === "product";

    for (let idx = 1; idx <= 4; idx++) {
      const card = document.createElement("div");
      card.className = "pin-item";

      let subLabel = `Item #${idx} • Buka 100 Prompt`;
      if (isVideo) subLabel = `Item #${idx} • Buka 30 Video`;
      if (isProduct) subLabel = `Item #${idx} • Buka 30 Produk`;

      const freeBadge = (idx <= 3) ? `<span class="pin-badge-free-elegant">SAMPLE GRATIS</span>` : '';

      let mediaElementHTML = "";
      if (isVideo) {
        mediaElementHTML = `
          <video 
            src="videos/${pack.folder}/${idx}.mp4" 
            class="aspect-9-16" 
            autoplay loop muted playsinline 
            style="width:100%; object-fit:cover; display:block;"
            onloadeddata="this.classList.add('img-loaded')"
          ></video>
        `;
      } else {
        let srcImg = `images/${pack.folder}/${idx}.jpg`;
        mediaElementHTML = `
          <img src="${srcImg}" alt="${pack.title}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
        `;
      }

      card.innerHTML = `
        ${freeBadge}
        ${mediaElementHTML}
        <div class="pin-info-overlay">
          <div class="pin-title">${pack.title}</div>
          <div class="pin-sub">${subLabel}</div>
        </div>
      `;
      card.onclick = () => bukaDetailPack(pack);
      container.appendChild(card);
    }
  });
}

function switchMainTab(tabType, btnEl) {
  document.querySelectorAll(".b-nav-item").forEach(b => b.classList.remove("active"));
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    const map = { atelier: 'tabBtnAtelier', foto: 'tabBtnFoto', video: 'tabBtnVideo', akun: 'tabBtnAkun' };
    const targetBtn = document.getElementById(map[tabType]);
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
    if (heroHeader) heroHeader.classList.remove("hidden");
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

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------------------------------------------------------
// 9. ETALASE DISPLAY: FOTO, VIDEO & DUAL-VARIANT AI STORE
// -------------------------------------------------------------------------
function renderHomeCategories() {
  const container = document.getElementById("gridHomeCategories");
  if (!container) return;
  container.innerHTML = "";

  const studioPacks = getActiveRegistry().filter(item => item.type !== "digital" && item.status === "live");
  studioPacks.forEach(item => {
    let badgeText = '📸 100 PROMPT';
    let mediaDisplayHTML = "";

    if (item.type === 'video') {
      badgeText = '🎥 VIDEO AI (30)';
      mediaDisplayHTML = `
        <video 
          src="videos/${item.folder}/1.mp4" 
          class="aspect-9-16" 
          autoplay loop muted playsinline 
          style="width:100%; object-fit:cover; display:block;"
          onloadeddata="this.classList.add('img-loaded')"
        ></video>
      `;
    } else {
      let coverSrc = item.coverUrl || `images/${item.folder}/cover.jpg`;
      mediaDisplayHTML = `
        <img src="${coverSrc}" alt="${item.title}" class="aspect-9-16" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      `;
    }

    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(item);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill">${badgeText}</span>
        ${mediaDisplayHTML}
      </div>
      <div class="card-info">
        <h3 class="card-title">${item.title}</h3>
        <div class="card-rating-badge">★ ${item.rating || '4.9/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat Koleksi</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderHomeDigitalAi() {
  const container = document.getElementById("gridHomeDigitalAi");
  if (!container) return;
  container.innerHTML = "";

  const accounts = getDatabaseAkun();
  const featured = accounts.slice(0, 4);

  featured.forEach(acc => {
    const card = document.createElement("div");
    card.className = "catalog-card card-square-ai";

    const imgSrc = acc.logo || acc.cover || `images/canvas/${acc.id || 'canva'}.jpg`;
    
    // Pastikan varian selalu ada walau tidak didefinisikan eksplisit di objek
    let vList = (acc.variants && acc.variants.length > 0) ? acc.variants : [
      { name: "7 Hari", price: acc.hargaPromo || 7000, ready: true },
      { name: "30 Hari", price: acc.harga || 15000, ready: true }
    ];

    let variantButtonsHTML = `
      <div style="display:flex; gap:6px; margin:8px 0;">
        ${vList.map((v, i) => {
          const isOutOfStock = (v.ready === false) || (v.stock !== undefined && Number(v.stock) <= 0) || (acc.stok !== undefined && Number(acc.stok) <= 0);
          
          if (isOutOfStock) {
            return `
              <button class="btn-quick-copy btn-out-of-stock" disabled style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem;">
                ${v.name}<br><strong style="color:var(--accent-red);">Habis</strong>
              </button>
            `;
          }
          return `
            <button class="btn-quick-copy" style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem; ${i === 0 ? 'border-color:#38bdf8; color:#38bdf8;' : 'border-color:var(--gold-primary); color:var(--gold-light);'}" 
              onclick="eksekusiOrderAkun('${acc.id}', '${v.name}')">
              ${v.name}<br><strong>Rp${Number(v.price || acc.hargaPromo || 0).toLocaleString('id-ID')}</strong>
            </button>
          `;
        }).join("")}
      </div>
    `;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${acc.badge || '⚡ AUTO BOT'}</span>
        <img src="${imgSrc}" alt="${acc.nama}" class="aspect-1-1" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <div>
          <h3 class="card-title">${acc.nama}</h3>
          <div class="card-rating-badge" style="color:#22c55e;"><i class="fa-solid fa-bolt"></i> Siap Pakai Instan</div>
          ${variantButtonsHTML}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogFoto() {
  const container = document.getElementById("gridFotoKatalog");
  if (!container) return;
  container.innerHTML = "";
  const list = getActiveRegistry().filter(item => item.type === "foto" && item.status === "live");

  list.forEach(pack => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    const coverSrc = pack.coverUrl || `images/${pack.folder}/cover.jpg`;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-foto">📸 100 ITEMS</span>
        <img src="${coverSrc}" alt="${pack.title}" class="aspect-9-16" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '4.9/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka 100 Prompt</button>
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

  list.forEach(pack => {
    const videoSrc = `videos/${pack.folder}/1.mp4`;
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-video">🎥 VIDEO SUITE (30)</span>
        <video 
          src="${videoSrc}" 
          class="aspect-9-16" 
          autoplay loop muted playsinline 
          style="width:100%; object-fit:cover; display:block;"
          onloadeddata="this.classList.add('img-loaded')"
        ></video>
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '5.0/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka 30 Video Formula</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogAkun() {
  const container = document.getElementById("aiAccountCatalogGrid") || document.getElementById("gridAkunKatalog") || document.getElementById("gridAkunAI");
  if (!container) return;
  container.innerHTML = "";

  const accounts = getDatabaseAkun();

  if (accounts.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">Belum ada akun AI yang aktif di katalog.</div>';
    return;
  }

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "catalog-card card-square-ai";

    const imgSrc = acc.logo || acc.cover || `images/canvas/${acc.id || 'canva'}.jpg`;
    
    // Fallback varian jika kosong
    let vList = (acc.variants && acc.variants.length > 0) ? acc.variants : [
      { name: "7 Hari", price: acc.hargaPromo || 7000, ready: true },
      { name: "30 Hari", price: acc.harga || 15000, ready: true }
    ];

    let variantButtonsHTML = `
      <div style="display:flex; gap:6px; margin:8px 0;">
        ${vList.map((v, i) => {
          const isOutOfStock = (v.ready === false) || (v.stock !== undefined && Number(v.stock) <= 0) || (acc.stok !== undefined && Number(acc.stok) <= 0);
          
          if (isOutOfStock) {
            return `
              <button class="btn-quick-copy btn-out-of-stock" disabled style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem;">
                ${v.name}<br><strong style="color:var(--accent-red);">Habis</strong>
              </button>
            `;
          }
          return `
            <button class="btn-quick-copy" style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem; ${i === 0 ? 'border-color:#38bdf8; color:#38bdf8;' : 'border-color:var(--gold-primary); color:var(--gold-light);'}" 
              onclick="eksekusiOrderAkun('${acc.id}', '${v.name}')">
              ${v.name}<br><strong>Rp${Number(v.price || acc.hargaPromo || 0).toLocaleString('id-ID')}</strong>
            </button>
          `;
        }).join("")}
      </div>
    `;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${acc.badge || '⚡ RESMI'}</span>
        <img src="${imgSrc}" alt="${acc.nama}" class="aspect-1-1" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <div>
          <h3 class="card-title">${acc.nama}</h3>
          <div class="card-rating-badge" style="color:#38bdf8;"><i class="fa-solid fa-check-circle"></i> Ready Stok</div>
          <div style="font-size:0.75rem; color:#9ca3af; margin:4px 0; line-height:1.3;">${acc.deskripsi || ''}</div>
        </div>
        ${variantButtonsHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

function eksekusiOrderAkun(productId, variantName) {
  if (typeof SupplierConnector !== "undefined" && typeof SupplierConnector.orderAkunAuto === "function") {
    SupplierConnector.orderAkunAuto(productId, variantName, 1);
  } else {
    const list = getDatabaseAkun();
    const target = list.find(p => String(p.id) === String(productId));
    const pName = target ? target.nama : "Akun AI";
    kirimPesananLangsungWA(pName, variantName, "Menyesuaikan Varian");
  }
}

// -------------------------------------------------------------------------
// 10. DETAIL PACK & DYNAMIC PROMPT SCRIPT INJECTOR
// -------------------------------------------------------------------------
function isFamilyCatalog(pack) {
  if (!pack) return false;
  const s = (pack.id + " " + pack.title + " " + pack.folder).toLowerCase();
  return s.includes("fam");
}

function loadPackPromptScript(pack, callback) {
  if (!pack) { if (callback) callback(); return; }

  const cleanFolder = pack.folder.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  const varName = pack.promptVarName || `PROMPTS_${cleanFolder}`;
  
  if (window[varName] && Array.isArray(window[varName])) {
    if (callback) callback();
    return;
  }

  let scriptUrl = pack.scriptUrl || `prompts/${pack.folder}.js`;
  const scriptId = `script_prompt_${pack.id}`;
  if (document.getElementById(scriptId)) {
    if (callback) callback();
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = scriptUrl;
  script.onload = () => {
    loadedPromptScripts.add(pack.id);
    if (callback) callback();
  };
  script.onerror = () => {
    if (callback) callback();
  };
  document.body.appendChild(script);
}

function bukaDetailPack(pack) {
  activePack = pack;
  recordUserAffinity(pack.folder || pack.id, 3);
  catatLogAktivitas("VIEW_PACK", pack.title, `Tipe: ${pack.type}`);

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

  const isThirtyBundle = (pack.type === 'video');
  const totalCount = isThirtyBundle ? 30 : 100;

  const titleEl = document.getElementById("detailTitle");
  const summaryEl = document.getElementById("packSummaryTitle");
  if (titleEl) titleEl.innerText = pack.title;
  if (summaryEl) {
    summaryEl.innerHTML = `${pack.title} (${totalCount} Formula)<div class="detail-live-counter"><i class="fa-solid fa-fire" style="color:#f59e0b;"></i> ${pack.sales || '150+ Terjual'}</div>`;
  }

  const pabContainer = document.querySelector(".pack-action-box .pab-buttons");
  if (pabContainer) {
    const isUnlockedVIP = cekAksesKatalog(pack.id, "vip");
    const zipBtn = (isThirtyBundle && isUnlockedVIP)
      ? `<a href="downloads/${pack.folder}-bundle.zip" download class="btn-buy-wa" style="background:#22c55e; color:#000; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:6px;"><i class="fa-solid fa-download"></i> Unduh Modul ZIP</a>`
      : '';

    pabContainer.innerHTML = `
      <button onclick="bukaModalCheckout('${pack.title}', 'Starter 10K', 'Rp10.000')" class="btn-buy-wa">Beli Starter (10K)</button>
      <button onclick="bukaModalCheckout('${pack.title}', 'VIP 25K', 'Rp25.000')" class="btn-buy-wa" style="background:var(--gold-gradient); color:#000;">Beli VIP (25K)</button>
      <button class="btn-enter-pin-main" onclick="bukaModalPIN('vip')">Masukkan PIN</button>
      ${zipBtn}
    `;
  }

  const composerBox = document.getElementById("familyFormationComposer");
  if (composerBox) {
    composerBox.style.display = isFamilyCatalog(pack) ? "block" : "none";
    if (isFamilyCatalog(pack)) updatePromptFormasi();
  }

  const grid = document.getElementById("itemsGrid");
  if (grid) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--gold-light);"><i class="fa-solid fa-spinner fa-spin"></i> Menyiapkan galeri formula...</div>';
  }

  loadPackPromptScript(pack, () => {
    renderDetailItemCards();
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function kembaliKeKatalog() {
  const secDetail = document.getElementById("sectionDetailPack");
  if (secDetail) secDetail.classList.add("hidden");
  switchMainTab('atelier', document.getElementById('tabBtnAtelier'));
}

// -------------------------------------------------------------------------
// 11. DUAL-TIER PIN ACCESS SYSTEM
// -------------------------------------------------------------------------
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

  const isVideo = activePack.type === 'video';
  const totalItems = isVideo ? 30 : 100;

  const cleanFolder = activePack.folder.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  const varName = activePack.promptVarName || `PROMPTS_${cleanFolder}`;
  const promptArray = (window[varName] && Array.isArray(window[varName])) ? window[varName] : null;

  for (let i = 1; i <= totalItems; i++) {
    const card = document.createElement("div");
    card.className = "item-card";

    let mediaHTML = "";
    if (isVideo) {
      mediaHTML = `
        <video 
          src="videos/${activePack.folder}/${i}.mp4" 
          autoplay loop muted playsinline 
          style="width:100%; height:100%; object-fit:cover; display:block;"
          onloadeddata="this.classList.add('img-loaded')"
        ></video>
      `;
    } else {
      let imgSrc = `images/${activePack.folder}/${i}.jpg`;
      mediaHTML = `
        <img src="${imgSrc}" loading="lazy" alt="Item ${i}" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      `;
    }

    let promptText = "";
    if (promptArray && promptArray[i - 1]) {
      const raw = promptArray[i - 1];
      promptText = (typeof raw === "object") ? (raw.rawPrompt || raw.prompt || "") : String(raw);
    }

    if (!promptText) {
      if (isVideo) {
        promptText = `Cinematic video sequence of ${activePack.title}, item #${i}. Camera slow continuous push-in dolly shot, ARRI Alexa LF, 50mm anamorphic lens, vertical 9:16 layout.`;
      } else {
        promptText = `A high-end luxury portrait of ${activePack.title}, item #${i}, 8k studio lighting, master quality --ar 9:16. Subtle watermark "JIWAS".`;
      }
    }

    if (isFamilyCatalog(activePack) && currentAppliedFormationPrompt) {
      promptText = currentAppliedFormationPrompt + " " + promptText;
    }

    let tier = "free";
    let isLocked = false;

    if (isVideo) {
      if (i <= 3) {
        tier = "free";
      } else if (i <= 20) {
        tier = "starter";
        isLocked = !cekAksesKatalog(activePack.id, "starter");
      } else {
        tier = "vip";
        isLocked = !cekAksesKatalog(activePack.id, "vip");
      }
    } else {
      if (i <= 3) {
        tier = "free";
      } else if (i <= 23) {
        tier = "starter";
        isLocked = !cekAksesKatalog(activePack.id, "starter");
      } else {
        tier = "vip";
        isLocked = !cekAksesKatalog(activePack.id, "vip");
      }
    }

    const promptBoxHTML = !isLocked 
      ? `<div class="prompt-text-box" id="promptText_${i}">${promptText}</div>`
      : `<div class="prompt-text-box prompt-locked-text">🔒 Formula prompt dikunci. Masukkan PIN ${tier.toUpperCase()} (${tier === 'starter' ? '10K' : '25K'}) untuk membuka teks formula ini.</div>`;

    let directBtnText = isVideo ? "🚀 Video AI" : "🚀 Bing";
    let directUrl = isVideo ? "https://runwayml.com/" : "https://www.bing.com/images/create";

    const actionButtons = !isLocked 
      ? `
        <div class="action-buttons">
          <button class="btn-copy" onclick="copasPromptFromElement('promptText_${i}', '${activePack.title}', ${i})">📋 Salin Formula</button>
          <button class="btn-share-promo" onclick="bagikanKoleksiKeWA('${activePack.title}')"><i class="fa-brands fa-whatsapp"></i> Bagikan</button>
          <a href="${directUrl}" target="_blank" class="btn-direct-ai">${directBtnText}</a>
        </div>`
      : `
        <div class="action-buttons">
          <button class="btn-copy" style="background:var(--gold-gradient); color:#000; font-weight:800; flex:1;" onclick="bukaModalPIN('${tier}')">
            🔑 Masukkan PIN ${tier === 'starter' ? '10K' : '25K'}
          </button>
          <button onclick="bukaModalCheckout('${activePack.title}', 'Paket ${tier.toUpperCase()}', 'Rp${tier === 'starter' ? '10.000' : '25.000'}')" class="btn-unlock-wa" style="flex:1;">
            Beli via WA
          </button>
        </div>`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="badge-pill" style="top:8px; left:8px; font-size:0.62rem;">${tier === 'free' ? 'GRATIS SAMPLE' : 'PAKET ' + tier.toUpperCase()}</span>
        ${mediaHTML}
      </div>
      <div class="item-content">
        <div>
          <div class="item-number">ITEM #${i} • ${activePack.title}</div>
          ${promptBoxHTML}
        </div>
        ${actionButtons}
      </div>
    `;
    grid.appendChild(card);
  }
}

// -------------------------------------------------------------------------
// 12. MODAL INPUT & VERIFIKASI PIN
// -------------------------------------------------------------------------
function bukaModalPIN(tier) {
  targetTierModal = tier || 'starter';
  const modal = document.getElementById("pinModal");
  if (modal) {
    modal.classList.remove("hidden");
    const input = document.getElementById("pinInput");
    if (input) { input.value = ""; input.focus(); }
  }
}

function tutupModalPIN() {
  const modal = document.getElementById("pinModal");
  if (modal) modal.classList.add("hidden");
}

function verifikasiPIN() {
  const pinInput = document.getElementById("pinInput").value.trim().toUpperCase();
  if (!activePack) return;

  const default10k = `${activePack.id.toUpperCase()}10K`;
  const default25k = `${activePack.id.toUpperCase()}VIP25`;

  let validStarter = default10k;
  let validVIP = default25k;

  if (typeof LIST_PIN_KATALOG !== "undefined" && LIST_PIN_KATALOG[activePack.id]) {
    validStarter = LIST_PIN_KATALOG[activePack.id].pin10k || default10k;
    validVIP = LIST_PIN_KATALOG[activePack.id].pin25k || default25k;
  }

  if (pinInput === validStarter || pinInput === "JIWAS10K" || pinInput === "HEMAT5K") {
    simpanAksesKatalog(activePack.id, "starter");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, "Starter (10K)");
    tutupModalPIN();
    tampilkanToast("🎉 AKSES STARTER (10K) TERBUKA!");
    renderDetailItemCards();
  } else if (pinInput === validVIP || pinInput === "JIWASVIP") {
    simpanAksesKatalog(activePack.id, "vip");
    catatLogAktivitas("PIN_SUCCESS", activePack.title, "VIP Full (25K)");
    tutupModalPIN();
    tampilkanToast("👑 AKSES VIP (25K) TERBUKA!");
    renderDetailItemCards();
  } else {
    alert("❌ Kode PIN Salah! Masukkan PIN resmi yang Anda peroleh.");
  }
}

function copasPromptFromElement(elementId, packTitle, itemIdx) {
  const el = document.getElementById(elementId);
  if (el) {
    const text = el.innerText || el.textContent;
    copasPrompt(text);
    catatLogAktivitas("COPY_PROMPT", packTitle, `Item #${itemIdx}`);
  }
}

function copasPrompt(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => tampilkanToast("✅ FORMULA DISALIN!"));
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    tampilkanToast("✅ FORMULA DISALIN!");
  }
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
// 13. URL AUTO-UNLOCK & RADAR COMMAND DOORWAY (TERLINDUNGI)
// -------------------------------------------------------------------------
function cekAutoUnlockURL() {
  const params = new URLSearchParams(window.location.search);
  const packParam = params.get("pack");
  const unlockParam = params.get("unlock");

  if (packParam && unlockParam) {
    const allPacks = getActiveRegistry();
    const target = allPacks.find(p => p.id === packParam);
    if (target) {
      if (unlockParam === 'starter' || unlockParam === 'vip') {
        simpanAksesKatalog(target.id, unlockParam);
        bukaDetailPack(target);
        tampilkanToast(`🔓 Akses ${unlockParam.toUpperCase()} aktif!`);
      }
    }
  }
}

function bukaRadarDenganPIN() {
  const input = prompt("Masukkan Kunci Otorisasi Command Center:");
  if (!input) return;
  
  if (input.trim().toUpperCase() === "JIWASVIP" || input.trim() === "ATELIER2026") {
    sessionStorage.setItem("JIWAS_RADAR_AUTH", "true");
    window.location.href = "analytics.html";
  } else {
    alert("❌ Otorisasi Ditolak.");
  }
}

function initInvisibleAdminDoorway() {
  const brandTitle = document.querySelector(".brand-title-gold");
  if (!brandTitle) return;

  let clickCount = 0;
  let clickTimer = null;

  brandTitle.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => { clickCount = 0; }, 700);
    } else if (clickCount === 3) {
      clearTimeout(clickTimer);
      clickCount = 0;
      bukaRadarDenganPIN();
    }
  });

  let pressTimer = null;
  brandTitle.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      bukaRadarDenganPIN();
    }, 1500);
  }, { passive: true });

  brandTitle.addEventListener("touchend", () => {
    if (pressTimer) clearTimeout(pressTimer);
  });
}

// -------------------------------------------------------------------------
// 14. FAMILY FORMATION COMPOSER
// -------------------------------------------------------------------------
function updatePromptFormasi() {
  const father = document.getElementById("fatherBuild")?.value || "medium build";
  const mother = document.getElementById("motherBuild")?.value || "slender graceful build";

  let parts = [
    `The father has a ${father}, wearing an elegant tailored studio suit.`,
    `The mother has a ${mother}, wearing an exquisite matching gown.`
  ];

  extraFamilyMembers.forEach(mem => {
    if (mem.type === 'anak') {
      parts.push(`Include ${mem.gender}, around ${mem.age} old, ${mem.height}, with a ${mem.build}, standing or seated harmoniously with the parents.`);
    } else {
      parts.push(`Include ${mem.role} with a ${mem.build}, seated or standing gracefully in the family formation.`);
    }
  });

  const finalString = parts.join(" ");
  const outBox = document.getElementById("familyPromptOutput");
  if (outBox) outBox.innerText = finalString;
  return finalString;
}

function resetFormasiKeluarga() {
  extraFamilyMembers = [];
  const container = document.getElementById("dynamicMembersContainer");
  if (container) container.innerHTML = "";
  currentAppliedFormationPrompt = "";
  updatePromptFormasi();
  if (activePack) renderDetailItemCards();
  tampilkanToast("Formasi keluarga direset.");
}

function tambahAnggota(tipe) {
  const container = document.getElementById("dynamicMembersContainer");
  if (!container) return;

  const memberIndex = extraFamilyMembers.length;

  if (tipe === 'anak') {
    const childObj = {
      type: 'anak',
      gender: 'a young boy',
      age: '5-7 years old',
      height: 'waist-height of parents',
      build: 'slender healthy posture'
    };
    extraFamilyMembers.push(childObj);

    const div = document.createElement("div");
    div.className = "member-row member-child-row";
    div.id = `memberRow_${memberIndex}`;
    div.style.cssText = "display:flex; gap:6px; flex-wrap:wrap; align-items:center; background:#0e0e15; padding:8px; border-radius:6px; border:1px solid rgba(212,175,55,0.15); margin-bottom:6px;";

    div.innerHTML = `
      <span class="member-label" style="min-width:70px;"><i class="fa-solid fa-child"></i> Anak:</span>
      
      <select class="select-composer" onchange="updateMemberChild(${memberIndex}, 'gender', this.value)">
        <option value="a young boy">Anak Laki-laki</option>
        <option value="a young girl">Anak Perempuan</option>
        <option value="a baby boy">Bayi Laki-laki</option>
        <option value="a baby girl">Bayi Perempuan</option>
        <option value="a teenage boy">Remaja Laki-laki</option>
        <option value="a teenage girl">Remaja Perempuan</option>
      </select>

      <select class="select-composer" onchange="updateMemberChild(${memberIndex}, 'age', this.value)">
        <option value="6 months old (in arms)">6 Bulan (Digendong)</option>
        <option value="1-2 years old (toddler)">1–2 Tahun (Balita)</option>
        <option value="3-4 years old">3–4 Tahun</option>
        <option value="5-7 years old" selected>5–7 Tahun</option>
        <option value="8-10 years old">8–10 Tahun</option>
        <option value="11-13 years old">11–13 Tahun</option>
        <option value="14-17 years old">14–17 Tahun (Remaja)</option>
      </select>

      <select class="select-composer" onchange="updateMemberChild(${memberIndex}, 'height', this.value)">
        <option value="held gently in mother's arms">Digendong Ibu/Ayah</option>
        <option value="knee-height of parents">Setinggi Lutut Orang Tua</option>
        <option value="waist-height of parents" selected>Setinggi Pinggang</option>
        <option value="chest-height of parents">Setinggi Dada</option>
        <option value="shoulder-height of parents">Hampir Setinggi Bahu</option>
      </select>

      <select class="select-composer" onchange="updateMemberChild(${memberIndex}, 'build', this.value)">
        <option value="slender healthy posture" selected>Ramping Sehat</option>
        <option value="chubby adorable cheeks and build">Gembul / Berisi Lucu</option>
        <option value="average cute proportion">Sedang / Proporsional</option>
        <option value="tall slender athletic build">Jangkung Ramping</option>
        <option value="sturdy chubby build">Gempal Kuat</option>
      </select>
    `;
    container.appendChild(div);
  } else {
    let roleText = "the grandfather";
    if (tipe === 'nenek') roleText = "the grandmother";
    if (tipe === 'lainnya') roleText = "an extended relative";

    extraFamilyMembers.push({ type: tipe, role: roleText, build: "noble elderly posture" });

    const div = document.createElement("div");
    div.className = "member-row";
    div.innerHTML = `
      <span class="member-label"><i class="fa-solid fa-user-plus"></i> ${roleText}:</span>
      <select class="select-composer" onchange="extraFamilyMembers[${memberIndex}].build = this.value; updatePromptFormasi();">
        <option value="noble elderly posture">Bersahaja & Berwibawa (Lansia)</option>
        <option value="slender graceful posture">Postur Ramping</option>
        <option value="medium build">Postur Sedang</option>
        <option value="sturdy dignified build">Gempal Berwibawa</option>
      </select>
    `;
    container.appendChild(div);
  }

  updatePromptFormasi();
}

function updateMemberChild(index, field, value) {
  if (extraFamilyMembers[index]) {
    extraFamilyMembers[index][field] = value;
    updatePromptFormasi();
  }
}

function salinPromptFormasi() {
  const text = updatePromptFormasi();
  copasPrompt(text);
}

function terapkanKeSemuaPromptKeluarga() {
  currentAppliedFormationPrompt = updatePromptFormasi();
  if (activePack) renderDetailItemCards();
  tampilkanToast("✨ Formasi disisipkan ke seluruh kartu!");
}

// -------------------------------------------------------------------------
// 15. EXIT-INTENT SURVEY & PWA INSTALLER
// -------------------------------------------------------------------------
function initExitIntentSurvey() {
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 && !surveyTriggered) {
      const modal = document.getElementById("surveyModal");
      if (modal) {
        modal.classList.remove("hidden");
        surveyTriggered = true;
      }
    }
  });
}

function tutupSurvey() {
  const modal = document.getElementById("surveyModal");
  if (modal) modal.classList.add("hidden");
}

function jawabSurvey(reasonCode) {
  const voices = JSON.parse(localStorage.getItem("JIWAS_CUSTOMER_VOICE") || "[]");
  voices.push({ time: new Date().toISOString(), pack: activePack ? activePack.title : "Beranda", reason: reasonCode });
  localStorage.setItem("JIWAS_CUSTOMER_VOICE", JSON.stringify(voices));

  const qState = document.getElementById("surveyQuestionState");
  const sState = document.getElementById("surveySolutionState");
  const sTitle = document.getElementById("frictionSolutionTitle");
  const sBody = document.getElementById("frictionSolutionBody");
  const sAction = document.getElementById("frictionSolutionAction");

  if (qState) qState.classList.add("hidden");
  if (sState) sState.classList.remove("hidden");

  if (reasonCode === 'HARGA_BELUM_PAS') {
    if (sTitle) sTitle.innerText = "Klaim Voucher Diskon Spesial";
    if (sBody) sBody.innerText = "Gunakan kode HEMAT5K di menu PIN untuk diskon Rp5.000 instan.";
    if (sAction) sAction.innerHTML = '<button class="btn-copy" style="width:100%;" onclick="tutupSurvey(); bukaModalPIN(\'starter\');">Gunakan HEMAT5K</button>';
  } else {
    if (sTitle) sTitle.innerText = "Konsultasi Gratis Bersama Tim";
    if (sBody) sBody.innerText = "Tim kami siap memandu cara penggunaan hingga visual Anda berhasil dibuat.";
    if (sAction) sAction.innerHTML = '<button class="btn-copy" style="width:100%; background:#22c55e; color:#000;" onclick="tutupSurvey(); hubungiAdminWaLangsung();">Chat WhatsApp Admin</button>';
  }
}

function initPwaInstaller() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById("pwaInstallBanner");
    if (banner) banner.classList.remove("hidden");
  });
}

function picuInstallPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      tutupBannerPWA();
    });
  }
}

function tutupBannerPWA() {
  const banner = document.getElementById("pwaInstallBanner");
  if (banner) banner.classList.add("hidden");
}

// -------------------------------------------------------------------------
// 16. PINTEREST SIMETRIS LIVE SEARCH
// -------------------------------------------------------------------------
function handleLiveAtelierSearch(keyword) {
  const cleanKey = (keyword || "").toLowerCase().trim();
  const clearBtn = document.getElementById("btnClearGlobalSearch");
  if (clearBtn) {
    clearBtn.classList.toggle("hidden", cleanKey.length === 0);
  }

  const studioCards = document.querySelectorAll("#gridHomeCategories .catalog-card");
  studioCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const isMatch = cleanKey === "" || text.includes(cleanKey);
    card.style.display = isMatch ? "" : "none";
  });

  const pinItems = document.querySelectorAll("#gridAtelierFeed .pin-item");
  pinItems.forEach(item => {
    const text = item.innerText.toLowerCase();
    const isMatch = cleanKey === "" || text.includes(cleanKey);
    item.style.display = isMatch ? "" : "none";
  });
}

function resetLiveAtelierSearch() {
  const input = document.getElementById("globalAtelierSearch");
  if (input) {
    input.value = "";
    handleLiveAtelierSearch("");
  }
}

function filterByQuickChip(categoryTag, btnEl) {
  document.querySelectorAll(".quick-tag-chip").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const input = document.getElementById("globalAtelierSearch");
  
  if (categoryTag === 'all') {
    if (input) input.value = "";
    handleLiveAtelierSearch("");
    return;
  }

  if (categoryTag === 'akun') {
    switchMainTab('akun');
    return;
  }

  const tagMap = {
    'keluarga': 'family',
    'hijab': 'hijab',
    'ceo': 'ceo',
    'velvet': 'velvet',
    'video': 'video'
  };

  const searchKeyword = tagMap[categoryTag] || categoryTag;
  if (input) input.value = searchKeyword;
  handleLiveAtelierSearch(searchKeyword);
}

// -------------------------------------------------------------------------
// 17. ALUR CHECKOUT INSTAN DANA QRIS & WA (JIWAS)
// -------------------------------------------------------------------------
let currentOrderData = {
  title: "",
  tier: "",
  priceText: "",
  orderId: ""
};

function bukaModalCheckout(itemTitle, tierName, priceText) {
  currentOrderData.title = itemTitle;
  currentOrderData.tier = tierName;
  currentOrderData.priceText = priceText;

  const itemTitleEl = document.getElementById("checkoutItemTitle");
  const itemPriceEl = document.getElementById("checkoutItemPrice");
  if (itemTitleEl) itemTitleEl.innerText = `${itemTitle} (${tierName})`;
  if (itemPriceEl) itemPriceEl.innerText = priceText;

  const nameInput = document.getElementById("coBuyerName");
  const waInput = document.getElementById("coBuyerWA");
  if (nameInput) nameInput.value = "";
  if (waInput) waInput.value = "";

  const stepForm = document.getElementById("stepCheckoutForm");
  const stepQRIS = document.getElementById("stepCheckoutQRIS");
  if (stepForm) stepForm.classList.remove("hidden");
  if (stepQRIS) stepQRIS.classList.add("hidden");

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("hidden");
}

function tutupModalCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("hidden");
}

function prosesKeQRIS(e) {
  e.preventDefault();

  const buyerName = document.getElementById("coBuyerName")?.value.trim() || "";
  const buyerWA = document.getElementById("coBuyerWA")?.value.trim() || "";
  if (!buyerName || !buyerWA) return;

  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  currentOrderData.orderId = `JWS-${yy}${mm}${dd}-${rand}`;

  const orderIdEl = document.getElementById("coOrderID");
  const totalBayarEl = document.getElementById("coTotalBayar");
  const qrisImgEl = document.getElementById("coQrisImage");

  if (orderIdEl) orderIdEl.innerText = currentOrderData.orderId;
  if (totalBayarEl) totalBayarEl.innerText = currentOrderData.priceText;

  if (qrisImgEl) {
    const rawPrice = (currentOrderData.priceText || "").toLowerCase();
    const rawTier = (currentOrderData.tier || "").toLowerCase();

    if (rawPrice.includes("10.000") || rawTier.includes("10k") || rawTier.includes("starter")) {
      qrisImgEl.src = "images/qris-10k.jpg";
    } else if (rawPrice.includes("25.000") || rawTier.includes("25k") || rawTier.includes("vip")) {
      qrisImgEl.src = "images/qris-25k.jpg";
    } else {
      qrisImgEl.src = "images/qris-dana.jpg";
    }
  }

  const pesanWA = 
`Halo Admin JIWAS, saya sudah transfer via QRIS DANA.

- No. Order: ${currentOrderData.orderId}
- Nama: ${buyerName}
- No. WhatsApp: ${buyerWA}
- Pesanan: ${currentOrderData.title} (${currentOrderData.tier})
- Total: ${currentOrderData.priceText}

Berikut bukti transfernya. Tolong segera dikonfirmasi ya. Terima kasih!`;

  const waTarget = getAdminWhatsAppNumber();
  const waUrl = `https://wa.me/${waTarget}?text=${encodeURIComponent(pesanWA)}`;
  const btnWA = document.getElementById("btnKonfirmasiWA");
  if (btnWA) btnWA.href = waUrl;

  const stepForm = document.getElementById("stepCheckoutForm");
  const stepQRIS = document.getElementById("stepCheckoutQRIS");
  if (stepForm) stepForm.classList.add("hidden");
  if (stepQRIS) stepQRIS.classList.remove("hidden");

  catatLogAktivitas("CHECKOUT_QRIS", currentOrderData.title, `${currentOrderData.tier} (${buyerName})`);
}