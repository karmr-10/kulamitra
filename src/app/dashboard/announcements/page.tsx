
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
import { PlusCircle, Megaphone, Edit, Trash2, CalendarIcon } from "lucide-react";
import { Announcement } from "@/lib/types";
import { useRole } from "../layout";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

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
  const [announcements, setAnnouncements] = useState<Omit<Announcement, 'dateOffset' | 'date'>[] & { date: string | null }>(
    mockAnnouncements.map(a => ({...a, date: null}))
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const handleCreate = () => {
    toast.success("New announcement created successfully (demo)!");
  }

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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Create New Announcement</DialogTitle>
                    <DialogDescription>
                        Draft and publish a new announcement to the community.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Announcement Title</Label>
                        <Input id="title" placeholder="e.g., Annual General Meeting" className="text-lg"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Provide a detailed description of the announcement..." rows={5}/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="date">Date</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" type="time" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="add-to-calendar" />
                        <Label htmlFor="add-to-calendar" className="font-normal">
                           Include "Add to Calendar" option for members
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" size="lg" onClick={handleCreate}>Create Announcement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <time>{announcement.date || '...'}</time>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-body text-foreground/90">{announcement.content}</p>
            </CardContent>
            {role === 'admin' && (
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => toast.error("Editing announcements is not yet implemented.")}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
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

    