import BaseService from "./base.service";
import type {
  Podcast,
  PodcastEpisode,
  CreatePodcastRequest,
  UpdatePodcastRequest,
  CreateEpisodeRequest,
} from "@/types/podcast";

class PodcastService extends BaseService {
  getAll() {
    return this.get<Podcast[]>("/Podcasts");
  }

  getById(id: string) {
    return this.get<Podcast>(`/Podcasts/${id}`);
  }

  create(data: CreatePodcastRequest) {
    return this.post<Podcast>("/Podcasts", data);
  }

  update(id: string, data: UpdatePodcastRequest) {
    return this.put<Podcast>(`/Podcasts/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Podcasts/${id}`);
  }

  addEpisode(podcastId: string, data: CreateEpisodeRequest) {
    return this.post<PodcastEpisode>(`/Podcasts/${podcastId}/episodes`, {
      podcastId,
      ...data,
    });
  }
}

export const podcastService = new PodcastService();
export default PodcastService;
