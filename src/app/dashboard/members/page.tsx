
"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { mockMembers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, CheckCircle, Edit, Trash2 } from "lucide-react";
import { Member } from "@/lib/types";
import { useRole } from "../layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import toast from "react-hot-toast";

const AddMemberForm = lazy(() => import("@/components/dashboard/add-member-form").then(module => ({ default: module.AddMemberForm })));

export default function MembersPage() {
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const results = mockMembers.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(results);
  }, [searchTerm]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Community Members
          </h1>
          <p className="text-muted-foreground">
            Browse and connect with members of the community.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search members..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            {role === 'admin' && (
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        New Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                          <DialogTitle className="font-headline text-2xl">Add New Community Member</DialogTitle>
                          <DialogDescription>
                              Enter the details for the new member and their family. Click save when you're done.
                          </DialogDescription>
                      </DialogHeader>
                      <Suspense fallback={<div>Loading form...</div>}>
                        <AddMemberForm onSave={() => setIsFormOpen(false)} />
                      </Suspense>
                  </DialogContent>
                </Dialog>
            )}
        </div>
      </div>

      <div className="mt-4 relative w-full max-w-sm md:hidden">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
            placeholder="Search members..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person photo" />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-headline mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="mt-2 text-xs text-muted-foreground">Joined: {member.joined}</p>
            </CardContent>
            {role === 'admin' && member.role !== 'Admin' && (
                <CardFooter className="flex justify-center gap-2 p-4 pt-0">
                    <Button variant="outline" size="sm" onClick={() => toast.success(`${member.name} has been approved.`)}><CheckCircle className="mr-1 h-4 w-4" /> Approve</Button>
                    <Button variant="outline" size="sm" onClick={() => toast.error(`Editing ${member.name} is not yet implemented.`)}><Edit className="mr-1 h-4 w-4" /> Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => toast.success(`${member.name} has been removed.`)}><Trash2 className="mr-1 h-4 w-4" /> Remove</Button>
                </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
