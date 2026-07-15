import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type { MediaFile, MediaFilter } from "@/types/media";

class MediaService extends BaseService {
  getAll(params?: MediaFilter) {
    return this.get<PagedResult<MediaFile>>("/Media", { params });
  }

  getById(id: string) {
    return this.get<MediaFile>(`/Media/${id}`);
  }

  upload(file: File, altText?: string) {
    const formData = new FormData();
    formData.append("file", file);
    if (altText) formData.append("altText", altText);

    return this.post<MediaFile>("/Media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  uploadMany(files: File[]) {
    return Promise.all(files.map((file) => this.upload(file)));
  }

  remove(id: string) {
    return this.delete<void>(`/Media/${id}`);
  }
}

export const mediaService = new MediaService();
export default MediaService;
