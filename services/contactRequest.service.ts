import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type {
  ContactRequest,
  ContactRequestFilter,
  CreateContactRequest,
  HandleContactRequest,
} from "@/types/contactRequest";

class ContactRequestService extends BaseService {
  getAll(params?: ContactRequestFilter) {
    return this.get<PagedResult<ContactRequest>>("/ContactRequests", { params });
  }

  getById(id: string) {
    return this.get<ContactRequest>(`/ContactRequests/${id}`);
  }

  create(data: CreateContactRequest) {
    return this.post<ContactRequest>("/ContactRequests", data);
  }

  handle(id: string, data: HandleContactRequest) {
    return this.post<void>(`/ContactRequests/${id}/handle`, data);
  }
}

export const contactRequestService = new ContactRequestService();
export default ContactRequestService;
