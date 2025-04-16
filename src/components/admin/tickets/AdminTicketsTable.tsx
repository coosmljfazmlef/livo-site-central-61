
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, PriorityBadge } from "@/components/tickets/TicketBadges";

export interface AdminTicketItem {
  id: string;
  title: string;
  site: string;
  status: string;
  priority: string;
  created: string;
  reporter: string;
}

interface AdminTicketsTableProps {
  tickets: AdminTicketItem[];
  onTicketClick: (ticket: AdminTicketItem) => void;
}

const AdminTicketsTable: React.FC<AdminTicketsTableProps> = ({ tickets, onTicketClick }) => {
  return (
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
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No tickets found that match your filters.
              </TableCell>
            </TableRow>
          ) : (
            tickets.map(ticket => (
              <TableRow 
                key={ticket.id} 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => onTicketClick(ticket)}
              >
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTicketsTable;
