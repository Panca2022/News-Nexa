# News Nexa

News Nexa is a scalable news recommender platform that fetches, analyzes, and displays news articles from multiple sources including The Guardian API and RSS feeds. It features sentiment analysis, automatic updates, and a modern dashboard UI.

## Demo

![News Nexa Screenshot](https://github.com/Panca2022/News-Nexa/raw/main/assets/screenshot1.png)
![News Nexa Screenshot](https://github.com/Panca2022/News-Nexa/raw/main/assets/screenshot2.png)
## Features

- Fetches news from The Guardian API and RSS feeds
- Sentiment analysis using TextBlob
- Automatic periodic updates (every 10 minutes)
- Modern React dashboard with glassmorphism UI
- Sidebar navigation with icons and branding
- Customizable news topics and time filters

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- Git

### Backend Setup

1. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
2. Create a `.env` file in `backend` and add your Guardian API key:
    ```
    GUARDIAN_API_KEY=your_guardian_api_key_here
    ```
3. Run the backend:
    ```bash
    cd backend
    python app.py
    ```

### Frontend Setup

1. Install dependencies:
    ```bash
    cd frontend
    npm install
    ```
2. Start the frontend:
    ```bash
    npm start
    ```

### Fetching News

- The backend fetches news from The Guardian and RSS feeds.
- News is updated automatically every 10 minutes using APScheduler.


## API Sources

- [The Guardian Open Platform](https://open-platform.theguardian.com/)
- RSS feeds (e.g., Reuters Top News)


**Developed by Lalanthika S
