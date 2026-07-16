// TODO: confirm these are the exact `roleName` strings the backend returns.
// Assumed PascalCase, no spaces, matching existing SuperAdmin/Editor/Author naming.
export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  EDITOR_IN_CHIEF: "EditorInChief",
  EDITOR: "Editor",
  MARKETING_MANAGER: "MarketingManager",
  AUTHOR: "Author",
  REGISTERED_USER: "RegisteredUser",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_OPTIONS = [
  { label: "Superadmin", value: ROLES.SUPER_ADMIN },
  { label: "Editor-in-Chief", value: ROLES.EDITOR_IN_CHIEF },
  { label: "Editor", value: ROLES.EDITOR },
  { label: "Marketing Manager", value: ROLES.MARKETING_MANAGER },
  { label: "Author", value: ROLES.AUTHOR },
  { label: "Registered User", value: ROLES.REGISTERED_USER },
] as const;

// Admin-panel sections, used to gate sidebar links and routes.
export const PERMISSIONS = {
  DASHBOARD: "dashboard",
  ARTICLES: "articles",
  CATEGORIES: "categories",
  TAGS: "tags",
  COMMENTS: "comments",
  USERS: "users",
  PODCASTS: "podcasts",
  PROJECTS: "projects",
  MEDIA: "media",
  ADVERTISEMENTS: "advertisements",
  SUBSCRIBERS: "subscribers",
  CONTACT_REQUESTS: "contact-requests",
  AUDIT_LOGS: "audit-logs",
  ANALYTICS: "analytics",
  SETTINGS: "settings",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Derived from the role descriptions you gave:
// Superadmin bypasses this map entirely (see hasPermission).
// Editor-in-Chief: content, users, categories, tags, analytics.
// Editor: content, tags, comment moderation.
// Marketing Manager: ads, sponsored content, analytics.
// Author: drafts, media uploads.
// Registered User: no admin-panel access at all.
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.EDITOR_IN_CHIEF]: [
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.ARTICLES,
    PERMISSIONS.CATEGORIES,
    PERMISSIONS.TAGS,
    PERMISSIONS.COMMENTS,
    PERMISSIONS.USERS,
    PERMISSIONS.PODCASTS,
    PERMISSIONS.PROJECTS,
    PERMISSIONS.MEDIA,
    PERMISSIONS.CONTACT_REQUESTS,
    PERMISSIONS.ANALYTICS,
    PERMISSIONS.SETTINGS,
  ],
  [ROLES.EDITOR]: [
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.ARTICLES,
    PERMISSIONS.TAGS,
    PERMISSIONS.COMMENTS,
    PERMISSIONS.MEDIA,
    PERMISSIONS.SETTINGS,
  ],
  [ROLES.MARKETING_MANAGER]: [
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.ADVERTISEMENTS,
    PERMISSIONS.SUBSCRIBERS,
    PERMISSIONS.ANALYTICS,
    PERMISSIONS.SETTINGS,
  ],
  [ROLES.AUTHOR]: [
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.ARTICLES,
    PERMISSIONS.MEDIA,
    PERMISSIONS.SETTINGS,
  ],
  [ROLES.REGISTERED_USER]: [],
};

export function hasPermission(
  roleName: string | undefined,
  permission: Permission
): boolean {
  if (!roleName) return false;
  if (roleName === ROLES.SUPER_ADMIN) return true;
  return ROLE_PERMISSIONS[roleName as Role]?.includes(permission) ?? false;
}

// Maps an /admin/* route prefix to the permission that guards it.
// Routes not listed here (dashboard, profile, settings landing) are ungated.
const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/admin/articles": PERMISSIONS.ARTICLES,
  "/admin/categories": PERMISSIONS.CATEGORIES,
  "/admin/tags": PERMISSIONS.TAGS,
  "/admin/comments": PERMISSIONS.COMMENTS,
  "/admin/users": PERMISSIONS.USERS,
  "/admin/podcasts": PERMISSIONS.PODCASTS,
  "/admin/projects": PERMISSIONS.PROJECTS,
  "/admin/media": PERMISSIONS.MEDIA,
  "/admin/advertisements": PERMISSIONS.ADVERTISEMENTS,
  "/admin/subscribers": PERMISSIONS.SUBSCRIBERS,
  "/admin/contact-requests": PERMISSIONS.CONTACT_REQUESTS,
  "/admin/audit-logs": PERMISSIONS.AUDIT_LOGS,
};

export function getRoutePermission(pathname: string): Permission | null {
  const match = Object.keys(ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  return match ? ROUTE_PERMISSIONS[match] : null;
}

export function canAccessRoute(roleName: string | undefined, pathname: string): boolean {
  const permission = getRoutePermission(pathname);
  if (!permission) return true;
  return hasPermission(roleName, permission);
}