'use client';

import { register } from '@/src/lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';

export const UsersSection = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);
        const response = await register(email, password, 'admin');
        setLoading(false);

        if (response?.status === 'success') {
            setEmail('');
            setPassword('');
            toast(<Toast text="Admin account created successfully" />);
        } else {
            setError(response?.message ?? 'Something went wrong');
        }
    };

    return (
        <div className="mt-4">
            <div className="bg-white py-4 px-4 w-full rounded max-w-md">
                <Title title="Add Admin" description="Create a new admin account." />
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                    <div>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <Error>{error}</Error>}
                    <div className="mt-2">
                        <Button variant="primary" type="submit">
                            {loading ? 'Creating...' : 'Create Admin'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
