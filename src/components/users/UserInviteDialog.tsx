
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserInviteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: () => void;
}

export const UserInviteDialog: React.FC<UserInviteDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onInvite 
}) => {
  const [selectedRole, setSelectedRole] = useState("member");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onInvite}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
