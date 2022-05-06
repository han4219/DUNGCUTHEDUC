import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
        comment: {
            type: String,
            require: true,
        },
        show: {
            type: Boolean,
            require: true,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
            default: 0,
        },
        rating: {
            type: Number,
            require: true,
            default: 0,
        },
        quantity: {
            type: Number,
            require: true,
            default: 0,
        },
        trademark: {
            type: String,
            require: true,
        },
        numReviews: {
            type: Number,
            require: true,
            default: 0,
        },
        reviews: [reviewSchema],
        category: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
