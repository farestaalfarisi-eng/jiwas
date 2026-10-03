// config-pin.js — Konfigurasi PIN dan Nomor Admin JIWAS
const NOMOR_WA_ADMIN_CONFIG = "6285181780429";

const LIST_PIN_KATALOG = {
  "velvet-lux": { pin10k: "VELVET10K", pin25k: "VELVETVIP25" },
  "hijab-lux": { pin10k: "HIJAB10K", pin25k: "HIJABVIP25" },
  "couple-cinematic": { pin10k: "COUPLE10K", pin25k: "COUPLEVIP25" },
  "family-lux": { pin10k: "FAMILY10K", pin25k: "FAMILYVIP25" },
  "family02-lux": { pin10k: "FAMILY0210K", pin25k: "FAMILY02VIP25" },
  "family03-lux": { pin10k: "FAMILY0310K", pin25k: "FAMILY03VIP25" },
// Daftarkan di dalam objek LIST_PIN_KATALOG:
  "family-cloud36": {
  pin10k: "CLOUD3610K",
  pin25k: "CLOUD36VIP25"
  },
"family-heritage36": {
  pin10k: "HERITAGE10K",
  pin25k: "HERITAGEVIP25"
},
"family-casual36": {
  pin10k: "CASUAL10K",
  pin25k: "CASUALVIP25"
},
  "ceo-lux": { pin10k: "CEO10K", pin25k: "CEOVIP25" },
  "fantasi-gold": { pin10k: "FANTASI10K", pin25k: "FANTASIVIP25" },
  "makeup-glam": { pin10k: "MAKEUP10K", pin25k: "MAKEUPVIP25" },
  "lifestyle-lux": { pin10k: "LIFESTYLE10K", pin25k: "LIFESTYLEVIP25" },
  "video-cinematic": { pin10k: "VIDEO10K", pin25k: "VIDEOVIP25" },
  "umkm-commercial": { pin10k: "UMKM10K", pin25k: "UMKMVIP25" },
  "sekolah-yearbook": { pin10k: "SEKOLAH10K", pin25k: "SEKOLAHVIP25" },
  "retouch-restoration": { pin10k: "RETOUCH10K", pin25k: "RETOUCHVIP25" },
  "zen-relaxation": { pin10k: "ZEN10K", pin25k: "ZENVIP25" },
  "nature-cinematic": { 
    pin10k: "ALAM10K", 
    pin25k: "ALAMVIP25" 
  },
  "slow-natural": { pin10k: "NATURAL10", pin25k: "NATURALVIP" },
"ninja-alone": {
  pin10k: "NINJA10K",
  pin25k: "ALONEVIP25"
},
"family-celestial36": {
  pin10k: "CELESTIAL10K",
  pin25k: "CELESTIALVIP25"
},
"high-space": {
    pin10k: "HSP10K",
    pin25k: "HSPVIP25"
  },
"lonely-boy": { pin10k: "LONY10", pin25k: "AUTUMN25VIP" },
// Tambahkan entri pasangan PIN ke dalam LIST_PIN_KATALOG di config-pin.js:
"green-natural": { pin10k: "GNAT10K", pin25k: "GNATVIP25" },
"romance-couple": { pin10k: "ROM10K", pin25k: "ROMVIP25" },
"beauty-village": { 
  pin10k: "BVIL10K", 
  pin25k: "BVILVIP25" 
},
"coastal-solitude": {
  pin10k: "CSOL10K",
  pin25k: "CSOLVIP25"
},
"coastal-serenity": {
  pin10k: "CSER10",
  pin25k: "CSERVIP25"
},
"alam-indah": { pin10k: "ALAM10K", pin25k: "ALAMVIP25" },
// Tambahkan ke dalam objek LIST_PIN_KATALOG di config-pin.js
"transformasi-of-life": {
  pin10k: "TOL10K",
  pin25k: "TOLVIP25"
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"hujan-deras": { 
  pin10k: "HD10K", 
  pin25k: "HDVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"dunia-fantasi": { 
  pin10k: "DF10K", 
  pin25k: "DFVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"romance": { 
  pin10k: "ROM10K", 
  pin25k: "ROMVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"romance-03": { 
  pin10k: "RM0310K", 
  pin25k: "RM03VIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"foto-90an": { 
  pin10k: "F90K10", 
  pin25k: "F90VIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"mesin-tani": { 
  pin10k: "MT10K", 
  pin25k: "MTVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"pengendara-moster": { 
  pin10k: "PM10K", 
  pin25k: "PMVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"tsunami": { 
  pin10k: "TSU10K", 
  pin25k: "TSUVIP25" 
},
// Tambahkan pasangan PIN ini ke dalam objek LIST_PIN_KATALOG
"megatrust": { 
  pin10k: "MGT10K", 
  pin25k: "MGTVIP25" 
},
"coastal-horizon": {
  pin10k: "COAST10K",
  pin25k: "HORIZON25VIP"
},
"divine-sanctuary": {
  pin10k: "SANCTUARY10K",
  pin25k: "DIVINE25VIP"
},
"stick-samurai": { pin10k: "STS10K", pin25k: "STSVIP25" },
"stik-samurai02": { pin10k: "STS0210K", pin25k: "STS02VIP25" },
"stik-samurai": {
  starter: "SAMURAI10K",
  vip: "SAMURAIVIP25K"
},
"stick-pendekar": {
  starter: "10981", // PIN Starter 10k
  vip: "25892"      // PIN VIP 25k
},
// Tambahkan entri ini ke dalam objek LIST_PIN_KATALOG di config-pin.js
"alam-desa": { 
  pin10k: "DESA10K", 
  pin25k: "DESAVIP25" 
},
"lahan-kebun": {
  starter: "10LHN",
  vip: "25LHN"
},
// Tambahkan ke dalam objek LIST_PIN_KATALOG di config-pin.js:
"puspa-rimba": { pin10k: "RIMBA10K", pin25k: "PUSPAVIP25" },
"family-trio-capsule36": {
  pin10k: "TRIO10KPASS",
  pin25k: "TRIOVIP25PASS"
},
"cloud-treehouse-haven": { pin10k: "CTH10K", pin25k: "CTHVIP25" },
"celestial-arbor": { pin10k: "ARBOR10K", pin25k: "VIPARBOR25" }

};

if (typeof window !== "undefined") {
  window.NOMOR_WA_ADMIN_CONFIG = NOMOR_WA_ADMIN_CONFIG;
  window.LIST_PIN_KATALOG = LIST_PIN_KATALOG;
}