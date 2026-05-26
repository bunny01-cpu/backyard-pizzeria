import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const deleteUser: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    // Prevent deleting the last admin
    const targetUser = await User.findOne({ id });
    if (targetUser?.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
            return res.status(400).send({ status: 'error', message: 'Cannot delete the last admin' });
        }
    }

    try {
        const { deletedCount } = await User.deleteOne({ id });
        if (deletedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }
        res.status(200).send({ status: 'success', message: 'User deleted' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Database error' });
    }
};
