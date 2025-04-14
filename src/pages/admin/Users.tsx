
import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  PlusCircle, 
  UserPlus, 
  Users as UsersIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for users
const usersData = [
  {
    id: "user-01",
    name: "Alex Admin",
    email: "admin@livo.com",
    role: "admin",
    sites: [],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Alex+Admin&background=0D8ABC&color=fff"
  },
  {
    id: "user-02",
    name: "Morgan Manager",
    email: "manager@livo.com",
    role: "manager",
    sites: ["Sunset Apartments", "Ocean View Condos"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff"
  },
  {
    id: "user-03",
    name: "Mel Member",
    email: "member@livo.com",
    role: "member",
    sites: ["Sunset Apartments"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Mel+Member&background=0D8ABC&color=fff"
  },
  {
    id: "user-04",
    name: "Sam Smith",
    email: "sam@livo.com",
    role: "manager",
    sites: ["Parkview Towers"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Sam+Smith&background=0D8ABC&color=fff"
  },
  {
    id: "user-05",
    name: "Jamie Johnson",
    email: "jamie@livo.com",
    role: "member",
    sites: ["Ocean View Condos"],
    status: "inactive",
    avatar: "https://ui-avatars.com/api/?name=Jamie+Johnson&background=0D8ABC&color=fff"
  },
  {
    id: "user-06",
    name: "Pat Porter",
    email: "pat@livo.com",
    role: "member",
    sites: ["Riverside Apartments"],
    status: "inactive",
    avatar: "https://ui-avatars.com/api/?name=Pat+Porter&background=0D8ABC&color=fff"
  },
];

// Role badge component
const RoleBadge = ({ role }: { role: string }) => {
  switch (role) {
    case "admin":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Admin</Badge>;
    case "manager":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Manager</Badge>;
    case "member":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Member</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <div className="flex items-center"><div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>Active</div>;
    case "inactive":
      return <div className="flex items-center"><div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>Inactive</div>;
    default:
      return <div>{status}</div>;
  }
};

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("member");
  
  // Filter users based on search term
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle user invite
  const handleInviteUser = () => {
    toast({
      title: "Invitation Sent",
      description: `A new user has been invited with ${selectedRole} role.`,
    });
    setIsInviteDialogOpen(false);
  };
  
  // Handle user actions
  const handleResetPassword = (userId: string) => {
    toast({
      title: "Password Reset",
      description: "Password reset email has been sent to the user.",
    });
  };
  
  const handleDeactivateUser = (userId: string) => {
    toast({
      title: "User Deactivated",
      description: "The user has been deactivated successfully.",
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    });
  };

  return (
    <AdminLayout title="Manage Users">
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8" 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </div>
          </div>
          
          <Button className="whitespace-nowrap" onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>
        
        {/* Users Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Sites</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell><RoleBadge role={user.role} /></TableCell>
                  <TableCell>
                    {user.sites.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {user.sites.map((site, index) => (
                          <Badge key={index} variant="outline" className="font-normal">
                            {site}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No sites assigned</span>
                    )}
                  </TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Sites
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeactivateUser(user.id)}
                        >
                          {user.status === "active" ? "Deactivate User" : "Activate User"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Invite User Dialog */}
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to a new user to join your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select 
                  id="role" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="member">Member</option>
                </select>
              </div>
              {(selectedRole === "manager" || selectedRole === "member") && (
                <div className="space-y-2">
                  <Label htmlFor="sites">Assign Sites</Label>
                  <select 
                    id="sites" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    multiple
                  >
                    <option value="site-1">Sunset Apartments</option>
                    <option value="site-2">Ocean View Condos</option>
                    <option value="site-3">Mountain View Residences</option>
                    <option value="site-4">Parkview Towers</option>
                    <option value="site-5">Riverside Apartments</option>
                    <option value="site-6">Highland Gardens</option>
                  </select>
                  <p className="text-xs text-muted-foreground">Hold Ctrl (or Cmd) to select multiple sites</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteUser}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
