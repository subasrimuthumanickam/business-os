import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface Role {
  role_id: number;
  role_name: string;
}

export interface RoleWithPermissions extends Role {
  permission_ids: number[];
}

export interface PermissionItem {
  permission_id: number;
  action: string;
  label: string;
}

export interface GroupedPermission {
  module_name: string;
  permissions: PermissionItem[];
}

export const roleService = {
  getAllRoles: () =>
    apiService.get<Role[]>('/roles'),

  getRoleWithPermissions: (roleId: number) =>
    apiService.get<RoleWithPermissions>(`/roles/${roleId}`),

getGroupedPermissions: () =>
    apiService.get<GroupedPermission[]>('/roles/permissions'),   // ✅ correct
  createRole: (roleName: string) =>
    apiService.post<Role>('/roles', { role_name: roleName }),

  updateRolePermissions: (roleId: number, permissionIds: number[]) =>
    apiService.put<RoleWithPermissions>(`/roles/${roleId}/permissions`, { permission_ids: permissionIds }),

  deleteRole: (roleId: number) =>
    apiService.delete<void>(`/roles/${roleId}`),
};

export default roleService;