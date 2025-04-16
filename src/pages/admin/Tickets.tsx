import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import TicketDetailsModal from "@/components/tickets/TicketDetailsModal";
import { useAuth } from "@/contexts/AuthContext";

const ticketsData = [{
  id: "TKT-001",
  title: "Water leak in apartment 302",
  site: "Sunset Apartments",
  status: "Open",
  priority: "Urgent",
  created: "Apr 10, 2025"
}, {
  id: "TKT-002",
  title: "Broken window in unit 204",
  site: "Ocean View Condos",
  status: "In Progress",
  priority: "High",
  created: "Apr 9, 2025"
}, {
  id: "TKT-003",
  title: "AC repair in unit 112",
  site: "Sunset Apartments",
  status: "In Progress",
  priority: "Medium",
  created: "Apr 8, 2025"
}, {
  id: "TKT-004",
  title: "Replace light bulbs in hallway",
  site: "Ocean View Condos",
  status: "Open",
  priority: "Low",
  created: "Apr 7, 2025"
}, {
  id: "TKT-005",
  title: "Garbage disposal not working",
  site: "Sunset Apartments",
  status: "Resolved",
  priority: "Medium",
  created: "Apr 5, 2025"
}, {
  id: "TKT-006",
  title: "Noisy neighbors in unit 505",
  site: "Ocean View Condos",
  status: "Open",
  priority: "Medium",
  created: "Apr 4, 2025"
}, {
  id: "TKT-007",
  title: "Elevator maintenance needed",
  site: "Mountain View Residences",
  status: "Open",
  priority: "High",
  created: "Apr 3, 2025"
}, {
  id: "TKT-008",
  title: "Request to install ceiling fan",
  site: "Parkview Towers",
  status: "In Progress",
  priority: "Low",
  created: "Apr 2, 2025"
}, {
  id: "TKT-009",
  title: "Pest control needed in unit 402",
  site: "Riverside Apartments",
  status: "Open",
  priority: "High",
  created: "Apr 1, 2025"
}];

const PriorityBadge = ({
  priority
}: {
  priority: string;
}) => {
  switch (priority) {
    case "Urgent":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Urgent</Badge>;
    case "High":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">High</Badge>;
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Medium</Badge>;
    case "Low":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

const StatusBadge = ({
  status
}: {
  status: string;
}) => {
  switch (status) {
    case "Open":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Open</Badge>;
    case "In Progress":
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">In Progress</Badge>;
    case "Resolved":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Resolved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const AdminTickets = () => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<null | any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket({
      ...ticket,
      reporter: "Alex Admin" // Mocking reporter name for demo purposes
    });
    setModalOpen(true);
  };

  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = searchTerm === "" || ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesPriority = priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter.toLowerCase();

    const matchesSite = siteFilter === "all" || ticket.site.toLowerCase().includes(siteFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPriority && matchesSite;
  });

  return <AdminLayout title="All Tickets">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Ticket Filters</CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-background border rounded-md w-full md:w-64">
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={siteFilter} onValueChange={setSiteFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  <SelectItem value="sunset">Sunset Apartments</SelectItem>
                  <SelectItem value="ocean">Ocean View Condos</SelectItem>
                  <SelectItem value="mountain">Mountain View Residences</SelectItem>
                  <SelectItem value="park">Parkview Towers</SelectItem>
                  <SelectItem value="riverside">Riverside Apartments</SelectItem>
                </SelectContent>
              </Select>
              
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No tickets found that match your filters.
                  </TableCell>
                </TableRow> : filteredTickets.map(ticket => <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(ticket)}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.title}</TableCell>
                    <TableCell>{ticket.site}</TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    
                  </TableRow>)}
            </TableBody>
          </Table>
        </div>

        {selectedTicket && <TicketDetailsModal open={modalOpen} onOpenChange={setModalOpen} ticket={selectedTicket} userRole={user?.role || "admin"} />}
      </div>
    </AdminLayout>;
};

export default AdminTickets;
