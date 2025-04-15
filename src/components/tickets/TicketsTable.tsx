
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge, PriorityBadge } from "./TicketBadges";

interface Ticket {
  id: string;
  title: string;
  site: string;
  reporter: string;
  status: string;
  priority: string;
  created: string;
}

interface TicketsTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onTicketClick }) => {
  return (
    <div className="rounded-md border bg-white">
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
          {tickets.map(ticket => (
            <TableRow 
              key={ticket.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onTicketClick(ticket)}
            >
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
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onTicketClick(ticket)}>View Details</DropdownMenuItem>
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
  );
};

export default TicketsTable;
