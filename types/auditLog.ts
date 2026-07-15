export interface AuditLog {
  id: string;
  userId: string;
  userFullName?: string;
  entityType: string;
  entityId?: string;
  action: string;
  changes?: string;
  createdAt: string;
}

/** GET /api/AuditLogs query params — names must match exactly. */
export interface AuditLogFilter {
  userId?: string;
  entityType?: string;
  action?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}
