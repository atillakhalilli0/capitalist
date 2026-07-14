import BaseService from "./base.service";

import type { Podcast } from "@/types/podcast";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export interface CreatePodcastRequest {
  title: string;
  slug: string;

  description?: string;

  excerpt?: string;

  audioUrl: string;

  coverImage?: string;

  duration?: number;

  publishedAt?: string;

  isFeatured?: boolean;
}

export interface UpdatePodcastRequest
  extends Partial<CreatePodcastRequest> {}

class PodcastService extends BaseService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Podcast>>(
      "/podcasts",
      {
        params,
      }
    );
  }

  getFeatured(limit = 6) {
    return this.get<Podcast[]>(
      "/podcasts/featured",
      {
        params: {
          limit,
        },
      }
    );
  }

  getLatest(limit = 10) {
    return this.get<Podcast[]>(
      "/podcasts/latest",
      {
        params: {
          limit,
        },
      }
    );
  }

  getById(id: string) {
    return this.get<Podcast>(
      `/podcasts/${id}`
    );
  }

  getBySlug(slug: string) {
    return this.get<Podcast>(
      `/podcasts/slug/${slug}`
    );
  }

  create(data: CreatePodcastRequest) {
    return this.post<Podcast>(
      "/podcasts",
      data
    );
  }

  update(
    id: string,
    data: UpdatePodcastRequest
  ) {
    return this.put<Podcast>(
      `/podcasts/${id}`,
      data
    );
  }

  remove(id: string) {
    return super.delete<void>(
      `/podcasts/${id}`
    );
  }
}

export const podcastService =
  new PodcastService();