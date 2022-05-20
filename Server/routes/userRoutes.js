import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';
import User from './../models/UserModel.js';

const userRouter = express.Router();

// Login
userRouter.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user.status) {
            if (user && (await user.matchPassword(password))) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    status: user.status,
                    token: generateToken(user._id),
                    createdAt: user.createdAt,
                });
            } else {
                res.status(401); // unauthorized
                throw new Error('Email hoặc mật khẩu không đúng!');
            }
        } else {
            res.status(401);
            throw new Error('Tài khoản của bạn đang bị khóa, vui lòng liên hệ cửa hàng');
        }
    })
);

// Register
userRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('Người dùng đã tồn tại.');
        }

        //create new user
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                status: user.status,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Dữ liệu không hợp lệ.');
        }
    })
);
// Get Profile
userRouter.get(
    '/profile',
    protect, //middleware auth
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                status: user.status,
                createdAt: user.createdAt,
            });
        } else {
            res.status(404); // user not found
            throw new Error('Không tìm thấy người dùng');
        }
    })
);

// Update Profile
userRouter.put(
    '/profile',
    protect, //middleware auth
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.status = req.body.status || user.status;
            if (req.body.password) {
                user.password = req.body.password || user.password;
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                status: updatedUser.status,
                createdAt: updatedUser.createdAt,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404); // user not found
            throw new Error('Không tìm thấy người dùng');
        }
    })
);

// GET ALL USERS
userRouter.get(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.json(users);
    })
);

// ADMIN DELETE USER
userRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            res.json({ message: 'Đã xóa tài khoản' });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy tài khoản');
        }
    })
);

// ADMIN CHANGE USER STATUS
userRouter.put(
    '/change-status/:id',
    // protect, fix
    // admin, fix
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.status = user.status ? false : true;
            const userUpdate = await user.save();
            res.json({
                _id: userUpdate._id,
                name: userUpdate.name,
                email: userUpdate.email,
                isAdmin: userUpdate.isAdmin,
                status: userUpdate.status,
                createdAt: userUpdate.createdAt,
            });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy người dùng.');
        }
    })
);
export default userRouter;
