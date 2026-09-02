// ai-account/js/supplier-connector.js
// Layer Abstraksi Supplier (Mengoisolasi Supplier & Mengatur Link Pembelian)

const SupplierConnector = {
  // Mapping Supplier ke Kontak Fulfillment Reseller/Admin TIGAJIWA
  getWhatsAppAdminNumber: function () {
    return typeof NOMOR_WA_ADMIN_CONFIG !== "undefined"
      ? NOMOR_WA_ADMIN_CONFIG
      : "6281234567890";
  },

  // Normalisasi Data Produk dari Database ke Standard Component View
  getNormalizedProducts: function (rawProducts = DATABASE_AI_ACCOUNT) {
    return rawProducts.map((p) => {
      const waNumber = this.getWhatsAppAdminNumber();
      const textMessage = encodeURIComponent(
        `Halo Admin TIGAJIWA STUDIO, saya ingin memesan Akun AI:\n` +
          `• Produk: ${p.nama}\n` +
          `• Harga Promo: Rp ${p.hargaPromo.toLocaleString("id-ID")}\n` +
          `• Jenis: ${p.jenisAkun}\n` +
          `• Kode Internal: ${p.supplier.internalCode}\n\n` +
          `Mohon instruksi pembayaran & pengiriman akunnya.`
      );

      return {
        ...p,
        hargaFormatted: `Rp ${p.harga.toLocaleString("id-ID")}`,
        hargaPromoFormatted: `Rp ${p.hargaPromo.toLocaleString("id-ID")}`,
        linkBeli: `https://wa.me/${waNumber}?text=${textMessage}`
      };
    });
  },

  // Filter Produk berdasarkan Kategori atau Kata Kunci
  filterProducts: function (category = "Semua", searchQuery = "") {
    let items = this.getNormalizedProducts();

    if (category && category !== "Semua") {
      items = items.filter(
        (p) => p.kategori.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.nama.toLowerCase().includes(q) ||
          p.subKategori.toLowerCase().includes(q) ||
          p.deskripsi.toLowerCase().includes(q)
      );
    }

    return items;
  },

  // Ambil Detail Produk Tunggal berdasarkan ID
  getProductById: function (id) {
    const items = this.getNormalizedProducts();
    return items.find((p) => p.id === id) || null;
  }
};