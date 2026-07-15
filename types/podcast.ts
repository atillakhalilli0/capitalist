export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;

  hostName?: string | null;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;

  excerpt?: string;
  summary?: string;

  coverImage?: string;
  coverImageUrl?: string;

  guest?: string;
  host?: string;
  duration?: string;

  author?: {
    id: string;
    fullName: string;
    avatar?: string | null;
  };

  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  applePodcastUrl?: string;

  publishedAt?: string;
  featured?: boolean;

  categories?: string[];
  tags?: string[];
}