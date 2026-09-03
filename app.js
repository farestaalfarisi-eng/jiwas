// =========================================================================
// JIWAS - MASTER CONTROLLER ENGINE & GROWTH LOOP (app.js V11.0 Platinum)
// =========================================================================

let activePack = null;
let targetTierModal = 'starter';

const TOTAL_SHOWCASE_PAIRS = 12;
const PAIRS_PER_VIEW = 4;
let currentShowcaseIndex = 0;
let showcaseTimer = null;
const MAX_FREE_DAILY_QUOTA = 3;

// -------------------------------------------------------------------------
// 0. LIVE FOMO PULSE ENGINE
// -------------------------------------------------------------------------
function initFomoPulseEngine() {
  const activeEl = document.getElementById("fomoActiveUsers");
  const transEl = document.getElementById("fomoTransUsers");
  const viewsEl = document.getElementById("fomoViewsCount");
  const slotEl = document.getElementById("fomoSlotCount");

  let baseViews = parseInt(localStorage.getItem("JIWAS_ACC_VIEWS") || "13420", 10);
  let baseTrans = parseInt(localStorage.getItem("JIWAS_ACC_TRANS") || "148", 10);

  baseViews += Math.floor(Math.random() * 3) + 1;
  localStorage.setItem("JIWAS_ACC_VIEWS", baseViews.toString());

  function formatK(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(".", ",") + "k+";
    }
    return num.toString();
  }

  if (viewsEl) viewsEl.innerText = formatK(baseViews);
  if (transEl) transEl.innerText = baseTrans.toString();

  setInterval(() => {
    if (activeEl) {
      activeEl.innerText = 512 + Math.floor(Math.random() * 56);
    }
    if (transEl) {
      const stored = parseInt(localStorage.getItem("JIWAS_ACC_TRANS") || "148", 10);
      const delta = Math.floor(Math.random() * 9) - 4;
      transEl.innerText = Math.max(135, stored + delta);
    }
    if (Math.random() > 0.55) {
      baseViews += 1;
      localStorage.setItem("JIWAS_ACC_VIEWS", baseViews.toString());
      if (viewsEl) viewsEl.innerText = formatK(baseViews);
    }
    if (slotEl && Math.random() > 0.7) {
      slotEl.innerText = 4 + Math.floor(Math.random() * 5);
    }
  }, 7500);
}

function catatTransaksiFomoBar() {
  try {
    let trans = parseInt(localStorage.getItem("JIWAS_ACC_TRANS") || "148", 10) + 1;
    localStorage.setItem("JIWAS_ACC_TRANS", trans.toString());
    const transEl = document.getElementById("fomoTransUsers");
    if (transEl) transEl.innerText = trans.toString();
  } catch (e) {
    console.warn(e);
  }
}

// -------------------------------------------------------------------------
// 0.1 RADAR ACTIVITY LOGGER
// -------------------------------------------------------------------------
function catatLogAktivitas(eventType, targetName, detailText) {
  try {
    const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + " (" + now.getDate() + "/" + (now.getMonth() + 1) + ")";

    logs.push({
      time: timeStr,
      type: eventType,
      target: targetName,
      detail: detailText || ""
    });

    if (logs.length > 100) logs.shift();
    localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
  } catch (e) {
    console.warn(e);
  }
}

// -------------------------------------------------------------------------
// 0.2 AMAZON-STYLE REAL-TIME SOCIAL PROOF POPUP
// -------------------------------------------------------------------------
function initSocialProofPopups() {
  const fakeBuyers = [
    { name: "Kak Rina (Surabaya)", action: "Baru saja membuka PIN VIP 25K (Royal Velvet)" },
    { name: "Bunda Dewi (FB Pro Medan)", action: "Membeli PIN Starter 10K (Hijab Collection)" },
    { name: "Kak Dimas (Jakarta Selatan)", action: "Baru mengaktifkan Paket VIP (Luxury Family)" },
    { name: "Pak Hendra (Bandung)", action: "Membeli PIN Starter (CEO Executive)" },
    { name: "Kak Tania (Makassar)", action: "Baru saja menyalin 3 Prompt Studio Gratis" }
  ];

  setInterval(() => {
    const toast = document.getElementById("liveBuyerToast");
    const nameEl = document.getElementById("buyerToastUser");
    const descEl = document.getElementById("buyerToastDesc");
    if (!toast || !nameEl || !descEl) return;

    const randomBuyer = fakeBuyers[Math.floor(Math.random() * fakeBuyers.length)];
    nameEl.innerText = randomBuyer.name;
    descEl.innerText = randomBuyer.action;

    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 4500);
  }, 22000);
}

