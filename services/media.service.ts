import BaseService from "./base.service";
import type { PaginatedResponse, PaginationParams } from "@/types/api";

export interface MediaFile {
  id: string;
  url: string;
  altText?: string;
  fileName?: string;
  size?: number;
  createdAt?: string;
}

class MediaService extends BaseService {
  getAll(params?: PaginationParams) {
    // Stub implementation since backend doesn't support listing media
    return Promise.resolve({
      items: [] as MediaFile[],
      pageNumber: 1,
      pageSize: params?.pageSize ?? 10,
      totalCount: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as PaginatedResponse<MediaFile>);
  }

  getById(id: string) {
    // Stub implementation since backend doesn't support reading individual media resource
    return Promise.resolve({
      id,
      url: "",
      altText: "",
    } as MediaFile);
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", file.name);

    return this.post<MediaFile>(
      "/Media/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  uploadMany(files: File[]) {
    // Backend only supports upload, so we map files sequentially or simulate
    return Promise.all(files.map((file) => this.upload(file)));
  }

  remove(id: string) {
    // Stub implementation since backend doesn't support deleting media
    return Promise.resolve();
  }
}

export const mediaService = new MediaService();
export default MediaService;