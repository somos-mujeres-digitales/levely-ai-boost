import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  CreditCard, 
  Settings,
  Users,
  Sparkles
} from "lucide-react";
import { useProfile, usePlan } from "@/hooks/useUserData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Mi Panel", href: "/dashboard", icon: LayoutDashboard },
  { title: "Mis CVs", href: "/dashboard/cvs", icon: FileText },
  { title: "Mis Evaluaciones", href: "/dashboard/feedback", icon: MessageSquare },
  { title: "Oportunidades", href: "/dashboard/oportunidades", icon: Briefcase },
];

const communityItems = [
  { title: "Networking", href: "/dashboard/networking", icon: Users },
];

const bottomItems = [
  { title: "Créditos", href: "/dashboard/creditos", icon: CreditCard },
  { title: "Configuración", href: "/dashboard/configuracion", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const planName = plan?.name || "Starter";
  const profileProgress = profile?.employability_score || 0;

  return (
    <Sidebar className={cn("border-r border-border", collapsed ? "w-16" : "w-64")}>
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-lime" />
            {!collapsed && (
              <span className="text-xl font-extrabold tracking-tight">Levely</span>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={cn("px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", collapsed && "sr-only")}>
            Carrera Profesional
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? "bg-lime text-lime-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Community Section - Only for Pro */}
        {plan?.has_community && (
          <SidebarGroup>
            <SidebarGroupLabel className={cn("px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", collapsed && "sr-only")}>
              Comunidad
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {communityItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                          isActive(item.href)
                            ? "bg-lime text-lime-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Plan Badge */}
        {!collapsed && (
          <div className="mx-4 mb-4 p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-lime/20">
                <Sparkles className="h-4 w-4 text-lime" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide">{planName}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Completa tu perfil al 100%
            </p>
            <Progress value={profileProgress} className="h-1.5" />
          </div>
        )}

        {/* Bottom Navigation */}
        <SidebarFooter className="border-t border-border">
          <SidebarMenu>
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? "bg-lime text-lime-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
