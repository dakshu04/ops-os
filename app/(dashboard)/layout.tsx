import { Sidebar } from "./components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // 'h-screen' forces the app to fill the viewport exactly.
    // 'overflow-hidden' prevents the whole browser window from scrolling.
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      
      {/* The Sidebar (Fixed Width) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* The Content Area (Fluid & Scrollable) */}
      <main className="flex-1 overflow-y-auto bg-black/20">
        {/* We add a container to center content on huge screens if needed */}
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}