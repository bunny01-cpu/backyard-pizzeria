import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const updateUserRole: RequestHandler = async (req, res) => {
    const { id, role } = req.body;

    if (!id || !role || !['user', 'admin'].includes(role)) {
        return res.status(400).send({ status: 'error', message: 'Invalid request' });
    }

    // Prevent removing the last admin
    if (role === 'user') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        const targetUser = await User.findOne({ id });
        if (targetUser?.role === 'admin' && adminCount <= 1) {
            return res.status(400).send({ status: 'error', message: 'Cannot remove the last admin' });
        }
    }

    try {
        const { matchedCount } = await User.updateOne({ id }, { role });
        if (matchedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }
        res.status(200).send({ status: 'success', message: 'User role updated' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Database error' });
    }
};
