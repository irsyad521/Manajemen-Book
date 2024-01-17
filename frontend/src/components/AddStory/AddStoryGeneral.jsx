import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalCancel from '../../utils/ModalCancel';
import { createStory } from '../../services/storiesApi';
import { createChapter } from '../../services/ChapterApi';
import ModalCancelNoData from '../../utils/ModalCancelNoData';

const AddStoryGeneral = ({
  setSendData,
  onSaveDataChapter,
  setOnSaveDataChapter,
}) => {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalNoData, setShowModalNoData] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('Financial');
  const [status, setStatus] = useState('Publish');
  const [coverImage, setCoverImage] = useState(null);

  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);

  const addTags = e => {
    if (e.keyCode === 13 && tagValue) {
      e.preventDefault();
      setTags([...tags, tagValue]);
      setTagValue('');
    }
  };

  const removeTags = indexToRemove => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      allowedImageTypes.includes(selectedFile.type)
    ) {
      setCoverImage(selectedFile);
    } else {
      alert(
        'Invalid file type. Please select a valid image (JPEG, JPG, PNG).'
      );
      setCoverImage(null);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalNoData = () => {
    setShowModalNoData(true);
  };

  const handleCloseModalNoData = () => {
    setShowModalNoData(false);
  };

  const handleOnConfirm = async () => {
    try {
      await handleCloseModal();
      setOnSaveDataChapter([]);
      history('/');
    } catch (error) {
      console.log('Error closing modal:', error.message);
    }
  };

  const handleCancel = async () => {
    if (onSaveDataChapter.length > 0) {
      await handleOpenModal();
    } else {
      await handleOpenModalNoData();
    }
  };

  const handleAddChapter = () => {
    history('/addstory/addstorychapter');
  };

  const handleDeleteChapter = id => {
    const newData = onSaveDataChapter.filter(data => data.id !== id);
    setOnSaveDataChapter(newData);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('synopsis', synopsis);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('status', status);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const responseGeneral = await createStory(formData);

      setSendData([responseGeneral.data]);

      onSaveDataChapter.forEach(async chapter => {
        const newChapterData = {
          story_id: responseGeneral.data.id,
          chapter_title: chapter.title,
          story_chapter: chapter.story,
        };
        await createChapter(newChapterData);
      });

      setOnSaveDataChapter([]);

      setTitle('');
      setAuthor('');
      setSynopsis('');
      setCategory('Financial');
      setTags('');
      setStatus('Publish');

      history('/');
    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };
  return (
    <div>
      <h1
        className="text-center text-3xl font-bold mt-5"
        style={{ fontFamily: 'Open Sans' }}
      >
        Add Story
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 h-1/2 font-medium"
          style={{ fontFamily: 'Open Sans' }}
        >
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="grid-title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-writers-name"
              >
                Writer Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="grid-writers-name"
                type="text"
                placeholder="Writer Name"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-synopsis"
              >
                Synopsis
              </label>
              <textarea
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                id="grid-synopsis"
                placeholder="Synopsis"
                rows="5"
                value={synopsis}
                onChange={e => setSynopsis(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-category"
              >
                Category
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  id="grid-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option>Financial</option>
                  <option>Technology</option>
                  <option>Health</option>
                </select>
                <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
              </div>
            </div>
            <div className="md:w-1/2 px-3   ">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-tags"
              >
                Tags/KeyWord Story
              </label>
              <div className="flex justify-between items-center border border-solid overflow-hidden bg-slate-200">
                <div className="flex flex-shrink-0 gap-2 overflow-x-auto w-4/5">
                  {tags.map((item, index) => (
                    <p
                      className="px-6 py-2 font-semibold rounded-full bg-slate-500 text-white hover:cursor-pointer"
                      key={index}
                      onClick={() => removeTags(index)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <input
                  className="appearance-none text-black placeholder:text-black w-1/5 flex-shrink-0 block bg-grey-lighter text-grey-darker border border-solid border-slate-300  bg-slate-200 py-4 px-4 focus:border-solid focus:outline-none"
                  id="grid-tags"
                  type="text"
                  placeholder="Enter Your Tags "
                  value={tagValue}
                  onChange={e => setTagValue(e.target.value)}
                  onKeyDown={addTags}
                />
              </div>
            </div>
          </div>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="file"
              >
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="file"
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-status"
              >
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  id="grid-status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option>Publish</option>
                  <option>Draft</option>
                </select>
                <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/2">
          <div>
            <div className="flex justify-end mr-5 mb-6">
              <button
                type="button "
                className="bg-blue-600 p-4 rounded-xl"
                onClick={handleAddChapter}
              >
                Add Chapter
              </button>
            </div>
            <div>
              <table className="w-full bg-white border rounded-md ">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-center border">
                      Title
                    </th>
                    <th className="px-4 py-2 text-center border">
                      Last Update
                    </th>
                    <th className="px-4 py-2 text-center border">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="font-bold"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {onSaveDataChapter.length > 0 ? (
                    onSaveDataChapter.map((chapter, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border text-center">
                          {chapter.title}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {chapter.date}
                        </td>
                        <td className="px-4 py-2 border text-center flex gap-3">
                          <button
                            type="button"
                            className="text-white flex-1 hover:underline p-3 bg-yellow-500 rounded-md hover:cursor-pointer"
                            onClick={() =>
                              history(
                                `/addstory/editstorychapter/${chapter.id}`
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-white flex-1 hover:underline p-3 bg-red-500 rounded-md hover:cursor-pointer"
                            onClick={() =>
                              handleDeleteChapter(chapter.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-4 py-2 border text-center"
                        colSpan="3"
                      >
                        No chapters available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <ModalCancel
              onClose={handleCloseModal}
              onConfirm={handleOnConfirm}
            />
          )}
          {showModalNoData && (
            <ModalCancelNoData
              onClose={handleCloseModalNoData}
              onConfirm={handleOnConfirm}
            />
          )}
          <div
            className=" flex justify-end items-end h-32 gap-4 mr-20 font-bold"
            style={{ fontFamily: 'Open Sans' }}
          >
            <button
              className="text-white  hover:underline p-3 bg-slate-500 rounded-md "
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="text-white hover:underline p-3 bg-blue-600 rounded-md hover:bg-blue-800"
              onClick={handleSubmit}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStoryGeneral;
