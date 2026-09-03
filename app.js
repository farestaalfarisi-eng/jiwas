// =========================================================================
// JIWAS ATELIER - CORE CLIENT ENGINE & GROWTH OS BEACON (V5 FULL BUNDLING)
// Zero-downtime, Telemetry, Dynamic Friction Handling & Instant Unlock
// =========================================================================

let activePack = null;
let currentCategory = 'all';

// 1. Inisialisasi Aplikasi Saat Memuat Halaman
document.addEventListener("DOMContentLoaded", () => {
  catatKunjunganPengunjung();
  tangkapParameterURLDanMagicLink();
  renderKatalogUtama();
  initGrowthTelemetry();
});

// 2. Registrasi Kunjungan Unik & Frekuensi
function catatKunjunganPengunjung() {
  let visits = parseInt(localStorage.getItem("JIWAS_VISIT_COUNT") || "0", 10);
  visits++;
  localStorage.setItem("JIWAS_VISIT_COUNT", visits.toString());

  catatLogAktivitas("VISIT_PAGE", "Home", `Kunjungan ke-${visits}`);
}

// 3. Tangkap Parameter UTM & Magic Link Pembuka PIN Otomatis
function tangkapParameterURLDanMagicLink() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Tangkap UTM Source
  let utmData = JSON.parse(sessionStorage.getItem("JIWAS_ACTIVE_UTM") || "{}");
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  let hasUtm = false;

  utmKeys.forEach(k => {
    const val = urlParams.get(k);
    if (val) {
      utmData[k] = val;
      hasUtm = true;
    }
  });

  const srcShort = urlParams.get('src');
  if (srcShort && !utmData.utm_source) {
    utmData.utm_source = srcShort;
    hasUtm = true;
  }

  if (hasUtm) {
    sessionStorage.setItem("JIWAS_ACTIVE_UTM", JSON.stringify(utmData));
  }

  // Tangkap Magic Link (Contoh: ?pack=royal-velvet&unlock=starter&pin=VELVET10K)
  const targetPackId = urlParams.get('pack');
  const unlockTier = urlParams.get('unlock');
  const pinCode = urlParams.get('pin');

  if (targetPackId && unlockTier && pinCode) {
    eksekusiMagicLink(targetPackId, unlockTier, pinCode);
  }
}

function eksekusiMagicLink(packId, tier, pinCode) {
  const packs = (typeof KATALOG_REGISTRY !== "undefined") ? KATALOG_REGISTRY : [];
  const target = packs.find(p => p.id === packId);

  if (target) {
    const storageKey = tier === 'vip' ? "TIGAJIWA_UNLOCKED_VIP" : "TIGAJIWA_UNLOCKED_STARTER";
    let unlocked = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!unlocked.includes(target.title)) {
      unlocked.push(target.title);
      localStorage.setItem(storageKey, JSON.stringify(unlocked));
    }

    rekamTransaksiNyata(target.title, tier === 'vip' ? 'VIP (25K)' : 'Starter (10K)');
    catatLogAktivitas("PIN_SUCCESS", target.title, `Aktivasi otomatis via Magic Link (${tier.toUpperCase()})`);
    
    setTimeout(() => {
      bukaDetailKatalog(target.id);
      tampilkanToast(`✨ Selamat! Akses ${target.title} (${tier.toUpperCase()}) berhasil dibuka.`);
    }, 400);
  }
}

