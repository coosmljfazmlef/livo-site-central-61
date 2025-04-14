
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, UserCog } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  sites: string[];
  status: string;
  avatar: string;
};

interface UserRowProps {
  user: User;
  onUpdateRole: (userId: string) => void;
  onDeactivateUser: (userId: string) => void;
}

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

export const UserRow: React.FC<UserRowProps> = ({ 
  user, 
  onUpdateRole, 
  onDeactivateUser 
}) => {
  return (
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
            <DropdownMenuItem onClick={() => onUpdateRole(user.id)}>
              <UserCog className="mr-2 h-4 w-4" />
              Update Role
            </DropdownMenuItem>
            <DropdownMenuItem>
              Manage Sites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDeactivateUser(user.id)}
            >
              {user.status === "active" ? "Deactivate User" : "Activate User"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
