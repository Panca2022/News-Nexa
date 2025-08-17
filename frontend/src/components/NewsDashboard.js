import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const topics = ["Technology", "Business", "Sports", "Politics", "Science"];
const hoursOptions = [1, 3, 6, 12, 24];

export default function NewsDashboard() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("Technology");
  const [hours, setHours] = useState(3);
  const [search, setSearch] = useState("");
  const [darkMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/news?query=${topic}&hours=${hours}`
        );
        setArticles(res.data.articles || []);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }
    fetchData();
  }, [topic, hours]);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container py-4 glass-container${darkMode ? " dark-mode" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>News Dashboard</h2>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <label className="form-label">Topic</label>
          <select
            className="form-select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Hours</label>
          <select
            className="form-select"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          >
            {hoursOptions.map((h) => (
              <option key={h} value={h}>
                {h} hr
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Search</label>
          <input
            className="form-control"
            placeholder="Search news title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.map((a, i) => (
        <div
          key={i}
          className={`card mb-3 glass-card${darkMode ? " glass-dark" : ""}`}
          style={{
            borderLeft:
              a.sentiment === "Positive"
                ? "8px solid #28a745"
                : a.sentiment === "Negative"
                ? "8px solid #dc3545"
                : "8px solid #6c757d",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">{a.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {a.section} — {a.date.slice(0, 10)}
            </h6>
            <p className="card-text">{a.summary}</p>
            <span
              className={`badge me-2 ${
                a.sentiment === "Positive"
                  ? "bg-positive"
                  : a.sentiment === "Negative"
                  ? "bg-negative"
                  : "bg-secondary"
              }`}
            >
              {a.sentiment}
            </span>
            <a
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="card-link"
              style={{ color: "#4dabf7" }}
            >
              Read More ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}