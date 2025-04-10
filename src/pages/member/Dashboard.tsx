
import React from "react";
import { MemberLayout } from "@/components/layouts/MemberLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, PlusCircle, ArrowUpRight } from "lucide-react";

const ticketData = [
  {
    id: "ticket-1",
    title: "Kitchen sink leaking",
    created: "April 8, 2025",
    status: "In Progress",
    statusColor: "bg-amber-500",
    priority: "Medium",
    priorityClass: "bg-medium-light text-medium",
    description: "Water is leaking from the kitchen sink pipe."
  },
  {
    id: "ticket-2",
    title: "Heating not working in bedroom",
    created: "April 5, 2025",
    status: "Open",
    statusColor: "bg-blue-500",
    priority: "High",
    priorityClass: "bg-high-light text-high",
    description: "The heating unit in the bedroom is not functioning properly."
  },
  {
    id: "ticket-3",
    title: "Light fixture replacement",
    created: "March 30, 2025",
    status: "Resolved",
    statusColor: "bg-green-500",
    priority: "Low",
    priorityClass: "bg-low-light text-low",
    description: "Living room light fixture needs to be replaced."
  },
];

const MemberDashboard = () => {
  return (
    <MemberLayout title="My Dashboard">
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Quick Actions</h2>
          <Button asChild>
            <a href="/member/create-ticket">
              <PlusCircle className="mr-2 h-4 w-4" /> Report New Issue
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tickets */}
        <div>
          <h2 className="text-lg font-medium mb-4">Recent Tickets</h2>
          <div className="space-y-4">
            {ticketData.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${ticket.statusColor}`} />
                      <CardTitle>{ticket.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className={ticket.priorityClass}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <CardDescription>{ticket.created}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{ticket.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center text-sm">
                    {ticket.status === "In Progress" && <Clock className="h-4 w-4 mr-1 text-amber-500" />}
                    {ticket.status === "Resolved" && <CheckCircle className="h-4 w-4 mr-1 text-green-500" />}
                    {ticket.status === "Open" && <Clock className="h-4 w-4 mr-1 text-blue-500" />}
                    <span>{ticket.status}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/member/ticket/${ticket.id}`}>
                      <span className="mr-1">View Details</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
