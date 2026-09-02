// ai-account/js/database.js
// Database Master Produk AI Account TIGAJIWA STUDIO V1.0 (Full Version)

const DATABASE_AI_ACCOUNT = [
  {
    id: "ai-chatgpt-plus",
    nama: "ChatGPT Plus (GPT-4o) Premium",
    kategori: "AI",
    subKategori: "Text & Coding",
    logo: "images/showcase/emosi-1.jpg",
    harga: 350000,
    hargaPromo: 65000,
    badge: "🔥 TERLARIS",
    status: "ready",
    jenisAkun: "Shared Account / Private PIN",
    garansi: "30 Hari Full Replace",
    deskripsi: "Akses resmi ChatGPT Plus GPT-4o, DALL-E 3, Browsing & Custom GPTs tanpa batas. Kecepatan respon maksimal cocok untuk riset, koding, dan konten.",
    faq: [
      { q: "Apakah perlu VPN?", a: "Tidak perlu, bisa diakses langsung dari Browser HP/Laptop." },
      { q: "Bagaimana jika terkena limit?", a: "Langsung klaim garansi ganti akun baru via Admin WhatsApp." }
    ],
    supplier: {
      supplierId: "SUP-PRIMARY",
      internalCode: "GPT4O-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-midjourney-pro",
    nama: "Midjourney v6 Standard Plan",
    kategori: "Design",
    subKategori: "Image Generator",
    logo: "images/showcase/emosi-2.jpg",
    harga: 480000,
    hargaPromo: 89000,
    badge: "💎 POPULER",
    status: "ready",
    jenisAkun: "Shared Discord Server",
    garansi: "30 Hari Full Garansi",
    deskripsi: "Hasilkan gambar photo-realistic 8K dengan AI Image Generator terbaik di dunia. Akses Fast GPU Hours resmi via Discord.",
    faq: [
      { q: "Bagaimana cara pakainya?", a: "Diberikan akses ke server Discord khusus yang sudah terhubung dengan bot Midjourney." }
    ],
    supplier: {
      supplierId: "SUP-PRIMARY",
      internalCode: "MJ-STD-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-claude-pro",
    nama: "Claude 3.5 Sonnet Pro",
    kategori: "AI",
    subKategori: "Copywriting & Analysis",
    logo: "images/showcase/emosi-3.jpg",
    harga: 320000,
    hargaPromo: 75000,
    badge: "⚡ FAST SPEED",
    status: "ready",
    jenisAkun: "Shared Account",
    garansi: "30 Hari Full Replace",
    deskripsi: "AI terbaik untuk pembuatan artikel natural, analisis dokumen PDF panjang, serta penulisan kode pemrograman yang sangat rapi.",
    faq: [
      { q: "Apakah cocok untuk bikin naskah?", a: "Sangat cocok, gaya bahasa Claude jauh lebih humanis dibanding AI lain." }
    ],
    supplier: {
      supplierId: "SUP-SECONDARY",
      internalCode: "CLAUDE-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-canva-pro",
    nama: "Canva Pro Invite Email (1 Tahun)",
    kategori: "Design",
    subKategori: "Graphic Design",
    logo: "images/showcase/emosi-4.jpg",
    harga: 150000,
    hargaPromo: 35000,
    badge: "🛡️ GARANSI 1 THN",
    status: "ready",
    jenisAkun: "Invite Email Private",
    garansi: "1 Tahun Garansi",
    deskripsi: "Upgrade akun Canva pribadi kamu menjadi Pro. Akses jutaan elemen, foto studio, background remover, dan brand kit tanpa batas.",
    faq: [
      { q: "Apakah desain lama saya hilang?", a: "Tidak! Cukup kirimkan email Canva kamu, kami invite ke tim Pro kami." }
    ],
    supplier: {
      supplierId: "SUP-PRIMARY",
      internalCode: "CANVA-1Y",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-capcut-pro",
    nama: "CapCut Pro PC & Mobile",
    kategori: "Video",
    subKategori: "Video Editing",
    logo: "images/showcase/emosi-5.jpg",
    harga: 180000,
    hargaPromo: 45000,
    badge: "🎥 TRENDING",
    status: "ready",
    jenisAkun: "Shared Account / Direct Login",
    garansi: "30 Hari Full Replace",
    deskripsi: "Buka semua efek pro, AI Auto Caption Indonesia, AI Smart Cutout, dan template eksklusif untuk konten TikTok/Reels.",
    faq: [
      { q: "Bisa untuk PC dan HP?", a: "Bisa untuk Windows, Mac, Android, maupun iOS." }
    ],
    supplier: {
      supplierId: "SUP-PRIMARY",
      internalCode: "CAPCUT-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-gemini-advanced",
    nama: "Google Gemini Advanced",
    kategori: "Produktivitas",
    subKategori: "Workspace AI",
    logo: "images/showcase/emosi-6.jpg",
    harga: 300000,
    hargaPromo: 55000,
    badge: "⭐ PREMIUM",
    status: "ready",
    jenisAkun: "Shared Google Account",
    garansi: "30 Hari Replace",
    deskripsi: "Akses Gemini 1.5 Pro dengan konteks memori super besar (1M tokens). Terintegrasi penuh dengan Google Docs, Gmail, & Drive.",
    faq: [
      { q: "Bisa analisis PDF tebal?", a: "Sangat bisa, mampu membaca dokumen hingga ratusan halaman dalam hitungan detik." }
    ],
    supplier: {
      supplierId: "SUP-SECONDARY",
      internalCode: "GEMINI-ADV-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-perplexity-pro",
    nama: "Perplexity AI Pro Search",
    kategori: "Produktivitas",
    subKategori: "AI Search Engine",
    logo: "images/showcase/emosi-7.jpg",
    harga: 310000,
    hargaPromo: 60000,
    badge: "🔍 SMART SEARCH",
    status: "ready",
    jenisAkun: "Shared Account",
    garansi: "30 Hari Full Replace",
    deskripsi: "Mesin pencari pintar berteknologi AI. Menggabungkan GPT-4o dan Claude 3.5 untuk menjawab pertanyaan lengkap dengan sitasi sumber akurat.",
    faq: [
      { q: "Apa kelebihannya dari Google?", a: "Langsung merangkum jawaban akurat tanpa perlu membuka puluhan website satu per satu." }
    ],
    supplier: {
      supplierId: "SUP-PRIMARY",
      internalCode: "PERPLEX-1M",
      directBuyUrl: ""
    }
  },
  {
    id: "ai-runway-gen2",
    nama: "RunwayML Gen-2 Unlimited Video",
    kategori: "Video",
    subKategori: "AI Video Generator",
    logo: "images/showcase/emosi-8.jpg",
    harga: 550000,
    hargaPromo: 120000,
    badge: "🎬 CINEMATIC",
    status: "ready",
    jenisAkun: "Shared Credit Account",
    garansi: "30 Hari Garansi",
    deskripsi: "Ubah foto menjadi video sinematik 4K secara otomatis. Tool wajib para creator video AI pendek & iklan profesional.",
    faq: [
      { q: "Bisa buat animasi dari foto?", a: "Sangat bisa, tinggal upload foto lalu beri instruksi gerakan kamera." }
    ],
    supplier: {
      supplierId: "SUP-SECONDARY",
      internalCode: "RUNWAY-1M",
      directBuyUrl: ""
    }
  }
];