// 4. Render Grid Katalog Utama
function renderKatalogUtama() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const packs = (typeof KATALOG_REGISTRY !== "undefined") ? KATALOG_REGISTRY : [];
  const searchVal = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();

  const filtered = packs.filter(p => {
    const matchCat = (currentCategory === 'all') || (p.type === currentCategory);
    const matchSearch = p.title.toLowerCase().includes(searchVal) || 
                        p.desc.toLowerCase().includes(searchVal) ||
                        (p.category && p.category.toLowerCase().includes(searchVal));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">
      <i class="fa-solid fa-box-open" style="font-size:2rem; margin-bottom:10px;"></i><br>
      Tidak ada katalog yang cocok dengan pencarian Anda.
    </div>`;
    return;
  }

  const unlockedStarter = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_STARTER") || "[]");
  const unlockedVIP = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_VIP") || "[]");

  filtered.forEach(p => {
    const isUnlocked = unlockedStarter.includes(p.title) || unlockedVIP.includes(p.title);
    const card = document.createElement("div");
    card.className = "catalog-card";
    
    const thumbImg = (p.images && p.images.length > 0) ? p.images[0] : 'logo-jiwas.png';
    const unlockedBadge = isUnlocked ? `<span class="badge-unlocked"><i class="fa-solid fa-lock-open"></i> TERBUKA</span>` : '';

    card.innerHTML = `
      <div class="card-thumb-wrap" onclick="bukaDetailKatalog('${p.id}')">
        <img src="${thumbImg}" alt="${p.title}" class="card-thumb-img" onerror="this.src='logo-jiwas.png'">
        ${unlockedBadge}
        <span class="card-count-badge">100 FORMULA</span>
      </div>
      <div class="card-info">
        <span class="card-cat-label">${p.type ? p.type.toUpperCase() : 'FOTO AI'}</span>
        <h3 class="card-title" onclick="bukaDetailKatalog('${p.id}')">${p.title}</h3>
        <p class="card-excerpt">${p.desc.substring(0, 85)}...</p>
        <div class="card-footer-action">
          <button class="btn-card-open" onclick="bukaDetailKatalog('${p.id}')">Buka Formula <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 5. Filter & Search Handlers
function filterKategori(catName, btnEl) {
  currentCategory = catName;
  document.querySelectorAll(".cat-pill").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderKatalogUtama();
}

function cariKatalog() {
  renderKatalogUtama();
}

// 6. Buka & Tutup Detail Katalog
function bukaDetailKatalog(packId) {
  const packs = (typeof KATALOG_REGISTRY !== "undefined") ? KATALOG_REGISTRY : [];
  const pack = packs.find(p => p.id === packId);
  if (!pack) return;

  activePack = pack;

  catatLogAktivitas("VIEW_PACK", pack.title, `Membuka detail katalog ${pack.id}`);
  rekamAffinitasKategori(pack.type || 'foto-ai');

  document.getElementById("modalTitle").innerText = pack.title;
  document.getElementById("modalBadgeCat").innerText = (pack.type || "FOTO AI").toUpperCase();
  document.getElementById("modalDesc").innerText = pack.desc;

  const track = document.getElementById("modalImagesTrack");
  track.innerHTML = "";
  if (pack.images && pack.images.length > 0) {
    pack.images.forEach(imgUrl => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.className = "carousel-img";
      img.onerror = () => { img.src = 'logo-jiwas.png'; };
      track.appendChild(img);
    });
  }

  renderPromptItemsDalamModal(pack);
  setupTombolWaModal(pack);

  document.getElementById("detailModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function renderPromptItemsDalamModal(pack) {
  const container = document.getElementById("modalPromptsContainer");
  container.innerHTML = "";

  const unlockedStarter = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_STARTER") || "[]");
  const unlockedVIP = JSON.parse(localStorage.getItem("TIGAJIWA_UNLOCKED_VIP") || "[]");
  const isUnlocked = unlockedStarter.includes(pack.title) || unlockedVIP.includes(pack.title);

  const prompts = pack.prompts || [];

  prompts.forEach((item, idx) => {
    const isFree = idx < 3;
    const box = document.createElement("div");
    box.className = "prompt-item-box";

    if (isFree || isUnlocked) {
      box.innerHTML = `
        <div class="prompt-header-row">
          <span class="prompt-number">FORMULA #${idx + 1} ${isFree ? '(SAMPLE GRATIS)' : '✅'}</span>
          <button class="btn-copy-prompt" onclick="salinTeksPrompt(this, '${escapeHtml(item.text)}')">
            <i class="fa-solid fa-copy"></i> Salin Prompt
          </button>
        </div>
        <p class="prompt-text-body">${item.text}</p>
        <div class="prompt-meta-tag">Parameter: ${item.params || 'Lensa 8K Hasselblad H6D, Studio Lighting'}</div>
      `;
    } else {
      box.classList.add("locked-item");
      box.innerHTML = `
        <div class="prompt-header-row">
          <span class="prompt-number"><i class="fa-solid fa-lock"></i> FORMULA #${idx + 1} (TERKUNCI)</span>
          <button class="btn-unlock-click" onclick="bukaModalAktivasiPIN()">
            <i class="fa-solid fa-key"></i> Buka PIN
          </button>
        </div>
        <p class="prompt-text-blurred">Raw formula confidential parameters: 85mm f/1.4 lens, Rembrandt Lighting setup, photorealistic skin pores, cinematic color grading...</p>
      `;
    }
    container.appendChild(box);
  });
}

function setupTombolWaModal(pack) {
  const waBtn = document.getElementById("btnModalWa");
  const helpWaBtn = document.getElementById("btnHelpWa");
  
  const currentWa = localStorage.getItem("JIWAS_CUSTOM_WA") || 
                    (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6281234567890");

  const utmData = JSON.parse(sessionStorage.getItem("JIWAS_ACTIVE_UTM") || "{}");
  const sourceStr = utmData.utm_source ? `(Sumber: ${utmData.utm_source})` : "";

  const pesan = encodeURIComponent(`Halo Admin JIWAS! Saya ingin membeli kode PIN aktivasi untuk katalog: *${pack.title}*. Mohon info rekening transfer / QRIS nya ya Kak. ${sourceStr}`);
  const waUrl = `https://wa.me/${currentWa}?text=${pesan}`;

  if (waBtn) waBtn.href = waUrl;
  if (helpWaBtn) helpWaBtn.href = waUrl;
}

function tutupDetailModal() {
  document.getElementById("detailModal").classList.add("hidden");
  document.body.style.overflow = "auto";
  activePack = null;
}

function catatKlikWaModal() {
  if (activePack) {
    catatLogAktivitas("CLICK_WA", activePack.title, "Klik tombol Beli via WhatsApp di modal");
  }
}

// 7. Salin Prompt & Toast
function salinTeksPrompt(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    if (activePack) {
      catatLogAktivitas("COPY_PROMPT", activePack.title, "Menyalin teks prompt");
    }
    tampilkanToast("✅ Prompt berhasil disalin ke clipboard!");
  });
}

function tampilkanToast(msg) {
  const t = document.getElementById("toastNotification");
  const m = document.getElementById("toastMessage");
  if (!t || !m) return;
  m.innerText = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 3000);
}

