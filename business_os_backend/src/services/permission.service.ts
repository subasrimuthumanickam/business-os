import { pool } from '../config/db.js'; // adjust path to your db pool import

export interface Permission {
  permission_id: number;
  module_name: string;
  action: string;
  label: string;
}

export interface GroupedPermission {
  module_name: string;
  permissions: {
    permission_id: number;
    action: string;
    label: string;
  }[];
}

class PermissionService {
  // Get all permissions, flat list
  async getAllPermissions(): Promise<Permission[]> {
    const [rows] = await pool.execute(
      `SELECT permission_id, module_name, action, label 
       FROM permissions 
       ORDER BY module_name, action`,
      []
    );
    return rows as Permission[];
  }

  // Get all permissions grouped by module - useful for building the checkbox matrix UI
  async getGroupedPermissions(): Promise<GroupedPermission[]> {
  const permissions = await this.getAllPermissions();

  const grouped: Record<string, GroupedPermission> = {};

  for (const perm of permissions) {
    let group = grouped[perm.module_name];
    if (!group) {
      group = { module_name: perm.module_name, permissions: [] };
      grouped[perm.module_name] = group;
    }
    group.permissions.push({
      permission_id: perm.permission_id,
      action: perm.action,
      label: perm.label,
    });
  }

  return Object.values(grouped);
}
}

export default new PermissionService();