import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Task from './models/Task';
import dotenv from 'dotenv';
import path from 'path';
import errorHandler from './middleware/errorHandler';
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



    //get 1st data for /
app.get('/', (req, res) => {
    try{
    res.status(200).send('Backend Works'); // Send a response back to the client
    }catch(error){
        res.status(400).send(`error is == ${error}`)
    }
});

//create
app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Internal Server Error ${error}` });
    }
});

//get all data
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delete a task
app.delete('/deletetask/:id',async(req,res)=>{
    try {
        const deleteid=req.params.id;
        const task = await Task.deleteOne({ _id: deleteid });
        res.json(`Deleted Sucessfully ${deleteid}`)
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error could not delete task' });
    }
})


//update a task
app.patch('/edittask/:id',async(req,res)=>{
    try {
        const editid=req.params.id;
        const updateData = req.body;
        const task = await Task.updateOne({ _id: editid },updateData)
        res.json(`${editid} Updated Sucessfully`)
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error could not update task' });
    }
})

//check error handler middleware
app.get('/trigger-error', (req, res, next) => {
    throw new Error('This is a simulated error');
});

//error handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});

