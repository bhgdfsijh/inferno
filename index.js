import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Put your regenerated webhook here
const WEBHOOK = "https://discord.com/api/webhooks/XXXXXXXX/XXXXXXXX";

app.post("/newgame", async (req, res) => {
    const data = req.body;

    await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: "Roblox Reporter",
            embeds: [
                {
                    title: "New Game Event",
                    description: `Reason: **${data.reason}**`,
                    color: 0x00AAFF,
                    fields: [
                        { name: "Game ID", value: String(data.gameId) },
                        { name: "Place ID", value: String(data.placeId) }
                    ],
                    timestamp: new Date(data.timestamp * 1000).toISOString()
                }
            ]
        })
    });

    res.send("OK");
});

app.listen(3000, () => console.log("Relay server running"));
