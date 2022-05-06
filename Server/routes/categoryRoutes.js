import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import Category from '../models/CategoryModel.js';

const categoryRouter = express.Router();

// GET ALL CATEGORYS
categoryRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const categorys = await Category.find({}).sort({ _id: -1 });
        res.json(categorys);
    })
);

// GET A CATEGORY
categoryRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404);
            throw new Error('Không tìm thấy danh mục');
        }
    })
);

// CREATE CATEGORY
categoryRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const categoryExist = await Category.findOne({ name });
        if (categoryExist) {
            res.status(400);
            throw new Error('Danh mục đã tồn tại');
        }

        //create new category
        const category = await Category.create({ name });
        if (category) {
            res.status(201).json({
                _id: category._id,
                name: category.name,
            });
        } else {
            res.status(400);
            throw new Error('Dữ liệu không hợp lệ');
        }
    })
);

// DELETE CATEGORY
categoryRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.remove();
            res.json({ message: 'Đã xóa danh mục' });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy danh mục');
        }
    })
);

// UPDATE CATEGORY
categoryRouter.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = name || category.name;
            const categoryUpdated = await category.save();
            res.json({ categoryUpdated });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy danh mục');
        }
    })
);

export default categoryRouter;
