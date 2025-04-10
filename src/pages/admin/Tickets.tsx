
import React from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreVertical, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

// Extended ticket data for the table with site information
const ticketsData = [
  {
    id: "TKT-001",
    title: "Water leak in apartment 302",
    site: {
      name: "Sunset Apartments",
      id: "site-1"
    },
    reporter: "John Resident",
    status: "Open",
    priority: "Urgent",
    created: "Apr 10, 2025",
    assignee: "Morgan Manager"
  },
  {
    id: "TKT-002",
    title: "Broken window in unit 204",
    site: {
      name: "Ocean View Condos",
      id: "site-2"
    },
    reporter: "Lisa Tenant",
    status: "In Progress",
    priority: "High",
    created: "Apr 9, 2025",
    assignee: "Sam Supervisor"
  },
  {
    id: "TKT-003",
    title: "AC repair in unit 112",
    site: {
      name: "Sunset Apartments",
      id: "site-1"
    },
    reporter: "Michael Owner",
    status: "In Progress",
    priority: "Medium",
    created: "Apr 8, 2025",
    assignee: "Morgan Manager"
  },
  {
    id: "TKT-004",
    title: "Replace light bulbs in hallway",
    site: {
      name: "Ocean View Condos",
      id: "site-2"
    },
    reporter: "Sarah Resident",
    status: "Open",
    priority: "Low",
    created: "Apr 7, 2025",
    assignee: "Sam Supervisor"
  },
  {
    id: "TKT-005",
    title: "Garbage disposal not working",
    site: {
      name: "Sunset Apartments",
      id: "site-1"
    },
    reporter: "David Tenant",
    status: "Resolved",
    priority: "Medium",
    created: "Apr 5, 2025",
    assignee: "Morgan Manager"
  },
  {
    id: "TKT-006",
    title: "Noisy neighbors in unit 505",
    site: {
      name: "Ocean View Condos",
      id: "site-2"
    },
    reporter: "Emily Resident",
    status: "Open",
    priority: "Medium",
    created: "Apr 4, 2025",
    assignee: null
  },
  {
    id: "TKT-007",
    title: "Elevator maintenance needed",
    site: {
      name: "Mountain View Residences",
      id: "site-3"
    },
    reporter: "James Resident",
    status: "Open",
    priority: "High",
    created: "Apr 3, 2025",
    assignee: "Mandy Manager"
  },
  {
    id: "TKT-008",
    title: "Request to install ceiling fan",
    site: {
      name: "Parkview Towers",
      id: "site-4"
    },
    reporter: "Olivia Owner",
    status: "In Progress",
    priority: "Low",
    created: "Apr 2, 2025",
    assignee: "Patrick Property"
  },
  {
    id: "TKT-009",
    title: "Pest control needed in unit 402",
    site: {
      name: "Riverside Apartments",
      id: "site-5"
    },
    reporter: "Robert Resident",
    status: "Open",
    priority: "High",
    created: "Apr 1, 2025",
    assignee: "Robin Residence"
  },
];

// Function to render priority badge
const PriorityBadge = ({ priority }: { priority: string }) => {
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

// Function to render status badge
const StatusBadge = ({ status }: { status: string }) => {
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
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [siteFilter, setSiteFilter] = React.useState("all");

  const handleAssign = (ticketId: string) => {
    toast({
      title: "Ticket Assigned",
      description: `Ticket ${ticketId} has been assigned successfully.`,
    });
  };

  // Filter tickets based on search and filters
  const filteredTickets = ticketsData.filter((ticket) => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || 
      ticket.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Priority filter
    const matchesPriority = priorityFilter === "all" || 
      ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    // Site filter
    const matchesSite = siteFilter === "all" || 
      ticket.site.id === siteFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesSite;
  });

  return (
    <AdminLayout title="All Tickets">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Ticket Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-background border rounded-md w-full md:w-64">
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                  <SelectItem value="site-1">Sunset Apartments</SelectItem>
                  <SelectItem value="site-2">Ocean View Condos</SelectItem>
                  <SelectItem value="site-3">Mountain View Residences</SelectItem>
                  <SelectItem value="site-4">Parkview Towers</SelectItem>
                  <SelectItem value="site-5">Riverside Apartments</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Site</span>
                  </div>
                </TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No tickets found that match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.title}</TableCell>
                    <TableCell>{ticket.site.name}</TableCell>
                    <TableCell>{ticket.reporter}</TableCell>
                    <TableCell>{ticket.assignee || "Unassigned"}</TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssign(ticket.id)}>Assign Ticket</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Close Ticket</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
