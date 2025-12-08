import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Edit, Truck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock orders data
  const orders = [
    {
      id: "LA2025-001",
      customer: "John Doe",
      service: "Wash & Fold",
      status: "In Progress",
      pickup: "Jan 15, 2025",
      delivery: "Jan 16, 2025",
      amount: "$24.50",
      assignedTo: "Driver 1",
    },
    {
      id: "LA2025-002",
      customer: "Jane Smith",
      service: "Dry Cleaning",
      status: "Completed",
      pickup: "Jan 14, 2025",
      delivery: "Jan 15, 2025",
      amount: "$45.00",
      assignedTo: "Driver 2",
    },
    {
      id: "LA2025-003",
      customer: "Bob Johnson",
      service: "Ironing",
      status: "Pending Pickup",
      pickup: "Jan 16, 2025",
      delivery: "Jan 17, 2025",
      amount: "$15.00",
      assignedTo: "Unassigned",
    },
    {
      id: "LA2025-004",
      customer: "Alice Brown",
      service: "Special Care",
      status: "In Transit",
      pickup: "Jan 15, 2025",
      delivery: "Jan 16, 2025",
      amount: "$85.00",
      assignedTo: "Driver 3",
    },
    {
      id: "LA2025-005",
      customer: "Charlie Wilson",
      service: "Wash & Fold",
      status: "Processing",
      pickup: "Jan 15, 2025",
      delivery: "Jan 16, 2025",
      amount: "$32.75",
      assignedTo: "Driver 1",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "In Progress":
      case "Processing":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "In Transit":
        return "bg-accent/10 text-accent hover:bg-accent/20";
      case "Pending Pickup":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAssignDriver = (orderId: string) => {
    toast.success(`Driver assigned to order ${orderId}`);
  };

  const handleUpdateStatus = (orderId: string) => {
    toast.success(`Status updated for order ${orderId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">View and manage all customer orders</p>
        </div>
        <Button variant="default">
          <Truck className="mr-2 h-4 w-4" />
          Assign Routes
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 shadow-soft">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending Pickup</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="transit">In Transit</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-elegant">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.pickup}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>
                    <span className={order.assignedTo === "Unassigned" ? "text-muted-foreground italic" : ""}>
                      {order.assignedTo}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info(`Viewing details for ${order.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {order.assignedTo === "Unassigned" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAssignDriver(order.id)}
                        >
                          <Truck className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Pending Pickup</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-accent">8</div>
          <div className="text-sm text-muted-foreground">In Transit</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-primary">15</div>
          <div className="text-sm text-muted-foreground">Processing</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-secondary">45</div>
          <div className="text-sm text-muted-foreground">Completed Today</div>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
