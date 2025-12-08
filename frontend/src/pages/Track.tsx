import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Package, MapPin, CheckCircle, Clock, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { orders as apiOrders } from "@/lib/api";

const Track = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setOrderId(idFromUrl);
      handleTrack(idFromUrl);
    }
  }, [searchParams]);

  const handleTrack = async (id: string | React.FormEvent) => {
    if (typeof id !== 'string') {
      id.preventDefault();
      id = orderId;
    }

    if (!id) return;

    setLoading(true);
    try {
      const response = await apiOrders.get(id as string);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Order not found");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">
            Enter your order ID to see real-time updates
          </p>
        </div>

        {/* Order ID Input */}
        <Card className="p-8 shadow-elegant animate-scale-in max-w-md mx-auto mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order ID</Label>
              <Input
                id="orderNumber"
                type="text"
                placeholder="e.g., AI3966"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </form>
        </Card>

        {/* Tracking Results */}
        {order && (
          <div className="space-y-6 animate-fade-in">
            {/* Order Summary */}
            <Card className="p-6 shadow-elegant">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order #{order.id}</h2>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {order.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Service</div>
                  <div className="font-semibold">{order.service}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Pickup Date</div>
                  <div className="font-semibold">{new Date(order.pickup_date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Estimated Delivery</div>
                  <div className="font-semibold">Pending</div>
                </div>
              </div>
            </Card>

            {/* Timeline Placeholder */}
            <Card className="p-6 shadow-elegant">
              <h3 className="text-xl font-bold mb-6">Order Status</h3>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-primary" />
                <span>Current Status: {order.status}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
