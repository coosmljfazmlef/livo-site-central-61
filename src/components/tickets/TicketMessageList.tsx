
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TicketMessage, { TicketMessageProps } from "./TicketMessage";

interface TicketMessageListProps {
  messages: TicketMessageProps[];
}

const TicketMessageList: React.FC<TicketMessageListProps> = ({ messages }) => {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <TicketMessage key={message.id} {...message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TicketMessageList;
