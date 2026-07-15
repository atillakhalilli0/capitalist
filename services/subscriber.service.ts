import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type {
  Subscriber,
  SubscriberFilter,
  SubscribeRequest,
  ConfirmSubscriptionRequest,
  UnsubscribeRequest,
} from "@/types/subscriber";

class SubscriberService extends BaseService {
  getAll(params?: SubscriberFilter) {
    return this.get<PagedResult<Subscriber>>("/Subscribers", { params });
  }

  subscribe(data: SubscribeRequest) {
    return this.post<Subscriber>("/Subscribers", data);
  }

  confirm(data: ConfirmSubscriptionRequest) {
    return this.post<void>("/Subscribers/confirm", data);
  }

  unsubscribe(data: UnsubscribeRequest) {
    return this.post<void>("/Subscribers/unsubscribe", data);
  }

  remove(id: string) {
    return this.delete<void>(`/Subscribers/${id}`);
  }
}

export const subscriberService = new SubscriberService();
export default SubscriberService;
