"use client";

import React, { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileText, FolderPlus, ShieldAlert, Timer, UploadCloud, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// ---
// REDD Demo UI Flow
// A single-file, click-through mock that simulates the v1 screens
// New Case → Docs Inbox → Checklist → Title Chain → Findings → Report
// No external data; purely client-side state. Replace with real APIs later.
// ---

export default function REDD_Demo() {
  const steps = useMemo(
    () => [
      { id: "new-case", label: "New Case" },
      { id: "docs", label: "Document Inbox" },
      { id: "checklist", label: "Checklist & Gaps" },
      { id: "title", label: "Title Chain" },
      { id: "findings", label: "Findings" },
      { id: "report", label: "Report" },
    ],
    []
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [caseForm, setCaseForm] = useState({ state: "Karnataka", city: "Bengaluru", propertyId: "Survey 42/1A", buyer: "Acme LLP", seller: "Rao Family" });
  const [docs, setDocs] = useState([
    { name: "Sale Deed 2019.pdf", status: "Parsed" },
    { name: "EC_2015_2024.pdf", status: "OCR" },
    { name: "Khata_Extract.jpg", status: "Uploaded" },
  ]);
  const [check, setCheck] = useState([
    { key: "ec", text: "Encumbrance Certificate (10 yrs)", done: false },
    { key: "khata", text: "Khata Extract / Katha Certificate", done: true },
    { key: "rtc", text: "RTC / Record of Rights (latest)", done: false },
    { key: "id_proofs", text: "Parties ID proofs (PAN/Aadhaar)", done: true },
  ]);

  const pct = Math.round(((stepIndex + 1) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/40">
              <Workflow className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-slate-400">REDD</div>
              <div className="text-lg font-semibold">Demo UI Flow</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-slate-700 text-slate-300">Mock</Badge>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950">v1</Badge>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-3">
          <Progress value={pct} className="h-1" aria-label={`Progress: ${pct}% complete`} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Stepper steps={steps} activeIndex={stepIndex} onSelect={setStepIndex} />

        <div className="mt-6 grid gap-6" role="tabpanel" id={`panel-${steps[stepIndex].id}`} aria-labelledby={`tab-${steps[stepIndex].id}`}>
          {steps[stepIndex].id === "new-case" && (
            <ScreenNewCase caseForm={caseForm} setCaseForm={setCaseForm} />
          )}
          {steps[stepIndex].id === "docs" && (
            <ScreenDocs docs={docs} setDocs={setDocs} />
          )}
          {steps[stepIndex].id === "checklist" && (
            <ScreenChecklist items={check} setItems={setCheck} />
          )}
          {steps[stepIndex].id === "title" && <ScreenTitleChain />}
          {steps[stepIndex].id === "findings" && <ScreenFindings />}
          {steps[stepIndex].id === "report" && <ScreenReport />}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back
          </Button>
          <div className="text-sm text-slate-400" aria-live="polite">
            Step {stepIndex + 1} of {steps.length}
          </div>
          <Button
            onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
            className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          <p>Notes: This mock models the UX only. Replace with real data sources and API calls. Each screen has TODOs inside the code to guide integration.</p>
        </div>
      </main>
    </div>
  );
}

function Stepper({ steps, activeIndex, onSelect }: { steps: { id: string; label: string }[]; activeIndex: number; onSelect: (i: number) => void }) {
  return (
    <div className="grid grid-cols-6 gap-2" role="tablist" aria-label="Due diligence steps">
      {steps.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          role="tab"
          aria-selected={i === activeIndex}
          aria-controls={`panel-${s.id}`}
          id={`tab-${s.id}`}
          className={`group flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
            i === activeIndex
              ? "border-indigo-500/60 bg-indigo-600/10 ring-1 ring-indigo-500/40"
              : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-6 w-6 shrink-0 rounded-full text-center text-xs leading-6 font-medium ${
                i <= activeIndex ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
              }`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className={`text-sm ${i === activeIndex ? "text-slate-100" : "text-slate-300"}`}>
              {s.label}
            </span>
          </div>
          {i < activeIndex && (
            <Check className="h-4 w-4 text-emerald-400" aria-label="Completed" />
          )}
        </button>
      ))}
    </div>
  );
}

function ScreenNewCase({ caseForm, setCaseForm }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Case</CardTitle>
        <CardDescription>Capture jurisdiction & property basics. <span className="text-amber-400" role="img" aria-label="assumption">[ASSUMPTION]</span> Karnataka-first.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Labeled label="State">
          <Input
            value={caseForm.state}
            onChange={(e) => setCaseForm({ ...caseForm, state: e.target.value })}
            aria-label="State"
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Labeled>
        <Labeled label="City">
          <Input
            value={caseForm.city}
            onChange={(e) => setCaseForm({ ...caseForm, city: e.target.value })}
            aria-label="City"
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Labeled>
        <Labeled label="Property ID (Survey/Khata)">
          <Input
            value={caseForm.propertyId}
            onChange={(e) => setCaseForm({ ...caseForm, propertyId: e.target.value })}
            aria-label="Property ID (Survey/Khata)"
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Labeled>
        <Labeled label="Buyer">
          <Input
            value={caseForm.buyer}
            onChange={(e) => setCaseForm({ ...caseForm, buyer: e.target.value })}
            aria-label="Buyer"
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Labeled>
        <Labeled label="Seller">
          <Input
            value={caseForm.seller}
            onChange={(e) => setCaseForm({ ...caseForm, seller: e.target.value })}
            aria-label="Seller"
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Labeled>
        <div className="md:col-span-2 text-xs text-slate-500" role="status" aria-live="polite">
          TODO: Validation, role permissions, autosave, analytics (case_created)
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenDocs({ docs, setDocs }: any) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Parsed": { className: "bg-emerald-600 hover:bg-emerald-700", ariaLabel: "Document parsed successfully" },
      "OCR": { className: "bg-blue-600 hover:bg-blue-700", ariaLabel: "Document being processed by OCR" },
      "Uploaded": { className: "bg-slate-700 hover:bg-slate-600", ariaLabel: "Document uploaded and waiting for processing" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Uploaded;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Inbox</CardTitle>
        <CardDescription>Upload PDFs/images, watch statuses progress: Uploaded → OCR → Parsed.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Button variant="secondary" className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950">
            <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />Upload
          </Button>
          <div className="text-xs text-slate-500" role="status" aria-live="polite">
            TODO: drag & drop, file restrictions, retry, delete.
          </div>
        </div>
        <div className="grid gap-3" role="list" aria-label="Document list">
          {docs.map((d: any, idx: number) => {
            const statusInfo = getStatusBadge(d.status);
            return (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 hover:bg-slate-800/50 transition-colors" role="listitem">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <div className="text-sm text-slate-100">{d.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${statusInfo.className} focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950`}>
                    {d.status}
                    <span className="sr-only"> - {statusInfo.ariaLabel}</span>
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                    aria-label={`Open ${d.name}`}
                  >
                    Open
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenChecklist({ items, setItems }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checklist & Gaps</CardTitle>
        <CardDescription>Dynamic asks by property type. Karnataka minimal set for v1.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2" role="list" aria-label="Due diligence checklist">
          {items.map((it: any, i: number) => (
            <div key={it.key} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3 hover:bg-slate-800/50 transition-colors" role="listitem">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...it, done: e.target.checked };
                    setItems(next);
                  }}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950"
                  aria-describedby={`${it.key}-status`}
                />
                <span className={`text-sm ${it.done ? "text-slate-300 line-through" : "text-slate-100"}`}>
                  {it.text}
                </span>
              </label>
              {!it.done && (
                <Badge variant="outline" className="border-amber-500/40 text-amber-400 ml-2" id={`${it.key}-status`}>
                  Missing
                </Badge>
              )}
              {it.done && (
                <Badge className="bg-emerald-600 hover:bg-emerald-700 ml-2" id={`${it.key}-status`}>
                  Complete
                </Badge>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-500" role="status" aria-live="polite">
          TODO: state rules engine, evidence requirements, upload prompts.
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenTitleChain() {
  const items = [
    { year: 2007, type: "Partition Deed", party: "Rao Family", ref: "PD-2007" },
    { year: 2012, type: "Sale Deed", party: "Rao → Mehta", ref: "SD-2012" },
    { year: 2019, type: "Sale Deed", party: "Mehta → Acme LLP", ref: "SD-2019" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title Chain</CardTitle>
        <CardDescription>Visual timeline of ownership changes with quick links to source.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6" role="list" aria-label="Property ownership timeline">
          <div className="absolute left-2 top-0 h-full w-px bg-slate-700" aria-hidden="true" />
          <div className="space-y-4">
            {items.map((it, i) => (
              <div key={i} className="relative" role="listitem">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-indigo-600 ring-2 ring-slate-950" aria-hidden="true" />
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-100">{it.year} · {it.type}</div>
                    <Badge variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      {it.ref}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Parties: {it.party}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500" role="status" aria-live="polite">
          TODO: jump-to-snippet view with highlighted OCR spans; confidence scores.
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenFindings() {
  const risks = [
    {
      level: "High",
      title: "Name mismatch: Buyer name differs across docs",
      advice: "Verify PAN spelling; seek affidavit/correction deed.",
      evidence: "SaleDeed2019 p.2 vs EC p.1",
      severity: "high"
    },
    {
      level: "Medium",
      title: "EC gap (2014)",
      advice: "Pull EC for 2010–2016; confirm no liens.",
      evidence: "EC_2015_2024.pdf",
      severity: "medium"
    },
    {
      level: "Low",
      title: "Khata matches latest RTC",
      advice: "No action.",
      evidence: "Khata_Extract.jpg, RTC.pdf",
      severity: "low"
    },
  ];

  const getRiskConfig = (severity: string) => {
    const configs = {
      high: {
        className: "bg-red-600 hover:bg-red-700 border-red-500",
        ariaLabel: "High risk finding",
        icon: "🔴"
      },
      medium: {
        className: "bg-amber-600 hover:bg-amber-700 border-amber-500",
        ariaLabel: "Medium risk finding",
        icon: "🟡"
      },
      low: {
        className: "bg-emerald-600 hover:bg-emerald-700 border-emerald-500",
        ariaLabel: "Low risk finding",
        icon: "🟢"
      }
    };
    return configs[severity as keyof typeof configs] || configs.low;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Findings & Evidence</CardTitle>
        <CardDescription>Risk cards with evidence snippets and next steps.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {risks.map((r, i) => {
          const riskConfig = getRiskConfig(r.severity);
          return (
            <div key={i} className="rounded-lg border border-slate-800 bg-slate-900 p-3 hover:bg-slate-800/50 transition-colors" role="article">
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${riskConfig.className.split(' ')[0]}`} aria-hidden="true"></span>
                <div className="text-sm font-medium text-slate-100">{r.level} Risk</div>
                <span className="text-lg" role="img" aria-label={riskConfig.ariaLabel}>{riskConfig.icon}</span>
              </div>
              <div className="text-sm text-slate-200 mb-2">{r.title}</div>
              <div className="text-xs text-slate-400 mb-2">Evidence: {r.evidence}</div>
              <div className="rounded-md border border-slate-800 bg-slate-950 p-2 text-xs text-slate-300 mb-3">
                Advice: {r.advice}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Confirm
                </Button>
                <Button size="sm" variant="outline" className="border-slate-700 hover:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Waive
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ScreenReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Composer</CardTitle>
        <CardDescription>Editable sections with citations. Export to PDF/DOCX.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Section title="Executive Summary" placeholder="Overall title status, key risks, and recommended actions..." />
        <Section title="Property & Parties" placeholder="Identifiers, parties, and overview..." />
        <Section title="Title Chain Overview" placeholder="Summarize chain with references PD-2007, SD-2012, SD-2019..." />
        <Section title="Encumbrances & Litigation" placeholder="EC review, court checks, liens..." />
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500" role="status" aria-live="polite">
            TODO: clause templates, track edits, citations side-panel.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950">
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />Export DOCX
            </Button>
            <Button className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950">
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />Export PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, placeholder }: { title: string; placeholder: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50">
      <div className="flex items-center justify-between border-b border-slate-800 p-3">
        <div className="flex items-center gap-2">
          <FolderPlus className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <div className="text-sm font-medium text-slate-100">{title}</div>
        </div>
        <Badge variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          Editable
        </Badge>
      </div>
      <div className="p-3">
        <Textarea
          placeholder={placeholder}
          className="min-h-[120px] bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          aria-label={`${title} content`}
        />
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          <span>Include source citations in final.</span>
        </div>
      </div>
    </div>
  );
}

function Labeled({ label, children }: any) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-slate-400 font-medium">{label}</span>
      {children}
    </label>
  );
}
