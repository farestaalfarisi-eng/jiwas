// =========================================================================
// JIWAS ATELIER — AI ACCOUNT STORE ENGINE (ai-account-app.js V4.0 FULL MASTER)
// Architecture: Universal Multi-Vendor Dynamic Variant & Hybrid 3-Way Checkout
// Integrated with Command Center (analytics.html) & Modern UI Components
// =========================================================================

window.AiAccountEngine = {
  activeCategory: "all",
  searchQuery: "",

  /**
   * Mengambil basis data produk AI:
   * 1. Memprioritaskan data override hasil input/edit Lembar 5 analytics.html
   * 2. Fallback ke DATABASE_AI_ACCOUNT dari database.js jika storage kosong
   */
  getProducts: function () {
    let products = [];

    // 1. PRIORITAS UTAMA: Ambil langsung dari file database.js hasil deploy
    if (typeof DATABASE_AI_ACCOUNT !== "undefined" && Array.isArray(DATABASE_AI_ACCOUNT) && DATABASE_AI_ACCOUNT.length > 0) {
      products = DATABASE_AI_ACCOUNT;
    } else {
      // 2. FALLBACK CADANGAN: Storage browser jika database.js belum siap
      try {
        const stored = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            products = parsed;
          }
        }
      } catch (e) {
        console.warn("[AI ENGINE]: Gagal membaca storage", e);
      }
    }

    // Normalisasi struktur varian agar etalase aman dari error
    return products
      .filter(p => p.aktif !== false)
      .map(p => {
        let vList = (p.variants && Array.isArray(p.variants) && p.variants.length > 0)
          ? p.variants
          : [
              {
                name: "30 Hari",
                kriteria: p.jenisAkun || "Direct",
                garansi: p.garansi || "Full Garansi",
                cost: p.hargaModal || 5000,
                price: p.hargaPromo || 15000,
                stock: p.stok !== undefined ? p.stok : 10,
                ready: (p.stok !== undefined ? p.stok : 10) > 0
              }
            ];

        const minPrice = Math.min(...vList.map(v => Number(v.price) || 15000));
        const totalStok = vList.reduce((sum, v) => sum + (parseInt(v.stock, 10) || 0), 0);

        return {
          ...p,
          variants: vList,
          hargaPromo: minPrice,
          stok: totalStok
        };
      });
  },

  /**
   * Inisialisasi awal etalase
   */
  init: function () {
    this.renderCategories();
    this.renderProducts();
    this.bindStorageListener();
  },

  /**
   * Sinkronisasi Real-Time: Jika data di analytics.html diupdate di tab lain,
   * etalase index.html langsung otomatis render ulang tanpa refresh manual.
   */
  bindStorageListener: function () {
    window.addEventListener("storage", (e) => {
      if (e.key === "JIWAS_AI_PRODUCTS_OVERRIDE") {
        this.renderProducts();
      }
    });
  },

  /**
   * Render tombol kategori filter melingkar (chips)
   */
  renderCategories: function () {
    const container = document.getElementById("aiCategoriesContainer");
    if (!container) return;

    const categories = [
      { key: "all", label: "Semua Akun" },
      { key: "AI", label: "🤖 AI & Coding" },
      { key: "Video", label: "🎬 Video & Motion" },
      { key: "Design", label: "🎨 Desain & Grafis" },
      { key: "Produktivitas", label: "⚡ Tools & Bisnis" }
    ];

    container.innerHTML = categories.map(cat => {
      const isActive = this.activeCategory.toLowerCase() === cat.key.toLowerCase();
      return `
        <button type="button" 
                class="ai-chip ${isActive ? "active" : ""}" 
                onclick="AiAccountEngine.selectCategory('${cat.key}')">
          ${cat.label}
        </button>
      `;
    }).join("");
  },

  /**
   * Memilih kategori dan memfilter tampilan
   */
  selectCategory: function (categoryKey) {
    this.activeCategory = categoryKey;
    this.renderCategories();
    this.renderProducts();
  },

  /**
   * Pencarian langsung (Live Search)
   */
  handleSearch: function (query) {
    this.searchQuery = (query || "").toLowerCase().trim();
    this.renderProducts();
  },

  /**
   * Render kartu-kartu produk AI ke etalase utama & etalase preview Home
   */
  renderProducts: function () {
    const grid = document.getElementById("aiAccountCatalogGrid");
    const gridHome = document.getElementById("gridHomeDigitalAi");

    const allItems = this.getProducts();

    const filtered = allItems.filter(p => {
      const matchCat = (this.activeCategory === "all") || 
        ((p.kategori || "").toLowerCase() === this.activeCategory.toLowerCase());

      const matchSearch = (this.searchQuery === "") ||
        ((p.nama || "").toLowerCase().includes(this.searchQuery)) ||
        ((p.deskripsi || "").toLowerCase().includes(this.searchQuery)) ||
        ((p.kategori || "").toLowerCase().includes(this.searchQuery)) ||
        ((p.jenisAkun || "").toLowerCase().includes(this.searchQuery));

      return matchCat && matchSearch;
    });

    let html = "";
    if (filtered.length === 0) {
      html = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 36px 12px; color: var(--text-muted); font-size: 0.82rem;">
          <i class="fa-solid fa-box-open" style="font-size: 2.2rem; margin-bottom: 10px; color: var(--card-border); display: block;"></i>
          <strong>Tidak ada produk yang cocok</strong>
          <p style="margin-top: 4px; font-size: 0.75rem;">Coba cari dengan kata kunci lain atau pilih kategori "Semua Akun".</p>
        </div>
      `;
    } else {
      html = filtered.map(item => {
        if (typeof AiAccountComponents !== "undefined" && typeof AiAccountComponents.renderProductCard === "function") {
          return AiAccountComponents.renderProductCard(item);
        }
        return "";
      }).join("");
    }

    // Render ke Tab Khusus Akun AI
    if (grid) grid.innerHTML = html;

    // Render ke Section Cuplikan Akun AI di Halaman Depan (Home/Atelier)
    if (gridHome) {
      const previewItems = allItems.slice(0, 4);
      gridHome.innerHTML = previewItems.map(item => {
        if (typeof AiAccountComponents !== "undefined" && typeof AiAccountComponents.renderProductCard === "function") {
          return AiAccountComponents.renderProductCard(item);
        }
        return "";
      }).join("");
    }
  },

  /**
   * Buka Modal Rincian Produk Lengkap (Fitur, FAQ, Garansi, Pilihan Varian)
   */
  openDetailModal: function (productId) {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let modal = document.getElementById("aiDetailModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "aiDetailModal";
      modal.className = "modal-overlay hidden";
      modal.style.zIndex = "10001";
      modal.innerHTML = `
        <div class="modal-content" id="aiDetailModalContent" style="max-width: 440px; text-align: left; max-height: 90vh; overflow-y: auto; background: #13131b; border: 1px solid var(--card-border); padding: 18px;">
        </div>
      `;
      document.body.appendChild(modal);
    }

    const contentBox = document.getElementById("aiDetailModalContent");
    if (contentBox && typeof AiAccountComponents !== "undefined") {
      contentBox.innerHTML = AiAccountComponents.renderDetailModalContent(product);
      modal.classList.remove("hidden");
    }
  },

  /**
   * Menutup Modal Detail Produk
   */
  closeDetailModal: function () {
    const modal = document.getElementById("aiDetailModal");
    if (modal) modal.classList.add("hidden");
  }
};

// Eksekusi otomatis saat DOM siap (Aman & Anti-Crash)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AiAccountEngine !== "undefined" && typeof AiAccountEngine.init === "function") {
    AiAccountEngine.init();
  } else if (typeof window.AiAccountEngine !== "undefined" && typeof window.AiAccountEngine.init === "function") {
    window.AiAccountEngine.init();
  }
});