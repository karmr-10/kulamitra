
"use client";

import { useState, useEffect } from "react";
import { mockAnnouncements } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Megaphone } from "lucide-react";
import { Announcement } from "@/lib/types";

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
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
