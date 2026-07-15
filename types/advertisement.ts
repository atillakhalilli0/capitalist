import type { BaseEntity } from "./common";

// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum AdPlacement {
  HEADER = 0,
  SIDEBAR = 1,
  IN_ARTICLE = 2,
  FOOTER = 3,
}

export interface Advertisement extends BaseEntity {
  title: string;
  targetUrl: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  isActive: boolean;
  mediaId: string;
  mediaUrl?: string;
  advertiserId: string;
}

/** Matches backend's CreateAdvertisementCommand exactly. */
export interface CreateAdvertisementRequest {
  title: string;
  targetUrl: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  mediaId: string;
  advertiserId: string;
}

/** Matches backend's UpdateAdvertisementCommand exactly (id added by the service from the URL param). */
export interface UpdateAdvertisementRequest {
  title: string;
  targetUrl: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  isActive: boolean;
  mediaId: string;
  advertiserId: string;
}

/** Matches backend's TrackAdEventRequest exactly. */
export interface TrackAdEventRequest {
  advertisementId: string;
  eventType: string;
}

export interface AdvertisementFilter {
  isActive?: boolean;
  placement?: AdPlacement;
}
