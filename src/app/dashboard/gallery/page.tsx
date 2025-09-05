import Image from "next/image";
import { mockGalleryItems } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function GalleryPage() {
  const years = [...new Set(mockGalleryItems.map(item => item.year))];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Event Gallery
          </h1>
          <p className="text-muted-foreground">
            A visual journey through our community's cherished moments.
          </p>
        </div>
        <div className="w-[180px]">
          <Select defaultValue={years[0].toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockGalleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <CardHeader className="p-0">
               <AspectRatio ratio={4 / 3}>
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="community photo"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-headline text-lg font-semibold">{item.event}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
             <CardFooter>
                <p className="text-xs font-medium text-muted-foreground">{item.year}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}