
import React from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, Ticket, ArrowUpRight, UserPlus, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  // Sample timeline data - in a real app, this would come from an API
  const timelineItems = [
    {
      id: 1,
      type: "new-ticket",
      title: "New Ticket: Broken window in unit 204",
      description: "Sunset Apartments • High Priority",
      time: "3 hours ago",
      icon: Ticket,
      iconColor: "bg-blue-500"
    },
    {
      id: 2,
      type: "new-member",
      title: "New Member: Sarah Johnson joined",
      description: "Ocean View Condos • Resident",
      time: "5 hours ago",
      icon: UserPlus,
      iconColor: "bg-green-500"
    },
    {
      id: 3,
      type: "priority-change",
      title: "Priority Raised: AC repair in unit 112",
      description: "Sunset Apartments • Now High Priority",
      time: "Yesterday",
      icon: AlertTriangle,
      iconColor: "bg-amber-500"
    },
    {
      id: 4,
      type: "new-ticket",
      title: "New Ticket: Leaky faucet in unit 301",
      description: "Ocean View Condos • Medium Priority",
      time: "Yesterday",
      icon: Ticket,
      iconColor: "bg-blue-500"
    },
    {
      id: 5,
      type: "new-member",
      title: "New Member: Robert Davis joined",
      description: "Sunset Apartments • Maintenance Staff",
      time: "2 days ago",
      icon: UserPlus,
      iconColor: "bg-green-500"
    },
    {
      id: 6,
      type: "resolved-ticket",
      title: "Ticket Resolved: Noisy neighbors in unit 505",
      description: "Ocean View Condos • Closed by admin",
      time: "2 days ago",
      icon: CheckCircle,
      iconColor: "bg-green-500"
    },
    {
      id: 7,
      type: "priority-change",
      title: "Priority Raised: Garbage disposal not working",
      description: "Sunset Apartments • Now Urgent",
      time: "3 days ago",
      icon: AlertTriangle,
      iconColor: "bg-red-500"
    }
  ];

  const TimelineItem = ({ item }) => {
    return (
      <div className="flex mb-6 last:mb-0">
        <div className="mr-4 flex flex-col items-center">
          <div className={`${item.iconColor} p-2 rounded-full`}>
            <item.icon className="h-5 w-5 text-white" />
          </div>
          <div className="w-px grow bg-border mt-2"></div>
        </div>
        <div className="flex-1 pb-2">
          <h3 className="text-base font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
        </div>
      </div>
    );
  };

  return (
    <ManagerLayout title="Manager Dashboard">
      <div className="space-y-8">
        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Timeline of important events across your properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timelineItems.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
