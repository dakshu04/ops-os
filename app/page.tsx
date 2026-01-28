import { ArrowRight, Zap, Eye, Move, Clock, Settings, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground bg-amber-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <LayoutDashboard className="h-4 w-4 text-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight">OpsOS</span>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Login
              </button>
              <button className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:bg-foreground/90">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              The Agency
              <br />
              Operating System
            </h1>
            <p className="font-signature mt-6 text-xl text-muted-foreground/80">
              for elite operators
            </p>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              A Kanban-based CRM built for high-performance agencies. 
              Move faster. Stay organized. Scale without friction.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button className="group flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90">
                Try Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/20">
            {/* Window Controls */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="ml-4 text-sm text-muted-foreground">Project Alpha</span>
              <span className="text-xs text-muted-foreground/60">Sprint 4 • Due Mar 04</span>
            </div>
            
            {/* Kanban Board */}
            <div className="flex gap-4 p-6 overflow-x-auto">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-48 shrink-0 border-r border-border pr-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="text-sm font-medium">Board</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors mt-1">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Settings</span>
                </div>
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                      N
                    </div>
                    <div>
                      <p className="text-sm font-medium">Founder</p>
                      <p className="text-xs text-muted-foreground">Pro Plan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columns */}
              <div className="flex gap-4 flex-1">
                {/* New Column */}
                <div className="w-64 shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">New</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-12</p>
                      <p className="text-sm font-medium">landing page</p>
                    </div>
                  </div>
                </div>

                {/* Backlog Column */}
                <div className="w-64 shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-zinc-500" />
                      <span className="text-sm font-medium">Backlog</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-6</p>
                      <p className="text-sm font-medium">Nefasfw Task</p>
                    </div>
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="w-64 shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                    <span className="text-xs text-muted-foreground">3</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-7</p>
                      <p className="text-sm font-medium">New Task</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-9</p>
                      <p className="text-sm font-medium">New Task</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-11</p>
                      <p className="text-sm font-medium">navigation bug</p>
                    </div>
                  </div>
                </div>

                {/* Done Column */}
                <div className="w-64 shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium">Done</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1</span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-border/80 hover:bg-secondary/70 cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">OPS-5</p>
                      <p className="text-sm font-medium">New Task</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for speed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every interaction optimized. Every workflow streamlined.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:bg-secondary/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Move className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium mb-2">Drag & Drop</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fluid workflows with intuitive drag-and-drop task management across unlimited boards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:bg-secondary/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Zap className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium mb-2">Automation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trigger actions automatically. Status changes, notifications, and assignments on autopilot.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:bg-secondary/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Eye className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium mb-2">Client Visibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share progress with clients. Controlled access to projects without the complexity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:bg-secondary/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium mb-2">Speed-First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sub-100ms interactions. Keyboard shortcuts. Designed for operators who value their time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to operate at scale?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Join high-performance agencies already using OpsOS to move faster.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="group flex items-center gap-2 rounded-lg bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary">
                <LayoutDashboard className="h-3 w-3 text-foreground" />
              </div>
              <span className="text-sm font-medium">OpsOS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 OpsOS. Built for elite operators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
