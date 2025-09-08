
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, TrendingUp, Landmark, CheckCircle, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRole } from "../layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const initialChitFunds = [
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

type ChitFund = typeof initialChitFunds[0];

function AddChitFundForm({ onAdd }: { onAdd: (newFund: Omit<ChitFund, 'id' | 'status'>) => void }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [members, setMembers] = useState('');
    const [contribution, setContribution] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount || !duration || !members || !contribution) {
            toast.error("Please fill out all fields.");
            return;
        }
        onAdd({ name, amount: `₹ ${parseInt(amount, 10).toLocaleString('en-IN')}`, duration: `${duration} Months`, members: parseInt(members, 10), contribution: `₹ ${parseInt(contribution, 10).toLocaleString('en-IN')}` });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="fund-name">ChitFund Name</Label>
                <Input id="fund-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Vaibhav Lakshmi Scheme" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="fund-amount">Total Amount (₹)</Label>
                    <Input id="fund-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 500000" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="fund-duration">Duration (Months)</Label>
                    <Input id="fund-duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 25" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="fund-members">Number of Members</Label>
                    <Input id="fund-members" type="number" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="e.g., 25" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fund-contribution">Monthly Contribution (₹)</Label>
                    <Input id="fund-contribution" type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="e.g., 20000" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Add Scheme</Button>
            </DialogFooter>
        </form>
    );
}

export default function ChitFundsPage() {
  const { role } = useRole();
  const [chitFunds, setChitFunds] = useState<ChitFund[]>(initialChitFunds);
  const [selectedFund, setSelectedFund] = useState<ChitFund | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddFund = (newFundData: Omit<ChitFund, 'id' | 'status'>) => {
    const newFund: ChitFund = {
        id: `cf-${Date.now()}`,
        ...newFundData,
        status: 'Open'
    };
    setChitFunds(prev => [newFund, ...prev]);
    toast.success(`Successfully added "${newFund.name}"! A notification would be sent to all members.`);
    setIsAddDialogOpen(false);
  };
  
  const handleDeleteFund = (fundId: string) => {
    setChitFunds(prev => prev.filter(fund => fund.id !== fundId));
    toast.success("ChitFund scheme deleted. A notification would be sent to all members.");
  }


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
        <div className="flex items-center gap-4">
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

             {role === 'admin' && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Scheme
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">Create New ChitFund Scheme</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to add a new scheme. It will be visible to all members.
                            </DialogDescription>
                        </DialogHeader>
                        <AddChitFundForm onAdd={handleAddFund} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chitFunds.map((fund) => (
          <Card key={fund.id} className="flex flex-col group">
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
            <CardFooter className="flex items-center gap-2">
              {role === 'member' && (
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
              )}
               {role === 'admin' && (
                 <>
                    <Button variant="outline" className="w-full">Edit Scheme</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the <strong>{fund.name}</strong> scheme and notify members.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteFund(fund.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                 </>
               )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
