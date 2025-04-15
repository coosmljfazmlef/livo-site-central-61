import React from "react";
import { useParams } from "react-router-dom";
import { ManagerLayout } from "../../components/layouts/ManagerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Clock, MapPin, Ticket, User, LineChart, ChevronUp, ChevronDown } from "lucide-react";

// Mock site data
const mockSites = {
  "site-1": {
    id: "site-1",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    ticketCount: 12,
    memberCount: 45,
    openTickets: 5,
    resolvedTickets: 7,
    stats: {
      weeklyTickets: [3, 5, 2, 6, 4, 3, 2],
      avgResponseTime: "4.2 hours",
      mostCommonIssue: "Plumbing"
    }
  },
  "site-2": {
    id: "site-2",
    name: "Ocean View Condos",
    address: "456 Ocean Dr",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ticketCount: 8,
    memberCount: 30,
    openTickets: 3,
    resolvedTickets: 5,
    stats: {
      weeklyTickets: [2, 1, 4, 3, 2, 1, 3],
      avgResponseTime: "3.8 hours",
      mostCommonIssue: "Electrical"
    }
  }
};

// Mock tickets for the site
const mockTickets = [{
  id: "T-1001",
  title: "Water leak in apartment 302",
  status: {
    name: "Open",
    color: "#f97316"
  },
  priority: {
    name: "High",
    color: "#ef4444"
  },
  category: "Plumbing",
  reporter: "John Smith",
  createdAt: "2025-04-08T14:22:00Z",
  updatedAt: "2025-04-08T16:45:00Z"
}, {
  id: "T-1002",
  title: "Broken window in stairwell",
  status: {
    name: "In Progress",
    color: "#3b82f6"
  },
  priority: {
    name: "Medium",
    color: "#eab308"
  },
  category: "Maintenance",
  reporter: "Emma Johnson",
  createdAt: "2025-04-07T09:10:00Z",
  updatedAt: "2025-04-09T11:30:00Z"
}, {
  id: "T-1003",
  title: "AC not working in apartment 105",
  status: {
    name: "Open",
    color: "#f97316"
  },
  priority: {
    name: "Medium",
    color: "#eab308"
  },
  category: "HVAC",
  reporter: "Michael Brown",
  createdAt: "2025-04-09T13:15:00Z",
  updatedAt: "2025-04-09T13:15:00Z"
}, {
  id: "T-1004",
  title: "Light fixture broken in lobby",
  status: {
    name: "Resolved",
    color: "#22c55e"
  },
  priority: {
    name: "Low",
    color: "#64748b"
  },
  category: "Electrical",
  reporter: "Sarah Williams",
  createdAt: "2025-04-06T10:20:00Z",
  updatedAt: "2025-04-08T09:45:00Z"
}];

// Mock members for the site
const mockMembers = [{
  id: "user-1",
  name: "John Smith",
  email: "john@example.com",
  unit: "302",
  joinedAt: "2025-01-15",
  avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
  ticketCount: 3
}, {
  id: "user-2",
  name: "Emma Johnson",
  email: "emma@example.com",
  unit: "207",
  joinedAt: "2025-02-10",
  avatar: "https://ui-avatars.com/api/?name=Emma+Johnson&background=0D8ABC&color=fff",
  ticketCount: 1
}, {
  id: "user-3",
  name: "Michael Brown",
  email: "michael@example.com",
  unit: "105",
  joinedAt: "2024-11-05",
  avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=0D8ABC&color=fff",
  ticketCount: 4
}, {
  id: "user-4",
  name: "Sarah Williams",
  email: "sarah@example.com",
  unit: "412",
  joinedAt: "2025-03-20",
  avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=0D8ABC&color=fff",
  ticketCount: 2
}];
const ManagerSiteDetails = () => {
  const {
    siteId
  } = useParams();
  const site = mockSites[siteId || "site-1"];
  if (!site) {
    return <ManagerLayout title="Site Not Found">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Site not found</h2>
          <p className="text-muted-foreground mb-4">The site you're looking for doesn't exist or you don't have access to it.</p>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </ManagerLayout>;
  }
  return <ManagerLayout title={site.name}>
      <div className="space-y-6">
        {/* Site overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Site Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img src={site.image} alt={site.name} className="w-full md:w-64 h-48 object-cover rounded-md" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{site.name}</h3>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{site.address}, {site.city}, {site.state} {site.zipCode}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div className="flex items-center">
                      <div className="bg-livo-100 p-2 rounded-full mr-3">
                        <User className="h-5 w-5 text-livo-600" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Members</div>
                        <div className="font-medium">{site.memberCount}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Ticket className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Tickets</div>
                        <div className="font-medium">{site.ticketCount}</div>
                      </div>
                    </div>
                    
                    
                    
                    
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ticket Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <Ticket className="h-5 w-5 text-orange-600" />
                    </div>
                    <span>Open Tickets</span>
                  </div>
                  <div className="text-xl font-bold">{site.openTickets}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <LineChart className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Resolved This Week</span>
                  </div>
                  <div className="text-xl font-bold">{site.resolvedTickets}</div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm mb-2">Weekly Ticket Trend</div>
                  <div className="flex items-end justify-between h-16 gap-1">
                    {site.stats.weeklyTickets.map((count, index) => <div key={index} className="bg-livo-200 hover:bg-livo-300 rounded-t w-full" style={{
                    height: `${count * 15}%`
                  }}>
                      </div>)}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for tickets and members */}
        <Tabs defaultValue="tickets">
          <TabsList>
            <TabsTrigger value="tickets">Recent Tickets</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Tickets</h3>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/manager/tickets'}>
                View All Tickets
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTickets.map(ticket => <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full" style={{
                        backgroundColor: `${ticket.status.color}20`,
                        color: ticket.status.color
                      }}>
                            {ticket.status.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full" style={{
                        backgroundColor: `${ticket.priority.color}20`,
                        color: ticket.priority.color
                      }}>
                            {ticket.priority.name}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>{ticket.reporter}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Site Members</h3>
              <Button variant="outline" size="sm">
                Invite Member
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Tickets</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMembers.map(member => <TableRow key={member.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                            </div>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>#{member.unit}</TableCell>
                        <TableCell>{member.joinedAt}</TableCell>
                        <TableCell>{member.ticketCount}</TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Configure this site's specific settings and details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-name" className="text-sm font-medium">Site Name</label>
                    <input id="site-name" type="text" defaultValue={site.name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-image" className="text-sm font-medium">Site Image URL</label>
                    <input id="site-image" type="text" defaultValue={site.image} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="site-address" className="text-sm font-medium">Address</label>
                  <input id="site-address" type="text" defaultValue={site.address} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-city" className="text-sm font-medium">City</label>
                    <input id="site-city" type="text" defaultValue={site.city} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-state" className="text-sm font-medium">State</label>
                    <input id="site-state" type="text" defaultValue={site.state} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-zip" className="text-sm font-medium">Zip Code</label>
                    <input id="site-zip" type="text" defaultValue={site.zipCode} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium mb-2">Site Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base">Allow members to see all building tickets</span>
                        <p className="text-sm text-muted-foreground">When disabled, members can only see their own tickets</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base">Email notifications for new tickets</span>
                        <p className="text-sm text-muted-foreground">Send email notifications to site managers when new tickets are created</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ManagerLayout>;
};
export default ManagerSiteDetails;