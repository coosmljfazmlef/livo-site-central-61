
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Ticket, Settings2, Users } from "lucide-react";
import AdminTicketsTable from "@/components/admin/tickets/AdminTicketsTable";
import { adminTicketsData } from "@/components/admin/tickets/AdminTicketsData";

const AdminSiteDetails = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("tickets");

  // Filter tickets for this site (in real app, would fetch from API)
  const siteTickets = adminTicketsData.filter(ticket => 
    ticket.site === "Sunset Apartments" // This would use actual siteId to filter
  );

  return (
    <AdminLayout title="Site Management">
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Sunset Apartments</h2>
          <p className="text-muted-foreground">123 Sunset Blvd, Los Angeles, CA 90210</p>
        </Card>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Site Settings
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card className="p-6">
              <AdminTicketsTable 
                tickets={siteTickets} 
                onTicketClick={(ticket) => console.log("Clicked ticket:", ticket)} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Site Settings</h3>
              {/* Site settings form would go here */}
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Site Members</h3>
              {/* Members management interface would go here */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSiteDetails;
