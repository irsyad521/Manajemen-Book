import Chapter from '../models/chapter.model.js';

export const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.findAll();
    res.status(200).json(chapters);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getChaptersByStoryId = async (req, res) => {
  const { story_id } = req.params;

  try {
    const chapters = await Chapter.findAll({
      where: { story_id },
    });

    if (chapters.length === 0) {
      return res
        .status(404)
        .json({ error: 'Chapters not found for the given story_id' });
    }

    res.status(200).json(chapters);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getChapterById = async (req, res) => {
  const { id } = req.params;

  try {
    const chapter = await Chapter.findByPk(id);

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    res.status(200).json(chapter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createChapter = async (req, res) => {
  try {
    const { chapter_title, story_chapter, story_id } = req.body;

    if (!chapter_title || !story_chapter || !story_id) {
      return res.status(400).json({ error: 'Incomplete data in request body' });
    }

    const newChapter = await Chapter.create({
      chapter_title,
      story_chapter,
      story_id,
    });

    res
      .status(201)
      .json({ msg: 'Chapter created successfully', data: newChapter });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateChapter = async (req, res) => {
  const { id } = req.params;

  try {
    const { chapter_title, story_chapter } = req.body;

    if (!chapter_title && !story_chapter) {
      return res
        .status(400)
        .json({ error: 'No valid data provided for update' });
    }

    const [updatedRows] = await Chapter.update(
      { chapter_title, story_chapter },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteChapter = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Chapter.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
