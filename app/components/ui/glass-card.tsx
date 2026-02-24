import { cn } from "@/app/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl shadow-xl shadow-sand-gold-900/5",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/60 to-transparent opacity-50 pointer-events-none mix-blend-overlay" />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}
