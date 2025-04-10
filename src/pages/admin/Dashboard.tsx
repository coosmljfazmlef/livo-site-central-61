
import React from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Users, Ticket, AlertCircle } from "lucide-react";

const statsData = [
  {
    title: "Total Sites",
    value: "12",
    icon: Building,
    description: "+2 in the last month",
    color: "bg-blue-500",
  },
  {
    title: "Active Users",
    value: "487",
    icon: Users,
    description: "+24 in the last month",
    color: "bg-green-500",
  },
  {
    title: "Open Tickets",
    value: "35",
    icon: Ticket,
    description: "12 high priority",
    color: "bg-amber-500",
  },
  {
    title: "Critical Issues",
    value: "3",
    icon: AlertCircle,
    description: "Requires immediate attention",
    color: "bg-red-500",
  },
];

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sites</CardTitle>
              <CardDescription>
                Sites added in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center mr-4">
                    <Building className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Parkview Residences</h3>
                    <p className="text-sm text-muted-foreground">Added Apr 2, 2025</p>
                  </div>
                  <div className="text-sm text-muted-foreground">24 units</div>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center mr-4">
                    <Building className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Horizon Towers</h3>
                    <p className="text-sm text-muted-foreground">Added Mar 28, 2025</p>
                  </div>
                  <div className="text-sm text-muted-foreground">42 units</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Urgent Tickets</CardTitle>
              <CardDescription>
                Open tickets requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <div className="h-3 w-3 rounded-full bg-urgent mr-2" />
                  <div className="flex-1">
                    <h3 className="font-medium">Water leak in apartment 302</h3>
                    <p className="text-sm text-muted-foreground">Sunset Apartments • 2 hours ago</p>
                  </div>
                  <div className="text-xs font-medium bg-urgent-light text-urgent px-2 py-1 rounded">Urgent</div>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <div className="h-3 w-3 rounded-full bg-urgent mr-2" />
                  <div className="flex-1">
                    <h3 className="font-medium">Elevator malfunction</h3>
                    <p className="text-sm text-muted-foreground">Ocean View Condos • 4 hours ago</p>
                  </div>
                  <div className="text-xs font-medium bg-urgent-light text-urgent px-2 py-1 rounded">Urgent</div>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <div className="h-3 w-3 rounded-full bg-urgent mr-2" />
                  <div className="flex-1">
                    <h3 className="font-medium">Heating system failure</h3>
                    <p className="text-sm text-muted-foreground">Mountain View Residences • 10 hours ago</p>
                  </div>
                  <div className="text-xs font-medium bg-urgent-light text-urgent px-2 py-1 rounded">Urgent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
