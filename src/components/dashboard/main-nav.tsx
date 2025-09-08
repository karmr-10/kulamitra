
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  ImageIcon,
  HeartHandshake,
  Landmark,
  Bot,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/app/dashboard/layout";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/members", label: "Members", icon: Users },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone, badge: 3 },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/donate", label: "Donate", icon: HeartHandshake },
  { href: "/dashboard/chit-funds", label: "ChitFunds", icon: Landmark },
  { href: "/dashboard/ai-summary", label: "AI Summary", icon: Bot, adminOnly: true },
];

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { role } = useRole();

  return (
    <nav
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {navItems.map((item) => {
        if (item.adminOnly && role !== 'admin') {
          return null;
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
              pathname === item.href && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {item.badge}
              </Badge>
            )}
            {item.adminOnly && (
               <Badge variant="outline" className="text-xs">Admin</Badge>
            )}
          </Link>
        )
      })}
    </nav>
  );
}
