// Local Imports
import "./contactus-banner.scss";
import JSON from "../../data/contactus-banner.json";

const ContactUsBanner = () => {
  return (
    <section
      className="contact-banner"
      style={{ backgroundImage: `url(${JSON.backgroundImage})` }}
      role="region"
      aria-label="Contact Us"
    >
      <div className="contact-banner-overlay">
        <header>
          <h1 className="contact-banner-title">{JSON.title}</h1>
          <p className="contact-banner-subtitle">{JSON.subtitle}</p>
        </header>

        <address
          className="contact-banner-info"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <a
            href={`tel:${JSON.phone}`}
            className="contact-banner-link"
            itemProp="telephone"
          >
            {JSON.phone}
          </a>
          <a
            href={`mailto:${JSON.email}`}
            className="contact-banner-link"
            itemProp="email"
          >
            {JSON.email}
          </a>
        </address>
      </div>
    </section>
  );
};

export default ContactUsBanner;
