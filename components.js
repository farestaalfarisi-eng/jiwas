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

  /**
   * Render kartu item katalog AI di etalase
   */
  renderProductCard: function (p) {
    const coverSrc = this.getCoverPath(p);
    const safeTitle = (p.nama || "Akun AI").replace(/"/g, "&quot;");
    const safePromo = p.hargaPromoFormatted || ("Rp" + Number(p.hargaPromo || 15000).toLocaleString("id-ID"));
    const safeNormal = p.hargaFormatted || ("Rp" + Number(p.harga || 25000).toLocaleString("id-ID"));

    return `
      <div class="ai-card" id="card-${p.id}">
        <div class="ai-card-image-wrap">
          <span class="ai-badge">${p.badge || "⚡ AUTO BOT"}</span>
          <img src="${coverSrc}" alt="${safeTitle}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
        </div>
        <div class="ai-card-body">
          <div>
            <span class="ai-category-tag">${p.kategori || "AI"} • ${p.subKategori || "Direct"}</span>
            <h3 class="ai-card-title">${safeTitle}</h3>
            <div class="ai-card-price-box">
              <span class="ai-price-promo">${safePromo}</span>
              <span class="ai-price-normal">${safeNormal}</span>
            </div>
            <div class="ai-card-guarantee">
              <i class="fa-solid fa-shield-halved"></i> ${p.garansi || "Garansi Sesuai Durasi"}
            </div>
          </div>
          <div class="ai-card-btn-group">
            <button type="button" class="btn-ai-detail" onclick="AiAccountEngine.openDetailModal('${p.id}')">
              <i class="fa-solid fa-circle-info"></i> Detail
            </button>
            <button type="button" class="btn-ai-buy" onclick="SupplierConnector.orderAkunAuto('${p.id}', '30 Hari')">
              <i class="fa-brands fa-whatsapp"></i> Beli
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderCategoryChip: function (catName, activeCategory) {
    const isActive = catName.toLowerCase() === activeCategory.toLowerCase();
    return `
      <button class="ai-chip ${isActive ? "active" : ""}" onclick="AiAccountEngine.selectCategory('${catName}')">
        ${catName}
      </button>
    `;
  },

  /**
   * Konten Modal Detail interaktif dengan pilihan varian durasi
   */
  renderDetailModalContent: function (p) {
    const modalCoverSrc = this.getCoverPath(p);
    const safePromo = p.hargaPromoFormatted || ("Rp" + Number(p.hargaPromo || 15000).toLocaleString("id-ID"));
    const safeNormal = p.hargaFormatted || ("Rp" + Number(p.harga || 25000).toLocaleString("id-ID"));

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

    // Opsi varian durasi dinamis
    let variantOptions = `
      <option value="30 Hari">30 Hari (Reguler)</option>
      <option value="7 Hari">7 Hari (Hemat)</option>
    `;

    if (p.variants && Array.isArray(p.variants) && p.variants.length > 0) {
      variantOptions = p.variants.map(v => `
        <option value="${v.name}">${v.name} — Rp${Number(v.price).toLocaleString("id-ID")}</option>
      `).join("");
    }

    return `
      <div class="ai-modal-header">
        <button type="button" class="ai-modal-close" onclick="AiAccountEngine.closeDetailModal()" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
        <div class="ai-modal-branding">
          <img src="${modalCoverSrc}" alt="${p.nama}" class="ai-modal-logo" onerror="this.onerror=null; this.src='images/canvas/canva.jpg';">
          <div>
            <span class="ai-badge" style="position:static; display:inline-block; margin-bottom:4px;">${p.badge || "⚡ AUTO BOT"}</span>
            <h3 class="ai-modal-title">${p.nama}</h3>
            <span class="ai-category-tag">${p.kategori || "AI"} • ${p.subKategori || "Direct"}</span>
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
            <span class="ai-status-pill"><i class="fa-solid fa-check"></i> ${(p.status || "READY").toUpperCase()}</span>
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
        <button type="button" class="btn-send-wa" style="width:100%; padding:12px; font-size:0.85rem;" onclick="AiAccountComponents.eksekusiBeliDariModal('${p.id}')">
          <i class="fa-brands fa-whatsapp"></i> PESAN VIA WHATSAPP SEKARANG
        </button>
      </div>
    `;
  },

  eksekusiBeliDariModal: function (productId) {
    const selectEl = document.getElementById("modalSelectedVariant");
    const variant = selectEl ? selectEl.value : "30 Hari";
    if (typeof AiAccountEngine !== "undefined" && typeof AiAccountEngine.closeDetailModal === "function") {
      AiAccountEngine.closeDetailModal();
    }
    SupplierConnector.orderAkunAuto(productId, variant);
  }
};