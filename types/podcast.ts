import type { BaseEntity } from "./common";

export interface Podcast extends BaseEntity {
  title: string;
  slug: string;
  description?: string | null;
  hostName?: string | null;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
  coverImageUrl?: string | null;
  isActive: boolean;
}

export interface PodcastEpisode extends BaseEntity {
  podcastId: string;
  title: string;
  description?: string | null;
  episodeNumber: number;
  durationSeconds?: number | null;
  audioMediaId: string;
  audioUrl?: string | null;
  isPublished: boolean;
}

/** Matches backend's CreatePodcastCommand exactly. */
export interface CreatePodcastRequest {
  title: string;
  description?: string | null;
  hostName?: string | null;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
}

/** Matches backend's UpdatePodcastCommand exactly (id added by the service from the URL param). */
export interface UpdatePodcastRequest {
  title: string;
  description?: string | null;
  hostName?: string | null;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
  isActive: boolean;
}

/** Matches backend's CreateEpisodeCommand exactly (podcastId is also set from the URL param by the service). */
export interface CreateEpisodeRequest {
  title: string;
  description?: string | null;
  episodeNumber: number;
  durationSeconds?: number | null;
  audioMediaId: string;
  publishImmediately: boolean;
}
