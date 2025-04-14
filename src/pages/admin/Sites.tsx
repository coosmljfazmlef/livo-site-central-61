
import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { sitesData } from "@/data/sitesData";
import { filterSites, sortSites } from "@/utils/siteUtils";
import SiteControls from "@/components/sites/SiteControls";
import SiteGrid from "@/components/sites/SiteGrid";
import SiteList from "@/components/sites/SiteList";

const AdminSites = () => {
  const [view, setView] = useState<"list" | "grid">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredSites = filterSites(sitesData, searchTerm);
  const sortedSites = sortSites(filteredSites, sortField, sortDirection);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <AdminLayout title="Manage Sites">
      <div className="space-y-6">
        <SiteControls 
          view={view}
          setView={setView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div>
          {view === "grid" ? (
            <SiteGrid sites={sortedSites} />
          ) : (
            <SiteList 
              sites={sortedSites} 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSites;
