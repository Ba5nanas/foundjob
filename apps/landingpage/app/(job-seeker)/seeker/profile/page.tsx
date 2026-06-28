import { SeekerShell } from "@/components/seeker-shell";
import { Bold, BriefcaseBusiness, Clock3, Italic, List, MapPin } from "lucide-react";

export default function SeekerProfilePage() {
  return (
    <SeekerShell active="Profile" title="Profile builder" action={<button className="fj-button fj-button-primary">Save demo</button>}>
      <div className="fj-page-grid">
        <article className="fj-card">
          <h2 className="fj-card-title">Personal details</h2>
          <div className="fj-form-grid" style={{ marginTop: 16 }}>
            <label className="fj-label">Full name<input className="fj-input" defaultValue="Narin S." /></label>
            <label className="fj-label">
              Target role
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Target role">
                <div className="fj-combobox-field"><span className="fj-chip">Frontend Developer</span></div>
              </div>
            </label>
            <label className="fj-label">
              Location
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Preferred locations">
                <div className="fj-combobox-field">
                  <span className="fj-chip">Bangkok</span>
                  <span className="fj-chip">Remote</span>
                </div>
              </div>
            </label>
            <label className="fj-label">
              Availability
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Availability">
                <div className="fj-combobox-field"><span className="fj-chip">2 weeks</span></div>
              </div>
            </label>
          </div>
        </article>
        <aside className="fj-card">
          <h2 className="fj-card-title">Profile strength</h2>
          <p className="fj-muted">A complete profile improves company shortlisting decisions.</p>
          <div className="fj-progress" style={{ marginTop: 18 }}><span style={{ width: "86%" }} /></div>
          <div className="fj-icon-meta">
            <span className="fj-icon-line"><BriefcaseBusiness />Work history added</span>
            <span className="fj-icon-line"><MapPin />Bangkok and remote selected</span>
            <span className="fj-icon-line"><Clock3 />Available in 2 weeks</span>
          </div>
        </aside>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <h2 className="fj-card-title">About</h2>
        <div className="fj-editor" style={{ marginTop: 12 }}>
          <div className="fj-editor-toolbar">
            <button className="fj-editor-tool" type="button" aria-label="Bold"><Bold /></button>
            <button className="fj-editor-tool" type="button" aria-label="Italic"><Italic /></button>
            <button className="fj-editor-tool" type="button" aria-label="Bullet list"><List /></button>
          </div>
          <div className="fj-editor-body" contentEditable suppressContentEditableWarning>
            <p>Frontend developer focused on accessible interfaces, design systems, and product quality.</p>
            <p>Looking for product teams that value clear requirements and steady delivery.</p>
          </div>
        </div>
      </article>
    </SeekerShell>
  );
}
