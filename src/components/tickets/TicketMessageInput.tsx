
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, Send } from "lucide-react";

interface TicketMessageInputProps {
  onSendMessage: (message: string) => void;
}

const TicketMessageInput: React.FC<TicketMessageInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
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
  );
};

export default TicketMessageInput;
