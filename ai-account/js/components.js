// ai-account/js/components.js
// Factory Reusable UI Components khusus Modul AI Account

const AiAccountComponents = {
  // Product Card Component
  renderProductCard: function (p, onDetailClick) {
    return `
      <div class="ai-card" id="card-${p.id}">
        <div class="ai-card-image-wrap">
          <span class="ai-badge">${p.badge}</span>
          <img src="${p.logo}" alt="${p.nama}" loading="lazy" onerror="this.onerror=null; this.src='images/showcase/emosi-1.jpg';">
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
            <a href="${p.linkBeli}" target="_blank" class="btn-ai-buy">
              <i class="fa-brands fa-whatsapp"></i> Beli
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // Category Chip Component
  renderCategoryChip: function (catName, activeCategory) {
    const isActive = catName.toLowerCase() === activeCategory.toLowerCase();
    return `
      <button class="ai-chip ${isActive ? "active" : ""}" onclick="AiAccountEngine.selectCategory('${catName}')">
        ${catName}
      </button>
    `;
  },

  // Detail Modal Content Component
  renderDetailModalContent: function (p) {
    const faqHTML = p.faq
      .map(
        (f) => `
      <div class="ai-faq-item">
        <strong>Q: ${f.q}</strong>
        <p>A: ${f.a}</p>
      </div>
    `
      )
      .join("");

    return `
      <div class="ai-modal-header">
        <button class="ai-modal-close" onclick="AiAccountEngine.closeDetailModal()"><i class="fa-solid fa-xmark"></i></button>
        <div class="ai-modal-branding">
          <img src="${p.logo}" alt="${p.nama}" class="ai-modal-logo">
          <div>
            <span class="ai-badge" style="position:static; display:inline-block;">${p.badge}</span>
            <h3 class="ai-modal-title">${p.nama}</h3>
            <span class="ai-category-tag">${p.kategori} • ${p.subKategori}</span>
          </div>
        </div>
      </div>
      
      <div class="ai-modal-body">
        <div class="ai-modal-price-card">
          <div>
            <small style="color:var(--text-muted); font-size:0.7rem; display:block;">Harga Flash Sale:</small>
            <span class="ai-price-promo" style="font-size:1.3rem;">${p.hargaPromoFormatted}</span>
            <span class="ai-price-normal">${p.hargaFormatted}</span>
          </div>
          <div style="text-align:right;">
            <span class="ai-status-pill"><i class="fa-solid fa-check"></i> ${p.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-circle-info"></i> Deskripsi & Fitur</h4>
          <p>${p.deskripsi}</p>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-user-lock"></i> Jenis Akses & Garansi</h4>
          <p>• <b>Tipe Akun:</b> ${p.jenisAkun}</p>
          <p>• <b>Garansi Resmi:</b> ${p.garansi}</p>
        </div>

        <div class="ai-detail-section">
          <h4><i class="fa-solid fa-circle-question"></i> Pertanyaan Sering Diajukan (FAQ)</h4>
          ${faqHTML}
        </div>
      </div>

      <div class="ai-modal-footer">
        <a href="${p.linkBeli}" target="_blank" class="btn-hero-primary" style="text-decoration:none; width:100%;">
          <i class="fa-brands fa-whatsapp"></i> PESAN AKUN SEKARANG VIA WA
        </a>
      </div>
    `;
  }
};