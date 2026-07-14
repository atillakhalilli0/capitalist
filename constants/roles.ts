export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  AUTHOR: "Author",
  USER: "User",
} as const;

export const ROLE_OPTIONS = [
  {
    label: "Super Admin",
    value: ROLES.SUPER_ADMIN,
  },
  {
    label: "Admin",
    value: ROLES.ADMIN,
  },
  {
    label: "Editor",
    value: ROLES.EDITOR,
  },
  {
    label: "Author",
    value: ROLES.AUTHOR,
  },
  {
    label: "User",
    value: ROLES.USER,
  },
] as const;

export type Role =
  (typeof ROLES)[keyof typeof ROLES];