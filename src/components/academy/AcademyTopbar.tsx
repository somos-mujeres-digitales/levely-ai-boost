import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useUserData";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AcademyTopbar() {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleSignOut = async () => {
    await signOut();
    navigate("/academy/login");
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b"
      style={{ background: "hsl(168 28% 11%)", borderColor: "hsl(168 15% 20%)" }}
    >
      <SidebarTrigger className="text-white/60 hover:text-white" />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg transition-colors text-white/40 hover:text-white/80 hover:bg-white/5"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
        <Avatar className="h-9 w-9">
          <AvatarFallback
            className="text-xs font-bold"
            style={{ background: "#CAF374", color: "hsl(168 28% 12%)" }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
