import type { BaseEntity } from "./common";

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
}

/** Matches backend's CreateTagCommand exactly. */
export interface CreateTagRequest {
  name: string;
}

/** Matches backend's UpdateTagCommand exactly (id added by the service from the URL param). */
export interface UpdateTagRequest {
  name: string;
}
