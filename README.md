# 🎬 React Movie Discovery Platform
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8)
![TMDB](https://img.shields.io/badge/TMDB-API-green)
![Appwrite](https://img.shields.io/badge/Appwrite-Database-red)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

A modern movie discovery application built with React, Tailwind CSS, TMDB API, and Appwrite.

Users can search movies, explore trending searches, view detailed movie information, and maintain a persistent watchlist.

---

## 🚀 Live Demo

🔗 https://react-movie-app-rho-pied.vercel.app/)

---

## 📸 Screenshots

### Homepage

![Homepage](./screenshots/homepage.png)

### Search Results

![Search Results](./screenshots/search-results.png)

### Watchlist

![Watchlist](./screenshots/watchlist.png)

### Movie Details Modal

![Movie Modal](./screenshots/movie-modal.png)

---

## ✨ Features

### Movie Discovery

- Search movies using TMDB API
- Browse popular movies
- Debounced search requests
- Detailed movie information modal

### Trending Searches

- Track user searches using Appwrite
- Display top trending searches
- Search count analytics

### Watchlist

- Add movies to watchlist
- Remove movies from watchlist
- Persistent storage using Local Storage
- Watchlist counter

### User Experience

- Responsive design
- Loading states
- Error handling
- Empty state handling
- Modern UI with Tailwind CSS
- Hover animations and transitions

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### APIs & Backend

- TMDB API
- Appwrite Database

### Deployment

- Vercel

### State Management

- React Hooks
- useState
- useEffect

---

## 📂 Project Structure

```txt
src
│
├── components
│   ├── MovieCard.jsx
│   └── Search.jsx
│
├── pages
│   └── Home.jsx
│
├── api.js
├── appwrite.js
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
VITE_TMDB_ACCESS_TOKEN=YOUR_TOKEN

VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_ENDPOINT=YOUR_ENDPOINT
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_TABLE_ID=YOUR_TABLE_ID
```

---

## 🧠 Key Concepts Implemented

- API Integration
- Debounced Search
- Local Storage Persistence
- Component-Based Architecture
- Conditional Rendering
- React Hooks
- Environment Variables
- Cloud Database Integration
- Deployment Pipeline

---

## 📈 Future Improvements

- Movie Trailer Integration
- Favorites System
- Genre Filters
- Pagination
- Authentication
- Dark/Light Theme Toggle
- Recommendation Engine

---

## 👨‍💻 Author

Kashish

GitHub:
https://github.com/kasheeesh08
