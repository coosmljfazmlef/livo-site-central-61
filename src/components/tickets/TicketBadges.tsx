
import React from "react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({
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

export const PriorityBadge = ({
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
