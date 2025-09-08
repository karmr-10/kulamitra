
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Users, ChevronLeft, MapPin } from "lucide-react";
import { FamilyTree } from "@/components/dashboard/family-tree";
import { Skeleton } from "@/components/ui/skeleton";

interface MemberData {
  name: string;
  fatherName: string;
  motherName: string;
  rashi?: string;
  nakshthram?: string;
  gothram?: string;
}

interface FamilyData {
  familyName: string;
  familyHead: string;
  address: string;
  familyMembers: MemberData[];
}

export default function FamilyPreviewPage() {
  const router = useRouter();
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = localStorage.getItem("newFamilyData");
      if (data) {
        setFamilyData(JSON.parse(data));
      } else {
        // Handle case where there's no data, maybe redirect
        router.push("/dashboard/members");
      }
    } catch (error) {
      console.error("Failed to parse family data from localStorage", error);
      router.push("/dashboard/members");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !familyData) {
    return (
        <div>
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <div className="grid gap-8 md:grid-cols-2">
                <Skeleton className="h-96" />
                <div className="space-y-8">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Family Preview</h1>
            <p className="text-muted-foreground">A summary of the newly added family details.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard/members')}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Members
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Users className="h-6 w-6 text-primary" />
                    Family Tree Visualization
                </CardTitle>
                <CardDescription>A pictorial representation of the {familyData.familyName} family.</CardDescription>
            </CardHeader>
            <CardContent>
                <FamilyTree familyData={familyData} />
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <User className="h-6 w-6 text-primary" />
                Family Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Family / House Name</span>
                <span className="font-semibold">{familyData.familyName}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Head of Family</span>
                <span className="font-semibold">{familyData.familyHead}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Members</span>
                <span className="font-semibold">{familyData.familyMembers.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Home className="h-6 w-6 text-primary" />
                Address & Locality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">{familyData.address}</p>
            <Button variant="outline" className="w-full" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(familyData.address)}`, '_blank')}>
                <MapPin className="mr-2 h-4 w-4"/>
                View on Google Maps
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
