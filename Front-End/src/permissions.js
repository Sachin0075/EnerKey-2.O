// src/permissions.js
export const permissions = {
  dashboard: ["customeradmin", "user", "superadmin"],
  users: ["customeradmin","superadmin"  , "user"],
  organization: ["superadmin"],
  facilities: ["customeradmin", "superadmin", "user"],
  reports: ["customeradmin", "superadmin", "user"],
};

export function canAccess(role, resource) {
  return permissions[resource]?.includes(role);
}