// 8. Sistem Validasi & Aktivasi PIN
function bukaModalAktivasiPIN() {
  const pinInput = document.getElementById("pinInputVal");
  if (pinInput) pinInput.value = "";
  document.getElementById("pinAlertError").classList.add("hidden");
  document.getElementById("pinModal").classList.remove("hidden");
}

function tutupModalPIN() {
  document.getElementById("pinModal").classList.add("hidden");
}

function validasiPIN() {
  if (!activePack) return;
  const inputEl = document.getElementById("pinInputVal");
  const inputPIN = (inputEl ? inputEl.value : "").trim().toUpperCase();

  const customPins = JSON.parse(localStorage.getItem("JIWAS_CUSTOM_PINS") || "{}");
  const default10k = (typeof LIST_PIN_KATALOG !== "undefined" && LIST_PIN_KATALOG[activePack.id]) ? LIST_PIN_KATALOG[activePack.id].pin10k : `${activePack.id.toUpperCase()}10K`;
  const default25k = (typeof LIST_PIN_KATALOG !== "undefined" && LIST_PIN_KATALOG[activePack.id]) ? LIST_PIN_KATALOG[activePack.id].pin25k : `${activePack.id.toUpperCase()}VIP25`;

  const valid10k = customPins[activePack.id]?.pin10k || default10k;
  const valid25k = customPins[activePack.id]?.pin25k || default25k;

  if (inputPIN === valid10k || inputPIN === "JIWAS10K" || inputPIN === "HEMAT5K") {
    berhasilBukaAkses(activePack.title, "TIGAJIWA_UNLOCKED_STARTER", "Starter (10K / Promo)");
  } else if (inputPIN === valid25k || inputPIN === "JIWASVIP") {
    berhasilBukaAkses(activePack.title, "TIGAJIWA_UNLOCKED_VIP", "VIP (25K)");
  } else {
    document.getElementById("pinAlertError").classList.remove("hidden");
  }
}

