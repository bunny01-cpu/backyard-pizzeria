'use client';

import { deleteUser, getUsers, updateUserRole } from '@/src/lib/api';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine, RiShieldLine, RiUserLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';

interface IUserRow {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

export const UsersSection = () => {
    const [users, setUsers] = useState<IUserRow[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const response = await getUsers();
        if (response?.status === 'success') {
            setUsers(response.data.users);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleToggle = async (user: IUserRow) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const response = await updateUserRole(user.id, newRole);
        toast(<Toast text={response?.message ?? 'Role updated'} />);
        fetchUsers();
    };

    const handleDelete = async (user: IUserRow) => {
        if (!confirm(`Delete user ${user.email}?`)) return;
        const response = await deleteUser(user.id);
        toast(<Toast text={response?.message ?? 'User deleted'} />);
        fetchUsers();
    };

    return (
        <div className="mt-4">
            <div className="bg-white py-4 px-2 w-full rounded">
                <Title title="Users" description="Manage user accounts and permissions" />

                {loading ? (
                    <p className="text-textGray mt-4 text-center">Loading...</p>
                ) : users.length === 0 ? (
                    <p className="text-textGray mt-4 text-center">No users found.</p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-2 px-2 text-textGray font-medium">Email</th>
                                    <th className="text-center py-2 px-2 text-textGray font-medium">Role</th>
                                    <th className="text-center py-2 px-2 text-textGray font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-50 hover:bg-backgroundGray transition-colors">
                                        <td className="py-3 px-2 text-black">{user.email}</td>
                                        <td className="py-3 px-2 text-center">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.role === 'admin'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {user.role === 'admin' ? <RiShieldLine /> : <RiUserLine />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="flex items-center justify-center gap-3">
                                                {/* Toggle role */}
                                                <button
                                                    onClick={() => handleRoleToggle(user)}
                                                    title={user.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                                                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                                                        user.role === 'admin'
                                                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    }`}
                                                >
                                                    {user.role === 'admin' ? (
                                                        <><RiUserLine /> Make User</>
                                                    ) : (
                                                        <><RiShieldLine /> Make Admin</>
                                                    )}
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    title="Delete user"
                                                    className="text-textGray hover:text-red-500 transition-colors"
                                                >
                                                    <RiDeleteBinLine className="text-xl" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
