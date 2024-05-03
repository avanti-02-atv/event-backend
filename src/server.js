import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes/index.js';
import swaggerDocs from './swagger.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/v1", routes);
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});