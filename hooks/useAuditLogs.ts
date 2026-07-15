"use client";

import { useQuery } from "@tanstack/react-query";

import { auditLogService } from "@/services/auditLog.service";
import type { AuditLogFilter } from "@/types/auditLog";

const QUERY_KEY = "audit-logs";

export function useAuditLogs(params?: AuditLogFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => auditLogService.getAll(params),
  });
}
