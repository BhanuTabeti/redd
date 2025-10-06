"use client";

import React, { useMemo, useState } from "react";
import {
  Check, ChevronLeft, ChevronRight, FileText, FolderPlus, ShieldAlert, Timer, UploadCloud, Workflow,
  Home, Plus, Building, FileCheck, PenTool, Eye, AlertTriangle, Clock, CheckCircle2,
  Users, MapPin, Calendar, Target, BookOpen, Edit3, Download, ExternalLink,
  ChevronDown, ChevronRight as ChevronRightIcon, X, Search, Filter, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// ---
// REDD Dashboard-Driven Demo
// Smart routing based on matter status. Dashboard → Goal Select → Status-driven screens
// Single-file structure with React state management. Replace with real APIs later.
// ---

type MatterStatus = "Uploading" | "Processing" | "Review" | "Drafting" | "Finalized";
type ScreenType = "Dashboard" | "GoalSelect" | "MatterOverview" | "Docs" | "Processing" | "DDWorkspace" | "DraftingAssistant" | "TitleChain" | "Findings" | "Report";

interface Matter {
  id: string;
  name: string;
  goal: string;
  status: MatterStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  propertyId?: string;
  parties?: string[];
  documents?: number;
  findings?: number;
}

interface WorkflowStep {
  id: string;
  label: string;
  screen: ScreenType;
  status: "completed" | "current" | "pending" | "locked";
  description?: string;
}

export default function REDD_Demo() {
  // Mock matter data with different statuses
  const [matters, setMatters] = useState<Matter[]>([
    {
      id: "1",
      name: "Acme LLP - Survey 42/1A",
      goal: "Title DD - Site",
      status: "Processing",
      progress: 65,
      createdAt: "2025-01-15",
      updatedAt: "2025-01-20",
      propertyId: "Survey 42/1A",
      parties: ["Acme LLP", "Rao Family"],
      documents: 8,
      findings: 2
    },
    {
      id: "2",
      name: "TechCorp - Apartment 5B",
      goal: "Title DD - Apartment",
      status: "Review",
      progress: 85,
      createdAt: "2025-01-10",
      updatedAt: "2025-01-19",
      propertyId: "Apartment 5B",
      parties: ["TechCorp Ltd", "Mehta Family"],
      documents: 12,
      findings: 1
    },
    {
      id: "3",
      name: "GreenField - Plot 127",
      goal: "Draft ATS",
      status: "Drafting",
      progress: 45,
      createdAt: "2025-01-18",
      updatedAt: "2025-01-20",
      propertyId: "Plot 127",
      parties: ["GreenField Developers", "Kumar Estate"],
      documents: 6,
      findings: 0
    },
    {
      id: "4",
      name: "BlueSky - Villa Complex",
      goal: "Draft Sale Deed",
      status: "Finalized",
      progress: 100,
      createdAt: "2025-01-05",
      updatedAt: "2025-01-18",
      propertyId: "Villa Complex",
      parties: ["BlueSky Properties", "Sharma Family"],
      documents: 15,
      findings: 0
    }
  ]);

  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("Dashboard");

  // Generate workflow steps based on matter status
  const getWorkflowSteps = (matter: Matter): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      { id: "docs", label: "Document Inbox", screen: "Docs", status: "pending", description: "Upload and process documents" },
      { id: "processing", label: "Processing", screen: "Processing", status: "pending", description: "AI document analysis" },
      { id: "workspace", label: "DD Workspace", screen: "DDWorkspace", status: "pending", description: "Review findings and evidence" },
      { id: "drafting", label: "Drafting Assistant", screen: "DraftingAssistant", status: "pending", description: "Draft agreements with AI" },
      { id: "report", label: "Report", screen: "Report", status: "pending", description: "Generate final report" }
    ];

    // Update step statuses based on matter progress
    switch (matter.status) {
      case "Uploading":
        baseSteps[0].status = "current";
        break;
      case "Processing":
        baseSteps[0].status = "completed";
        baseSteps[1].status = "current";
        break;
      case "Review":
        baseSteps[0].status = "completed";
        baseSteps[1].status = "completed";
        baseSteps[2].status = "current";
        break;
      case "Drafting":
        baseSteps[0].status = "completed";
        baseSteps[1].status = "completed";
        baseSteps[2].status = "completed";
        baseSteps[3].status = "current";
        break;
      case "Finalized":
        baseSteps.forEach(step => step.status = "completed");
        break;
    }

    return baseSteps;
  };

  const handleMatterSelect = (matter: Matter) => {
    setSelectedMatter(matter);
    setCurrentScreen("MatterOverview");
  };

  const handleNewMatter = () => {
    setSelectedMatter(null);
    setCurrentScreen("GoalSelect");
  };

  const handleBackToDashboard = () => {
    setSelectedMatter(null);
    setCurrentScreen("Dashboard");
  };

  const handleBackToOverview = () => {
    if (selectedMatter) {
      setCurrentScreen("MatterOverview");
    }
  };

  const getStatusConfig = (status: MatterStatus) => {
    const configs = {
      "Uploading": { className: "bg-amber-600", ariaLabel: "Documents uploading", color: "amber" },
      "Processing": { className: "bg-blue-600", ariaLabel: "Documents processing", color: "blue" },
      "Review": { className: "bg-sky-600", ariaLabel: "Under review", color: "sky" },
      "Drafting": { className: "bg-purple-600", ariaLabel: "Draft in progress", color: "purple" },
      "Finalized": { className: "bg-emerald-600", ariaLabel: "Completed", color: "emerald" }
    };
    return configs[status];
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <Header
        currentScreen={currentScreen}
        selectedMatter={selectedMatter}
        onBackToDashboard={handleBackToDashboard}
        onBackToOverview={handleBackToOverview}
      />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {currentScreen === "Dashboard" && (
          <ScreenDashboard
            matters={matters}
            onMatterSelect={handleMatterSelect}
            onNewMatter={handleNewMatter}
          />
        )}

        {currentScreen === "GoalSelect" && (
          <ScreenGoalSelect onGoalSelect={(goal) => setCurrentScreen("Docs")} />
        )}

        {currentScreen === "MatterOverview" && selectedMatter && (
          <ScreenMatterOverview
            matter={selectedMatter}
            workflowSteps={getWorkflowSteps(selectedMatter)}
            onNavigateToScreen={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === "Docs" && selectedMatter && (
          <ScreenDocs matter={selectedMatter} />
        )}

        {currentScreen === "Processing" && selectedMatter && (
          <ScreenProcessing matter={selectedMatter} />
        )}

        {currentScreen === "DDWorkspace" && selectedMatter && (
          <ScreenDDWorkspace matter={selectedMatter} />
        )}

        {currentScreen === "DraftingAssistant" && selectedMatter && (
          <ScreenDraftingAssistant matter={selectedMatter} />
        )}

        {currentScreen === "TitleChain" && selectedMatter && (
          <ScreenTitleChain matter={selectedMatter} />
        )}

        {currentScreen === "Findings" && selectedMatter && (
          <ScreenFindings matter={selectedMatter} />
        )}

        {currentScreen === "Report" && selectedMatter && (
          <ScreenReport matter={selectedMatter} />
        )}
      </main>
    </div>
  );
}

// Header Component
function Header({
  currentScreen,
  selectedMatter,
  onBackToDashboard,
  onBackToOverview
}: {
  currentScreen: ScreenType;
  selectedMatter: Matter | null;
  onBackToDashboard: () => void;
  onBackToOverview: () => void;
}) {
  if (currentScreen === "Dashboard") {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/40">
              <Workflow className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-slate-300">REDD</div>
              <div className="text-lg font-semibold text-white">Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-slate-600 text-slate-300">Mock</Badge>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">v1</Badge>
          </div>
        </div>
      </header>
    );
  }

  // Show back to overview button for screens that aren't Dashboard or MatterOverview
  const showOverviewButton = selectedMatter &&
    (currentScreen !== "Dashboard" as ScreenType) &&
    (currentScreen !== "MatterOverview" as ScreenType);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToDashboard}
            className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
          >
            <Home className="h-4 w-4 mr-2" aria-hidden="true" />
            Dashboard
          </Button>
          {selectedMatter && (
            <>
              <ChevronRightIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {showOverviewButton ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackToOverview}
                  className="focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
                >
                  <span className="text-sm text-slate-200">{selectedMatter.name}</span>
                </Button>
              ) : (
                <span className="text-sm text-slate-200">{selectedMatter.name}</span>
              )}
              {currentScreen !== "MatterOverview" && (
                <>
                  <ChevronRightIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  <span className="text-sm text-slate-400 capitalize">{currentScreen.replace(/([A-Z])/g, ' $1').trim()}</span>
                </>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-slate-600 text-slate-300">Mock</Badge>
          <Badge className="bg-emerald-600 hover:bg-emerald-700">v1</Badge>
        </div>
      </div>
    </header>
  );
}

