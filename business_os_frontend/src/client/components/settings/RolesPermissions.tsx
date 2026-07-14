import { useState, useEffect } from 'react';
import roleService, {
  Role,
  GroupedPermission,
} from '../../services/Role.service';

const ACTION_COLUMNS = ['view', 'create', 'edit', 'delete', 'export'] as const;

const MODULE_COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-indigo-500',
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermission[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<number>>(new Set());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [rolesData, permissionsData] = await Promise.all([
          roleService.getAllRoles(),
          roleService.getGroupedPermissions(),
        ]);
        setRoles(rolesData);
        setGroupedPermissions(permissionsData);

        if (rolesData.length > 0) {
          setSelectedRoleId(rolesData[0].role_id);
        }
      } catch (err) {
        console.error('Failed to load roles/permissions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const getAllPermissionIds = (): number[] => {
    return groupedPermissions.flatMap((group) =>
      group.permissions.map((p) => p.permission_id)
    );
  };

  useEffect(() => {
    if (selectedRoleId === null) return;

    const selectedRole = roles.find((r) => r.role_id === selectedRoleId);
    const isAdmin = selectedRole?.role_name?.toLowerCase() === 'admin';

    if (isAdmin) {
      setSelectedPermissionIds(new Set(getAllPermissionIds()));
      return;
    }

    const loadRolePermissions = async () => {
      try {
        const role = await roleService.getRoleWithPermissions(selectedRoleId);
        setSelectedPermissionIds(new Set(role.permission_ids));
      } catch (err) {
        console.error('Failed to load role permissions:', err);
      }
    };

    loadRolePermissions();
  }, [selectedRoleId, roles, groupedPermissions]);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      if (next.has(permissionId)) next.delete(permissionId);
      else next.add(permissionId);
      return next;
    });
  };

  const toggleModuleAll = (modulePermissions: { permission_id: number }[], checked: boolean) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      modulePermissions.forEach((p) => {
        if (checked) next.add(p.permission_id);
        else next.delete(p.permission_id);
      });
      return next;
    });
  };

  const handleSave = async () => {
    if (selectedRoleId === null) return;
    try {
      setSaving(true);
      await roleService.updateRolePermissions(selectedRoleId, Array.from(selectedPermissionIds));
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save permissions:', err);
      alert('Failed to save permissions. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddRole = async () => {
    if (!newRoleName.trim()) return;
    try {
      const newRole = await roleService.createRole(newRoleName.trim());
      setRoles((prev) => [...prev, newRole]);
      setSelectedRoleId(newRole.role_id);
      setNewRoleName('');
      setShowAddRole(false);
    } catch (err) {
      console.error('Failed to create role:', err);
      alert('Failed to create role. Name may already exist.');
    }
  };

  const selectedRole = roles.find((r) => r.role_id === selectedRoleId);
  const isAdminRole = selectedRole?.role_name?.toLowerCase() === 'admin';
  const totalPermCount = getAllPermissionIds().length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading roles &amp; permissions...
      </div>
    );
  }

  return (
    <div className="relative border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      {savedToast && (
        <div className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          Permissions updated
        </div>
      )}

      {/* Top bar - tabs/pills + add role */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {roles.map((role) => {
            const active = selectedRoleId === role.role_id;
            return (
              <button
                key={role.role_id}
                onClick={() => setSelectedRoleId(role.role_id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role.role_name}
              </button>
            );
          })}
        </div>

        {showAddRole ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="e.g. Sales Executive"
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddRole}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowAddRole(false);
                setNewRoleName('');
              }}
              className="text-xs text-gray-600 px-3 py-1.5 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddRole(true)}
            className="text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            + Add Role
          </button>
        )}
      </div>

      {/* Permission matrix */}
      {selectedRole ? (
        <>
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {selectedRole.role_name} permissions
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {isAdminRole
                  ? `Full access · ${totalPermCount} permissions granted`
                  : `${selectedPermissionIds.size} of ${totalPermCount} permissions granted`}
              </p>
            </div>
            {!isAdminRole && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            )}
          </div>

          <div className="px-6 pb-6 overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                    Module
                  </th>
                  {ACTION_COLUMNS.map((action) => (
                    <th
                      key={action}
                      className="text-center py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide capitalize"
                    >
                      {action}
                    </th>
                  ))}
                  <th className="text-center py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                    All
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedPermissions.map((group, idx) => {
                  const allChecked = group.permissions.every((p) =>
                    selectedPermissionIds.has(p.permission_id)
                  );
                  const dotColor = MODULE_COLORS[idx % MODULE_COLORS.length];

                  return (
                    <tr key={group.module_name} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3 text-gray-700 border-b border-gray-100">
                        <span className="flex items-center gap-2 font-medium">
                          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                          {group.module_name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>
                      {ACTION_COLUMNS.map((action) => {
                        const perm = group.permissions.find((p) => p.action === action);
                        return (
                          <td key={action} className="text-center py-3 px-3 border-b border-gray-100">
                            {perm ? (
                              <input
                                type="checkbox"
                                checked={selectedPermissionIds.has(perm.permission_id)}
                                onChange={() => togglePermission(perm.permission_id)}
                                disabled={isAdminRole}
                                className={`w-4 h-4 accent-blue-600 rounded ${
                                  isAdminRole ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                }`}
                              />
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center py-3 px-3 border-b border-gray-100">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={(e) => toggleModuleAll(group.permissions, e.target.checked)}
                          disabled={isAdminRole}
                          className={`w-4 h-4 accent-gray-800 rounded ${
                            isAdminRole ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                          }`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          Select a role to view permissions
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;