import { RequestHandler } from 'express';

export const checkAdmin: RequestHandler = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ status: 'error', message: 'You are not logged in' });
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send({ status: 'error', message: 'Admin access required' });
    }

    next();
};
