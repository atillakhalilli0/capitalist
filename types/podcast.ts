export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  
  // Backend properties
  hostName?: string | null;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
  
  // Compatibility properties
  excerpt?: string;
  coverImage?: string;
  guest?: string;
  host?: string;
  duration?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  applePodcastUrl?: string;
  publishedAt?: string;
  featured?: boolean;
  categories?: string[];
  tags?: string[];
}