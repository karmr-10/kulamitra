import type { Member, Event, Announcement, GalleryItem } from '@/lib/types';

export const mockMembers: Member[] = [
  { id: '1', name: 'Srinivas Kumar', avatar: 'https://picsum.photos/seed/srinivas/100', role: 'Admin', joined: '2020-01-15' },
  { id: '2', name: 'Lakshmi Priya', avatar: 'https://picsum.photos/seed/lakshmi/100', role: 'Member', joined: '2020-02-20' },
  { id: '3', name: 'Ganesh Gupta', avatar: 'https://picsum.photos/seed/ganesh/100', role: 'Member', joined: '2021-03-10' },
  { id: '4', name: 'Padma Setty', avatar: 'https://picsum.photos/seed/padma/100', role: 'Member', joined: '2021-07-01' },
  { id: '5', name: 'Ramesh Babu', avatar: 'https://picsum.photos/seed/ramesh/100', role: 'Member', joined: '2022-05-25' },
];

export const mockEvents: Omit<Event, 'date'>[] = [
  {
    id: 'evt-01',
    title: 'Annual Ugadi Celebration',
    dateOffset: 15, // Upcoming
    description: 'Join us for a day of cultural programs, traditional food, and community bonding to celebrate Ugadi.',
    image: 'https://picsum.photos/seed/ugadi/800/400',
    attendees: 350,
    capacity: 500
  },
  {
    id: 'evt-02',
    title: 'Blood Donation Camp',
    dateOffset: 30, // Upcoming
    description: 'Be a hero, save a life. Participate in our annual blood donation drive.',
    image: 'https://picsum.photos/seed/blood-donation/800/400',
    attendees: 80,
    capacity: 150
  },
  {
    id: 'evt-03',
    title: 'Summer Kids Camp',
    dateOffset: 45, // Upcoming
    description: 'A fun-filled summer camp for kids aged 6-14, with activities like arts, crafts, and sports.',
    image: 'https://picsum.photos/seed/kids-camp/800/400',
    attendees: 120,
    capacity: 100
  },
   {
    id: 'evt-04',
    title: 'Diwali Gala Night',
    dateOffset: -60, // Past
    description: 'A spectacular evening celebrating the festival of lights with music, dance, and fireworks.',
    image: 'https://picsum.photos/seed/diwali-gala/800/400',
    attendees: 450,
    capacity: 500
  },
  {
    id: 'evt-05',
    title: 'Community Sports Day',
    dateOffset: -120, // Past
    description: 'A day of friendly competition and sportsmanship for all age groups.',
    image: 'https://picsum.photos/seed/sports-day/800/400',
    attendees: 250,
    capacity: 300
  }
];

export const mockAnnouncements: Omit<Announcement, 'date'>[] = [
  { id: 'ann-01', title: 'New ChitFund Scheme Launch', content: 'We are excited to announce a new chit fund scheme "Maha Lakshmi" starting next month. Registrations are open now.', author: 'Admin', dateOffset: -1, group: 'All' },
  { id: 'ann-02', title: 'Youth Wing Meeting', content: 'A meeting for all youth wing members is scheduled for this Saturday at 5 PM to plan upcoming activities.', author: 'Youth Coordinator', dateOffset: -3, group: 'Youth' },
  { id: 'ann-03', title: 'Cooking Competition', content: 'Calling all master chefs! The annual cooking competition will be held on May 5th. Register now to showcase your culinary skills.', author: 'Admin', dateOffset: -5, group: 'Women' }
];

export const mockGalleryItems: GalleryItem[] = [
    { id: 'gal-01', year: 2023, event: 'Diwali Celebration', description: 'Glimpses of the grand Diwali event.', imageUrl: 'https://picsum.photos/seed/diwali23/600/400' },
    { id: 'gal-02', year: 2023, event: 'New Year Party', description: 'Welcoming the new year with a bang.', imageUrl: 'https://picsum.photos/seed/newyear23/600/400' },
    { id: 'gal-03', year: 2022, event: 'Holi Festival', description: 'Colors and joy at the Holi celebration.', imageUrl: 'https://picsum.photos/seed/holi22/600/400' },
    { id: 'gal-04', year: 2022, event: 'Independence Day', description: 'Patriotic fervor at its peak.', imageUrl: 'https://picsum.photos/seed/independence22/600/400' },
    { id: 'gal-05', year: 2023, event: 'Community Picnic', description: 'A fun day out with community members.', imageUrl: 'https://picsum.photos/seed/picnic23/600/400' },
    { id: 'gal-06', year: 2021, event: 'Ganesh Chaturthi', description: 'Seeking blessings from Lord Ganesha.', imageUrl: 'https://picsum.photos/seed/ganesh21/600/400' },
];
