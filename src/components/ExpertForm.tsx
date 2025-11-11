import "../styles/expert.css";

export default function ExpertForm() {
  const whatsappLink = `https://wa.me/2349011448616?text=${encodeURIComponent(
    "Hi Leo Cosmetics, I need help with skincare."
  )}`;

  return (
    <div className="expert-form">
      <form>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Aisha Ibrahim"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="aisha@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Skincare Question</label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us about your skin type, concerns, or routine..."
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Send Message
        </button>
      </form>

      <div className="whatsapp-cta">
        <span>Prefer instant chat?</span>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}