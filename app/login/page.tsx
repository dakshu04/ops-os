"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "./actions"; // Import the action we made in Step 2
import { CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-zinc-100 selection:bg-indigo-500/30">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

      <div className="z-10 w-full max-w-md space-y-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 shadow-xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome to Ops-OS
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            The operating system for modern agencies.
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-3 py-2">
            <FeatureItem text="Manage unlimited client projects" />
            <FeatureItem text="Automated billing & invoices" />
            <FeatureItem text="Real-time collaboration" />
        </div>

        {/* Login Button */}
        <form action={signInWithGoogle} className="pt-2">
          <Button 
            className="w-full bg-white text-zinc-950 hover:bg-zinc-200 h-11 font-medium relative group overflow-hidden" 
            type="submit"
          >
            {/* Google Logo */}
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Sign in with Google
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-500">
            By clicking continue, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>{text}</span>
        </div>
    )
}