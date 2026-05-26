import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ id: 1 });
        res.status(200).send({ status: 'success', data: { users } });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Database error' });
    }
};
