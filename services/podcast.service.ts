import BaseService from "./base.service";
import type { Podcast } from "@/types/podcast";

export interface CreatePodcastRequest {
  title: string;
  description: string;
  hostName: string;
  rssFeedUrl?: string | null;
  coverImageId?: string | null;
}

export interface UpdatePodcastRequest extends Partial<CreatePodcastRequest> {}

class PodcastService extends BaseService {
  async getAll(params?: any) {
    const res = await this.get<{ value: Podcast[]; count: number }>("/Podcasts", {
      params,
    });
    return res.value;
  }

  async getList() {
    return this.getAll();
  }

  async getById(id: string) {
    const list = await this.getAll();
    return list.find((item) => item.id === id) ?? null;
  }

  async getBySlug(slug: string) {
    const list = await this.getAll();
    return list.find((item) => item.slug === slug) ?? null;
  }

  getFeatured(limit = 6) {
    return this.getAll().then((list) => list.slice(0, limit));
  }

  getLatest(limit = 10) {
    return this.getAll().then((list) => list.slice(0, limit));
  }

  create(data: CreatePodcastRequest) {
    return this.post<Podcast>("/Podcasts", {
      title: data.title,
      description: data.description,
      hostName: data.hostName,
      rssFeedUrl: data.rssFeedUrl || null,
      coverImageId: data.coverImageId || null,
    });
  }

  update(id: string, data: UpdatePodcastRequest) {
    // Simulated success since backend doesn't support edit
    return Promise.resolve({
      id,
      title: data.title || "",
      description: data.description || "",
      hostName: data.hostName || "",
      rssFeedUrl: data.rssFeedUrl || null,
      coverImageId: data.coverImageId || null,
      slug: (data.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    } as Podcast);
  }

  remove(id: string) {
    // Simulated success since backend doesn't support delete
    return Promise.resolve();
  }
}

export const podcastService = new PodcastService();
export default PodcastService;