function berhasilBukaAkses(packTitle, storageKey, tierLabel) {
  let list = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!list.includes(packTitle)) {
    list.push(packTitle);
    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  rekamTransaksiNyata(packTitle, tierLabel);
  catatLogAktivitas("PIN_SUCCESS", packTitle, `Aktivasi sukses paket ${tierLabel}`);

  tutupModalPIN();
  renderPromptItemsDalamModal(activePack);
  renderKatalogUtama();
  tampilkanToast(`🎉 Akses ${tierLabel} terbuka penuh!`);
}

// 9. Logger & Telemetry Beacon Integrator
function catatLogAktivitas(type, target, detail) {
  try {
    let logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
    const d = new Date();
    const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;

    logs.push({
      time: timeStr,
      type: type,
      target: target,
      detail: detail
    });

    if (logs.length > 300) logs.shift();
    localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
  } catch (e) {}

  if (typeof window.emitGrowthOS === "function") {
    let mapped = "cta_click";
    if (type === "VISIT_PAGE") mapped = "page_view";
    if (type === "VIEW_PACK") mapped = "product_view";
    if (type === "CLICK_WA") mapped = "whatsapp_click";
    window.emitGrowthOS(mapped, target, { detail: detail });
  }
}

function rekamAffinitasKategori(cat) {
  try {
    let aff = JSON.parse(localStorage.getItem("JIWAS_USER_AFFINITY") || "{}");
    aff[cat] = (aff[cat] || 0) + 1;
    localStorage.setItem("JIWAS_USER_AFFINITY", JSON.stringify(aff));
  } catch(e) {}
}

function rekamTransaksiNyata(title, tier) {
  localStorage.setItem("JIWAS_LAST_SALES_TITLE", title);
  if (typeof window.emitGrowthOS === "function") {
    const isVip = String(tier).toLowerCase().includes("vip");
    window.emitGrowthOS("purchase", title, {
      tier: isVip ? "vip" : "starter",
      price: isVip ? 25000 : 10000
    });
  }
}

// 10. Growth OS Telemetry Beacon Handler
function initGrowthTelemetry() {
  if (!localStorage.getItem("JIWAS_ANON_SESSION_ID")) {
    const id = "sess_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);
    localStorage.setItem("JIWAS_ANON_SESSION_ID", id);
  }

  window.emitGrowthOS = function(eventName, productId, metadata) {
    try {
      const utmData = JSON.parse(sessionStorage.getItem("JIWAS_ACTIVE_UTM") || "{}");
      const payload = {
        anonymous_session_id: localStorage.getItem("JIWAS_ANON_SESSION_ID"),
        event_name: eventName,
        product_id: productId || "general",
        utm_source: utmData.utm_source || "direct",
        utm_medium: utmData.utm_medium || "organic",
        utm_campaign: utmData.utm_campaign || "none",
        metadata: metadata || {}
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon("http://localhost:4000/api/v1/track", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      }
    } catch(e) {}
  };
}

// 11. Customer Voice Micro-Survey & Dynamic Friction Resolver
let surveyTriggered = false;

document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 5 && !surveyTriggered && !sessionStorage.getItem("JIWAS_SURVEY_DISMISSED")) {
    const modal = document.getElementById("surveyModal");
    if (modal && activePack) {
      document.getElementById("surveyQuestionState")?.classList.remove("hidden");
      document.getElementById("surveySolutionState")?.classList.add("hidden");
      modal.classList.remove("hidden");
      surveyTriggered = true;
    }
  }
});

function tutupSurvey() {
  const m = document.getElementById("surveyModal");
  if (m) m.classList.add("hidden");
  sessionStorage.setItem("JIWAS_SURVEY_DISMISSED", "true");
}

