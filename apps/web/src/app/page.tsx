import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow, ExternalLink, Building, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/40">
              <Workflow className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-slate-300">REDD</div>
              <div className="text-lg font-semibold text-white">Real Estate Due Diligence</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-slate-600 text-slate-300">Mock</Badge>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">v1</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              AI-Powered Due Diligence
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Streamline real estate transactions with intelligent document analysis,
              risk assessment, and automated report generation.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600/20 ring-1 ring-blue-500/40 mx-auto mb-4">
                  <Building className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Property Analysis</h3>
                <p className="text-sm text-slate-300">
                  Comprehensive title verification and property document analysis
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-600/20 ring-1 ring-amber-500/40 mx-auto mb-4">
                  <Shield className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
                <p className="text-sm text-slate-300">
                  AI-powered identification of potential risks and issues
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-600/20 ring-1 ring-purple-500/40 mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Processing</h3>
                <p className="text-sm text-slate-300">
                  Automated document processing and report generation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-white">Try the Demo</CardTitle>
              <CardDescription className="text-slate-300">
                Experience the full REDD workflow with interactive examples
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/demo">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
                  View Demo
                  <ExternalLink className="h-4 w-4 ml-2" aria-hidden="true" />
                </Button>
              </Link>
              <p className="text-xs text-slate-400 mt-3">
                Interactive demo with sample data and workflows
              </p>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              © 2025 Prava. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
