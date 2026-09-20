// File: api/order-inca.js (Universal Bulletproof Handler)
const INCA_API_KEY = (process.env.INCA_API_KEY || "incastore_3e709586d88652b3d331f5f94ccd7de6").trim();
const INCA_ORDER_URL = (process.env.INCA_ENDPOINT_ORDER || "https://incadigital.shop/api/h2h/order").trim();

async function handler(req, res) {
  // 1. Headers CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 2. Health check jika dibuka via browser (GET)
  if (req.method === "GET") {
    return res.status(200).json({
      status: "ONLINE",
      message: "Gateway Inca Bot Siap Melayani Transaksi!",
      activeKey: INCA_API_KEY.substring(0, 15) + "...",
      timestamp: new Date().toISOString()
    });
  }

  // 3. Eksekusi Pembelian (POST)
  if (req.method === "POST") {
    try {
      // Parsing body aman (baik format JSON object maupun JSON string)
      let bodyData = req.body;
      if (typeof bodyData === "string") {
        try {
          bodyData = JSON.parse(bodyData);
        } catch (e) {
          bodyData = {};
        }
      }
      bodyData = bodyData || {};

      const { product_id, variant, qty = 1, target = "" } = bodyData;

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

      const response = await fetch(INCA_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      return res.status(response.status).json(data);

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menghubungkan ke server Inca Store.",
        error: err.message
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

// Dukungan ganda: CommonJS & ES Module agar tidak crash di Vercel
module.exports = handler;
module.exports.default = handler;