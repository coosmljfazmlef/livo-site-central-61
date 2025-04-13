
import React, { useState } from "react";
import { MemberLayout } from "@/components/layouts/MemberLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Clock, CheckCircle, PlusCircle, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Mock ticket data
const ticketsData = [
  {
    id: "ticket-1",
    title: "Kitchen sink leaking",
    created: "April 8, 2025",
    status: "In Progress",
    statusColor: "bg-amber-500",
    priority: "Medium",
    priorityClass: "bg-medium-light text-medium",
    location: "Kitchen",
    category: "Plumbing",
  },
  {
    id: "ticket-2",
    title: "Heating not working in bedroom",
    created: "April 5, 2025",
    status: "Open",
    statusColor: "bg-blue-500",
    priority: "High",
    priorityClass: "bg-high-light text-high",
    location: "Bedroom",
    category: "HVAC",
  },
  {
    id: "ticket-3",
    title: "Light fixture replacement",
    created: "March 30, 2025",
    status: "Resolved",
    statusColor: "bg-green-500",
    priority: "Low",
    priorityClass: "bg-low-light text-low",
    location: "Living Room",
    category: "Electrical",
  },
  {
    id: "ticket-4",
    title: "Door lock not working",
    created: "March 25, 2025",
    status: "Open",
    statusColor: "bg-blue-500",
    priority: "High",
    priorityClass: "bg-high-light text-high",
    location: "Front Door",
    category: "Security",
  },
  {
    id: "ticket-5",
    title: "Bathroom fan needs replacement",
    created: "March 20, 2025",
    status: "Resolved",
    statusColor: "bg-green-500",
    priority: "Medium",
    priorityClass: "bg-medium-light text-medium",
    location: "Bathroom",
    category: "Electrical",
  },
];

const MemberTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  
  // Filter tickets based on search query and filters
  const filteredTickets = ticketsData.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <MemberLayout title="My Tickets">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tickets..." 
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button asChild variant="default">
              <Link to="/member/create-ticket">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Ticket
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium mr-2">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
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
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket History</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTickets.length > 0 ? (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{ticket.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{ticket.location}</TableCell>
                          <TableCell className="hidden sm:table-cell">{ticket.created}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full ${ticket.statusColor} mr-2`} />
                              <span className="whitespace-nowrap">{ticket.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={ticket.priorityClass}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="ghost" size="sm">
                              <Link to={`/member/ticket/${ticket.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4">
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
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            ) : (
              <div className="py-24 text-center">
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-6">There are no tickets matching your filters.</p>
                <Button asChild>
                  <Link to="/member/create-ticket">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Ticket
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default MemberTickets;
