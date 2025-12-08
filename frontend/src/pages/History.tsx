import { useState, useEffect } from "react";
import { Download, Eye, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { orders as apiOrders } from "@/lib/api";

interface Order {
  id: string;
  pickup_date: string;
  service: string;
  status: string;
  amount: number;
  items_count: number;
}

const History = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await apiOrders.list();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "In Progress":
      case "Pending":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Cancelled":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Downloading invoice for order #${orderId}`);
  };

  const handleViewDetails = (orderId: string) => {
    toast.info(`Viewing details for order #${orderId}`);
    // Navigate to track page or details modal
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order History</h1>
          <p className="text-xl text-muted-foreground">
            View and manage your past orders
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </Card>
          {/* Placeholders for now until backend supports stats */}
          <Card className="p-6 shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">₹0</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl font-bold text-primary">N/A</div>
              <Star className="h-6 w-6 fill-primary text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-sm text-muted-foreground">Items Cleaned</div>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="shadow-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>{order.items_count} items</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">₹{order.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(order.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "Completed" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadInvoice(order.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default History;
