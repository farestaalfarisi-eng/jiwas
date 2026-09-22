// =========================================================================
// JIWAS ATELIER & STORE — HYBRID SUPPLIER CONNECTOR (FULL VERSION)
// =========================================================================

const SupplierConnector = {
  ADMIN_WA: "6285181780429",
  STORE_NAME: "JIWAS ATELIER DIGITAL STORE",

  getAdminWa: function () {
    return localStorage.getItem("JIWAS_CUSTOM_WA") || this.ADMIN_WA;
  },

  resolveProductData: function (id) {
    try {
      const customAi = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
      if (customAi) {
        const parsed = JSON.parse(customAi);
        const item = parsed.find(p => String(p.id) === String(id));
        if (item) return item;
      }
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

  getNormalizedProducts: function () {
    try {
      const customAi = localStorage.getItem("JIWAS_AI_PRODUCTS_OVERRIDE");
      if (customAi) {
        const parsed = JSON.parse(customAi);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(p => p.aktif !== false);
        }
      }
    } catch (e) {}

    if (typeof DATABASE_AI_ACCOUNT !== "undefined" && Array.isArray(DATABASE_AI_ACCOUNT)) {
      return DATABASE_AI_ACCOUNT;
    }
    return [];
  },

  orderAkunAuto: async function (productId, variant = "Default", qty = 1, target = "") {
    try {
      const product = this.resolveProductData(productId);
      const productName = product ? (product.nama || product.name) : `Produk AI (${productId})`;

      let itemPrice = product ? (product.hargaPromo || product.harga || 0) : 0;
      if (product && product.variants && Array.isArray(product.variants)) {
        const targetV = product.variants.find(v => v.name.toLowerCase().includes(variant.toLowerCase()));
        if (targetV && targetV.price) {
          itemPrice = targetV.price;
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
        `🎯 *Target / Akun Pembeli:* ${target ? target : "Diproseskan Admin (Akun Baru / Siap Pakai)"}`,
        `💰 *Estimasi Total:* ${totalEstimasi}`,
        ``,
        `Mohon instruksi nomor rekening/QRIS untuk pembayaran dan konfirmasi ketersediaan stoknya. Terima kasih!`
      ];

      const fullMessage = messageLines.join("\n");
      const activeWa = this.getAdminWa();
      const waUrl = `https://wa.me/${activeWa}?text=${encodeURIComponent(fullMessage)}`;

      // Catat log aktivitas untuk Radar Analytics
      try {
        const logs = JSON.parse(localStorage.getItem("JIWAS_USER_LOGS") || "[]");
        logs.push({
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
          type: "CLICK_WA",
          target: productName,
          detail: `Pemesanan Akun AI (${variant})`
        });
        localStorage.setItem("JIWAS_USER_LOGS", JSON.stringify(logs));
      } catch (e) {}

      const win = window.open(waUrl, "_blank");
      if (!win) window.location.href = waUrl;

      return { success: true, orderId: orderId };
    } catch (err) {
      console.error("[SupplierConnector Error]:", err);
      alert("Terjadi kendala saat membuka WhatsApp. Silakan hubungi admin langsung.");
      throw err;
    }
  },

  checkConnection: async function () {
    return {
      status: "ONLINE",
      mode: "SEMI_AUTOMATIC_WA",
      adminWa: this.getAdminWa()
    };
  }
};

// Global helper agar onclick tombol beli langsung jalan
window.SupplierConnector = SupplierConnector;
window.beliAkunLangsung = function (productId, variant = "Default") {
  SupplierConnector.orderAkunAuto(productId, variant);
};