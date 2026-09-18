// =========================================================================
// JIWAS - DIGITAL AI & PRODUCT STORE ENGINE (Unified V3.0)
// Terhubung Langsung dengan database.js, components.js & SupplierConnector
// =========================================================================

var AiAccountEngine = (function () {
  var currentCategory = "all";
  var currentSearchQuery = "";

  function init() {
    renderCategories();
    renderCatalog();
  }

  function renderCategories() {
    var container = document.getElementById("aiCategoriesContainer");
    if (!container) return;

    var categories = [
      { id: "all", label: "Semua Koleksi", icon: "fa-solid fa-border-all" },
      { id: "product", label: "📦 Produk UMKM (30)", icon: "fa-solid fa-box-open" },
      { id: "AI", label: "AI & Coding", icon: "fa-solid fa-brain" },
      { id: "Design", label: "Desain & Gambar", icon: "fa-solid fa-palette" },
      { id: "Video", label: "Video Motion", icon: "fa-solid fa-clapperboard" },
      { id: "Produktivitas", label: "Produktivitas", icon: "fa-solid fa-bolt" }
    ];

    container.innerHTML = "";
    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "btn-sheet-tab " + (currentCategory.toLowerCase() === cat.id.toLowerCase() ? "active" : "");
      btn.style.cssText = "font-size:0.75rem; padding:7px 14px; border-radius:30px; margin-right:6px; margin-bottom:8px; cursor:pointer;";
      btn.innerHTML = '<i class="' + cat.icon + '"></i> ' + cat.label;
      btn.onclick = function () {
        currentCategory = cat.id;
        renderCategories();
        renderCatalog();
      };
      container.appendChild(btn);
    });
  }

  function renderCatalog() {
    var grid = document.getElementById("aiAccountCatalogGrid");
    if (!grid) return;
    grid.innerHTML = "";

    // 1. Ambil Produk UMKM (30 Item) jika tab "all" atau "product"
    if (currentCategory === "all" || currentCategory.toLowerCase() === "product") {
      var productPacks = [];
      if (typeof getActiveRegistry === "function") {
        productPacks = getActiveRegistry().filter(function (p) { 
          return p.type === "product" && p.status === "live"; 
        });
      } else if (typeof KATALOG_REGISTRY !== "undefined" && Array.isArray(KATALOG_REGISTRY)) {
        productPacks = KATALOG_REGISTRY.filter(function (p) { 
          return p.type === "product" && p.status === "live"; 
        });
      }

      if (productPacks.length === 0) {
        productPacks = [
          {
            id: "umkm-commercial",
            folder: "umkm-commercial",
            title: "Produk Komersial UMKM Staging",
            type: "product",
            status: "live",
            rating: "5.0/5",
            sales: "Baru Rilis"
          }
        ];
      }

      productPacks.forEach(function (pack) {
        if (currentSearchQuery && !pack.title.toLowerCase().includes(currentSearchQuery.toLowerCase())) {
          return;
        }

        var card = document.createElement("div");
        card.className = "catalog-card";
        card.style.cursor = "pointer";
        card.onclick = function () {
          if (typeof bukaDetailPack === "function") {
            bukaDetailPack(pack);
          }
        };

        var safeTitle = pack.title.replace(/"/g, '&quot;');
        var safeRating = pack.rating || "5.0/5";

        card.innerHTML = ''
          + '<div style="position:relative;">'
          + '  <span class="badge-pill" style="background:rgba(56,189,248,0.25); color:#38bdf8; border:1px solid #38bdf8;">'
          + '    <i class="fa-solid fa-box-open"></i> PRODUK UMKM (30)'
          + '  </span>'
          + '  <img src="products/' + pack.folder + '/1.webp" alt="' + safeTitle + '" class="aspect-9-16" loading="lazy"'
          + '       onload="this.classList.add(\'img-loaded\')" onerror="this.onerror=null; this.src=\'images/velvet/cover.jpg\'; this.classList.add(\'img-loaded\');">'
          + '</div>'
          + '<div class="card-info">'
          + '  <h3 class="card-title">' + safeTitle + '</h3>'
          + '  <div class="card-rating-badge">★ ' + safeRating + ' (30 Formula)</div>'
          + '  <div style="font-weight:800; color:var(--gold-light); font-size:0.85rem; margin-top:4px;">'
          + '    Rp10.000 / Rp25.000'
          + '  </div>'
          + '  <p style="font-size:0.72rem; color:var(--text-muted); margin:6px 0 8px; line-height:1.4;">'
          + '    Staging foto produk komersial, podium marmer, &amp; pencahayaan softbox makro 8K.'
          + '  </p>'
          + '  <button class="btn-copy" style="width:100%; padding:7px 12px; font-size:0.75rem;">Buka 30 Formula Produk</button>'
          + '</div>';

        grid.appendChild(card);
      });
    }

    // 2. Render Akun AI Menggunakan Data dari database.js & components.js
    if (currentCategory.toLowerCase() !== "product") {
      var rawItems = [];
      if (typeof SupplierConnector !== "undefined" && typeof SupplierConnector.getNormalizedProducts === "function") {
        rawItems = SupplierConnector.getNormalizedProducts();
      } else if (typeof DATABASE_AI_ACCOUNT !== "undefined") {
        rawItems = DATABASE_AI_ACCOUNT;
      }

      var filteredAccounts = rawItems.filter(function (item) {
        var matchCat = (currentCategory === "all" || item.kategori.toLowerCase() === currentCategory.toLowerCase());
        var matchSearch = !currentSearchQuery || 
                          item.nama.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                          (item.deskripsi && item.deskripsi.toLowerCase().includes(currentSearchQuery.toLowerCase()));
        return matchCat && matchSearch;
      });

      filteredAccounts.forEach(function (acc) {
        if (typeof AiAccountComponents !== "undefined" && typeof AiAccountComponents.renderProductCard === "function") {
          var wrapper = document.createElement("div");
          wrapper.innerHTML = AiAccountComponents.renderProductCard(acc);
          grid.appendChild(wrapper.firstElementChild);
        }
      });
    }

    if (grid.children.length === 0) {
      grid.innerHTML = ''
        + '<div style="grid-column:1/-1; text-align:center; padding:40px 10px; color:var(--text-muted);">'
        + '  <i class="fa-solid fa-box-open" style="font-size:2rem; margin-bottom:8px; color:var(--gold-primary);"></i>'
        + '  <p style="font-size:0.85rem;">Tidak ada item yang sesuai.</p>'
        + '</div>';
    }
  }

  function handleSearch(query) {
    currentSearchQuery = (query || "").trim();
    renderCatalog();
  }

  function openDetailModal(productId) {
    var p = null;
    if (typeof SupplierConnector !== "undefined") {
      p = SupplierConnector.getProductById(productId);
    }
    if (!p) return;

    var modal = document.getElementById("aiDetailModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "aiDetailModal";
      modal.className = "modal-overlay";
      modal.innerHTML = '<div class="modal-content" style="max-width:500px; text-align:left;" id="aiDetailModalContent"></div>';
      document.body.appendChild(modal);
    }

    var content = document.getElementById("aiDetailModalContent");
    if (content && typeof AiAccountComponents !== "undefined") {
      content.innerHTML = AiAccountComponents.renderDetailModalContent(p);
    }
    modal.classList.remove("hidden");
  }

  function closeDetailModal() {
    var modal = document.getElementById("aiDetailModal");
    if (modal) modal.classList.add("hidden");
  }

  return {
    init: init,
    handleSearch: handleSearch,
    renderCatalog: renderCatalog,
    openDetailModal: openDetailModal,
    closeDetailModal: closeDetailModal
  };
})();