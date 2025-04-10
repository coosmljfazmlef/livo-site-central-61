
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const AdminOrganization = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your organization settings have been saved successfully.",
    });
  };

  return (
    <AdminLayout title="Organization">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  Update your organization's basic information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Livo Property Management" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-contact">Contact Email</Label>
                  <Input id="org-contact" type="email" defaultValue="contact@livoproperties.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-phone">Phone Number</Label>
                  <Input id="org-phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Input id="org-address" defaultValue="123 Main St, Suite 400" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-city">City</Label>
                    <Input id="org-city" defaultValue="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-state">State</Label>
                    <Input id="org-state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-zip">Zip Code</Label>
                    <Input id="org-zip" defaultValue="94105" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize your organization's branding elements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarImage src="https://ui-avatars.com/api/?name=L&background=0D8ABC&color=fff&size=128" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" defaultValue="#0D8ABC" className="w-32" />
                    <div className="h-10 w-10 rounded-md bg-livo-600 border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input id="accent-color" defaultValue="#14B8A6" className="w-32" />
                    <div className="h-10 w-10 rounded-md bg-teal-500 border"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Current Plan: <span className="text-livo-600">Professional</span></h3>
                      <p className="text-sm text-muted-foreground">Billed annually</p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                  <div className="text-sm">
                    <p className="mb-1"><span className="font-medium">Next billing date:</span> July 15, 2025</p>
                    <p className="mb-1"><span className="font-medium">Sites:</span> 10 / 15</p>
                    <p className="mb-1"><span className="font-medium">Users:</span> 45 / 50</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 06/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Billing History</Button>
                <Button variant="default">Update Billing</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminOrganization;
