
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.any().optional(), // In a real app, you'd use z.instanceof(File) and handle uploads
  venue: z.string().min(1, "Venue is required."),
  date: z.date({ required_error: "A date is required." }),
  time: z.string().min(1, "Time is required."),
  makeAnnouncement: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export function AddEventForm({ onSave }: { onSave: () => void }) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            makeAnnouncement: true,
        }
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const processSubmit = (data: FormData) => {
        console.log(data);
        toast.success("New event created!");
        if (data.makeAnnouncement) {
            toast("An announcement for this event has been posted.", { icon: '📢' });
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit(processSubmit)} className="grid gap-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="image-upload">Event Image</Label>
                <Input id="image-upload" type="file" accept="image/*" {...register("image")} onChange={handleImageChange} className="pt-2"/>
                {imagePreview && <img src={imagePreview} alt="Event preview" className="mt-2 h-32 w-full rounded-md object-cover" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" {...register("title")} placeholder="e.g., Annual Ugadi Celebration" />
                {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea id="description" {...register("description")} placeholder="Describe the event in detail..." />
                {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Controller
                    name="venue"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a venue" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="svst-temple">SVST Temple</SelectItem>
                                <SelectItem value="community-hall">Community Hall</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.venue && <p className="text-destructive text-sm">{errors.venue.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Date</Label>
                     <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                     />
                     {errors.date && <p className="text-destructive text-sm">{errors.date.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" {...register("time")} />
                    {errors.time && <p className="text-destructive text-sm">{errors.time.message}</p>}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                 <Controller
                    name="makeAnnouncement"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            id="makeAnnouncement"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <Label htmlFor="makeAnnouncement" className="font-normal">
                    Make an announcement for this event
                </Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onSave}>Cancel</Button>
                <Button type="submit">Create Event</Button>
            </div>
        </form>
    );
}

