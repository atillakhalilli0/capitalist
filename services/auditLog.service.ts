import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type { AuditLog, AuditLogFilter } from "@/types/auditLog";

class AuditLogService extends BaseService {
  getAll(params?: AuditLogFilter) {
    return this.get<PagedResult<AuditLog>>("/AuditLogs", { params });
  }
}

export const auditLogService = new AuditLogService();
export default AuditLogService;
