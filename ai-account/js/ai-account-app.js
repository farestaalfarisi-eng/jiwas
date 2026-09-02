// ai-account/js/ai-account-app.js
// Central Engine Modul AI Account

const AiAccountEngine = {
  currentCategory: "Semua",
  searchQuery: "",

  init: function () {
    this.renderCategories();
    this.renderCatalog();
    this.renderHomeShowcase();
  },

  // Render Category Chips Scroll
  renderCategories: function () {
    const categories = [
      "Semua",
      "AI",
      "Design",
      "Video",
      "Produktivitas",
      "Streaming"
    ];
    const container = document.getElementById("aiCategoriesContainer");
    if (!container) return;

    container.innerHTML = categories
      .map((cat) =>
        AiAccountComponents.renderCategoryChip(cat, this.currentCategory)
      )
      .join("");
  },

  // Select Category Trigger
  selectCategory: function (catName) {
    this.currentCategory = catName;
    this.renderCategories();
    this.renderCatalog();
  },

  // Search Input Trigger
  handleSearch: function (query) {
    this.searchQuery = query;
    this.renderCatalog();
  },

  // Render Main Grid Catalog AI Account
  renderCatalog: function () {
    const grid = document.getElementById("aiAccountCatalogGrid");
    if (!grid) return;

    const filtered = SupplierConnector.filterProducts(
      this.currentCategory,
      this.searchQuery
    );

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:30px 10px; color:var(--text-muted); font-size:0.8rem;">
          <i class="fa-solid fa-box-open" style="font-size:2rem; color:var(--gold-primary); margin-bottom:8px; display:block;"></i>
          Produk AI yang dicari belum tersedia.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((p) => AiAccountComponents.renderProductCard(p))
      .join("");
  },

  // Render Showcase di Section HOME (Link & Card Sync)
  renderHomeShowcase: function () {
    const homeRow = document.getElementById("homeRowAkunAI");
    if (!homeRow) return;

    const topItems = SupplierConnector.getNormalizedProducts().slice(0, 4);
    homeRow.innerHTML = topItems
      .map(
        (p) => `
      <div class="home-card-portrait" onclick="AiAccountEngine.openDetailModal('${p.id}')">
        <div class="badge-container-top">
          <span class="badge-pill badge-app">🤖 ${p.kategori}</span>
        </div>
        <img src="${p.logo}" alt="${p.nama}" loading="lazy" onerror="this.onerror=null; this.src='images/showcase/emosi-1.jpg';">
        <div class="home-card-label" style="text-align:left; padding:8px 10px;">
          <div style="font-weight:800; font-size:0.78rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.nama}</div>
          <div class="card-rating-badge"><i class="fa-solid fa-star"></i> 4.9/5</div>
          <small style="color:var(--gold-primary); font-weight:800; font-size:0.75rem; display:block; margin-top:2px;">
            ${p.hargaPromoFormatted}
          </small>
          <button class="btn-copy" style="margin-top:6px; padding:4px 8px; font-size:0.7rem; width:100%;">
            Beli Akses
          </button>
        </div>
      </div>
    `
      )
      .join("");
  },

  // Detail Modal Controls
  openDetailModal: function (productId) {
    const product = SupplierConnector.getProductById(productId);
    if (!product) return;

    let modalOverlay = document.getElementById("aiDetailModal");
    if (!modalOverlay) {
      modalOverlay = document.createElement("div");
      modalOverlay.id = "aiDetailModal";
      modalOverlay.className = "modal-overlay hidden";
      modalOverlay.onclick = () => this.closeDetailModal();
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="ai-modal-container" onclick="event.stopPropagation()">
        ${AiAccountComponents.renderDetailModalContent(product)}
      </div>
    `;

    modalOverlay.classList.remove("hidden");
  },

  closeDetailModal: function () {
    const modalOverlay = document.getElementById("aiDetailModal");
    if (modalOverlay) modalOverlay.classList.add("hidden");
  }
};

// Auto-run saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  AiAccountEngine.init();
});