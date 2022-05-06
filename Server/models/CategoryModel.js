import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
