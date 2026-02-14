import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, Route, Users, FolderOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Inicio", href: "/academy", icon: Home },
  { title: "Rutas", href: "/academy/routes", icon: Route },
  { title: "Expertos", href: "/academy/experts", icon: Users },
  { title: "Recursos", href: "/academy/resources", icon: FolderOpen },
  { title: "Mi perfil", href: "/academy/profile", icon: User },
];

export function AcademySidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/academy") return location.pathname === "/academy";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar
      className={cn("border-r border-border bg-sidebar", collapsed ? "w-16" : "w-60")}
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <Link to="/academy" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent">
              <span className="text-sm font-black text-accent-foreground">L</span>
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                Levely <span className="text-xs font-medium opacity-60">Academy</span>
              </span>
            )}
          </Link>
        </div>

        <SidebarGroup className="flex-1 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 mx-2",
                        isActive(item.href)
                          ? "font-semibold bg-sidebar-accent text-accent"
                          : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CTA */}
        {!collapsed && (
          <div className="mx-4 mb-4 p-4 rounded-xl bg-card border border-border">
            <p className="text-xs font-medium text-foreground/80 mb-2">¿Quieres ir más allá?</p>
            <Link
              to="/career-accelerator"
              className="text-xs font-semibold transition-colors hover:underline text-accent"
            >
              Descubre Career Accelerator →
            </Link>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
