import BaseService from "./base.service";

import type {
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export interface MediaFile {
  id: string;

  fileName: string;

  originalFileName: string;

  url: string;

  thumbnailUrl?: string;

  mimeType: string;

  extension: string;

  size: number;

  width?: number;

  height?: number;

  createdAt: string;
}

class MediaService extends BaseService {
  getAll(params?: PaginationParams) {
    return this.get<
      PaginatedResponse<MediaFile>
    >("/media", {
      params,
    });
  }

  getById(id: string) {
    return this.get<MediaFile>(
      `/media/${id}`
    );
  }

  upload(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    return this.post<MediaFile>(
      "/media/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  }

  uploadMany(files: File[]) {
    const formData = new FormData();

    files.forEach((file) =>
      formData.append("files", file)
    );

    return this.post<MediaFile[]>(
      "/media/upload-many",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  }

  remove(id: string) {
    return super.delete<void>(
      `/media/${id}`
    );
  }
}

export const mediaService =
  new MediaService();