import {
  Activity,
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Download,
  Eye,
  FolderLock,
  History,
  KeyRound,
  LayoutDashboard,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  UserCircle,
  UserCog,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type CrudOperation = {
  key: "create" | "read" | "update" | "delete" | "append";
  label: string;
  method: string;
  route: string;
  permission: string;
  note: string;
};

type TopbarAction = {
  href?: string;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
};

const navGroups: Array<{ label: string; items: NavItem[] }> = [
  {
    label: "Overview",
    items: [
      { href: "/backoffice/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" }
    ]
  },
  {
    label: "Users and access",
    items: [
      { href: "/backoffice/admin/users", icon: Users, label: "Platform users" },
      { href: "/backoffice/admin/admin-users", icon: UserCog, label: "Admin users" },
      { href: "/backoffice/admin/roles", icon: ShieldCheck, label: "Roles" },
      { href: "/backoffice/admin/permissions", icon: KeyRound, label: "Permissions" }
    ]
  },
  {
    label: "Marketplace",
    items: [
      { href: "/backoffice/admin/companies", icon: Building2, label: "Companies" },
      { href: "/backoffice/admin/jobs", icon: BriefcaseBusiness, label: "Jobs" },
      { href: "/backoffice/admin/applications", icon: ClipboardList, label: "Applications" },
      { href: "/backoffice/admin/appointments", icon: CalendarDays, label: "Appointments" },
      { href: "/backoffice/admin/packages", icon: Package, label: "Packages" }
    ]
  },
  {
    label: "Control",
    items: [
      { href: "/backoffice/admin/files", icon: FolderLock, label: "Files" },
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit logs" },
      { href: "/backoffice/admin/settings", icon: Settings, label: "Settings" },
      { href: "/backoffice/admin/account", icon: UserCircle, label: "My account" }
    ]
  }
];

const sectionApi = {
  "Overview": {
    route: "GET /backoffice/api/admin/dashboard",
    provider: "providers/dashboard/getDashboard",
    gateway: "GET /backoffice/admin/dashboard",
    permissions: ["dashboard.view"],
    service: "Backoffice Service / analytics"
  },
  "Dashboard": {
    route: "GET /backoffice/api/admin/dashboard",
    provider: "providers/dashboard/getDashboard",
    gateway: "GET /backoffice/admin/dashboard",
    permissions: ["dashboard.view"],
    service: "Backoffice Service / analytics"
  },
  "Platform users": {
    route: "GET /backoffice/api/admin/users + RUD /[userId]",
    provider: "providers/users/list|get|update|delete",
    gateway: "GET/PATCH/DELETE /backoffice/admin/users",
    permissions: ["users.view", "users.update", "users.delete"],
    service: "User Service"
  },
  "Admin users": {
    route: "GET/POST /backoffice/api/admin/admin-users",
    provider: "providers/admin-users/*",
    gateway: "GET/POST /backoffice/admin/admin-users",
    permissions: ["admin_users.view", "admin_users.create", "admin_users.update"],
    service: "Backoffice Service / admin users"
  },
  "Companies": {
    route: "GET /backoffice/api/admin/companies + RUD /[companyId]",
    provider: "providers/companies/list|get|update|delete",
    gateway: "GET/PATCH/DELETE /backoffice/admin/companies",
    permissions: ["companies.view", "companies.update", "companies.delete"],
    service: "Company Service"
  },
  "Jobs": {
    route: "GET /backoffice/api/admin/jobs + RUD /[jobId]",
    provider: "providers/jobs/list|get|update|delete",
    gateway: "GET/PATCH/DELETE /backoffice/admin/jobs",
    permissions: ["jobs.view", "jobs.update", "jobs.delete"],
    service: "Job Service"
  },
  "Applications": {
    route: "GET /backoffice/api/admin/applications + RU /[applicationId]",
    provider: "providers/applications/list|get|update",
    gateway: "GET/PATCH /backoffice/admin/applications",
    permissions: ["applications.view", "applications.update"],
    service: "Application Service"
  },
  "Appointments": {
    route: "GET /backoffice/api/admin/appointments + RUD /[appointmentId]",
    provider: "providers/appointments/list|get|update|cancel",
    gateway: "GET/PATCH/DELETE /backoffice/admin/appointments",
    permissions: ["appointments.view", "appointments.cancel"],
    service: "Appointment Service"
  },
  "Packages": {
    route: "GET/POST /backoffice/api/admin/packages + RUD /[packageId]",
    provider: "providers/packages/create|list|get|update|delete",
    gateway: "GET/POST/PATCH/DELETE /backoffice/admin/packages",
    permissions: ["packages.view", "packages.create", "packages.delete"],
    service: "Package Service"
  },
  "Roles": {
    route: "GET/POST /backoffice/api/admin/roles",
    provider: "providers/roles/*",
    gateway: "GET/POST /backoffice/admin/roles",
    permissions: ["roles.view", "roles.create", "roles.assign_permissions"],
    service: "Backoffice Service / roles"
  },
  "Permissions": {
    route: "GET /backoffice/api/admin/permissions",
    provider: "providers/permissions/listPermissions",
    gateway: "GET /backoffice/admin/permissions",
    permissions: ["permissions.view"],
    service: "Backoffice Service / permissions"
  },
  "Files": {
    route: "GET /backoffice/api/admin/files + RUD /[fileId]",
    provider: "providers/admin-files/list|get|update|delete",
    gateway: "GET/PATCH/DELETE /backoffice/admin/files",
    permissions: ["files.view", "files.quarantine", "files.delete"],
    service: "File Service"
  },
  "Audit logs": {
    route: "GET /backoffice/api/admin/audit-logs",
    provider: "providers/audit-logs/listAuditLogs",
    gateway: "GET /backoffice/admin/audit-logs",
    permissions: ["audit_logs.view"],
    service: "Backoffice Service / audit log"
  },
  "Settings": {
    route: "GET/POST /backoffice/api/admin/settings + RUD /[settingKey]",
    provider: "providers/settings/create|list|get|update|delete",
    gateway: "GET/POST/PATCH/DELETE /backoffice/admin/settings",
    permissions: ["settings.view", "settings.update", "settings.website"],
    service: "Backoffice Service / settings"
  },
  "My account": {
    route: "GET/PUT /backoffice/api/admin/me",
    provider: "providers/admin-me/*",
    gateway: "GET/PUT /backoffice/admin/me",
    permissions: ["authenticated admin"],
    service: "Backoffice Service / admin profile"
  }
} as const;

const sectionDemo = {
  "Dashboard": {
    eyebrow: "Operations",
    title: "Platform control center",
    summary: "Daily operating metrics, pending reviews, and moderation pressure.",
    actions: [
      ["Review queues", "Open job, company, file, and account queues from one operating view.", "Dashboard"],
      ["Assign owners", "Preview which team should pick up the queue before live assignment exists.", "Demo"],
      ["Escalate risk", "Mark high-priority operational issues for admin review.", "Manual"]
    ],
    workflow: [
      ["1", "Read queue pressure", "Operations sees pending work by domain."],
      ["2", "Choose review owner", "Content, Support, Admin, or Finance takes the next action."],
      ["3", "Route to service", "The future API call goes through Main Control to the domain owner."]
    ],
    metrics: [["42,180", "total users"], ["1,284", "companies"], ["8,421", "open jobs"], ["128", "pending reviews"]],
    table: {
      columns: ["Queue", "Owner", "Status", "Next action"],
      rows: [
        ["Job approvals", "Content", "128 pending", "Review"],
        ["Company verification", "Support", "18 pending", "Verify"],
        ["File moderation", "Admin", "7 quarantined", "Inspect"]
      ]
    }
  },
  "Platform users": {
    eyebrow: "Public accounts",
    title: "Job seekers and company-side users",
    summary: "Search public accounts, suspend risky records, and inspect account activity.",
    actions: [
      ["Search accounts", "Filter job seekers, company owners, staff, and employees without touching admin users.", "Filter"],
      ["Suspend user", "Preview the risk-control action for public platform accounts.", "Guarded"],
      ["Inspect activity", "Review profile status, applications, company membership, and last activity.", "Read only"]
    ],
    workflow: [
      ["1", "Find account", "Support searches by email, type, or status."],
      ["2", "Review context", "The page separates platform user data from backoffice admin identity."],
      ["3", "Apply action", "Suspend/update actions will map to User Service after API wiring."]
    ],
    metrics: [["31.2k", "job seekers"], ["6.4k", "company users"], ["92", "flagged"], ["18", "suspended"]],
    table: {
      columns: ["User", "Type", "Status", "Action"],
      rows: [
        ["mali.seeker@example.com", "Job seeker", "ACTIVE", "View"],
        ["ops@northstar.example", "Company staff", "ACTIVE", "View"],
        ["risk.user@example.com", "Job seeker", "FLAGGED", "Suspend"]
      ]
    }
  },
  "Companies": {
    eyebrow: "Employers",
    title: "Company verification queue",
    summary: "Review company profiles, verification evidence, and package status.",
    actions: [
      ["Verify company", "Preview approval of business identity and public company profile.", "Action"],
      ["Suspend company", "Hold risky employers without deleting company data.", "Guarded"],
      ["Review package", "Check whether package limits explain posting or visibility issues.", "Linked"]
    ],
    workflow: [
      ["1", "Review profile", "Admin sees company status, documents, and profile completeness."],
      ["2", "Check package", "Package status is visible before verification or suspension."],
      ["3", "Send decision", "Company Service owns verification and status changes."]
    ],
    metrics: [["1,284", "companies"], ["43", "pending verify"], ["12", "suspended"], ["6", "package issues"]],
    table: {
      columns: ["Company", "Status", "Package", "Action"],
      rows: [
        ["Northstar Labs", "VERIFIED", "Growth", "View"],
        ["Blue Harbor", "PENDING", "Starter", "Verify"],
        ["Foundry Cloud", "VERIFIED", "Enterprise", "View"]
      ]
    }
  },
  "Jobs": {
    eyebrow: "Jobs",
    title: "Job moderation",
    summary: "Approve, reject, close, and inspect job posts before they affect public search.",
    actions: [
      ["Approve job", "Publish a clean job to public search after content review.", "Primary"],
      ["Reject job", "Return a post to company users with a moderation reason.", "Guarded"],
      ["Close job", "Stop visibility without removing historical applications.", "State"]
    ],
    workflow: [
      ["1", "Review content", "Content manager checks title, contract type, salary, and description."],
      ["2", "Decide visibility", "Approve, reject, pause, or close according to policy."],
      ["3", "Sync public page", "Job Service updates search visibility after Main Control routing."]
    ],
    metrics: [["8,421", "open jobs"], ["128", "pending"], ["22", "rejected"], ["310", "contract jobs"]],
    table: {
      columns: ["Job", "Company", "Status", "Action"],
      rows: [
        ["Frontend Developer", "Northstar Labs", "OPEN", "Review"],
        ["Product Designer", "Blue Harbor", "PENDING", "Approve"],
        ["Finance Analyst", "LedgerWorks", "PAUSED", "Inspect"]
      ]
    }
  },
  "Applications": {
    eyebrow: "Applications",
    title: "Application review",
    summary: "Monitor application status changes and high-risk hiring actions.",
    actions: [
      ["Review status", "Inspect transitions such as shortlisted, interview, offer, hired, or rejected.", "Audit"],
      ["Correct workflow", "Preview admin correction when a status is wrong or disputed.", "Guarded"],
      ["Open timeline", "Read candidate, company, and appointment context in one place.", "Linked"]
    ],
    workflow: [
      ["1", "Open application", "Admin sees candidate, job, company, and latest status."],
      ["2", "Trace timeline", "Status transitions are reviewed before manual correction."],
      ["3", "Update through API", "Application Service owns status updates and audit entries."]
    ],
    metrics: [["42k", "applications"], ["1.1k", "this week"], ["84", "manual reviews"], ["19", "disputes"]],
    table: {
      columns: ["Candidate", "Job", "Status", "Action"],
      rows: [
        ["Anong K.", "Frontend Developer", "INTERVIEW", "View"],
        ["Narin P.", "Backend Engineer", "SHORTLISTED", "View"],
        ["Pim S.", "Finance Analyst", "OFFER", "Audit"]
      ]
    }
  },
  "Appointments": {
    eyebrow: "Appointments",
    title: "Interview schedule control",
    summary: "Inspect interview bookings, cancellations, and meeting-owner conflicts.",
    actions: [
      ["Resolve conflict", "Review duplicate slots, missing interviewer, or expired meeting links.", "Queue"],
      ["Cancel booking", "Preview admin cancellation with reason tracking.", "Guarded"],
      ["Open application", "Jump from interview schedule to the related application context.", "Linked"]
    ],
    workflow: [
      ["1", "Inspect schedule", "Support sees date, owner, candidate, and conflict state."],
      ["2", "Decide action", "Cancel, resolve, or ask company to reschedule."],
      ["3", "Record audit", "Appointment Service records changes once API is wired."]
    ],
    metrics: [["932", "appointments"], ["71", "today"], ["12", "conflicts"], ["5", "cancelled"]],
    table: {
      columns: ["Appointment", "Company", "Status", "Action"],
      rows: [
        ["Frontend interview", "Northstar Labs", "CONFIRMED", "View"],
        ["Design portfolio", "Blue Harbor", "PENDING", "View"],
        ["Finance screen", "LedgerWorks", "CONFLICT", "Resolve"]
      ]
    }
  },
  "Packages": {
    eyebrow: "Billing rules",
    title: "Package and limit settings",
    summary: "Review job posting quotas, active packages, and account limits.",
    actions: [
      ["Edit limits", "Preview active job limits, applicant visibility, and renewal behavior.", "Admin"],
      ["Review overage", "Find companies blocked by package limits before support replies.", "Queue"],
      ["Compare plans", "Show what changes when a company moves between packages.", "Demo"]
    ],
    workflow: [
      ["1", "Read package", "Finance checks active quota and renewal state."],
      ["2", "Inspect company impact", "Over-limit companies are visible before editing settings."],
      ["3", "Update package", "Package Service owns limits and future billing state."]
    ],
    metrics: [["4", "packages"], ["1,046", "active"], ["37", "over limit"], ["11", "renewals"]],
    table: {
      columns: ["Package", "Jobs", "Companies", "Action"],
      rows: [
        ["Starter", "3 active jobs", "412", "Edit"],
        ["Growth", "15 active jobs", "526", "Edit"],
        ["Enterprise", "Unlimited", "108", "Review"]
      ]
    }
  },
  "Roles": {
    eyebrow: "Access",
    title: "Backoffice role management",
    summary: "Manage role levels and permission assignment boundaries.",
    actions: [
      ["Create role", "Draft a role with a level lower than the current admin can manage.", "Guarded"],
      ["Edit level", "Preview role-level policy before saving.", "Policy"],
      ["Assign permissions", "Open permission assignment scoped by admin authority.", "Critical"]
    ],
    workflow: [
      ["1", "Choose role level", "SUPERADMIN can manage all; others manage only lower levels."],
      ["2", "Attach permissions", "Permissions are selected by domain group."],
      ["3", "Audit change", "Role changes create audit records after persistence is wired."]
    ],
    metrics: [["6", "roles"], ["100", "top level"], ["18", "permission groups"], ["4", "custom drafts"]],
    table: {
      columns: ["Role", "Level", "Scope", "Action"],
      rows: [
        ["SUPERADMIN", "100", "All permissions", "View"],
        ["ADMIN", "80", "Operations", "Edit"],
        ["SUPPORT", "40", "Support tools", "Permissions"]
      ]
    }
  },
  "Permissions": {
    eyebrow: "Access",
    title: "Permission matrix",
    summary: "Review available permission keys before assigning them to roles.",
    actions: [
      ["Browse permission", "Group permissions by admin users, marketplace, files, settings, and audit.", "Matrix"],
      ["Check usage", "Preview which roles currently depend on each key.", "Read only"],
      ["Assign via role", "Permissions are changed from role pages, not directly here.", "Linked"]
    ],
    workflow: [
      ["1", "Find permission key", "Admin reviews exact keys before assigning."],
      ["2", "Check role usage", "The matrix shows which roles already use the key."],
      ["3", "Open role", "Permission assignment is handled by role permissions route."]
    ],
    metrics: [["44", "permissions"], ["12", "domains"], ["6", "role levels"], ["0", "wildcards"]],
    table: {
      columns: ["Permission", "Group", "Used by", "Action"],
      rows: [
        ["admin_users.view", "Admin users", "SUPERADMIN, ADMIN", "View"],
        ["roles.assign_permissions", "Roles", "SUPERADMIN", "View"],
        ["files.quarantine", "Files", "ADMIN, SUPPORT", "View"]
      ]
    }
  },
  "Files": {
    eyebrow: "Files",
    title: "File moderation",
    summary: "Review uploaded files, quarantines, and restore/delete actions.",
    actions: [
      ["Quarantine file", "Hold suspicious uploads while preserving metadata and owner linkage.", "Guarded"],
      ["Restore file", "Return a false-positive file back to its original visibility state.", "Admin"],
      ["Trace owner", "See whether the file belongs to a resume, company logo, or job attachment.", "Linked"]
    ],
    workflow: [
      ["1", "Inspect file", "Admin sees owner, visibility, scan status, and storage route."],
      ["2", "Moderate safely", "Quarantine, restore, or delete is permission-gated."],
      ["3", "Route to File Service", "Next API calls Main Control, then File Service for metadata/action."]
    ],
    metrics: [["18.4k", "files"], ["7", "quarantined"], ["26", "private resumes"], ["2", "restore requests"]],
    table: {
      columns: ["File", "Owner", "Status", "Action"],
      rows: [
        ["resume-anong.pdf", "Anong K.", "PRIVATE", "Inspect"],
        ["company-logo.png", "Blue Harbor", "PUBLIC", "View"],
        ["suspicious.zip", "Unknown", "QUARANTINED", "Review"]
      ]
    }
  },
  "Audit logs": {
    eyebrow: "Audit",
    title: "Admin activity trail",
    summary: "Review sensitive backoffice actions and permission changes.",
    actions: [
      ["Filter events", "Search by actor, target, action type, or date window.", "Filter"],
      ["Inspect payload", "Preview metadata captured for admin actions.", "Read only"],
      ["Export evidence", "Prepare compliance-friendly exports before real reporting exists.", "Demo"]
    ],
    workflow: [
      ["1", "Find event", "Admin filters action logs by actor or target."],
      ["2", "Read detail", "Metadata explains who did what and why."],
      ["3", "Preserve trail", "Backoffice Service owns append-only audit entries."]
    ],
    metrics: [["4,902", "events"], ["142", "7 days"], ["9", "role changes"], ["3", "file actions"]],
    table: {
      columns: ["Action", "Actor", "Target", "Time"],
      rows: [
        ["admin_users.suspend", "support@foundjob.net", "user-482", "10:24"],
        ["roles.assign_permissions", "admin@foundjob.net", "SUPPORT", "09:48"],
        ["jobs.approve", "content@foundjob.net", "job-120", "08:12"]
      ]
    }
  },
  "Settings": {
    eyebrow: "System",
    title: "Website settings",
    summary: "Preview website, email template, and job-limit settings before API wiring.",
    actions: [
      ["Edit website", "Preview homepage, featured jobs, and public display settings.", "Demo"],
      ["Review template", "Open email template drafts before publishing.", "Draft"],
      ["Change limits", "Adjust package and job limits through guarded settings routes.", "Guarded"]
    ],
    workflow: [
      ["1", "Choose setting group", "Website, email templates, and job limits are separate scopes."],
      ["2", "Preview draft", "Admins can review staged changes before API persistence."],
      ["3", "Publish setting", "Backoffice Service owns settings and audit records."]
    ],
    metrics: [["12", "settings"], ["3", "templates"], ["4", "job limits"], ["2", "draft changes"]],
    table: {
      columns: ["Setting", "Scope", "Status", "Action"],
      rows: [
        ["homepage_featured_jobs", "Website", "ACTIVE", "Edit"],
        ["company_invite_email", "Email", "DRAFT", "Review"],
        ["contract_job_limit", "Packages", "ACTIVE", "Edit"]
      ]
    }
  },
  "My account": {
    eyebrow: "Profile",
    title: "Current admin profile",
    summary: "Manage own admin profile, avatar, session refresh, and password update flow.",
    actions: [
      ["Update profile", "Preview current admin details and avatar upload path.", "Self"],
      ["Change password", "Use protected password route with current/new/confirm fields.", "Security"],
      ["Refresh session", "Keep admin session separate from public auth session.", "Auth"]
    ],
    workflow: [
      ["1", "Read current admin", "The page calls current admin context, not platform users."],
      ["2", "Update secure field", "Avatar and password updates use dedicated routes."],
      ["3", "Audit self-service", "Security-sensitive updates are tracked by audit log."]
    ],
    metrics: [["SUPERADMIN", "role"], ["MFA", "enabled"], ["3", "sessions"], ["0", "security alerts"]],
    table: {
      columns: ["Route", "Method", "Status", "Action"],
      rows: [
        ["/api/admin/me", "GET", "Protected", "View"],
        ["/api/admin/me/avatar", "POST", "Protected", "Upload"],
        ["/api/admin/me/password", "PUT", "Protected", "Update"]
      ]
    }
  }
} as const;

const sectionCrud: Record<string, CrudOperation[]> = {
  "Overview": [
    { key: "read", label: "Read dashboard", method: "GET", route: "/api/admin/dashboard", permission: "dashboard.view", note: "Operational summary only" }
  ],
  "Dashboard": [
    { key: "read", label: "Read dashboard", method: "GET", route: "/api/admin/dashboard", permission: "dashboard.view", note: "Operational summary only" }
  ],
  "Platform users": [
    { key: "read", label: "Read user", method: "GET", route: "/api/admin/users/[userId]", permission: "users.view", note: "Profile, status, activity" },
    { key: "update", label: "Update user", method: "PATCH", route: "/api/admin/users/[userId]", permission: "users.update", note: "Status and moderation note" },
    { key: "delete", label: "Delete/suspend user", method: "DELETE", route: "/api/admin/users/[userId]", permission: "users.delete", note: "Guarded destructive action" }
  ],
  "Admin users": [
    { key: "create", label: "Create admin", method: "POST", route: "/api/admin/admin-users", permission: "admin_users.create", note: "Invite backoffice admin" },
    { key: "read", label: "Read admin", method: "GET", route: "/api/admin/admin-users/[adminUserId]", permission: "admin_users.view", note: "Role, MFA, activity" },
    { key: "update", label: "Update admin", method: "PATCH", route: "/api/admin/admin-users/[adminUserId]", permission: "admin_users.update", note: "Profile and status" },
    { key: "delete", label: "Delete admin", method: "DELETE", route: "/api/admin/admin-users/[adminUserId]", permission: "admin_users.delete", note: "Role-level guarded" }
  ],
  "Companies": [
    { key: "read", label: "Read company", method: "GET", route: "/api/admin/companies/[companyId]", permission: "companies.view", note: "Profile and verification" },
    { key: "update", label: "Update company", method: "PATCH", route: "/api/admin/companies/[companyId]", permission: "companies.update", note: "Verification/status" },
    { key: "delete", label: "Delete company", method: "DELETE", route: "/api/admin/companies/[companyId]", permission: "companies.delete", note: "Guarded destructive action" }
  ],
  "Jobs": [
    { key: "read", label: "Read job", method: "GET", route: "/api/admin/jobs/[jobId]", permission: "jobs.view", note: "Content and visibility" },
    { key: "update", label: "Update job", method: "PATCH", route: "/api/admin/jobs/[jobId]", permission: "jobs.update", note: "Moderation state" },
    { key: "delete", label: "Delete job", method: "DELETE", route: "/api/admin/jobs/[jobId]", permission: "jobs.delete", note: "Guarded destructive action" }
  ],
  "Applications": [
    { key: "read", label: "Read application", method: "GET", route: "/api/admin/applications/[applicationId]", permission: "applications.view", note: "Timeline and status" },
    { key: "update", label: "Update application", method: "PATCH", route: "/api/admin/applications/[applicationId]", permission: "applications.update", note: "Manual correction" }
  ],
  "Appointments": [
    { key: "read", label: "Read appointment", method: "GET", route: "/api/admin/appointments/[appointmentId]", permission: "appointments.view", note: "Schedule details" },
    { key: "update", label: "Reschedule", method: "PATCH", route: "/api/admin/appointments/[appointmentId]", permission: "appointments.cancel", note: "Conflict handling demo" },
    { key: "delete", label: "Cancel appointment", method: "DELETE", route: "/api/admin/appointments/[appointmentId]", permission: "appointments.cancel", note: "Cancel with reason" }
  ],
  "Packages": [
    { key: "create", label: "Create package", method: "POST", route: "/api/admin/packages", permission: "packages.create", note: "New plan draft" },
    { key: "read", label: "Read package", method: "GET", route: "/api/admin/packages/[packageId]", permission: "packages.view", note: "Limits and usage" },
    { key: "update", label: "Update package", method: "PATCH", route: "/api/admin/packages/[packageId]", permission: "packages.update", note: "Limits and status" },
    { key: "delete", label: "Delete package", method: "DELETE", route: "/api/admin/packages/[packageId]", permission: "packages.delete", note: "Only unused plans" }
  ],
  "Roles": [
    { key: "create", label: "Create role", method: "POST", route: "/api/admin/roles", permission: "roles.create", note: "Role-level guarded" },
    { key: "read", label: "Read role", method: "GET", route: "/api/admin/roles/[roleId]", permission: "roles.view", note: "Level and permissions" },
    { key: "update", label: "Update role", method: "PATCH", route: "/api/admin/roles/[roleId]", permission: "roles.update", note: "Level and name" },
    { key: "delete", label: "Delete role", method: "DELETE", route: "/api/admin/roles/[roleId]", permission: "roles.delete", note: "Only unused roles" }
  ],
  "Permissions": [
    { key: "read", label: "Read permission catalog", method: "GET", route: "/api/admin/permissions", permission: "permissions.view", note: "Catalog is code/seed owned" },
    { key: "update", label: "Assign via role", method: "PUT", route: "/api/admin/roles/[roleId]/permissions", permission: "roles.assign_permissions", note: "No direct delete from catalog" }
  ],
  "Files": [
    { key: "read", label: "Read file", method: "GET", route: "/api/admin/files/[fileId]", permission: "files.view", note: "Metadata and owner" },
    { key: "update", label: "Quarantine/restore", method: "PATCH", route: "/api/admin/files/[fileId]", permission: "files.quarantine", note: "Moderation state" },
    { key: "delete", label: "Delete file", method: "DELETE", route: "/api/admin/files/[fileId]", permission: "files.delete", note: "Guarded destructive action" }
  ],
  "Audit logs": [
    { key: "append", label: "Append audit event", method: "SYSTEM", route: "/api/admin/audit-logs", permission: "audit_logs.view", note: "Created by admin actions" },
    { key: "read", label: "Read audit log", method: "GET", route: "/api/admin/audit-logs", permission: "audit_logs.view", note: "Append-only; no update/delete" }
  ],
  "Settings": [
    { key: "create", label: "Create setting draft", method: "POST", route: "/api/admin/settings", permission: "settings.update", note: "Draft key/value" },
    { key: "read", label: "Read setting", method: "GET", route: "/api/admin/settings/[settingKey]", permission: "settings.view", note: "Scoped config" },
    { key: "update", label: "Update setting", method: "PATCH", route: "/api/admin/settings/[settingKey]", permission: "settings.update", note: "Publish draft" },
    { key: "delete", label: "Delete draft", method: "DELETE", route: "/api/admin/settings/[settingKey]", permission: "settings.update", note: "Draft only" }
  ],
  "My account": [
    { key: "read", label: "Read own account", method: "GET", route: "/api/admin/me", permission: "authenticated admin", note: "Current admin context" },
    { key: "update", label: "Update own account", method: "PUT", route: "/api/admin/me", permission: "authenticated admin", note: "Avatar/password/profile" }
  ]
};

function getSectionKey(section: string) {
  return section === "Overview" ? "Dashboard" : section;
}

function getApi(section: string) {
  const key = getSectionKey(section);
  return sectionApi[key as keyof typeof sectionApi] ?? sectionApi.Dashboard;
}

function getDemo(section: string) {
  const key = getSectionKey(section);
  return sectionDemo[key as keyof typeof sectionDemo] ?? sectionDemo.Dashboard;
}

function getCrud(section: string) {
  const key = getSectionKey(section);
  return sectionCrud[key] ?? sectionCrud.Dashboard ?? [];
}

function getCrudIcon(operation: CrudOperation["key"]) {
  if (operation === "create") return Plus;
  if (operation === "read") return Eye;
  if (operation === "update") return Pencil;
  if (operation === "delete") return Trash2;
  return Activity;
}

function getTopbarActions(section: string, title: string): TopbarAction[] {
  if (title === "Create admin user") {
    return [
      { href: "/backoffice/admin/admin-users", icon: ArrowLeft, label: "Back to admin users" },
      { href: "/backoffice/admin/roles", icon: ShieldCheck, label: "Role matrix", primary: true }
    ];
  }

  if (title === "Admin user detail") {
    return [
      { href: "/backoffice/admin/admin-users", icon: ArrowLeft, label: "Back to admin users" },
      { href: "/backoffice/admin/admin-users/admin-001/edit", icon: Pencil, label: "Edit admin", primary: true }
    ];
  }

  if (title === "Edit admin user") {
    return [
      { href: "/backoffice/admin/admin-users", icon: ArrowLeft, label: "Back to admin users" },
      { href: "/backoffice/admin/admin-users/admin-001", icon: Eye, label: "View detail", primary: true }
    ];
  }

  if (title === "Create role") {
    return [
      { href: "/backoffice/admin/roles", icon: ArrowLeft, label: "Back to roles" },
      { href: "/backoffice/admin/permissions", icon: KeyRound, label: "Permission catalog", primary: true }
    ];
  }

  if (title === "Edit role") {
    return [
      { href: "/backoffice/admin/roles", icon: ArrowLeft, label: "Back to roles" },
      { href: "/backoffice/admin/roles/role-support/permissions", icon: KeyRound, label: "Permissions", primary: true }
    ];
  }

  if (title === "Role permissions") {
    return [
      { href: "/backoffice/admin/roles", icon: ArrowLeft, label: "Back to roles" },
      { href: "/backoffice/admin/roles/role-support/edit", icon: Pencil, label: "Edit role", primary: true }
    ];
  }

  if (title === "My admin account") {
    return [
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail" },
      { href: "/backoffice/admin/account/password", icon: KeyRound, label: "Change password", primary: true }
    ];
  }

  if (title === "Change admin password") {
    return [
      { href: "/backoffice/admin/account", icon: ArrowLeft, label: "Back to account" },
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail", primary: true }
    ];
  }

  const sectionActions: Record<string, TopbarAction[]> = {
    "Dashboard": [
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit logs" },
      { href: "/backoffice/admin/jobs", icon: ClipboardList, label: "Review queues", primary: true }
    ],
    "Overview": [
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit logs" },
      { href: "/backoffice/admin/jobs", icon: ClipboardList, label: "Review queues", primary: true }
    ],
    "Platform users": [
      { icon: Download, label: "Export users" },
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail", primary: true }
    ],
    "Admin users": [
      { href: "/backoffice/admin/roles", icon: ShieldCheck, label: "Role matrix" },
      { href: "/backoffice/admin/admin-users/create", icon: Plus, label: "Create admin", primary: true }
    ],
    "Companies": [
      { icon: Download, label: "Export companies" },
      { href: "/backoffice/admin/jobs", icon: BriefcaseBusiness, label: "Company jobs", primary: true }
    ],
    "Jobs": [
      { icon: Download, label: "Export jobs" },
      { href: "/backoffice/admin/applications", icon: ClipboardList, label: "Applications", primary: true }
    ],
    "Applications": [
      { icon: Download, label: "Export applications" },
      { href: "/backoffice/admin/appointments", icon: CalendarDays, label: "Appointments", primary: true }
    ],
    "Appointments": [
      { icon: Download, label: "Export schedule" },
      { href: "/backoffice/admin/applications", icon: ClipboardList, label: "Applications", primary: true }
    ],
    "Packages": [
      { icon: Download, label: "Export packages" },
      { icon: Plus, label: "Create package", primary: true }
    ],
    "Roles": [
      { href: "/backoffice/admin/permissions", icon: KeyRound, label: "Permission matrix" },
      { href: "/backoffice/admin/roles/create", icon: Plus, label: "Create role", primary: true }
    ],
    "Permissions": [
      { href: "/backoffice/admin/roles", icon: ShieldCheck, label: "Roles" },
      { href: "/backoffice/admin/roles/role-support/permissions", icon: KeyRound, label: "Assign permissions", primary: true }
    ],
    "Files": [
      { icon: Download, label: "Export files" },
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail", primary: true }
    ],
    "Audit logs": [
      { icon: Download, label: "Export logs" },
      { href: "/backoffice/admin/settings", icon: Settings, label: "Retention settings", primary: true }
    ],
    "Settings": [
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail" },
      { icon: Plus, label: "Create setting draft", primary: true }
    ],
    "My account": [
      { href: "/backoffice/admin/audit-logs", icon: History, label: "Audit trail" },
      { href: "/backoffice/admin/account/password", icon: KeyRound, label: "Change password", primary: true }
    ]
  };

  return sectionActions[section] ?? sectionActions.Dashboard ?? [];
}

function renderTopbarAction(action: TopbarAction) {
  const Icon = action.icon;
  const className = action.primary ? "bo-button bo-button-primary" : "bo-button";
  const content = (
    <>
      <Icon />
      <span>{action.label}</span>
    </>
  );

  if (action.href) {
    return <a className={className} href={action.href} key={action.label}>{content}</a>;
  }

  return <button className={className} key={action.label} type="button">{content}</button>;
}

function isNavActive(label: string, section: string) {
  return label === section || (section === "Overview" && label === "Dashboard");
}

function BackofficeSectionDemo({ section }: { section: string }) {
  const demo = getDemo(section);
  const rowOperations = getCrud(section).filter((operation) => ["read", "update", "delete"].includes(operation.key));

  return (
    <>
      <section className="bo-grid-4">
        {demo.metrics.map(([value, label]) => (
          <article className="bo-card bo-card-pad" key={label}>
            <p className="bo-metric-label">{label}</p>
            <div className="bo-metric-value">{value}</div>
          </article>
        ))}
      </section>

      <section className="bo-grid-2" style={{ marginTop: 16 }}>
        <article className="bo-card bo-card-pad">
          <p className="bo-eyebrow">{demo.eyebrow}</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>{demo.title}</h2>
          <p className="bo-muted">{demo.summary}</p>
          <div className="bo-actions" style={{ marginTop: 16, flexWrap: "wrap" }}>
            {getApi(section).permissions.slice(0, 3).map((permission) => (
              <span className="bo-badge bo-badge-blue" key={permission}>{permission}</span>
            ))}
          </div>
        </article>
        <article className="bo-card bo-card-pad">
          <p className="bo-eyebrow">Demo status</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Mock data only</h2>
          <p className="bo-muted">The page is ready for the API path below, but this screen does not fetch live data yet.</p>
          <div className="bo-actions" style={{ marginTop: 16 }}>
            <span className="bo-badge bo-badge-amber">UI demo</span>
            <span className="bo-badge bo-badge-blue">Provider mapped</span>
          </div>
        </article>
      </section>

      <section className="bo-demo-grid" aria-label={`${section} demo workflow`}>
        <article className="bo-card bo-card-pad">
          <div className="bo-section-head" style={{ marginTop: 0 }}>
            <div>
              <p className="bo-eyebrow">Page demo</p>
              <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>What this page demonstrates</h2>
            </div>
            <span className="bo-badge bo-badge-blue">Before API wiring</span>
          </div>
          <div className="bo-action-grid">
            {demo.actions.map(([label, description, state]) => (
              <div className="bo-action-card" key={label}>
                <div>
                  <span className="bo-action-icon"><Activity /></span>
                </div>
                <div>
                  <strong>{label}</strong>
                  <p>{description}</p>
                  <span>{state}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="bo-card bo-card-pad">
          <p className="bo-eyebrow">Workflow</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Demo flow</h2>
          <div className="bo-flow-list">
            {demo.workflow.map(([step, label, description]) => (
              <div className="bo-flow-step" key={step}>
                <span>{step}</span>
                <div>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <BackofficeCrudPanel section={section} />

      <section className="bo-section-head">
        <div>
          <p className="bo-eyebrow">{demo.eyebrow}</p>
          <h2 className="bo-title" style={{ fontSize: 24, lineHeight: "32px" }}>Section records</h2>
        </div>
        <div className="bo-filterbar">
          <input className="bo-input" placeholder={`Search ${demo.eyebrow.toLowerCase()}`} />
          <div className="bo-combobox" role="button" tabIndex={0} aria-label={`${demo.eyebrow} status filter`}>
            <span className="bo-chip">All statuses</span>
          </div>
          <button className="bo-button" type="button"><Search /> Filter</button>
          <span className="bo-icon-line"><SlidersHorizontal />Filterable table</span>
        </div>
      </section>

      <article className="bo-card bo-table-wrap">
        <table className="bo-table">
          <thead>
            <tr>{demo.table.columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {demo.table.rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, index) => {
                  const column = demo.table.columns[index] ?? "";
                  return (
                  <td key={`${row[0]}-${cell}`}>
                    {column === "Action" ? (
                      <span className="bo-row-actions">
                        {rowOperations.slice(0, 3).map((operation) => (
                          <button className="bo-button" key={operation.key} type="button">{operation.label.split(" ")[0]}</button>
                        ))}
                      </span>
                    ) : index === 2 ? <span className="bo-badge bo-badge-blue">{cell}</span> : cell}
                  </td>
                );})}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

function BackofficeCrudPanel({ section }: { section: string }) {
  const operations = getCrud(section);
  const hasCreate = operations.some((operation) => operation.key === "create");
  const hasDelete = operations.some((operation) => operation.key === "delete");
  const hasAppend = operations.some((operation) => operation.key === "append");
  const mode = hasCreate && hasDelete
    ? "CRUD"
    : hasDelete
      ? "RUD"
      : hasAppend
        ? "Append/read"
        : "Read/update scoped";

  return (
    <article className="bo-card bo-card-pad bo-crud-panel">
      <div className="bo-section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="bo-eyebrow">CRUD coverage</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>{mode} demo map</h2>
        </div>
        <span className="bo-badge bo-badge-blue">Demo controls</span>
      </div>
      <div className="bo-crud-grid">
        {operations.map((operation) => {
          const Icon = getCrudIcon(operation.key);
          return (
            <div className="bo-crud-card" key={`${operation.method}-${operation.route}`}>
              <span className="bo-crud-icon"><Icon /></span>
              <div>
                <strong>{operation.label}</strong>
                <code>{operation.method} {operation.route}</code>
                <p>{operation.note}</p>
                <span>{operation.permission}</span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function BackofficeDemoBrief({ section }: { section: string }) {
  const demo = getDemo(section);

  return (
    <article className="bo-card bo-card-pad bo-demo-brief">
      <div>
        <p className="bo-eyebrow">Page demo</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>{demo.title}</h2>
        <p className="bo-muted">{demo.summary}</p>
      </div>
      <div className="bo-flow-list bo-flow-list-compact">
        {demo.workflow.map(([step, label, description]) => (
          <div className="bo-flow-step" key={step}>
            <span>{step}</span>
            <div>
              <strong>{label}</strong>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function BackofficeApiLinkage({ section }: { section: string }) {
  const api = getApi(section);

  return (
    <article className="bo-card bo-card-pad bo-api-panel">
      <div className="bo-section-head" style={{ marginTop: 0 }}>
        <div>
          <p className="bo-eyebrow">API linkage</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Route map for this section</h2>
        </div>
        <span className="bo-badge bo-badge-amber">Not connected</span>
      </div>
      <div className="bo-api-grid">
        <div>
          <span className="bo-api-label">Next route</span>
          <code>{api.route}</code>
        </div>
        <div>
          <span className="bo-api-label">Provider</span>
          <code>{api.provider}</code>
        </div>
        <div>
          <span className="bo-api-label">Main Control path</span>
          <code>{api.gateway}</code>
        </div>
        <div>
          <span className="bo-api-label">Service owner</span>
          <code>{api.service}</code>
        </div>
      </div>
      <div className="bo-actions" style={{ marginTop: 14, flexWrap: "wrap" }}>
        {api.permissions.map((permission) => (
          <span className="bo-chip" key={permission}>{permission}</span>
        ))}
      </div>
    </article>
  );
}

export function BackofficeDemo({
  title = "Operations dashboard",
  section = "Dashboard",
  children
}: {
  title?: string;
  section?: string;
  children?: ReactNode;
}) {
  const topbarActions = getTopbarActions(section, title);

  return (
    <main className="bo-shell">
      <aside className="bo-sidebar">
        <a className="bo-brand" href="/backoffice">
          <span className="bo-brand-mark">FJ</span>
          <span>FoundJob Admin</span>
        </a>
        <nav className="bo-nav" aria-label="Backoffice navigation">
          {navGroups.map((group) => (
            <section className="bo-nav-group" key={group.label}>
              <p className="bo-nav-group-label">{group.label}</p>
              <div className="bo-nav-group-items">
                {group.items.map(({ href, icon: Icon, label }) => (
                  <a className={isNavActive(label, section) ? "bo-nav-active" : undefined} href={href} key={label}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <section className="bo-main">
        <header className="bo-topbar">
          <div>
            <p className="bo-eyebrow">{section}</p>
            <h1 className="bo-title">{title}</h1>
          </div>
          <div className="bo-actions">
            {topbarActions.map((action) => renderTopbarAction(action))}
          </div>
        </header>

        <div className="bo-content">
          {children ?? <BackofficeSectionDemo section={section} />}
          {children ? (
            <div style={{ marginTop: 18 }}>
              <BackofficeDemoBrief section={section} />
            </div>
          ) : null}
          {children ? (
            <div style={{ marginTop: 18 }}>
              <BackofficeCrudPanel section={section} />
            </div>
          ) : null}
          <div style={{ marginTop: 18 }}>
            <BackofficeApiLinkage section={section} />
          </div>
        </div>
      </section>
    </main>
  );
}
