import { Bold, BriefcaseBusiness, Clock3, FileText, Italic, List, MapPin, Send, ShieldCheck, UserRound } from "lucide-react";

export default async function JobApplyPage({ params }: { params: Promise<{ jobId: string }> | { jobId: string } }) {
  const { jobId } = await params;

  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href={`/jobs/${jobId}`}>Back to job</a>
            <a className="fj-button fj-button-ghost" href="/seeker/dashboard">Seeker demo</a>
          </div>
        </nav>
      </header>

      <section className="fj-container fj-section">
        <article className="fj-card fj-job-apply">
          <div className="fj-job-detail-head">
            <div>
              <p className="fj-muted">Application demo</p>
              <h1 className="fj-section-title">Apply for Frontend Developer</h1>
            </div>
            <span className="fj-icon-line"><ShieldCheck />Static preview, no API submission</span>
          </div>

          <div className="fj-icon-meta fj-detail-meta">
            <span className="fj-icon-line"><BriefcaseBusiness />Frontend Developer</span>
            <span className="fj-icon-line"><MapPin />Bangkok hybrid</span>
            <span className="fj-icon-line"><Clock3 />6 months contract</span>
            <span className="fj-icon-line"><FileText />Resume required</span>
            <span className="fj-icon-line"><UserRound />Company review next</span>
          </div>

          <section className="fj-apply-form" aria-label="Application details">
            <h2 className="fj-card-title">Application details</h2>
            <div className="fj-apply-form-grid">
              <label className="fj-label">Full name<input className="fj-input" defaultValue="Narin S." /></label>
              <label className="fj-label">Email<input className="fj-input" defaultValue="narin@example.com" /></label>
              <label className="fj-label">
                Resume
                <div className="fj-combobox" role="button" tabIndex={0} aria-label="Resume selection">
                  <div className="fj-combobox-field"><span className="fj-chip">Narin-S-Resume.pdf</span></div>
                </div>
              </label>
              <label className="fj-label">
                Availability
                <div className="fj-combobox" role="button" tabIndex={0} aria-label="Availability">
                  <div className="fj-combobox-field"><span className="fj-chip">2 weeks</span></div>
                </div>
              </label>
            </div>

            <label className="fj-label">
              Cover note
              <div className="fj-editor">
                <div className="fj-editor-toolbar">
                  <button className="fj-editor-tool" type="button" aria-label="Bold"><Bold /></button>
                  <button className="fj-editor-tool" type="button" aria-label="Italic"><Italic /></button>
                  <button className="fj-editor-tool" type="button" aria-label="Bullet list"><List /></button>
                </div>
                <div className="fj-editor-body" contentEditable suppressContentEditableWarning>
                  <p>I have experience building accessible React interfaces and coordinating design-system implementation with product teams.</p>
                  <p>I can start after a two-week notice period and am comfortable with Bangkok hybrid work.</p>
                </div>
              </div>
            </label>

            <div className="fj-note">
              This page previews the application form and review path only. Later, submit will call explicit application domain routes through Main Control.
            </div>

            <div className="fj-role-card-actions">
              <button className="fj-button fj-button-primary" type="button"><Send /> Submit application demo</button>
              <a className="fj-button fj-button-outline" href="/seeker/profile">Edit profile</a>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
