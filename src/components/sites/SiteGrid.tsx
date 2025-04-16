
import React, { useState } from "react";
import { SiteData } from "@/data/sitesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Building, Users, Ticket, FileText, Check, MoreHorizontal } from "lucide-react";
import { getSiteMetricsClass } from "@/utils/siteUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SiteGridProps {
  sites: SiteData[];
}

const SiteGrid: React.FC<SiteGridProps> = ({ sites }) => {
  const { toast } = useToast();
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [dialogContent, setDialogContent] = useState<{title: string, action: string}>({title: "", action: ""});
  const [open, setOpen] = useState(false);
  
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map(site => (
          <Card key={site.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-livo-100 text-livo-800 flex items-center justify-center">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{site.name}</CardTitle>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleAction(site, "edit", "Edit Site")}
                    >
                      <FileText className="h-4 w-4" />
                      Edit Site
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleAction(site, "members", "Manage Members")}
                    >
                      <Users className="h-4 w-4" />
                      Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => handleAction(site, "tickets", "View Tickets")}
                    >
                      <Ticket className="h-4 w-4" />
                      View Tickets
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive flex items-center gap-2"
                      onClick={() => handleAction(
                        site, 
                        "toggleStatus", 
                        site.status === "inactive" ? "Activate Site" : "Deactivate Site"
                      )}
                    >
                      {site.status === "inactive" ? (
                        <>
                          <Check className="h-4 w-4" />
                          Activate Site
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 opacity-70" />
                          Deactivate Site
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-2xl font-bold">{site.members}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <Ticket className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className={`text-2xl font-bold ${getSiteMetricsClass(site.openTickets)}`}>
                      {site.openTickets}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Open Tickets</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">Manager:</span> {site.manager}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

export default SiteGrid;
