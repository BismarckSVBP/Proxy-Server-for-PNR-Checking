const express = require("express");
const cors = require("cors");
const axios = require("axios");
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5001;
app.get("/", async (req, res) => {
    const pnr = req.query.pnr;  // ✅ Use 'pnr' instead of 'pnrNumber'
    if (!pnr || pnr.length !== 10) {
        return res.status(400).json({ error: "Valid 10-digit PNR number required" });
    }

    try {
        const response = await axios.get(`https://www.redbus.in/railways/api/getPnrData?pnrno=${pnr}`, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.redbus.in/"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching PNR data:", error);
        res.status(500).json({ error: "Failed to fetch data from RedBus API" });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
