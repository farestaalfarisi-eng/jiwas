// creator-products.js - Modul Data Creator Ecosystem V1.0 TIGAJIWA STUDIO
// MODULAR: Jika file ini dihapus, sistem utama TIGAJIWA STUDIO tetap berjalan normal.

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
    downloadUrl: "https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20beli%20Produk%20CR001-PR0001"
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
    downloadUrl: "https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20beli%20Produk%20CR002-VD0001"
  }
];