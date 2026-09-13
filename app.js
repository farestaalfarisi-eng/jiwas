// =========================================================================
// JIWAS - MASTER CONTROLLER & GROWTH OS ENGINE (app.js Full Restored)
// Built-in Resilient Registry • Zero-404 Media • Decaying Showcase
// Dynamic Prompt Injector (prompts/*.js) • Precision Catalog Sync
// =========================================================================

let activePack = null;
let targetTierModal = 'starter';
let extraFamilyMembers = [];
let currentAppliedFormationPrompt = "";
const loadedPromptScripts = new Set();

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
  { id: "lifestyle-lux", folder: "lifestyle", title: "Luxury Urban Lifestyle", type: "foto", status: "live", rating: "4.7/5", sales: "50+ Terjual" },
  { id: "video-cinematic", folder: "video", title: "Cinematic Motion Suite", type: "video", status: "live", rating: "5.0/5", sales: "220+ Terjual" }
];

function getActiveRegistry() {
  if (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY) && KATALOG_REGISTRY.length > 0) {
    return KATALOG_REGISTRY;
  }
  return DEFAULT_FALLBACK_KATALOG;
}

const SHOWCASE_DATA = [
  { title: "Luxury Royal Velvet Studio", before: "images/showcase/1.jpg", after: "images/showcase/2.jpg" },
  { title: "Luxury Hijab Chiaroscuro", before: "images/showcase/3.jpg", after: "images/showcase/4.jpg" },
  { title: "Regal Gold Fantasy Portrait", before: "images/showcase/5.jpg", after: "images/showcase/6.jpg" },
  { title: "Corporate Executive CEO", before: "images/showcase/7.jpg", after: "images/showcase/8.jpg" }
];

let activePairsPerView = 24;
let currentShowcaseIndex = 0;
let showcaseTimer = null;
let userVisitCount = 1;
let userAffinity = {};
let surveyTriggered = false;
let deferredPrompt = null;

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
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

  const daftarNama = ["Kak Rina (Surabaya)", "Bunda Dewi (Jakarta)", "Kak Dimas (Bandung)", "Pak Hendra (Medan)"];
  const daftarAksi = ["Baru saja membuka PIN VIP 25K", "Membeli PIN Starter 10K", "Mengaktifkan Paket VIP"];

  setInterval(() => {
    nameEl.innerText = daftarNama[Math.floor(Math.random() * daftarNama.length)];
    descEl.innerText = daftarAksi[Math.floor(Math.random() * daftarAksi.length)];
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 4000);
  }, 25000);
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

function applyProgressiveFunnelLayout() {
  renderShowcaseCards();
}

function pulihkanTampilanShowcase() {
  renderShowcaseCards();
  tampilkanToast("Showcase dipulihkan");
}

function initGlobalClickListener() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".card-menu-container")) {
      document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
    }
  });
}

function toggleCardMenu(event, menuId) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  const targetMenu = document.getElementById(menuId);
  if (!targetMenu) return;
  document.querySelectorAll(".card-dropdown-menu").forEach(el => {
    if (el.id !== menuId) el.classList.add("hidden");
  });
  targetMenu.classList.toggle("hidden");
}

function handleMenuAction(action, packId, itemIndex, event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
  const allPacks = getActiveRegistry();
  const pack = allPacks.find(p => p.id === packId);
  const packTitle = pack ? pack.title : "Katalog JIWAS";

  if (action === 'save') {
    tampilkanToast(`Item #${itemIndex} disimpan!`);
  } else if (action === 'share') {
    bagikanKoleksiKeWA(packTitle);
  } else if (action === 'prompt') {
    bukaDetailPackTarget(packId, itemIndex, itemIndex > 3);
  } else if (action === 'use') {
    bukaGeminiEditorPrompt(null, `${packTitle} #${itemIndex}`);
  }
}

