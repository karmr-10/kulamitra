
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CalendarCheck2,
  Megaphone,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAnnouncements, mockEvents } from "@/lib/mock-data";
import { Event, Announcement } from "@/lib/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRole } from "./layout";
import { Skeleton } from "@/components/ui/skeleton";

const getRelativeDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

type AnnouncementWithDate = Omit<Announcement, 'dateOffset' | 'date'> & { date: string | null };

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const { role } = useRole();
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [upcomingEventDateString, setUpcomingEventDateString] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<AnnouncementWithDate[]>(
      mockAnnouncements.map(a => ({...a, date: null}))
  );

  useEffect(() => {
    const eventsWithRelativeDates = mockEvents.map(event => ({
      ...event,
      date: getRelativeDate(event.dateOffset)
    }));
    const sortedUpcomingEvent = eventsWithRelativeDates
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    
    if (sortedUpcomingEvent) {
        setUpcomingEvent(sortedUpcomingEvent);
        const eventDate = new Date(sortedUpcomingEvent.date);
        eventDate.setUTCHours(0,0,0,0);
        setUpcomingEventDateString(eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }));
    }

    const announcementsWithRelativeDates = mockAnnouncements.map(announcement => ({
      ...announcement,
      date: formatRelativeDate(getRelativeDate(announcement.dateOffset))
    }));
    setAnnouncements(announcementsWithRelativeDates);
  }, []);
  
  const welcomeMessage = () => {
    if (loading) {
      return <Skeleton className="h-8 w-64" />;
    }
    if (user) {
      const name = user.displayName || 'Friend';
      if (role === 'admin') {
          return `Welcome, Admin ${name}!`;
      }
      return `Welcome back, ${name}!`;
    }
    return "Welcome to your Dashboard!";
  }
  
  const welcomeDescription = () => {
    if (role === 'admin') {
      return "Here's an overview of your community's activities. You have administrative access.";
    }
    return "Here's what's happening in your community.";
  }


  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{welcomeMessage()}</h1>
        <p className="text-muted-foreground">{welcomeDescription()}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Event
            </CardTitle>
            <CalendarCheck2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{upcomingEvent?.title || 'Loading...'}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingEventDateString || '...'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3</div>
            <p className="text-xs text-muted-foreground">
              In the last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+52</div>
            <p className="text-xs text-muted-foreground">
              For the next community festival
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="font-headline">AI Community Summary</CardTitle>
              <CardDescription>
                A quick-read summary of recent community activities, powered by AI.
              </CardDescription>
            </div>
            {role === 'admin' && (
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/ai-summary">
                  Generate
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm prose-p:font-body text-foreground max-w-none rounded-lg border bg-muted/50 p-4">
              <p>Hello Kulamitra family! It's been a vibrant week. Our annual Ugadi celebrations were a grand success, with over 500 members enjoying the cultural programs and the special feast. A big thank you to all the volunteers who made it happen!</p>
              <p>On the announcement front, please note the upcoming blood donation camp on April 28th. We encourage all eligible members to participate. Also, registrations for the summer kids camp are now open. You can find the details in the events section.</p>
              <p>Lastly, we're exploring a new ChitFund scheme for members. More details will be shared soon after the committee meeting next week. Your participation and feedback are always welcome as we work together to strengthen our community bonds.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Announcements</CardTitle>
            <CardDescription>
                The latest 3 announcements from the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage data-ai-hint="male avatar" src="https://picsum.photos/seed/announce-author/100" alt="Avatar" />
                  <AvatarFallback>{announcement.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {announcement.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {announcement.content}
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground whitespace-nowrap">{announcement.date || '...'}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
