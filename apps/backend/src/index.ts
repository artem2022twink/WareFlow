import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'WareFlow backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});