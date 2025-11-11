import ExpertForm from "../components/ExpertForm";
import "../styles/expert.css";

export default function Expert() {
  return (
    <section className="expert-page">
      <div className="container">
        {/* Hero Header */}
        <div className="page-header">
          <h1 className="page-title">Talk to a Skincare Expert</h1>
          <p className="page-subtitle">
            Get personalized advice from our certified beauty specialists. <br /> Free, Fast, and Authentic.
          </p>
        </div>

        {/* Form + WhatsApp */}
        <div className="expert-content">
          <ExpertForm />
        </div>
      </div>
    </section>
  );
}