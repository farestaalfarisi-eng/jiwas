// =========================================================================
// JIWAS STUDIO — SUPPLIER CONNECTOR (supplier-connector.js V2.0)
// =========================================================================

const SupplierConnector = {
  getWhatsAppAdminNumber: function () {
    return localStorage.getItem("JIWAS_CUSTOM_WA") || 
           (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined" ? NOMOR_WA_ADMIN_CONFIG : "6282255267793");
  },

  getNormalizedProducts: function (rawProducts = DATABASE_AI_ACCOUNT) {
    return rawProducts.map((p) => {
      const waNumber = this.getWhatsAppAdminNumber();
      const textMessage = encodeURIComponent(
        `Halo Admin JIWAS Atelier, saya ingin memesan Akun AI:\n` +
          `• Produk: ${p.nama}\n` +
          `• Harga Promo: Rp ${p.hargaPromo.toLocaleString("id-ID")}\n` +
          `• Jenis: ${p.jenisAkun}\n` +
          `• Kode Internal: ${p.supplier.internalCode}\n\n` +
          `Mohon info rekening atau QRIS pembayarannya ya.`
      );

      return {
        ...p,
        hargaFormatted: `Rp ${p.harga.toLocaleString("id-ID")}`,
        hargaPromoFormatted: `Rp ${p.hargaPromo.toLocaleString("id-ID")}`,
        linkBeli: `https://wa.me/${waNumber}?text=${textMessage}`
      };
    });
  },

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

  getProductById: function (id) {
    const items = this.getNormalizedProducts();
    return items.find((p) => p.id === id) || null;
  }
};