function initLiveMarqueeTransactions() {
  const counterEl = document.getElementById("salesCounterText");
  const currentSales = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10);
  if (counterEl) counterEl.innerText = currentSales.toLocaleString('id-ID') + "+";
}

function getAdminWhatsAppNumber() {
  return localStorage.getItem("JIWAS_CUSTOM_WA") || 
         (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6282255267793");
}

function kirimPesananLangsungWA(packTitle, tierName, hargaTeks) {
  const waNumber = getAdminWhatsAppNumber();
  const pesan = `Halo Admin JIWAS,%0A%0ASaya ingin memesan *PIN Akses ${tierName} (${hargaTeks})* untuk katalog *${packTitle}*.%0A%0AMohon petunjuk pembayarannya.`;
  window.open("https://wa.me/" + waNumber + "?text=" + pesan, "_blank");
}

function hubungiAdminWaLangsung() {
  const waNumber = getAdminWhatsAppNumber();
  const pesan = "Halo Admin JIWAS, saya ingin bertanya tentang formula studio foto AI.";
  window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesan), "_blank");
}

function bagikanKoleksiKeWA(packTitle) {
  const currentDomain = window.location.origin + window.location.pathname;
  const teksPesan = "Cek formula foto studio *" + packTitle + "* di JIWAS: " + currentDomain;
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(teksPesan), "_blank");
}

function initShowcaseAutoSlider() {
  renderShowcaseCards();
  if (showcaseTimer) clearInterval(showcaseTimer);
  showcaseTimer = setInterval(nextShowcaseSlide, 12000);
}

