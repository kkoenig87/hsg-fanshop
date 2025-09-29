const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Statische Dateien

// VAPID-Keys (Push Notifications)
const publicVapidKey = "BAQc0wAaqIdZzFXjAKVPNXdFU_NllJAmJADLlutUJw7SwP9i2mYqylvdm8rQ6LrugfZ9nDgcstE2oycI3oHscnM";
const privateVapidKey = "9LfQ1GaUiQI9dqd7utJkrIbXrf1gonnWfblyccp25vs";

webpush.setVapidDetails(
  "mailto:kaiuwe.koenig@web.de",
  publicVapidKey,
  privateVapidKey
);

let subscriptions = [];

// Client registrieren
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// Test-Push an alle Abonnenten
app.post("/sendNotification", async (req, res) => {
  const payload = JSON.stringify({ title: "🔥 HSG RBK", body: "Test-Push läuft!" });
  subscriptions.forEach(sub => webpush.sendNotification(sub, payload).catch(err => console.error(err)));
  res.json({ message: "Notifications sent" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
