import React, { useState } from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Download, Plus } from "lucide-react";
import TicketDetailsModal from "@/components/tickets/TicketDetailsModal";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketsTable from "@/components/tickets/TicketsTable";
import { ticketsData, TicketDataType } from "@/components/tickets/TicketsData";
const ManagerTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<null | TicketDataType>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleTicketClick = (ticket: TicketDataType) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };
  return <ManagerLayout title="Manage Tickets">
      <div className="space-y-6">
        {/* Header with action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">All Tickets</h1>
          <div className="flex items-center gap-2">
            
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-1" />
              Create Ticket
            </Button>
          </div>
        </div>

        {/* Filters card */}
        <TicketFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} statusFilter={statusFilter} setStatusFilter={setStatusFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} siteFilter={siteFilter} setSiteFilter={setSiteFilter} />

        {/* Tickets table */}
        <TicketsTable tickets={ticketsData} onTicketClick={handleTicketClick} />

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        {/* Ticket Details Modal */}
        <TicketDetailsModal open={modalOpen} onOpenChange={setModalOpen} ticket={selectedTicket} />
      </div>
    </ManagerLayout>;
};
export default ManagerTickets;