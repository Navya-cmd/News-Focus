// const API_KEY = "3453bf380c4d486a81478cf8c9b391e3";
// const url = `https://newsapi.org/v2/everything?q=`;
// window.addEventListener("load", () => fetchNews("India"));

// async function fetchNews(query) {
//     const res = await fetch(`/api/news?q=${query}`);
//     const data = await res.json();
//     console.log(data);
// }

// No need to change API_KEY or URL here since you’ll be fetching from your server
window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`/api/news?q=${query}`); // Calls your Express server’s route
        if (!res.ok) {
            throw new Error(`An error has occurred: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        // Populate the news data on the DOM
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Renders the fetched news articles to the DOM
function displayNews(articles) {
    const container = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");

    container.innerHTML = ""; // Clear previous articles

    articles.forEach(article => {
        const newsCard = document.importNode(template.content, true);
        newsCard.querySelector("#news-img").src = article.urlToImage || "https://via.placeholder.com/400x200";
        newsCard.querySelector("#news-title").textContent = article.title;
        newsCard.querySelector("#news-source").textContent = `${article.source.name} ${new Date(article.publishedAt).toLocaleDateString()}`;
        newsCard.querySelector("#news-desc").textContent = article.description || "Description not available";

        container.appendChild(newsCard);
    });
}



// const apiKey = "3453bf380c4d486a81478cf8c9b391e3";
// const newsContainer = document.getElementById('news-container');

// // Fetch news based on category
// async function fetchNews(category) {
//     newsContainer.innerHTML = '<p>Loading...</p>';
//     // Use a CORS proxy for local testing, remove it when in production
//     const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

//     try {
//         const response = await fetch(url);

//         console.log("Response Status:", response.status); // Log status code
//         console.log("Response Headers:", response.headers); // Log headers

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         console.log("API Response Data:", data); // Log full response data

//         if (data.status === 'error') {
//             throw new Error(data.message);
//         }

//         displayNews(data.articles);
//     } catch (error) {
//         newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
//         console.error("Error fetching news:", error); // Log detailed error
//     }
// }

// function displayNews(articles) {
//     newsContainer.innerHTML = '';

//     if (!articles || articles.length === 0) {
//         newsContainer.innerHTML = '<p>No news articles available.</p>';
//         return;
//     }

//     articles.forEach(article => {
//         const newsItem = document.createElement('div');
//         newsItem.className = 'news-item';
//         newsItem.innerHTML = `
//             <h2>${article.title}</h2>
//             <p>${article.description || 'No description available.'}</p>
//             <a href="${article.url}" target="_blank">Read more</a>
//         `;
//         newsContainer.appendChild(newsItem);
//     });
// }

// // Fetch general news on initial load
// fetchNews('general');

