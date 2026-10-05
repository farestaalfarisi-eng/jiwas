// =========================================================================
// JIWAS STUDIO — MASTER DATABASE AI & DIGITAL ACCOUNT (database.js V3.2 FULL)
// Terintegrasi Penuh API H2H INCA STORE, FINSHOP & JIWAS Backend Gateway
// =========================================================================

const DATABASE_AI_ACCOUNT = [
  // ==================== KATEGORI: UMKM & KOMERSIAL ====================
  {
    id: "umkm-studio-pro",
    nama: "UMKM Product Staging Pro",
    kategori: "UMKM",
    subKategori: "Commercial Product Studio",
    logo: "images/canvas/canva.jpg",
    harga: 40000,
    hargaPromo: 10000,
    badge: "🔥 UMKM JUARA",
    status: "ready",
    jenisAkun: "Akses Suite & Template Promosi",
    garansi: "Full Garansi Bisnis",
    deskripsi: "Paket lengkap penataan foto produk makanan, fashion, kosmetik, dan mockup katalog katalog e-commerce otomatis berkualitas iklan komersial.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 9000, price: 20000, ready: true }
    ],
    faq: [
      { q: "Cocok untuk jualan online?", a: "Sangat cocok untuk foto katalog Shopee, Tokopedia, TikTok Shop, dan WhatsApp Bisnis." },
      { q: "Apakah ada panduannya?", a: "Tersedia panduan lengkap penggunaan formula foto dan penataan teks promo." }
    ],
    supplier: { supplierId: "INCA_STORE", internalCode: "UMKM-PRO" },
    apiConfig: { productId: "UMKM PRO", variant: "Default" }
  }
];

// Pasang ke jendela runtime global
if (typeof window !== "undefined") {
  window.DATABASE_AI_ACCOUNT = DATABASE_AI_ACCOUNT;
}