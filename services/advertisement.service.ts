import BaseService from "./base.service";
import type {
  Advertisement,
  AdvertisementFilter,
  CreateAdvertisementRequest,
  UpdateAdvertisementRequest,
  TrackAdEventRequest,
} from "@/types/advertisement";

class AdvertisementService extends BaseService {
  getAll(params?: AdvertisementFilter) {
    return this.get<Advertisement[]>("/Advertisements", { params });
  }

  getById(id: string) {
    return this.get<Advertisement>(`/Advertisements/${id}`);
  }

  create(data: CreateAdvertisementRequest) {
    return this.post<Advertisement>("/Advertisements", data);
  }

  update(id: string, data: UpdateAdvertisementRequest) {
    return this.put<Advertisement>(`/Advertisements/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Advertisements/${id}`);
  }

  trackEvent(data: TrackAdEventRequest) {
    return this.post<void>("/Advertisements/event", data);
  }
}

export const advertisementService = new AdvertisementService();
export default AdvertisementService;
