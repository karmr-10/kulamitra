import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, TrendingUp, Landmark } from "lucide-react";

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

export default function ChitFundsPage() {
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
        <Button>
          <Landmark className="mr-2 h-4 w-4" />
          Learn How it Works
        </Button>
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
              <Button className="w-full" disabled={fund.status !== 'Open'}>
                Join Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