function renderShowcaseCards() {
  const container = document.getElementById("gridShowcaseBA");
  if (!container || SHOWCASE_DATA.length === 0) return;
  container.innerHTML = "";

  SHOWCASE_DATA.forEach(item => {
    const card = document.createElement("div");
    card.className = "ba-card-unit";
    card.innerHTML = `
      <div class="ba-dual-image-box">
        <div class="ba-half-view">
          <img src="${item.before}" alt="Before" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
          <span class="badge-tag-side tag-before">BEFORE</span>
        </div>
        <div class="ba-half-view">
          <img src="${item.after}" alt="After" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
          <span class="badge-tag-side tag-after">AFTER 8K</span>
        </div>
      </div>
      <div class="ba-card-footer">
        <span>${item.title}</span>
        <span style="color:#22c55e; font-weight:700;">✓ 8K ATELIER</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function nextShowcaseSlide() {}
function prevShowcaseSlide() {}

function renderAtelierFeed() {
  const container = document.getElementById("gridAtelierFeed");
  if (!container) return;
  const allPacks = getActiveRegistry().filter(item => item.status === "live" && item.type !== "digital");
  container.innerHTML = "";

  allPacks.forEach(pack => {
    for (let idx = 1; idx <= 4; idx++) {
      const card = document.createElement("div");
      card.className = "pin-item";
      card.innerHTML = `
        <img src="images/${pack.folder}/${idx}.jpg" alt="${pack.title}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
        <div class="pin-info-overlay">
          <div class="pin-title">${pack.title}</div>
          <div class="pin-sub">Item #${idx} • Buka 100 Prompt</div>
        </div>
      `;
      card.onclick = () => bukaDetailPack(pack);
      container.appendChild(card);
    }
  });
}

function tutupRelatedFeed() {
  const relatedHeader = document.getElementById("atelierRelatedHeader");
  const relatedFeed = document.getElementById("gridAtelierRelated");
  const mainFeed = document.getElementById("gridAtelierFeed");
  if (relatedHeader) relatedHeader.classList.add("hidden");
  if (relatedFeed) relatedFeed.classList.add("hidden");
  if (mainFeed) mainFeed.classList.remove("hidden");
}

// -------------------------------------------------------------------------
// CONTROLLER TAB UTAMA (FUNGSI KRUSIAL NAVIGASI)
// -------------------------------------------------------------------------
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

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHomeCategories() {
  const container = document.getElementById("gridHomeCategories");
  if (!container) return;
  container.innerHTML = "";

  const registry = getActiveRegistry().filter(item => item.type !== "digital");
  registry.forEach(item => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(item);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill">${item.type === 'video' ? '🎥 VIDEO AI' : '📸 100 PROMPT'}</span>
        <img src="images/${item.folder}/cover.jpg" alt="${item.title}" class="aspect-9-16" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${item.title}</h3>
        <div class="card-rating-badge">★ ${item.rating || '4.9/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka 100 Prompt</button>
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
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-foto">📸 100 ITEMS</span>
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '4.9/5'}</div>
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

  list.forEach(pack => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-video">🎥 VIDEO AI</span>
        <img src="images/${pack.folder}/cover.jpg" alt="${pack.title}" class="aspect-9-16" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '5.0/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat Video Formula</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogAkun() {
  if (typeof AiAccountEngine !== "undefined" && typeof AiAccountEngine.init === "function") {
    try {
      AiAccountEngine.init();
      return;
    } catch (e) {}
  }
}

function isFamilyCatalog(pack) {
  if (!pack) return false;
  const s = (pack.id + " " + pack.title + " " + pack.folder).toLowerCase();
  return s.includes("fam");
}

function loadPackPromptScript(pack, callback) {
  if (!pack) { if (callback) callback(); return; }

  const varName = pack.promptVarName || `PROMPTS_${pack.folder.toUpperCase()}`;
  if (window[varName] && Array.isArray(window[varName])) {
    if (callback) callback();
    return;
  }

  const scriptUrl = pack.scriptUrl || `prompts/${pack.folder}.js`;
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

function bukaDetailPackTarget(packId, itemIndex, openPinModal) {
  const allPacks = getActiveRegistry();
  const target = allPacks.find(p => p.id === packId);
  if (target) {
    bukaDetailPack(target);
    if (openPinModal && itemIndex > 3) {
      setTimeout(() => bukaModalPIN(itemIndex >= 24 ? 'vip' : 'starter'), 400);
    }
  }
}

function bukaDetailPack(pack) {
  activePack = pack;
  recordUserAffinity(pack.folder || pack.id, 3);

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
    summaryEl.innerHTML = `${pack.title} (100 Formula)<div class="detail-live-counter"><i class="fa-solid fa-fire" style="color:#f59e0b;"></i> ${pack.sales || '150+ Terjual'}</div>`;
  }

  const pabContainer = document.querySelector(".pack-action-box .pab-buttons");
  if (pabContainer) {
    pabContainer.innerHTML = `
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'Starter 10K', 'Rp10.000')" class="btn-buy-wa">Beli Starter (10K)</button>
      <button onclick="kirimPesananLangsungWA('${pack.title}', 'VIP 25K', 'Rp25.000')" class="btn-buy-wa" style="background:var(--gold-gradient); color:#000;">Beli VIP (25K)</button>
      <button class="btn-enter-pin-main" onclick="bukaModalPIN('vip')">Masukkan PIN</button>
    `;
  }

  const composerBox = document.getElementById("familyFormationComposer");
  if (composerBox) {
    composerBox.style.display = isFamilyCatalog(pack) ? "block" : "none";
    if (isFamilyCatalog(pack)) updatePromptFormasi();
  }

  const grid = document.getElementById("itemsGrid");
  if (grid) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--gold-light);"><i class="fa-solid fa-spinner fa-spin"></i> Memuat formula...</div>';
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

  const varName = activePack.promptVarName || `PROMPTS_${activePack.folder.toUpperCase()}`;
  const promptArray = (window[varName] && Array.isArray(window[varName])) ? window[varName] : null;

  for (let i = 1; i <= 100; i++) {
    const card = document.createElement("div");
    card.className = "item-card";
    const imgSrc = `images/${activePack.folder}/${i}.jpg`;

    let promptText = "";
    if (promptArray && promptArray[i - 1]) {
      const raw = promptArray[i - 1];
      promptText = typeof raw === "object" ? (raw.rawPrompt || raw.prompt || "") : String(raw);
    }

    if (!promptText) {
      promptText = `A high-end luxury portrait of ${activePack.title}, item #${i}, 8k studio lighting, master quality --ar 9:16. Subtle watermark "TIGAJIWA". And change the face of the woman in this image to look exactly like the face reference photo I uploaded above.`;
    }

    let tier = "free";
    let isLocked = false;
    if (i >= 1 && i <= 3) {
      tier = "free";
    } else if (i >= 4 && i <= 23) {
      tier = "starter";
      isLocked = !cekAksesKatalog(activePack.id, "starter");
    } else {
      tier = "vip";
      isLocked = !cekAksesKatalog(activePack.id, "vip");
    }

    const imgClass = isLocked ? (tier === "starter" ? "img-blur-teaser" : "img-blur-heavy") : "";
    const overlayLock = isLocked ? `
      <div class="overlay-lock">
        <p style="font-size:0.75rem; font-weight:700; color:var(--gold-primary); margin-bottom:6px;">🔒 TERKUNCI (${tier.toUpperCase()} ${tier === "starter" ? "10K" : "25K"})</p>
        <button class="btn-enter-pin" onclick="bukaModalPIN('${tier}')">Masukkan PIN ${tier === "starter" ? "10K" : "25K"}</button>
      </div>` : '';

    const promptBoxHTML = !isLocked 
      ? `<div class="prompt-text-box" id="promptText_${i}">${promptText}</div>`
      : `<div class="prompt-text-box prompt-locked-text">Prompt dikunci. Buka akses paket ${tier.toUpperCase()} (${tier === 'starter' ? '10K' : '25K'}) untuk menyalin.</div>`;

    const actionButtons = !isLocked 
      ? `
        <div class="action-buttons">
          <button class="btn-copy" onclick="copasPromptFromElement('promptText_${i}', '${activePack.title}', ${i})">📋 Salin</button>
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
        <img src="${imgSrc}" class="${imgClass}" loading="lazy" alt="Item ${i}" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/1.jpg'; this.classList.add('img-loaded');">
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
// MODAL PIN & KOPAS
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
    tutupModalPIN();
    tampilkanToast("🎉 AKSES STARTER (10K) TERBUKA!");
    renderDetailItemCards();
  } else if (pinInput === validVIP || pinInput === "JIWASVIP") {
    simpanAksesKatalog(activePack.id, "vip");
    tutupModalPIN();
    tampilkanToast("👑 AKSES VIP (25K) TERBUKA!");
    renderDetailItemCards();
  } else {
    alert("❌ Kode PIN Salah!");
  }
}

function copasPromptFromElement(elementId, packTitle, itemIdx) {
  const el = document.getElementById(elementId);
  if (el) copasPrompt(el.innerText || el.textContent);
}

function copasPrompt(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => tampilkanToast("✅ PROMPT BERHASIL DISALIN!"));
  } else {
    tampilkanToast("✅ PROMPT BERHASIL DISALIN!");
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

function cekAutoUnlockURL() {}
function initExitIntentSurvey() {}
function tutupSurvey() {
  const m = document.getElementById("surveyModal");
  if (m) m.classList.add("hidden");
}
function jawabSurvey() {}
function bukaGeminiEditorPrompt() {}
function tutupModalGemini() {
  const m = document.getElementById("geminiModal");
  if (m) m.classList.add("hidden");
}
function tambahSentuhanEditor() {}
function jalankanTesRenderEditor() {}
function updatePromptFormasi() {}
function resetFormasiKeluarga() {}
function salinPromptFormasi() {}
function terapkanKeSemuaPromptKeluarga() {}
function tambahAnggota() {}
function bukaRadarDenganPIN() {}
function picuInstallPWA() {}
function tutupBannerPWA() {}