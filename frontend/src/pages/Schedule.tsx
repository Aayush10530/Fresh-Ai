import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { orders } from "@/lib/api";

const Schedule = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    address: "",
    timeSlot: "",
    notes: "",
    quantity: "",
  });

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const services = [
    { id: "Wash & Fold", label: "Wash & Fold", price: 150, unit: "kg" },
    { id: "Dry Cleaning", label: "Dry Cleaning", price: 250, unit: "clothe" },
    { id: "Ironing", label: "Ironing", price: 30, unit: "clothe" },
    { id: "Special Care", label: "Special Care", price: 0, unit: "item" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use OpenStreetMap Nominatim for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.display_name) {
            setFormData(prev => ({ ...prev, address: data.display_name }));
            toast.success("Location set successfully!");
          } else {
            toast.error("Could not determine address from location");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          toast.error("Failed to fetch address details");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Failed to get location";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied";
        }
        toast.error(msg);
        setLocationLoading(false);
      }
    );
  };

  const calculateCost = () => {
    const service = services.find(s => s.id === formData.service);
    if (!service || !formData.quantity) return 0;
    return service.price * Number(formData.quantity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a pickup date");
      return;
    }

    setLoading(true);

    try {
      const estimatedCost = calculateCost();
      const orderData = {
        service: formData.service,
        address: formData.address,
        time_slot: formData.timeSlot,
        notes: formData.notes,
        pickup_date: date.toISOString(),
        items_count: Number(formData.quantity) || 0,
        amount: estimatedCost
      };

      const response = await orders.create(orderData);
      toast.success("Pickup scheduled successfully!");
      navigate(`/track?id=${response.data.id}`);
    } catch (error: any) {
      console.error(error);
      let msg = "Failed to schedule pickup";
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === "string") {
          msg = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          msg = error.response.data.detail[0]?.msg || JSON.stringify(error.response.data.detail);
        }
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.service);

  return (
    <div className="min-h-screen py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule Pickup</h1>
          <p className="text-xl text-muted-foreground">
            Choose your service and preferred time
          </p>
        </div>

        <Card className="p-8 shadow-elegant animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service">Select Service</Label>
              <select
                id="service"
                name="service"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.label} ({service.price > 0 ? `₹${service.price}/${service.unit}` : "Custom Quote"})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            {selectedService && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="quantity">
                  {selectedService.id === "Wash & Fold" ? "Weight (kg)" : "Number of Clothes"}
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder={selectedService.id === "Wash & Fold" ? "e.g., 5" : "e.g., 2"}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slot */}
            <div className="space-y-2">
              <Label htmlFor="timeSlot">
                <Clock className="inline h-4 w-4 mr-1" />
                Time Slot
              </Label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.timeSlot}
                onChange={handleChange}
                required
              >
                <option value="">Choose a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="address">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Pickup Address
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs flex gap-1 items-center"
                  onClick={handleUseLocation}
                  disabled={locationLoading}
                >
                  <Navigation className={`h-3 w-3 ${locationLoading ? 'animate-spin' : ''}`} />
                  {locationLoading ? 'Locating...' : 'Use my location'}
                </Button>
              </div>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St, City, State, ZIP"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special requirements or instructions..."
                value={formData.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Cost Estimate */}
            <Card className="p-4 bg-muted/50">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="text-2xl font-bold text-primary">
                  {calculateCost() > 0 ? `₹${calculateCost().toFixed(2)}` : "TBD"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedService?.price ? `Based on ₹${selectedService.price}/${selectedService.unit}` : "Price calculated upon weighting/inspection"}
              </p>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Scheduling..." : "Confirm Pickup"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
