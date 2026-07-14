import type { Request, Response } from 'express';
import roleService from '../services/role.service.js'; // adjust path
import permissionService from '../services/permission.service.js'; // adjust path

class RoleController {
  // GET /api/roles
  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();
      return res.json({ success: true, data: roles });
    } catch (err) {
      console.error('getAllRoles error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch roles' });
    }
  }

  // GET /api/roles/:id
  async getRoleWithPermissions(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.id);
      const role = await roleService.getRoleWithPermissions(roleId);

      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }

      return res.json({ success: true, data: role });
    } catch (err) {
      console.error('getRoleWithPermissions error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch role' });
    }
  }

  // GET /api/permissions (grouped by module - for the checkbox matrix UI)
  async getAllPermissions(req: Request, res: Response) {
    try {
      const grouped = await permissionService.getGroupedPermissions();
      return res.json({ success: true, data: grouped });
    } catch (err) {
      console.error('getAllPermissions error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch permissions' });
    }
  }

  // POST /api/roles
  async createRole(req: Request, res: Response) {
    try {
      const { role_name } = req.body;

      if (!role_name || !role_name.trim()) {
        return res.status(400).json({ success: false, message: 'role_name is required' });
      }

      const role = await roleService.createRole(role_name.trim());
      return res.status(201).json({ success: true, data: role });
    } catch (err: any) {
      console.error('createRole error:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: 'Role name already exists' });
      }
      return res.status(500).json({ success: false, message: 'Failed to create role' });
    }
  }

  // PUT /api/roles/:id/permissions
  async updateRolePermissions(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.id);
      const { permission_ids } = req.body;

      if (!Array.isArray(permission_ids)) {
        return res.status(400).json({ success: false, message: 'permission_ids must be an array' });
      }

      const role = await roleService.getRoleById(roleId);
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }

      await roleService.updateRolePermissions(roleId, permission_ids);

      const updatedRole = await roleService.getRoleWithPermissions(roleId);
      return res.json({ success: true, data: updatedRole });
    } catch (err) {
      console.error('updateRolePermissions error:', err);
      return res.status(500).json({ success: false, message: 'Failed to update permissions' });
    }
  }

  // DELETE /api/roles/:id
  async deleteRole(req: Request, res: Response) {
    try {
      const roleId = Number(req.params.id);

      const role = await roleService.getRoleById(roleId);
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }

      // Guard: prevent deleting the Admin role
      if (role.role_name.toLowerCase() === 'admin') {
        return res.status(403).json({ success: false, message: 'Admin role cannot be deleted' });
      }

      await roleService.deleteRole(roleId);
      return res.json({ success: true, message: 'Role deleted successfully' });
    } catch (err) {
      console.error('deleteRole error:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete role' });
    }
  }
}

export default new RoleController();