
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import TicketHeader from "./TicketHeader";
import TicketMessageList from "./TicketMessageList";
import TicketMessageInput from "./TicketMessageInput";
import { mockMessages } from "./TicketMessageData";
import { TicketDataType } from "./TicketsData";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";

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
  if (!ticket) return null;

  const handleSendMessage = (message: string) => {
    // In a real app, this would send the message to an API
    console.log("Sending message:", message);
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
              status={ticket.status}
              priority={ticket.priority}
              created={ticket.created}
            />
            <Badge variant="outline" className="ml-2">
              Viewing as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
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
