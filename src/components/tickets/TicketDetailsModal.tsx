
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Clock, User, Building, Send, PaperclipIcon } from "lucide-react";

interface TicketMessage {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isManager: boolean;
}

// Mock data for ticket details
const mockMessages: TicketMessage[] = [
  {
    id: "msg1",
    sender: "John Resident",
    senderAvatar: "https://ui-avatars.com/api/?name=John+Resident&background=0D8ABC&color=fff",
    content: "There's a water leak in my bathroom that's causing damage to the floor.",
    timestamp: "Apr 10, 2025 10:23 AM",
    isManager: false
  },
  {
    id: "msg2",
    sender: "Sarah Manager",
    senderAvatar: "https://ui-avatars.com/api/?name=Sarah+Manager&background=22C55E&color=fff",
    content: "I'll send a maintenance person to check it out. Can you provide more details about the leak?",
    timestamp: "Apr 10, 2025 11:05 AM",
    isManager: true
  },
  {
    id: "msg3",
    sender: "John Resident",
    senderAvatar: "https://ui-avatars.com/api/?name=John+Resident&background=0D8ABC&color=fff",
    content: "It's coming from under the sink. The cabinet underneath is getting water damage as well.",
    timestamp: "Apr 10, 2025 11:12 AM",
    isManager: false
  },
  {
    id: "msg4",
    sender: "Sarah Manager",
    senderAvatar: "https://ui-avatars.com/api/?name=Sarah+Manager&background=22C55E&color=fff",
    content: "Thanks for the information. Our plumber will visit today between 2-4 PM. Will you be available?",
    timestamp: "Apr 10, 2025 11:20 AM",
    isManager: true
  }
];

interface TicketDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: {
    id: string;
    title: string;
    site: string;
    reporter: string;
    status: string;
    priority: string;
    created: string;
  } | null;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ 
  open, 
  onOpenChange, 
  ticket 
}) => {
  const [newMessage, setNewMessage] = useState("");

  if (!ticket) return null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                  {ticket.id}
                </Badge>
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
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
          </div>
        </DialogHeader>
        
        <div className="p-6 border-t border-b flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isManager ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.isManager ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.senderAvatar} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.isManager 
                        ? 'bg-primary/10 text-primary-foreground/90' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="mt-1">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="p-4 flex items-center gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Input 
            placeholder="Type your message..." 
            className="flex-grow" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSendMessage} className="shrink-0" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Reusing the same components from Tickets.tsx
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

export default TicketDetailsModal;
