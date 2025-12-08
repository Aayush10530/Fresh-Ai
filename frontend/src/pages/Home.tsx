import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Shield, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-laundry.jpg";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Care",
      description: "Smart fabric recognition and stain detection for optimal cleaning",
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Same-day pickup and delivery at your convenience",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed or your money back",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Green cleaning products safe for you and the environment",
    },
  ];

  const services = [
    { name: "Wash & Fold", price: "From ₹150/kg", popular: false },
    { name: "Dry Cleaning", price: "From ₹250/item", popular: true },
    { name: "Ironing", price: "From ₹30/item", popular: false },
    { name: "Special Care", price: "Custom Quote", popular: false },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-primary-foreground animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Laundry with a twist of Intelligence
            </h1>
            <p className="text-xl mb-8 opacity-95">
              Experience the future of laundry service. Smart, fast, and eco-friendly cleaning at your fingertips.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/schedule">
                  Schedule Pickup <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreshAI?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced technology meets exceptional service for the perfect laundry experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg">
              Professional care for all your laundry needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 ${service.popular ? "border-2 border-primary shadow-elegant" : ""
                  }`}
              >
                {service.popular && (
                  <div className="inline-block px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/services">Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience FreshAI?
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying hassle-free laundry service
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/track">Track Your Order</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "FreshAI has transformed my laundry routine. The AI-powered service is incredibly accurate and convenient!"
                </p>
                <div className="font-semibold">Customer {i}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
