
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Ticket, Building, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface ManagerLayoutProps {
  children: React.ReactNode;
  title: string;
}
export const ManagerLayout: React.FC<ManagerLayoutProps> = ({
  children,
  title
}) => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();

  // Ensure user is manager
  React.useEffect(() => {
    if (!user || user.role !== "manager") {
      navigate("/login");
    }
  }, [user, navigate]);
  const menuItems = [{
    title: "Tickets",
    icon: Ticket,
    url: "/manager/tickets"
  }];
  return <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-livo-600">
                <span className="text-lg font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold">Livo</span>
              <span className="ml-auto text-xs bg-livo-100 text-livo-800 px-2 py-0.5 rounded-full">Manager</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map(item => <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${window.location.pathname === item.url ? 'bg-sidebar-accent' : ''}`}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Sites</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {user?.sites.map(site => <SidebarMenuItem key={site.id}>
                      <SidebarMenuButton asChild>
                        <Link to={`/manager/site/${site.id}`} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm">
                          <Building className="h-5 w-5" />
                          <span>{site.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 w-full">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <h1 className="text-xl font-semibold">{title}</h1>
            
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
