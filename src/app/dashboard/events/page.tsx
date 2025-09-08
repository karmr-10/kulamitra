
"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/lib/mock-data";
import { PlusCircle } from "lucide-react";
import { Event } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRole } from "../layout";
import toast from "react-hot-toast";
import { EventCard } from "@/components/dashboard/event-card";

const AddEventForm = lazy(() => import("@/components/dashboard/add-event-form").then(module => ({ default: module.AddEventForm })));

const getRelativeDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

type ProcessedEvent = Event & { isPast: boolean; formattedDate: string | null };

export default function EventsPage() {
  const { role } = useRole();
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  useEffect(() => {
    // Set selectedDate on client-side to avoid hydration mismatch
    setSelectedDate(new Date());

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const processedEvents = mockEvents.map(event => {
      const eventDateStr = getRelativeDate(event.dateOffset);
      const eventDate = new Date(eventDateStr);
      eventDate.setUTCHours(0,0,0,0);
      return {
        ...event,
        date: eventDateStr,
        isPast: eventDate < now,
        formattedDate: eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      };
    });
    setEvents(processedEvents);
  }, []);

  const upcomingEvents = events.filter(e => !e.isPast).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events.filter(e => e.isPast).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEventAdded = () => {
    setIsAddEventOpen(false);
    toast.success("New event created successfully!");
  }


  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="flex items-center justify-between">
            <div>
                 <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Community Events
                </h1>
                <p className="text-muted-foreground">
                    Find and join upcoming community events.
                </p>
            </div>
             {role === 'admin' && (
               <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" className="shrink-0">
                      <PlusCircle className="h-5 w-5" />
                      <span className="sr-only">New Event</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Create New Event</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new event for the community.
                        </DialogDescription>
                    </DialogHeader>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <AddEventForm onSave={handleEventAdded} />
                    </Suspense>
                </DialogContent>
              </Dialog>
            )}
        </div>
       
        <div className="mt-6 rounded-md border bg-card p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="p-3"
              classNames={{
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent/50 text-accent-foreground",
              }}
            />
        </div>
      </div>
      <div className="md:col-span-2 space-y-12">
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => <EventCard key={event.id} event={event} isPast={event.isPast} formattedDate={event.formattedDate} />)
          ) : (
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          )}
        </div>
         <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Past Events</h2>
           {pastEvents.length > 0 ? (
            pastEvents.map((event) => <EventCard key={event.id} event={event} isPast={event.isPast} formattedDate={event.formattedDate} />)
          ) : (
            <p className="text-muted-foreground">No past events to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
