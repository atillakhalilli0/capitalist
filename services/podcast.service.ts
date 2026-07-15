import BaseService from "./base.service";
import type {
  Podcast,
  PaginatedResponse,
  PaginationParams,
} from "@/types";

export interface CreatePodcastRequest {
  title: string;
  description: string;
  hostName: string;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
}

export interface UpdatePodcastRequest
  extends Partial<CreatePodcastRequest> {}

class PodcastService extends BaseService {
  async getPublished(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Podcast>> {
    return this.get<PaginatedResponse<Podcast>>(
      "/Podcasts",
      {
        params,
      }
    );
  }

  async getAll(params?: PaginationParams) {
    return this.getPublished(params);
  }

  async getList() {
    const res = await this.getPublished();
    return res.items;
  }

  async getById(id: string) {
    return this.get<Podcast>(`/Podcasts/${id}`);
  }

  async getBySlug(slug: string) {
    return this.get<Podcast>(`/Podcasts/slug/${slug}`);
  }

  create(data: CreatePodcastRequest) {
    return this.post<Podcast>("/Podcasts", data);
  }

  update(id: string, data: UpdatePodcastRequest) {
    return this.put<Podcast>(`/Podcasts/${id}`, data);
  }

  remove(id: string) {
    return this.delete(`/Podcasts/${id}`);
  }
}

export const podcastService = new PodcastService();
export default podcastService;