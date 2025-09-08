
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, TrendingUp, Landmark, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

const chitFunds = [
  {
    id: 'cf-01',
    name: 'Griha Lakshmi Chit',
    amount: '₹ 5,00,000',
    duration: '25 Months',
    members: 25,
    status: 'Open',
    contribution: '₹ 20,000'
  },
  {
    id: 'cf-02',
    name: 'Vyapar Vridhi Fund',
    amount: '₹ 10,00,000',
    duration: '20 Months',
    members: 20,
    status: 'Open',
    contribution: '₹ 50,000'
  },
  {
    id: 'cf-03',
    name: 'Vidya Nidhi Scheme',
    amount: '₹ 2,50,000',
    duration: '50 Months',
    members: 50,
    status: 'Full',
    contribution: '₹ 5,000'
  },
];

type ChitFund = typeof chitFunds[0];

export default function ChitFundsPage() {
  const [selectedFund, setSelectedFund] = useState<ChitFund | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Community ChitFunds
          </h1>
          <p className="text-muted-foreground">
            Invest, save, and grow together with our trusted ChitFund schemes.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Landmark className="mr-2 h-4 w-4" />
              Learn How it Works
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">How Chit Funds Work</DialogTitle>
              <DialogDescription>
                A simple guide to understanding the chit fund process.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-sm text-foreground/90">
              <p>A chit fund is a type of rotating savings and credit association, a system where a group of individuals contribute money into a common pool regularly.</p>
              <ol className="list-decimal list-inside space-y-2">
                <li><span className="font-semibold">Group Formation:</span> A group of members (e.g., 25) agrees to contribute a fixed amount every month for a set period (e.g., 25 months).</li>
                <li><span className="font-semibold">The Pot:</span> The total amount collected each month is called the 'pot'.</li>
                <li><span className="font-semibold">Auction:</span> The pot is auctioned off to the member who is willing to take a discounted amount. The lowest bidder wins the pot for that month.</li>
                <li><span className="font-semibold">Dividend:</span> The discount amount (foreman's commission subtracted) is distributed equally among all members as a dividend.</li>
                <li><span className="font-semibold">Rotation:</span> Each member gets a chance to receive the pot amount once during the chit's duration.</li>
              </ol>
              <p>It's a great way to save for lump-sum expenses like weddings, education, or business investments.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chitFunds.map((fund) => (
          <Card key={fund.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{fund.name}</CardTitle>
                <Badge variant={fund.status === 'Open' ? 'default' : 'destructive'} className={fund.status === 'Open' ? 'bg-green-600' : ''}>
                  {fund.status}
                </Badge>
              </div>
              <CardDescription>Total value: {fund.amount}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Duration</span>
                    <span className="font-medium">{fund.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Members</span>
                    <span className="font-medium">{fund.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Monthly Contribution</span>
                    <span className="font-medium">{fund.contribution}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Dialog onOpenChange={(open) => !open && setSelectedFund(null)}>
                <DialogTrigger asChild>
                   <Button 
                    className="w-full" 
                    disabled={fund.status !== 'Open'}
                    onClick={() => setSelectedFund(fund)}
                   >
                    Join Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                   <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Confirm to Join</DialogTitle>
                    <DialogDescription>
                      You are about to join the <strong>{selectedFund?.name}</strong> chit fund.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                      <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">Chit Value</span>
                          <span className="font-bold text-lg text-primary">{selectedFund?.amount}</span>
                      </div>
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Monthly Contribution</span>
                          <span className="font-medium">{selectedFund?.contribution}</span>
                      </div>
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Duration</span>
                          <span className="font-medium">{selectedFund?.duration}</span>
                      </div>
                  </div>
                  <DialogFooter>
                      <Button type="button" variant="secondary">Cancel</Button>
                      <Button type="button">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm & Proceed
                      </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
