
"use client";

import { useState, useEffect, useRef } from "react";
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
import { CheckCircle, Users, MapPin, HandHelping, QrCode, Camera, Trash2, Edit } from "lucide-react";
import { Event } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/app/dashboard/layout";
import toast from "react-hot-toast";

export function EventCard({ event, isPast, formattedDate }: { event: Event, isPast: boolean, formattedDate: string | null }) {
    const { role } = useRole();
    const [rsvpd, setRsvpd] = useState(false);
    const [volunteering, setVolunteering] = useState(false);
    const [dialogOpen, setDialogOpen] = useState<"rsvp" | "track" | null>(null);

    const { toast: shadToast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);


    useEffect(() => {
      const getCameraPermission = async () => {
        if (dialogOpen === 'track') {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Camera API not available in this browser.");
            setHasCameraPermission(false);
            return;
          }
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            shadToast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to track attendance.',
            });
          }
        }
      };
      
      getCameraPermission();

      return () => {
         if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }, [dialogOpen, shadToast]);


    return (
        <Card key={event.id} className="overflow-hidden">
        <div className="relative h-48 w-full">
            <Image
            src={event.image}
            alt={event.title}
            fill
            style={{objectFit: 'cover'}}
            className={isPast ? "grayscale" : ""}
            data-ai-hint={
              event.title.toLowerCase().includes('ugadi') ? 'indian festival' :
              event.title.toLowerCase().includes('blood donation') ? 'charity event' :
              event.title.toLowerCase().includes('kids camp') ? 'children playing' :
              event.title.toLowerCase().includes('diwali') ? 'diwali lights' :
              'community event'
            }
            />
            <div className="absolute inset-0 bg-black/30" />
            <Badge variant="secondary" className="absolute right-4 top-4">
            {formattedDate || '...'}
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
                    <span>{event.attendees + (rsvpd ? 1 : 0)} / {event.capacity} attending</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Community Hall</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex gap-2">
            {!isPast && role === 'member' && (
                <>
                <Dialog onOpenChange={(open) => setDialogOpen(open ? "rsvp" : null)}>
                  <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90" variant={rsvpd ? "secondary" : "default"}>
                          <CheckCircle className="mr-2 h-4 w-4" /> {rsvpd ? "RSVP'd" : "RSVP"}
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                          <DialogTitle className="font-headline">RSVP Confirmation</DialogTitle>
                          <DialogDescription>
                              You are about to RSVP for: <strong>{event.title}</strong>
                          </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col items-center justify-center space-y-4">
                          <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event.id}-${Date.now()}`} alt="QR Code" width={150} height={150} />
                          <p className="text-center text-sm text-muted-foreground">Show this QR code at the event entrance for check-in.</p>
                      </div>
                      <DialogFooter className="sm:justify-center">
                          <Button type="button" variant="default" onClick={() => { setRsvpd(true); setDialogOpen(null); shadToast({ title: "RSVP Successful!", description: `See you at ${event.title}!`}) }}>
                              Confirm RSVP
                          </Button>
                      </DialogFooter>
                  </DialogContent>
                </Dialog>


                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant={volunteering ? "secondary" : "outline"}>
                            <HandHelping className="mr-2 h-4 w-4" /> {volunteering ? "Volunteering" : "Volunteer"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Volunteer for {event.title}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to volunteer for this event? Your help is greatly appreciated and makes our community stronger.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Drop</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {setVolunteering(true); shadToast({title: "Thank you for volunteering!", description: "We've added you to the volunteer list."})}}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </>
            )}

            {!isPast && role === 'admin' && (
                <>
                    <Button variant="outline" onClick={() => toast.error("Editing events is not yet implemented.")}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will permanently delete the event.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Dialog onOpenChange={(open) => setDialogOpen(open ? "track" : null)}>
                        <DialogTrigger asChild>
                           <Button variant="outline" className="ml-auto">
                                <QrCode className="mr-2 h-4 w-4" /> Track Attendance
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Track Event Attendance</DialogTitle>
                                 <DialogDescription>
                                    Position the guest's QR code within the frame to scan and track attendance.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                               <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                               <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-2/3 w-2/3 rounded-lg border-4 border-dashed border-primary" />
                               </div>
                               {hasCameraPermission === false && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                                       <Camera className="h-12 w-12 text-destructive mb-4" />
                                        <h3 className="text-lg font-bold">Camera Access Required</h3>
                                        <p className="text-center text-sm">Please grant camera permissions in your browser settings to use the QR scanner.</p>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
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
