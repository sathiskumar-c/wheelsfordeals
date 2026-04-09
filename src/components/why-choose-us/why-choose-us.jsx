import React from "react";
import data from "../../data/why-choose-us.json";
import "./why-choose-us.scss";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const ICON_MAP = {
  payments: PaymentsRoundedIcon,
  verified: VerifiedRoundedIcon,
  account_balance_wallet: AccountBalanceWalletRoundedIcon,
  handyman: HandymanRoundedIcon,
};

const WhyChooseUs = () => {
  const { label, title, curatorNote, whychooseusdata } = data;

  return (
    <section className="why-choose-us component-parent">
      <div className="wcu-inner">

        {/* ── Hero Row ── */}
        <div className="wcu-hero">
          <div className="wcu-hero__left">
            <span className="wcu-hero__label">{label}</span>
            <h2 className="wcu-hero__title">{title}</h2>
          </div>
          <div className="wcu-hero__right">
            <div className="wcu-curator">
              <h3 className="wcu-curator__heading">
                <FormatQuoteRoundedIcon className="wcu-curator__quote-icon" />
                Curator&apos;s Note
              </h3>
              <p className="wcu-curator__text">&ldquo;{curatorNote.quote}&rdquo;</p>
              <div className="wcu-curator__author">
                <div className="wcu-curator__avatar">
                  <PersonRoundedIcon fontSize="small" />
                </div>
                <div>
                  <p className="wcu-curator__name">{curatorNote.author}</p>
                  <p className="wcu-curator__role">{curatorNote.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="wcu-cards">
          {whychooseusdata.map((item, index) => (
            <div key={index} className="wcu-card">
              <div className="wcu-card__icon-wrap">
                {React.createElement(ICON_MAP[item.icon], { className: "wcu-card__icon" })}
              </div>
              <h4 className="wcu-card__title">{item.title}</h4>
              <p className="wcu-card__desc">{item.description}</p>
              <div className="wcu-card__link">
                {item.linkLabel}
                <ArrowForwardRoundedIcon className="wcu-card__link-arrow" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
