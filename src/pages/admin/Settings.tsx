
import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="ticket-system">Ticket System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@livo.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control which notifications you receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">New tickets</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications when new tickets are created</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Ticket updates</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications when tickets are updated</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">User management</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications about user changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">System updates</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications about system updates and maintenance</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Ticket activity</Label>
                        <p className="text-sm text-muted-foreground">Show notifications for ticket activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Comments and mentions</Label>
                        <p className="text-sm text-muted-foreground">Show notifications for comments and mentions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and password settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base">Enable two-factor authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Session Management</h3>
                  <p className="text-sm text-muted-foreground mb-2">You are currently signed in on 1 device.</p>
                  <Button variant="outline" size="sm">Sign out of all devices</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ticket-system" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ticket System Configuration</CardTitle>
                <CardDescription>
                  Configure how tickets are managed across your organization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Default Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-priority">Default Priority</Label>
                    <select 
                      id="default-priority" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Ticket Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Allow members to see all tickets</Label>
                        <p className="text-sm text-muted-foreground">When disabled, members can only see their own tickets</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Allow members to see comments from other members</Label>
                        <p className="text-sm text-muted-foreground">When disabled, members can only see comments from managers and admins</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Auto-Assignment</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable auto-assignment</Label>
                      <p className="text-sm text-muted-foreground">Automatically assign tickets to managers based on site and category</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Configuration</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
