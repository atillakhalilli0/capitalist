export interface Subscriber {
  id: string;
  email: string;
  fullName?: string | null;
  isConfirmed: boolean;
  createdAt: string;
}

/** Matches backend's SubscribeCommand exactly. */
export interface SubscribeRequest {
  email: string;
  fullName?: string | null;
}

/** Matches backend's ConfirmSubscriptionCommand exactly. */
export interface ConfirmSubscriptionRequest {
  token: string;
}

/** Matches backend's UnsubscribeCommand exactly. */
export interface UnsubscribeRequest {
  email: string;
  token?: string | null;
}

/** GET /api/Subscribers query params — names must match exactly. */
export interface SubscriberFilter {
  pageNumber?: number;
  pageSize?: number;
  isConfirmed?: boolean;
  searchQuery?: string;
}
