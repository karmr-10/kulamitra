export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'Member' | 'Admin';
  joined: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  image: string;
  attendees: number;
  capacity: number;
}

export interface Announcement {
  id:string;
  title: string;
  content: string;
  author: string;
  date: string;
  group: 'All' | 'Youth' | 'Women';
}

export interface GalleryItem {
  id: string;
  year: number;
  event: string;
  description: string;
  imageUrl: string;
}