function jawabSurvey(alasan) {
  try {
    let voices = JSON.parse(localStorage.getItem("JIWAS_CUSTOMER_VOICE") || "[]");
    voices.push({
      time: new Date().toISOString(),
      pack: activePack ? activePack.title : "Umum",
      reason: alasan
    });
    localStorage.setItem("JIWAS_CUSTOMER_VOICE", JSON.stringify(voices));
  } catch (e) {}

  const qState = document.getElementById("surveyQuestionState");
  const sState = document.getElementById("surveySolutionState");
  const titleEl = document.getElementById("frictionSolutionTitle");
  const bodyEl = document.getElementById("frictionSolutionBody");
  const actEl = document.getElementById("frictionSolutionAction");

  if (!sState || !titleEl || !bodyEl || !actEl) {
    tutupSurvey();
    return;
  }

  qState.classList.add("hidden");
  sState.classList.remove("hidden");

  const packName = activePack ? activePack.title : "koleksi ini";
  const currentWa = localStorage.getItem("JIWAS_CUSTOM_WA") || 
                    (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6281234567890");

  if (alasan === 'HARGA_BELUM_PAS') {
    titleEl.innerHTML = `<i class="fa-solid fa-tag" style="color:var(--gold-primary);"></i> Penawaran Khusus Untuk Anda!`;
    bodyEl.innerHTML = `Kami ingin Anda merasakan kualitasnya terlebih dahulu.<br><br>Khusus kunjungan ini, dapatkan <strong>100 Formula ${packName}</strong> hanya dengan <strong>Rp 5.000</strong> (Diskon 50%).`;
    actEl.innerHTML = `
      <button class="btn-verify-pin" style="width:100%;" onclick="klaimDiskon5K()">
        <i class="fa-solid fa-ticket"></i> Gunakan Kupon HEMAT5K Sekarang
      </button>
    `;
  } else if (alasan === 'BINGUNG_CARA_PAKAI') {
    titleEl.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color:var(--accent-cyan);"></i> Sangat Mudah (Cuma 10 Detik)!`;
    bodyEl.innerHTML = `
      1. Buka <strong>Bing Image Creator</strong> atau <strong>Gemini</strong> di browser.<br>
      2. Klik tombol <strong>Salin Prompt</strong> pada koleksi ini.<br>
      3. Tempel teksnya dan tekan tombol <strong>Generate</strong>. Selesai!
    `;
    actEl.innerHTML = `
      <button class="btn-action" style="width:100%;" onclick="tutupSurvey()">
        <i class="fa-solid fa-circle-check"></i> Mengerti, Saya Coba Salin Sample Gratis
      </button>
    `;
  } else if (alasan === 'MAU_METODE_BAYAR') {
    titleEl.innerHTML = `<i class="fa-solid fa-qrcode" style="color:#22c55e;"></i> QRIS & Multi-Bank Tersedia!`;
    bodyEl.innerHTML = `Admin kami menyediakan QRIS All-Payment (GoPay, OVO, Dana, ShopeePay, BCA, BRI, Mandiri) dengan konfirmasi instan.`;
    const waText = encodeURIComponent(`Halo Admin JIWAS, saya ingin konfirmasi pembayaran via QRIS / Bank Transfer lain untuk ${packName}.`);
    actEl.innerHTML = `
      <a href="https://wa.me/${currentWa}?text=${waText}" target="_blank" class="btn-cta-wa" style="text-align:center; text-decoration:none;" onclick="tutupSurvey()">
        <i class="fa-brands fa-whatsapp"></i> Chat Admin untuk QRIS Instan
      </a>
    `;
  } else {
    titleEl.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="color:var(--gold-light);"></i> Temukan Koleksi Sempurna Anda`;
    bodyEl.innerHTML = `Ketik tema yang Anda cari di kolom pencarian (misalnya: Hijab, Glamour, Streetwear, Cinematic, atau Family).`;
    actEl.innerHTML = `
      <button class="btn-action" style="width:100%;" onclick="arahkanKeSearch()">
        <i class="fa-solid fa-search"></i> Cari Tema Lain Sekarang
      </button>
    `;
  }
}

function klaimDiskon5K() {
  tutupSurvey();
  bukaModalAktivasiPIN();
  const input = document.getElementById("pinInputVal");
  if (input) {
    input.value = "HEMAT5K";
    input.focus();
  }
  tampilkanToast("🎟️ Kode Kupon HEMAT5K telah terpasang!");
}

function arahkanKeSearch() {
  tutupSurvey();
  tutupDetailModal();
  const sInput = document.getElementById("searchInput");
  if (sInput) {
    sInput.scrollIntoView({ behavior: 'smooth' });
    sInput.focus();
  }
}

function escapeHtml(str) {
  return (str || '').replace(/'/g, "\'").replace(/"/g, '&quot;');
}