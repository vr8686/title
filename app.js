const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//const port = 3001;
const port = process.env.PORT || 3000;
const http = require('http');

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Here we check if the title is good or not: check by keywords in the title code
// Convert the title code to lowercase for case-insensitive comparison

function isTitleGood(titleCode) {
    const lowercaseTitleCode = titleCode.toLowerCase();
    // Define arrays of keywords for "certificate" and "title"
    const certificateKeywords = ["certificate", "cert"];
    const titleKeywords = ["title", "ttl"];

    // Check if the title contains any of the certificate or title keywords
    const containsCertificate = certificateKeywords.some(keyword =>
        lowercaseTitleCode.includes(keyword)
    );
    const containsTitle = titleKeywords.some(keyword =>
        lowercaseTitleCode.includes(keyword)
    );

    // Return true if either certificate or title keywords are found
    return containsCertificate && containsTitle;
}

app.post("/api/verify-title", (req, res) => {
    const { titleCode } = req.body;
    const isGood = isTitleGood(titleCode);

    res.json({ isGood });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});