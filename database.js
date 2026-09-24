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
  },
  {
    id: "canva-umkm-brand",
    nama: "Canva Pro Bisnis & UMKM",
    kategori: "UMKM",
    subKategori: "Brand Kit & Banner",
    logo: "images/canvas/canva.jpg",
    harga: 35000,
    hargaPromo: 7000,
    badge: "💼 SPESIAL UMKM",
    status: "ready",
    jenisAkun: "Invite Tim / Direct Akun",
    garansi: "Full Garansi Sesuai Durasi",
    deskripsi: "Akses Brand Kit resmi, logo creator, penghapus background foto produk 1-klik, dan ribuan template promosi media sosial UMKM.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 15000, ready: true }
    ],
    faq: [
      { q: "Apakah desain produk lama hilang?", a: "Tidak hilang sama sekali, akun pribadi Anda tetap terpisah dan aman." }
    ],
    supplier: { supplierId: "INCA_STORE", internalCode: "CANVA-UMKM" },
    apiConfig: { productId: "CANVA PRO", variant: "Default" }
  },

  // ==================== KATEGORI: DESAIN, EDITING & KREATIF ====================
  {
    id: "canva-pro",
    nama: "Canva Pro Desain Suite",
    kategori: "Design",
    subKategori: "Graphic Design",
    logo: "images/canvas/canva.jpg",
    harga: 35000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Invite Tim / Direct Akun",
    garansi: "Full Garansi Sesuai Durasi",
    deskripsi: "Akses 100+ juta foto, elemen grafis premium, audio, video latar, Magic Studio AI, Brand Kit, resize otomatis satu klik, serta penghapus latar belakang foto & video instan.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 15000, ready: true }
    ],
    faq: [
      { 
        q: "Apakah desain lama saya di Canva pribadi tetap aman?", 
        a: "Sangat aman. Sistem menggunakan invite tim resmi, sehingga seluruh desain pribadi Anda tidak terhapus dan tidak dapat diakses oleh anggota tim lain." 
      },
      { 
        q: "Apakah fitur Brand Kit dan Resize Ajaib bisa dipakai?", 
        a: "Ya, semua fitur Magic Studio AI dan Brand Kit Canva Pro dapat digunakan tanpa batasan." 
      },
      { 
        q: "Bagaimana jika undangan tim terputus?", 
        a: "Admin akan langsung mengirimkan link tim baru atau invite ulang selama masa paket aktif berjalan." 
      }
    ],
    supplier: { supplierId: "INCA_STORE", internalCode: "CANVA-PRO" },
    apiConfig: { productId: "CANVA PRO", variant: "Default" }
  },
  {
    id: "capcut-pro",
    nama: "CapCut Pro Full Feature",
    kategori: "Video",
    subKategori: "Video Editing",
    logo: "images/canvas/capcut.jpg",
    harga: 30000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login (PC & HP)",
    garansi: "Full Garansi Sesuai Durasi",
    deskripsi: "Buka seluruh efek transisi pro, filter sinematik, fitur AI auto-caption bahasa Indonesia otomatis, penghapus latar belakang video instan, dan ekspor kualitas tinggi hingga 4K tanpa watermark.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 7000, price: 15000, ready: true }
    ],
    faq: [
      { 
        q: "Bisa digunakan di perangkat apa saja?", 
        a: "Mendukung login di PC/Laptop (Windows & Mac) serta smartphone (Android & iOS)." 
      },
      { 
        q: "Apakah fitur AI Auto-Caption & ekspor 4K terbuka?", 
        a: "Ya, seluruh fitur Pro termasuk AI Speech-to-Text dan ekspor tanpa watermark terbuka penuh." 
      },
      { 
        q: "Bagaimana jika terjadi kendala login sebelum masa aktif selesai?", 
        a: "Tersedia garansi replace/perbaikan akun selama durasi aktif paket (7 Hari atau 30 Hari) masih berjalan." 
      }
    ],
    supplier: { supplierId: "INCA_STORE", internalCode: "CAPCUT-PRO" },
    apiConfig: { productId: "CAPCUT PRO", variant: "Default" }
  },
  {
    id: "capcut-basic",
    nama: "CapCut Basic Hemat",
    kategori: "Video",
    subKategori: "Video Editing",
    logo: "images/canvas/capcut.jpg",
    harga: 15000,
    hargaPromo: 5000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Akun",
    garansi: "Garansi Aktif",
    deskripsi: "Pilihan paling hemat untuk membuka fitur esensial editing video TikTok & Reels tanpa watermark.",
    variants: [
      { name: "7 Hari", cost: 2000, price: 5000, ready: true },
      { name: "30 Hari", cost: 4000, price: 10000, ready: true }
    ],
    faq: [{ q: "Bisa langsung pakai?", a: "Data akun terkirim otomatis detik ini juga." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "CAPCUT-BASIC" },
    apiConfig: { productId: "CAPCUT BASIC", variant: "Default" }
  },
  {
    id: "alightmotion",
    nama: "Alight Motion Pro",
    kategori: "Video",
    subKategori: "Motion Graphics",
    logo: "images/canvas/motion.jpg",
    harga: 25000,
    hargaPromo: 10000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Buka preset XML, efek motion grafis, masking presisi, dan ekspor video resolusi tinggi tanpa watermark.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 8000, price: 18000, ready: true }
    ],
    faq: [{ q: "Support preset 5MB?", a: "Ya, mendukung impor preset besar tanpa kendala." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "ALIGHTMOTION" },
    apiConfig: { productId: "ALIGHTMOTION", variant: "Default" }
  },
  {
    id: "remini",
    nama: "Remini AI Photo Enhancer",
    kategori: "Design",
    subKategori: "AI Retouch",
    logo: "images/canvas/remini2.jpg",
    harga: 40000,
    hargaPromo: 10000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Pertajam foto buram, tingkatkan resolusi wajah hingga HD micro-detail dan rekonstruksi tekstur kulit dalam 1 ketukan.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 8000, price: 18000, ready: true }
    ],
    faq: [{ q: "Bisa untuk foto lama?", a: "Bisa, sangat optimal untuk restorasi foto keluarga lawas atau hasil jepretan buram." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "REMINI" },
    apiConfig: { productId: "REMINI", variant: "Default" }
  },
  {
    id: "meitu",
    nama: "Meitu VIP Makeup & Filter",
    kategori: "Design",
    subKategori: "Beauty Retouch",
    logo: "images/canvas/meitu.jpg",
    harga: 35000,
    hargaPromo: 9000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Akses seluruh filter estetika, AI makeup studio, body reshape, dan fitur portrait retouch VIP Meitu tanpa batas.",
    variants: [
      { name: "7 Hari", cost: 3500, price: 9000, ready: true },
      { name: "30 Hari", cost: 7000, price: 15000, ready: true }
    ],
    faq: [{ q: "Untuk iOS & Android?", a: "Bisa digunakan di smartphone Android maupun iPhone." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "MEITU" },
    apiConfig: { productId: "MEITU", variant: "Default" }
  },
  {
    id: "wink",
    nama: "Wink VIP+ Video Retouch",
    kategori: "Video",
    subKategori: "Video Retouch",
    logo: "images/canvas/wink.jpg",
    harga: 45000,
    hargaPromo: 10000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login VIP+",
    garansi: "Full Garansi",
    deskripsi: "Tingkatkan kualitas video wajah hingga 4K, samarkan kerutan pada frame video bergerak, dan berikan sentuhan AI beauty sinematik.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 9000, price: 20000, ready: true }
    ],
    faq: [{ q: "Support 4K?", a: "Ya, mendukung export video portrait kualitas ultra-jernih." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "WINK-VIP" },
    apiConfig: { productId: "WINK VIP+", variant: "Default" }
  },

  // ==================== KATEGORI: AI & SMART TOOLS ====================
  {
    id: "ai-gemini",
    nama: "Google Gemini Advanced AI",
    kategori: "AI",
    subKategori: "Multimodal AI",
    logo: "images/canvas/gemini.jpg",
    harga: 80000,
    hargaPromo: 15000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login / Shared",
    garansi: "Garansi Sesuai Durasi",
    deskripsi: "Akses Gemini 1.5 Pro memori konteks besar untuk analisa dokumen panjang, koding, dan pembuatan konten kreatif otomatis.",
    variants: [
      { name: "7 Hari", cost: 6000, price: 15000, ready: true },
      { name: "30 Hari", cost: 15000, price: 35000, ready: true }
    ],
    faq: [{ q: "Apakah instan?", a: "Ya, detail akun langsung dikirimkan seketika setelah verifikasi pesanan." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "AI-GEMINI" },
    apiConfig: { productId: "AI GEMINI", variant: "Default" }
  },
  {
    id: "chatgpt",
    nama: "ChatGPT Plus GPT-4o",
    kategori: "AI",
    subKategori: "Text & Coding",
    logo: "images/canvas/gpt.jpg",
    harga: 95000,
    hargaPromo: 20000,
    badge: "🔥 POPULER",
    status: "ready",
    jenisAkun: "Shared Account Private",
    garansi: "Full Garansi",
    deskripsi: "Akses GPT-4o tanpa batas, generator visual DALL-E 3, analisa data spreadsheet, browser integrasi, dan Custom GPTs resmi.",
    variants: [
      { name: "7 Hari", cost: 9000, price: 20000, ready: true },
      { name: "30 Hari", cost: 18000, price: 45000, ready: true }
    ],
    faq: [{ q: "Bisa untuk riset?", a: "Sangat direkomendasikan untuk koding, skripsi, dan penulisan naskah panjang." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "CHATGPT" },
    apiConfig: { productId: "CHATGPT", variant: "Default" }
  },

  // ==================== KATEGORI: STREAMING & MUSIK ====================
  {
    id: "netflix",
    nama: "Netflix Premium UHD 4K",
    kategori: "Produktivitas",
    subKategori: "Streaming Film",
    logo: "images/canvas/neflix.jpg",
    harga: 50000,
    hargaPromo: 12000,
    badge: "🎬 4K UHD",
    status: "ready",
    jenisAkun: "Akun Sharing / Private Profil",
    garansi: "Anti Hold Garansi",
    deskripsi: "Nonton film dan serial orisinal Netflix kualitas 4K HDR tanpa gangguan di Smart TV, HP, atau Laptop.",
    variants: [
      { name: "7 Hari", cost: 5000, price: 12000, ready: true },
      { name: "30 Hari", cost: 12000, price: 28000, ready: true }
    ],
    faq: [{ q: "Bisa di Smart TV?", a: "Bisa, cukup login menggunakan email dan password yang diberikan admin." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "NETFLIX" },
    apiConfig: { productId: "NETFLIX", variant: "Default" }
  },
  {
    id: "youtube-premium",
    nama: "YouTube Premium & Music",
    kategori: "Produktivitas",
    subKategori: "Streaming Bebas Iklan",
    logo: "images/canvas/youtube.jpg",
    harga: 30000,
    hargaPromo: 6000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct / Invite Keluarga",
    garansi: "Full Garansi",
    deskripsi: "Bebas jeda iklan, putar video di latar belakang dengan layar mati, serta akses penuh YouTube Music.",
    variants: [
      { name: "7 Hari", cost: 2500, price: 6000, ready: true },
      { name: "30 Hari", cost: 5000, price: 12000, ready: true }
    ],
    faq: [{ q: "Bisa pakai akun sendiri?", a: "Bisa melalui sistem invite email resmi keluarga." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "YOUTUBE-PREM" },
    apiConfig: { productId: "YOUTUBE PREMIUM", variant: "Default" }
  },
  {
    id: "spotify",
    nama: "Spotify Premium Individual",
    kategori: "Produktivitas",
    subKategori: "Audio Streaming",
    logo: "images/canvas/vision.jpg",
    harga: 40000,
    hargaPromo: 8000,
    badge: "🎧 HI-RES",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Dengarkan jutaan lagu tanpa jeda iklan, skip tanpa batas, dan unduh lagu untuk didengar secara offline.",
    variants: [
      { name: "7 Hari", cost: 3500, price: 8000, ready: true },
      { name: "30 Hari", cost: 8000, price: 18000, ready: true }
    ],
    faq: [{ q: "Bisa download lagu?", a: "Bisa didengarkan secara offline tanpa menghabiskan kuota." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "SPOTIFY-PREM" },
    apiConfig: { productId: "SPOTIFY PREMIUM", variant: "Default" }
  },
  {
    id: "apple-music",
    nama: "Apple Music Lossless",
    kategori: "Produktivitas",
    subKategori: "Audio Streaming",
    logo: "images/canvas/music.jpg",
    harga: 35000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Invite / Direct",
    garansi: "Full Garansi",
    deskripsi: "Kualitas audio Lossless tanpa kompresi dan dukungan audio spasial Dolby Atmos.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 15000, ready: true }
    ],
    faq: [{ q: "Bisa untuk Android?", a: "Bisa diinstal dan diputar di aplikasi Apple Music Android maupun iOS." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "APPLE-MUSIC" },
    apiConfig: { productId: "APPLE MUSIC", variant: "Default" }
  },
  {
    id: "vidio",
    nama: "Vidio Platinum",
    kategori: "Produktivitas",
    subKategori: "Streaming Sports & Drama",
    logo: "images/canvas/video.jpg",
    harga: 45000,
    hargaPromo: 10000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Nonton tayangan olahraga live, siaran bola, sinetron, serial orisinal Vidio, dan film bioskop Indonesia.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 9000, price: 22000, ready: true }
    ],
    faq: [{ q: "Bisa nonton bola?", a: "Mencakup siaran live match sesuai ketentuan paket Vidio Platinum." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "VIDIO" },
    apiConfig: { productId: "VIDIO", variant: "Default" }
  },
  {
    id: "viu",
    nama: "Viu Premium (Drakor)",
    kategori: "Produktivitas",
    subKategori: "Asian Drama",
    logo: "images/canvas/viu.jpg",
    harga: 25000,
    hargaPromo: 5000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Akun Instan",
    garansi: "Full Garansi",
    deskripsi: "Streaming serial drama Korea, anime, dan variety show Asia dengan subtitle Indonesia tercepat dan bebas iklan.",
    variants: [
      { name: "7 Hari", cost: 2000, price: 5000, ready: true },
      { name: "30 Hari", cost: 4000, price: 10000, ready: true }
    ],
    faq: [{ q: "Bebas iklan?", a: "Ya, seluruh tayangan bebas jeda iklan." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "VIU-PREM" },
    apiConfig: { productId: "VIU PREMIUM", variant: "Default" }
  },
  {
    id: "bstation",
    nama: "Bstation (Bilibili) Premium",
    kategori: "Produktivitas",
    subKategori: "Anime HD",
    logo: "images/canvas/cover.jpg",
    harga: 25000,
    hargaPromo: 6000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Akun Instan",
    garansi: "Full Garansi",
    deskripsi: "Nonton anime favorit kualitas 1080p/4K tanpa batas unduhan dan tanpa jeda iklan.",
    variants: [
      { name: "7 Hari", cost: 2500, price: 6000, ready: true },
      { name: "30 Hari", cost: 5000, price: 12000, ready: true }
    ],
    faq: [{ q: "Resolusi video?", a: "Membuka seluruh akses resolusi tertinggi hingga 4K." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "BSTATION" },
    apiConfig: { productId: "BSTATION", variant: "Default" }
  },
  {
    id: "wetv",
    nama: "WeTV VIP",
    kategori: "Produktivitas",
    subKategori: "Drama & Series",
    logo: "images/canvas/wetv.jpg",
    harga: 30000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Akses fast-track drama China, serial orisinal Indonesia viral, dan tayangan VIP sebelum rilis umum.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 14000, ready: true }
    ],
    faq: [{ q: "Episode VIP terbuka?", a: "Semua episode berlabel VIP langsung dapat ditonton." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "WETV" },
    apiConfig: { productId: "WE TV", variant: "Default" }
  },
  {
    id: "visionplus",
    nama: "Vision+ Premium",
    kategori: "Produktivitas",
    subKategori: "TV & Live Streaming",
    logo: "images/canvas/vi.jpg",
    harga: 30000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "Saluran TV nasional terlengkap, film box office Indonesia, dan serial orisinal Vision+.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 15000, ready: true }
    ],
    faq: [{ q: "Bisa nonton TV nasional?", a: "Bisa diakses dari smartphone, tablet, maupun browser." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "VISIONPLUS" },
    apiConfig: { productId: "VISION+", variant: "Default" }
  },

  // ==================== KATEGORI: TOOLS, VPN & EDUKASI ====================
  {
    id: "express-vpn",
    nama: "ExpressVPN Premium",
    kategori: "Produktivitas",
    subKategori: "Security & VPN",
    logo: "images/canvas/expressvpn.jpg",
    harga: 60000,
    hargaPromo: 12000,
    badge: "🔒 SECURE",
    status: "ready",
    jenisAkun: "Direct Login / Key",
    garansi: "Full Garansi",
    deskripsi: "Koneksi VPN berkecepatan tinggi untuk perlindungan privasi, enkripsi lalu lintas data, dan unblock situs global.",
    variants: [
      { name: "7 Hari", cost: 5000, price: 12000, ready: true },
      { name: "30 Hari", cost: 10000, price: 25000, ready: true }
    ],
    faq: [{ q: "Bisa ganti negara?", a: "Tersedia server di lebih dari 90 negara di dunia." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "EXPRESS-VPN" },
    apiConfig: { productId: "EXPRESS VPN", variant: "Default" }
  },
  {
    id: "inca-hma-vpn",
    nama: "HMA VPN (HideMyAss)",
    kategori: "Produktivitas",
    subKategori: "Security & VPN",
    logo: "images/canvas/vpn.jpg",
    harga: 45000,
    hargaPromo: 10000,
    badge: "🔒 SECURE",
    status: "ready",
    jenisAkun: "Direct Login",
    garansi: "Full Garansi",
    deskripsi: "VPN andal dengan jangkauan ribuan IP lokasi untuk browsing anonim dan aman.",
    variants: [
      { name: "7 Hari", cost: 4000, price: 10000, ready: true },
      { name: "30 Hari", cost: 8000, price: 20000, ready: true }
    ],
    faq: [{ q: "Bisa di HP?", a: "Dapat diinstal di Android, iOS, maupun PC." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "HMA-VPN" },
    apiConfig: { productId: "HMA VPN", variant: "Default" }
  },
  {
    id: "zoom-pro",
    nama: "Zoom Pro Meeting",
    kategori: "Produktivitas",
    subKategori: "Video Conference",
    logo: "images/canvas/zoom.jpg",
    harga: 50000,
    hargaPromo: 12000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Direct Login / Lisensi",
    garansi: "Full Garansi",
    deskripsi: "Meeting tanpa batas limit 40 menit, kapasitas hingga 100 peserta, dan fitur rekaman sesi cloud.",
    variants: [
      { name: "7 Hari", cost: 5000, price: 12000, ready: true },
      { name: "30 Hari", cost: 11000, price: 25000, ready: true }
    ],
    faq: [{ q: "Bisa meeting seharian?", a: "Durasi meeting dapat berjalan hingga 30 jam nonstop." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "ZOOM" },
    apiConfig: { productId: "ZOOM", variant: "Default" }
  },
  {
    id: "duolingo",
    nama: "Duolingo Super (Plus)",
    kategori: "Produktivitas",
    subKategori: "Belajar Bahasa",
    logo: "images/canvas/duo.jpg",
    harga: 35000,
    hargaPromo: 7000,
    badge: "⚡ AUTO BOT",
    status: "ready",
    jenisAkun: "Invite / Direct",
    garansi: "Full Garansi",
    deskripsi: "Belajar bahasa asing tanpa batas hati (nyawa tak terbatas), latihan pengucapan khusus, dan tanpa gangguan iklan.",
    variants: [
      { name: "7 Hari", cost: 3000, price: 7000, ready: true },
      { name: "30 Hari", cost: 6000, price: 15000, ready: true }
    ],
    faq: [{ q: "Progres belajar aman?", a: "Aman, progres dan streak belajar Anda tetap berlanjut normal." }],
    supplier: { supplierId: "INCA_STORE", internalCode: "DUOLINGO" },
    apiConfig: { productId: "DUOLINGO", variant: "Default" }
  }
];

// Pasang ke jendela runtime global
if (typeof window !== "undefined") {
  window.DATABASE_AI_ACCOUNT = DATABASE_AI_ACCOUNT;
}