import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'


const connectDB = async()=>{
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Using existing MongoDB connection');
            return;
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        });

        console.log(`\n MongoDB connected !\n DB host: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // Let the calling function handle the error
    }
}
export default connectDB; 