// =========================================================================
// JIWAS STUDIO — UI COMPONENTS FACTORY (components.js V3.0 - Normalized Cover)
// Dual Purchase Mode (Auto Server API & Direct WhatsApp)
// =========================================================================

const AiAccountComponents = {
  // Fungsi pembantu untuk menentukan path gambar yang akurat di folder images/canvas/
  getCoverPath: function (p) {
    if (p.logo && p.logo.trim() !== "" && !p.logo.includes("undefined")) {
      return p.logo;
    }
    const ident = ((p.id || "") + " " + (p.nama || "")).toLowerCase();
    let fileName = "canva.jpg";

    if (ident.includes("capcut")) {
      fileName = "capcut.jpg";
    } else if (ident.includes("chatgpt") || ident.includes("gpt")) {
      fileName = "chatgpt.jpg";
    } else if (ident.includes("canva")) {
      fileName = "canva.jpg";
    } else if (ident.includes("claude")) {
      fileName = "claude.jpg";
    } else if (ident.includes("midjourney")) {
      fileName = "midjourney.jpg";
    }

    return `images/canvas/${fileName}`;
  },

  renderProductCard: function (p) {
    const buyButtonHTML = p.isAutoApi
      ? `<button class="btn-ai-buy" style="background: linear-gradient(135deg, #0284c7, #0369a1); color:#fff;" onclick="SupplierConnector.prosesPembelianAkun('${p.id}')">
          <i class="fa-solid fa-bolt"></i> Beli Instan
        </button>`
      : `<a href="${p.linkBeli}" target="_blank" class="btn-ai-buy">
          <i class="fa-brands fa-whatsapp"></i> Beli
        </a>`;

    const badgeApi = p.isAutoApi
      ? `<span class="ai-badge" style="background:#0284c7; color:#fff;">⚡ AUTO BOT</span>`
      : `<span class="ai-badge">${p.badge}</span>`;

    const coverSrc = this.getCoverPath(p);

    return `
      <div class="ai-card" id="card-${p.id}">
        <div class="ai-card-image-wrap">
          ${badgeApi}
          <img src="${coverSrc}" alt="${p.nama}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.onerror=null; this.src='images/canvas/canva.jpg'; this.classList.add('img-loaded');">
        </div>
        <div class="ai-card-body">
          <span class="ai-category-tag">${p.kategori} • ${p.subKategori}</span>
          <h3 class="ai-card-title">${p.nama}</h3>
          <div class="ai-card-price-box">
            <span class="ai-price-promo">${p.hargaPromoFormatted}</span>
            <span class="ai-price-normal">${p.hargaFormatted}</span>
          </div>
          <div class="ai-card-guarantee">
            <i class="fa-solid fa-shield-halved"></i> ${p.garansi}
          </div>
          <div class="ai-card-btn-group">
            <button class="btn-ai-detail" onclick="AiAccountEngine.openDetailModal('${p.id}')">
              <i class="fa-solid fa-circle-info"></i> Detail
            </button>
            ${buyButtonHTML}
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

  renderDetailModalContent: function (p) {
    const faqHTML = (p.faq || [])
      .map(
        (f) => `
      <div class="ai-faq-item">
        <strong>Q: ${f.q}</strong>
        <p>A: ${f.a}</p>
      </div>
    `
      )
      .join("");

    const actionBtnModal = p.isAutoApi
      ? `<button onclick="AiAccountEngine.closeDetailModal(); SupplierConnector.prosesPembelianAkun('${p.id}');" class="btn-hero-primary" style="background: linear-gradient(135deg, #0284c7, #0369a1); color:#fff; width:100%; border:none; cursor:pointer;">
          <i class="fa-solid fa-bolt"></i> PROSES ORDER OTOMATIS (SERVER BOT)
        </button>`
      : `<a href="${p.linkBeli}" target="_blank" class="btn-hero-primary" style="text-decoration:none; width:100%;">
          <i class="fa-brands fa-whatsapp"></i> PESAN AKUN VIA WHATSAPP RESMI
        </a>`;

    const modalCoverSrc = this.getCoverPath(p);

    return `
      <div class="ai-modal-header">
        <button class="ai-modal-close" onclick="AiAccountEngine.closeDetailModal()"><i class="fa-solid fa-xmark"></i></button>
        <div class="ai-modal-branding">
          <img src="${modalCoverSrc}" alt="${p.nama}" class="ai-modal-logo" onerror="this.onerror=null; this.src='images/canvas/canva.jpg';">
          <div>
            <span class="ai-badge" style="position:static; display:inline-block; margin-bottom:4px;">${p.badge}</span>
            <h3 class="ai-modal-title">${p.nama}</h3>
            <span class="ai-category-tag">${p.kategori} • ${p.subKategori}</span>
          </div>
        </div>
      </div>
      
      <div class="ai-modal-body">
        <div class="ai-modal-price-card">
          <div>
            <small style="color:var(--text-muted); font-size:0.7rem; display:block;">Harga Promo Resmi:</small>
            <span class="ai-price-promo" style="font-size:1.25rem;">${p.hargaPromoFormatted}</span>
            <span class="ai-price-normal">${p.hargaFormatted}</span>
          </div>
          <div style="text-align:right;">
            <span class="ai-status-pill"><i class="fa-solid fa-check"></i> ${(p.status || "READY").toUpperCase()}</span>
          </div>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-circle-info"></i> Deskripsi & Fitur</h4>
          <p>${p.deskripsi}</p>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-user-lock"></i> Tipe Akun & Ketentuan Garansi</h4>
          <p>• <b>Tipe Akun:</b> ${p.jenisAkun}</p>
          <p>• <b>Masa Garansi:</b> ${p.garansi}</p>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-circle-question"></i> Pertanyaan Sering Diajukan (FAQ)</h4>
          ${faqHTML}
        </div>
      </div>

      <div class="ai-modal-footer">
        ${actionBtnModal}
      </div>
    `;
  }
};