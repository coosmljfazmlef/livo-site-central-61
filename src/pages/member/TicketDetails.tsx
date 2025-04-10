
import React from "react";
import { useParams } from "react-router-dom";
import { MemberLayout } from "../../components/layouts/MemberLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Clock,
  Tag,
  Upload
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock ticket data
const mockTicket = {
  id: "T-1001",
  title: "Water leak in bathroom ceiling",
  description: "There's a water leak coming from the ceiling in the bathroom. The ceiling is starting to show water damage and there's water dripping steadily. The leak seems to be coming from the apartment above.",
  createdAt: "2025-04-08T14:22:00Z",
  updatedAt: "2025-04-09T10:15:00Z",
  status: {
    name: "In Progress",
    color: "#3b82f6"
  },
  priority: {
    name: "High",
    color: "#ef4444"
  },
  category: {
    name: "Plumbing"
  },
  reporter: {
    id: "member-1",
    name: "Mel Member",
    avatar: "https://ui-avatars.com/api/?name=Mel+Member&background=0D8ABC&color=fff"
  },
  assignee: {
    id: "manager-1",
    name: "Morgan Manager",
    avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff"
  },
  site: {
    id: "site-1",
    name: "Sunset Apartments",
    unit: "302"
  },
  comments: [
    {
      id: "comment-1",
      content: "I've assigned this to our plumbing contractor. They will contact you to schedule a visit within the next 24 hours.",
      createdAt: "2025-04-08T16:45:00Z",
      user: {
        id: "manager-1",
        name: "Morgan Manager",
        avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff"
      }
    },
    {
      id: "comment-2",
      content: "Thank you. The leak is getting worse, so I'd appreciate if they could come as soon as possible.",
      createdAt: "2025-04-08T17:20:00Z",
      user: {
        id: "member-1",
        name: "Mel Member",
        avatar: "https://ui-avatars.com/api/?name=Mel+Member&background=0D8ABC&color=fff"
      }
    },
    {
      id: "comment-3",
      content: "I've updated the priority to high and contacted the plumber to expedite the visit. They should be able to come tomorrow morning between 9-11 AM. Will that work for you?",
      createdAt: "2025-04-09T10:15:00Z",
      user: {
        id: "manager-1",
        name: "Morgan Manager",
        avatar: "https://ui-avatars.com/api/?name=Morgan+Manager&background=0D8ABC&color=fff"
      }
    }
  ],
  attachments: [
    {
      id: "attachment-1",
      filename: "bathroom_leak.jpg",
      url: "#",
      createdAt: "2025-04-08T14:22:00Z",
      user: {
        id: "member-1",
        name: "Mel Member"
      }
    }
  ]
};

const MemberTicketDetails = () => {
  const { ticketId } = useParams();
  const { toast } = useToast();
  const [newComment, setNewComment] = React.useState("");
  
  // In a real app, fetch the ticket data based on the ticketId
  // const { data: ticket } = useQuery({ ... })
  const ticket = mockTicket;
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call to add the comment
      toast({
        title: "Comment added",
        description: "Your comment has been added to the ticket.",
      });
      setNewComment("");
    }
  };

  if (!ticket) {
    return (
      <MemberLayout title="Ticket Not Found">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Ticket not found</h2>
          <p className="text-muted-foreground mb-4">
            The ticket you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </MemberLayout>
    );
  }

  return (
    <MemberLayout title="Ticket Details">
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="outline"
          size="sm"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>

        {/* Ticket header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Ticket #{ticket.id}</span>
              <span>•</span>
              <span>Reported on {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: `${ticket.status.color}20`,
                color: ticket.status.color,
              }}
            >
              {ticket.status.name}
            </div>
            <div
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: `${ticket.priority.color}20`,
                color: ticket.priority.color,
              }}
            >
              {ticket.priority.name}
            </div>
          </div>
        </div>

        {/* Ticket details and activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main ticket content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{ticket.description}</p>
                
                {ticket.attachments && ticket.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {ticket.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center p-2 border rounded-md hover:bg-muted"
                        >
                          <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{attachment.filename}</span>
                          <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ticket.comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{comment.user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="pl-10">
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h4 className="font-medium mb-2">Add a comment</h4>
                <Textarea
                  placeholder="Type your comment here..."
                  className="min-h-24 mb-3 w-full"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                  <Button variant="outline" type="button">
                    <Paperclip className="h-4 w-4 mr-2" /> Attach File
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar with ticket info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div
                    className="px-3 py-1 rounded-full text-sm inline-block"
                    style={{
                      backgroundColor: `${ticket.status.color}20`,
                      color: ticket.status.color,
                    }}
                  >
                    {ticket.status.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <div
                    className="px-3 py-1 rounded-full text-sm inline-block"
                    style={{
                      backgroundColor: `${ticket.priority.color}20`,
                      color: ticket.priority.color,
                    }}
                  >
                    {ticket.priority.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    {ticket.category.name}
                  </div>
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Reporter</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.reporter.avatar} alt={ticket.reporter.name} />
                      <AvatarFallback>{ticket.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{ticket.reporter.name}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Assigned To</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                      <AvatarFallback>{ticket.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{ticket.assignee.name}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div>{ticket.site.name}, Unit {ticket.site.unit}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberTicketDetails;
