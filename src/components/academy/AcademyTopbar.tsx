import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useUserData";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

export function AcademyTopbar() {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleSignOut = async () => {
    await signOut();
    navigate("/academy/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
      <SidebarTrigger className="text-foreground/60 hover:text-foreground" />

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors text-foreground/40 hover:text-foreground/80 hover:bg-foreground/5"
          title={theme === "dark" ? "Modo día" : "Modo noche"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg transition-colors text-foreground/40 hover:text-foreground/80 hover:bg-foreground/5"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="text-xs font-bold bg-accent text-accent-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
