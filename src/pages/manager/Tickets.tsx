
import React from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
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
import { Search, Filter, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Ticket data for the table
const ticketsData = [
  {
    id: "TKT-001",
    title: "Water leak in apartment 302",
    site: "Sunset Apartments",
    reporter: "John Resident",
    status: "Open",
    priority: "Urgent",
    created: "Apr 10, 2025",
  },
  {
    id: "TKT-002",
    title: "Broken window in unit 204",
    site: "Ocean View Condos",
    reporter: "Lisa Tenant",
    status: "In Progress",
    priority: "High",
    created: "Apr 9, 2025",
  },
  {
    id: "TKT-003",
    title: "AC repair in unit 112",
    site: "Sunset Apartments",
    reporter: "Michael Owner",
    status: "In Progress",
    priority: "Medium",
    created: "Apr 8, 2025",
  },
  {
    id: "TKT-004",
    title: "Replace light bulbs in hallway",
    site: "Ocean View Condos",
    reporter: "Sarah Resident",
    status: "Open",
    priority: "Low",
    created: "Apr 7, 2025",
  },
  {
    id: "TKT-005",
    title: "Garbage disposal not working",
    site: "Sunset Apartments",
    reporter: "David Tenant",
    status: "Resolved",
    priority: "Medium",
    created: "Apr 5, 2025",
  },
  {
    id: "TKT-006",
    title: "Noisy neighbors in unit 505",
    site: "Ocean View Condos",
    reporter: "Emily Resident",
    status: "Open",
    priority: "Medium",
    created: "Apr 4, 2025",
  },
];

// Function to render priority badge
const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "Urgent":
      return <Badge className="ticket-priority-urgent">Urgent</Badge>;
    case "High":
      return <Badge className="ticket-priority-high">High</Badge>;
    case "Medium":
      return <Badge className="ticket-priority-medium">Medium</Badge>;
    case "Low":
      return <Badge className="ticket-priority-low">Low</Badge>;
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

const ManagerTickets = () => {
  return (
    <ManagerLayout title="Manage Tickets">
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
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select>
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
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  <SelectItem value="sunset">Sunset Apartments</SelectItem>
                  <SelectItem value="ocean">Ocean View Condos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketsData.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.site}</TableCell>
                  <TableCell>{ticket.reporter}</TableCell>
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
                        <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Close Ticket</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ManagerTickets;
