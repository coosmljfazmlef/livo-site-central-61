
import React, { useState } from "react";
import { SiteData } from "@/data/sitesData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { getStatusBadge, getSiteMetricsClass } from "@/utils/siteUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SiteListProps {
  sites: SiteData[];
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
}

const SiteList: React.FC<SiteListProps> = ({ sites, sortField, sortDirection, handleSort }) => {
  const { toast } = useToast();
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [dialogContent, setDialogContent] = useState<{title: string, action: string}>({title: "", action: ""});
  const [open, setOpen] = useState(false);
  
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };
  
  const handleAction = (site: SiteData, action: string, title: string) => {
    setSelectedSite(site);
    setDialogContent({title, action});
    setOpen(true);
  };
  
  const confirmAction = () => {
    if (!selectedSite) return;
    
    switch(dialogContent.action) {
      case "edit":
        toast({
          title: "Edit Site",
          description: `Editing ${selectedSite.name}`
        });
        break;
      case "members":
        toast({
          title: "Manage Members",
          description: `Managing members for ${selectedSite.name}`
        });
        break;
      case "tickets":
        toast({
          title: "View Tickets",
          description: `Viewing tickets for ${selectedSite.name}`
        });
        break;
      case "toggleStatus":
        toast({
          title: selectedSite.status === "inactive" ? "Site Activated" : "Site Deactivated",
          description: `${selectedSite.name} has been ${selectedSite.status === "inactive" ? "activated" : "deactivated"}`
        });
        break;
    }
    
    setOpen(false);
  };

  return (
    <>
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
                      <DropdownMenuItem onClick={() => handleAction(site, "edit", "Edit Site")}>
                        Edit Site
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(site, "members", "Manage Members")}>
                        Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(site, "tickets", "View Tickets")}>
                        View Tickets
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleAction(
                          site, 
                          "toggleStatus", 
                          site.status === "inactive" ? "Activate Site" : "Deactivate Site"
                        )}
                      >
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
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedSite && (
              <p>
                Are you sure you want to {dialogContent.action === "toggleStatus" 
                  ? (selectedSite.status === "inactive" ? "activate" : "deactivate") 
                  : dialogContent.action} {selectedSite.name}?
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SiteList;
