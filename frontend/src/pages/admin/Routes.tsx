import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, TrendingUp } from "lucide-react";

const Routes = () => {
  // Mock route data
  const routes = [
    {
      id: "R001",
      driver: "Driver 1",
      stops: 8,
      distance: "24.5 km",
      duration: "2h 15m",
      status: "Active",
      efficiency: 92,
    },
    {
      id: "R002",
      driver: "Driver 2",
      stops: 12,
      distance: "32.8 km",
      duration: "3h 30m",
      status: "Active",
      efficiency: 88,
    },
    {
      id: "R003",
      driver: "Driver 3",
      stops: 6,
      distance: "18.2 km",
      duration: "1h 45m",
      status: "Completed",
      efficiency: 95,
    },
  ];

  const optimizationMetrics = [
    { label: "Time Saved", value: "45 min", trend: "+12%" },
    { label: "Fuel Efficiency", value: "18%", trend: "+5%" },
    { label: "Orders/Route", value: "8.7", trend: "+8%" },
    { label: "On-Time Rate", value: "96%", trend: "+2%" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Delivery Routes</h1>
          <p className="text-muted-foreground">AI-optimized delivery route management</p>
        </div>
        <Button variant="default">
          <Navigation className="mr-2 h-4 w-4" />
          Optimize All Routes
        </Button>
      </div>

      {/* Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {optimizationMetrics.map((metric, index) => (
          <Card key={index} className="p-6 shadow-soft">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-muted-foreground">{metric.label}</div>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-secondary">{metric.trend} vs last week</div>
          </Card>
        ))}
      </div>

      {/* Route Visualization */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Live Route Map</h3>
        <div className="bg-muted/30 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Interactive map visualization would appear here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Shows real-time driver locations and optimized routes
            </p>
          </div>
        </div>
      </Card>

      {/* Active Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{route.id}</h3>
                <p className="text-sm text-muted-foreground">{route.driver}</p>
              </div>
              <Badge className={
                route.status === "Active" 
                  ? "bg-primary/10 text-primary" 
                  : "bg-secondary/10 text-secondary"
              }>
                {route.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stops</span>
                <span className="font-semibold">{route.stops}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-semibold">{route.distance}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{route.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Efficiency</span>
                <span className="font-semibold text-secondary">{route.efficiency}%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                <Navigation className="mr-2 h-4 w-4" />
                View Route Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Optimization Info */}
      <Card className="p-6 shadow-soft bg-gradient-primary text-primary-foreground">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Route Optimization</h3>
            <p className="opacity-90 mb-4">
              Our AI analyzes traffic patterns, delivery priorities, and driver locations to create the most efficient routes in real-time.
            </p>
            <ul className="space-y-2 opacity-90">
              <li>• Real-time traffic analysis</li>
              <li>• Dynamic route adjustment</li>
              <li>• Priority-based scheduling</li>
              <li>• Fuel cost optimization</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Routes;
