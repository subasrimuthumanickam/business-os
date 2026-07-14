import { pool } from '../config/db.js'; // adjust path to your db pool import

export interface Role {
  role_id: number;
  role_name: string;
}

export interface RoleWithPermissions extends Role {
  permission_ids: number[];
}

class RoleService {
  // Get all roles (global, fixed list - no company_id filter)
  async getAllRoles(): Promise<Role[]> {
    const [rows] = await pool.execute(
      `SELECT role_id, role_name FROM roles ORDER BY role_id`,
      []
    );
    return rows as Role[];
  }

  // Get single role by id
  async getRoleById(roleId: number): Promise<Role | null> {
    const [rows] = await pool.execute(
      `SELECT role_id, role_name FROM roles WHERE role_id = ?`,
      [roleId]
    );
    const roles = rows as Role[];
    return roles[0] ?? null;

  }

  // Get a role along with the list of permission_ids currently assigned to it
  async getRoleWithPermissions(roleId: number): Promise<RoleWithPermissions | null> {
    const role = await this.getRoleById(roleId);
    if (!role) return null;

    const [rows] = await pool.execute(
      `SELECT permission_id FROM role_permissions WHERE role_id = ?`,
      [roleId]
    );
    const permissionRows = rows as { permission_id: number }[];

    return {
      ...role,
      permission_ids: permissionRows.map((r) => r.permission_id),
    };
  }

  // Create a new role (e.g. 'Accountant', 'Sales Staff')
  async createRole(roleName: string): Promise<Role> {
    const [result]: any = await pool.execute(
      `INSERT INTO roles (role_name) VALUES (?)`,
      [roleName]
    );
    return { role_id: result.insertId, role_name: roleName };
  }

  // Replace ALL permissions for a role in one go (checkbox matrix save)
  // Deletes existing mappings then inserts the new selected set
  async updateRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.execute(
        `DELETE FROM role_permissions WHERE role_id = ?`,
        [roleId]
      );

      if (permissionIds.length > 0) {
        const values = permissionIds.map((permId) => [roleId, permId]);
        const placeholders = values.map(() => '(?, ?)').join(', ');
        const flatValues = values.flat();

        await connection.execute(
          `INSERT INTO role_permissions (role_id, permission_id) VALUES ${placeholders}`,
          flatValues
        );
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  // Delete a role (guard against deleting Admin / system role in the controller layer)
  async deleteRole(roleId: number): Promise<void> {
    await pool.execute(`DELETE FROM roles WHERE role_id = ?`, [roleId]);
  }
}

export default new RoleService();