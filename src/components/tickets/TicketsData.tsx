
// Ticket data for the table
export const ticketsData = [{
  id: "TKT-001",
  title: "Water leak in apartment 302",
  site: "Sunset Apartments",
  reporter: "John Resident",
  status: "Open",
  priority: "Urgent",
  created: "Apr 10, 2025"
}, {
  id: "TKT-002",
  title: "Broken window in unit 204",
  site: "Ocean View Condos",
  reporter: "Lisa Tenant",
  status: "In Progress",
  priority: "High",
  created: "Apr 9, 2025"
}, {
  id: "TKT-003",
  title: "AC repair in unit 112",
  site: "Sunset Apartments",
  reporter: "Michael Owner",
  status: "In Progress",
  priority: "Medium",
  created: "Apr 8, 2025"
}, {
  id: "TKT-004",
  title: "Replace light bulbs in hallway",
  site: "Ocean View Condos",
  reporter: "Sarah Resident",
  status: "Open",
  priority: "Low",
  created: "Apr 7, 2025"
}, {
  id: "TKT-005",
  title: "Garbage disposal not working",
  site: "Sunset Apartments",
  reporter: "David Tenant",
  status: "Resolved",
  priority: "Medium",
  created: "Apr 5, 2025"
}, {
  id: "TKT-006",
  title: "Noisy neighbors in unit 505",
  site: "Ocean View Condos",
  reporter: "Emily Resident",
  status: "Open",
  priority: "Medium",
  created: "Apr 4, 2025"
}];

export type TicketDataType = typeof ticketsData[0];
