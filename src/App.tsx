
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Shared components
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSites from "./pages/admin/Sites";
import AdminUsers from "./pages/admin/Users";
import AdminOrganization from "./pages/admin/Organization";
import AdminSettings from "./pages/admin/Settings";

// Manager routes
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerSiteDetails from "./pages/manager/SiteDetails";
import ManagerTickets from "./pages/manager/Tickets";

// Member routes
import MemberDashboard from "./pages/member/Dashboard";
import MemberCreateTicket from "./pages/member/CreateTicket";
import MemberTicketDetails from "./pages/member/TicketDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/sites" element={<AdminSites />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/organization" element={<AdminOrganization />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Manager routes */}
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/site/:siteId" element={<ManagerSiteDetails />} />
            <Route path="/manager/tickets" element={<ManagerTickets />} />
            
            {/* Member routes */}
            <Route path="/member" element={<MemberDashboard />} />
            <Route path="/member/create-ticket" element={<MemberCreateTicket />} />
            <Route path="/member/ticket/:ticketId" element={<MemberTicketDetails />} />
            
            {/* Default route redirects to login for now */}
            <Route path="/" element={<Login />} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
