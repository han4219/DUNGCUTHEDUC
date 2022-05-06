import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/mongoDB.js';
import ImportData from './DataImport.js';
import productRouter from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/Errors.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import router from './routes/getClientIDPaypal.js';
import categoryRouter from './routes/categoryRoutes.js';

const app = express();
dotenv.config();
connectDatabase();
app.use(express.json());

// API
app.use('/api/import', ImportData);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categorys', categoryRouter);
app.use('/api/config/paypal', router);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 1000;
app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
});
