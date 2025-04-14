
import React from "react";
import { SiteData } from "@/data/sitesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Building, Users, Ticket, FileText, Star, StarOff, Check, MoreHorizontal } from "lucide-react";
import { getSiteMetricsClass } from "@/utils/siteUtils";

interface SiteGridProps {
  sites: SiteData[];
}

const SiteGrid: React.FC<SiteGridProps> = ({ sites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map(site => (
        <Card key={site.id} className="overflow-hidden transition-shadow hover:shadow-md">
          <div className={`h-1.5 w-full ${site.status === 'active' ? 'bg-green-500' : site.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-300'}`} />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-livo-100 text-livo-800 flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{site.name}</CardTitle>
                    {site.featured && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                  </div>
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
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Edit Site
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Manage Members
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    View Tickets
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {site.featured ? (
                    <DropdownMenuItem className="flex items-center gap-2">
                      <StarOff className="h-4 w-4" />
                      Remove Featured
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Mark as Featured
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive flex items-center gap-2">
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
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{site.units}</div>
                <div className="text-xs text-muted-foreground">Units</div>
              </div>
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
  );
};

export default SiteGrid;
