
import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import TicketDetailsModal from "@/components/tickets/TicketDetailsModal";
import { useAuth } from "@/contexts/AuthContext";
import AdminTicketFilters from "@/components/admin/tickets/AdminTicketFilters";
import AdminTicketsTable, { AdminTicketItem } from "@/components/admin/tickets/AdminTicketsTable";
import { adminTicketsData } from "@/components/admin/tickets/AdminTicketsData";

const AdminTickets = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<null | AdminTicketItem>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (ticket: AdminTicketItem) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const filteredTickets = adminTicketsData.filter(ticket => {
    const matchesSearch = searchTerm === "" || 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || 
      ticket.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesPriority = priorityFilter === "all" || 
      ticket.priority.toLowerCase() === priorityFilter.toLowerCase();

    const matchesSite = siteFilter === "all" || 
      ticket.site.toLowerCase().includes(siteFilter.toLowerCase());
      
    return matchesSearch && matchesStatus && matchesPriority && matchesSite;
  });

  return (
    <AdminLayout title="All Tickets">
      <div className="space-y-6">
        <AdminTicketFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          siteFilter={siteFilter}
          setSiteFilter={setSiteFilter}
        />

        <AdminTicketsTable
          tickets={filteredTickets}
          onTicketClick={handleViewDetails}
        />

        {selectedTicket && (
          <TicketDetailsModal 
            open={modalOpen} 
            onOpenChange={setModalOpen} 
            ticket={selectedTicket} 
            userRole={user?.role || "admin"} 
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
