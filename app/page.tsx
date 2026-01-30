import Link from "next/link"; // Import Link for client-side navigation
import { ArrowRight, Zap, Eye, Move, Clock, Settings, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              {/* IDEAL LOGIN LINK */}
              <Link 
                href="/login" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              {/* IDEAL SIGN UP LINK */}
              <Link 
                href="/login" 
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                Sign Up
              </Link>
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
            <p className="mt-6 text-xl text-muted-foreground/80">
              for elite operators
            </p>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              A Kanban-based CRM built for high-performance agencies. 
              Move faster. Stay organized. Scale without friction.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              {/* PRIMARY CTA */}
              <Link 
                href="/login" 
                className="group flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                Try Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ... rest of your sections remain the same ... */}

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
            <Link 
              href="/login" 
              className="group flex items-center gap-2 rounded-lg bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ... footer ... */}
    </div>
  );
};

export default Index;