import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createChapter } from '../../services/ChapterApi';

const EditAddStoryChapter = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleChange = editor => {
    setStory(editor);
  };

  const handleCancel = () => {
    navigate(`/editstory/${id}`);
  };

  const handleSave = async id => {
    const newChapterData = {
      story_id: id,
      chapter_title: title,
      story_chapter: story,
    };

    try {
      await createChapter(newChapterData);
    } catch (error) {
      console.log(error.message);
      navigate(`/editstory/${id}`);
    }
    navigate(`/editstory/${id}`);
  };

  return (
    <div className="z-10 inset-0 overflow-y-auto flex items-center justify-center absolute">
      <div className="  inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave(id);
          }}
        >
          {' '}
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
              <ReactQuill
                theme="snow"
                value={story}
                onChange={handleChange}
              />
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

export default EditAddStoryChapter;
