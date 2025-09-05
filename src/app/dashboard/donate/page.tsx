"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline mt-4 text-3xl">Make a Donation</CardTitle>
          <CardDescription>
            Your generous contribution helps us build a stronger community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-lg">Amount (₹)</Label>
            <Input id="amount" type="number" placeholder="Enter amount" className="h-12 text-lg" />
          </div>
          <div className="flex gap-2">
            {[101, 501, 1001, 2001].map(amount => (
                <Button key={amount} variant="outline" className="flex-1">₹{amount}</Button>
            ))}
          </div>

          <div className="space-y-3">
            <Label className="text-lg">Payment Method</Label>
            <RadioGroup defaultValue="upi" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary">
                <RadioGroupItem value="upi" id="upi"/>
                <span className="font-medium">UPI / QR Code</span>
              </Label>
              <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary">
                <RadioGroupItem value="card" id="card"/>
                <span className="font-medium">Credit/Debit Card</span>
              </Label>
               <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary">
                <RadioGroupItem value="netbanking" id="netbanking"/>
                <span className="font-medium">Net Banking</span>
              </Label>
            </RadioGroup>
          </div>
          <Button size="lg" className="w-full text-lg h-12 bg-accent hover:bg-accent/90">
            Proceed to Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
