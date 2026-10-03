// =========================================================================
// JIWAS STUDIO - CREATOR ECOSYSTEM MODULE (creator-products.js V1.1)
// Terintegrasi langsung dengan nomor WhatsApp Admin Resmi
// =========================================================================

const DATA_CREATORS = [
  {
    creatorId: "CR001",
    creatorName: "Aura Studio",
    creatorBrand: "Aura Studio",
    avatar: "images/showcase/emosi-1.jpg",
    bio: "Spesialis Visual Prompt Hijab Luxury & Aesthetics.",
    categories: ["Prompt", "Ebook"]
  },
  {
    creatorId: "CR002",
    creatorName: "Rizal Cinematic",
    creatorBrand: "Rizal Motion Lab",
    avatar: "images/showcase/emosi-2.jpg",
    bio: "AI Video Creator & Cinematic Prompt Specialist.",
    categories: ["Video", "Template"]
  }
];

const DATA_CREATOR_PRODUCTS = [
  {
    id: "CR001-PR0001",
    creatorId: "CR001",
    creatorName: "Aura Studio",
    creatorBrand: "Aura Studio",
    title: "Luxury Royal Hijab Collection",
    folder: "hijab",
    category: "Prompt",
    price: 29000,
    badge: "⭐ CREATOR",
    status: "publish",
    downloadUrl: "https://wa.me/6282255267793?text=Halo%20Admin%20JIWAS,%20saya%20ingin%20membeli%20Produk%20Kreator:%20*Luxury%20Royal%20Hijab%20Collection*%20(ID:%20CR001-PR0001)%20seharga%20Rp29.000.%20Mohon%20info%20pembayarannya%20ya."
  },
  {
    id: "CR002-VD0001",
    creatorId: "CR002",
    creatorName: "Rizal Cinematic",
    creatorBrand: "Rizal Motion Lab",
    title: "Cinematic Drone AI Video Suite",
    folder: "video",
    category: "Video",
    price: 35000,
    badge: "🔥 VIRAL",
    status: "publish",
    downloadUrl: "https://wa.me/6282255267793?text=Halo%20Admin%20JIWAS,%20saya%20ingin%20membeli%20Produk%20Kreator:%20*Cinematic%20Drone%20AI%20Video%20Suite*%20(ID:%20CR002-VD0001)%20seharga%20Rp35.000.%20Mohon%20info%20pembayarannya%20ya."
  }
];