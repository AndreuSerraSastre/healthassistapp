export const ROLES = {
  admin: {
    label: "Admin",
    role: "a2470ee4",
  },
  user: {
    label: "User",
    role: "a2470ee3",
  },
};

export const ROLES_RAW = Object.values(ROLES).map((r) => r.role);

export const ROLE_OPTS = Object.values(ROLES).map((r) => ({
  label: r.label,
  value: r.role,
}));