// -------------------------------------------------------------------------
// 1. INISIALISASI UTAMA
// -------------------------------------------------------------------------
let userVisitCount = 1;
let userAffinity = {};

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
  
  renderHomeCategories();
  renderAtelierFeed();
  renderKatalogFoto();
  renderKatalogVideo();
  renderKatalogAkun();
  initGlobalClickListener();
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
  } catch (e) {
    console.warn(e);
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

  if (userVisitCount <= 2) {
    if (showcaseSec) showcaseSec.classList.remove("hidden");
    if (homeCategorySec) homeCategorySec.classList.remove("hidden");
    if (mainHeader) mainHeader.classList.remove("hidden");
  } else {
    if (showcaseSec) showcaseSec.classList.add("hidden");
    if (homeCategorySec) homeCategorySec.classList.add("hidden");
    if (mainHeader) mainHeader.classList.add("hidden");
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
// 2. MARQUEE & DIRECT WHATSAPP (1-CLICK CLIENT-SIDE)
// -------------------------------------------------------------------------
function initLiveMarqueeTransactions() {
  const counterEl = document.getElementById("salesCounterText");
  const marquee = document.getElementById("liveMarqueeContainer") || document.querySelector(".marquee-text");
  
  const realSalesCount = parseInt(localStorage.getItem("JIWAS_REAL_SALES_COUNT") || "1250", 10);
  if (counterEl) {
    counterEl.innerText = realSalesCount.toLocaleString('id-ID') + "+";
  }

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

    const marquee = document.getElementById("liveMarqueeContainer") || document.querySelector(".marquee-text");
    if (marquee) {
      const newLiveSpan = document.createElement("span");
      newLiveSpan.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> PEMBELIAN BARU: PIN ' + tierName + ' (' + packTitle + ') Berhasil Diaktifkan!';
      marquee.prepend(newLiveSpan);
    }
  } catch (e) {
    console.warn(e);
  }
}

function getAdminWhatsAppNumber() {
  return localStorage.getItem("JIWAS_CUSTOM_WA") || 
         (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6281234567890");
}

function kirimPesananLangsungWA(packTitle, tierName, hargaTeks) {
  const waNumber = getAdminWhatsAppNumber();
  catatLogAktivitas("CLICK_WA", packTitle, "Klik Beli " + tierName + " (" + hargaTeks + ")");
  catatTransaksiFomoBar();

  const pesan = "Halo Admin JIWAS,%0A%0ASaya ingin membeli *PIN Akses " + tierName + " (" + hargaTeks + ")* untuk katalog *" + packTitle + "*.%0A%0AMohon info rekening / QRIS pembayarannya ya. Terima kasih!";
  window.open("https://wa.me/" + waNumber + "?text=" + pesan, "_blank");
}

function hubungiAdminWaLangsung() {
  const waNumber = getAdminWhatsAppNumber();
  const pesan = "Halo Admin JIWAS, saya tertarik bertanya tentang kemitraan reseller atau katalog AI di JIWAS.";
  window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesan), "_blank");
}

// -------------------------------------------------------------------------
// 2.1 VIRAL MARKETING: 1-CLICK SHARE KE TEMAN WHATSAPP
// -------------------------------------------------------------------------
function bagikanKoleksiKeWA(packTitle) {
  const domainUrl = "https://jiwas.com";
  const teksPesan = "Halo! Coba cek formula foto studio bangsawan *" + packTitle + "* di JIWAS Atelier: " + domainUrl + "%0A%0ABagus banget buat naikin kualitas foto profil tanpa sewa studio mahal! ✨";
  
  catatLogAktivitas("SHARE_WA_VIRAL", packTitle, "Membagikan ke WhatsApp");
  window.open("https://api.whatsapp.com/send?text=" + teksPesan, "_blank");
}

