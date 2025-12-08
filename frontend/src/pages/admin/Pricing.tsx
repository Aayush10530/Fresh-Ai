import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Edit, Save } from "lucide-react";
import { toast } from "sonner";

const Pricing = () => {
  const [editing, setEditing] = useState<string | null>(null);

  const services = [
    { id: "wash-fold", name: "Wash & Fold", basePrice: "1.50", unit: "per lb", demand: "High" },
    { id: "dry-clean", name: "Dry Cleaning", basePrice: "8.99", unit: "per item", demand: "Medium" },
    { id: "ironing", name: "Ironing Service", basePrice: "2.50", unit: "per item", demand: "Low" },
    { id: "special", name: "Special Care", basePrice: "25.00", unit: "per item", demand: "Medium" },
  ];

  const handleSave = (id: string) => {
    toast.success("Pricing updated successfully");
    setEditing(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dynamic Pricing</h1>
          <p className="text-muted-foreground">Manage and optimize service pricing</p>
        </div>
        <Button variant="default">
          <TrendingUp className="mr-2 h-4 w-4" />
          AI Optimize Prices
        </Button>
      </div>

      {/* Pricing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">$1,234</div>
              <div className="text-sm text-muted-foreground">Daily Revenue</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">+12%</div>
              <div className="text-sm text-muted-foreground">Revenue Growth</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">$28.45</div>
              <div className="text-sm text-muted-foreground">Avg Order Value</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Service Pricing */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Service Pricing</h3>
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                  
                  {editing === service.id ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <Label htmlFor={`price-${service.id}`} className="text-sm mb-2 block">
                          Base Price
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">$</span>
                          <Input
                            id={`price-${service.id}`}
                            type="number"
                            step="0.01"
                            defaultValue={service.basePrice}
                            className="max-w-32"
                          />
                          <span className="text-muted-foreground text-sm">{service.unit}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(service.id)}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditing(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          ${service.basePrice}
                        </div>
                        <div className="text-sm text-muted-foreground">{service.unit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Demand</div>
                        <div className={`font-semibold ${
                          service.demand === "High" ? "text-secondary" :
                          service.demand === "Medium" ? "text-primary" :
                          "text-accent"
                        }`}>
                          {service.demand}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {editing !== service.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(service.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* AI Pricing Insights */}
      <Card className="p-6 shadow-soft bg-gradient-primary text-primary-foreground">
        <h3 className="text-xl font-bold mb-4">AI Pricing Insights</h3>
        <div className="space-y-3 opacity-95">
          <p>• Peak demand detected on weekends - consider dynamic pricing</p>
          <p>• Dry cleaning prices 8% below market average - potential increase opportunity</p>
          <p>• Special care services showing 15% growth - maintain competitive pricing</p>
          <p>• Bundle deals could increase average order value by 12%</p>
        </div>
      </Card>
    </div>
  );
};

export default Pricing;
