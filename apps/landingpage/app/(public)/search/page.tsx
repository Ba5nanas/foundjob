export default function SearchPage() {
  return (
    <main className="fj-page">
      <section className="fj-container fj-section">
        <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
        <div className="fj-card" style={{ marginTop: 24 }}>
          <p className="fj-muted">Search demo</p>
          <h1 className="fj-section-title">Filter jobs before API integration</h1>
          <div className="fj-search-panel">
            <label className="fj-field"><span>Role</span><input placeholder="Backend Engineer" /></label>
            <label className="fj-field"><span>Location</span><input placeholder="Bangkok" /></label>
            <a className="fj-button fj-button-primary" href="/jobs">Show mock results</a>
          </div>
        </div>
      </section>
    </main>
  );
}
