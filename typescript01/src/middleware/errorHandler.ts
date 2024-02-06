import { Request, Response, NextFunction } from 'express';

//error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: `Internal Server Error by ErrorHandler : ${err.stack}` });
};

export default errorHandler;
