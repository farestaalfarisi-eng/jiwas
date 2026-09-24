// =========================================================================
// JIWAS ATELIER & STORE — HYBRID SUPPLIER CONNECTOR (FULL MASTER EDITION)
// Mode: Direct WhatsApp Checkout, Dynamic Admin Router & Catalog Formatter
// =========================================================================

const SupplierConnector = {
  ADMIN_WA_DEFAULT: "6282255267793",
  STORE_NAME: "JIWAS ATELIER DIGITAL STORE",

  /**
   * Mengambil nomor WhatsApp admin aktif (dari settingan Lembar 2 / default)
   */
  getAdminWa: function () {
    const customWa = localStorage.getItem("JIWAS_CUSTOM_WA");
    if (customWa && customWa.trim().length > 5) {
      return customWa.trim().replace(/[^0-9]/g, "");
    }
    if (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" && NOMOR_WA_ADMIN_CONFIG) {
      return String(NOMOR_WA_ADMIN_CONFIG).replace(/[^0-9]/g, "");
    }
    return this.ADMIN_WA_DEFAULT;
  },

  /**
   * Melacak data item produk dari override Lembar 5 atau database.js
   */
  resolveProductData: function (id) {
    try {
      // 1. Cek penyimpanan override Admin (Lembar 5)
      const customAi = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
      if (customAi) {
        const parsed = JSON.parse(customAi);
        const item = parsed.find(p => String(p.id) === String(id));
        if (item) return item;
      }

      // 2. Cek runtime window/global
      if (typeof getProductById === "function") {
        const p = getProductById(id);
        if (p) return p;
      }

      // 3. Cek array database.js
      if (typeof DATABASE_AI_ACCOUNT !== "undefined" && Array.isArray(DATABASE_AI_ACCOUNT)) {
        return DATABASE_AI_ACCOUNT.find(p => String(p.id) === String(id)) || null;
      }
    } catch (e) {
      console.warn("[SupplierConnector] Gagal melacak database produk:", e);
    }
    return null;
  },

  getProductById: function (id) {
    return this.resolveProductData(id);
  },

  /**
   * Mengembalikan semua produk yang siap dirender di katalog
   */
  getNormalizedProducts: function () {
    let sourceList = [];

    try {
      const customAi = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
      if (customAi) {
        const parsed = JSON.parse(customAi);
        if (Array.isArray(parsed) && parsed.length > 0) {
          sourceList = parsed.filter(p => p.aktif !== false);
        }
      }
    } catch (e) {
      console.warn("[SupplierConnector] Error parse custom AI products:", e);
    }

    if (sourceList.length === 0 && typeof DATABASE_AI_ACCOUNT !== "undefined" && Array.isArray(DATABASE_AI_ACCOUNT)) {
      sourceList = DATABASE_AI_ACCOUNT;
    }

    // Format properti display agar siap dipakai oleh renderProductCard
    return sourceList.map(item => {
      const promo = item.hargaPromo || item.harga || 15000;
      const normal = item.harga || Math.round(promo * 1.35);

      return {
        ...item,
        hargaPromo: promo,
        harga: normal,
        hargaPromoFormatted: "Rp" + Number(promo).toLocaleString("id-ID"),
        hargaFormatted: "Rp" + Number(normal).toLocaleString("id-ID"),
        badge: item.badge || "⚡ AUTO BOT",
        subKategori: item.subKategori || item.jenisAkun || "Direct Akun",
        garansi: item.garansi || "Garansi Sesuai Durasi",
        status: item.status || "ready"
      };
    });
  },

  /**
   * Eksekusi langsung pemesanan akun via WhatsApp
   */
  orderAkunAuto: async function (productId, variant = "30 Hari", qty = 1, target = "") {
    try {
      const product = this.resolveProductData(productId);
      const productName = product ? (product.nama || product.name) : `Produk Akun (${productId})`;

      let itemPrice = product ? (product.hargaPromo || product.harga || 0) : 0;
      if (product && product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
        const targetV = product.variants.find(v => v.name.toLowerCase().includes(variant.toLowerCase()));
        if (targetV && targetV.price) {
          itemPrice = targetV.price;
        } else {
          itemPrice = product.variants[0].price;
          variant = product.variants[0].name;
        }
      }

      const totalEstimasi = itemPrice ? `Rp ${(itemPrice * qty).toLocaleString("id-ID")}` : "Menyesuaikan Varian";
      const orderId = "JWS-" + Date.now().toString().slice(-6);

      const messageLines = [
        `Halo Admin *${this.STORE_NAME}*,`,
        `Saya ingin memesan akun digital dengan rincian berikut:`,
        ``,
        `🧾 *No. Pesanan:* ${orderId}`,
        `📦 *Nama Produk:* ${productName}`,
        `⏱️ *Varian / Durasi:* ${variant}`,
        `🔢 *Jumlah:* ${qty} Akun`,
        `🎯 *Target / Akun Pembeli:* ${target ? target : "Diproseskan Admin (Siap Pakai)"}`,
        `💰 *Estimasi Total:* ${totalEstimasi}`,
        ``,
        `Mohon info ketersediaan stok dan rekening pembayaran/QRIS. Terima kasih!`
      ];

      const fullMessage = messageLines.join("\n");
      const activeWa = this.getAdminWa();
      const waUrl = `https://wa.me/${activeWa}?text=${encodeURIComponent(fullMessage)}`;

      // Rekam interaksi ke localStorage untuk Lembar 1 Radar
      try {
        const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
        logs.push({
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
          type: "CLICK_WA",
          target: productName,
          detail: `Pemesanan Akun AI (${variant} - ${totalEstimasi})`
        });
        localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
      } catch (e) {}

      const win = window.open(waUrl, "_blank");
      if (!win) window.location.href = waUrl;

      return { success: true, orderId: orderId };
    } catch (err) {
      console.error("[SupplierConnector Error]:", err);
      alert("Terjadi kendala membuka WhatsApp. Silakan hubungi admin di nomor: " + this.getAdminWa());
      throw err;
    }
  },

  /**
   * Alias kompatibilitas jika tombol memanggil prosesPembelianAkun
   */
  prosesPembelianAkun: function (productId, variant = "30 Hari") {
    return this.orderAkunAuto(productId, variant);
  },

  checkConnection: async function () {
    return {
      status: "ONLINE",
      mode: "SEMI_AUTOMATIC_WA",
      adminWa: this.getAdminWa()
    };
  }
};

// Pasang ke window scope global
window.SupplierConnector = SupplierConnector;
window.beliAkunLangsung = function (productId, variant = "30 Hari") {
  SupplierConnector.orderAkunAuto(productId, variant);
};