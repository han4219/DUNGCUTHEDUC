import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import { admin, protect } from './../middleware/AuthMiddleware.js';

const productRouter = express.Router();

//GET ALL REVIEWS
productRouter.get(
    '/reviews',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const reviews = await Product.find(
            {},
            {
                'reviews._id': true,
                'reviews.name': true,
                'reviews.rating': true,
                'reviews.comment': true,
                'reviews.show': true,
                _id: true,
                name: true,
                image: true,
                numReviews: true,
            }
        );
        if (reviews) {
            res.json(reviews);
        } else {
            res.status(404);
            throw new Error('Không tìm thấy reviews');
        }
    })
);

// GET ALL PRODUCTS
productRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};
        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .populate('category', '_id name')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 });
        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH & PAGINATION
productRouter.get(
    '/all',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ _id: -1 });
        res.json(products);
    })
);

// GET AN PRODUCT
productRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error(`Product not found`);
        }
    })
);

// CREATE REVIEW PRODUCT
productRouter.post(
    '/:id/review',
    protect,
    asyncHandler(async (req, res) => {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Bạn đã đánh giá sản phẩm.');
            }
            const review = {
                name: req.user.name,
                rating: rating,
                comment: comment,
                user: req.user._id,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
            await product.save();
            res.status(201).json({ message: 'Đã thêm đánh giá' });
        } else {
            res.status(404);
            throw new Error(`Product not found`);
        }
    })
);

// DELETE PRODUCT
productRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: 'Đã xóa sản phẩm' });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm');
        }
    })
);

// CREATE PRODUCT
productRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, image, description, price, quantity, trademark, category } = req.body;
        const productExists = await Product.findOne({ name });

        if (productExists) {
            res.status(400);
            throw new Error('Tên sản phẩm đã tồn tại');
        } else {
            const product = new Product({
                name,
                image,
                description,
                price,
                quantity,
                trademark,
                category,
            });
            if (product) {
                const createdProduct = await product.save();
                res.status(201).json(createdProduct);
            } else {
                res.status(404);
                throw new Error('Dữ liệu sản phẩm không hợp lệ');
            }
        }
    })
);

// EDIT PRODUCT
productRouter.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, image, description, price, quantity, trademark, category, reviews } =
            req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.image = image || product.image;
            product.description = description || product.description;
            product.price = price || product.price;
            product.quantity = quantity || product.quantity;
            product.trademark = trademark || product.trademark;
            product.category = category || product.category;
            product.reviews = reviews || product.reviews;

            const updatedProduct = await product.save();
            res.json({ updatedProduct });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm');
        }
    })
);

//GET PRODUCT BY CATEGORY
productRouter.get(
    '/category/:id',
    asyncHandler(async (req, res) => {
        const category = req.params.id;
        const products = await Product.find({ category });
        if (products) {
            res.json(products);
        } else {
            res.status(404);
            throw new Error('Danh mục không có sản phẩm.');
        }
    })
);

// update product count in stock
productRouter.put(
    '/change-quantity/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.quantity = product.quantity - req.body.count;
            const updateProduct = await product.save();
            res.json({ updateProduct });
        } else {
            res.status(404);
            throw new Error('Không tìm thấy sản phẩm');
        }
    })
);

export default productRouter;
