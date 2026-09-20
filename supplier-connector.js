// =========================================================================
// JIWAS STUDIO — MASTER SUPPLIER CONNECTOR (supplier-connector.js Full Edition)
// Backend Server Gateway • WhatsApp Order Routing • Multi-Variant Auto Order
// Terintegrasi H2H INCA STORE & JIWAS Catalog System
// =========================================================================

const SupplierConnector = {
  getWhatsAppAdminNumber: function () {
    return (
      localStorage.getItem("JIWAS_CUSTOM_WA") ||
      (typeof NOMOR_WA_ADMIN_CONFIG !== "undefined"
        ? NOMOR_WA_ADMIN_CONFIG
        : "6282255267793")
    );
  },

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
          `• Jenis: ${p.kategori || "Akun Digital"}\n\n` +
          `Mohon informasi ketersediaan akunnya ya.`
      );

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

  getProductById: function (id) {
    const items = this.getNormalizedProducts();
    return items.find((p) => p.id === id) || null;
  },

  // Eksekusi API Pembelian ke Backend Gateway Node.js
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
        headers: { "Content-Type": "application/json" },
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

  // Router Pembelian: Cek Varian -> Buka Modal Pilihan Varian -> Eksekusi
  prosesPembelianAkun: function (productId) {
    const product = this.getProductById(productId);
    if (!product) {
      alert("Produk tidak ditemukan dalam sistem katalog!");
      return;
    }

    if (!product.isAutoApi) {
      window.open(product.linkBeli, "_blank");
      return;
    }

    // Jika produk memiliki multi-varian (CapCut 7 Hari / 30 Hari, Canva 1 Bulan / 1 Tahun)
    if (product.variants && product.variants.length > 0) {
      this.bukaModalVarian(product);
    } else {
      const defaultVar = (product.apiConfig && product.apiConfig.defaultVariant) ? product.apiConfig.defaultVariant : "Default";
      this.eksekusiOrderFinal(product, defaultVar, product.hargaPromoFormatted);
    }
  },

  // Modal UI Pemilihan Varian Instan
  bukaModalVarian: function (product) {
    let modal = document.getElementById("jiwasVariantModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "jiwasVariantModal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }

    let variantButtons = "";
    product.variants.forEach((v) => {
      const isReady = (typeof v.ready !== "undefined") ? v.ready : (v.stock > 0);
      const stockBadge = isReady 
        ? `<span style="color:#22c55e; font-weight:700;">(Ready Stok: ${v.stock})</span>`
        : `<span style="color:#ef4444; font-weight:700;">[HABIS]</span>`;

      const btnStyle = isReady
        ? "background:#171722; border:1px solid rgba(212,175,55,0.25); color:#fff; cursor:pointer;"
        : "background:#0e0e14; border:1px solid rgba(255,255,255,0.06); color:#64748b; cursor:not-allowed; opacity:0.6;";

      const onClickAction = isReady 
        ? `onclick="SupplierConnector.tutupModalVarian(); SupplierConnector.eksekusiOrderFinal(SupplierConnector.getProductById('${product.id}'), '${v.name}', 'Rp ${v.price.toLocaleString('id-ID')}')"`
        : "";

      variantButtons += `
        <button type="button" class="btn-copy" style="width:100%; padding:12px 14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border-radius:8px; ${btnStyle}" ${onClickAction}>
          <span><strong>${v.name}</strong> ${stockBadge}</span>
          <span style="color:var(--gold-light); font-weight:800; font-size:0.9rem;">Rp ${v.price.toLocaleString('id-ID')}</span>
        </button>
      `;
    });

    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px; text-align:left; background:#111118; border:1px solid rgba(212,175,55,0.3); border-radius:12px; padding:20px;">
        <button class="btn-modal-close" onclick="SupplierConnector.tutupModalVarian()" aria-label="Tutup" style="position:absolute; top:12px; right:12px; background:none; border:none; color:#888; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
        <h3 style="font-family:'Cinzel', serif; color:var(--gold-light); font-size:1.1rem; margin-bottom:4px;">Pilih Durasi Paket</h3>
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:16px;">${product.nama} — Diproses otomatis via Gateway Inca Store.</p>
        <div style="display:flex; flex-direction:column;">
          ${variantButtons}
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  },

  tutupModalVarian: function () {
    const modal = document.getElementById("jiwasVariantModal");
    if (modal) modal.classList.add("hidden");
  },

  // Final Dispatcher ke Bot Inca Store
  eksekusiOrderFinal: async function (product, chosenVariant, priceFormatted) {
    const konfirmasi = confirm(
      `Konfirmasi Transaksi Instan:\n\n` +
      `• Produk: ${product.nama}\n` +
      `• Varian: ${chosenVariant}\n` +
      `• Total: ${priceFormatted}\n\n` +
      `Lanjutkan pemesanan otomatis ke server Inca Bot?`
    );

    if (!konfirmasi) return;

    try {
      if (typeof tampilkanToast === "function") {
        tampilkanToast("⏳ Menghubungi server Inca Bot...");
      }

      const res = await this.orderAkunAuto(
        product.apiConfig.productId,
        chosenVariant,
        1
      );

      if (res.success && res.data) {
        const akunList = Array.isArray(res.data.stock_data)
          ? res.data.stock_data.join("\n")
          : (res.data.stock_data || "Akun berhasil dikirim oleh sistem.");

        const snkText = res.data.snk ? `\n\n📌 Catatan/Garansi:\n${res.data.snk}` : "";
        const sisaSaldo = typeof res.data.remaining_balance !== "undefined"
          ? `\nSisa Saldo Reseller: Rp ${res.data.remaining_balance.toLocaleString("id-ID")}`
          : "";

        if (typeof tampilkanToast === "function") {
          tampilkanToast("🎉 Pemesanan Berhasil!");
        }

        alert(
          `🎉 PEMESANAN BERHASIL!\n\n` +
          `Produk: ${res.data.product || product.nama}\n` +
          `Varian: ${res.data.variant || chosenVariant}\n\n` +
          `🔑 DATA AKUN / KODE AKSES:\n${akunList}` +
          `${snkText}` +
          `${sisaSaldo}`
        );
      } else if (res.success || res.status === "success") {
        if (typeof tampilkanToast === "function") tampilkanToast("🎉 Transaksi Berhasil!");
        alert("🎉 Transaksi Berhasil Diproses oleh Sistem!");
      } else {
        const errorMsg = res.error || res.message || "Gagal memproses pesanan ke supplier.";
        if (typeof tampilkanToast === "function") tampilkanToast("⚠️ Pesanan Gagal.");
        alert(`⚠️ Transaksi Ditolak Supplier:\n${errorMsg}`);
      }
    } catch (e) {
      console.error(e);
      if (typeof tampilkanToast === "function") tampilkanToast("❌ Gangguan Server");
      alert("❌ Terjadi kendala koneksi ke gateway JIWAS. Pastikan server Node.js aktif di port 3000.");
    }
  }
};