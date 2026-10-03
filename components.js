// =========================================================================
// JIWAS STUDIO — UI COMPONENTS FACTORY (components.js V3.1 FULL MASTER)
// Direct Interactive Purchase Mode with Dynamic Variant Support
// =========================================================================

const AiAccountComponents = {
  /**
   * Menentukan cover logo produk secara dinamis
   */
  getCoverPath: function (p) {
    if (p.logo && p.logo.trim() !== "" && !p.logo.includes("undefined")) {
      return p.logo;
    }
    const ident = ((p.id || "") + " " + (p.nama || "")).toLowerCase();
    let fileName = "canva.jpg";

    if (ident.includes("capcut")) fileName = "capcut.jpg";
    else if (ident.includes("chatgpt") || ident.includes("gpt")) fileName = "gpt.jpg";
    else if (ident.includes("gemini")) fileName = "gemini.jpg";
    else if (ident.includes("canva")) fileName = "canva.jpg";
    else if (ident.includes("motion") || ident.includes("alight")) fileName = "motion.jpg";
    else if (ident.includes("remini")) fileName = "remini2.jpg";
    else if (ident.includes("meitu")) fileName = "meitu.jpg";
    else if (ident.includes("wink")) fileName = "wink.jpg";
    else if (ident.includes("netflix")) fileName = "neflix.jpg";
    else if (ident.includes("youtube")) fileName = "youtube.jpg";
    else if (ident.includes("spotify")) fileName = "vision.jpg";
    else if (ident.includes("apple")) fileName = "music.jpg";
    else if (ident.includes("vidio")) fileName = "video.jpg";
    else if (ident.includes("viu")) fileName = "viu.jpg";
    else if (ident.includes("bstation")) fileName = "cover.jpg";
    else if (ident.includes("wetv")) fileName = "wetv.jpg";
    else if (ident.includes("vision")) fileName = "vi.jpg";
    else if (ident.includes("express")) fileName = "expressvpn.jpg";
    else if (ident.includes("hma") || ident.includes("vpn")) fileName = "vpn.jpg";
    else if (ident.includes("zoom")) fileName = "zoom.jpg";
    else if (ident.includes("duolingo")) fileName = "duo.jpg";

    return `images/canvas/${fileName}`;
  },

//Render kartu item katalog AI di etalase dengan tombol varian dinamis
//Render kartu produk AI
renderProductCard: function (p) {
const coverSrc = this.getCoverPath(p);
const safeTitle = (p.nama || "Akun AI").replace(/"/g, "&quot;");

const variants = (p.variants && p.variants.length > 0)
  ? p.variants
  : [{ name: "30 Hari", price: p.hargaPromo || 15000, garansi: p.garansi || "Full Garansi", stock: p.stok || 5 }];

const firstVar = variants[0];
const initialPrice = firstVar.price || p.hargaPromo || 15000;
const initialNormal = Math.round(initialPrice * 1.35);

// Render Pills Varian Dinamis
const variantPillsHTML = variants.map((v, vIdx) => {
  const isHabis = (v.stock !== undefined && v.stock <= 0);
  const activeClass = (vIdx === 0 && !isHabis) ? "style='border-color:var(--gold-primary); background:rgba(212,175,55,0.2);'" : "";
  return `
    <button type="button" 
            class="quick-tag-chip ${isHabis ? 'btn-out-of-stock' : ''}" 
            ${isHabis ? 'disabled' : ''}
            ${activeClass}
            id="pill-${p.id}-${vIdx}"
            onclick="AiAccountComponents.pilihVarianKartu('${p.id}', ${vIdx}, ${v.price}, '${(v.garansi || p.garansi || '').replace(/'/g, "\\'")}', this)"
            style="font-size:0.65rem; padding:2px 8px; margin:2px;">
      ${v.name} ${isHabis ? '<span style="color:#ef4444;">(Habis)</span>' : ''}
    </button>
  `;
}).join("");

return `
  <div class="ai-card" id="card-${p.id}">
    <div class="ai-card-image-wrap">
      <span class="ai-badge">${p.badge || "⚡ AUTO BOT"}</span>
      <img src="${coverSrc}" alt="${safeTitle}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
    </div>
    <div class="ai-card-body">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
          <span class="ai-category-tag">${p.kategori || "AI"}</span>
          <span style="font-size:0.62rem; color:var(--accent-cyan); font-weight:700;"><i class="fa-solid fa-key"></i> ${p.jenisAkun || 'Direct'}</span>
        </div>
        <h3 class="ai-card-title">${safeTitle}</h3>

        <!-- Dynamic Variant Pills -->
        <div style="display:flex; flex-wrap:wrap; gap:3px; margin: 4px 0 6px;">
          ${variantPillsHTML}
        </div>

        <div class="ai-card-price-box">
          <span class="ai-price-promo" id="price-promo-${p.id}">Rp${Number(initialPrice).toLocaleString("id-ID")}</span>
          <span class="ai-price-normal" id="price-normal-${p.id}">Rp${Number(initialNormal).toLocaleString("id-ID")}</span>
        </div>
        <div class="ai-card-guarantee" id="guarantee-label-${p.id}">
          <i class="fa-solid fa-shield-halved"></i> ${firstVar.garansi || p.garansi || "Garansi Sesuai Durasi"}
        </div>
      </div>
      <div class="ai-card-btn-group">    
        <button type="button" class="btn-ai-detail" onclick="AiAccountEngine.openDetailModal('${p.id}')">
          <i class="fa-solid fa-circle-info"></i> Detail
        </button>
        <button type="button" class="btn-ai-buy" onclick="AiAccountComponents.pemicuCheckoutHibrida('${p.id}')">
          <i class="fa-solid fa-cart-shopping"></i> Beli
        </button>
      </div>
    </div>
  </div>
`;
},

pilihVarianKartu: function(prodId, varIdx, price, garansi, btnEl) {
    // Ubah label harga seketika
    const promoEl = document.getElementById(`price-promo-${prodId}`);
    const normalEl = document.getElementById(`price-normal-${prodId}`);
    const guarEl = document.getElementById(`guarantee-label-${prodId}`);

    if (promoEl) promoEl.innerText = "Rp" + Number(price).toLocaleString("id-ID");
    if (normalEl) normalEl.innerText = "Rp" + Number(Math.round(price * 1.35)).toLocaleString("id-ID");
    if (guarEl && garansi) guarEl.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${garansi}`;

    // Update style pills tombol aktif
    const card = document.getElementById(`card-${prodId}`);
    if (card) {
      card.querySelectorAll(".quick-tag-chip").forEach(b => {
        b.style.borderColor = "";
        b.style.background = "";
      });
      if (btnEl) {
        btnEl.style.borderColor = "var(--gold-primary)";
        btnEl.style.background = "rgba(212,175,55,0.2)";
      }
    }
  },

pemicuCheckoutHibrida: function(prodId) {
if (typeof bukaTransaksiQRIS === "function") {
bukaTransaksiQRIS(prodId);
} else {
console.warn("bukaTransaksiQRIS belum siap.");
}
},

renderCategoryChip: function (catName, activeCategory) {
    const isActive = catName.toLowerCase() === activeCategory.toLowerCase();
    return `
      <button class="ai-chip ${isActive ? "active" : ""}" onclick="AiAccountEngine.selectCategory('${catName}')">
        ${catName}
      </button>
    `;
  },


/*Konten Modal Detail interaktif dengan pilihan varian durasi */

renderDetailModalContent: function (p) {
const modalCoverSrc = this.getCoverPath(p);
const variants = (p.variants && p.variants.length > 0)
? p.variants
: [{ name: "30 Hari", price: p.hargaPromo || 15000, garansi: p.garansi || "Full Garansi", stock: p.stok || 5 }];

const safePromo = "Rp" + Number(variants[0].price || 15000).toLocaleString("id-ID");
const safeNormal = "Rp" + Number(Math.round((variants[0].price || 15000) * 1.35)).toLocaleString("id-ID");

const faqList = (p.faq && p.faq.length > 0) ? p.faq : [
  { q: "Apakah akun langsung dikirim?", a: "Ya, pesanan langsung diproses dan dikirimkan oleh admin via WhatsApp." },
  { q: "Bagaimana cara klaim garansi?", a: "Cukup hubungi WhatsApp admin dengan melampirkan nomor pesanan." }
];

const faqHTML = faqList.map(f => `
  <div class="ai-faq-item">
    <strong>Q: ${f.q}</strong>
    <p>A: ${f.a}</p>
  </div>
`).join("");

const variantOptions = variants.map(v => {
  const isHabis = (v.stock !== undefined && v.stock <= 0);
  return `<option value="${v.name}" ${isHabis ? 'disabled' : ''}>${v.name} (${v.kriteria || 'Reguler'}) — Rp${Number(v.price).toLocaleString("id-ID")} ${isHabis ? '[HABIS]' : ''}</option>`;
}).join("");

return `
  <div class="ai-modal-header">
    <button type="button" class="ai-modal-close" onclick="AiAccountEngine.closeDetailModal()" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
    <div class="ai-modal-branding">
      <img src="${modalCoverSrc}" alt="${p.nama}" class="ai-modal-logo" onerror="this.onerror=null; this.src='images/canvas/canva.jpg';">
      <div>
        <span class="ai-badge" style="position:static; display:inline-block; margin-bottom:4px;">${p.badge || "⚡ AUTO BOT"}</span>
        <h3 class="ai-modal-title">${p.nama}</h3>
        <span class="ai-category-tag">${p.kategori || "AI"} • ${p.jenisAkun || "Direct"}</span>
      </div>
    </div>
  </div>
  
  <div class="ai-modal-body">
    <div class="ai-modal-price-card">
      <div>
        <small style="color:var(--text-muted); font-size:0.7rem; display:block;">Harga Mulai Dari:</small>
        <span class="ai-price-promo" style="font-size:1.25rem;">${safePromo}</span>
        <span class="ai-price-normal">${safeNormal}</span>
      </div>
      <div style="text-align:right;">
        <span class="ai-status-pill"><i class="fa-solid fa-check"></i> ${(p.stok > 0 ? "READY" : "HABIS")}</span>
      </div>
    </div>

    <div class="ai-detail-section" style="background:#151520; padding:10px; border-radius:8px; border:1px solid rgba(212,175,55,0.3);">
      <label style="font-size:0.75rem; font-weight:800; color:var(--gold-light); display:block; margin-bottom:6px;">
        <i class="fa-solid fa-clock"></i> Pilih Durasi / Varian Akun:
      </label>
      <select id="modalSelectedVariant" class="select-composer" style="width:100%; padding:8px; font-size:0.8rem; font-weight:700;">
        ${variantOptions}
      </select>
    </div>

    <div class="ai-detail-section">
      <h4><i class="fa-solid fa-circle-info"></i> Deskripsi &amp; Fitur</h4>
      <p>${p.deskripsi || "Akses layanan premium tanpa batas dengan garansi penuh."}</p>
    </div>

    <div class="ai-detail-section">
      <h4><i class="fa-solid fa-user-lock"></i> Tipe Akun &amp; Ketentuan Garansi</h4>
      <p>• <b>Metode Akses:</b> ${p.jenisAkun || "Direct Login (PC & HP)"}</p>
      <p>• <b>Masa Garansi:</b> ${p.garansi || "Garansi Sesuai Durasi"}</p>
    </div>

    <div class="ai-detail-section">
      <h4><i class="fa-solid fa-circle-question"></i> Pertanyaan Sering Diajukan (FAQ)</h4>
      ${faqHTML}
    </div>
  </div>

  <div class="ai-modal-footer">
    <button type="button" class="btn-buy-wa" style="width:100%; padding:12px; font-size:0.85rem;" onclick="AiAccountComponents.eksekusiBeliDariModal('${p.id}')">
      <i class="fa-solid fa-cart-shopping"></i> CHECKOUT SEKARANG (QRIS / BANK / WA)
    </button>
  </div>
`;
},

eksekusiBeliDariModal: function (productId) {
const selectEl = document.getElementById("modalSelectedVariant");
const variantName = selectEl ? selectEl.value : "";
if (typeof AiAccountEngine !== "undefined" && typeof AiAccountEngine.closeDetailModal === "function") {
AiAccountEngine.closeDetailModal();
}
bukaTransaksiQRIS(productId, variantName);
}
};