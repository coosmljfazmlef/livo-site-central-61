
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User, UserRole } from "../types";

// Mock user data for demonstration
const mockUsers: Record<string, User> = {
  "admin@livo.com": {
    id: "admin-1",
    name: "Alex Admin",
    email: "admin@livo.com",
    role: "admin" as UserRole,
    avatar: "https://ui-avatars.com/api/?name=Alex+Admin&background=0D8ABC&color=fff",
    sites: [],
  },
  "manager@livo.com": {
    id: "manager-1",
    name: "Morgan Manager",
    email: "manager@livo.com",
    role: "manager" as UserRole,
    avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff",
    sites: [
      {
        id: "site-1",
        name: "Sunset Apartments",
        address: "123 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        ticketCount: 12,
        memberCount: 45,
      },
      {
        id: "site-2",
        name: "Ocean View Condos",
        address: "456 Ocean Dr",
        city: "Miami",
        state: "FL",
        zipCode: "33139",
        ticketCount: 8,
        memberCount: 30,
      },
    ],
  },
  "member@livo.com": {
    id: "member-1",
    name: "Mel Member",
    email: "member@livo.com",
    role: "member" as UserRole,
    avatar: "https://ui-avatars.com/api/?name=Mel+Member&background=0D8ABC&color=fff",
    sites: [
      {
        id: "site-1",
        name: "Sunset Apartments",
        address: "123 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
      },
    ],
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers[email.toLowerCase()];
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // Set the user in state
      setUser(user);
      
      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/member");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
