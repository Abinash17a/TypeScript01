import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Task from './models/Task';
import dotenv from 'dotenv';
import path from 'path';
import errorHandler from './middleware/errorHandler';
import taskRoutes from './routes/taskRoutes';
import { ConnectOptions } from 'mongoose';


const app = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

//middlewares

const MONGODB_URI: string = process.env.MONGODB_URI?.toString() || 'mongodb://localhost:27017/CRUD';


//type assertion in typescript or we can say type declaration
type MongooseOptions = {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
};


//mongo connection
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions;


// Connect to MongoDB
mongoose.connect(MONGODB_URI, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB database Cluster0');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/tasks',taskRoutes);

// //error handling Middleware

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});

