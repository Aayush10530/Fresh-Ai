import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, DollarSign, Package } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

const Analytics = () => {
  const revenueData = [
    { month: "Jul", revenue: 35000, orders: 890, customers: 245 },
    { month: "Aug", revenue: 42000, orders: 1050, customers: 298 },
    { month: "Sep", revenue: 38000, orders: 945, customers: 267 },
    { month: "Oct", revenue: 47000, orders: 1180, customers: 332 },
    { month: "Nov", revenue: 52000, orders: 1310, customers: 378 },
    { month: "Dec", revenue: 58000, orders: 1450, customers: 421 },
  ];

  const customerBehavior = [
    { day: "Mon", orders: 145 },
    { day: "Tue", orders: 167 },
    { day: "Wed", orders: 178 },
    { day: "Thu", orders: 189 },
    { day: "Fri", orders: 234 },
    { day: "Sat", orders: 312 },
    { day: "Sun", orders: 289 },
  ];

  const serviceDistribution = [
    { name: "Wash & Fold", value: 1245, revenue: 18675 },
    { name: "Dry Cleaning", value: 678, revenue: 30420 },
    { name: "Ironing", value: 456, revenue: 6840 },
    { name: "Special Care", value: 234, revenue: 11700 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive business insights</p>
        </div>
        <Button variant="default">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">$272k</div>
          <div className="text-sm text-secondary">+22% from last period</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">6,834</div>
          <div className="text-sm text-secondary">+18% from last period</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Active Customers</div>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">1,941</div>
          <div className="text-sm text-secondary">+15% from last period</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Avg Order Value</div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">$39.80</div>
          <div className="text-sm text-secondary">+8% from last period</div>
        </Card>
      </div>

      {/* Revenue & Orders Trend */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Revenue & Orders Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Customer Behavior & Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Behavior */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-bold mb-6">Weekly Order Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerBehavior}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="hsl(var(--primary))" />
            </BarChart>
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

      {/* Service Performance Table */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Service Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Service</th>
                <th className="text-right py-3 px-4">Orders</th>
                <th className="text-right py-3 px-4">Revenue</th>
                <th className="text-right py-3 px-4">Avg Value</th>
                <th className="text-right py-3 px-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {serviceDistribution.map((service, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-3 px-4 font-medium">{service.name}</td>
                  <td className="text-right py-3 px-4">{service.value.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold">
                    ${service.revenue.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4">
                    ${(service.revenue / service.value).toFixed(2)}
                  </td>
                  <td className="text-right py-3 px-4 text-secondary">
                    +{Math.floor(Math.random() * 20 + 5)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 shadow-soft bg-gradient-primary text-primary-foreground">
        <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
        <div className="space-y-3 opacity-95">
          <p>• Weekend orders are 35% higher - consider additional staffing on Fri-Sun</p>
          <p>• Dry cleaning service shows highest profit margin at 67%</p>
          <p>• Customer retention rate improved 12% after loyalty program launch</p>
          <p>• Peak hours are 6-8 PM - optimize pickup/delivery scheduling</p>
          <p>• Average order value increased 8% with AI pricing recommendations</p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