// -------------------------------------------------------------------------
// 3. KUOTA & MENU AKSI
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
  if (targetMenu) targetMenu.classList.toggle("hidden");
}

function handleMenuAction(action, packId, itemIndex, event) {
  event.stopPropagation();
  document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));

  const allRegistry = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) ? KATALOG_REGISTRY : [];
  const pack = allRegistry.find(p => p.id === packId);
  if (!pack) return;

  const promptArray = (pack.promptVarName && window[pack.promptVarName]) ? window[pack.promptVarName] : [];
  let promptText = "Hyperrealistic portrait of " + pack.title + ", item #" + itemIndex + ", 8k studio lighting, master quality --ar 9:16";

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

  if (action === 'save') {
    simpanBookmarkItem(pack, itemIndex);
  } else if (action === 'share') {
    bagikanItem(pack, itemIndex);
  } else if (action === 'prompt') {
    copasPrompt(promptText);
    recordUserAffinity(pack.folder || pack.id, 3);
    catatLogAktivitas("COPY_PROMPT", pack.title, "Menyalin item #" + itemIndex);
  } else if (action === 'use') {
    eksekusiGenerateUjiCoba(promptText, pack.title, isFree);
    recordUserAffinity(pack.folder || pack.id, 4);
    catatLogAktivitas("USE_ENGINE", pack.title, "Engine item #" + itemIndex);
  }
}

function simpanBookmarkItem(pack, itemIndex) {
  try {
    let saved = JSON.parse(localStorage.getItem("JIWAS_SAVED_ITEMS") || "[]");
    const itemKey = pack.id + "_" + itemIndex;
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
    title: pack.title + " - JIWAS",
    text: "Lihat hasil formula AI " + pack.title + " item #" + itemIndex + " di JIWAS Atelier!",
    url: "https://jiwas.com"
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText("https://jiwas.com").then(() => {
      tampilkanToast("🔗 LINK JIWAS BERHASIL DISALIN!");
    });
  }
}

// -------------------------------------------------------------------------
// 4. JIWAS GEMINI ENGINE
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
  if (statusEl) statusEl.innerText = "Menghubungkan ke Engine: " + title;
  if (outputEl) {
    outputEl.innerHTML = '<div class="quota-indicator-box"><span><i class="fa-solid fa-clock"></i> Sisa Kuota Uji Coba:</span><strong>' + (isFree ? currentQuota.remaining + ' / ' + MAX_FREE_DAILY_QUOTA : 'UNLIMITED (VIP)') + '</strong></div><div style="margin-top:8px;"><p><strong>[OPTIMIZED PROMPT]</strong><br>' + promptText + '</p><p style="margin-top:8px; color:var(--gold-light);"><strong>[ATELIER SPECIFICATION]</strong><br>Hasselblad H6D-100c • 85mm f/1.4 Lens • Cinematic Softbox Lighting --ar 9:16</p></div>';
  }
}

function tutupModalGemini() {
  const modal = document.getElementById("geminiModal");
  if (modal) modal.classList.add("hidden");
}

// -------------------------------------------------------------------------
// 5. SHOWCASE BEFORE & AFTER SLIDER
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
      card.innerHTML = '<div class="ba-dual-image-box"><div class="ba-half-view"><img src="images/showcase/' + beforeImgNum + '.jpg" alt="Before" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"><span class="badge-tag-side tag-before">BEFORE</span></div><div class="ba-half-view"><img src="images/showcase/' + afterImgNum + '.jpg" alt="After" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/1.jpg\';"><span class="badge-tag-side tag-after">AFTER (AI)</span></div></div><div class="ba-card-footer"><span>Transformation #' + (pairNum + 1) + '</span><span style="color:#22c55e; font-weight:700;">✓ 8K AI</span></div>';
      container.appendChild(card);
    }
    container.style.opacity = "1";
  }, 120);

  if (dotsContainer) {
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
  showcaseTimer = setInterval(() => { nextShowcaseSlide(); }, 5000);
}

