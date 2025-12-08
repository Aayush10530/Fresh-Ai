import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, UserPlus } from "lucide-react";

const Staff = () => {
  const staff = [
    {
      id: 1,
      name: "John Driver",
      role: "Delivery Driver",
      status: "Active",
      shift: "Morning (8AM-4PM)",
      ordersToday: 12,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sarah Processor",
      role: "Laundry Processor",
      status: "Active",
      shift: "Full Day (8AM-8PM)",
      ordersToday: 28,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Mike Specialist",
      role: "Dry Cleaning Specialist",
      status: "Off Duty",
      shift: "Evening (4PM-12AM)",
      ordersToday: 0,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Lisa Quality",
      role: "Quality Inspector",
      status: "Active",
      shift: "Morning (8AM-4PM)",
      ordersToday: 15,
      rating: 5.0,
    },
  ];

  const shifts = [
    { time: "8:00 AM - 4:00 PM", staff: 4, capacity: "75%" },
    { time: "12:00 PM - 8:00 PM", staff: 3, capacity: "60%" },
    { time: "4:00 PM - 12:00 AM", staff: 2, capacity: "50%" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
          <p className="text-muted-foreground">Manage team schedules and assignments</p>
        </div>
        <Button variant="default">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Total Staff</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-secondary">8</div>
          <div className="text-sm text-muted-foreground">On Duty Now</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-accent">55</div>
          <div className="text-sm text-muted-foreground">Orders Processed</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-primary">4.8</div>
          <div className="text-sm text-muted-foreground">Avg Performance</div>
        </Card>
      </div>

      {/* Staff List */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staff.map((member) => (
            <Card key={member.id} className="p-6 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <Badge className={
                  member.status === "Active"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-muted text-muted-foreground"
                }>
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shift</span>
                  <span className="font-medium">{member.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orders Today</span>
                  <span className="font-medium">{member.ordersToday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium text-secondary">⭐ {member.rating}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Shift Schedule */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Today's Shifts</h3>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Schedule
          </Button>
        </div>
        <div className="space-y-4">
          {shifts.map((shift, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-semibold">{shift.time}</div>
                  <div className="text-sm text-muted-foreground">{shift.staff} staff members</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Capacity</div>
                <div className="font-semibold text-primary">{shift.capacity}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Staff;
