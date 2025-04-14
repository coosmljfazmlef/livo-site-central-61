
import React, { useState } from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, UserPlus, Search, Users, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/types";

const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    sites: ["Sunset Apartments", "Ocean View Condos"],
    avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "manager",
    sites: ["Sunset Apartments"],
    avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=0D8ABC&color=fff",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "member",
    sites: ["Ocean View Condos"],
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=0D8ABC&color=fff",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "member",
    sites: ["Sunset Apartments"],
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=0D8ABC&color=fff",
  },
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string} | null>(null);
  const [dialogType, setDialogType] = useState<"changeSites" | "changeRole" | "delete">("changeSites");
  
  const handleAction = (user: typeof mockUsers[0], action: "changeSites" | "changeRole" | "delete") => {
    setSelectedUser({id: user.id, name: user.name});
    setDialogType(action);
    setDialogOpen(true);
  };
  
  const confirmAction = () => {
    if (!selectedUser) return;
    
    switch(dialogType) {
      case "changeSites":
        toast({
          title: "Sites Updated",
          description: `Site assignments for ${selectedUser.name} have been updated.`
        });
        break;
      case "changeRole":
        toast({
          title: "Role Updated",
          description: `Role for ${selectedUser.name} has been updated.`
        });
        break;
      case "delete":
        toast({
          title: "User Deleted",
          description: `${selectedUser.name} has been deleted.`
        });
        break;
    }
    
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Users">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
            />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Invite User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage users and their permissions across your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Sites</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="capitalize">
                        {user.role === "admin" && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                            Admin
                          </span>
                        )}
                        {user.role === "manager" && (
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                            Manager
                          </span>
                        )}
                        {user.role === "member" && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                            Member
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.sites.join(", ")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleAction(user, "changeSites", "Change Sites")}
                          >
                            <Users className="h-4 w-4" />
                            Change Sites
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleAction(user, "changeRole", "Change Role")}
                          >
                            <Shield className="h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 flex items-center gap-2"
                            onClick={() => handleAction(user, "delete", "Delete")}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "changeSites" && "Change Site Access"}
              {dialogType === "changeRole" && "Change User Role"}
              {dialogType === "delete" && "Delete User"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <p>
                {dialogType === "changeSites" && `Update site access for ${selectedUser.name}?`}
                {dialogType === "changeRole" && `Change role for ${selectedUser.name}?`}
                {dialogType === "delete" && `Are you sure you want to delete ${selectedUser.name}?`}
              </p>
            )}
            {dialogType === "changeRole" && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="role-admin" name="role" value="admin" className="h-4 w-4" />
                  <label htmlFor="role-admin">Admin</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="role-manager" name="role" value="manager" className="h-4 w-4" />
                  <label htmlFor="role-manager">Manager</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="role-member" name="role" value="member" className="h-4 w-4" defaultChecked />
                  <label htmlFor="role-member">Member</label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
