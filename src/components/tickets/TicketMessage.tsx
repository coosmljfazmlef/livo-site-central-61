import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export interface TicketMessageProps {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isManager: boolean;
}
const TicketMessage: React.FC<TicketMessageProps> = ({
  sender,
  senderAvatar,
  content,
  timestamp,
  isManager
}) => {
  return <div className={`flex ${isManager ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${isManager ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} alt={sender} />
          <AvatarFallback>{sender[0]}</AvatarFallback>
        </Avatar>
        <div className={`rounded-lg px-4 py-2 ${isManager ? 'bg-primary/10 text-primary-foreground/90' : 'bg-muted text-muted-foreground'}`}>
          <div className="flex justify-between items-center gap-4">
            <span className="font-medium text-sm">{sender}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="mt-1 text-slate-700">{content}</p>
        </div>
      </div>
    </div>;
};
export default TicketMessage;