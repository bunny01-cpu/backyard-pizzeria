import { Router } from 'express';
import { changePassword, getUser, login, logout, register } from '../controllers/user';
import { deleteUser } from '../controllers/user/deleteUser';
import { getUsers } from '../controllers/user/getUsers';
import { updateUserRole } from '../controllers/user/updateUserRole';
import { getSetup } from '../controllers/user/getSetup';
import { checkAdmin } from '../middlewares/checkAdmin';
import { checkSetup } from '../middlewares/checkSetup';
import { checkUser } from '../middlewares/checkUser';
import { validate } from '../middlewares/validate';
import { changePasswordSchema, loginSchema, registerSchema } from '../schemas/user';

export const userRouter = Router();

userRouter.post('/change-password', checkSetup, checkUser, validate(changePasswordSchema), changePassword);
userRouter.get('/user', checkSetup, checkUser, getUser);
userRouter.post('/login', checkSetup, validate(loginSchema), login);
userRouter.get('/logout', checkSetup, checkUser, logout);
userRouter.post('/register', validate(registerSchema), register);
userRouter.get('/setup', getSetup);

// User management (admin only)
userRouter.get('/users', checkSetup, checkAdmin, getUsers);
userRouter.patch('/user/role', checkSetup, checkAdmin, updateUserRole);
userRouter.delete('/user/:id', checkSetup, checkAdmin, deleteUser);
