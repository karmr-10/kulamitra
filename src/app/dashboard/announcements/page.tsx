
"use client";

import { useState, useEffect } from "react";
import { mockAnnouncements } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Megaphone, Edit, Trash2 } from "lucide-react";
import { Announcement } from "@/lib/types";
import { useRole } from "../layout";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const getRelativeDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function AnnouncementsPage() {
  const { role } = useRole();
  const [announcements, setAnnouncements] = useState<Omit<Announcement, 'dateOffset'>[]>([]);

  useEffect(() => {
    const announcementsWithRelativeDates = mockAnnouncements.map(announcement => ({
      ...announcement,
      date: formatRelativeDate(getRelativeDate(announcement.dateOffset))
    }));
    setAnnouncements(announcementsWithRelativeDates);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Megaphone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              Announcements
            </h1>
            <p className="text-muted-foreground">
              Latest news and updates from the community admin.
            </p>
          </div>
        </div>
        {role === 'admin' && (
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Announcement
            </Button>
        )}
      </div>

      <div className="mt-8 grid gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl">{announcement.title}</CardTitle>
                <Badge variant={announcement.group === "All" ? "default" : "secondary"}>
                  {announcement.group}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 pt-1">
                <span>By {announcement.author}</span>
                <span className="text-xs text-muted-foreground">&bull;</span>
                <time>{announcement.date}</time>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-body text-foreground/90">{announcement.content}</p>
            </CardContent>
            {role === 'admin' && (
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will permanently delete the announcement.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
