import React from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, Ticket, ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ManagerDashboard = () => {
  const {
    user
  } = useAuth();
  const ticketStats = [{
    title: "New Tickets",
    value: "17",
    icon: Ticket,
    change: "+3 from last week",
    color: "bg-blue-500"
  }, {
    title: "In Progress",
    value: "8",
    icon: Clock,
    change: "-2 from last week",
    color: "bg-amber-500"
  }, {
    title: "Resolved",
    value: "24",
    icon: CheckCircle,
    change: "+5 from last week",
    color: "bg-green-500"
  }, {
    title: "Urgent",
    value: "3",
    icon: AlertTriangle,
    change: "+1 from last week",
    color: "bg-red-500"
  }];
  return <ManagerLayout title="Manager Dashboard">
      <div className="space-y-8">
        {/* Sites Overview */}
        

        {/* Ticket Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ticketStats.map((stat, index) => <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>)}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your sites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tickets">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="tickets">New Tickets</TabsTrigger>
                <TabsTrigger value="resolved">Recently Resolved</TabsTrigger>
                <TabsTrigger value="comments">New Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="tickets" className="space-y-4">
                {[1, 2, 3].map(ticket => <div key={ticket} className="flex items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                    <div className="flex-1">
                      <h3 className="font-medium">Broken window in unit 204</h3>
                      <p className="text-sm text-muted-foreground">Sunset Apartments • 3 hours ago</p>
                    </div>
                    <div className="text-xs font-medium bg-high-light text-high px-2 py-1 rounded">High</div>
                  </div>)}
              </TabsContent>
              <TabsContent value="resolved" className="space-y-4">
                {[1, 2, 3].map(ticket => <div key={ticket} className="flex items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    <div className="flex-1">
                      <h3 className="font-medium">AC repair in unit 112</h3>
                      <p className="text-sm text-muted-foreground">Ocean View Condos • 1 day ago</p>
                    </div>
                    <div className="text-xs font-medium bg-low-light text-low px-2 py-1 rounded">Resolved</div>
                  </div>)}
              </TabsContent>
              <TabsContent value="comments" className="space-y-4">
                {[1, 2, 3].map(comment => <div key={comment} className="flex items-start p-2 rounded-md hover:bg-muted/50">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=User+${comment}&background=0D8ABC&color=fff`} />
                      <AvatarFallback>U{comment}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-sm">Jane Resident</h3>
                        <span className="text-xs text-muted-foreground ml-2">2 hours ago</span>
                      </div>
                      <p className="text-sm mt-1">Thank you for the quick response to my maintenance request!</p>
                      <p className="text-xs text-muted-foreground mt-1">On ticket: Leaky faucet in unit 301</p>
                    </div>
                  </div>)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>;
};
export default ManagerDashboard;