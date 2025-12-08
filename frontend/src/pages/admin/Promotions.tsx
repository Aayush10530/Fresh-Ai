import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Gift, Plus, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Promotions = () => {
  const activePromotions = [
    {
      id: 1,
      name: "New Customer 20% Off",
      code: "WELCOME20",
      discount: "20%",
      type: "Percentage",
      status: "Active",
      used: 145,
      limit: 500,
      validUntil: "Feb 28, 2025",
    },
    {
      id: 2,
      name: "Weekend Special",
      code: "WEEKEND15",
      discount: "15%",
      type: "Percentage",
      status: "Active",
      used: 89,
      limit: 200,
      validUntil: "Jan 31, 2025",
    },
    {
      id: 3,
      name: "$10 Off Dry Cleaning",
      code: "DRYCLEAN10",
      discount: "$10",
      type: "Fixed",
      status: "Active",
      used: 67,
      limit: 150,
      validUntil: "Mar 15, 2025",
    },
  ];

  const loyaltyTiers = [
    { tier: "Bronze", orders: "1-10", discount: "5%", members: 234 },
    { tier: "Silver", orders: "11-25", discount: "10%", members: 156 },
    { tier: "Gold", orders: "26-50", discount: "15%", members: 89 },
    { tier: "Platinum", orders: "51+", discount: "20%", members: 34 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Promotions & Loyalty</h1>
          <p className="text-muted-foreground">Manage discount codes and loyalty programs</p>
        </div>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Active Promos</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">513</div>
              <div className="text-sm text-muted-foreground">Loyalty Members</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">301</div>
              <div className="text-sm text-muted-foreground">Codes Used</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">$4.2k</div>
              <div className="text-sm text-muted-foreground">Discounts Given</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Promotions */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Active Promotions</h3>
        <div className="space-y-4">
          {activePromotions.map((promo) => (
            <Card key={promo.id} className="p-6 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{promo.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary font-mono">
                      {promo.code}
                    </Badge>
                    <Badge className="bg-secondary/10 text-secondary">
                      {promo.discount}
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground">
                      {promo.type}
                    </Badge>
                  </div>
                </div>
                <Badge className="bg-secondary/10 text-secondary">Active</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Times Used</div>
                  <div className="font-semibold">{promo.used} / {promo.limit}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Valid Until</div>
                  <div className="font-semibold">{promo.validUntil}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Remaining</div>
                  <div className="font-semibold">{promo.limit - promo.used}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Pause</Button>
                <Button variant="outline" size="sm" className="text-destructive">Deactivate</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Loyalty Program */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-bold mb-6">Loyalty Program Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loyaltyTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-6 shadow-soft ${
                index === 3 ? "border-2 border-primary" : ""
              }`}
            >
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-lg mb-2">{tier.tier}</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  {tier.orders} orders
                </div>
                <div className="text-2xl font-bold text-primary mb-3">
                  {tier.discount}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{tier.members}</span>
                  <span className="text-muted-foreground"> members</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Create Promotion Form */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-bold mb-6">Quick Create Promotion</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="promo-name">Promotion Name</Label>
            <Input id="promo-name" placeholder="e.g., Spring Sale" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="promo-code">Promo Code</Label>
            <Input id="promo-code" placeholder="e.g., SPRING25" className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount Value</Label>
            <Input id="discount" placeholder="e.g., 25" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="limit">Usage Limit</Label>
            <Input id="limit" placeholder="e.g., 100" type="number" />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={() => toast.success("Promotion created successfully!")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Promotions;
