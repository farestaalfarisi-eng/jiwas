// config-pin.js — Konfigurasi PIN dan Nomor Admin JIWAS
const NOMOR_WA_ADMIN_CONFIG = "6285181780429";

const LIST_PIN_KATALOG = {
  "velvet-lux": { pin10k: "VELVET10K", pin25k: "VELVETVIP25" },
  "hijab-lux": { pin10k: "HIJAB10K", pin25k: "HIJABVIP25" },
  "couple-cinematic": { pin10k: "COUPLE10K", pin25k: "COUPLEVIP25" },
  "family-lux": { pin10k: "FAMILY10K", pin25k: "FAMILYVIP25" },
  "family02-lux": { pin10k: "FAMILY0210K", pin25k: "FAMILY02VIP25" },
  "family03-lux": { pin10k: "FAMILY0310K", pin25k: "FAMILY03VIP25" },
  "ceo-lux": { pin10k: "CEO10K", pin25k: "CEOVIP25" },
  "fantasi-gold": { pin10k: "FANTASI10K", pin25k: "FANTASIVIP25" },
  "makeup-glam": { pin10k: "MAKEUP10K", pin25k: "MAKEUPVIP25" },
  "lifestyle-lux": { pin10k: "LIFESTYLE10K", pin25k: "LIFESTYLEVIP25" },
  "video-cinematic": { pin10k: "VIDEO10K", pin25k: "VIDEOVIP25" },
  "umkm-commercial": { pin10k: "UMKM10K", pin25k: "UMKMVIP25" },
  "sekolah-yearbook": { pin10k: "SEKOLAH10K", pin25k: "SEKOLAHVIP25" },
  "retouch-restoration": { pin10k: "RETOUCH10K", pin25k: "RETOUCHVIP25" }
};

if (typeof window !== "undefined") {
  window.NOMOR_WA_ADMIN_CONFIG = NOMOR_WA_ADMIN_CONFIG;
  window.LIST_PIN_KATALOG = LIST_PIN_KATALOG;
}