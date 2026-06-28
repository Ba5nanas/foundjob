import { BackofficeDemo } from "@/components/backoffice-demo";

export default async function EditRolePage({ params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;

  return (
    <BackofficeDemo title="Edit role" section="Roles">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Role ID: {roleId}</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Role details</h2>
        <form className="bo-form">
          <label className="bo-label">Name<input className="bo-input" defaultValue="SUPPORT" name="name" /></label>
          <label className="bo-label">Level<input className="bo-input" defaultValue="40" name="level" inputMode="numeric" /></label>
          <label className="bo-label">Description<textarea className="bo-textarea" defaultValue="Can view admin users, audit logs, and help resolve support tickets without managing higher roles." name="description" /></label>
          <button className="bo-button bo-button-primary" type="submit">Save role demo</button>
        </form>
      </article>
    </BackofficeDemo>
  );
}
