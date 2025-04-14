
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  sites: string[];
  status: string;
  avatar: string;
}

export const usersData: User[] = [
  {
    id: "user-01",
    name: "Alex Admin",
    email: "admin@livo.com",
    role: "admin",
    sites: [],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Alex+Admin&background=0D8ABC&color=fff"
  },
  {
    id: "user-02",
    name: "Morgan Manager",
    email: "manager@livo.com",
    role: "manager",
    sites: ["Sunset Apartments", "Ocean View Condos"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff"
  },
  {
    id: "user-03",
    name: "Mel Member",
    email: "member@livo.com",
    role: "member",
    sites: ["Sunset Apartments"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Mel+Member&background=0D8ABC&color=fff"
  },
  {
    id: "user-04",
    name: "Sam Smith",
    email: "sam@livo.com",
    role: "manager",
    sites: ["Parkview Towers"],
    status: "active",
    avatar: "https://ui-avatars.com/api/?name=Sam+Smith&background=0D8ABC&color=fff"
  },
  {
    id: "user-05",
    name: "Jamie Johnson",
    email: "jamie@livo.com",
    role: "member",
    sites: ["Ocean View Condos"],
    status: "inactive",
    avatar: "https://ui-avatars.com/api/?name=Jamie+Johnson&background=0D8ABC&color=fff"
  },
  {
    id: "user-06",
    name: "Pat Porter",
    email: "pat@livo.com",
    role: "member",
    sites: ["Riverside Apartments"],
    status: "inactive",
    avatar: "https://ui-avatars.com/api/?name=Pat+Porter&background=0D8ABC&color=fff"
  },
];
