// =========================================================================
// JIWAS ATELIER & STORE — HYBRID SUPPLIER CONNECTOR (FULL VERSION)
// Mode: Semi-Otomatis (Direct WhatsApp Checkout & Catalog Formatter)
// =========================================================================

const SupplierConnector = {
  // Ganti dengan nomor WhatsApp aktif admin (format: 628xxx tanpa tanda + atau spasi)
  ADMIN_WA: "6282255267793",

  // Nama brand toko untuk header format pesan
  STORE_NAME: "JIWAS ATELIER DIGITAL STORE",

  /**
   * Mengambil data produk lokal jika helper getProductById tersedia
   * @param {string|number} id 
   * @returns {object|null}
   */
  resolveProductData: function (id) {
    try {
      if (typeof getProductById === "function") {
        return getProductById(id);
      }
      if (typeof window.jiwasProducts !== "undefined" && Array.isArray(window.jiwasProducts)) {
        return window.jiwasProducts.find(p => String(p.id) === String(id)) || null;
      }
    } catch (e) {
      console.warn("[SupplierConnector] Gagal melacak database produk:", e);
    }
    return null;
  },

  /**
   * Eksekusi pemesanan akun semi-otomatis via WhatsApp
   * @param {string|number} productId - ID Produk dari database
   * @param {string} variant - Durasi / varian (misal: "7 Hari", "30 Hari")
   * @param {number} qty - Jumlah akun
   * @param {string} target - Email tujuan atau akun target pembeli
   */
  orderAkunAuto: async function (productId, variant = "Default", qty = 1, target = "") {
    try {
      const product = this.resolveProductData(productId);
      const productName = product ? product.name : `Produk AI (${productId})`;
      const itemPrice = product ? (product.price || product.harga || 0) : 0;
      const totalEstimasi = itemPrice ? `Rp ${(itemPrice * qty).toLocaleString("id-ID")}` : "Menyesuaikan Varian";
      
      const orderId = "JWS-" + Date.now().toString().slice(-6);

      // Susun pesan WhatsApp yang jelas, elegan, dan siap proses
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
      const waUrl = `https://wa.me/${this.ADMIN_WA}?text=${encodeURIComponent(fullMessage)}`;

      // Buka aplikasi / web WhatsApp di jendela baru
      const win = window.open(waUrl, "_blank");
      if (!win) {
        window.location.href = waUrl;
      }

      return {
        success: true,
        mode: "semi_otomatis",
        orderId: orderId,
        message: "Pesanan berhasil dialihkan ke WhatsApp Admin."
      };
    } catch (err) {
      console.error("[SupplierConnector Error]:", err);
      alert("Terjadi kendala saat membuka WhatsApp. Silakan hubungi admin langsung.");
      throw err;
    }
  },

  /**
   * Health check kompatibilitas untuk antarmuka katalog
   */
  checkConnection: async function () {
    return {
      status: "ONLINE",
      mode: "SEMI_AUTOMATIC_WA",
      adminWa: this.ADMIN_WA
    };
  }
};

// Pasang ke objek jendela global browser
window.SupplierConnector = SupplierConnector;