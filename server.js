// =========================================================================
// JIWAS STUDIO — MASTER BACKEND API GATEWAY (server.js Full Edition)
// Integrasi Real-Time H2H INCA STORE & JIWAS Catalog System
// =========================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware dasar
app.use(cors());
app.use(express.json());

// Melayani file antarmuka web secara langsung
app.use(express.static(path.join(__dirname, '')));

// Paksa langsung gunakan kunci baru
const INCA_API_KEY = "incastore_3e709586d88652b3d331f5f94ccd7de6";
const INCA_ORDER_URL = "https://incadigital.shop/api/h2h/order";

// -------------------------------------------------------------------------
// 1. HEALTH CHECK MONITORING
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
// 2. LIVE STOCK / KATALOG COMPATIBILITY ROUTE
// -------------------------------------------------------------------------
app.get('/api/live-stock', (req, res) => {
  res.json({
    success: true,
    mode: "internal_catalog",
    message: "Menggunakan sinkronisasi basis data katalog lokal JIWAS.",
    products: []
  });
});

// -------------------------------------------------------------------------
// 3. EKSEKUSI PEMBELIAN AKUN OTOMATIS (INCA STORE H2H)
// -------------------------------------------------------------------------
app.post('/api/order-inca', async (req, res) => {
  try {
    const { product_id, variant, qty = 1, target = "" } = req.body;

    // Validasi parameter wajib
    if (!product_id || !variant) {
      return res.status(400).json({
        success: false,
        message: "Parameter product_id dan variant wajib disertakan!"
      });
    }

    // Format body JSON sesuai spesifikasi resmi Inca Store H2H
    const payload = {
      api_key: INCA_API_KEY,
      product_id: String(product_id).trim(),
      variant: String(variant).trim(),
      qty: Number(qty)
    };

    if (target) {
      payload.target = String(target).trim();
    }

    // Logging terminal transparan
    console.log("\n================ [DEBUG TRANSAKSI JIWAS] ================");
    console.log("URL Tujuan       :", INCA_ORDER_URL);
    console.log("API Key Digunakan:", INCA_API_KEY.substring(0, 18) + "...");
    console.log("Data Terkirim    :", JSON.stringify(payload, null, 2));
    console.log("=========================================================");

    // Kirim request ke Endpoint H2H Inca Store (Clean Header)
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
// 4. JALANKAN SERVER
// -------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`⚡ JIWAS Engine siap melayani transaksi di http://localhost:${PORT}`);
  console.log(`🔑 Terhubung dengan API Key: ${INCA_API_KEY.substring(0, 18)}...`);
});