import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  MapPin,
  DollarSign,
  Users,
  Activity,
  Gift,
  BarChart3,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/orders", label: "Orders", icon: Package },
    { path: "/admin/routes", label: "Delivery Routes", icon: MapPin },
    { path: "/admin/pricing", label: "Pricing", icon: DollarSign },
    { path: "/admin/staff", label: "Staff", icon: Users },
    { path: "/admin/machines", label: "Machines", icon: Activity },
    { path: "/admin/promotions", label: "Promotions", icon: Gift },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-bold">Admin Panel</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-30 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold">Admin Panel</div>
                <div className="text-xs text-muted-foreground">FreshAI Laundry</div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 lg:pt-24 pt-28">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