// Dashboard Screen
function ScreenDashboard({
  matters,
  onMatterSelect,
  onNewMatter
}: {
  matters: Matter[];
  onMatterSelect: (matter: Matter) => void;
  onNewMatter: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Due Diligence Matters</h1>
          <p className="text-slate-300 mt-1">Manage your active due diligence processes</p>
        </div>
        <Button onClick={onNewMatter} className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          New Matter
          </Button>
          </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matters.map((matter) => {
          const statusConfig = getStatusConfig(matter.status);
          return (
            <Card key={matter.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-slate-900 border-slate-800 hover:border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white line-clamp-1">{matter.name}</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">{matter.goal}</CardDescription>
                  </div>
                  <Badge className={`${statusConfig.className} text-white ml-2`}>
                    {matter.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-white">{matter.progress}%</span>
                    </div>
                    <Progress value={matter.progress} className="h-2 bg-slate-800" aria-label={`Progress: ${matter.progress}%`} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-300" aria-hidden="true" />
                      <span className="text-white">{matter.documents} docs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-slate-300" aria-hidden="true" />
                      <span className="text-white">{matter.findings} findings</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Updated {matter.updatedAt}</span>
          <Button
                      size="sm"
                      onClick={() => onMatterSelect(matter)}
                      className="bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
                      Open <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />
          </Button>
        </div>
        </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Matter Overview Screen
function ScreenMatterOverview({
  matter,
  workflowSteps,
  onNavigateToScreen
}: {
  matter: Matter;
  workflowSteps: WorkflowStep[];
  onNavigateToScreen: (screen: ScreenType) => void;
}) {
  const getStatusIcon = (status: WorkflowStep["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case "current": return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />;
      case "pending": return <Timer className="h-5 w-5 text-slate-400" />;
      case "locked": return <ShieldAlert className="h-5 w-5 text-slate-500" />;
      default: return <Timer className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: WorkflowStep["status"]) => {
    switch (status) {
      case "completed": return { className: "bg-emerald-600", label: "Completed" };
      case "current": return { className: "bg-blue-600", label: "Current" };
      case "pending": return { className: "bg-slate-600", label: "Pending" };
      case "locked": return { className: "bg-slate-700", label: "Locked" };
      default: return { className: "bg-slate-600", label: "Pending" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Matter Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{matter.name}</h1>
          <p className="text-slate-300 mt-1">{matter.goal} • {matter.propertyId}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${getStatusConfig(matter.status).className} text-white`}>
            {matter.status}
          </Badge>
          <div className="text-sm text-slate-300">
            {Math.round(matter.progress)}% Complete
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/20 ring-1 ring-blue-500/40">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{matter.documents || 0}</div>
                <div className="text-sm text-slate-300">Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-600/20 ring-1 ring-amber-500/40">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{matter.findings || 0}</div>
                <div className="text-sm text-slate-300">Findings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-600/20 ring-1 ring-purple-500/40">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{matter.parties?.length || 0}</div>
                <div className="text-sm text-slate-300">Parties</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Workflow Progress</CardTitle>
          <CardDescription className="text-slate-300">Navigate to any completed or current step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const statusBadge = getStatusBadge(step.status);
              const isClickable = step.status === "completed" || step.status === "current";

              return (
                <div key={step.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/80 transition-colors">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-medium ${isClickable ? 'text-white' : 'text-slate-400'}`}>
                          {step.label}
                        </h3>
                        <Badge className={`${statusBadge.className} text-white text-xs`}>
                          {statusBadge.label}
                        </Badge>
                      </div>

                      {isClickable && (
                        <Button
                          size="sm"
                          onClick={() => onNavigateToScreen(step.screen)}
                          className={`font-medium transition-all duration-200 ${
                            step.status === "current"
                              ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                              : "bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                          }`}
                        >
                          {step.status === "current" ? "Continue" : "View"}
                        </Button>
                      )}
          </div>

                    {step.description && (
                      <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                    )}
        </div>

                  {index < workflowSteps.length - 1 && (
                    <div className="w-8 h-px bg-slate-600" aria-hidden="true" />
                  )}
    </div>
  );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button
              className="justify-start bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              onClick={() => onNavigateToScreen("Docs")}
            >
              <UploadCloud className="h-4 w-4 mr-2" />
              Manage Documents
            </Button>
            <Button
              className="justify-start bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              onClick={() => onNavigateToScreen("TitleChain")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Title Chain
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Goal Select Screen
function ScreenGoalSelect({ onGoalSelect }: { onGoalSelect: (goal: string) => void }) {
  const goals = [
    {
      id: "title-site",
      title: "Title DD - Site",
      description: "Comprehensive title due diligence for land and plots",
      icon: Building,
      features: ["Title verification", "Encumbrance check", "Land use analysis"]
    },
    {
      id: "title-apartment",
      title: "Title DD - Apartment",
      description: "Specialized due diligence for apartment purchases",
      icon: Home,
      features: ["Apartment title", "Society records", "Maintenance analysis"]
    },
    {
      id: "draft-ats",
      title: "Draft ATS",
      description: "Agreement to Sell drafting assistance",
      icon: FileCheck,
      features: ["Standard clauses", "Custom terms", "Risk mitigation"]
    },
    {
      id: "draft-sale-deed",
      title: "Draft Sale Deed",
      description: "Sale deed drafting with registration support",
      icon: PenTool,
      features: ["Legal formatting", "Registration ready", "Stamp duty calc"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Choose Your Goal</h1>
        <p className="text-slate-300 mt-1">Select the type of due diligence work you need</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {goals.map((goal) => {
          const IconComponent = goal.icon;
          return (
            <Card key={goal.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-slate-900 border-slate-800 hover:border-slate-700">
      <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/40">
                    <IconComponent className="h-5 w-5 text-indigo-400" aria-hidden="true" />
        </div>
                  <div>
                    <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                    <CardDescription className="text-slate-300">{goal.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {goal.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-200">
                      <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
                  onClick={() => onGoalSelect(goal.title)}
                >
                  Continue with {goal.title}
                </Button>
      </CardContent>
    </Card>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Docs Screen (2-column layout)
function ScreenDocs({ matter }: { matter: Matter }) {
  const [docs, setDocs] = useState([
    { name: "Sale Deed 2019.pdf", status: "Parsed", type: "Deed", size: "2.1 MB" },
    { name: "EC_2015_2024.pdf", status: "OCR", type: "EC", size: "1.8 MB" },
    { name: "Khata_Extract.jpg", status: "Uploaded", type: "Khata", size: "856 KB" },
    { name: "RTC_2024.pdf", status: "Processing", type: "RTC", size: "1.2 MB" },
    { name: "Tax_Receipt_2024.pdf", status: "Uploaded", type: "Tax", size: "245 KB" },
  ]);

  const checklist = [
    { key: "ec", text: "Encumbrance Certificate (10 yrs)", done: true, type: "EC" },
    { key: "khata", text: "Khata Extract / Katha Certificate", done: true, type: "Khata" },
    { key: "rtc", text: "RTC / Record of Rights (latest)", done: false, type: "RTC" },
    { key: "id_proofs", text: "Parties ID proofs (PAN/Aadhaar)", done: true, type: "ID" },
    { key: "tax_receipts", text: "Property Tax Receipts (3 yrs)", done: false, type: "Tax" },
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      "Parsed": { className: "bg-emerald-600", ariaLabel: "Document parsed successfully" },
      "OCR": { className: "bg-blue-600", ariaLabel: "Document being processed by OCR" },
      "Processing": { className: "bg-blue-600", ariaLabel: "Document processing" },
      "Uploaded": { className: "bg-slate-700", ariaLabel: "Document uploaded" }
    };
    return configs[status as keyof typeof configs] || configs.Uploaded;
  };

  const getDocTypeBadge = (type: string) => {
    const configs = {
      "Deed": "bg-purple-600",
      "EC": "bg-blue-600",
      "Khata": "bg-green-600",
      "RTC": "bg-orange-600",
      "Tax": "bg-slate-600",
      "ID": "bg-indigo-600"
    };
    return configs[type as keyof typeof configs] || "bg-slate-600";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Column - Upload & Files (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
            <CardTitle className="text-white">Document Upload</CardTitle>
            <CardDescription className="text-slate-300">Upload property documents for processing</CardDescription>
      </CardHeader>
      <CardContent>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-slate-600 transition-colors">
              <UploadCloud className="h-8 w-8 text-slate-300 mx-auto mb-2" aria-hidden="true" />
              <p className="text-white mb-2">Drag & drop files here or click to browse</p>
              <p className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB each</p>
              <Button className="mt-4 bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                <UploadCloud className="h-4 w-4 mr-2" aria-hidden="true" />
                Browse Files
          </Button>
          </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Uploaded Documents ({docs.length})</CardTitle>
            <CardDescription className="text-slate-300">Processing status and document management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {docs.map((doc, index) => {
                const statusInfo = getStatusBadge(doc.status);
            return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-slate-300" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-medium text-white">{doc.name}</div>
                        <div className="text-xs text-slate-400">{doc.size}</div>
                      </div>
                </div>
                <div className="flex items-center gap-2">
                      <Badge className={`${getDocTypeBadge(doc.type)} text-white`}>
                        {doc.type}
                  </Badge>
                      <Badge className={`${statusInfo.className} text-white`}>
                        {doc.status}
                  </Badge>
                  <Button
                    size="sm"
                        className="bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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
      </div>

      {/* Right Column - Checklist (1/3 width) */}
      <div>
        <Card className="sticky top-24 bg-slate-900 border-slate-800">
      <CardHeader>
            <CardTitle className="text-lg text-white">Required Documents</CardTitle>
            <CardDescription className="text-slate-300">Karnataka-specific checklist</CardDescription>
      </CardHeader>
      <CardContent>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                <input
                  type="checkbox"
                    checked={item.done}
                    readOnly
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600"
                  />
                  <div className="flex-1">
                    <div className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {item.text}
                    </div>
                    <Badge className={`${getDocTypeBadge(item.type)} text-white text-xs`}>
                      {item.type}
                    </Badge>
                  </div>
                  {!item.done && (
                    <Badge variant="outline" className="border-amber-500/40 text-amber-400 text-xs">
                  Missing
                </Badge>
              )}
            </div>
          ))}
        </div>
            <Button
              className={`w-full mt-4 transition-all duration-200 ${
                checklist.every(item => item.done)
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!checklist.every(item => item.done)}
            >
              Start Processing
            </Button>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}

// Processing Screen (5-stage pipeline)
function ScreenProcessing({ matter }: { matter: Matter }) {
  const stages = [
    { id: "ocr", name: "OCR Processing", progress: 100, status: "complete" },
    { id: "classify", name: "Document Classification", progress: 85, status: "processing" },
    { id: "extract", name: "Data Extraction", progress: 60, status: "processing" },
    { id: "reconcile", name: "Data Reconciliation", progress: 30, status: "pending" },
    { id: "checks", name: "Final Checks", progress: 0, status: "pending" }
  ];

  const stats = [
    { label: "Documents", value: matter.documents || 0, icon: FileText },
    { label: "Pages Processed", value: "127", icon: BookOpen },
    { label: "Key Fields", value: "23", icon: Target },
    { label: "Warnings", value: "2", icon: AlertTriangle, highlight: true }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "processing": return <Clock className="h-4 w-4 text-blue-400 animate-pulse" />;
      case "pending": return <Timer className="h-4 w-4 text-slate-400" />;
      default: return <Timer className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Processing Pipeline</h1>
        <p className="text-slate-300 mt-1">AI-powered document analysis in progress</p>
      </div>

      {/* Pipeline Stages */}
    <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Processing Stages</CardTitle>
          <CardDescription className="text-slate-300">Real-time progress through our 5-stage pipeline</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(stage.status)}
                  </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{stage.name}</span>
                    <span className="text-xs text-slate-300">{stage.progress}%</span>
                </div>
                  <Progress value={stage.progress} className="h-2 bg-slate-800" />
                </div>
                {index < stages.length - 1 && (
                  <div className="w-8 h-px bg-slate-700" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className={`${stat.highlight ? 'border-amber-500/40 bg-amber-950/20' : 'bg-slate-900 border-slate-800'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg ${stat.highlight ? 'bg-amber-600/20' : 'bg-slate-800'}`}>
                    <IconComponent className={`h-4 w-4 ${stat.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
        </div>
                  <div>
                    <div className={`text-lg font-semibold ${stat.highlight ? 'text-amber-400' : 'text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-300">{stat.label}</div>
                  </div>
        </div>
      </CardContent>
    </Card>
          );
        })}
      </div>

      {/* Processing Log */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Processing Log</CardTitle>
          <CardDescription className="text-slate-300">Real-time updates from the processing engine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {[
              "11:42 - OCR completed for Sale_Deed_2019.pdf",
              "11:41 - Started document classification",
              "11:40 - EC_2015_2024.pdf processing started",
              "11:39 - Khata_Extract.jpg OCR completed",
              "11:38 - RTC_2024.pdf uploaded successfully"
            ].map((log, index) => (
              <div key={index} className="text-sm text-slate-200 p-2 rounded bg-slate-900/50">
                {log}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// DD Workspace Screen (3-pane layout)
function ScreenDDWorkspace({ matter }: { matter: Matter }) {
  const [selectedSection, setSelectedSection] = useState("findings");
  const [expandedFlags, setExpandedFlags] = useState<string[]>([]);

  const sections = [
    { id: "findings", label: "Risk Findings", count: matter.findings || 0, icon: AlertTriangle },
    { id: "documents", label: "Source Documents", count: matter.documents || 0, icon: FileText },
    { id: "timeline", label: "Title Timeline", count: 3, icon: Calendar },
    { id: "parties", label: "Parties & Property", count: 2, icon: Users }
  ];

  const redFlags = [
    {
      id: "flag-1",
      severity: "High",
      title: "Name mismatch in Sale Deed",
      description: "Buyer name differs between Sale Deed and EC",
      evidence: "Sale_Deed_2019.pdf p.2 vs EC_2015_2024.pdf p.1",
      section: "findings"
    },
    {
      id: "flag-2",
      severity: "Medium",
      title: "EC gap period",
      description: "No EC coverage for 2010-2015 period",
      evidence: "Gap between previous and current EC certificates",
      section: "findings"
    }
  ];

  const getSeverityConfig = (severity: string) => {
    const configs = {
      "High": { className: "bg-red-600 text-white", icon: "🔴" },
      "Medium": { className: "bg-amber-600 text-white", icon: "🟡" },
      "Low": { className: "bg-emerald-600 text-white", icon: "🟢" }
    };
    return configs[severity as keyof typeof configs] || configs.Low;
  };

  const toggleFlag = (flagId: string) => {
    setExpandedFlags(prev =>
      prev.includes(flagId)
        ? prev.filter(id => id !== flagId)
        : [...prev, flagId]
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Left Pane - Navigation & Red Flags (1/4) */}
      <div className="space-y-4">
        {/* Section Navigation */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Sections</CardTitle>
      </CardHeader>
          <CardContent className="space-y-1">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isActive = selectedSection === section.id;
          return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-400'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{section.label}</span>
              </div>
                  <Badge variant="outline" className="text-xs border-slate-500 text-slate-200 bg-slate-800/50">
                    {section.count}
                </Badge>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Red Flags */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Red Flags ({redFlags.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {redFlags.map((flag) => {
              const severityConfig = getSeverityConfig(flag.severity);
              const isExpanded = expandedFlags.includes(flag.id);
              return (
                <div key={flag.id} className="border border-red-800/40 rounded-lg bg-red-950/20">
                  <button
                    onClick={() => toggleFlag(flag.id)}
                    className="w-full p-3 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{severityConfig.icon}</span>
                      <span className="text-sm font-medium text-white">{flag.title}</span>
              </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-red-800/40">
                      <div className="text-xs text-slate-200 mt-2">{flag.description}</div>
                      <div className="text-xs text-slate-300 mt-1">Evidence: {flag.evidence}</div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200"
                        >
                          Jump to Evidence
                </Button>
                        <Button
                          size="sm"
                          className="text-xs bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200"
                        >
                          Accept Risk
                </Button>
            </div>
                    </div>
                  )}
            </div>
          );
        })}
      </CardContent>
    </Card>
      </div>

      {/* Center Pane - PDF Viewer (1/2) */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Document Viewer</CardTitle>
            <CardDescription className="text-slate-300">PDF viewer with evidence markers and annotations</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="h-full bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
                <p className="text-white mb-2">PDF Viewer Placeholder</p>
                <p className="text-xs text-slate-400">Sale_Deed_2019.pdf</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Name mismatch (p.2)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Date inconsistency (p.4)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Pane - Actions (1/4) */}
      <div className="space-y-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200" size="sm">
              Accept Finding
            </Button>
            <Button variant="outline" className="w-full border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200" size="sm">
              Request Clarification
            </Button>
            <Button variant="outline" className="w-full border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200" size="sm">
              Assign to Team
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Suggested Clauses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Encumbrance Indemnity Clause",
              "Conditional Payment Terms",
              "Updated EC Requirement"
            ].map((clause, index) => (
              <button
                key={index}
                className="w-full text-left p-2 rounded border border-slate-400 bg-slate-800/50 hover:bg-slate-700 hover:text-white text-slate-100 transition-all duration-200"
              >
                <div className="text-sm text-white">{clause}</div>
                <div className="text-xs text-slate-400 mt-1">Click to insert</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
          Generate Title Note
        </Button>
        </div>
    </div>
  );
}

// Drafting Assistant Screen
function ScreenDraftingAssistant({ matter }: { matter: Matter }) {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);

  const factPanel = {
    parties: ["Acme LLP (Buyer)", "Rao Family Trust (Seller)"],
    property: "Survey No. 42/1A, Bengaluru, Karnataka",
    consideration: "₹2,50,00,000 (Two Crore Fifty Lakh Rupees)",
    encumbrances: ["Clear title as per EC 2015-2024", "No pending litigation"]
  };

  const suggestedClauses = [
    "Insert Encumbrance Indemnity",
    "Add Conditional Payment Clause",
    "Include Updated EC Requirement",
    "Add Rectification Clause",
    "Insert Force Majeure Clause"
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Pane - Locked Facts (1/3) */}
      <div>
        <Card className="sticky top-24 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              Verified Facts
            </CardTitle>
            <CardDescription className="text-slate-300">Extracted from processed documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Parties</div>
              <div className="space-y-1">
                {factPanel.parties.map((party, index) => (
                  <div key={index} className="text-sm text-slate-200 p-2 bg-slate-800 rounded border border-slate-700">
                    {party}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Property</div>
              <div className="text-sm text-slate-200 p-2 bg-slate-800 rounded border border-slate-700">
                {factPanel.property}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Consideration</div>
              <div className="text-sm text-slate-200 p-2 bg-slate-800 rounded border border-slate-700">
                {factPanel.consideration}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Encumbrances</div>
              <div className="space-y-1">
                {factPanel.encumbrances.map((encumbrance, index) => (
                  <div key={index} className="text-sm text-slate-200 p-2 bg-slate-800 rounded border border-slate-700">
                    {encumbrance}
                  </div>
                ))}
              </div>
        </div>
      </CardContent>
    </Card>
      </div>

      {/* Right Pane - Editor (2/3) */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="h-[500px] bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Draft Editor</CardTitle>
            <CardDescription className="text-slate-300">Agreement to Sell - {matter.name}</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="h-full bg-slate-900 rounded-lg border border-slate-700 p-4">
              <div className="text-slate-200 text-sm mb-4">Draft content will appear here...</div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Suggested Clauses</CardTitle>
            <CardDescription className="text-slate-300">AI-recommended additions based on due diligence findings</CardDescription>
      </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              {suggestedClauses.map((clause, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedClause(clause)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    selectedClause === clause
                      ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400'
                      : 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-sm font-medium text-white">{clause}</div>
                  <div className="text-xs text-slate-400 mt-1">Click to preview</div>
                </button>
              ))}
          </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200">
            <Eye className="h-4 w-4 mr-2" />
            Preview PDF
          </Button>
          <Button className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export DOCX
            </Button>
          </div>
      </div>
    </div>
  );
}

// Enhanced Title Chain Screen
function ScreenTitleChain({ matter }: { matter: Matter }) {
  const chainItems = [
    { year: 2007, type: "Partition Deed", party: "Rao Family Partition", ref: "PD-2007", status: "verified" },
    { year: 2012, type: "Sale Deed", party: "Rao → Mehta", ref: "SD-2012", status: "verified" },
    { year: 2019, type: "Sale Deed", party: "Mehta → Acme LLP", ref: "SD-2019", status: "current" },
    { year: 2025, type: "Sale Deed", party: "Acme LLP → New Buyer", ref: "SD-2025", status: "pending" }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      "verified": { className: "bg-emerald-600", icon: CheckCircle2 },
      "current": { className: "bg-blue-600", icon: Clock },
      "pending": { className: "bg-slate-600", icon: Timer }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Title Chain Analysis</h1>
        <p className="text-slate-300 mt-1">Complete ownership timeline with verification status</p>
      </div>

    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
          <CardTitle className="text-white">Ownership Timeline</CardTitle>
          <CardDescription className="text-slate-300">Visual representation of property transfers over time</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" aria-hidden="true" />

            <div className="space-y-6">
              {chainItems.map((item, index) => {
                const statusConfig = getStatusConfig(item.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div key={index} className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className={`relative z-10 grid h-12 w-12 place-items-center rounded-full ${statusConfig.className} ring-2 ring-slate-950`}>
                      <StatusIcon className="h-5 w-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-lg font-semibold text-white">{item.year}</div>
                        <Badge className={`${statusConfig.className} text-white`}>
                          {item.type}
                    </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200"
                          onClick={() => alert("Backend integration pending")}
                        >
                          {item.ref}
                        </Button>
                  </div>
                      <div className="text-sm text-slate-300 mb-2">
                        Transfer: {item.party}
                </div>
                      {item.status === "pending" && (
                        <Badge variant="outline" className="border-amber-500/40 text-amber-400">
                          Gap Period - Needs Verification
                        </Badge>
                      )}
              </div>
          </div>
                );
              })}
        </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

// Enhanced Findings Screen
function ScreenFindings({ matter }: { matter: Matter }) {
  const findings = [
    {
      id: "finding-1",
      level: "High",
      title: "Name mismatch: Buyer name differs across docs",
      description: "PAN card shows 'ACME LIMITED LIABILITY PARTNERSHIP' but Sale Deed shows 'ACME LLP'",
      evidence: ["Sale_Deed_2019.pdf p.2", "PAN_Card_Acme.pdf"],
      advice: "Verify PAN spelling; seek affidavit/correction deed if needed.",
      status: "pending"
    },
    {
      id: "finding-2",
      level: "Medium",
      title: "EC gap (2014)",
      description: "No EC coverage for 2010–2015 period between ownership transfers",
      evidence: ["EC_2015_2024.pdf", "Previous_EC_2010.pdf"],
      advice: "Pull EC for 2010–2016; confirm no liens or encumbrances during gap period.",
      status: "pending"
    },
    {
      id: "finding-3",
      level: "Low",
      title: "Khata matches latest RTC",
      description: "Property tax records align with Record of Rights",
      evidence: ["Khata_Extract.jpg", "RTC_2024.pdf"],
      advice: "No action required.",
      status: "confirmed"
    }
  ];

  const getRiskConfig = (level: string) => {
    const configs = {
      "High": { className: "bg-red-600 border-red-500", icon: "🔴", badgeClass: "border-red-500/40 text-red-400" },
      "Medium": { className: "bg-amber-600 border-amber-500", icon: "🟡", badgeClass: "border-amber-500/40 text-amber-400" },
      "Low": { className: "bg-emerald-600 border-emerald-500", icon: "🟢", badgeClass: "border-emerald-500/40 text-emerald-400" }
    };
    return configs[level as keyof typeof configs] || configs.Low;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Risk Findings & Evidence</h1>
        <p className="text-slate-300 mt-1">AI-identified issues with recommended actions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {findings.map((finding) => {
          const riskConfig = getRiskConfig(finding.level);
          return (
            <Card key={finding.id} className={`border ${riskConfig.badgeClass} bg-slate-900`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
                    <span className="text-lg">{riskConfig.icon}</span>
                    <div>
                      <CardTitle className="text-base text-white">{finding.level} Risk</CardTitle>
                      <Badge className={`${riskConfig.badgeClass} text-xs`}>
                        {finding.status}
                      </Badge>
              </div>
              </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-white">{finding.title}</div>
                  <div className="text-xs text-slate-300">{finding.description}</div>

                  <div>
                    <div className="text-xs font-medium text-slate-300 mb-1">Evidence:</div>
                    <div className="flex flex-wrap gap-1">
                      {finding.evidence.map((evidence, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-xs h-6"
                        >
                          {evidence}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md border border-slate-800 bg-slate-950 p-2">
                    <div className="text-xs font-medium text-slate-300 mb-1">Advice:</div>
                    <div className="text-xs text-slate-200">{finding.advice}</div>
                  </div>

              <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200"
                    >
                  Confirm
                </Button>
                    <Button
                      size="sm"
                      className="text-xs bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white border border-slate-600 transition-all duration-200"
                    >
                      Waive Risk
                </Button>
              </div>
            </div>
      </CardContent>
    </Card>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Report Screen
function ScreenReport({ matter }: { matter: Matter }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["summary"]);

  const sections = [
    { id: "summary", title: "Executive Summary", content: "Overall title status, key risks, and recommended actions...", status: "draft" },
    { id: "property", title: "Property & Parties", content: "Property identifiers, parties involved, and overview...", status: "draft" },
    { id: "title", title: "Title Chain Overview", content: "Complete chain analysis with references PD-2007, SD-2012, SD-2019...", status: "draft" },
    { id: "encumbrances", title: "Encumbrances & Litigation", content: "EC review, court checks, liens and litigation status...", status: "draft" },
    { id: "findings", title: "Key Findings", content: "Summary of identified risks and their resolution status...", status: "draft" }
  ];

  const exportOptions = [
    { id: "title-note", title: "Title Note", description: "Comprehensive title report", format: "PDF" },
    { id: "red-flags", title: "Red-Flag Summary", description: "Risk summary for stakeholders", format: "PDF" },
    { id: "requests", title: "Outstanding Requests", description: "List of pending clarifications", format: "DOCX" },
    { id: "drafts", title: "Agreement Drafts", description: "All agreement versions", format: "DOCX" },
    { id: "timeline", title: "Title Chain PNG", description: "Visual timeline export", format: "PNG" }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      "draft": { className: "bg-slate-600", label: "Draft" },
      "review": { className: "bg-blue-600", label: "In Review" },
      "final": { className: "bg-emerald-600", label: "Final" }
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Report Composer</h1>
        <p className="text-slate-300 mt-1">Compile findings into professional reports</p>
      </div>

      {/* Report Sections */}
      <div className="grid gap-4">
        {sections.map((section) => {
          const statusConfig = getStatusBadge(section.status);
          const isExpanded = expandedSections.includes(section.id);

          return (
            <Card key={section.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="text-slate-400 hover:text-slate-300"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <CardTitle className="text-lg text-white">{section.title}</CardTitle>
                      <Badge className={`${statusConfig.className} text-white text-xs`}>
                        {statusConfig.label}
        </Badge>
      </div>
                  </div>
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent className="pt-0">
                  <Textarea
                    placeholder={section.content}
                    className="min-h-[100px] bg-slate-900 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                    <span>Include source citations in final version</span>
        </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Export Options */}
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
          <CardTitle className="text-white">Export Options</CardTitle>
          <CardDescription className="text-slate-300">Generate various report formats for different stakeholders</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {exportOptions.map((option) => (
              <div key={option.id} className="p-4 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-white">{option.title}</div>
                    <div className="text-xs text-slate-300 mt-1">{option.description}</div>
          </div>
                  <Badge className="bg-slate-600 text-white text-xs">
                    {option.format}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-400 text-slate-100 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Export {option.format}
            </Button>
          </div>
            ))}
        </div>
      </CardContent>
    </Card>

      <div className="flex justify-end">
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
          <Download className="h-4 w-4 mr-2" />
          Export All Reports
        </Button>
      </div>
    </div>
  );
}

// Utility functions
function getStatusConfig(status: MatterStatus) {
  const configs = {
    "Uploading": { className: "bg-amber-600", ariaLabel: "Documents uploading", color: "amber" },
    "Processing": { className: "bg-blue-600", ariaLabel: "Documents processing", color: "blue" },
    "Review": { className: "bg-sky-600", ariaLabel: "Under review", color: "sky" },
    "Drafting": { className: "bg-purple-600", ariaLabel: "Draft in progress", color: "purple" },
    "Finalized": { className: "bg-emerald-600", ariaLabel: "Completed", color: "emerald" }
  };
  return configs[status];
}

// Legacy components for backward compatibility (simplified)
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

// Legacy components for backward compatibility (simplified)
function Labeled({ label, children }: any) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-slate-400 font-medium">{label}</span>
      {children}
    </label>
  );
}
