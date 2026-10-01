// =========================================================================
// JIWAS ATELIER — MASTER BLUEPRINT: COMMERCIAL UMKM & PRODUCT STUDIO
// Folder: prompts/umkm/commercial.js
// DNA Gaya: Dark Luxury Obsidian, Wet Condensation, 8K Studio Strobe Lighting
// =========================================================================

window.BLUEPRINT_UMKM_COMMERCIAL = {
  theme: "Commercial Product & Food Studio 8K",
  coreStyle: "Dark obsidian aesthetic, crisp wet condensation, dramatic dual rim lighting, hyper-realistic reflections",
  cameraSpecs: "Hasselblad H6D-100c, 100mm Macro Lens, f/4, ISO 64, 1/800s high-speed studio shutter",
  renderQuality: "masterpiece, commercial advertising photography, ultra-detailed texture, 8k resolution --ar 9:16",
  watermark: 'Subtle watermark "JIWAS"',

  // Generator Formula Kilat (Gunakan fungsi ini saat meracik request pesanan)
  generate: function(subjekProduk, aksenVisual) {
    return `Commercial advertising product photography of ${subjekProduk}, ${aksenVisual}, dark luxury obsidian studio background, crisp wet condensation droplets, dramatic studio rim lighting, Hasselblad H6D-100c 100mm Macro, 8k resolution --ar 9:16 Subtle watermark "JIWAS"`;
  },

  // Motion Blueprint (Jika dipesan dalam format Video Motion AI)
  generateMotion: function(gerakanKamera, efekAksi) {
    return `Slow-motion commercial product reveal, ${gerakanKamera}, ${efekAksi}, cinematic ARRI Alexa LF motion blur, smooth continuous 60fps, vertical 9:16 frame`;
  }
};

// =========================================================================
// ETALASE DATA: 3 LIVE PROOFS + ROADMAP TREN ON-DEMAND
// Sesuai dengan ID: 'umkm-commercial' di registry
// =========================================================================
window.PROMPTS_UMKM_COMMERCIAL = [
  // -----------------------------------------------------------------------
  // 3 SAMPLE LIVE PERTAMA (Aset Fisik 1.jpg, 2.jpg, 3.jpg di images/umkm/)
  // -----------------------------------------------------------------------
  {
    status: "live",
    id: 1,
    title: "Cold Brew Artisan Splash 8K",
    prompt: "Commercial product photography of a cold brew glass bottle, iced splash water droplets, dark obsidian slate surface, dramatic studio rim lighting, Hasselblad H6D-100c, 8k resolution --ar 9:16 Subtle watermark \"JIWAS\"",
    motion: "Slow dolly push-in, water droplets and ice splash in ultra slow-motion 120fps, cinematic lighting"
  },
  {
    status: "live",
    id: 2,
    title: "Skincare Amber Serum on Black Marble",
    prompt: "Commercial luxury skincare serum amber dropper bottle placed on wet black polished marble, soft morning mist, elegant studio backlight, hyper-detailed glass reflection, 8k resolution --ar 9:16 Subtle watermark \"JIWAS\"",
    motion: "Continuous subtle orbital pan around the amber bottle, soft ambient light shimmer reflecting on wet marble"
  },
  {
    status: "live",
    id: 3,
    title: "Crispy Golden Ayam Goreng Dark Studio",
    prompt: "Commercial food photography of crispy golden fried chicken, steaming hot vapor rising, falling roasted chili flakes, dark textured rustic stone surface, macro lens focus, mouthwatering 8k --ar 9:16 Subtle watermark \"JIWAS\"",
    motion: "Micro push-in to hot steam rising from crunchy skin texture, slow cinematic tilt down"
  },

  // -----------------------------------------------------------------------
  // ITEM #4 DST: ROADMAP TREN VIRAL (ON-DEMAND / BY REQUEST)
  // Tidak perlu file gambar fisik terpisah; sistem otomatis memakai template poster
  // -----------------------------------------------------------------------
  {
    status: "on_demand",
    id: 4,
    badge: "🔥 Sedang Tren",
    title: "Boba Brown Sugar Melt Aesthetic",
    deskripsi: "Efek lelehan sirup gula aren kental yang mengalir di dinding gelas kaca dengan butiran boba mengkilap."
  },
  {
    status: "on_demand",
    id: 5,
    badge: "⚡ Permintaan Tinggi",
    title: "Matcha Latte Pouring Dual-Layer",
    deskripsi: "Momen tuangan susu segar ke seduhan matcha pekat, menghasilkan lapisan gradasi hijau-putih sinematik."
  },
  {
    status: "on_demand",
    id: 6,
    badge: "🔥 Sedang Tren",
    title: "Floating Deconstructed Burger",
    deskripsi: "Komposisi burger melayang terurai: roti brioche, daging wagyu panggang, keju leleh, dan sayuran segar."
  },
  {
    status: "on_demand",
    id: 7,
    badge: "✨ By Request",
    title: "Parfum Amber Glass with Smoky Veil",
    deskripsi: "Botol parfum kaca dengan aksen asap tipis dramatis dan pantulan pendar emas di atas meja obsidian."
  },
  {
    status: "on_demand",
    id: 8,
    badge: "⚡ Permintaan Tinggi",
    title: "Mockup Kemasan Pouch Kopi Kraft",
    deskripsi: "Standing pouch kopi bertekstur kertas kraft dengan taburan biji kopi sangrai dan latar belakang kayu gelap."
  },
  {
    status: "on_demand",
    id: 9,
    badge: "✨ By Request",
    title: "Cosmetic Tube with Golden Silk Waves",
    deskripsi: "Kemasan krim kosmetik diapit lekukan kain sutra emas lembut bergelombang dengan pencahayaan fesyen editorial."
  },
  {
    status: "on_demand",
    id: 10,
    badge: "🔥 Sedang Tren",
    title: "Crispy Sambal Jar with Fresh Herbs",
    deskripsi: "Toples sambal kaca dengan minyak cabai merah berkilau, taburan bawang goreng renyah, dan cabai rawit segar."
  }
];