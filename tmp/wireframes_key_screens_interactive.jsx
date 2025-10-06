import React, { useState } from "react";

// Real‑Estate Legal Copilot — Wireframe Snapshots
// Tailwind-only, no external component deps. Switch screens via top nav.

const navItems = [
  "Dashboard",
  "Goal Select",
  "Upload & Checklist",
  "Processing",
  "DD Workspace",
  "Drafting Assistant",
  "Title Chain",
  "Red-Flag Detail",
  "Reports & Exports",
  "Admin"
] as const;

type Screen = typeof navItems[number];

export default function Wireframes() {
  const [screen, setScreen] = useState<Screen>("Dashboard");
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-tight text-lg">RE Legal Copilot — MVP Wireframes</div>
          <div className="ml-auto hidden md:flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setScreen(item)}
                className={
                  "px-3 py-1.5 rounded-xl text-sm border transition-all " +
                  (screen === item
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white hover:bg-neutral-100 border-neutral-200")
                }
                title={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="md:hidden mb-3">
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as Screen)}
            className="w-full border rounded-xl px-3 py-2 bg-white"
          >
            {navItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {screen === "Dashboard" && <Dashboard />}
        {screen === "Goal Select" && <GoalSelect />}
        {screen === "Upload & Checklist" && <UploadChecklist />}
        {screen === "Processing" && <Processing />}
        {screen === "DD Workspace" && <DDWorkspace />}
        {screen === "Drafting Assistant" && <DraftingAssistant />}
        {screen === "Title Chain" && <TitleChain />}
        {screen === "Red-Flag Detail" && <RedFlagDetail />}
        {screen === "Reports & Exports" && <ReportsExports />}
        {screen === "Admin" && <Admin />}
      </main>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm text-neutral-500 mt-1 max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}>{children}</div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="h-40 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400 grid place-items-center text-sm">
      {label}
    </div>
  );
}

