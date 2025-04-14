
export interface SiteData {
  id: string;
  name: string;
  address: string;
  units: number;
  manager: string;
  members: number;
  openTickets: number;
  area: string;
  status: "active" | "inactive" | "maintenance";
  featured: boolean;
  lastUpdated: string;
}

export const sitesData: SiteData[] = [
  {
    id: "site-1",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90210",
    units: 45,
    manager: "Morgan Manager",
    members: 43,
    openTickets: 12,
    area: "10,500 sq ft",
    status: "active",
    featured: true,
    lastUpdated: "2023-05-15T14:30:00"
  },
  {
    id: "site-2",
    name: "Ocean View Condos",
    address: "456 Ocean Dr, Miami, FL 33139",
    units: 30,
    manager: "Sam Supervisor",
    members: 28,
    openTickets: 8,
    area: "8,200 sq ft",
    status: "active",
    featured: false,
    lastUpdated: "2023-06-22T09:15:00"
  },
  {
    id: "site-3",
    name: "Mountain View Residences",
    address: "789 Alpine Way, Denver, CO 80202",
    units: 60,
    manager: "Mandy Manager",
    members: 55,
    openTickets: 15,
    area: "15,300 sq ft",
    status: "maintenance",
    featured: false,
    lastUpdated: "2023-07-03T16:45:00"
  },
  {
    id: "site-4",
    name: "Parkview Towers",
    address: "101 Park Ave, New York, NY 10001",
    units: 200,
    manager: "Patrick Property",
    members: 187,
    openTickets: 32,
    area: "45,000 sq ft",
    status: "active",
    featured: true,
    lastUpdated: "2023-04-18T11:20:00"
  },
  {
    id: "site-5",
    name: "Riverside Apartments",
    address: "202 River Rd, Chicago, IL 60601",
    units: 75,
    manager: "Robin Residence",
    members: 68,
    openTickets: 9,
    area: "18,750 sq ft",
    status: "inactive",
    featured: false,
    lastUpdated: "2023-03-10T08:05:00"
  },
  {
    id: "site-6",
    name: "Highland Gardens",
    address: "303 Highland Ave, Seattle, WA 98101",
    units: 55,
    manager: "Harper Housing",
    members: 49,
    openTickets: 5,
    area: "12,100 sq ft",
    status: "active",
    featured: false,
    lastUpdated: "2023-07-25T15:10:00"
  }
];
