
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters."),
  motherName: z.string().min(2, "Mother's name must be at least 2 characters."),
  rashi: z.string().optional(),
  nakshthram: z.string().optional(),
  gothram: z.string().optional(),
});

const formSchema = z.object({
  familyName: z.string().min(2, "Family name is required."),
  familyHead: z.string().min(2, "Family head is required."),
  isVyshya: z.boolean().default(false),
  address: z.string().min(10, "Address must be at least 10 characters."),
  familyMembers: z.array(memberSchema).min(1, "At least one family member is required."),
});

type FormData = z.infer<typeof formSchema>;

export function AddMemberForm({ onSave }: { onSave: () => void }) {
  const router = useRouter();
  const [numPeople, setNumPeople] = useState(1);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyMembers: [{ name: "", fatherName: "", motherName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const handleNumPeopleChange = (value: string) => {
    const newSize = parseInt(value, 10);
    const currentSize = fields.length;
    setNumPeople(newSize);

    if (newSize > currentSize) {
      for (let i = 0; i < newSize - currentSize; i++) {
        append({ name: "", fatherName: "", motherName: "" });
      }
    } else if (newSize < currentSize) {
      for (let i = 0; i < currentSize - newSize; i++) {
        remove(newSize + i);
      }
    }
  };

  const processSubmit = (data: FormData) => {
    console.log(data);
    // In a real app, you'd save this to a DB and get an ID.
    // For this prototype, we'll save to localStorage to pass to the preview page.
    try {
      localStorage.setItem('newFamilyData', JSON.stringify(data));
      toast.success("New member and family added successfully!");
      onSave(); // This will close the dialog
      router.push('/dashboard/members/preview');
    } catch (error) {
      toast.error("Could not save family data for preview.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="grid gap-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="familyHead">Family Head</Label>
          <Input id="familyHead" {...register("familyHead")} />
          {errors.familyHead && <p className="text-destructive text-sm">{errors.familyHead.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="familyName">Family Name / House Name</Label>
          <Input id="familyName" {...register("familyName")} />
           {errors.familyName && <p className="text-destructive text-sm">{errors.familyName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Residential Address</Label>
        <Textarea id="address" {...register("address")} />
        {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
            name="isVyshya"
            control={control}
            render={({ field }) => (
                <Checkbox
                    id="isVyshya"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
            )}
        />
        <Label htmlFor="isVyshya" className="font-normal">
          This family belongs to the Kulam/Arya Vyshya community.
        </Label>
      </div>

      <div className="space-y-2">
        <Label>Number of People in Family</Label>
        <Select onValueChange={handleNumPeopleChange} defaultValue={numPeople.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Select number of members" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10).keys()].map((i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
       {errors.familyMembers && <p className="text-destructive text-sm">{errors.familyMembers.message}</p>}

      <Separator className="my-4" />

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 rounded-lg border p-4">
          <h3 className="font-headline text-lg font-semibold">
            Family Member #{index + 1}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input id={`name-${index}`} {...register(`familyMembers.${index}.name`)} />
               {errors.familyMembers?.[index]?.name && <p className="text-destructive text-sm">{errors.familyMembers[index]?.name?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`father-${index}`}>Father's Name</Label>
              <Input id={`father-${index}`} {...register(`familyMembers.${index}.fatherName`)} />
               {errors.familyMembers?.[index]?.fatherName && <p className="text-destructive text-sm">{errors.familyMembers[index]?.fatherName?.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor={`mother-${index}`}>Mother's Name</Label>
              <Input id={`mother-${index}`} {...register(`familyMembers.${index}.motherName`)} />
               {errors.familyMembers?.[index]?.motherName && <p className="text-destructive text-sm">{errors.familyMembers[index]?.motherName?.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor={`rashi-${index}`}>Rashi</Label>
              <Input id={`rashi-${index}`} {...register(`familyMembers.${index}.rashi`)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor={`nakshthram-${index}`}>Nakshthram</Label>
              <Input id={`nakshthram-${index}`} {...register(`familyMembers.${index}.nakshthram`)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor={`gothram-${index}`}>Gothram</Label>
              <Input id={`gothram-${index}`} {...register(`familyMembers.${index}.gothram`)} />
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSave}>Cancel</Button>
          <Button type="submit">Save Member</Button>
      </div>
    </form>
  );
}

export { AddMemberForm };
