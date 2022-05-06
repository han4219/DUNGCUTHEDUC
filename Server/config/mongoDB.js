import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const connection = await mongoose
            .connect(process.env.MONGO_URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then((result) => {
                console.log('MongoDB connected');
            });
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        process.exit(1);
    }
};

export default connectDatabase;
