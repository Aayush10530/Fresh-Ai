import { Link } from "react-router-dom";
import { Shirt, Wind, Zap, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Shirt,
      name: "Wash & Fold",
      description: "Professional washing and folding service for everyday garments",
      price: "From ₹150/kg",
      features: [
        "Premium detergents",
        "Fabric softener included",
        "Neatly folded and packaged",
        "24-hour turnaround",
      ],
      popular: false,
    },
    {
      icon: Wind,
      name: "Dry Cleaning",
      description: "Expert dry cleaning for delicate and special garments",
      price: "From ₹250/item",
      features: [
        "Professional grade cleaning",
        "Stain treatment",
        "Pressed and ready to wear",
        "48-hour turnaround",
      ],
      popular: true,
    },
    {
      icon: Zap,
      name: "Ironing Service",
      description: "Crisp, professional ironing for your clothes",
      price: "From ₹30/item",
      features: [
        "Professional pressing",
        "Hanger or fold options",
        "Attention to detail",
        "Same-day service",
      ],
      popular: false,
    },
    {
      icon: Sparkles,
      name: "Special Care",
      description: "AI-powered care for delicate and special items",
      price: "Custom Quote",
      features: [
        "Fabric recognition AI",
        "Stain detection & treatment",
        "Custom care instructions",
        "White glove service",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional laundry care powered by AI technology for exceptional results
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-scale-in ${service.popular ? "border-2 border-primary shadow-elegant relative" : ""
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-gradient-primary text-primary-foreground text-sm font-semibold rounded-full shadow-elegant">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-primary">{service.price}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={service.popular ? "default" : "outline"} asChild>
                <Link to="/schedule">Schedule Pickup</Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-primary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">AI-Powered Quality</h2>
            <p className="mb-6 opacity-95">
              Our advanced AI technology recognizes fabric types, detects stains, and determines the optimal cleaning method for each garment. This ensures the highest quality care while extending the life of your clothes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="opacity-90">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="opacity-90">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="opacity-90">Service Available</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
