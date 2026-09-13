// ai-account-app.js (Safe Mode - Zero Crash)
const AiAccountEngine = {
  currentCategory: "Semua",
  searchQuery: "",

  init: function () {
    this.renderCategories();
    this.renderCatalog();
    this.renderHomeShowcase();
  },

  renderCategories: function () {
    const categories = ["Semua", "AI", "Design", "Video", "Produktivitas"];
    const container = document.getElementById("aiCategoriesContainer");
    if (!container) return;

    if (typeof AiAccountComponents !== "undefined" && AiAccountComponents.renderCategoryChip) {
      container.innerHTML = categories
        .map((cat) => AiAccountComponents.renderCategoryChip(cat, this.currentCategory))
        .join("");
    }
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

    if (typeof SupplierConnector === "undefined") return;

    const filtered = SupplierConnector.filterProducts(this.currentCategory, this.searchQuery);

    if (!filtered || filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:36px 12px; color:var(--text-muted); font-size:0.8rem;">
          <i class="fa-solid fa-box-open" style="font-size:2rem; color:var(--gold-primary); margin-bottom:8px; display:block;"></i>
          Produk AI yang dicari belum tersedia.
        </div>
      `;
      return;
    }

    if (typeof AiAccountComponents !== "undefined" && AiAccountComponents.renderProductCard) {
      grid.innerHTML = filtered.map((p) => AiAccountComponents.renderProductCard(p)).join("");
    }
  },

  renderHomeShowcase: function () {
    const homeRow = document.getElementById("homeRowAkunAI");
    if (!homeRow) return; // Langsung keluar jika tidak ada elemen, anti-crash!

    if (typeof SupplierConnector === "undefined") return;
    const topItems = SupplierConnector.getNormalizedProducts().slice(0, 4);
    homeRow.innerHTML = topItems
      .map(
        (p) => `
      <div class="home-card-portrait" onclick="AiAccountEngine.openDetailModal('${p.id}')">
        <img src="${p.logo}" alt="${p.nama}" loading="lazy" onerror="this.onerror=null; this.src='images/velvet/cover.jpg';">
        <div class="home-card-label" style="text-align:left; padding:8px 10px;">
          <div style="font-weight:800; font-size:0.78rem;">${p.nama}</div>
          <small style="color:var(--gold-primary); font-weight:800; display:block; margin-top:2px;">${p.hargaPromoFormatted}</small>
        </div>
      </div>
    `
      )
      .join("");
  },

  openDetailModal: function (productId) {
    if (typeof SupplierConnector === "undefined") return;
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

    if (typeof AiAccountComponents !== "undefined") {
      modalOverlay.innerHTML = `
        <div class="ai-modal-container" onclick="event.stopPropagation()">
          ${AiAccountComponents.renderDetailModalContent(product)}
        </div>
      `;
      modalOverlay.classList.remove("hidden");
    }
  },

  closeDetailModal: function () {
    const modalOverlay = document.getElementById("aiDetailModal");
    if (modalOverlay) modalOverlay.classList.add("hidden");
  }
};

window.renderKatalogAkun = function () {
  AiAccountEngine.init();
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    AiAccountEngine.init();
  } catch (e) {
    console.warn("AI Engine Init Warning:", e);
  }
});