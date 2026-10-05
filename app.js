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
let activeCommercialChip = "all";

// -------------------------------------------------------------------------
// DYNAMIC PROMPT MUTATION ENGINE (Anti Reused / Duplicate Content)
// -------------------------------------------------------------------------
const PROMPT_VARIATION_POOLS = {
  lighting: [
    "subtle cinematic rim light with golden hour glow",
    "soft diffused high-key studio light with gentle shadows",
    "dramatic chiaroscuro lighting, deep natural contrast",
    "moody split lighting with subtle amber bounce",
    "pure north window daylight ambiance, editorial look"
  ],
  grading: [
    "subtle Kodak Portra 400 color science, natural skin warmth",
    "cinematic desaturated film tones with clean highlights",
    "Fuji Pro 400H pastel hue fidelity, delicate gradients",
    "subtle bronze and obsidian tones, high-end editorial color grade",
    "clean modern neutral palette, true-to-life color depth"
  ],
  angles: [
    "slight low-angle perspective (12 degrees)",
    "straight-on eye-level intimate framing",
    "gentle high-angle three-quarters composition",
    "dynamic slight off-center alignment with negative space",
    "cinematic Dutch angle micro-tilt (5 degrees)"
  ],
  optics: [
    "Hasselblad H6D-100c, 85mm prime lens f/1.8, shallow depth of field",
    "Sony A7R V, 50mm f/1.4 GM lens, natural optical bokeh",
    "Leica SL3, 90mm APO lens f/2.0, razor-sharp subject isolation",
    "Canon EOS R5, 85mm f/1.2L USM, creamy blurred background"
  ],
  videoMotion: [
    "micro slow push-in dolly movement at 0.6x speed",
    "gentle lateral tracking pan from left to right",
    "static tripod composition with organic focal depth breathing",
    "ultra-slow crane downward pedestal movement"
  ]
};

function getRandomPoolItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomizePromptOutput(basePrompt, isVideo = false) {
  if (!basePrompt || typeof basePrompt !== "string") return basePrompt;
  
  let cleanPrompt = basePrompt.replace(/--ar\s+[0-9:]+/gi, "").trim();

  const lighting = getRandomPoolItem(PROMPT_VARIATION_POOLS.lighting);
  const color = getRandomPoolItem(PROMPT_VARIATION_POOLS.grading);
  const camera = getRandomPoolItem(PROMPT_VARIATION_POOLS.optics);
  const seed = Math.floor(100000 + Math.random() * 900000);

  if (isVideo) {
    const motion = getRandomPoolItem(PROMPT_VARIATION_POOLS.videoMotion);
    return `${cleanPrompt}, ${motion}, ${lighting}, ${color}, 8K HDR, 9:16 vertical orientation --seed ${seed}`;
  }

  const angle = getRandomPoolItem(PROMPT_VARIATION_POOLS.angles);
  return `${cleanPrompt}, ${angle}, ${lighting}, ${color}, captured on ${camera}, authentic skin textures, volumetric atmosphere, 8K ultra-detailed --ar 9:16 --seed ${seed}`;
}

// -------------------------------------------------------------------------
// 1. REGISTRY UTAMA KATALOG ATELIER
// -------------------------------------------------------------------------
const DEFAULT_FALLBACK_KATALOG = [
  { id: "umkm-commercial", folder: "umkm", title: "Commercial UMKM & Product Studio", type: "product", status: "live", rating: "5.0/5", sales: "Baru Rilis" },
  { id: "family-lux", folder: "family", title: "Luxury Family Collection", type: "foto", status: "live", rating: "5.0/5", sales: "200+ Terjual" },
  { id: "family02-lux", folder: "family02", title: "Luxury Family Collection Vol.02", type: "foto", status: "live", rating: "4.9/5", sales: "85+ Terjual" },
  { id: "family03-lux", folder: "family03", title: "Luxury Family Collection Vol.03", type: "foto", status: "live", rating: "4.8/5", sales: "70+ Terjual" },
  { id: "sekolah-yearbook", folder: "sekolah", title: "Yearbook & Formal Identity Studio", type: "product", status: "live", rating: "5.0/5", sales: "Baru Rilis" },
  { id: "retouch-restoration", folder: "retouch", title: "ID Photo & Beauty Restoration", type: "product", status: "live", rating: "4.9/5", sales: "Baru Rilis" },
  { id: "velvet-lux", folder: "velvet", title: "Luxury Royal Velvet Studio", type: "foto", status: "live", rating: "4.9/5", sales: "180+ Terjual" },
  { id: "hijab-lux", folder: "hijab", title: "Luxury Hijab Collection", type: "foto", status: "live", rating: "5.0/5", sales: "210+ Terjual" },
  { id: "couple-cinematic", folder: "couple", title: "Luxury Couple Cinematic", type: "foto", status: "live", rating: "4.8/5", sales: "95+ Terjual" },
  { id: "ceo-lux", folder: "ceo", title: "Luxury CEO & Corporate Executive", type: "foto", status: "live", rating: "4.9/5", sales: "140+ Terjual" },
  { id: "fantasi-gold", folder: "fantasi", title: "Luxury Fantasy Gold", type: "foto", status: "live", rating: "4.9/5", sales: "115+ Terjual" },
  { id: "makeup-glam", folder: "makeup", title: "Luxury Beauty & Makeover", type: "foto", status: "live", rating: "5.0/5", sales: "160+ Terjual" },
  { id: "lifestyle-lux", folder: "lifestyle", title: "Luxury Urban Lifestyle", type: "foto", status: "live", rating: "4.7/5", sales: "50+ Terjual" },
  { id: "video-cinematic", folder: "video", title: "Cinematic Motion Suite", type: "video", status: "live", rating: "5.0/5", sales: "220+ Terjual" },
  { id: "zen-relaxation", folder: "zen-relaxation", title: "Zen & Shinkai Serenity 9:16", type: "video", status: "live", rating: "5.0/5", sales: "Baru Rilis" }
];

function getActiveRegistry() {
  if (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY) && KATALOG_REGISTRY.length > 0) {
    return KATALOG_REGISTRY;
  }
  return DEFAULT_FALLBACK_KATALOG;
}

// -------------------------------------------------------------------------
// BASIS DATA APLIKASI & SOFTWARE DENGAN 3 TINGKATAN HARGA
// -------------------------------------------------------------------------
const DATABASE_APPS = [
  {
    id: "app-media-engine",
    title: "Batch Media & Video Processor Engine",
    kategori: "automation",
    badge: "⚡ DESKTOP TOOL",
    rating: "5.0/5",
    sales: "64+ Terjual",
    desc: "Otomasi kompresi video, resize batch foto, dan split frame dalam hitungan detik tanpa upload cloud.",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41364-large.mp4",
    cover: "images/velvet/cover.jpg",
    variants: [
      { name: "Starter", price: 49000, desc: "1 Lisensi Penggunaan" },
      { name: "Pro Suite", price: 149000, desc: "Full Modul + Free Update" },
      { name: "White-Label", price: 499000, desc: "Source Code + Hak Jual" }
    ]
  },
  {
    id: "app-catalog-generator",
    title: "AI Prompt & Catalog Generator Suite",
    kategori: "web",
    badge: "🔥 WEB APP",
    rating: "4.9/5",
    sales: "42+ Terjual",
    desc: "Web app siap pakai untuk racik ratusan prompt AI foto/video terstruktur dengan formula otomatis.",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41364-large.mp4",
    cover: "images/velvet/cover.jpg",
    variants: [
      { name: "Starter", price: 49000, desc: "Akses Web App Standar" },
      { name: "Pro Suite", price: 149000, desc: "Full Generator + Export CSV" },
      { name: "White-Label", price: 499000, desc: "Source Code Lengkap" }
    ]
  }
];

