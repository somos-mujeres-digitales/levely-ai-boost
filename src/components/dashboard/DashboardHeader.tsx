import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, usePlan } from "@/hooks/useUserData";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  FileText, 
  Zap, 
  Briefcase, 
  Sun, 
  Moon, 
  User, 
  LogOut,
  Coins
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const displayName = profile?.full_name || "Explorador";
  const credits = profile?.credits || 0;
  const planName = plan?.name || "Starter";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Sidebar trigger + Welcome */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-2xl font-bold">
              Hola, <span className="text-lime">{displayName}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Esto es lo que la IA de Levely tiene para ti.
            </p>
          </div>
        </div>

        {/* Center: Quick Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/cvs">
              <FileText className="h-4 w-4 mr-2" />
              Crear CV
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="border-lime/50 text-lime hover:bg-lime/10" asChild>
            <Link to="/dashboard/feedback">
              <Zap className="h-4 w-4 mr-2" />
              Evaluar Perfil
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/oportunidades">
              <Briefcase className="h-4 w-4 mr-2" />
              Ver Oportunidades
            </Link>
          </Button>
        </div>

        {/* Right: Credits + Theme + Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Credits Badge */}
          <Link 
            to="/dashboard/creditos"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border hover:border-lime/50 transition-colors"
          >
            <Coins className="h-4 w-4 text-lime" />
            <span className="text-sm font-medium">{credits}</span>
            <span className="text-xs text-muted-foreground">Créditos</span>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-lime/20 text-lime">
                  {planName}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/configuracion" className="cursor-pointer">
                  Configuración
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/creditos" className="cursor-pointer">
                  Mejorar Plan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
