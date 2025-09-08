
"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  Menu,
  Package2,
  Users,
  Shield,
  UserCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { OmIcon } from "@/components/icons/om-icon";
import { useState, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

type Role = "admin" | "member";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

export const RoleContext = createContext<RoleContextType>({
  role: "member",
  setRole: () => {},
});

export const useRole = () => useContext(RoleContext);


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [role, setRole] = useState<Role>("member");
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const mainContent = event.currentTarget as HTMLElement;
      setIsScrolled(mainContent.scrollTop > 0);
    };

    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('scroll', handleScroll);
    
    return () => {
      mainElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRoleChange = (checked: boolean) => {
    if (checked) {
      setPendingRoleChange(true);
      setIsVerificationDialogOpen(true);
    } else {
      setRole("member");
    }
  };

  const handleVerificationConfirm = () => {
    setRole("admin");
    setIsVerificationDialogOpen(false);
    setPendingRoleChange(false);
  };
  
  const handleVerificationCancel = () => {
    setIsVerificationDialogOpen(false);
    setPendingRoleChange(false);
  };


  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-card md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-headline font-semibold">
                <OmIcon className="h-6 w-6 text-primary" />
                <span className="">Kulamitra</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Ugadi Celebration RSVP closing soon.</DropdownMenuItem>
                  <DropdownMenuItem>New announcement: Blood Donation Camp.</DropdownMenuItem>
                  <DropdownMenuItem>Your ChitFund payment is due.</DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem>
                    <Link href="#" className="w-full text-center text-sm font-medium text-primary">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-1">
              <MainNav className="p-4" />
            </div>

            <div className="p-4">
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Admin View
                        </CardTitle>
                        <CardDescription>
                            Toggle to simulate admin or member view for prototyping.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <div className="flex items-center space-x-2">
                            <Switch id="role-switch"
                                checked={role === 'admin'}
                                onCheckedChange={handleRoleChange}
                            />
                            <Label htmlFor="role-switch" className="text-sm font-medium">
                                {role === 'admin' ? 'Enabled' : 'Disabled'}
                            </Label>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="font-headline text-lg">Need Help?</CardTitle>
                  <CardDescription>
                    Contact support for any issues or questions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className={cn("flex h-14 items-center gap-4 border-b bg-card px-4 transition-shadow lg:h-[60px] lg:px-6", isScrolled && "shadow-md")}>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0 bg-card">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link href="/dashboard" className="flex items-center gap-2 font-headline font-semibold">
                    <OmIcon className="h-6 w-6 text-primary" />
                    <span className="">Kulamitra</span>
                  </Link>
                </div>
                <MainNav className="p-4" />
                 <div className="p-4 mt-auto">
                    <div className="flex items-center space-x-2">
                        <Switch id="role-switch-mobile"
                            checked={role === 'admin'}
                            onCheckedChange={handleRoleChange}
                        />
                        <Label htmlFor="role-switch-mobile">
                            Enable Admin View
                        </Label>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              {/* Can add a search bar here if needed */}
            </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <AlertDialog open={isVerificationDialogOpen} onOpenChange={ (open) => { if (!open) handleVerificationCancel() }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Verification Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access administrative features, please enter your password to confirm your identity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" placeholder="Enter your password" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleVerificationCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleVerificationConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </RoleContext.Provider>
  );
}
