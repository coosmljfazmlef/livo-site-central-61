import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserRow } from "./UserRow";
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  sites: string[];
  status: string;
  avatar: string;
};
interface UserTableProps {
  users: User[];
  onUpdateRole: (userId: string) => void;
  onDeactivateUser: (userId: string) => void;
}
export const UserTable: React.FC<UserTableProps> = ({
  users,
  onUpdateRole,
  onDeactivateUser
}) => {
  return <div className="rounded-md border overflow-hidden bg-white">
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
          {users.map(user => <UserRow key={user.id} user={user} onUpdateRole={onUpdateRole} onDeactivateUser={onDeactivateUser} />)}
        </TableBody>
      </Table>
    </div>;
};