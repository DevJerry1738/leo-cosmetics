import "../styles/expert.css";

export default function ExpertForm() {
  const whatsappLink = `https://wa.me/2348012345678?text=Hi%20Leo%20Cosmetics,%20I%20need%20help%20with%20skincare.`;

  return (
    <div className="expert-form">
      <h2>Talk to a Skincare Expert</h2>
      <form>
        <label>Name</label>
        <input type="text" placeholder="Your name" required />
        <label>Email</label>
        <input type="email" placeholder="Your email" required />
        <label>Message</label>
        <textarea placeholder="Your question..." required />
        <button type="submit">Send Message</button>
      </form>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        💬 Chat via WhatsApp
      </a>
    </div>
  );
}
