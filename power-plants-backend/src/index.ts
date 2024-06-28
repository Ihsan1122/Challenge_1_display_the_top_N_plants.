import express from 'express';
import plantRoutes from './routes/plantRoutes';
import config from './config';

const app = express();

app.use(express.json());

app.use('/api/plants', plantRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

