
import React from "react";
import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";
import { User, Building, Clock } from "lucide-react";
import { StatusBadge, PriorityBadge } from "./TicketBadges";

interface TicketHeaderProps {
  id: string;
  title: string;
  site: string;
  reporter: string;
  status: string;
  priority: string;
  created: string;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({
  id,
  title,
  site,
  reporter,
  status,
  priority,
  created
}) => {
  return (
    <div className="flex justify-between items-start gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
            {id}
          </Badge>
          <StatusBadge status={status} />
          <PriorityBadge priority={priority} />
        </div>
        <DialogTitle className="text-xl font-semibold mb-2">{title}</DialogTitle>
        <div className="flex flex-wrap text-sm text-muted-foreground gap-x-4 gap-y-1">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{reporter}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5" />
            <span>{site}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Created: {created}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