// 1) Dashboard ---------------------------------------------------------------
function Dashboard() {
  const matters = [
    { id: "MAT‑2108", name: "ATS — Prestige Park", status: "Review", progress: 72, goal: "Draft ATS" },
    { id: "MAT‑2109", name: "DD — Site at Whitefield", status: "Processing", progress: 48, goal: "DD Site" },
    { id: "MAT‑2110", name: "DD — Apartment #B1204", status: "Finalized", progress: 100, goal: "DD Apartment" }
  ];
  return (
    <div>
      <SectionTitle title="Dashboard" subtitle="Recent matters, their status, and quick actions." />
      <div className="grid md:grid-cols-3 gap-4">
        {matters.map((m) => (
          <Card key={m.id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-neutral-500 mt-1">ID: {m.id} • Goal: {m.goal}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                m.status === "Finalized" ? "bg-green-100 text-green-700" :
                m.status === "Processing" ? "bg-amber-100 text-amber-700" :
                "bg-sky-100 text-sky-700"}`}>{m.status}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div className="h-full bg-neutral-900" style={{ width: `${m.progress}%` }} />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border text-sm">Open</button>
              <button className="px-3 py-1.5 rounded-lg border text-sm">Export</button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">New Matter</div>
              <p className="text-sm text-neutral-500">Start DD or Drafting with a goal‑based wizard.</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Create</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// 2) Goal Select -------------------------------------------------------------
function GoalSelect() {
  const goals = [
    { title: "Title DD — Site/Plot/Land", desc: "Baseline DD across deeds, EC, RTC, khata." },
    { title: "Title DD — Apartment/Flat", desc: "Adds approvals & RERA consistency." },
    { title: "Draft — Agreement to Sell", desc: "Fact‑grounded ATS with CP tracker." },
    { title: "Draft — Sale Deed", desc: "Populate deed + covenants from risks." }
  ];
  return (
    <div>
      <SectionTitle title="Select Goal" subtitle="Pick what you want to accomplish. We’ll tune the checklist and checks accordingly." />
      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((g) => (
          <Card key={g.title}>
            <div className="font-medium">{g.title}</div>
            <p className="text-sm text-neutral-500 mt-1">{g.desc}</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Matter nickname (optional)" className="flex-1 border rounded-lg px-3 py-2" />
              <button className="px-3 py-2 rounded-lg bg-neutral-900 text-white">Continue</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 3) Upload & Checklist ------------------------------------------------------
function UploadChecklist() {
  const checklist = [
    { label: "Title & link deeds (~30y)", done: true },
    { label: "EC covering full chain", done: true },
    { label: "RTC/Pahani + Mutation/MR", done: false },
    { label: "Khata extract/certificate", done: false },
    { label: "Tax paid receipts", done: true },
    { label: "Conversion Order (if appl.)", done: false },
  ];
  const files = [
    { name: "SaleDeed_2008.pdf", type: "Deed" },
    { name: "EC_1995_2024.pdf", type: "EC" },
    { name: "TaxReceipt_2025.pdf", type: "Tax" }
  ];
  return (
    <div>
      <SectionTitle title="Upload & Dynamic Checklist" subtitle="Drop files or forward emails. The system recognizes, ticks, and asks for gaps." />
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <div className="border-2 border-dashed rounded-xl p-6 text-center text-neutral-500">
            Drag & drop documents here or <span className="text-neutral-900">browse</span>
            <div className="mt-2 text-xs">Forward to: matter+2109@firm.example</div>
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            {files.map((f) => (
              <div key={f.name} className="rounded-lg border p-3 bg-neutral-50">
                <div className="text-sm font-medium truncate">{f.name}</div>
                <div className="text-xs text-neutral-500">{f.type}</div>
              </div>
            ))}
            <Placeholder label="More file thumbnails" />
          </div>
        </Card>
        <Card>
          <div className="font-medium mb-2">Checklist</div>
          <ul className="space-y-2">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <input type="checkbox" checked={c.done} readOnly className="h-4 w-4" />
                <span className={c.done ? "line-through text-neutral-400" : ""}>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-amber-50 border rounded-lg text-sm">
            Missing: <b>RTC/Pahani</b>, <b>Khata</b>, <b>Conversion Order</b>. <br />
            Tip: EC older than <b>6 months</b> will be flagged.
          </div>
          <button className="mt-4 w-full px-4 py-2 rounded-xl bg-neutral-900 text-white">Start Processing</button>
        </Card>
      </div>
    </div>
  );
}

// 4) Processing --------------------------------------------------------------
function Processing() {
  const steps = [
    { name: "OCR", pct: 100 },
    { name: "Classify", pct: 100 },
    { name: "Extract", pct: 70 },
    { name: "Reconcile", pct: 40 },
    { name: "Checks", pct: 15 }
  ];
  return (
    <div>
      <SectionTitle title="Processing" subtitle="Live progress across stages with early warnings." />
      <Card>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div key={s.name}>
              <div className="text-sm font-medium">{s.name}</div>
              <div className="mt-2 h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div className="h-full bg-neutral-900" style={{ width: `${s.pct}%` }} />
              </div>
              <div className="text-xs text-neutral-500 mt-1">{s.pct}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-neutral-50 border">Docs: 12 • Pages: 97 • Key fields: 184</div>
          <div className="p-3 rounded-lg bg-neutral-50 border">Warnings: EC recency borderline; POA validity unclear</div>
          <div className="p-3 rounded-lg bg-neutral-50 border">ETA: a few minutes (depends on pages & OCR)</div>
        </div>
      </Card>
    </div>
  );
}

// 5) DD Workspace ------------------------------------------------------------
function DDWorkspace() {
  const sections = [
    "Parties & Authority",
    "Property Identity",
    "Title Chain",
    "Encumbrances & Litigation",
    "Approvals & Compliance",
    "Taxes & Dues",
    "Red Flags",
    "Outstanding"
  ];
  const flags = [
    { id: "RF‑11", title: "Mortgage in EC (2018) — discharge not found", sev: "High" },
    { id: "RF‑08", title: "Identifier mismatch: khata vs deed (flat no.)", sev: "Medium" },
    { id: "RF‑02", title: "Expired POA for seller representative", sev: "High" }
  ];
  return (
    <div>
      <SectionTitle title="DD Workspace" subtitle="Three‑pane review — findings list, evidence viewer with pins, and actions." />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-3">
          <div className="font-medium mb-2">Sections</div>
          <ul className="space-y-1 text-sm">
            {sections.map((s, i) => (
              <li key={s} className={`px-3 py-2 rounded-lg ${i === 6 ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>{s}</li>
            ))}
          </ul>
          <div className="mt-4">
            <div className="font-medium mb-1 text-sm">Red Flags</div>
            <ul className="space-y-2">
              {flags.map((f) => (
                <li key={f.id} className="p-2 rounded-lg border text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{f.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${f.sev === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{f.sev}</span>
                  </div>
                  <div className="mt-1 text-neutral-600">{f.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="col-span-12 md:col-span-6">
          <div className="font-medium mb-2">Evidence Viewer</div>
          <Placeholder label="PDF page with pins: [12] [45] [78]" />
          <div className="mt-3 grid md:grid-cols-3 gap-2 text-xs text-neutral-500">
            <div className="p-2 rounded border bg-neutral-50">Pin #45 — EC Entry 2018‑05 — Lien</div>
            <div className="p-2 rounded border bg-neutral-50">Pin #12 — POA date 2016‑01</div>
            <div className="p-2 rounded border bg-neutral-50">Pin #78 — Khata number mismatch</div>
          </div>
        </Card>

        <Card className="col-span-12 md:col-span-3">
          <div className="font-medium mb-2">Action Panel</div>
          <div className="space-y-2 text-sm">
            <button className="w-full px-3 py-2 border rounded-lg">Accept Finding</button>
            <button className="w-full px-3 py-2 border rounded-lg">Dispute / Add Note</button>
            <button className="w-full px-3 py-2 border rounded-lg">Assign to Paralegal</button>
            <button className="w-full px-3 py-2 border rounded-lg">Request Missing Doc</button>
          </div>
          <div className="mt-4 p-3 bg-neutral-50 border rounded-lg text-sm">
            Suggested clause: <b>Encumbrance Indemnity</b> (links to Drafting)
          </div>
          <button className="mt-4 w-full px-4 py-2 rounded-xl bg-neutral-900 text-white">Generate Title Note</button>
        </Card>
      </div>
    </div>
  );
}

// 6) Drafting Assistant ------------------------------------------------------
function DraftingAssistant() {
  return (
    <div>
      <SectionTitle title="Drafting Assistant" subtitle="Fact panel on the left; collaborative clause editor on the right." />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-4">
          <div className="font-medium mb-2">Facts (locked)</div>
          <div className="space-y-2 text-sm">
            <div className="p-2 rounded border bg-neutral-50">Parties: ABC Developers Pvt. Ltd. → Mr. Rao</div>
            <div className="p-2 rounded border bg-neutral-50">Property: Flat B‑1204, Tower‑B, 1,240 sq.ft</div>
            <div className="p-2 rounded border bg-neutral-50">Consideration: ₹ 1,20,00,000</div>
            <div className="p-2 rounded border bg-neutral-50">Encumbrance: Mortgage cleared — discharge pending upload</div>
          </div>
          <div className="mt-3 p-2 text-xs text-neutral-500">Changes must originate from DD Workspace to keep facts consistent.</div>
        </Card>

        <Card className="col-span-12 md:col-span-8">
          <div className="flex items-center justify-between">
            <div className="font-medium">Clause Editor</div>
            <div className="text-xs text-neutral-500">Tracked changes ON</div>
          </div>
          <div className="mt-3 h-56 rounded-lg border border-dashed grid place-items-center text-neutral-400">
            Editable .docx‑like area (wireframe)
          </div>
          <div className="mt-3 grid md:grid-cols-3 gap-2">
            <div className="p-2 rounded border bg-neutral-50 text-sm">Suggestion: Encumbrance Indemnity → Insert</div>
            <div className="p-2 rounded border bg-neutral-50 text-sm">CP: Provide updated EC (≤ 6 months)</div>
            <div className="p-2 rounded border bg-neutral-50 text-sm">Rectification: Khata number correction clause</div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 rounded-xl border">Preview PDF</button>
            <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Export .docx</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// 7) Title Chain -------------------------------------------------------------
function TitleChain() {
  const events = [
    { year: 1998, label: "Gift Deed" },
    { year: 2008, label: "Sale Deed" },
    { year: 2018, label: "Mortgage" },
    { year: 2024, label: "Release / Discharge? (pending)" }
  ];
  return (
    <div>
      <SectionTitle title="Title Chain Visual" subtitle="Ownership timeline with gaps and event types." />
      <Card>
        <div className="relative overflow-hidden p-4">
          <div className="h-2 bg-neutral-200 rounded-full" />
          <div className="mt-8 grid grid-cols-4 gap-4">
            {events.map((e, idx) => (
              <div key={e.year} className="text-center">
                <div className={`mx-auto w-8 h-8 rounded-full grid place-items-center text-xs font-medium ${idx === events.length - 1 ? "bg-amber-200" : "bg-neutral-900 text-white"}`}>{idx + 1}</div>
                <div className="mt-2 text-sm font-medium">{e.year}</div>
                <div className="text-xs text-neutral-500">{e.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-neutral-500">Gaps or unresolved items are shown in amber.</div>
        </div>
      </Card>
    </div>
  );
}

// 8) Red‑Flag Detail ---------------------------------------------------------
function RedFlagDetail() {
  return (
    <div>
      <SectionTitle title="Red‑Flag Detail" subtitle="Why it’s flagged, evidence pins, and suggested actions/clauses." />
      <Card>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="text-sm">
              <div className="font-medium">RF‑11: Mortgage in EC (2018) — discharge not found</div>
              <p className="mt-2 text-neutral-600">Condition: EC shows mortgage entry dated 2018‑05; no discharge entry found through 2024‑12. Risk: encumbrance persists.</p>
              <div className="mt-3 grid md:grid-cols-3 gap-2 text-xs text-neutral-500">
                <div className="p-2 rounded border bg-neutral-50">Evidence: EC p.4 — Sl. 12</div>
                <div className="p-2 rounded border bg-neutral-50">Evidence: EC p.7 — Sl. 22</div>
                <div className="p-2 rounded border bg-neutral-50">Note: Bank name mismatch vs deed</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Suggested Actions</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="p-2 rounded border bg-neutral-50">Obtain discharge certificate/NOC</li>
              <li className="p-2 rounded border bg-neutral-50">CP: Updated EC (≤ 6 months)</li>
              <li className="p-2 rounded border bg-neutral-50">Insert Encumbrance Indemnity (drafting)</li>
            </ul>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-lg border">Accept</button>
              <button className="px-3 py-2 rounded-lg border">Dispute</button>
              <button className="px-3 py-2 rounded-lg border">Assign</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// 9) Reports & Exports -------------------------------------------------------
function ReportsExports() {
  const items = [
    { name: "Title Verification Note", type: "PDF/Word" },
    { name: "Red‑Flag Summary", type: "PDF" },
    { name: "Outstanding Requests", type: "PDF" },
    { name: "Agreement to Sell (Draft)", type: ".docx" },
    { name: "Sale Deed (Draft)", type: ".docx" },
    { name: "Title Chain Snapshot", type: "PNG/PDF" }
  ];
  return (
    <div>
      <SectionTitle title="Reports & Exports" subtitle="Lawyer‑ready outputs with firm branding and citations." />
      <Card>
        <div className="grid md:grid-cols-3 gap-3">
          {items.map((it) => (
            <div key={it.name} className="p-3 rounded-xl border bg-neutral-50 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{it.name}</div>
                <div className="text-xs text-neutral-500">{it.type}</div>
              </div>
              <button className="px-3 py-1.5 rounded-lg border text-sm">Export</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// 10) Admin ------------------------------------------------------------------
function Admin() {
  return (
    <div>
      <SectionTitle title="Admin & Settings" subtitle="Templates, thresholds, users/roles, and retention." />
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="font-medium">Clause Library</div>
          <p className="text-sm text-neutral-500 mt-1">Upload firm‑preferred clauses and tag to risks.</p>
          <Placeholder label="Upload area / list of clauses" />
        </Card>
        <Card>
          <div className="font-medium">Rules & Thresholds</div>
          <p className="text-sm text-neutral-500 mt-1">E.g., EC recency months, area variance %.</p>
          <Placeholder label="Matrix of severities / toggles" />
        </Card>
        <Card>
          <div className="font-medium">Users & Roles</div>
          <p className="text-sm text-neutral-500 mt-1">Admin, Lawyer (Approver), Reviewer, Para‑legal.</p>
          <Placeholder label="User list / invites" />
        </Card>
      </div>
    </div>
  );
}
