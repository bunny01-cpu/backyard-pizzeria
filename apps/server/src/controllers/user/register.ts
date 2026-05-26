import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { RegisterRequestBody } from '../../schemas/user';
import { createUser } from '../../services/user';

export const register: RequestHandler = async (req, res) => {
    const { email, password, role }: RegisterRequestBody = req.body;

    const adminExists = await User.findOne({ role: 'admin' });

    if (role === 'user' && !adminExists) {
        return res.status(503).send({ status: 'error', message: 'Setup is not completed' });
    }

    // Only allow creating additional admins if the requester is already an admin
    if (role === 'admin' && adminExists) {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).send({ status: 'error', message: 'Only an existing admin can create another admin' });
        }
    }

    const isEmailTaken = await User.findOne({ email });

    if (isEmailTaken) {
        return res.status(409).send({ status: 'error', message: 'Account with this e-mail is already registered' });
    }

    let user;

    try {
        user = await createUser(email, password, role);
    } catch (e) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    // Only set session for the first admin setup — don't overwrite existing admin session
    if (!adminExists) {
        req.session.user = user;
    }

    res.status(201).send({ status: 'success', message: 'Account successfully registered', data: { user } });
};
