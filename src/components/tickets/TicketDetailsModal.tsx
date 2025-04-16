
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import TicketHeader from "./TicketHeader";
import TicketMessageList from "./TicketMessageList";
import TicketMessageInput from "./TicketMessageInput";
import { mockMessages } from "./TicketMessageData";
import { TicketDataType } from "./TicketsData";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface TicketDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: TicketDataType | null;
  userRole?: UserRole;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ 
  open, 
  onOpenChange, 
  ticket,
  userRole = "member"
}) => {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(ticket?.status || "Open");
  const [currentPriority, setCurrentPriority] = useState(ticket?.priority || "Medium");

  if (!ticket) return null;

  const handleSendMessage = (message: string) => {
    // In a real app, this would send the message to an API
    console.log("Sending message:", message);
  };

  const canEditTicket = userRole === "admin" || userRole === "manager";

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value);
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${value}`,
    });
    // In a real app, this would update the ticket in the database
    console.log("Status changed to:", value);
  };

  const handlePriorityChange = (value: string) => {
    setCurrentPriority(value);
    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${value}`,
    });
    // In a real app, this would update the ticket in the database
    console.log("Priority changed to:", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <TicketHeader
              id={ticket.id}
              title={ticket.title}
              site={ticket.site}
              reporter={ticket.reporter}
              status={currentStatus}
              priority={currentPriority}
              created={ticket.created}
            />
            <Badge variant="outline" className="ml-2">
              Viewing as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>

          {canEditTicket && (
            <div className="flex gap-4 mt-4 border-t pt-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select value={currentPriority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogHeader>
        
        <div className="p-6 border-t border-b flex-grow overflow-hidden">
          <TicketMessageList messages={mockMessages} />
        </div>
        
        <TicketMessageInput onSendMessage={handleSendMessage} />
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
