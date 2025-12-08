import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Mock data
  const stats = [
    { label: "Total Orders", value: "1,234", change: "+12%", icon: Package, color: "text-primary" },
    { label: "Revenue", value: "$45,678", change: "+8%", icon: DollarSign, color: "text-secondary" },
    { label: "Active Users", value: "892", change: "+15%", icon: Users, color: "text-accent" },
    { label: "Avg. Rating", value: "4.8", change: "+0.2", icon: Activity, color: "text-primary" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4200, orders: 120 },
    { month: "Feb", revenue: 5100, orders: 145 },
    { month: "Mar", revenue: 4800, orders: 132 },
    { month: "Apr", revenue: 6200, orders: 178 },
    { month: "May", revenue: 7100, orders: 203 },
    { month: "Jun", revenue: 8500, orders: 245 },
  ];

  const serviceDistribution = [
    { name: "Wash & Fold", value: 45 },
    { name: "Dry Cleaning", value: 30 },
    { name: "Ironing", value: 15 },
    { name: "Special Care", value: 10 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"];

  const recentOrders = [
    { id: "LA2025-245", customer: "John Doe", status: "Processing", amount: "$24.50" },
    { id: "LA2025-244", customer: "Jane Smith", status: "Completed", amount: "$45.00" },
    { id: "LA2025-243", customer: "Bob Johnson", status: "In Transit", amount: "$32.75" },
    { id: "LA2025-242", customer: "Alice Brown", status: "Processing", amount: "$18.25" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-secondary">{stat.change} from last month</p>
              </div>
              <div className={`h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-bold mb-6">Revenue & Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--secondary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Service Distribution */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-bold mb-6">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Orders</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-semibold">{order.id}</div>
                  <div className="text-sm text-muted-foreground">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{order.amount}</div>
                  <div className={`text-sm ${
                    order.status === "Completed" ? "text-secondary" :
                    order.status === "Processing" ? "text-primary" :
                    "text-accent"
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Alerts */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-bold mb-6">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <div className="font-semibold text-sm">Machine Maintenance</div>
                <div className="text-xs text-muted-foreground">Washer #3 needs servicing</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg">
              <Activity className="h-5 w-5 text-secondary mt-0.5" />
              <div>
                <div className="font-semibold text-sm">High Demand</div>
                <div className="text-xs text-muted-foreground">Peak hours approaching</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold text-sm">Inventory Low</div>
                <div className="text-xs text-muted-foreground">Restock detergent needed</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
