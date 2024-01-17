import express from 'express';
import storyRouter from './routes/story.route.js';
import chapteRouter from './routes/chapter.route.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', storyRouter);
app.use('/api', chapteRouter);
app.use('./images', express.static(path.resolve(__dirname, 'images')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
