import compression from 'compression';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { IUser } from './models/User';
import { orderRouter } from './routes/order';
import { pizzaRouter } from './routes/pizza';
import { userRouter } from './routes/user';

declare module 'express-session' {
    export interface SessionData {
        user?: IUser;
    }
}

export const createApp = (sessionSecret: string, mongoUrl: string, clientUrl: string) => {
    const app = express();

    app.set('trust proxy', 1);

    app.use(cors({
        origin: clientUrl,
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept', 'Cookie'],
    }));
    app.use(compression());
    app.use(express.json({ limit: '10mb' }));
    app.use(
        session({
            secret: sessionSecret,
            store: MongoStore.create({ mongoUrl: mongoUrl }),
            saveUninitialized: false,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            },
        })
    );

    app.use('/api', orderRouter);
    app.use('/api', pizzaRouter);
    app.use('/api', userRouter);

    return app;
};
