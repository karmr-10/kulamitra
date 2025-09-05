import { mockMembers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function MembersPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Community Members
          </h1>
          <p className="text-muted-foreground">
            Browse and connect with members of the community.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search members..." className="pl-10" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockMembers.map((member) => (
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
          </Card>
        ))}
      </div>
    </div>
  );
}
