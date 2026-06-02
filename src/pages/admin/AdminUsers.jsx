import React, { useState, useEffect } from "react";
import { FiTrash2, FiUser, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
import { getAllUsers, deleteUser } from "../../services/userService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.users);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        const res = await deleteUser(id);
        if (res.success) {
          toast.success("User deleted successfully");
          setUsers(users.filter((u) => u._id !== id));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-gray-400 mt-1">Manage registered accounts and roles</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <BiLoaderAlt className="animate-spin text-indigo-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950/50 border-b border-gray-800">
                  <th className="px-6 py-4 font-semibold text-sm text-gray-400">User</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-400">Email</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-400">Role</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-400">Joined</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 flex-shrink-0">
                          <FiUser size={18} />
                        </div>
                        <div className="font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center inline-flex gap-1.5 ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {user.role === 'admin' ? <FiShield size={12} /> : null}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === 'admin'}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                        title={user.role === 'admin' ? "Cannot delete admin" : "Delete"}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FiUser size={24} className="text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg">No users found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
