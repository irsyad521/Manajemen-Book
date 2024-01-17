import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditStoryChapter = ({ chapters, setChapters }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = editor => {
    setStory(editor);
  };

  useEffect(() => {
    const chapterToEdit = chapters.find(chapter => chapter.id === id);

    if (chapterToEdit) {
      setTitle(chapterToEdit.title);
      setStory(chapterToEdit.story);
    } else {
      navigate('/addstory');
    }
  }, [id, chapters, navigate]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleStoryChange = (event, editor) => {
    const data = editor.getData();
    const storyWithoutParagraph = data
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '')
      .replace(/&nbsp;/g, ' ');
    setStory(storyWithoutParagraph);
  };

  const handleCancel = () => {
    navigate('/addstory');
  };
  const calender = () => {
    const currentDate = new Date();
    const format = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('id-ID', format);
    return formattedDate;
  };

  const handleUpdateChapter = e => {
    e.preventDefault();

    const chapterIndex = chapters.findIndex(chapter => chapter.id === id);

    if (chapterIndex !== -1) {
      const updatedChapter = {
        id,
        title,
        story,
        date: calender(),
      };

      setChapters(prevChapters => {
        const updatedChapters = [...prevChapters];
        updatedChapters[chapterIndex] = updatedChapter;
        return updatedChapters;
      });

      navigate('/addstory');
    } else {
      console.error('Chapter not found');
    }
  };

  return (
    <div className="z-10 inset-0 overflow-y-auto flex items-center justify-center absolute">
      <div className="  inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <form onSubmit={handleUpdateChapter}>
          <div className="mb-4">
            <label className="text-xl text-gray-600">
              Title <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className="mb-8">
            <label className="text-xl text-gray-600">
              Story <span className="text-red-500">*</span>
            </label>
            <br />
            <div>
              <ReactQuill theme="snow" value={story} onChange={handleChange} />
            </div>
          </div>

          <div className="flex p-1 justify-end gap-3">
            <button
              type="button"
              className="p-3 bg-blue-500 text-white hover:bg-blue-400"
              onClick={handleCancel}
              required=""
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white hover:bg-blue-400"
              required=""
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoryChapter;
