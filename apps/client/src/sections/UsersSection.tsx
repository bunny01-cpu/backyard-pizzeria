'use client';

import { deleteUser, getUsers, register } from '@/src/lib/api';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';

interface IUserRow {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

export const UsersSection = () => {
    const [admins, setAdmins] = useState<IUserRow[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAdmins = async () => {
        const response = await getUsers();
        if (response?.status === 'success') {
            setAdmins(response.data.users.filter((u: IUserRow) => u.role === 'admin'));
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Email and password are required'); return; }
        setLoading(true);
        const response = await register(email, password, 'admin');
        setLoading(false);
        if (response?.status === 'success') {
            setEmail('');
            setPassword('');
            toast(<Toast text="Admin added successfully" />);
            fetchAdmins();
        } else {
            setError(response?.message ?? 'Something went wrong');
        }
    };

    const handleRemove = async (admin: IUserRow) => {
        if (!confirm(`Remove admin ${admin.email}?`)) return;
        const response = await deleteUser(admin.id);
        toast(<Toast text={response?.message ?? 'Admin removed'} />);
        fetchAdmins();
    };

    return (
        <div className="mt-4">
            <div className="bg-white py-4 px-4 w-full rounded">
                <Title title="Admins" description="Manage admin accounts." />

                {/* Admin list */}
                <div className="mt-4">
                    {admins.length === 0 ? (
                        <p className="text-textGray text-sm">No admins found.</p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {admins.map((admin) => (
                                <div key={admin.id} className="flex items-center justify-between bg-backgroundGray px-3 py-2 rounded">
                                    <span className="text-black text-sm font-medium">{admin.email}</span>
                                    <button
                                        onClick={() => handleRemove(admin)}
                                        className="text-textGray hover:text-red-500 transition-colors ml-4"
                                        title="Remove admin"
                                    >
                                        <RiDeleteBinLine className="text-xl" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add admin form */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-black font-bold text-sm mb-3">Add New Admin</p>
                    <form onSubmit={handleAdd} className="flex flex-col gap-2">
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Error>{error}</Error>}
                        <div className="mt-1">
                            <Button variant="primary" type="submit">
                                {loading ? 'Adding...' : 'Add Admin'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
