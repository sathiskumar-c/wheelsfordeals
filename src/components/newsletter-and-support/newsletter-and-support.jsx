// React import
import React from "react";

// Local Imports
import "./newsletter-and-support.scss";

const NewsletterAndSupport = () => {
  return (
    <section
      className="newsletter-support"
      aria-label="Newsletter and Support Section"
    >
      <div className="newsletter-support__container">
        {/* Newsletter Section */}
        <div className="newsletter-support__newsletter">
          <h2 className="newsletter-support__title">
            Get our emails for info on <br />
            <span className="newsletter-support__highlight">
              new items, sales and more.
            </span>
          </h2>
          <p className="newsletter-support__desc">
            We’ll email you a voucher worth £10 off your first order over £50.
          </p>

          <form
            className="newsletter-support__form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe to newsletter"
          >
            <label htmlFor="email" className="sr-only">
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="newsletter-support__input"
              aria-required="true"
            />
            <button type="submit" className="newsletter-support__button">
              Subscribe
            </button>
          </form>

          <p className="newsletter-support__terms">
            By subscribing you agree to our{" "}
            <a
              href="/terms-and-conditions"
              className="newsletter-support__link"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="newsletter-support__link">
              Privacy & Policy
            </a>
            .
          </p>
        </div>

        {/* Support Section */}
        <div className="newsletter-support__support">
          <h2 className="newsletter-support__support-title">Need help?</h2>
          <a
            href="tel:+8001234567890"
            className="newsletter-support__phone"
            aria-label="Call support at +800 1234 5678 90"
          >
            (+800) 1234 5678 90
          </a>
          <p className="newsletter-support__availability">
            We are available 8:00am – 7:00pm
          </p>

          <div
            className="newsletter-support__apps"
            aria-label="Download our app"
          >
            <a href="#" aria-label="Download on the App Store">
              <img src="/apple-store.png" alt="Download on the App Store" />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img src="/google-play.png" alt="Get it on Google Play" />
            </a>
          </div>

          <p className="newsletter-support__note">
            <strong>Shopping App:</strong> Try our View in Your Room feature,
            manage registries and save payment info.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterAndSupport;
