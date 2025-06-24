import { useState } from "react";
import Button from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const SupportForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Submit a Support Request</CardTitle>
        <CardDescription>
          Can't find what you're looking for? Send us a message
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booking">Booking Issues</SelectItem>
                <SelectItem value="payment">Payment & Refunds</SelectItem>
                <SelectItem value="technical">Technical Problems</SelectItem>
                <SelectItem value="account">Account Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief description of your issue" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please provide as much detail as possible about your issue..."
              rows={6}
            />
          </div>
          <Button className="w-full">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupportForm;