function getDatabaseApps() {
  return DATABASE_APPS;
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
// BASIS DATA VIDEO ON-DEMAND (VOD)
// -------------------------------------------------------------------------
const DEFAULT_VOD_DATA = [
  {
    id: "JK-05",
    title: "Pesona Putri Duyung Samudra Tropis",
    category: "Pembuka Viral",
    tag: "Latar Quotes / Visual Pembuka Estetik",
    specs: "9:16 • 4K Slow Motion",
    desc: "Putri duyung berenang anggun di celah terumbu karang warna-warni dengan bias cahaya matahari laut jernih.",
    cover: "image_211bee.jpg",
    video: "http://googleusercontent.com/generated_video_content/8368507200011305640",
    harga: "Rp35.000"
  },
  {
    id: "JK-01",
    title: "Rintik Hujan Syahdu di Jendela Malam",
    category: "Curhat & Quotes",
    tag: "Latar Curhat, Doa Malam & Motivasi",
    specs: "9:16 • Musik Hujan",
    desc: "Butiran air hujan menenangkan di kaca kamar dengan kerlip lampu kota malam. Sangat cocok buat latar kata-kata mutiara.",
    cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-raindrops-on-a-window-in-the-city-43183-large.mp4",
    harga: "Rp25.000"
  },
  {
    id: "JK-02",
    title: "Tetesan Emas Pembuka Penasaran",
    category: "Pembuka Viral",
    tag: "Video 3 Detik Pertama (Anti Di-Skip)",
    specs: "9:16 • Slow Motion",
    desc: "Cairan emas kental jatuh memicu cipratan lambat super jernih. Dijamin bikin orang berhenti scrolling di TikTok/Reels.",
    cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-golden-particles-in-water-slow-motion-41804-large.mp4",
    harga: "Rp25.000"
  },
  {
    id: "JK-03",
    title: "Susu Kental Tuang ke Kopi Hitam",
    category: "Dapur & Masakan",
    tag: "Bikin Konten Resep & Minuman Kafe",
    specs: "9:16 • Super Jernih",
    desc: "Pusaran susu putih lembut bercampur kopi pekat. Bikin postingan resep masakan Anda kelihatan seperti bikinan kafe mahal.",
    cover: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-pouring-milk-into-black-coffee-41800-large.mp4",
    harga: "Rp25.000"
  },
  {
    id: "JK-04",
    title: "Botol Elegan di Atas Marmer Basah",
    category: "Mewah & Produk",
    tag: "Iklan Skincare, Parfum & Gamis",
    specs: "9:16 • Estetika Mewah",
    desc: "Kemasan produk berputar anggun dengan sorot lampu lembut. Bikin produk jualan online Anda langsung naik kelas.",
    cover: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-top-shot-of-perfume-bottle-and-flowers-43301-large.mp4",
    harga: "Rp25.000"
  }
];

function getDatabaseVod() {
  try {
    const customVod = localStorage.getItem("jiwas_katalog_data");
    if (customVod) {
      const parsed = JSON.parse(customVod);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return DEFAULT_VOD_DATA;
}

let activeVodFilter = 'all';

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
  renderHomeCommercialPreview();
  renderHomeDigitalAi();
  renderAtelierFeed();
  renderKatalogFoto();
  renderKatalogVideo();
  renderKatalogVod();
  renderKatalogAkun();
  renderAiAccountCategories();
  initGlobalClickListener();
  cekAutoUnlockURL();
  renderHomeSoftwarePreview();
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

function toggleCardDropdownMenu(packId, btnEl) {
  document.querySelectorAll(".card-dropdown-menu").forEach(el => {
    if (el.id !== `cardDropdown_${packId}`) {
      el.classList.add("hidden");
    }
  });
  const targetMenu = document.getElementById(`cardDropdown_${packId}`);
  if (targetMenu) {
    targetMenu.classList.toggle("hidden");
  }
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

let activeSharePack = null;

function bukaModalShareSosmed(packTitle, packFolder, packId) {
  document.querySelectorAll(".card-dropdown-menu").forEach(el => el.classList.add("hidden"));
  activeSharePack = { title: packTitle, folder: packFolder, id: packId };

  let modal = document.getElementById("jiwasShareModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "jiwasShareModal";
    modal.className = "modal-overlay hidden";
    modal.innerHTML = `
      <div class="modal-content" style="max-width:390px; text-align:left; padding:20px; background:#0f0f15; border:1px solid rgba(212,175,55,0.3); border-radius:12px; position:relative; box-shadow:0 10px 30px rgba(0,0,0,0.9);">
        <button class="btn-modal-close" onclick="tutupModalShareSosmed()" aria-label="Tutup" style="position:absolute; top:12px; right:12px; background:none; border:none; color:#9ca3af; font-size:1.1rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
        <span class="badge-pill" style="margin-bottom:8px; display:inline-block; font-size:0.62rem; background:rgba(212,175,55,0.15); color:var(--gold-light); border:1px solid rgba(212,175,55,0.3);">MULTI-CHANNEL SHARE</span>
        <h3 id="jiwasShareModalTitle" style="font-family:'Cinzel', serif; color:var(--gold-light); font-size:1.05rem; margin-bottom:4px; line-height:1.3;">Bagikan Koleksi</h3>
        <p style="font-size:0.72rem; color:var(--text-muted); margin-bottom:14px;">Pilih saluran media sosial atau pasar untuk mempromosikan katalog ini:</p>
        
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin-bottom:16px;">
          <button onclick="eksekusiShareTarget('wa')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-whatsapp" style="font-size:1.4rem; color:#22c55e;"></i>
            <span style="font-size:0.68rem;">WhatsApp</span>
          </button>
          <button onclick="eksekusiShareTarget('fb')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-facebook" style="font-size:1.4rem; color:#1877f2;"></i>
            <span style="font-size:0.68rem;">Facebook</span>
          </button>
          <button onclick="eksekusiShareTarget('telegram')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-telegram" style="font-size:1.4rem; color:#0088cc;"></i>
            <span style="font-size:0.68rem;">Telegram</span>
          </button>
          <button onclick="eksekusiShareTarget('x')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-x-twitter" style="font-size:1.4rem; color:#fff;"></i>
            <span style="font-size:0.68rem;">X / Twitter</span>
          </button>
          <button onclick="eksekusiShareTarget('ig')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-instagram" style="font-size:1.4rem; color:#e1306c;"></i>
            <span style="font-size:0.68rem;">Instagram</span>
          </button>
          <button onclick="eksekusiShareTarget('shopee')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-solid fa-bag-shopping" style="font-size:1.4rem; color:#ee4d2d;"></i>
            <span style="font-size:0.68rem;">Shopee</span>
          </button>
          <button onclick="eksekusiShareTarget('tokopedia')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-solid fa-store" style="font-size:1.4rem; color:#03ac0e;"></i>
            <span style="font-size:0.68rem;">Tokopedia</span>
          </button>
          <button onclick="eksekusiShareTarget('tiktok')" style="display:flex; flex-direction:column; align-items:center; gap:5px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 4px; color:#fff; cursor:pointer;">
            <i class="fa-brands fa-tiktok" style="font-size:1.4rem; color:#ff0050;"></i>
            <span style="font-size:0.68rem;">TikTok</span>
          </button>
        </div>

        <div style="background:rgba(255,255,255,0.02); border:1px dashed rgba(212,175,55,0.25); border-radius:8px; padding:10px; margin-bottom:12px; display:flex; gap:10px; align-items:center;">
          <img id="jiwasShareThumb" src="images/velvet/cover.jpg" alt="Cover" style="width:48px; height:64px; object-fit:cover; border-radius:4px; border:1px solid rgba(212,175,55,0.3);">
          <div style="flex:1;">
            <div style="font-size:0.72rem; color:var(--gold-light); font-weight:700;">Unduh Lembar Gambar:</div>
            <div style="font-size:0.65rem; color:#9ca3af; margin-bottom:6px;">Simpan cover resolusi tinggi untuk diposting langsung.</div>
            <a id="jiwasShareDownloadBtn" href="images/velvet/cover.jpg" download class="btn-copy" style="font-size:0.65rem; padding:4px 8px; display:inline-flex; align-items:center; gap:4px; text-decoration:none;">
              <i class="fa-solid fa-download"></i> Unduh Gambar
            </a>
          </div>
        </div>

        <button onclick="eksekusiShareTarget('copy_all')" class="btn-copy" style="width:100%; justify-content:center; background:var(--gold-gradient); color:#000; font-weight:800; font-size:0.75rem; padding:8px 12px;">
          <i class="fa-solid fa-copy"></i> Salin Deskripsi Promo + Tautan
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById("jiwasShareModalTitle");
  const thumbEl = document.getElementById("jiwasShareThumb");
  const dlBtn = document.getElementById("jiwasShareDownloadBtn");
  
  if (titleEl) titleEl.innerText = packTitle;
  const imagePath = `images/${packFolder}/cover.jpg`;
  if (thumbEl) thumbEl.src = imagePath;
  if (dlBtn) {
    dlBtn.href = imagePath;
    dlBtn.download = `${packFolder}-cover.jpg`;
  }

  modal.classList.remove("hidden");
}

function tutupModalShareSosmed() {
  const modal = document.getElementById("jiwasShareModal");
  if (modal) modal.classList.add("hidden");
}

function eksekusiShareTarget(channel) {
  if (!activeSharePack) return;
  const currentUrl = `${window.location.origin}${window.location.pathname}?pack=${encodeURIComponent(activeSharePack.id)}`;
  const promoText = `🔥 Formula Foto Studio & Video AI: *${activeSharePack.title}* di JIWAS Atelier.\n\nKualitas 8K Masterpiece siap pakai langsung. Cek detail formula dan katalog lengkap di sini:\n${currentUrl}`;

  catatLogAktivitas("SHARE_CHANNEL", activeSharePack.title, channel.toUpperCase());

  if (channel === 'wa') {
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(promoText), "_blank");
  } else if (channel === 'fb') {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(currentUrl), "_blank");
  } else if (channel === 'telegram') {
    window.open("https://t.me/share/url?url=" + encodeURIComponent(currentUrl) + "&text=" + encodeURIComponent(`🔥 Formula Studio AI: ${activeSharePack.title}`), "_blank");
  } else if (channel === 'x') {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(promoText), "_blank");
  } else if (channel === 'ig' || channel === 'tiktok' || channel === 'shopee' || channel === 'tokopedia') {
    copasPrompt(promoText);
    tampilkanToast(`✅ Teks promo tersalin! Silakan paste pada postingan / deskripsi produk ${channel.toUpperCase()}.`);
  } else if (channel === 'copy_all') {
    copasPrompt(promoText);
    tampilkanToast("✅ Teks promosi & link lengkap tersalin!");
  }
}

async function bagikanKoleksiUniversal(packTitle, packFolder, packId) {
  bukaModalShareSosmed(packTitle, packFolder, packId);
}

function requestFormulaOnDemand(catalogTitle, itemTitle, itemIdx) {
  catatLogAktivitas("REQUEST_ONDEMAND", catalogTitle, `Item #${itemIdx}: ${itemTitle}`);
  const waNumber = getAdminWhatsAppNumber();
  const pesan = `Halo Admin JIWAS,%0A%0ASaya tertarik dan ingin me-request formula khusus untuk tema berikut:%0A- Katalog: *${catalogTitle}*%0A- Konsep/Judul: *#${itemIdx}. ${itemTitle}*%0A%0AMohon info cara pemesanan dan proses pengerjaan formulanya. Terima kasih!`;
  window.open("https://wa.me/" + waNumber + "?text=" + pesan, "_blank");
}

// -------------------------------------------------------------------------
// FITUR BAGIKAN PROMOSI SOSMED PRODUK AKUN AI
// -------------------------------------------------------------------------
function bagikanPromoProdukAkun(productId) {
  const accounts = getDatabaseAkun();
  const item = accounts.find(p => String(p.id) === String(productId));
  if (!item) return;

  const currentUrl = window.location.origin + window.location.pathname + `?tab=akun&product=${encodeURIComponent(item.id)}`;
  const namaProduk = item.nama || item.name || "Akun AI Premium";
  
  let infoHarga = "";
  if (item.variants && item.variants.length > 0) {
    const listHarga = item.variants.filter(v => v.stock !== 0 && v.ready !== false);
    if (listHarga.length > 0) {
      infoHarga = `Mulai Rp${Number(listHarga[0].price).toLocaleString("id-ID")}`;
    }
  }
  if (!infoHarga && item.hargaPromo) {
    infoHarga = `Hanya Rp${Number(item.hargaPromo).toLocaleString("id-ID")}`;
  }

  const shareTitle = `⚡ Promo Spesial: ${namaProduk} - JIWAS Digital Store`;
  const shareText = `Dapatkan akses resmi & bergaransi untuk ${namaProduk} (${infoHarga}). Aktivasi instan tanpa kartu kredit!\n\nCek katalog lengkapnya di sini:`;

  catatLogAktivitas("SHARE_PRODUCT", namaProduk, "Sosmed Share");

  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: `${shareText}\n${currentUrl}`,
      url: currentUrl
    }).catch(() => {});
  } else {
    const fullPromoText = `${shareTitle}\n\n${shareText}\n${currentUrl}`;
    copasPrompt(fullPromoText);
    tampilkanToast("✅ Teks promosi & link tersalin! Siap diposting ke sosmed.");
  }
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
          <img src="${item.before}" alt="Before" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
          <span class="badge-tag-side tag-before">BEFORE</span>
        </div>
        <div class="ba-half-view">
          <img src="${item.after}" alt="After" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
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

      let mediaHTML = "";
      if (isVideo) {
        mediaHTML = `
          <img 
            src="videos/${pack.folder}/${idx}.jpg" 
            alt="Item ${idx}" 
            class="aspect-9-16 img-loaded" 
            loading="eager" 
            style="width:100%; height:100%; object-fit:cover; display:block; opacity:1 !important;"
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');"
          >
        `;
      } else {
        let targetImgName = `${idx}.jpg`;
        let imgSrc = `images/${pack.folder}/${targetImgName}`;
        mediaHTML = `
          <img 
            src="${imgSrc}" 
            loading="eager" 
            alt="Item ${idx}" 
            class="img-loaded" 
            style="opacity:1 !important;" 
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
          >
        `;
      }

      card.innerHTML = `
        ${freeBadge}
        ${mediaHTML}
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
    const map = { atelier: 'tabBtnAtelier', foto: 'tabBtnFoto', video: 'tabBtnVideo', vod: 'tabBtnVod', akun: 'tabBtnAkun' };
    const targetBtn = document.getElementById(map[tabType]);
    if (targetBtn) targetBtn.classList.add("active");
  }

  const secAtelier = document.getElementById("sectionAtelier");
  const secFoto = document.getElementById("sectionFotoAI");
  const secVideo = document.getElementById("sectionVideoAI");
  const secVod = document.getElementById("sectionVodAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");
  const secComm = document.getElementById("sectionCommercialStudio");
  const secApps = document.getElementById("sectionAppsStudio");
  const heroHeader = document.getElementById("atelierMainHeader");

  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secVod) secVod.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secDetail) secDetail.classList.add("hidden");
  if (secComm) secComm.classList.add("hidden");
  if (secApps) secApps.classList.add("hidden");

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
  if (tabType === 'vod' && secVod) {
    secVod.classList.remove("hidden");
    renderKatalogVod();
  }
  if (tabType === 'akun' && secAkun) {
    secAkun.classList.remove("hidden");
    renderKatalogAkun();
    renderAiAccountCategories();
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

  const studioPacks = getActiveRegistry().filter(item => 
    item.type !== "digital" && 
    item.status === "live" &&
    item.type !== "product" &&
    !item.id.includes("umkm") &&
    !item.id.includes("sekolah") &&
    !item.id.includes("retouch")
  );
  
  studioPacks.forEach(item => {
    let badgeText = '📸 100 PROMPT';
    let mediaDisplayHTML = "";

   if (item.type === 'video') {
      badgeText = (item.workflow === "frame-to-frame") ? '🎞️ DUAL FRAME (36)' : '🎥 VIDEO AI (30)';
      
      const videoCoverMp4 = `videos/${item.folder}/cover.mp4`;
      const imageCoverJpg = item.coverUrl || `videos/${item.folder}/cover.jpg`;

      // HANYA RENDER GAMBAR COVER DI AWAL (Zero Video Memory)
      mediaDisplayHTML = `
        <div class="video-lazy-container aspect-9-16" data-video="${videoCoverMp4}">
          <img 
            src="${imageCoverJpg}" 
            alt="${item.title}" 
            class="aspect-9-16 img-loaded" 
            loading="lazy" 
            decoding="async"
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
          >
        </div>
      `;
    } else {
      let coverSrc = item.coverUrl || `images/${item.folder}/cover.jpg`;
      mediaDisplayHTML = `
        <img src="${coverSrc}" alt="${item.title}" class="aspect-9-16" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      `;
    }

    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(item);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill">${badgeText}</span>
        <div class="card-menu-container" style="position:absolute; top:8px; right:8px; z-index:10;">
          <button class="btn-card-menu" onclick="event.stopPropagation(); toggleCardDropdownMenu('${item.id}', this)" aria-label="Menu Pilihan" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div id="cardDropdown_${item.id}" class="card-dropdown-menu hidden" style="position:absolute; right:0; top:32px; background:#12121a; border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:6px; min-width:160px; box-shadow:0 8px 20px rgba(0,0,0,0.8); z-index:20;">
            <button onclick="event.stopPropagation(); bukaModalShareSosmed('${item.title}', '${item.folder}', '${item.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-share-nodes" style="color:#38bdf8;"></i> Bagikan Sosmed / Pasar
            </button>
            <button onclick="event.stopPropagation(); copasPrompt('${window.location.origin + window.location.pathname}?pack=${item.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-link" style="color:var(--gold-light);"></i> Salin Tautan
            </button>
          </div>
        </div>
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
    aktivasiLazyVideoObserver();
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
    const vList = acc.variants || [];

   let variantButtonsHTML = "";
    if (vList.length > 0) {
      variantButtonsHTML = `
        <div style="display:flex; gap:6px; margin:8px 0;">
          ${vList.map((v, i) => {
            const isOutOfStock = v.stock === 0 || v.ready === false;
            if (isOutOfStock) {
              return `
                <button class="btn-quick-copy btn-out-of-stock" disabled>
                  ${v.name}<br><strong>Habis</strong>
                </button>
              `;
            }
            return `
              <button class="btn-quick-copy" style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem; ${i === 0 ? 'border-color:#38bdf8; color:#38bdf8;' : 'border-color:var(--gold-primary); color:var(--gold-light);'}" 
                onclick="eksekusiOrderAkun('${acc.id}', '${v.name}')">
                ${v.name}<br><strong>Rp${Number(v.price).toLocaleString('id-ID')}</strong>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${acc.badge || '⚡ AUTO BOT'}</span>
        <img src="${imgSrc}" alt="${acc.nama}" class="aspect-1-1" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <div>
          <h3 class="card-title">${acc.nama}</h3>
          <div class="card-rating-badge" style="color:#22c55e;"><i class="fa-solid fa-bolt"></i> Siap Pakai Instan</div>
          ${variantButtonsHTML}
        </div>
        <button class="btn-share-promo" style="width:100%; margin-top:6px;" onclick="bagikanPromoProdukAkun('${acc.id}')">
          <i class="fa-solid fa-share-nodes"></i> Bagikan Promo
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderKatalogFoto() {
  const container = document.getElementById("gridFotoKatalog");
  if (!container) return;
  container.innerHTML = "";
  
  const list = getActiveRegistry().filter(item => 
    item.type === "foto" && 
    item.status === "live" &&
    !item.id.includes("umkm") &&
    !item.id.includes("sekolah") &&
    !item.id.includes("retouch")
  );

  list.forEach(pack => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    const coverSrc = pack.coverUrl || `images/${pack.folder}/cover.jpg`;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-foto">📸 ${pack.totalItems || 100} ITEMS</span>
        <div class="card-menu-container" style="position:absolute; top:8px; right:8px; z-index:10;">
          <button class="btn-card-menu" onclick="event.stopPropagation(); toggleCardDropdownMenu('${pack.id}', this)" aria-label="Menu Pilihan" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div id="cardDropdown_${pack.id}" class="card-dropdown-menu hidden" style="position:absolute; right:0; top:32px; background:#12121a; border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:6px; min-width:160px; box-shadow:0 8px 20px rgba(0,0,0,0.8); z-index:20;">
            <button onclick="event.stopPropagation(); bukaModalShareSosmed('${pack.title}', '${pack.folder}', '${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-share-nodes" style="color:#38bdf8;"></i> Bagikan Sosmed / Pasar
            </button>
            <button onclick="event.stopPropagation(); copasPrompt('${window.location.origin + window.location.pathname}?pack=${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-link" style="color:var(--gold-light);"></i> Salin Tautan
            </button>
          </div>
        </div>
        <img src="${coverSrc}" alt="${pack.title}" class="aspect-9-16" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
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
    const isFrameToFrame = (pack.workflow === "frame-to-frame");
    const badgeText = isFrameToFrame ? '🎞️ DUAL FRAME (36)' : '🎥 VIDEO SUITE (30)';
    const btnText = isFrameToFrame ? 'Buka 36 Dual Frame' : 'Buka 36 Video Formula';

    const videoCoverMp4 = `videos/${pack.folder}/cover.mp4`;
    const imageCoverJpg = pack.coverUrl || `videos/${pack.folder}/cover.jpg`;

    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill badge-video">${badgeText}</span>
        <div class="card-menu-container" style="position:absolute; top:8px; right:8px; z-index:10;">
          <button class="btn-card-menu" onclick="event.stopPropagation(); toggleCardDropdownMenu('${pack.id}', this)" aria-label="Menu Pilihan" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div id="cardDropdown_${pack.id}" class="card-dropdown-menu hidden" style="position:absolute; right:0; top:32px; background:#12121a; border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:6px; min-width:160px; box-shadow:0 8px 20px rgba(0,0,0,0.8); z-index:20;">
            <button onclick="event.stopPropagation(); bukaModalShareSosmed('${pack.title}', '${pack.folder}', '${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-share-nodes" style="color:#38bdf8;"></i> Bagikan Sosmed / Pasar
            </button>
            <button onclick="event.stopPropagation(); copasPrompt('${window.location.origin + window.location.pathname}?pack=${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-link" style="color:var(--gold-light);"></i> Salin Tautan
            </button>
          </div>
        </div>
        
        <!-- COVER IMAGE PERTAMA, VIDEO AKAN DIINJEKSI KETIKA DEKAT LAYAR -->
        <div class="video-lazy-container aspect-9-16" data-video="${videoCoverMp4}">
          <img 
            src="${imageCoverJpg}" 
            alt="${pack.title}" 
            class="aspect-9-16 img-loaded" 
            loading="lazy" 
            decoding="async"
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
          >
        </div>
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge">★ ${pack.rating || '5.0/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">${btnText}</button>
      </div>
    `;
    container.appendChild(card);
  });
    aktivasiLazyVideoObserver();
}

// -------------------------------------------------------------------------
// RENDER KATALOG VOD (VIDEO ON-DEMAND)
// -------------------------------------------------------------------------
function renderKatalogVod(filterKey = "") {
  const container = document.getElementById("gridVodKatalog");
  if (!container) return;
  container.innerHTML = "";

  let list = getDatabaseVod();

  const countLabel = document.getElementById("vodItemCountLabel") || document.getElementById("itemCountLabel");
  if (countLabel) {
    countLabel.textContent = `Tersedia ${list.length} pilihan video siap pakai`;
  }

  if (activeVodFilter !== "all") {
    list = list.filter(item => item.category === activeVodFilter);
  }
  if (filterKey.trim() !== "") {
    const q = filterKey.toLowerCase();
    list = list.filter(item => 
      (item.title + " " + item.desc + " " + item.tag + " " + item.id).toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">Belum ada video pada kategori ini.</div>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.innerHTML = `
      <div style="position:relative; width:100%; aspect-ratio:9/16; overflow:hidden; cursor:pointer;" onclick="bukaModalPlayerVod('${item.video}')">
        <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${item.specs || '9:16 HD'}</span>
        <img 
          src="${item.cover}" 
          alt="${item.title}" 
          class="aspect-9-16 img-loaded" 
          loading="eager" 
          style="width:100%; height:100%; object-fit:cover; display:block;"
          onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
        >
        <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.65); border:1px solid rgba(212,175,55,0.4); border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center;">
          <i class="fa-solid fa-play" style="color:var(--gold-primary); font-size:0.75rem; margin-left:2px;"></i>
        </div>
      </div>
      <div class="card-info">
        <div>
          <span style="font-size:0.65rem; color:var(--gold-light); font-weight:700;">${item.tag || 'VIDEO READY'}</span>
          <h3 class="card-title" style="margin-top:2px;">${item.title}</h3>
          <p style="font-size:0.68rem; color:#9ca3af; margin-top:3px; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${item.desc}</p>
        </div>
        <div style="margin-top:8px;">
          <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-bottom:6px;">${item.harga || 'Rp25.000'} <span style="font-size:0.65rem; color:#9ca3af; font-weight:normal;">/ file MP4</span></div>
          <div style="display:flex; gap:6px;">
            <button class="btn-copy" style="flex:1; justify-content:center; padding:6px 4px; font-size:0.7rem;" onclick="bukaModalPlayerVod('${item.video}')">
              <i class="fa-solid fa-play"></i> Putar
            </button>
            <button class="btn-copy" style="flex:1.2; justify-content:center; background:var(--gold-gradient); color:#000; font-weight:800; padding:6px 4px; font-size:0.7rem;" onclick="bukaModalCheckout('${item.title}', 'File Video HD Tanpa Watermark', '${item.harga || 'Rp25.000'}')">
              <i class="fa-solid fa-download"></i> Ambil File
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterVodByChip(catName, btnEl) {
  document.querySelectorAll("#vodCategoryChips .ai-chip").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  activeVodFilter = catName;
  renderKatalogVod();
}

function filterVodLive(keyword) {
  renderKatalogVod(keyword);
}

function bukaModalUploadVod() {
  const m = document.getElementById("vodAddModal");
  if (m) m.classList.remove("hidden");
}

function tutupModalUploadVod() {
  const m = document.getElementById("vodAddModal");
  if (m) m.classList.add("hidden");
}

function autofillContohVod() {
  const titleEl = document.getElementById("addVodTitle");
  const catEl = document.getElementById("addVodCategory");
  const priceEl = document.getElementById("addVodHarga");
  const tagEl = document.getElementById("addVodTag");
  const descEl = document.getElementById("addVodDesc");
  const coverEl = document.getElementById("addVodCoverUrl");
  const videoEl = document.getElementById("addVodVideoUrl");

  if (titleEl) titleEl.value = "Pesona Putri Duyung Samudra Tropis";
  if (catEl) catEl.value = "Pembuka Viral";
  if (priceEl) priceEl.value = "Rp35.000";
  if (tagEl) tagEl.value = "Latar Quotes / Visual Pembuka Estetik";
  if (descEl) descEl.value = "Putri duyung berenang anggun di celah terumbu karang warna-warni dengan bias cahaya laut jernih.";
  if (coverEl) coverEl.value = "image_211bee.jpg";
  if (videoEl) videoEl.value = "http://googleusercontent.com/generated_video_content/8368507200011305640";
}

function handleUploadVod(e) {
  e.preventDefault();
  const catalog = getDatabaseVod();
  const newId = "JK-" + String(catalog.length + 1).padStart(2, "0");

  const coverFileInput = document.getElementById("addVodCoverFile");
  const videoFileInput = document.getElementById("addVodVideoFile");

  let finalCover = document.getElementById("addVodCoverUrl")?.value.trim() || "";
  let finalVideo = document.getElementById("addVodVideoUrl")?.value.trim() || "";

  if (coverFileInput && coverFileInput.files && coverFileInput.files[0]) {
    finalCover = URL.createObjectURL(coverFileInput.files[0]);
  }
  if (videoFileInput && videoFileInput.files && videoFileInput.files[0]) {
    finalVideo = URL.createObjectURL(videoFileInput.files[0]);
  }

  if (!finalVideo) {
    alert("Silakan pilih file video MP4 atau masukkan link URL video terlebih dahulu!");
    return;
  }

  const newItem = {
    id: newId,
    title: document.getElementById("addVodTitle")?.value.trim() || "Video Siap Pakai",
    category: document.getElementById("addVodCategory")?.value || "Curhat & Quotes",
    tag: document.getElementById("addVodTag")?.value.trim() || "VIDEO READY",
    specs: "9:16 • 4K Slow Motion",
    desc: document.getElementById("addVodDesc")?.value.trim() || "",
    cover: finalCover || "images/velvet/cover.jpg",
    video: finalVideo,
    harga: document.getElementById("addVodHarga")?.value.trim() || "Rp25.000"
  };

  catalog.unshift(newItem);
  localStorage.setItem("jiwas_katalog_data", JSON.stringify(catalog));

  catatLogAktivitas("UPLOAD_VOD", newItem.title, newItem.category);
  tampilkanToast("🎉 Video berhasil ditambahkan ke etalase!");

  document.getElementById("vodUploadForm")?.reset();
  tutupModalUploadVod();
  renderKatalogVod();
}

function bukaModalPlayerVod(videoUrl) {
  const modal = document.getElementById("vodPlayerModal");
  const player = document.getElementById("vodPlayerModalMedia");
  if (modal && player) {
    player.src = videoUrl;
    modal.classList.remove("hidden");
    player.play();
  }
}

function tutupModalPlayerVod() {
  const modal = document.getElementById("vodPlayerModal");
  const player = document.getElementById("vodPlayerModalMedia");
  if (modal && player) {
    player.pause();
    player.src = "";
    modal.classList.add("hidden");
  }
}

function bukaModalRequestVod() {
  const m = document.getElementById("vodRequestModal");
  if (m) m.classList.remove("hidden");
}

function tutupModalRequestVod() {
  const m = document.getElementById("vodRequestModal");
  if (m) m.classList.add("hidden");
}

function kirimRequestVodWA(e) {
  e.preventDefault();
  const name = document.getElementById("vodReqName")?.value || "";
  const cat = document.getElementById("vodReqCat")?.value || "";
  const desc = document.getElementById("vodReqDesc")?.value || "";

  catatLogAktivitas("REQUEST_VOD_CUSTOM", cat, name);
  const wa = getAdminWhatsAppNumber();
  const text = `Halo Admin JIWAS, saya mau pesan video on-demand custom:%0A%0A` +
               `• *Nama/Medsos:* ${encodeURIComponent(name)}%0A` +
               `• *Kebutuhan:* ${encodeURIComponent(cat)}%0A` +
               `• *Ide Konsep Video:*%0A${encodeURIComponent(desc)}%0A%0A` +
               `Mohon info estimasi biaya dan waktu pengerjaannya ya. Terima kasih!`;
  window.open(`https://wa.me/${wa}?text=${text}`, "_blank");
  tutupModalRequestVod();
}

function renderKatalogAkun(filteredList) {
  const container = document.getElementById("aiAccountCatalogGrid") || document.getElementById("gridAkunKatalog") || document.getElementById("gridAkunAI");
  if (!container) return;
  container.innerHTML = "";

  const accounts = filteredList || getDatabaseAkun();

  if (accounts.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">Belum ada akun AI yang aktif di kategori ini.</div>';
    return;
  }

  accounts.forEach(acc => {
    const card = document.createElement("div");
    card.className = "catalog-card card-square-ai";

    const imgSrc = acc.logo || acc.cover || `images/canvas/${acc.id || 'canva'}.jpg`;
    const vList = acc.variants || [];

   let variantButtonsHTML = "";
    if (vList.length > 0) {
      variantButtonsHTML = `
        <div style="display:flex; gap:6px; margin:8px 0;">
          ${vList.map((v, i) => {
            const isOutOfStock = v.stock === 0 || v.ready === false;
            if (isOutOfStock) {
              return `
                <button class="btn-quick-copy btn-out-of-stock" disabled>
                  ${v.name}<br><strong>Habis</strong>
                </button>
              `;
            }
            return `
              <button class="btn-quick-copy" style="flex:1; justify-content:center; padding:5px 2px; font-size:0.68rem; ${i === 0 ? 'border-color:#38bdf8; color:#38bdf8;' : 'border-color:var(--gold-primary); color:var(--gold-light);'}" 
                onclick="eksekusiOrderAkun('${acc.id}', '${v.name}')">
                ${v.name}<br><strong>Rp${Number(v.price).toLocaleString('id-ID')}</strong>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${acc.badge || '⚡ RESMI'}</span>
        <img src="${imgSrc}" alt="${acc.nama}" class="aspect-1-1" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <div>
          <h3 class="card-title">${acc.nama}</h3>
          <div class="card-rating-badge" style="color:#38bdf8;"><i class="fa-solid fa-check-circle"></i> Ready Stok</div>
          <div style="font-size:0.75rem; color:#9ca3af; margin:4px 0; line-height:1.3;">${acc.deskripsi || ''}</div>
        </div>
        ${variantButtonsHTML}
        <button class="btn-share-promo" style="width:100%; margin-top:6px;" onclick="bagikanPromoProdukAkun('${acc.id}')">
          <i class="fa-solid fa-share-nodes"></i> Bagikan Promo
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// RENDER KATEGORI CHIP AKUN AI
// -------------------------------------------------------------------------
function renderAiAccountCategories() {
  const container = document.getElementById("aiCategoriesContainer");
  if (!container) return;

  const categories = [
    { key: "all", label: "Semua Akun AI" },
    { key: "Design", label: "🎨 Desain & Gambar" },
    { key: "Video", label: "🎬 Video Motion" },
    { key: "AI", label: "🤖 AI & Smart Tools" },
    { key: "Produktivitas", label: "⚡ Produktivitas & Streaming" }
  ];

  container.innerHTML = categories.map((cat, idx) => `
    <button class="ai-chip ${idx === 0 ? 'active' : ''}" onclick="filterAiAccountByCategory('${cat.key}', this)">
      ${cat.label}
    </button>
  `).join("");
}

function filterAiAccountByCategory(categoryKey, btnEl) {
  document.querySelectorAll(".ai-chip").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const cleanCat = (categoryKey || "").toLowerCase();
  const allAccounts = getDatabaseAkun();

  if (cleanCat === "all") {
    renderKatalogAkun(allAccounts);
    return;
  }

  const categoryFiltered = allAccounts.filter(item => {
    const itemCat = (item.kategori || "").toLowerCase();
    const itemSub = (item.subKategori || "").toLowerCase();
    return itemCat.includes(cleanCat) || itemSub.includes(cleanCat);
  });

  renderKatalogAkun(categoryFiltered);
}

function eksekusiOrderAkun(productId, variantName) {
  const list = getDatabaseAkun();
  const target = list.find(p => String(p.id) === String(productId));
  const pName = target ? (target.nama || target.name) : "Akun AI";
  
  let hargaTeks = "Rp15.000";
  if (target && target.variants && Array.isArray(target.variants)) {
    const vObj = target.variants.find(v => v.name.toLowerCase().includes(variantName.toLowerCase()));
    if (vObj && vObj.price) {
      hargaTeks = `Rp${Number(vObj.price).toLocaleString("id-ID")}`;
    }
  } else if (target && (target.hargaPromo || target.harga)) {
    hargaTeks = `Rp${Number(target.hargaPromo || target.harga).toLocaleString("id-ID")}`;
  }

  bukaModalCheckout(pName, variantName, hargaTeks);
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
  const secVod = document.getElementById("sectionVodAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");
  const secComm = document.getElementById("sectionCommercialStudio");
  const heroHeader = document.getElementById("atelierMainHeader");

  if (heroHeader) heroHeader.classList.add("hidden");
  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secVod) secVod.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secComm) secComm.classList.add("hidden");
  if (secDetail) secDetail.classList.remove("hidden");

  const isThirtyBundle = (pack.type === 'video');
  const totalCount = pack.totalItems || (isThirtyBundle ? 30 : 100);

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

  const faceLockBox = document.getElementById("facialLockDetailBox");
  if (faceLockBox) {
    faceLockBox.style.display = (pack.type === 'foto') ? "block" : "none";
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
  
  if (activePack && (activePack.type === "product" || activePack.id.includes("umkm") || activePack.id.includes("sekolah") || activePack.id.includes("retouch"))) {
    bukaHalamanKomersial();
  } else {
    switchMainTab('atelier', document.getElementById('tabBtnAtelier'));
  }
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
  const isFrameToFrame = (activePack.workflow === "frame-to-frame");
  const cleanFolder = activePack.folder.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  const varName = activePack.promptVarName || `PROMPTS_${cleanFolder}`;
  const promptArray = (window[varName] && Array.isArray(window[varName])) ? window[varName] : null;

  const totalItems = promptArray ? promptArray.length : (activePack.totalItems || (isVideo ? 30 : 100));

  for (let i = 1; i <= totalItems; i++) {
    const raw = (promptArray && promptArray[i - 1]) ? promptArray[i - 1] : null;
    
    let isOnDemand = false;
    let itemTitle = `${activePack.title} #${i}`;
    let itemBadge = "";
    let itemDesc = "";
    let promptText = "";
    let motionText = "";
    let startFrameText = "";
    let endFrameText = "";

    if (raw && typeof raw === "object") {
      isOnDemand = (raw.status === "on_demand");
      itemTitle = raw.title || itemTitle;
      itemBadge = raw.badge || (isOnDemand ? "✨ BY REQUEST" : "");
      itemDesc = raw.deskripsi || raw.desc || "";
      promptText = raw.rawPrompt || raw.prompt || "";
      motionText = raw.motion || "";
      startFrameText = raw.startFramePrompt || raw.startFrame || "";
      endFrameText = raw.endFramePrompt || raw.endFrame || "";
    } else if (raw && typeof raw === "string") {
      promptText = raw;
    }

    const card = document.createElement("div");
    card.className = "item-card";

    if (isOnDemand) {
      const fallbackPoster = activePack.coverUrl || `images/${activePack.folder}/cover.jpg`;
      const badgeStyle = "background:rgba(212,175,55,0.2); color:var(--gold-light); border:1px solid var(--gold-primary);";

      card.innerHTML = `
        <div class="item-image-wrapper">
          <span class="badge-pill" style="top:8px; left:8px; font-size:0.62rem; ${badgeStyle}">
            ${itemBadge || '✨ BY REQUEST'}
          </span>
          <img 
            src="${fallbackPoster}" 
            loading="eager" 
            alt="${itemTitle}" 
            class="img-loaded" 
            style="filter:brightness(0.4) contrast(1.1);" 
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
          />
          <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:15px; text-align:center; background:rgba(0,0,0,0.65);">
            <i class="fa-solid fa-wand-magic-sparkles" style="color:var(--gold-primary); font-size:1.4rem; margin-bottom:6px;"></i>
            <span style="font-size:0.75rem; font-weight:800; color:#fff; font-family:'Cinzel', serif;">ON-DEMAND FORMULA</span>
            <span style="font-size:0.65rem; color:var(--gold-light); margin-top:2px;">Dibuatkan Sesuai Request</span>
          </div>
        </div>
        <div class="item-content">
          <div>
            <div class="item-number" style="color:var(--gold-light);">ITEM #${i} • ${itemTitle}</div>
            <div class="prompt-text-box" style="border-style:dashed; border-color:rgba(212,175,55,0.3); background:rgba(15,15,22,0.6); padding:10px;">
              <p style="font-size:0.75rem; color:#e2e8f0; margin-bottom:6px; line-height:1.4;">
                ${itemDesc || 'Konsep tren tervalidasi siap diracik dengan parameter pencahayaan studio 8K dan rasio 9:16.'}
              </p>
              <div style="font-size:0.68rem; color:var(--text-muted);">
                ⚡ Estimasi pengerjaan formula: 15–30 menit setelah konfirmasi.
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <button 
              class="btn-copy" 
              style="background:var(--gold-gradient); color:#000; font-weight:800; width:100%; justify-content:center;" 
              onclick="requestFormulaOnDemand('${activePack.title}', '${itemTitle}', ${i})"
            >
              <i class="fa-brands fa-whatsapp"></i> Request / Pesan Formula Ini
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
      continue;
    }

    let mediaHTML = "";
    if (isVideo) {
      const basePath = `videos/${activePack.folder}/${i}`;
      mediaHTML = `
        <div class="video-lazy-container aspect-9-16" data-video="${basePath}.mp4">
          <img 
            src="${basePath}.jpg" 
            alt="Item ${i}" 
            loading="lazy" 
            decoding="async"
            class="img-loaded"
            style="width:100%; height:100%; object-fit:cover;" 
            onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
          />
        </div>
      `;
    } else {
      let imgSrc = `images/${activePack.folder}/${i}.jpg`;
      mediaHTML = `
        <img 
          src="${imgSrc}" 
          loading="eager" 
          alt="Item ${i}" 
          class="img-loaded" 
          onerror="this.onerror=null; this.src='images/velvet/cover.jpg';"
        />
      `;
    }

    if (!promptText && !isFrameToFrame) {
      if (isVideo) {
        promptText = `Cinematic video sequence of ${activePack.title}, item #${i}`;
      } else {
        promptText = `A high-end luxury portrait of ${activePack.title}, item #${i}`;
      }
    }

    if (isFamilyCatalog(activePack) && currentAppliedFormationPrompt) {
      promptText = currentAppliedFormationPrompt + " " + promptText;
    }

    if (!isFrameToFrame && promptText) {
      promptText = randomizePromptOutput(promptText, isVideo);
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
      const starterMax = (activePack.totalItems === 36) ? 18 : 23;

      if (i <= 3) {
        tier = "free";
      } else if (i <= starterMax) {
        tier = "starter";
        isLocked = !cekAksesKatalog(activePack.id, "starter");
      } else {
        tier = "vip";
        isLocked = !cekAksesKatalog(activePack.id, "vip");
      }
    }

    let promptBoxHTML = "";
    let actionButtons = "";

    if (isFrameToFrame) {
      if (!isLocked) {
        promptBoxHTML = `
          <div>
            <div style="font-size: 0.7rem; font-weight: 700; color: #38bdf8; margin-bottom: 4px;">
              🟢 1. START FRAME (Pose Awal / Sketsa Stik):
            </div>
            <div class="prompt-text-box" id="startFrameText_${i}" style="border-color: rgba(56, 189, 248, 0.3); margin-bottom: 8px;">${startFrameText || "-"}</div>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--gold-light); margin-bottom: 4px;">
              👑 2. END FRAME (Wujud Utuh / Masterpiece):
            </div>
            <div class="prompt-text-box" id="endFrameText_${i}" style="border-color: rgba(212, 175, 55, 0.3); margin-bottom: 8px;">${endFrameText || "-"}</div>

            ${motionText ? `
            <div style="font-size: 0.7rem; font-weight: 700; color: #4ade80; margin-bottom: 4px;">
              🎬 3. MOTION VIDEO (Generasi Transformasi AI):
            </div>
            <div class="prompt-text-box" id="motionText_${i}" style="border-color: rgba(74, 222, 128, 0.3);">${motionText}</div>
            ` : ""}
          </div>
        `;

        actionButtons = `
  <div class="action-buttons" style="display: flex; flex-wrap: wrap; gap: 6px;">
    <a href="videos/${activePack.folder}/${i}_start.jpg" download class="btn-copy" style="border-color:#38bdf8; color:#38bdf8; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
      📥 Bahan Stik
    </a>
    <a href="videos/${activePack.folder}/${i}.jpg" download class="btn-copy" style="border-color:var(--gold-primary); color:var(--gold-light); text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
      📥 Bahan Jadi
    </a>

    <button class="btn-copy" onclick="copasPromptFromElement('startFrameText_${i}', '${activePack.title}', ${i})">🟢 Start</button>
    <button class="btn-copy" onclick="copasPromptFromElement('endFrameText_${i}', '${activePack.title}', ${i})">👑 End</button>
    ${motionText ? `<button class="btn-copy" style="border-color:#22c55e; color:#4ade80;" onclick="copasPromptFromElement('motionText_${i}', '${activePack.title}',${i})">🎬 Motion</button>` : ""}
    <a href="https://runwayml.com/" target="_blank" class="btn-direct-ai">🚀 Video AI</a>
  </div>
`;
      } else {
        promptBoxHTML = `<div class="prompt-text-box prompt-locked-text">🔒 Formula prompt dikunci. Masukkan PIN ${tier.toUpperCase()} (${tier === 'starter' ? '10K' : '25K'}) untuk membuka teks formula ini.</div>`;
        actionButtons = `
          <div class="action-buttons">
            <button class="btn-copy" style="background:var(--gold-gradient); color:#000; font-weight:800; flex:1;" onclick="bukaModalPIN('${tier}')">
              🔑 Masukkan PIN ${tier === 'starter' ? '10K' : '25K'}
            </button>
            <button onclick="bukaModalCheckout('${activePack.title}', 'Paket ${tier.toUpperCase()}', 'Rp${tier === 'starter' ? '10.000' : '25.000'}')" class="btn-unlock-wa" style="flex:1;">
              Beli via WA
            </button>
          </div>
        `;
      }
    } else {
      const motionBoxHTML = (isVideo && motionText) ? `
  <div style="margin-top: 10px; border-top: 1px dashed rgba(212,175,55,0.25); padding-top: 8px;">
    <div style="font-size: 0.7rem; font-weight: 700; color: #4ade80; margin-bottom: 4px;">
      🎬 PROMPT MOTION VIDEO (Runway / Kling / Luma):
    </div>
    <div class="prompt-text-box" id="motionText_${i}" style="border-color: rgba(74, 222, 128, 0.3);">${motionText}</div>
  </div>
` : '';

      promptBoxHTML = !isLocked 
        ? `<div>
             <div style="font-size: 0.7rem; font-weight: 700; color: var(--gold-light); margin-bottom: 4px;">
               🎨 PROMPT VISUAL / BASE IMAGE:
             </div>
             <div class="prompt-text-box" id="promptText_${i}">${promptText}</div>
             ${motionBoxHTML}
           </div>`
        : `<div class="prompt-text-box prompt-locked-text">🔒 Formula prompt dikunci. Masukkan PIN ${tier.toUpperCase()} (${tier === 'starter' ? '10K' : '25K'}) untuk membuka teks formula ini.</div>`;

      let directBtnText = isVideo ? "🚀 Video AI" : "🚀 Bing";
      let directUrl = isVideo ? "https://runwayml.com/" : "https://www.bing.com/images/create";

      actionButtons = !isLocked 
        ? `
          <div class="action-buttons" style="display: flex; flex-wrap: wrap; gap: 6px;">
            <button class="btn-copy" onclick="copasPromptFromElement('promptText_${i}', '${activePack.title}', ${i})">
              📋 Salin Visual
            </button>

            ${(isVideo && motionText) ? `
            <button class="btn-copy" style="border-color: #22c55e; color: #4ade80;" onclick="copasPromptFromElement('motionText_${i}', '${activePack.title}', ${i})">
              🎬 Salin Motion
            </button>
            ` : ''}

            ${isVideo ? `
            <button class="btn-copy" style="background:rgba(212,175,55,0.18); border-color:var(--gold-primary); color:var(--gold-light);" onclick="bukaModalCheckout('${activePack.title} - Item #${i}', 'Jasa Pembuatan Video Jadi', 'Rp35.000')">
              🎬 Buatkan Video Jadi (35K)
            </button>
            ` : ''}

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
    }

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="badge-pill" style="top:8px; left:8px; font-size:0.62rem;">${tier === 'free' ? 'GRATIS SAMPLE' : 'PAKET ' + tier.toUpperCase()}</span>
        ${mediaHTML}
      </div>
      <div class="item-content">
        <div>
          <div class="item-number">ITEM #${i} • ${itemTitle}</div>
          ${promptBoxHTML}
        </div>
        ${actionButtons}
      </div>
    `;
    grid.appendChild(card);
  }
    aktivasiLazyVideoObserver();
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
    let text = el.innerText || el.textContent;

    if (activePack && activePack.workflow !== "frame-to-frame") {
      text = randomizePromptOutput(text, activePack.type === "video");
      el.innerText = text;
    }

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
// 16. PINTEREST SIMETRIS LIVE SEARCH & MESIN PENCARI AKUN AI
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

  const homeAiCards = document.querySelectorAll("#gridHomeDigitalAi .catalog-card");
  homeAiCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const isMatch = cleanKey === "" || text.includes(cleanKey);
    card.style.display = isMatch ? "" : "none";
  });

  handleAiAccountSearch(cleanKey);
}

function handleAiAccountSearch(keyword) {
  const cleanKey = (keyword || "").toLowerCase().trim();
  const catalogGrid = document.getElementById("aiAccountCatalogGrid") || document.getElementById("gridAkunKatalog") || document.getElementById("gridAkunAI");
  if (!catalogGrid) return;

  const cards = catalogGrid.querySelectorAll(".catalog-card, .ai-card");
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const isMatch = cleanKey === "" || text.includes(cleanKey);
    card.style.display = isMatch ? "" : "none";
  });
}

const AiAccountEngine = {
  handleSearch: function(keyword) {
    handleAiAccountSearch(keyword);
  }
};
window.AiAccountEngine = AiAccountEngine;
window.handleAiAccountSearch = handleAiAccountSearch;

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

  if (categoryTag === 'vod') {
    switchMainTab('vod');
    return;
  }
if (categoryTag === 'apps') {
    bukaHalamanAplikasi();
    return;
  }
  if (categoryTag === 'umkm') {
    bukaHalamanKomersial();
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
  // 1. Jika dikirim sebagai objek produk utuh (dari akun AI / etalase modern)
  if (itemTitle && typeof itemTitle === "object") {
    if (typeof window.bukaCheckoutAi === "function") {
      window.bukaCheckoutAi(itemTitle);
    }
    return;
  }

  // 2. Jika dipanggil dari tombol katalog foto/video (3 parameter: judul, paket, harga)
  const namaProduk = itemTitle || "Layanan Studio JIWAS";
  const namaVarian = tierName || "Varian Pilihan";
  
  // Ambil angka murni dari string harga (misal: "Rp25.000" jadi 25000)
  const nominalAngka = Number(String(priceText || tierName || "25000").replace(/[^0-9]/g, '')) || 25000;

  // Susun objek data sesuai kebutuhan kartu QRIS di index.html
  const dataPesanan = {
    nama: namaProduk,
    kategori: "Formula Studio",
    jenisAkun: namaVarian,
    variants: [
      {
        name: namaVarian,
        price: nominalAngka,
        garansi: "Full Garansi VIP"
      }
    ],
    defaultIdx: 0
  };

  // Teruskan langsung ke engine modal QRIS
  if (typeof window.bukaCheckoutAi === "function") {
    window.bukaCheckoutAi(dataPesanan);
  }
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
      qrisImgEl.src = "images/qris-10k.jpg";
    } else {
      qrisImgEl.src = "images/qris-10k.jpg";
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

// -------------------------------------------------------------------------
// 18. MODUL KHUSUS: STUDIO KOMERSIAL & UMKM (HUB & DEDICATED CATALOG)
// -------------------------------------------------------------------------
function getCommercialPacks() {
  return getActiveRegistry().filter(item => 
    item.type === "product" || 
    item.id.includes("umkm") || 
    item.id.includes("sekolah") || 
    item.id.includes("retouch")
  );
}

function renderHomeCommercialPreview() {
  const container = document.getElementById("gridHomeCommercialPreview");
  if (!container) return;
  container.innerHTML = "";

  const items = getCommercialPacks().slice(0, 3);
  items.forEach(pack => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    const coverSrc = pack.coverUrl || `images/${pack.folder}/cover.jpg`;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#15803d; color:#fff; border:none;">PRO BISNIS</span>
        <div class="card-menu-container" style="position:absolute; top:8px; right:8px; z-index:10;">
          <button class="btn-card-menu" onclick="event.stopPropagation(); toggleCardDropdownMenu('${pack.id}', this)" aria-label="Menu Pilihan" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div id="cardDropdown_${pack.id}" class="card-dropdown-menu hidden" style="position:absolute; right:0; top:32px; background:#12121a; border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:6px; min-width:160px; box-shadow:0 8px 20px rgba(0,0,0,0.8); z-index:20;">
            <button onclick="event.stopPropagation(); bukaModalShareSosmed('${pack.title}', '${pack.folder}', '${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-share-nodes" style="color:#38bdf8;"></i> Bagikan Sosmed / Pasar
            </button>
            <button onclick="event.stopPropagation(); copasPrompt('${window.location.origin + window.location.pathname}?pack=${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-link" style="color:var(--gold-light);"></i> Salin Tautan
            </button>
          </div>
        </div>
        <img src="${coverSrc}" alt="${pack.title}" class="aspect-9-16" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge" style="color:#22c55e;">★ ${pack.rating || '5.0/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Lihat Formula</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function bukaHalamanKomersial() {
  const secAtelier = document.getElementById("sectionAtelier");
  const secFoto = document.getElementById("sectionFotoAI");
  const secVideo = document.getElementById("sectionVideoAI");
  const secVod = document.getElementById("sectionVodAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");
  const secComm = document.getElementById("sectionCommercialStudio");
  const heroHeader = document.getElementById("atelierMainHeader");

  if (heroHeader) heroHeader.classList.add("hidden");
  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secVod) secVod.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secDetail) secDetail.classList.add("hidden");
  if (secComm) secComm.classList.remove("hidden");

  renderAllCommercialItems();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tutupHalamanKomersial() {
  const secComm = document.getElementById("sectionCommercialStudio");
  if (secComm) secComm.classList.add("hidden");
  switchMainTab('atelier', document.getElementById('tabBtnAtelier'));
}

function renderAllCommercialItems(filterKey = "") {
  const container = document.getElementById("gridAllCommercialItems");
  if (!container) return;
  container.innerHTML = "";

  let list = getCommercialPacks();

  if (activeCommercialChip !== "all") {
    list = list.filter(item => {
      const matchText = (item.id + " " + item.title + " " + (item.folder || "")).toLowerCase();
      return matchText.includes(activeCommercialChip);
    });
  }

  if (filterKey.trim() !== "") {
    const q = filterKey.toLowerCase();
    list = list.filter(item => {
      const matchText = (item.id + " " + item.title + " " + (item.folder || "")).toLowerCase();
      return matchText.includes(q);
    });
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">Belum ada katalog pada sub-kategori ini.</div>';
    return;
  }

  list.forEach(pack => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.onclick = () => bukaDetailPack(pack);
    const coverSrc = pack.coverUrl || `images/${pack.folder}/cover.jpg`;

    card.innerHTML = `
      <div style="position:relative;">
        <span class="badge-pill" style="background:#15803d; color:#fff; border:none;">PRO BISNIS</span>
        <div class="card-menu-container" style="position:absolute; top:8px; right:8px; z-index:10;">
          <button class="btn-card-menu" onclick="event.stopPropagation(); toggleCardDropdownMenu('${pack.id}', this)" aria-label="Menu Pilihan" style="background:rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.3); color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div id="cardDropdown_${pack.id}" class="card-dropdown-menu hidden" style="position:absolute; right:0; top:32px; background:#12121a; border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:6px; min-width:160px; box-shadow:0 8px 20px rgba(0,0,0,0.8); z-index:20;">
            <button onclick="event.stopPropagation(); bukaModalShareSosmed('${pack.title}', '${pack.folder}', '${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-share-nodes" style="color:#38bdf8;"></i> Bagikan Sosmed / Pasar
            </button>
            <button onclick="event.stopPropagation(); copasPrompt('${window.location.origin + window.location.pathname}?pack=${pack.id}')" style="width:100%; text-align:left; background:none; border:none; color:#e2e8f0; font-size:0.75rem; padding:6px 8px; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-link" style="color:var(--gold-light);"></i> Salin Tautan
            </button>
          </div>
        </div>
        <img src="${coverSrc}" alt="${pack.title}" class="aspect-9-16" loading="eager" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/velvet/cover.jpg'; this.classList.add('img-loaded');">
      </div>
      <div class="card-info">
        <h3 class="card-title">${pack.title}</h3>
        <div class="card-rating-badge" style="color:#22c55e;">★ ${pack.rating || '5.0/5'}</div>
        <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">Rp10.000 / Rp25.000</div>
        <button class="btn-copy" style="margin-top:8px; padding:6px 12px; font-size:0.75rem; width:100%;">Buka Formula</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterChipKomersial(chipKey, btnEl) {
  document.querySelectorAll("#commercialFilterChips .ai-chip").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  activeCommercialChip = chipKey;
  renderAllCommercialItems();
}

function filterKomersialLive(keyword) {
  renderAllCommercialItems(keyword);
}

// =========================================================================
// KONTROL 3 JALUR PEMBAYARAN CHECKOUT (QRIS, TRANSFER BANK & CHAT WA)
// =========================================================================
let currentSelectedPayMethod = 'qris';

function switchPayMethod(method) {
  currentSelectedPayMethod = method;

  // 1. Reset class aktif pada ketiga tombol tab
  const tabs = document.querySelectorAll("#tabBtnQris, #tabBtnBank, #tabBtnWa");
  tabs.forEach(tab => tab.classList.remove("active"));

  // 2. Sembunyikan ketiga panel pembayaran (pakai display: none)
  const panes = ['payPaneQris', 'payPaneBank', 'payPaneWa'];
  panes.forEach(paneId => {
    const el = document.getElementById(paneId);
    if (el) el.style.display = 'none';
  });

  // 3. Munculkan panel yang dipilih dan aktifkan tombol tabnya
  if (method === 'qris') {
    document.getElementById("tabBtnQris")?.classList.add("active");
    const pane = document.getElementById("payPaneQris");
    if (pane) pane.style.display = "block";
  } else if (method === 'bank') {
    document.getElementById("tabBtnBank")?.classList.add("active");
    const pane = document.getElementById("payPaneBank");
    if (pane) pane.style.display = "block";
  } else if (method === 'wa') {
    document.getElementById("tabBtnWa")?.classList.add("active");
    const pane = document.getElementById("payPaneWa");
    if (pane) pane.style.display = "block";
  }

  // 4. Ubah teks dan warna tombol konfirmasi utama sesuai jalur yang aktif
  const actionBtn = document.getElementById("btnMainCheckoutAction");
  if (actionBtn) {
    if (method === 'qris') {
      actionBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Konfirmasi Pembayaran QRIS ke WhatsApp Admin';
      actionBtn.style.background = '#22c55e';
      actionBtn.style.color = '#fff';
    } else if (method === 'bank') {
      actionBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Konfirmasi Transfer Bank ke WhatsApp Admin';
      actionBtn.style.background = 'linear-gradient(135deg, #d4af37, #aa7c11)';
      actionBtn.style.color = '#000';
    } else {
      actionBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Tanya & Pesan Langsung via WhatsApp';
      actionBtn.style.background = '#25d366';
      actionBtn.style.color = '#fff';
    }
  }
}

function salinNomorRekening(nomor, jenis) {
  navigator.clipboard.writeText(nomor).then(() => {
    if (typeof showToast === "function") {
      showToast(`Nomor ${jenis} (${nomor}) berhasil disalin!`);
    } else {
      alert(`Nomor ${jenis} (${nomor}) berhasil disalin!`);
    }
  });
}
// =========================================================================
// SMART VIDEO LAZY-LOAD & RAM CLEANER (Cover -> MP4 on Enter -> Unload on Exit)
// =========================================================================
const lazyVideoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const container = entry.target;
    const videoUrl = container.dataset.video;
    const existingVideo = container.querySelector('video');
    const posterImg = container.querySelector('img');

    if (entry.isIntersecting) {
      // 1. MASUK LAYAR: Pasang video jika belum ada
      if (!existingVideo && videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.className = 'aspect-9-16';

        // Begitu frame video ter-load, sembunyikan gambar cover
        video.onloadeddata = () => {
          if (posterImg) posterImg.style.opacity = '0';
        };

        // Jika video 404 / gagal, hapus elemen video agar cover tetap tampil
        video.onerror = () => {
          video.remove();
          if (posterImg) posterImg.style.opacity = '1';
        };

        container.appendChild(video);
      } else if (existingVideo) {
        existingVideo.play().catch(() => {});
      }
    } else {
      // 2. KELUAR LAYAR: HAPUS VIDEO DARI DOM UNTUK MEMBEBASKAN RAM 100%
      if (existingVideo) {
        existingVideo.pause();
        existingVideo.removeAttribute('src'); // Buang buffer dari memori
        existingVideo.load();
        existingVideo.remove();               // Hapus total dari DOM
        if (posterImg) posterImg.style.opacity = '1'; // Tampilkan kembali gambar cover
      }
    }
  });
}, {
  rootMargin: '120px 0px', // Siapkan video 120px sebelum masuk viewport layar
  threshold: 0.1
});

// Fungsi pemanggil observer ke semua wadah video
function aktivasiLazyVideoObserver() {
  document.querySelectorAll('.video-lazy-container').forEach(el => {
    lazyVideoObserver.observe(el);
  });
}
// =========================================================================
// MODUL KHUSUS: ETALASE APLIKASI & 3 TINGKATAN HARGA (JIWAS APPS)
// =========================================================================
let activeAppFilter = "all";

function bukaHalamanAplikasi() {
  const secAtelier = document.getElementById("sectionAtelier");
  const secFoto = document.getElementById("sectionFotoAI");
  const secVideo = document.getElementById("sectionVideoAI");
  const secVod = document.getElementById("sectionVodAI");
  const secAkun = document.getElementById("sectionAkunAI");
  const secDetail = document.getElementById("sectionDetailPack");
  const secComm = document.getElementById("sectionCommercialStudio");
  const secApps = document.getElementById("sectionAppsStudio");
  const heroHeader = document.getElementById("atelierMainHeader");

  if (heroHeader) heroHeader.classList.add("hidden");
  if (secAtelier) secAtelier.classList.add("hidden");
  if (secFoto) secFoto.classList.add("hidden");
  if (secVideo) secVideo.classList.add("hidden");
  if (secVod) secVod.classList.add("hidden");
  if (secAkun) secAkun.classList.add("hidden");
  if (secDetail) secDetail.classList.add("hidden");
  if (secComm) secComm.classList.add("hidden");
  if (secApps) secApps.classList.remove("hidden");

  renderKatalogSemuaAplikasi();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tutupHalamanKomersial() {
  const secAtelier = document.getElementById("sectionAtelier");
  const heroHeader = document.getElementById("atelierMainHeader");
  const secComm = document.getElementById("sectionCommercialStudio");

  // Tampilkan beranda terlebih dahulu agar layout tidak kosong
  if (heroHeader) heroHeader.classList.remove("hidden");
  if (secAtelier) secAtelier.classList.remove("hidden");

  // Baru sembunyikan halaman komersial
  if (secComm) secComm.classList.add("hidden");

  // Aktifkan kembali tab Atelier di navigasi bawah
  document.querySelectorAll(".b-nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById("tabBtnAtelier")?.classList.add("active");

  window.scrollTo(0, 0);
}

function tutupHalamanAplikasi() {
  const secAtelier = document.getElementById("sectionAtelier");
  const heroHeader = document.getElementById("atelierMainHeader");
  const secApps = document.getElementById("sectionAppsStudio");

  if (heroHeader) heroHeader.classList.remove("hidden");
  if (secAtelier) secAtelier.classList.remove("hidden");

  if (secApps) secApps.classList.add("hidden");

  document.querySelectorAll(".b-nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById("tabBtnAtelier")?.classList.add("active");

  window.scrollTo(0, 0);
}

function renderHomeSoftwarePreview() {
  const container = document.getElementById("gridHomeSoftwarePreview");
  if (!container) return;
  container.innerHTML = "";

  const items = getDatabaseApps().slice(0, 2);
  items.forEach(app => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.innerHTML = buildAppCardHTML(app);
    container.appendChild(card);
  });
}

function renderKatalogSemuaAplikasi(searchKey = "") {
  const container = document.getElementById("gridAllAppItems");
  if (!container) return;
  container.innerHTML = "";

  let list = getDatabaseApps();

  if (activeAppFilter !== "all") {
    list = list.filter(item => item.kategori === activeAppFilter);
  }

  if (searchKey.trim() !== "") {
    const q = searchKey.toLowerCase();
    list = list.filter(item => (item.title + " " + item.desc + " " + item.id).toLowerCase().includes(q));
  }

  if (list.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">Tidak ada software ditemukan.</div>';
    return;
  }

  list.forEach(app => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.innerHTML = buildAppCardHTML(app);
    container.appendChild(card);
  });
}

function buildAppCardHTML(app) {
  const v1 = app.variants[0];
  const v2 = app.variants[1];
  const v3 = app.variants[2];

  return `
    <div style="position:relative;">
      <span class="badge-pill" style="background:#0284c7; color:#fff; border:none;">${app.badge}</span>
      <img src="${app.cover}" alt="${app.title}" class="aspect-9-16 img-loaded" onerror="this.src='images/velvet/cover.jpg';">
    </div>
    <div class="card-info">
      <div>
        <h3 class="card-title">${app.title}</h3>
        <div class="card-rating-badge" style="color:#22c55e;">★ ${app.rating} • ${app.sales}</div>
        <p style="font-size:0.68rem; color:#9ca3af; margin:4px 0 8px; line-height:1.3;">${app.desc}</p>
      </div>

      <!-- Tombol Demo Interaktif Anti-Curi -->
      <button class="btn-copy" style="width:100%; justify-content:center; padding:5px; margin-bottom:8px; border-color:#38bdf8; color:#38bdf8;" onclick="bukaModalAppDemo('${app.id}')">
        <i class="fa-solid fa-play"></i> Uji Coba Demo (Read-Only)
      </button>

      <!-- 3 Tingkatan Harga -->
      <div class="app-tier-selector-box">
        <button class="btn-app-tier" onclick="bukaModalCheckout('${app.title}', '${v1.name}', 'Rp${v1.price.toLocaleString('id-ID')}')">
          ${v1.name}<br><strong>Rp${(v1.price / 1000).toFixed(0)}rb</strong>
        </button>
        <button class="btn-app-tier highlight" onclick="bukaModalCheckout('${app.title}', '${v2.name}', 'Rp${v2.price.toLocaleString('id-ID')}')">
          ${v2.name}<br><strong>Rp${(v2.price / 1000).toFixed(0)}rb</strong>
        </button>
        <button class="btn-app-tier" onclick="bukaModalCheckout('${app.title}', '${v3.name}', 'Rp${v3.price.toLocaleString('id-ID')}')">
          ${v3.name}<br><strong>Rp${(v3.price / 1000).toFixed(0)}rb</strong>
        </button>
      </div>
    </div>
  `;
}

function filterChipApp(kategoriKey, btnEl) {
  document.querySelectorAll("#appFilterChips .ai-chip").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  activeAppFilter = kategoriKey;
  renderKatalogSemuaAplikasi();
}

function filterAppsLive(keyword) {
  renderKatalogSemuaAplikasi(keyword);
}

function bukaModalAppDemo(appId) {
  const app = getDatabaseApps().find(a => a.id === appId);
  if (!app) return;

  const modal = document.getElementById("appDemoModal");
  const title = document.getElementById("appDemoTitle");
  const player = document.getElementById("appDemoVideoPlayer");
  const desc = document.getElementById("appDemoDesc");
  const actions = document.getElementById("appDemoTierActions");

  if (title) title.innerText = app.title;
  if (player) {
    player.src = app.demoVideo;
    player.play().catch(() => {});
  }
  if (desc) desc.innerText = `${app.desc} — Pilih lisensi di bawah untuk membuka versi penuh & kode sumber.`;

  if (actions) {
    actions.innerHTML = `
      <div style="display:flex; gap:6px;">
        ${app.variants.map((v, i) => `
          <button class="btn-copy" style="flex:1; justify-content:center; padding:8px 4px; font-size:0.68rem; ${i === 1 ? 'background:var(--gold-gradient); color:#000; font-weight:800;' : ''}" 
            onclick="tutupModalAppDemo(); bukaModalCheckout('${app.title}', '${v.name}', 'Rp${v.price.toLocaleString('id-ID')}');">
            ${v.name}<br>Rp${v.price.toLocaleString('id-ID')}
          </button>
        `).join('')}
      </div>
    `;
  }

  if (modal) modal.classList.remove("hidden");
}

function tutupModalAppDemo() {
  const modal = document.getElementById("appDemoModal");
  const player = document.getElementById("appDemoVideoPlayer");
  if (player) {
    player.pause();
    player.src = "";
  }
  if (modal) modal.classList.add("hidden");
}