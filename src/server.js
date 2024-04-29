import express from 'express';
import { routes } from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});