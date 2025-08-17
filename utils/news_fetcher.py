import requests  # To Request the Source using the API
import datetime  # It will maintain the Proper Time Zone
from textblob import TextBlob  # For Sentimental Analysis
from apscheduler.schedulers.background import BackgroundScheduler
import feedparser
from dotenv import load_dotenv
import time
import os

load_dotenv()
# API KEY
GUARDIAN_API_KEY = os.getenv("GUARDIAN_API_KEY")

# Base url is the parent url
BASE_URL = "https://content.guardianapis.com/search"

def fetch_articles(query="technology", section=None, from_date=None, to_date=None, sort="newest", pages=1):
    articles = []

    # Default date range: last 7 days
    if not from_date:
        from_date = (datetime.datetime.now() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')
    if not to_date:
        to_date = datetime.datetime.now().strftime('%Y-%m-%d')

    # Handle multiple sections if comma-separated
    section_list = section.split(",") if section else [None]

    for sec in section_list:
        for page in range(1, pages + 1):
            params = {
                "api-key": GUARDIAN_API_KEY,
                "q": query,
                "section": sec,
                "from-date": from_date,
                "to-date": to_date,
                "order-by": sort,  # newest, oldest, relevance
                "show-fields": "headline,trailText,bodyText,shortUrl",
                "page": page,
                "page-size": 5
            }
            response = requests.get(BASE_URL, params=params).json()

            if "response" in response and "results" in response["response"]:
                for item in response["response"]["results"]:
                    fields = item.get("fields", {})
                    title = fields.get("headline", item.get("webTitle", "No title"))
                    summary = fields.get("trailText", "")
                    url = fields.get("shortUrl", item.get("webUrl"))
                    date = item.get("webPublicationDate", "")
                    text = fields.get("bodyText", "")

                    # Sentiment analysis
                    sentiment_score = TextBlob(text).sentiment.polarity
                    sentiment_label = (
                        "Positive" if sentiment_score > 0.1 else
                        "Negative" if sentiment_score < -0.1 else
                        "Neutral"
                    )

                    articles.append({
                        "title": title,
                        "summary": summary,
                        "url": url,
                        "date": date,
                        "sentiment": sentiment_label,
                        "section": item.get("sectionName", sec or "Unknown")
                    })

    return articles 

def fetch_rss_articles(rss_url, max_items=20):
    articles = []
    feed = feedparser.parse(rss_url)
    for entry in feed.entries[:max_items]:
        articles.append({
            "title": entry.get("title", "No title"),
            "summary": entry.get("summary", ""),
            "url": entry.get("link", ""),
            "date": entry.get("published", ""),
            "sentiment": "Neutral",  # You can run TextBlob on summary if you want
            "section": feed.feed.get("title", "RSS")
        })
    return articles

def scheduled_fetch():
    results = fetch_articles(query="AI", section="technology,science", sort="newest", pages=3)
    # Save results to DB or cache, or update your API response here
    print(f"Fetched {len(results)} articles at {datetime.datetime.now()}")

if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(scheduled_fetch, 'interval', minutes=10)  # Fetch every 10 minutes
    scheduler.start()
    print("Scheduler started. Press Ctrl+C to exit.")

    rss_results = fetch_rss_articles("https://www.reuters.com/rssFeed/topNews")
    for r in rss_results:
        print(r["date"], r["section"], r["title"])

    try:
        while True:
            time.sleep(2)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()