import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { orders as apiOrders } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Order {
    id: string;
    user_id: number;
    pickup_date: string;
    service: string;
    status: string;
    amount: number;
    items_count: number;
    address: string;
    notes?: string;
}

const AdminDashboard = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await apiOrders.getAll();
            setOrders(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load admin orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await apiOrders.updateStatus(orderId, newStatus);
            toast.success(`Order ${orderId} status updated to ${newStatus}`);
            // Refresh list to reflect changes
            loadOrders();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-secondary/10 text-secondary border-secondary/20";
            case "In Progress":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "Cancelled":
                return "bg-destructive/10 text-destructive border-destructive/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="min-h-screen py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage all customer orders</p>
                    </div>
                    <Button onClick={loadOrders} variant="outline">
                        Refresh Data
                    </Button>
                </div>

                <Card className="shadow-elegant overflow-hidden animate-scale-in">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Current Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12">
                                            <div className="flex justify-center items-center gap-2 text-muted-foreground">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Loading orders...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                            No orders found in the system.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">#{order.id}</TableCell>
                                            <TableCell>User #{order.user_id}</TableCell>
                                            <TableCell>{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">{order.service}</div>
                                                <div className="text-xs text-muted-foreground">{order.items_count} items • ₹{order.amount}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate" title={order.address}>
                                                {order.address}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={order.status}
                                                    onValueChange={(val) => handleStatusChange(order.id, val)}
                                                >
                                                    <SelectTrigger className="w-[140px] h-8">
                                                        <SelectValue placeholder="Update Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
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

export default AdminDashboard;
