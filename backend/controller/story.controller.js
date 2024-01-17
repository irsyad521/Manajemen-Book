import Story from '../models/story.model.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../images', filename);

  res.sendFile(imagePath);
};

export const getStories = async (req, res) => {
  try {
    const stories = await Story.findAll();
    res.status(200).json(stories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createStory = async (req, res) => {
  try {
    const { title, author, synopsis, category, tags, status } = req.body;

    if (!title || !author || !synopsis || !category || !status || !tags) {
      return res.status(400).json({ error: 'Incomplete data in request body' });
    }

    const coverImage = req.file ? req.file.filename : null;

    const newStory = await Story.create({
      title,
      author,
      synopsis,
      category,
      tags,
      status,
      coverImage,
    });

    res.status(201).json({ msg: 'Story created successfully', data: newStory });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findOne({
      where: { id },
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.status(200).json({ msg: 'Story found successfully', data: story });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateStory = async (req, res) => {
  const { id } = req.params;

  try {
    const { title, author, synopsis, category, tags, status } = req.body;

    if (!title && !author && !synopsis && !category && !tags && !status) {
      return res
        .status(400)
        .json({ error: 'No valid data provided for update' });
    }

    const coverImage = req.file ? req.file.filename : null;

    const [updatedRows] = await Story.update(
      { ...req.body, coverImage },
      {
        where: { id },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.status(200).json({ message: 'Story updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Story.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
