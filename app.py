from flask import Flask, jsonify, request
from utils.news_fetcher import fetch_articles
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "Welcome to the Scalable News Recommender API",
        "note": "This API automatically fetches news from the last 2 hours"
    }

@app.route("/news", methods=["GET"])
def get_news():
    query   = request.args.get("query", "technology")
    section = request.args.get("section", None)
    sort    = request.args.get("sort", "newest")
    pages   = 3

    # ➤ ALWAYS fetch latest 2 hours (auto)
    hours = 12
    to_dt = datetime.datetime.utcnow()
    from_dt = to_dt - datetime.timedelta(hours=hours)
    from_date = from_dt.strftime('%Y-%m-%dT%H:%M:%SZ')
    to_date   = to_dt.strftime('%Y-%m-%dT%H:%M:%SZ')

    articles = fetch_articles(
        query=query,
        section=section,
        from_date=from_date,
        to_date=to_date,
        sort=sort,
        pages=pages
    )

    return jsonify({"count": len(articles), "articles": articles})


if __name__ == "__main__":
    app.run(debug=True)
