
import React from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, MoreVertical, Building, Users, Ticket, MapPin } from "lucide-react";

const sitesData = [
  {
    id: "site-1",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90210",
    units: 45,
    manager: "Morgan Manager",
    members: 43,
    openTickets: 12,
  },
  {
    id: "site-2",
    name: "Ocean View Condos",
    address: "456 Ocean Dr, Miami, FL 33139",
    units: 30,
    manager: "Sam Supervisor",
    members: 28,
    openTickets: 8,
  },
  {
    id: "site-3",
    name: "Mountain View Residences",
    address: "789 Alpine Way, Denver, CO 80202",
    units: 60,
    manager: "Mandy Manager",
    members: 55,
    openTickets: 15,
  },
  {
    id: "site-4",
    name: "Parkview Towers",
    address: "101 Park Ave, New York, NY 10001",
    units: 200,
    manager: "Patrick Property",
    members: 187,
    openTickets: 32,
  },
  {
    id: "site-5",
    name: "Riverside Apartments",
    address: "202 River Rd, Chicago, IL 60601",
    units: 75,
    manager: "Robin Residence",
    members: 68,
    openTickets: 9,
  },
];

const AdminSites = () => {
  return (
    <AdminLayout title="Manage Sites">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center bg-background border rounded-md w-72">
            <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sites..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Site
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitesData.map((site) => (
            <Card key={site.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-livo-100 text-livo-800 flex items-center justify-center mr-3">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{site.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {site.address}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Site</DropdownMenuItem>
                      <DropdownMenuItem>Manage Members</DropdownMenuItem>
                      <DropdownMenuItem>View Tickets</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Archive Site
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{site.units}</div>
                    <div className="text-xs text-muted-foreground">Units</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-2xl font-bold">{site.members}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-2xl font-bold">{site.openTickets}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Open Tickets</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="font-medium">Manager:</span> {site.manager}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSites;
