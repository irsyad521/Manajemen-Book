import express from 'express';
import {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getChaptersByStoryId,
  getChapterById,
} from '../controller/chapter.controller.js';

const chapteRouter = express.Router();

chapteRouter.get('/chapters', getChapters);
chapteRouter.get('/chapters-by-story/:story_id', getChaptersByStoryId);
chapteRouter.get('/chapters/:id', getChapterById);
chapteRouter.post('/chapters', createChapter);
chapteRouter.patch('/chapters/:id', updateChapter);
chapteRouter.delete('/chapters/:id', deleteChapter);

export default chapteRouter;
