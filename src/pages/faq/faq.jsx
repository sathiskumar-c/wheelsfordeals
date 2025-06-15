// React Imports
import React, { useState } from "react";

// Local Imports
import "./faq.scss";

// JSON Import
import FAQData from "../../data/frequently-asked-questions.json";

// Tabs
const tabs = ["Sell Car", "Buy Car"];

// Categories
const categories = [
  "Booking an Appointment",
  "Branch Visit",
  "CARS24 Best Price",
  "CARS24 Seller Protection Policy",
  "Post-Sales Service",
  "Transaction Guidelines",
  "Pricing and Documentation",
  "Home Inspection",
];

const FrequentlyAskedQuestions = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("Sell Car");
  const [activeCategory, setActiveCategory] = useState(
    "Booking an Appointment"
  );

  // Data Access
  const faqData = FAQData.faq_page;
  const faqs = faqData[activeTab][activeCategory] || [];

  return (
    <div className="faq-page">
      <main className="faq-container container">
        <h1 className="faq-main-heading">Frequently Asked Questions</h1>

        <aside className="sidebar">
          <div className="tab-buttons" role="tablist" aria-label="FAQ Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveCategory("Booking an Appointment");
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <nav className="category-nav" aria-label="FAQ Categories">
            <ul className="category-list">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={activeCategory === cat ? "active" : ""}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="faq-content">
          <h2 className="category-title">{activeCategory}</h2>

          {faqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <h3 className="question">
                <span className="highlight-bar" />
                {faq.question}
              </h3>
              <p className="answer">{faq.answer}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default FrequentlyAskedQuestions;
