import { Sidebar } from '@/app/components/Layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-72 transition-all duration-300">
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
