import React from "react";
import servicesData from "../../data/our-services.json";
import "./our-services.scss";

const CARD_CONFIG = {
  "ourservices-usedbike": {
    cardType: "feature",
    icon: "motorcycle",
    iconFill: true,
    fullDescription:
      "Access an elite catalog of vetted motorcycles. Each machine undergoes a 120-point digital diagnostic to ensure aesthetic and mechanical perfection.",
    ctaLabel: "Explore Inventory",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5E9_ze6hdM6MeaNCB4n3UU1bgGAK5tOaAv3N6I0pSusuJiogbFxpsDP90uO7MF-IG4EvOpt2idhO6GNX7kWu8q34hn3_qkRGP_Ah0AdWz_yXPj610RtHdLvptHxCMqS8_22JHF0lHH5lKFU2FI10L6h5XnWQ9iWrEwPjfeI9idXxyfAx3dQSvZcOJxlKFdCPwj5wWN6kkQCIb5S86S1DSip2CD5fd5BGW64E2EfZa3K8SDlWnQBHNUzP4sZCqGGBRM1BAxhyBM8c",
  },
  "ourservices-visithub": {
    cardType: "hub",
    icon: "location_on",
    iconFill: false,
    fullDescription:
      "Experience automotive excellence first-hand at our regional hubs.",
    ctaLabel: "Find Hub",
  },
  "ourservices-finance": {
    cardType: "standard",
    icon: "payments",
    iconFill: false,
    fullDescription:
      "Tailored financial blueprints designed to align with your acquisition goals.",
  },
  "ourservices-rctransfer": {
    cardType: "standard",
    icon: "description",
    iconFill: false,
    fullDescription:
      "Concierge-level documentation handling for a seamless ownership transition.",
  },
  "ourservices-bikeprice": {
    cardType: "calculator",
    icon: "calculate",
    iconFill: false,
    fullDescription:
      "Algorithmic valuation based on rarity, provenance, and condition.",
    ctaLabel: "Calculate Now",
  },
};

const STATS = [
  { value: "2.4k+", label: "Vetted Units" },
  { value: "120", label: "Check Points" },
  { value: "15", label: "Design Hubs" },
  { value: "0%", label: "Hidden Fees" },
];

export default function OurServicesPage() {
  const { title, ourservicesdata } = servicesData;

  const featureItem = ourservicesdata.find(
    (s) => CARD_CONFIG[s.id]?.cardType === "feature",
  );
  const hubItem = ourservicesdata.find(
    (s) => CARD_CONFIG[s.id]?.cardType === "hub",
  );
  const standardItems = ourservicesdata.filter(
    (s) => CARD_CONFIG[s.id]?.cardType === "standard",
  );
  const calculatorItem = ourservicesdata.find(
    (s) => CARD_CONFIG[s.id]?.cardType === "calculator",
  );

  return (
    <div className="os-page">
      {/* Editorial Header */}
      <div className="os-header">
        <span className="os-header__eyebrow">The Digital Curator</span>
        <h1 className="os-header__title">
          {title.split(" ").slice(0, 2).join(" ")} <br />
          <span className="os-header__title--accent">Services</span>
        </h1>
        <p className="os-header__subtitle">
          Redefining the motorcycle acquisition experience through a lens of
          sophistication, technical excellence, and white-glove attention to
          detail.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="os-bento">
        {/* Feature Card */}
        {featureItem &&
          (() => {
            const cfg = CARD_CONFIG[featureItem.id];
            return (
              <div className="os-card os-card--feature">
                <div className="os-card__content">
                  <div className="os-card__icon-wrap os-card__icon-wrap--feature">
                    <span
                      className="material-symbols-outlined"
                      style={
                        cfg.iconFill
                          ? { fontVariationSettings: "'FILL' 1" }
                          : {}
                      }
                    >
                      {cfg.icon}
                    </span>
                  </div>
                  <h3 className="os-card__title os-card__title--lg">
                    {featureItem.title}
                  </h3>
                  <p className="os-card__desc os-card__desc--lg">
                    {cfg.fullDescription}
                  </p>
                </div>
                <a href={featureItem.path} className="os-card__cta">
                  {cfg.ctaLabel}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
                <div className="os-card__feature-gradient" />
                <img
                  src={cfg.bgImage}
                  alt={featureItem.title}
                  className="os-card__feature-img"
                />
              </div>
            );
          })()}

        {/* Hub Card */}
        {hubItem &&
          (() => {
            const cfg = CARD_CONFIG[hubItem.id];
            return (
              <div className="os-card os-card--hub">
                <div>
                  <div className="os-card__icon-wrap os-card__icon-wrap--hub">
                    <span className="material-symbols-outlined">
                      {cfg.icon}
                    </span>
                  </div>
                  <h3 className="os-card__title os-card__title--hub">
                    {hubItem.title}
                  </h3>
                  <p className="os-card__desc os-card__desc--hub">
                    {cfg.fullDescription}
                  </p>
                </div>
                <div className="os-card__hub-footer">
                  <span>{cfg.ctaLabel}</span>
                  <span className="material-symbols-outlined">north_east</span>
                </div>
              </div>
            );
          })()}

        {/* Standard Cards */}
        {standardItems.map((item) => {
          const cfg = CARD_CONFIG[item.id];
          return (
            <div key={item.id} className="os-card os-card--standard">
              <div className="os-card__icon-wrap os-card__icon-wrap--standard">
                <span className="material-symbols-outlined">{cfg.icon}</span>
              </div>
              <h3 className="os-card__title">{item.title}</h3>
              <p className="os-card__desc">{cfg.fullDescription}</p>
              <div className="os-card__accent-bar" />
            </div>
          );
        })}

        {/* Calculator Card */}
        {calculatorItem &&
          (() => {
            const cfg = CARD_CONFIG[calculatorItem.id];
            return (
              <div className="os-card os-card--calculator">
                <div className="os-card__calc-inner">
                  <div className="os-card__icon-wrap os-card__icon-wrap--calc">
                    <span className="material-symbols-outlined">
                      {cfg.icon}
                    </span>
                  </div>
                  <h3 className="os-card__title">{calculatorItem.title}</h3>
                  <p className="os-card__desc">{cfg.fullDescription}</p>
                  <button className="os-card__calc-btn">{cfg.ctaLabel}</button>
                </div>
                <div className="os-card__calc-bg">
                  <span className="material-symbols-outlined">functions</span>
                </div>
              </div>
            );
          })()}
      </div>

      {/* Stats */}
      <div className="os-stats">
        {STATS.map((s) => (
          <div key={s.label} className="os-stats__item">
            <div className="os-stats__value">{s.value}</div>
            <div className="os-stats__label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
