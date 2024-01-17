import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const AddStoryChapter = ({ setOnSaveDataChapter }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  const handleChange = editor => {
    setStory(editor);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleCancel = () => {
    navigate('/addstory');
  };

  const calender = () => {
    const currentDate = new Date();
    const format = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(
      'id-ID',
      format
    );
    return formattedDate;
  };

  const handleSave = () => {
    const newData = {
      id: uuid(),
      title,
      story,
      date: calender(),
    };

    setOnSaveDataChapter(prevData => [...prevData, newData]);

    navigate('/addstory');
  };

  return (
    <div className="z-10 inset-0 overflow-y-auto flex items-center justify-center absolute">
      <div className="  inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <form
          onSubmit={handleSave}
          style={{ fontFamily: 'Open Sans' }}
          className="font-medium"
        >
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

          <div className="flex p-1 justify-end gap-3 font-bold">
            <button
              type="button"
              className="p-3 bg-red-500 text-white hover:bg-red-800"
              onClick={handleCancel}
              required=""
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white hover:bg-blue-800"
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

export default AddStoryChapter;
