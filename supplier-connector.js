// =========================================================================
// JIWAS STUDIO — MASTER SUPPLIER CONNECTOR (supplier-connector.js V3.2)
// Backend Server Gateway • WhatsApp Order Routing • Dual Execution Mode
// Terintegrasi H2H INCA STORE & JIWAS Catalog System
// =========================================================================

const SupplierConnector = {
  // 1. PENGATURAN WHATSAPP ADMIN
  getWhatsAppAdminNumber: function () {
    return (
      localStorage.getItem("JIWAS_CUSTOM_WA") ||
      (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined"
        ? NOMOR_WA_ADMIN_CONFIG
        : "6282255267793")
    );
  },

  // 2. NORMALISASI DATA PRODUK & FORMAT HARGA
  getNormalizedProducts: function (
    rawProducts = typeof DATABASE_AI_ACCOUNT !== "undefined"
      ? DATABASE_AI_ACCOUNT
      : []
  ) {
    return rawProducts.map((p) => {
      const waNumber = this.getWhatsAppAdminNumber();
      const textMessage = encodeURIComponent(
        `Halo Admin JIWAS Atelier, saya ingin memesan Akun:\n` +
          `• Produk: ${p.nama}\n` +
          `• Harga Promo: Rp ${(p.hargaPromo || p.harga).toLocaleString("id-ID")}\n` +
          `• Jenis: ${p.jenisAkun || "Akun Digital"}\n` +
          `• Kode Internal: ${p.supplier ? p.supplier.internalCode : "-"}\n\n` +
          `Mohon informasi nomor rekening atau instruksi pembayarannya ya.`
      );

      // Cek apakah produk memakai mode Auto-API Telegram/INCA STORE
      const isAutoApi = Boolean(p.apiConfig && p.apiConfig.productId);

      return {
        ...p,
        isAutoApi: isAutoApi,
        hargaFormatted: `Rp ${(p.harga || 0).toLocaleString("id-ID")}`,
        hargaPromoFormatted: `Rp ${(p.hargaPromo || p.harga || 0).toLocaleString("id-ID")}`,
        linkBeli: `https://wa.me/${waNumber}?text=${textMessage}`
      };
    });
  },

  // 3. FILTER & PENCARIAN PRODUK
  filterProducts: function (category = "Semua", searchQuery = "") {
    let items = this.getNormalizedProducts();

    if (category && category !== "Semua" && category !== "all") {
      items = items.filter(
        (p) => p.kategori && p.kategori.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (p) =>
          (p.nama && p.nama.toLowerCase().includes(q)) ||
          (p.subKategori && p.subKategori.toLowerCase().includes(q)) ||
          (p.deskripsi && p.deskripsi.toLowerCase().includes(q))
      );
    }

    return items;
  },

  getProductById: function (id) {
    const items = this.getNormalizedProducts();
    return items.find((p) => p.id === id) || null;
  },

  // 4. EKSEKUSI API KE BACKEND SERVER (server.js / serverless Vercel)
  orderAkunAuto: async function (productId, variant = "Default", qty = 1, target = "") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const SERVER_URL = isLocal
      ? "http://localhost:3000/api/order-inca"
      : "/api/order-inca";

    try {
      const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: String(productId),
          variant: String(variant),
          qty: Number(qty),
          target: String(target)
        })
      });

      const result = await response.json();
      return {
        httpStatus: response.status,
        ...result
      };
    } catch (err) {
      console.error("[SupplierConnector] Gagal menghubungi backend gateway:", err);
      throw err;
    }
  },

  // 5. SMART HANDLER PEMBELIAN AKUN (DUAL-MODE: AUTO BOT / WHATSAPP)
  prosesPembelianAkun: async function (productId) {
    const product = this.getProductById(productId);

    if (!product) {
      alert("Produk tidak ditemukan dalam sistem katalog!");
      return;
    }

    // A. JALUR PRODUK OTOMATIS (INCA STORE / H2H BOT)
    if (product.isAutoApi) {
      const konfirmasi = confirm(
        `Beli ${product.nama}\n` +
        `Harga: ${product.hargaPromoFormatted}\n\n` +
        `Lanjutkan transaksi instan via sistem otomatis?`
      );

      if (!konfirmasi) return;

      try {
        if (typeof tampilkanToast === "function") {
          tampilkanToast("⏳ Memproses pesanan ke gateway...");
        }

        const res = await this.orderAkunAuto(
          product.apiConfig.productId,
          product.apiConfig.variant || "Default",
          1
        );

        // Parsing hasil transaksi sukses
        if (res.success && res.data) {
          const akunList = Array.isArray(res.data.stock_data)
            ? res.data.stock_data.join("\n")
            : (res.data.stock_data || "Akun berhasil diproses.");

          const snkText = res.data.snk ? `\n\n📌 Catatan/Garansi:\n${res.data.snk}` : "";
          const sisaSaldo = typeof res.data.remaining_balance !== "undefined"
            ? `\nSisa Saldo Deposit: Rp ${res.data.remaining_balance.toLocaleString("id-ID")}`
            : "";

          if (typeof tampilkanToast === "function") {
            tampilkanToast("🎉 Pemesanan Berhasil!");
          }

          alert(
            `🎉 PEMESANAN BERHASIL!\n\n` +
            `Produk: ${res.data.product || product.nama}\n` +
            `Varian: ${res.data.variant || "-"}\n\n` +
            `🔑 DATA AKUN / KODE AKSES:\n${akunList}` +
            `${snkText}` +
            `${sisaSaldo}`
          );

        } else if (res.success || res.status === "success") {
          if (typeof tampilkanToast === "function") {
            tampilkanToast("🎉 Transaksi Berhasil!");
          }
          alert("🎉 Transaksi Berhasil Diproses oleh Sistem!");
        } else {
          // Penanganan galat (saldo kurang, stok habis, dsb.)
          const errorMsg = res.error || res.message || "Gagal memproses pesanan ke supplier.";
          if (typeof tampilkanToast === "function") {
            tampilkanToast("⚠️ Pesanan Gagal.");
          }
          alert(`⚠️ Transaksi Tidak Berhasil:\n${errorMsg}`);
        }

      } catch (e) {
        console.error(e);
        if (typeof tampilkanToast === "function") {
          tampilkanToast("❌ Gangguan Server");
        }
        alert("❌ Terjadi kendala koneksi ke server gateway JIWAS. Pastikan server backend Anda sedang aktif.");
      }

    } else {
      // B. JALUR PRODUK MANUAL / NON-API (DIARAHKAN KE ADMIN WHATSAPP)
      window.open(product.linkBeli, "_blank");
    }
  }
};