function restartShowcaseTimer() {
  startShowcaseTimer();
}

// -------------------------------------------------------------------------
// 6. ATELIER FEED (PINTEREST GRID)
// -------------------------------------------------------------------------
function renderAtelierFeed() {
  const container = document.getElementById("gridAtelierFeed");
  if (!container) return;

  const allPacks = (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) 
    ? KATALOG_REGISTRY.filter(item => item.status === "live" && item.type !== "digital") 
    : [];

  if (allPacks.length === 0) {
    container.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:var(--gold-light); font-size:0.85rem; padding:30px;">⚠️ Memuat katalog eksplorasi...</p>';
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
    const menuId = "menu_feed_" + pin.pack.id + "_" + pin.itemIndex + "_" + i;
    const card = document.createElement("div");
    card.className = "pin-item";

    const freeBadgeHTML = pin.isFree ? '<div class="pin-badge-free-elegant"><i class="fa-solid fa-sparkles"></i> <span>FREE DEMO</span></div>' : '';

    card.innerHTML = '<div class="card-menu-container"><button class="btn-three-dots" onclick="toggleCardMenu(event, \'' + menuId + '\')" aria-label="Menu Aksi"><i class="fa-solid fa-ellipsis-vertical"></i></button><div id="' + menuId + '" class="card-dropdown-menu hidden"><button class="dropdown-item" onclick="handleMenuAction(\'save\', \'' + pin.pack.id + '\', ' + pin.itemIndex + ', event)"><i class="fa-solid fa-bookmark"></i> Save</button><button class="dropdown-item" onclick="handleMenuAction(\'share\', \'' + pin.pack.id + '\', ' + pin.itemIndex + ', event)"><i class="fa-solid fa-share-nodes"></i> Bagikan</button><button class="dropdown-item" onclick="handleMenuAction(\'prompt\', \'' + pin.pack.id + '\', ' + pin.itemIndex + ', event)"><i class="fa-solid fa-copy"></i> Prompt</button><button class="dropdown-item action-gemini" onclick="handleMenuAction(\'use\', \'' + pin.pack.id + '\', ' + pin.itemIndex + ', event)"><i class="fa-solid fa-bolt"></i> Gunakan</button></div></div>' + freeBadgeHTML + '<img src="images/' + pin.pack.folder + '/' + pin.itemIndex + '.jpg" alt="' + pin.pack.title + '" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/1.jpg\';"><div class="pin-info-overlay"><div class="pin-title">' + pin.pack.title + '</div><div class="pin-sub">Item #' + pin.itemIndex + ' • Eksplorasi 100 Serupa</div></div>';

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

    card.innerHTML = '<div class="card-menu-container"><button class="btn-three-dots" onclick="toggleCardMenu(event, \'' + menuId + '\')"><i class="fa-solid fa-ellipsis-vertical"></i></button><div id="' + menuId + '" class="card-dropdown-menu hidden"><button class="dropdown-item" onclick="handleMenuAction(\'save\', \'' + pack.id + '\', ' + i + ', event)"><i class="fa-solid fa-bookmark"></i> Save</button><button class="dropdown-item" onclick="handleMenuAction(\'share\', \'' + pack.id + '\', ' + i + ', event)"><i class="fa-solid fa-share-nodes"></i> Bagikan</button><button class="dropdown-item" onclick="handleMenuAction(\'prompt\', \'' + pack.id + '\', ' + i + ', event)"><i class="fa-solid fa-copy"></i> Prompt</button><button class="dropdown-item action-gemini" onclick="handleMenuAction(\'use\', \'' + pack.id + '\', ' + i + ', event)"><i class="fa-solid fa-bolt"></i> Gunakan</button></div></div>' + freeBadgeHTML + '<img src="images/' + pack.folder + '/' + i + '.jpg" alt="' + pack.title + ' #' + i + '" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/1.jpg\';"><div class="pin-info-overlay"><div class="pin-title">' + pack.title + '</div><div class="pin-sub">Item #' + i + ' ' + (isFree ? '• Sample Gratis' : '• Premium Prompt') + '</div></div>';

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
// 7. KATALOG TAB CONTROLLER
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

    catatLogAktivitas("SWITCH_TAB", tabType.toUpperCase(), "Beralih ke tab " + tabType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    console.error(e);
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
    if (index === 0) rankBadgeHTML = '<span class="badge-pill badge-rank-gold">🥇 TOP #1 PALING BANYAK DIBELI</span>';
    else if (index === 1) rankBadgeHTML = '<span class="badge-pill badge-rank-blue">🥈 BEST SELLER (150+ TERJUAL)</span>';
    else if (index === 2) rankBadgeHTML = '<span class="badge-pill badge-rank-green">🥉 FAVORIT BULAN INI</span>';
    else rankBadgeHTML = '<span class="badge-pill badge-foto">📸 100 ITEMS</span>';

    card.innerHTML = '<div style="position:relative;">' + rankBadgeHTML + '<img src="images/' + pack.folder + '/cover.jpg" alt="' + pack.title + '" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"></div><div class="card-info"><h3 class="card-title">' + pack.title + '</h3><div class="card-rating-badge">★ ' + (pack.rating || '4.9/5') + ' (' + (pack.sales || 'Ready') + ')</div><div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div><button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat 100 Prompt</button></div>';
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

    const rankBadgeHTML = index === 0 
      ? '<span class="badge-pill badge-rank-gold">🥇 TOP VIDEO SUITE (200+ TERJUAL)</span>' 
      : '<span class="badge-pill badge-video">🎥 100 PROMPTS</span>';

    card.innerHTML = '<div style="position:relative;">' + rankBadgeHTML + '<img src="images/' + pack.folder + '/cover.jpg" alt="' + pack.title + '" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"></div><div class="card-info"><h3 class="card-title">' + pack.title + '</h3><div class="card-rating-badge">★ ' + (pack.rating || '5.0/5') + ' (' + (pack.sales || 'Ready') + ')</div><div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div><button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat 100 Prompt</button></div>';
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
    card.innerHTML = '<div style="position:relative;"><span class="badge-pill badge-app">🤖 AKUN AI</span><img src="images/' + item.folder + '/cover.jpg" alt="' + item.title + '" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"></div><div class="card-info"><h3 class="card-title">' + item.title + '</h3><p style="font-size:0.72rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">' + (item.description || '') + '</p><div style="font-weight:800; color:var(--gold-light); font-size:0.9rem; margin-bottom:8px;">' + item.priceText + '</div><button onclick="kirimPesananLangsungWA(\'' + item.title + '\', \'Akun AI\', \'' + item.priceText + '\')" class="btn-copy" style="padding:8px 12px; font-size:0.75rem; width:100%;">Beli via WA</button></div>';
    container.appendChild(card);
  });
}

