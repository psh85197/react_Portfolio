import { cn } from "@/lib/utils";
import Loading from "@/pages/[lang]/pub/components/common/loading.tsx";

interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({ loading, children, className }: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {loading && (
       <Loading/>
      )}
    </div>
  );
}