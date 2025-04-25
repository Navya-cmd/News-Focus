// const express = require('express');
// const app = express();
// const port = 3001;

// // Serve static files from your News_Focus frontend folder
// app.use(express.static('News_Focus'));

// // Define a simple API route for /api/news
// app.get('/api/news', (req, res) => {
//     res.json({ message: "Welcome to NewsFocus API!" });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

const API_KEY = "3453bf380c4d486a81478cf8c9b391e3";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

// Serve static files from the News_Focus folder
app.use(express.static('News_Focus'));

app.get('/api/news', async (req, res) => {
    const query = req.query.q || "India";
    try {
        const apiResponse = await fetch(`${NEWS_API_URL}?q=${query}&apiKey=${API_KEY}`);
        if (!apiResponse.ok) throw new Error(`News API error: ${apiResponse.statusText}`);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data from News API:", error);
        res.status(500).json({ error: "Unable to fetch news data" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
