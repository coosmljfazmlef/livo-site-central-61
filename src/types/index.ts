
export type UserRole = 'admin' | 'manager' | 'member';

export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  ticketCount?: number;
  memberCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  sites: Site[];
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  plan: string;
  sites: Site[];
  users: User[];
}

export interface TicketStatus {
  id: string;
  name: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  color: string;
}

export interface TicketPriority {
  id: string;
  name: 'Low' | 'Medium' | 'High' | 'Urgent';
  color: string;
}

export interface TicketCategory {
  id: string;
  name: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  site: Site;
  reporter: User;
  assignee?: User;
  comments?: TicketComment[];
  attachments?: TicketAttachment[];
}

export interface TicketComment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface TicketAttachment {
  id: string;
  filename: string;
  url: string;
  createdAt: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
