import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your FreshAI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  // Mock AI responses
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
      return "I can help you track your order! Please provide your order number (e.g., LA2025-001) or visit the Track Order page.";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our pricing starts at $1.50/lb for wash & fold, $8.99 for dry cleaning, and $2.50/item for ironing. Would you like a detailed quote?";
    }
    
    if (lowerMessage.includes("schedule") || lowerMessage.includes("pickup")) {
      return "I can help you schedule a pickup! We offer same-day service with flexible time slots. Would you like to schedule now?";
    }
    
    if (lowerMessage.includes("stain") || lowerMessage.includes("fabric")) {
      return "Our AI can analyze fabric types and detect stains! Try our AI Features page to upload a photo of your garment for instant analysis.";
    }
    
    if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
      return "We're available 24/7 for pickups and deliveries! Our customer service team is here Monday-Friday 8AM-8PM, Saturday-Sunday 9AM-6PM.";
    }

    return "I'm here to help! You can ask me about pricing, scheduling pickups, tracking orders, or our AI-powered services. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-elegant z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="font-semibold">FreshAI Assistant</div>
                <div className="text-xs opacity-90">Always here to help</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
