
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, Filter, Grid, List } from "lucide-react";

interface SiteControlsProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SiteControls: React.FC<SiteControlsProps> = ({ 
  view,
  setView,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search sites..." 
            className="pl-8" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
        
        <Tabs value={view} onValueChange={v => setView(v as "list" | "grid")} className="hidden md:flex">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <Grid className="h-4 w-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Button className="whitespace-nowrap">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Site
      </Button>
    </div>
  );
};

export default SiteControls;
