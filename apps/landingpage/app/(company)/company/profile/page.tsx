import { CompanyShell } from "@/components/company-shell";
import { Bold, Italic, List } from "lucide-react";

export default function CompanyProfilePage() {
  return (
    <CompanyShell active="Profile" title="Company profile" action={<button className="fj-button fj-button-primary">Save company demo</button>}>
      <div className="fj-page-grid">
        <article className="fj-card">
          <div className="fj-company-cover" />
          <div className="fj-form-grid" style={{ marginTop: 18 }}>
            <label className="fj-label">Company name<input className="fj-input" defaultValue="Northstar Labs" /></label>
            <label className="fj-label">
              Industry
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Industry">
                <div className="fj-combobox-field"><span className="fj-chip">SaaS platform</span></div>
              </div>
            </label>
            <label className="fj-label">
              Location
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Company locations">
                <div className="fj-combobox-field">
                  <span className="fj-chip">Bangkok</span>
                  <span className="fj-chip">Remote</span>
                </div>
              </div>
            </label>
            <label className="fj-label">Website<input className="fj-input" defaultValue="https://northstar.example" /></label>
          </div>
        </article>
        <aside className="fj-card">
          <h2 className="fj-card-title">Brand assets</h2>
          <div className="fj-upload" style={{ marginTop: 16 }}>
            <div>
              <strong>Logo and cover upload demo</strong>
              <p style={{ marginBottom: 0 }}>Real upload will go through company domain routes, not File Service directly.</p>
            </div>
          </div>
        </aside>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <h2 className="fj-card-title">About company</h2>
        <div className="fj-editor" style={{ marginTop: 12 }}>
          <div className="fj-editor-toolbar">
            <button className="fj-editor-tool" type="button" aria-label="Bold"><Bold /></button>
            <button className="fj-editor-tool" type="button" aria-label="Italic"><Italic /></button>
            <button className="fj-editor-tool" type="button" aria-label="Bullet list"><List /></button>
          </div>
          <div className="fj-editor-body" contentEditable suppressContentEditableWarning>
            <p>Northstar Labs builds workflow software for hiring teams that need structured, auditable decisions.</p>
            <p>The public profile highlights team culture, hiring expectations, and remote policy before candidates apply.</p>
          </div>
        </div>
      </article>
    </CompanyShell>
  );
}
