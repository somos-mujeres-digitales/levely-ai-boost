import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AcademySidebar } from "./AcademySidebar";
import { AcademyTopbar } from "./AcademyTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AcademyLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/academy/login");
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="academy-theme">
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="academy-theme">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AcademySidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <AcademyTopbar />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
