// =========================================================================
// JIWAS STUDIO — BACKEND API GATEWAY (server.js V3.2)
// Melayani Integrasi H2H INCA STORE & JIWAS Digital Catalog
// =========================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const INCA_API_KEY = process.env.INCA_API_KEY;
const INCA_ENDPOINT = process.env.INCA_ENDPOINT || "https://incadigital.shop/api/h2h/order";

app.get('/api/health', (req, res) => {
  res.json({ status: "ONLINE", brand: "JIWAS ATELIER API GATEWAY" });
});

app.post('/api/order-inca', async (req, res) => {
  try {
    const { product_id, variant, qty = 1, target = "" } = req.body;

    if (!product_id || !variant) {
      return res.status(400).json({
        success: false,
        message: "Parameter product_id dan variant wajib disertakan!"
      });
    }

    console.log(`[ORDER JIWAS] Product ID: ${product_id} | Varian: ${variant} | Qty: ${qty}`);

    // Payload dikirim sesuai spesifikasi format JSON Inca Store
    const payload = {
      api_key: INCA_API_KEY,
      product_id: String(product_id),
      variant: String(variant),
      qty: Number(qty),
      target: String(target)
    };

    const response = await fetch(INCA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": INCA_API_KEY // Backup header otentikasi
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("[RESPON INCA STORE]:", data);

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("[ERROR GATEWAY JIWAS]:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menghubungkan pesanan ke server supplier Inca."
    });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ JIWAS Backend Engine aktif di port ${PORT}`);
});