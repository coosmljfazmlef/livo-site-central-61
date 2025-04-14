
import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserTable } from "@/components/users/UserTable";
import { SearchBar } from "@/components/users/SearchBar";
import { UserInviteDialog } from "@/components/users/UserInviteDialog";
import { usersData } from "@/models/user";

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleInviteUser = () => {
    toast({
      title: "Invitation Sent",
      description: "A new user has been invited with the selected role.",
    });
    setIsInviteDialogOpen(false);
  };
  
  const handleUpdateRole = (userId: string) => {
    toast({
      title: "Role Updated",
      description: "The user's role has been updated successfully.",
    });
  };
  
  const handleDeactivateUser = (userId: string) => {
    toast({
      title: "User Deactivated",
      description: "The user has been deactivated successfully.",
    });
  };

  return (
    <AdminLayout title="Manage Users">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={handleSearchChange} 
            />
          </div>
          
          <Button className="whitespace-nowrap" onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>
        
        <UserTable 
          users={filteredUsers} 
          onUpdateRole={handleUpdateRole} 
          onDeactivateUser={handleDeactivateUser} 
        />
        
        <UserInviteDialog 
          isOpen={isInviteDialogOpen} 
          onOpenChange={setIsInviteDialogOpen} 
          onInvite={handleInviteUser} 
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
