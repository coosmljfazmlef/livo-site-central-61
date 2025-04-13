
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
  AlertTriangle,
  CheckCircle, 
  Clock, 
  AlertCircle 
} from "lucide-react";

// Mock data for the dashboard
const ticketStats = {
  open: 24,
  inProgress: 18,
  resolved: 89,
  total: 131
};

const recentTickets = [
  { id: "T-1024", title: "Water leak in apartment 302", site: "Sunset Apartments", status: "Open", updatedAt: "2h ago" },
  { id: "T-1023", title: "Elevator malfunction", site: "Ocean View Condos", status: "In Progress", updatedAt: "4h ago" },
  { id: "T-1022", title: "Heating system failure", site: "Mountain View Residences", status: "Open", updatedAt: "10h ago" },
  { id: "T-1021", title: "Broken window in lobby", site: "City Center Plaza", status: "Resolved", updatedAt: "1d ago" },
  { id: "T-1020", title: "Lighting issues in parking garage", site: "Riverside Towers", status: "Resolved", updatedAt: "1d ago" },
];

const urgentTickets = [
  { id: "T-1033", title: "Major water leak in basement", site: "Sunset Apartments", priority: "Urgent", status: "Open", createdAt: "3h ago" },
  { id: "T-1031", title: "Fire alarm system failure", site: "City Center Plaza", priority: "Urgent", status: "Open", createdAt: "5h ago" },
  { id: "T-1029", title: "Electrical outage - north wing", site: "Mountain View Residences", priority: "Urgent", status: "In Progress", createdAt: "8h ago" },
  { id: "T-1022", title: "Elevator stuck with passengers", site: "Ocean View Condos", priority: "Urgent", status: "In Progress", createdAt: "10h ago" },
  { id: "T-1018", title: "Gas leak reported - building 3", site: "Riverside Towers", priority: "Urgent", status: "Open", createdAt: "12h ago" },
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

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Overview Section - Only Ticket Status Card */}
        <div>
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

        {/* Urgent Tickets Section - Replacing Sites Health */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              <CardTitle>Urgent Tickets</CardTitle>
            </div>
            <CardDescription className="ml-7">
              Tickets requiring immediate attention
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
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urgentTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="bg-red-50">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        {ticket.title}
                      </div>
                    </TableCell>
                    <TableCell>{ticket.site}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)} mr-2`} />
                        <span>{ticket.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.createdAt}</TableCell>
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
