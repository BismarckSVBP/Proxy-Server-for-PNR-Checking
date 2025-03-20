const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/", async (req, res) => {
    const pnr = req.query.pnr;
    if (!pnr || pnr.length !== 10) {
        return res.status(400).json({ error: "Valid 10-digit PNR required" });
    }

    try {
        const response = await axios.get(`https://www.redbus.in/railways/api/getPnrData?pnrno=${pnr}`, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.redbus.in/"
            },
            timeout: 150000 // ⏳ Increase timeout to 15 sec
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching PNR data:", error.message);
        res.status(500).json({ error: "Failed to fetch data from RedBus API", details: error.message });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
