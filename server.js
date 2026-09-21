// =========================================================================
// JIWAS STUDIO — MASTER BACKEND API GATEWAY & CLOUD SYNC ENGINE
// Integrasi Real-Time H2H INCA STORE, FINSHOP & Persistent Product Catalog
// =========================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Berkas penyimpanan database produk online
const DB_FILE = path.join(__dirname, 'products-db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Melayani file antarmuka web statis (HTML, CSS, JS, Gambar)
app.use(express.static(path.join(__dirname, '')));

// Konfigurasi API Inca Store Resmi
const DEFAULT_INCA_KEY = "incastore_3e709586d88652b3d331f5f94ccd7de6";
const INCA_API_KEY = (process.env.INCA_API_KEY || DEFAULT_INCA_KEY).trim();
const INCA_ORDER_URL = (process.env.INCA_ENDPOINT_ORDER || "https://incadigital.shop/api/h2h/order").trim();

// Helper Membaca Basis Data Online
function bacaDataProdukOnline() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("[ERROR DB READ]:", e.message);
  }
  return null;
}

// -------------------------------------------------------------------------
// 1. HEALTH CHECK ROUTE
// -------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: "ONLINE",
    brand: "JIWAS ATELIER API GATEWAY",
    activeApiKeyPrefix: INCA_API_KEY.substring(0, 15) + "...",
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------------------
// 2. LIVE STOCK COMPATIBILITY ROUTE
// -------------------------------------------------------------------------
app.get('/api/live-stock', (req, res) => {
  const products = bacaDataProdukOnline() || [];
  res.json({
    success: true,
    mode: "internal_catalog",
    message: "Menggunakan basis data katalog JIWAS.",
    products: products
  });
});

// -------------------------------------------------------------------------
// 3. API KATALOG PRODUK ONLINE (GET & SAVE)
// -------------------------------------------------------------------------

// Endpoint publik: Diambil oleh pengunjung katalog di index.html & app.js
app.get('/api/products', (req, res) => {
  const data = bacaDataProdukOnline();
  res.json({
    success: true,
    products: data || []
  });
});

// Endpoint simpan: Dikirim dari Lembar 5 Admin (analytics.html)
app.post('/api/products/save', (req, res) => {
  try {
    const { products } = req.body || {};

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Data produk harus berupa array!"
      });
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2), 'utf8');
    console.log(`[ONLINE SYNC] Berhasil memperbarui ${products.length} produk di database server.`);

    return res.json({
      success: true,
      message: "Data produk berhasil disimpan permanen di server online!",
      total: products.length
    });
  } catch (err) {
    console.error("[ERROR DB SAVE]:", err.message);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan database produk ke server.",
      error: err.message
    });
  }
});

// -------------------------------------------------------------------------
// 4. EKSEKUSI PEMBELIAN AKUN OTOMATIS (H2H INCA STORE)
// -------------------------------------------------------------------------
app.post('/api/order-inca', async (req, res) => {
  try {
    const { product_id, variant, qty = 1, target = "" } = req.body || {};

    if (!product_id || !variant) {
      return res.status(400).json({
        success: false,
        message: "Parameter product_id dan variant wajib disertakan!"
      });
    }

    const payload = {
      api_key: INCA_API_KEY,
      product_id: String(product_id).trim(),
      variant: String(variant).trim(),
      qty: Number(qty)
    };

    if (target) {
      payload.target = String(target).trim();
    }

    console.log("\n================ [DEBUG TRANSAKSI JIWAS] ================");
    console.log("URL Tujuan       :", INCA_ORDER_URL);
    console.log("API Key Digunakan:", INCA_API_KEY.substring(0, 18) + "...");
    console.log("Data Terkirim    :", JSON.stringify(payload, null, 2));
    console.log("=========================================================");

    const response = await fetch(INCA_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    console.log("[INCA STORE RESPON KEMBALIAN]:", data);
    console.log("=========================================================\n");

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("[ERROR GATEWAY JIWAS]:", error.message);
    return res.status(500).json({
      success: false,
      message: "Gagal menghubungkan pesanan ke server supplier Inca Store.",
      error: error.message
    });
  }
});

// -------------------------------------------------------------------------
// 5. JALANKAN SERVER
// -------------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`⚡ JIWAS Engine siap melayani transaksi di http://localhost:${PORT}`);
    console.log(`🔑 Terhubung dengan API Key: ${INCA_API_KEY.substring(0, 18)}...`);
  });
}

module.exports = app;