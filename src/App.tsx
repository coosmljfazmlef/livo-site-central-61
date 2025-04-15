
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Shared components
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Admin routes
import AdminSites from "./pages/admin/Sites";
import AdminUsers from "./pages/admin/Users";
import AdminOrganization from "./pages/admin/Organization";
import AdminTickets from "./pages/admin/Tickets";

// Manager routes
import ManagerSiteDetails from "./pages/manager/SiteDetails";
import ManagerTickets from "./pages/manager/Tickets";

// Member routes
import MemberDashboard from "./pages/member/Dashboard";
import MemberTickets from "./pages/member/Tickets";
import MemberCreateTicket from "./pages/member/CreateTicket";
import MemberTicketDetails from "./pages/member/TicketDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/tickets" replace />} />
          <Route path="/admin/sites" element={<AdminSites />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/organization" element={<AdminOrganization />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          
          {/* Manager routes */}
          <Route path="/manager" element={<Navigate to="/manager/tickets" replace />} />
          <Route path="/manager/site/:siteId" element={<ManagerSiteDetails />} />
          <Route path="/manager/tickets" element={<ManagerTickets />} />
          
          {/* Member routes */}
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/tickets" element={<MemberTickets />} />
          <Route path="/member/create-ticket" element={<MemberCreateTicket />} />
          <Route path="/member/ticket/:ticketId" element={<MemberTicketDetails />} />
          
          {/* Default route redirects to login for now */}
          <Route path="/" element={<Login />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
