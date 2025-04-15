
export interface TicketMessage {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isManager: boolean;
}

// Mock data for ticket details
export const mockMessages: TicketMessage[] = [
  {
    id: "msg1",
    sender: "John Resident",
    senderAvatar: "https://ui-avatars.com/api/?name=John+Resident&background=0D8ABC&color=fff",
    content: "There's a water leak in my bathroom that's causing damage to the floor.",
    timestamp: "Apr 10, 2025 10:23 AM",
    isManager: false
  },
  {
    id: "msg2",
    sender: "Sarah Manager",
    senderAvatar: "https://ui-avatars.com/api/?name=Sarah+Manager&background=22C55E&color=fff",
    content: "I'll send a maintenance person to check it out. Can you provide more details about the leak?",
    timestamp: "Apr 10, 2025 11:05 AM",
    isManager: true
  },
  {
    id: "msg3",
    sender: "John Resident",
    senderAvatar: "https://ui-avatars.com/api/?name=John+Resident&background=0D8ABC&color=fff",
    content: "It's coming from under the sink. The cabinet underneath is getting water damage as well.",
    timestamp: "Apr 10, 2025 11:12 AM",
    isManager: false
  },
  {
    id: "msg4",
    sender: "Sarah Manager",
    senderAvatar: "https://ui-avatars.com/api/?name=Sarah+Manager&background=22C55E&color=fff",
    content: "Thanks for the information. Our plumber will visit today between 2-4 PM. Will you be available?",
    timestamp: "Apr 10, 2025 11:20 AM",
    isManager: true
  }
];