function renderHomeCategories() {
  const container = document.getElementById("gridHomeCategories");
  if (!container || typeof KATALOG_REGISTRY === "undefined") return;
  container.innerHTML = "";

  KATALOG_REGISTRY.forEach(item => {
    if (item.type === "digital") return;
    const card = document.createElement("div");
    card.className = "catalog-card";

    if (item.status === "teaser") {
      card.innerHTML = '<div style="position:relative; overflow:hidden;"><span class="badge-pill" style="background:#dc2626; color:#fff; border-color:#ef4444;">🔒 COMING SOON</span><img src="images/' + item.folder + '/cover.jpg" alt="' + item.title + '" class="aspect-9-16 img-blur-heavy" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"></div><div class="card-info"><h3 class="card-title">' + item.title + '</h3><p style="font-size:0.7rem; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">' + (item.description || 'Sedang dalam proses kurasi prompt 8K.') + '</p><button onclick="kirimPesananLangsungWA(\'' + item.title + '\', \'Pre-Order VIP\', \'Coming Soon\')" class="btn-copy" style="background:#1e1e24; color:var(--gold-light); border:1px solid var(--card-border); width:100%; box-sizing:border-box; font-size:0.72rem; padding:8px 6px;">🔔 Ingatkan Saya di WA</button></div>';
    } else {
      card.onclick = () => bukaDetailPack(item);
      card.innerHTML = '<div style="position:relative;"><span class="badge-pill">' + (item.type === 'video' ? '🎥 VIDEO AI' : '📸 100 PROMPT') + '</span><img src="images/' + item.folder + '/cover.jpg" alt="' + item.title + '" class="aspect-9-16" loading="lazy" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\';"></div><div class="card-info"><h3 class="card-title">' + item.title + '</h3><div class="card-rating-badge">★ ' + (item.rating || '4.9/5') + ' (' + (item.sales || 'Ready') + ')</div><div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div><button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka Katalog (100 Item)</button></div>';
    }
    container.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// 8. DETAIL PACK & ITEMS GRID
// -------------------------------------------------------------------------
function bukaDetailPack(pack) {
  activePack = pack;
  recordUserAffinity(pack.folder || pack.id, 3);
  catatLogAktivitas("VIEW_PACK", pack.title, "Melihat katalog " + pack.category);

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
    summaryEl.innerHTML = pack.title + ' (100 Prompt)<div class="detail-live-counter"><i class="fa-solid fa-fire" style="color:#f59e0b;"></i> ' + (pack.sales || '150+ Terjual') + ' • 12 orang sedang melihat</div>';
  }

  const pabContainer = document.querySelector(".pack-action-box .pab-buttons");
  if (pabContainer) {
    pabContainer.innerHTML = '<button onclick="kirimPesananLangsungWA(\'' + pack.title + '\', \'Starter 10K\', \'Rp10.000\')" class="btn-buy-wa">Beli Starter (10K)</button><button onclick="kirimPesananLangsungWA(\'' + pack.title + '\', \'VIP 25K\', \'Rp25.000\')" class="btn-buy-wa" style="background:var(--gold-gradient); color:#000;">Beli VIP (25K)</button><button class="btn-enter-pin-main" onclick="bukaModalPIN(\'vip\')">Masukkan PIN</button>';
  }

  if (pack.promptVarName && window[pack.promptVarName] && Array.isArray(window[pack.promptVarName])) {
    renderDetailItemCards();
  } else if (pack.scriptUrl) {
    const existingScript = document.querySelector('script[src="' + pack.scriptUrl + '"]');
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

function renderDetailItemCards() {
  const grid = document.getElementById("itemsGrid");
  if (!grid || !activePack) return;
  grid.innerHTML = "";

  const promptArray = (activePack.promptVarName && window[activePack.promptVarName]) ? window[activePack.promptVarName] : [];

  for (let i = 1; i <= 100; i++) {
    const card = document.createElement("div");
    card.className = "item-card";

    const imgSrc = "images/" + activePack.folder + "/" + i + ".jpg";
    const promptItemData = (promptArray && promptArray[i - 1]) ? promptArray[i - 1] : null;

    let promptText = "Hyperrealistic luxury photography of " + activePack.title + ", item #" + i + ", 8k studio lighting, master quality --ar 9:16";

    if (promptItemData) {
      promptText = typeof promptItemData === "object" ? (promptItemData.rawPrompt || promptText) : promptItemData;
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
    let overlayLock = isLocked ? '<div class="overlay-lock"><p style="font-size:0.75rem; font-weight:700; color:var(--gold-primary); margin-bottom:6px;">🔒 TERKUNCI (' + tier.toUpperCase() + ' ' + (tier === "starter" ? "10K" : "25K") + ')</p><button class="btn-enter-pin" onclick="bukaModalPIN(\'' + tier + '\')">Masukkan PIN ' + (tier === "starter" ? "10K" : "25K") + '</button></div>' : '';

    let promptBoxHTML = !isLocked 
      ? '<div class="prompt-text-box" id="promptText_' + i + '">' + promptText + '</div>'
      : '<div class="prompt-text-box prompt-locked-text">Prompt dikunci. Buka akses paket ' + (tier === 'starter' ? '10K' : '25K') + ' untuk menyalin.</div>';

    let actionButtons = !isLocked 
      ? '<div class="action-buttons">' +
          '<button class="btn-copy" onclick="copasPromptFromElement(\'promptText_' + i + '\', \'' + activePack.title + '\', ' + i + ')">📋 SALIN</button>' +
          '<button class="btn-copy" style="background:#2563eb; color:#fff;" onclick="eksekusiGenerateUjiCoba(\'' + encodeURIComponent(promptText) + '\', \'' + activePack.title + '\', false)">⚡ ENGINE</button>' +
          '<button class="btn-share-promo" onclick="bagikanKoleksiKeWA(\'' + activePack.title + '\')"><i class="fa-brands fa-whatsapp"></i> Pamer</button>' +
          '<a href="https://www.bing.com/images/create" target="_blank" class="btn-direct-ai">🚀 Bing</a>' +
        '</div>'
      : '<div class="action-buttons"><button onclick="kirimPesananLangsungWA(\'' + activePack.title + '\', \'Paket ' + tier.toUpperCase() + '\', \'Rp' + (tier === 'starter' ? '10.000' : '25.000') + '\')" class="btn-unlock-wa">Buka Akses via WA (' + (tier === 'starter' ? '10K' : '25K') + ')</button></div>';

    card.innerHTML = '<div class="item-image-wrapper"><img src="' + imgSrc + '" class="' + imgClass + '" loading="lazy" alt="Item ' + i + '" onerror="this.onerror=null; this.src=\'images/velvet/1.jpg\';">' + overlayLock + '</div><div class="item-content"><div><div class="item-number">ITEM #' + i + ' ' + (tier === 'free' ? '• [GRATIS SAMPLE]' : '• [PAKET ' + tier.toUpperCase() + ']') + '</div>' + promptBoxHTML + '</div>' + actionButtons + '</div>';
    grid.appendChild(card);
  }
}

// -------------------------------------------------------------------------
// 9. MODAL PIN & UTILITAS (DILENGKAPI WATERMARK PROMOSI)
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
  let starterPIN = customPins[activePack.id] ? customPins[activePack.id].pin10k : "";
  let vipPIN = customPins[activePack.id] ? customPins[activePack.id].pin25k : "";

  if (!starterPIN) starterPIN = activePack.pin10k ? activePack.pin10k.toUpperCase() : "";
  if (!vipPIN) vipPIN = activePack.pin25k ? activePack.pin25k.toUpperCase() : "";

  if (pinInput && pinInput === starterPIN) {
    simpanAksesKatalog(activePack.id, "starter");
    rekamTransaksiNyata(activePack.title, "Starter (10K)");
    tutupModalPIN();
    tampilkanToast("🎉 AKSES STARTER (10K) TERBUKA!");
    renderDetailItemCards();
  } else if (pinInput && pinInput === vipPIN) {
    simpanAksesKatalog(activePack.id, "vip");
    rekamTransaksiNyata(activePack.title, "VIP (25K)");
    tutupModalPIN();
    tampilkanToast("👑 AKSES VIP (25K) TERBUKA!");
    renderDetailItemCards();
  } else {
    alert("❌ Kode PIN Salah atau belum terdaftar!");
  }
}

function copasPromptFromElement(elementId, packTitle, itemIdx) {
  const el = document.getElementById(elementId);
  if (el) {
    copasPrompt(el.innerText || el.textContent);
    catatLogAktivitas("COPY_PROMPT", packTitle || "Prompt", "Menyalin item #" + (itemIdx || 0));
  }
}

function copasPrompt(text) {
  const watermarkPromo = "\n\n(Dibuat via formula JIWAS Atelier: https://jiwas.com — Akses 100 formula hanya 10K)";
  const fullText = text + watermarkPromo;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullText).then(() => {
      tampilkanToast("✅ PROMPT BERHASIL DISALIN!");
    }).catch(() => {
      fallbackCopyText(fullText);
    });
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
  } catch (err) {
    console.error(err);
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

function bukaPortalAdmin() {
  const inputPin = prompt("Masukkan PIN Akses Admin JIWAS:");
  if (inputPin === null) return;
  if (inputPin.trim().toUpperCase() === "JIWAS99") {
    window.location.href = "analytics.html";
  } else {
    alert("Akses ditolak: PIN salah!");
  }
}