// src/permissions.js
export const permissions = {
  organization: ["superadmin"],
  users: ["customeradmin","superadmin"  ],
  dashboard: ["customeradmin", "registereduser", "superadmin"],
  facilities: ["customeradmin", "superadmin", "registereduser"],
  reports: ["customeradmin", "superadmin", "registereduser"],
};

export function canAccess(role, resource) {
  return permissions[resource]?.includes(role);
}