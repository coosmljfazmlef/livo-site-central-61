
import React from "react";
import { Badge } from "@/components/ui/badge";
import { SiteData } from "@/data/sitesData";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "inactive":
      return <Badge variant="outline" className="text-slate-500">Inactive</Badge>;
    case "maintenance":
      return <Badge className="bg-amber-500">Maintenance</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const getSiteMetricsClass = (count: number): string => {
  if (count > 20) return "text-red-500";
  if (count > 10) return "text-amber-500";
  return "text-green-500";
};

export const filterSites = (sites: SiteData[], searchTerm: string): SiteData[] => {
  return sites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    site.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortSites = (sites: SiteData[], sortField: string, sortDirection: "asc" | "desc"): SiteData[] => {
  return [...sites].sort((a, b) => {
    const fieldA = a[sortField as keyof SiteData];
    const fieldB = b[sortField as keyof SiteData];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    } else {
      const numA = fieldA as number;
      const numB = fieldB as number;
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    }
  });
};
