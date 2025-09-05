import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/lib/mock-data";
import { CheckCircle, Users, MapPin, HandHelping, QrCode } from "lucide-react";

function EventCard({ event }: { event: typeof mockEvents[0] }) {
    const isPast = event.date < new Date();
    return (
        <Card key={event.id} className="overflow-hidden">
        <div className="relative h-48 w-full">
            <Image
            src={event.image}
            alt={event.title}
            fill
            objectFit="cover"
            className={isPast ? "grayscale" : ""}
            data-ai-hint="community event"
            />
            <div className="absolute inset-0 bg-black/30" />
            <Badge variant="secondary" className="absolute right-4 top-4">
            {event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Badge>
        </div>
        <CardHeader>
            <CardTitle className="font-headline">{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} / {event.capacity} attending</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Community Hall</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex gap-2">
            {!isPast && (
                <>
                <Button className="bg-primary hover:bg-primary/90">
                    <CheckCircle className="mr-2 h-4 w-4" /> RSVP
                </Button>
                <Button variant="secondary">
                    <HandHelping className="mr-2 h-4 w-4" /> Volunteer
                </Button>
                <Button variant="outline" className="ml-auto">
                    <QrCode className="mr-2 h-4 w-4" /> Track Attendance
                </Button>
                </>
            )}
            {isPast && (
                <Button variant="outline" disabled>
                    View Gallery
                </Button>
            )}
        </CardFooter>
        </Card>
    );
}

export default function EventsPage() {
  const now = new Date();
  const upcomingEvents = mockEvents.filter(event => event.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime());
  const pastEvents = mockEvents.filter(event => event.date < now).sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Community Events
        </h1>
        <p className="text-muted-foreground">
          Find and join upcoming community events.
        </p>
        <Card className="mt-6">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={new Date()}
              className="p-3"
              classNames={{
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent/50 text-accent-foreground",
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 space-y-12">
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          )}
        </div>
         <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Past Events</h2>
           {pastEvents.length > 0 ? (
            pastEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-muted-foreground">No past events to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
