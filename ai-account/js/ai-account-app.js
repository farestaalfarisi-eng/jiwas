// =========================================================================
// JIWAS STUDIO — AI ACCOUNT ENGINE (ai-account-app.js V2.0)
// =========================================================================

const AiAccountEngine = {
  currentCategory: "Semua",
  searchQuery: "",

  init: function () {
    this.renderCategories();
    this.renderCatalog();
  },

  renderCategories: function () {
    const categories = [
      "Semua",
      "AI",
      "Design",
      "Video",
      "Produktivitas"
    ];
    const container = document.getElementById("aiCategoriesContainer");
    if (!container) return;

    container.innerHTML = categories
      .map((cat) =>
        AiAccountComponents.renderCategoryChip(cat, this.currentCategory)
      )
      .join("");
  },

  selectCategory: function (catName) {
    this.currentCategory = catName;
    this.renderCategories();
    this.renderCatalog();
  },

  handleSearch: function (query) {
    this.searchQuery = query;
    this.renderCatalog();
  },

  renderCatalog: function () {
    const grid = document.getElementById("aiAccountCatalogGrid");
    if (!grid) return;

    const filtered = SupplierConnector.filterProducts(
      this.currentCategory,
      this.searchQuery
    );

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:36px 12px; color:var(--text-muted); font-size:0.8rem;">
          <i class="fa-solid fa-box-open" style="font-size:2.2rem; color:var(--gold-primary); margin-bottom:8px; display:block;"></i>
          Produk AI yang dicari belum tersedia.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((p) => AiAccountComponents.renderProductCard(p))
      .join("");
  },

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

// Override fungsi bawaan di app.js agar tab Digital AI selalu memanggil modul ini
window.renderKatalogAkun = function () {
  AiAccountEngine.init();
};

document.addEventListener("DOMContentLoaded", () => {
  AiAccountEngine.init();
});