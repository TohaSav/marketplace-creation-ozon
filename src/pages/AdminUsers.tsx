import AdminLayout from "@/components/AdminLayout";
import AdminUsersHeader from "@/components/admin-users/AdminUsersHeader";
import UserStatsCards from "@/components/admin-users/UserStatsCards";
import UserFiltersPanel from "@/components/admin-users/UserFiltersPanel";
import UserTable from "@/components/admin-users/UserTable";
import UserDetailsModal from "@/components/admin-users/UserDetailsModal";
import { useAdminUsers } from "@/hooks/useAdminUsers";

export default function AdminUsers() {
  const {
    users,
    userStats,
    selectedUser,
    isModalOpen,
    filters,
    setFilters,
    handleToggleUserStatus,
    handleViewUser,
    handleCloseModal,
    handleClearAllUsers,
  } = useAdminUsers();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminUsersHeader onClearAllUsers={handleClearAllUsers} />

        <UserStatsCards stats={userStats} />

        <UserFiltersPanel filters={filters} onFiltersChange={setFilters} />

        <UserTable
          users={users}
          onViewUser={handleViewUser}
          onToggleStatus={handleToggleUserStatus}
        />

        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onToggleStatus={handleToggleUserStatus}
        />
      </div>
    </AdminLayout>
  );
}
