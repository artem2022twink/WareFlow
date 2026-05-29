import express from 'express';
import { router as productRouter } from './modules/products/product.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.json({ message: 'WareFlow backend is running' });
});

app.use(errorHandler);

export { app };