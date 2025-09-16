
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, QrCode, CreditCard, Banknote, Download, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";

type PaymentMethod = "upi" | "card" | "netbanking";
type DonationCategory = "temple" | "prasadham" | "pooja" | "other";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [donationFor, setDonationFor] = useState<DonationCategory | "">("");
  const [otherCategory, setOtherCategory] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleAmountButtonClick = (presetAmount: number) => {
    setAmount(presetAmount.toString());
  };

  const handleProceedToPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !donationFor) {
        toast.error("Please enter an amount and select a donation category.");
        return;
    }
    if (donationFor === "other" && !otherCategory) {
        toast.error("Please specify the purpose for your 'Other' donation.");
        return;
    }
    // In a real app, you would process the payment here.
    // For this prototype, we'll just show the success message.
    setPaymentSuccess(true);
  }

  const getCategoryName = () => {
    switch (donationFor) {
      case "temple": return "Temple Development";
      case "prasadham": return "Prasadham";
      case "pooja": return "Special Pooja";
      case "other": return otherCategory;
      default: return "";
    }
  }

  if (paymentSuccess) {
    return (
      <div className="flex justify-center py-8">
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="font-headline mt-4 text-3xl">Payment Successful!</CardTitle>
                <CardDescription>Thank you for your generous contribution towards <strong>{getCategoryName()}</strong>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="text-4xl font-bold">₹{amount}</p>
                </div>
                <p className="text-xs text-muted-foreground">A receipt has been sent to your registered email address.</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button size="lg" className="w-full" onClick={() => toast.success("Receipt downloaded (demo).")}>
                    <Download className="mr-2 h-4 w-4" /> Download Receipt
                </Button>
                 <Button variant="outline" className="w-full" onClick={() => { setPaymentSuccess(false); setAmount(""); setDonationFor(""); }}>
                    Make Another Donation
                </Button>
            </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleProceedToPay}>
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
                <Label htmlFor="donationFor">I would like to donate for</Label>
                <Select value={donationFor} onValueChange={(value) => setDonationFor(value as DonationCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temple">Temple Development</SelectItem>
                    <SelectItem value="prasadham">Prasadham</SelectItem>
                    <SelectItem value="pooja">Special Pooja</SelectItem>
                    <SelectItem value="other">Others (Please specify)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {donationFor === 'other' && (
                <div className="space-y-2">
                    <Label htmlFor="other-category">Please Specify</Label>
                    <Input 
                        id="other-category" 
                        placeholder="e.g., Children's education fund"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                    />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lg">Amount (INR)</Label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-muted-foreground">₹</span>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="Enter amount" 
                      className="h-12 pl-8 text-lg" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                </div>
              </div>
              <div className="flex gap-2">
                {[101, 501, 1001, 2001].map(presetAmount => (
                    <Button key={presetAmount} type="button" variant="outline" className="flex-1" onClick={() => handleAmountButtonClick(presetAmount)}>₹{presetAmount}</Button>
                ))}
              </div>

              <div className="space-y-3">
                <Label className="text-lg">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="upi" id="upi"/>
                    <QrCode/>
                    <span className="font-medium">UPI / QR</span>
                  </Label>
                  <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="card" id="card"/>
                    <CreditCard />
                    <span className="font-medium">Card</span>
                  </Label>
                   <Label className="flex items-center gap-3 rounded-md border p-4 cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="netbanking" id="netbanking"/>
                    <Banknote />
                    <span className="font-medium">Net Banking</span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="pt-4">
                {paymentMethod === 'upi' && (
                    <div className="text-center space-y-4">
                        <p className="text-muted-foreground">Scan the QR code with your favorite UPI app</p>
                        <div className="flex justify-center">
                             <Image 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=community@okhdfcbank&pn=Kulamitra%20Community&am=101.00&cu=INR" 
                                alt="Donation QR Code" 
                                width={200}
                                height={200}
                                className="rounded-lg border p-1"
                                data-ai-hint="qr code"
                             />
                        </div>
                    </div>
                )}
                {paymentMethod === 'card' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="card-name">Cardholder Name</Label>
                            <Input id="card-name" placeholder="Full Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM / YY" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                            </div>
                        </div>
                    </div>
                )}
                {paymentMethod === 'netbanking' && (
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bank">Select Bank</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose your bank" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                    <SelectItem value="icici">ICICI Bank</SelectItem>
                                    <SelectItem value="sbi">State Bank of India</SelectItem>
                                    <SelectItem value="axis">Axis Bank</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <p className="text-sm text-muted-foreground">You will be redirected to your bank's portal to complete the payment.</p>
                    </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" size="lg" className="w-full text-lg h-12 bg-accent hover:bg-accent/90">
                    Proceed to Pay ₹{amount || 0}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}

    