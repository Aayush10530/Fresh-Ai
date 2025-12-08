import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Machines = () => {
  const machines = [
    {
      id: "W-001",
      type: "Industrial Washer",
      status: "Operating",
      health: 95,
      cyclesCompleted: 1234,
      maintenanceDue: "In 45 days",
      currentLoad: "Running",
    },
    {
      id: "W-002",
      type: "Industrial Washer",
      status: "Operating",
      health: 92,
      cyclesCompleted: 1456,
      maintenanceDue: "In 12 days",
      currentLoad: "Running",
    },
    {
      id: "W-003",
      type: "Industrial Washer",
      status: "Maintenance Required",
      health: 65,
      cyclesCompleted: 2134,
      maintenanceDue: "Overdue",
      currentLoad: "Idle",
    },
    {
      id: "D-001",
      type: "Industrial Dryer",
      status: "Operating",
      health: 88,
      cyclesCompleted: 987,
      maintenanceDue: "In 30 days",
      currentLoad: "Running",
    },
    {
      id: "D-002",
      type: "Industrial Dryer",
      status: "Operating",
      health: 94,
      cyclesCompleted: 876,
      maintenanceDue: "In 60 days",
      currentLoad: "Idle",
    },
    {
      id: "P-001",
      type: "Press Machine",
      status: "Operating",
      health: 97,
      cyclesCompleted: 543,
      maintenanceDue: "In 90 days",
      currentLoad: "Idle",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operating":
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case "Maintenance Required":
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-secondary";
    if (health >= 70) return "text-primary";
    return "text-accent";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Machine Health</h1>
          <p className="text-muted-foreground">Monitor equipment status and maintenance</p>
        </div>
        <Button variant="default">
          <Wrench className="mr-2 h-4 w-4" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Machines</div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold">6</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Operating</div>
            <CheckCircle className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-3xl font-bold text-secondary">5</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Need Maintenance</div>
            <AlertTriangle className="h-5 w-5 text-accent" />
          </div>
          <div className="text-3xl font-bold text-accent">1</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Avg Health</div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">89%</div>
        </Card>
      </div>

      {/* Machine Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <Card key={machine.id} className="p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{machine.id}</h3>
                <p className="text-sm text-muted-foreground">{machine.type}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(machine.status)}
                <Badge className={
                  machine.status === "Operating"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent"
                }>
                  {machine.currentLoad}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Health Status</span>
                  <span className={`font-semibold ${getHealthColor(machine.health)}`}>
                    {machine.health}%
                  </span>
                </div>
                <Progress value={machine.health} className="h-2" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cycles Completed</span>
                  <span className="font-medium">{machine.cyclesCompleted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Maintenance</span>
                  <span className={`font-medium ${
                    machine.maintenanceDue === "Overdue" ? "text-accent" : ""
                  }`}>
                    {machine.maintenanceDue}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Maintenance Alerts */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Maintenance Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">Washer W-003 Requires Immediate Attention</div>
              <div className="text-sm text-muted-foreground mt-1">
                Health at 65% - Maintenance overdue by 5 days. Performance degradation detected.
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                Schedule Service
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
            <Activity className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">Washer W-002 Maintenance Due Soon</div>
              <div className="text-sm text-muted-foreground mt-1">
                Scheduled maintenance in 12 days. Book service appointment to avoid downtime.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Predictions */}
      <Card className="p-6 shadow-soft bg-gradient-primary text-primary-foreground">
        <h3 className="text-xl font-bold mb-4">AI-Powered Predictions</h3>
        <div className="space-y-3 opacity-95">
          <p>• Washer W-003 predicted to fail within 7 days without maintenance</p>
          <p>• Dryer D-001 showing early signs of belt wear - recommend inspection</p>
          <p>• All machines operating at 92% efficiency overall</p>
          <p>• Optimal maintenance schedule could reduce downtime by 18%</p>
        </div>
      </Card>
    </div>
  );
};

export default Machines;
