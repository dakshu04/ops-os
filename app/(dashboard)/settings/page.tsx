export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Settings</h1>
      
      <div className="space-y-6">
        <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/30">
            <h3 className="text-lg font-medium text-white mb-1">General</h3>
            <p className="text-sm text-zinc-500 mb-4">Manage your agency profile and preferences.</p>
            <div className="h-8 bg-zinc-800/50 rounded w-full animate-pulse" />
        </div>
        
        <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/30">
            <h3 className="text-lg font-medium text-white mb-1">Billing</h3>
            <p className="text-sm text-zinc-500 mb-4">Manage your subscription and invoices.</p>
            <div className="h-8 bg-zinc-800/50 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}