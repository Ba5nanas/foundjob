import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <main className="fj-page">
      <section className="fj-container fj-section">
        <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
        <div className="fj-card" style={{ marginTop: 24 }}>
          <p className="fj-muted">Search demo</p>
          <h1 className="fj-section-title">Filter jobs before API integration</h1>
          <div className="fj-filterbar">
            <input className="fj-input" placeholder="Backend Engineer" />
            <input className="fj-input" placeholder="Bangkok" />
            <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employment type">
              <div className="fj-combobox-field">
                <span className="fj-chip">Contract</span>
                <span className="fj-chip">Permanent</span>
              </div>
            </div>
            <a className="fj-button fj-button-primary" href="/jobs"><Search /> Show mock results</a>
          </div>
        </div>
      </section>
    </main>
  );
}
