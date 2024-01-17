import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  getStoryById,
  getImage,
} from '../controller/story.controller.js';

const storyRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

storyRouter.get('/stories', getStories);
storyRouter.get('/stories/:id', getStoryById);

storyRouter.post('/stories', upload.single('coverImage'), createStory);
storyRouter.patch('/stories/:id', upload.single('coverImage'), updateStory);

storyRouter.delete('/stories/:id', deleteStory);

storyRouter.get('/images/:filename', getImage);

export default storyRouter;
