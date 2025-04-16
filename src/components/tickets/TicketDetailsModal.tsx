import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TicketMessageList from "./TicketMessageList";
import TicketMessageInput from "./TicketMessageInput";
import { mockMessages } from "./TicketMessageData";
import { TicketDataType } from "./TicketsData";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, Building, Clock } from "lucide-react";

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
    console.log("Sending message:", message);
  };

  const canEditTicket = userRole === "admin" || userRole === "manager";

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value);
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${value}`,
    });
    console.log("Status changed to:", value);
  };

  const handlePriorityChange = (value: string) => {
    setCurrentPriority(value);
    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${value}`,
    });
    console.log("Priority changed to:", value);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200";
      case "In Progress":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200";
      case "Resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200";
    }
  };

  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                  {ticket.id}
                </Badge>
                
                {canEditTicket ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge variant="outline" className={`${getStatusBadgeStyle(currentStatus)} flex items-center gap-1 cursor-pointer`}>
                        {currentStatus}
                        <ChevronDown size={12} />
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white">
                      <DropdownMenuItem onClick={() => handleStatusChange("Open")} className="cursor-pointer">
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("In Progress")} className="cursor-pointer">
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("Resolved")} className="cursor-pointer">
                        Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("Closed")} className="cursor-pointer">
                        Closed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Badge variant="outline" className={getStatusBadgeStyle(currentStatus)}>
                    {currentStatus}
                  </Badge>
                )}
                
                {canEditTicket ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge className={`${getPriorityBadgeStyle(currentPriority)} flex items-center gap-1 cursor-pointer`}>
                        {currentPriority}
                        <ChevronDown size={12} />
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white">
                      <DropdownMenuItem onClick={() => handlePriorityChange("Low")} className="cursor-pointer">
                        Low
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePriorityChange("Medium")} className="cursor-pointer">
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePriorityChange("High")} className="cursor-pointer">
                        High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePriorityChange("Urgent")} className="cursor-pointer">
                        Urgent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Badge className={getPriorityBadgeStyle(currentPriority)}>
                    {currentPriority}
                  </Badge>
                )}
              </div>
              
              <DialogTitle className="text-xl font-semibold mb-2">{ticket.title}</DialogTitle>
              <div className="flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1">
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{ticket.reporter}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" />
                  <span>{ticket.site}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Created: {ticket.created}</span>
                </div>
              </div>
            </div>
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
