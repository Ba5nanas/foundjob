import { SeekerShell } from "@/components/seeker-shell";

const resumeSections = ["Summary", "Experience", "Education", "Skills", "Portfolio"] as const;

export default function ResumePage() {
  return (
    <SeekerShell active="Resume" title="Resume studio" action={<button className="fj-button fj-button-primary">Export PDF demo</button>}>
      <div className="fj-page-grid">
        <article className="fj-card">
          <h2 className="fj-card-title">Resume sections</h2>
          <div className="fj-list" style={{ marginTop: 16 }}>
            {resumeSections.map((section, index) => (
              <div className="fj-card-row" key={section}>
                <div className="fj-card-row-main">
                  <span className="fj-avatar">{index + 1}</span>
                  <div>
                    <strong>{section}</strong>
                    <p className="fj-muted" style={{ margin: 0 }}>{index < 4 ? "Ready" : "Optional"}</p>
                  </div>
                </div>
                <span className={index < 4 ? "fj-badge fj-badge-permanent" : "fj-badge"}>{index < 4 ? "Complete" : "Draft"}</span>
              </div>
            ))}
          </div>
        </article>
        <aside className="fj-card">
          <div className="fj-upload">
            <div>
              <strong>Upload private resume</strong>
              <p style={{ marginBottom: 0 }}>Demo state only. Real download will go through protected domain route later.</p>
            </div>
          </div>
          <div className="fj-note" style={{ marginTop: 16 }}>
            Private resumes should never be served from `/public/*`; this demo keeps that rule visible before API work.
          </div>
        </aside>
      </div>
    </SeekerShell>
  );
}
