
import React from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Ticket, 
  Building, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for the dashboard
const ticketStats = {
  open: 24,
  inProgress: 18,
  resolved: 89,
  total: 131
};

const sitesCount = 12;

const usersByRole = [
  { role: "Admin", count: 5 },
  { role: "Manager", count: 18 },
  { role: "Member", count: 464 },
];

const recentTickets = [
  { id: "T-1024", title: "Water leak in apartment 302", site: "Sunset Apartments", status: "Open", updatedAt: "2h ago" },
  { id: "T-1023", title: "Elevator malfunction", site: "Ocean View Condos", status: "In Progress", updatedAt: "4h ago" },
  { id: "T-1022", title: "Heating system failure", site: "Mountain View Residences", status: "Open", updatedAt: "10h ago" },
  { id: "T-1021", title: "Broken window in lobby", site: "City Center Plaza", status: "Resolved", updatedAt: "1d ago" },
  { id: "T-1020", title: "Lighting issues in parking garage", site: "Riverside Towers", status: "Resolved", updatedAt: "1d ago" },
];

const sitesHealth = [
  { name: "Sunset Apartments", ticketVolume: 32, resolutionRate: 78 },
  { name: "Ocean View Condos", ticketVolume: 28, resolutionRate: 85 },
  { name: "Mountain View Residences", ticketVolume: 23, resolutionRate: 91 },
  { name: "City Center Plaza", ticketVolume: 18, resolutionRate: 72 },
  { name: "Riverside Towers", ticketVolume: 30, resolutionRate: 80 },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-red-500";
    case "in progress":
      return "bg-amber-500";
    case "resolved":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return <AlertCircle className="h-4 w-4" />;
    case "in progress":
      return <Clock className="h-4 w-4" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

const chartConfig = {
  volume: {
    label: "Ticket Volume",
    theme: { light: "#93c5fd", dark: "#3b82f6" },
  },
  resolution: {
    label: "Resolution Rate (%)",
    theme: { light: "#86efac", dark: "#22c55e" },
  },
};

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Overview Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Tickets Stats Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ticket Status</CardTitle>
              <div className="bg-blue-500 p-2 rounded-md">
                <Ticket className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">{ticketStats.open}</div>
                  <p className="text-xs text-muted-foreground">Open</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-500">{ticketStats.inProgress}</div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">{ticketStats.resolved}</div>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </div>
              <div className="mt-4 border-t pt-3 text-center">
                <p className="text-sm font-medium">Total: {ticketStats.total} tickets</p>
              </div>
            </CardContent>
          </Card>

          {/* Sites Managed Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sites Managed</CardTitle>
              <div className="bg-green-500 p-2 rounded-md">
                <Building className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sitesCount}</div>
              <p className="text-sm text-muted-foreground">Properties under management</p>
            </CardContent>
          </Card>

          {/* Users by Role Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Users by Role</CardTitle>
              <div className="bg-amber-500 p-2 rounded-md">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usersByRole.map((roleData, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-xs font-medium">{roleData.role}</div>
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{
                            width: `${Math.min(100, (roleData.count / 500) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{roleData.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-3 text-center">
                <p className="text-sm font-medium">Total: {usersByRole.reduce((sum, role) => sum + role.count, 0)} users</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Most recent tickets created or updated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.site}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)} mr-2`} />
                        <span>{ticket.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sites Health Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sites Health</CardTitle>
            <CardDescription>
              Ticket volume and resolution rate by site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 w-full">
              <ChartContainer 
                config={chartConfig}
                className="h-80"
              >
                <BarChart data={sitesHealth} margin={{ top: 10, right: 30, left: 0, bottom: 70 }}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                    tickMargin={25}
                  />
                  <YAxis yAxisId="left" orientation="left" stroke="#a3a3a3" />
                  <YAxis yAxisId="right" orientation="right" stroke="#a3a3a3" />
                  <ChartTooltip 
                    content={(props) => <ChartTooltipContent {...props} />} 
                  />
                  <Bar 
                    dataKey="ticketVolume" 
                    name="Ticket Volume" 
                    fill="var(--color-volume)"
                    yAxisId="left" 
                  />
                  <Bar 
                    dataKey="resolutionRate" 
                    name="Resolution Rate (%)" 
                    fill="var(--color-resolution)"
                    yAxisId="right"
                  />
                </BarChart>
              </ChartContainer>
            </div>
            
            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Site Name</TableHead>
                  <TableHead>Ticket Volume</TableHead>
                  <TableHead>Resolution Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sitesHealth.map((site) => (
                  <TableRow key={site.name}>
                    <TableCell className="font-medium">{site.name}</TableCell>
                    <TableCell>{site.ticketVolume} tickets</TableCell>
                    <TableCell>{site.resolutionRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
