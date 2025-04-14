
import React from "react";
import { SiteData } from "@/data/sitesData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { getStatusBadge, getSiteMetricsClass } from "@/utils/siteUtils";

interface SiteListProps {
  sites: SiteData[];
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
}

const SiteList: React.FC<SiteListProps> = ({ sites, sortField, sortDirection, handleSort }) => {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
              <div className="flex items-center">
                Site Name {renderSortIcon("name")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("address")}>
              <div className="flex items-center">
                Location {renderSortIcon("address")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("units")}>
              <div className="flex items-center justify-center">
                Units {renderSortIcon("units")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("members")}>
              <div className="flex items-center justify-center">
                Members {renderSortIcon("members")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("openTickets")}>
              <div className="flex items-center justify-center">
                Tickets {renderSortIcon("openTickets")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              <div className="flex items-center justify-center">
                Status {renderSortIcon("status")}
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sites.map(site => (
            <TableRow key={site.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${site.status === 'active' ? 'bg-green-500' : site.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                  <div className="font-medium">
                    {site.name}
                    {site.featured && <Star className="h-3 w-3 text-amber-400 fill-amber-400 inline ml-1 mb-1" />}
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[250px] truncate">{site.address}</TableCell>
              <TableCell className="text-center">{site.units}</TableCell>
              <TableCell className="text-center">{site.members}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <div className={`font-medium ${getSiteMetricsClass(site.openTickets)}`}>
                    {site.openTickets}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{getStatusBadge(site.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Site</DropdownMenuItem>
                    <DropdownMenuItem>Manage Members</DropdownMenuItem>
                    <DropdownMenuItem>View Tickets</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {site.featured ? <DropdownMenuItem>Remove Featured</DropdownMenuItem> : <DropdownMenuItem>Mark as Featured</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      {site.status === "inactive" ? "Activate Site" : "Deactivate Site"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SiteList;
