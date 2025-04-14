import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, MoreHorizontal, Building, Users, Ticket, MapPin, Check, Filter, Grid, List, ArrowUpDown, ArrowUp, ArrowDown, CalendarDays, FileText, Star, StarOff } from "lucide-react";
const sitesData = [{
  id: "site-1",
  name: "Sunset Apartments",
  address: "123 Sunset Blvd, Los Angeles, CA 90210",
  units: 45,
  manager: "Morgan Manager",
  members: 43,
  openTickets: 12,
  area: "10,500 sq ft",
  status: "active",
  featured: true,
  lastUpdated: "2023-05-15T14:30:00"
}, {
  id: "site-2",
  name: "Ocean View Condos",
  address: "456 Ocean Dr, Miami, FL 33139",
  units: 30,
  manager: "Sam Supervisor",
  members: 28,
  openTickets: 8,
  area: "8,200 sq ft",
  status: "active",
  featured: false,
  lastUpdated: "2023-06-22T09:15:00"
}, {
  id: "site-3",
  name: "Mountain View Residences",
  address: "789 Alpine Way, Denver, CO 80202",
  units: 60,
  manager: "Mandy Manager",
  members: 55,
  openTickets: 15,
  area: "15,300 sq ft",
  status: "maintenance",
  featured: false,
  lastUpdated: "2023-07-03T16:45:00"
}, {
  id: "site-4",
  name: "Parkview Towers",
  address: "101 Park Ave, New York, NY 10001",
  units: 200,
  manager: "Patrick Property",
  members: 187,
  openTickets: 32,
  area: "45,000 sq ft",
  status: "active",
  featured: true,
  lastUpdated: "2023-04-18T11:20:00"
}, {
  id: "site-5",
  name: "Riverside Apartments",
  address: "202 River Rd, Chicago, IL 60601",
  units: 75,
  manager: "Robin Residence",
  members: 68,
  openTickets: 9,
  area: "18,750 sq ft",
  status: "inactive",
  featured: false,
  lastUpdated: "2023-03-10T08:05:00"
}, {
  id: "site-6",
  name: "Highland Gardens",
  address: "303 Highland Ave, Seattle, WA 98101",
  units: 55,
  manager: "Harper Housing",
  members: 49,
  openTickets: 5,
  area: "12,100 sq ft",
  status: "active",
  featured: false,
  lastUpdated: "2023-07-25T15:10:00"
}];
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "inactive":
      return <Badge variant="outline" className="text-slate-500">Inactive</Badge>;
    case "maintenance":
      return <Badge className="bg-amber-500">Maintenance</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
const AdminSites = () => {
  const [view, setView] = useState<"list" | "grid">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter sites based on search term
  const filteredSites = sitesData.filter(site => site.name.toLowerCase().includes(searchTerm.toLowerCase()) || site.address.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sort sites based on sort field and direction
  const sortedSites = [...filteredSites].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    } else {
      const numA = fieldA as number;
      const numB = fieldB as number;
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    }
  });

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };
  const getSiteMetricsClass = (count: number) => {
    if (count > 20) return "text-red-500";
    if (count > 10) return "text-amber-500";
    return "text-green-500";
  };
  return <AdminLayout title="Manage Sites">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sitesData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {sitesData.filter(s => s.status === "active").length}
              </div>
            </CardContent>
          </Card>
          
          
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {sitesData.reduce((sum, site) => sum + site.openTickets, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search sites..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            
            <Tabs value={view} onValueChange={v => setView(v as "list" | "grid")} className="hidden md:flex">
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <Grid className="h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1">
                  <List className="h-4 w-4" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Button className="whitespace-nowrap">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Site
          </Button>
        </div>

        {/* Content */}
        <div>
          {view === "grid" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSites.map(site => <Card key={site.id} className="overflow-hidden transition-shadow hover:shadow-md">
                  <div className={`h-1.5 w-full ${site.status === 'active' ? 'bg-green-500' : site.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-md bg-livo-100 text-livo-800 flex items-center justify-center">
                          <Building className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{site.name}</CardTitle>
                            {site.featured && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                          </div>
                          
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Edit Site
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Manage Members
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            View Tickets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {site.featured ? <DropdownMenuItem className="flex items-center gap-2">
                              <StarOff className="h-4 w-4" />
                              Remove Featured
                            </DropdownMenuItem> : <DropdownMenuItem className="flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Mark as Featured
                            </DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive flex items-center gap-2">
                            {site.status === "inactive" ? <>
                                <Check className="h-4 w-4" />
                                Activate Site
                              </> : <>
                                <Check className="h-4 w-4 opacity-70" />
                                Deactivate Site
                              </>}
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
                          <span className={`text-2xl font-bold ${getSiteMetricsClass(site.openTickets)}`}>
                            {site.openTickets}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Open Tickets</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Manager:</span> {site.manager}
                      </div>
                      
                    </div>
                  </CardContent>
                </Card>)}
            </div> : <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                      <div className="flex items-center">
                        Site Name {renderSortIcon("name")}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("address")}>
                      <div className="flex items-center">
                        Location {renderSortIcon("address")}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("units")}>
                      <div className="flex items-center justify-center">
                        Units {renderSortIcon("units")}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("members")}>
                      <div className="flex items-center justify-center">
                        Members {renderSortIcon("members")}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("openTickets")}>
                      <div className="flex items-center justify-center">
                        Tickets {renderSortIcon("openTickets")}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      <div className="flex items-center justify-center">
                        Status {renderSortIcon("status")}
                      </div>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSites.map(site => <TableRow key={site.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${site.status === 'active' ? 'bg-green-500' : site.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                          <div className="font-medium">
                            {site.name}
                            {site.featured && <Star className="h-3 w-3 text-amber-400 fill-amber-400 inline ml-1 mb-1" />}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate">{site.address}</TableCell>
                      <TableCell className="text-center">{site.units}</TableCell>
                      <TableCell className="text-center">{site.members}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <div className={`font-medium ${getSiteMetricsClass(site.openTickets)}`}>
                            {site.openTickets}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{getStatusBadge(site.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
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
                            {site.featured ? <DropdownMenuItem>Remove Featured</DropdownMenuItem> : <DropdownMenuItem>Mark as Featured</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              {site.status === "inactive" ? "Activate Site" : "Deactivate Site"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>}
        </div>
      </div>
    </AdminLayout>;
};
export default AdminSites;