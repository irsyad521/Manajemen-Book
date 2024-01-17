import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStoryById, updateStory } from '../../services/storiesApi';
import {
  getChaptersByStoryId,
  deleteChapter,
} from '../../services/ChapterApi';

const EditStory = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('Financial');

  const [status, setStatus] = useState('Publish');
  const [coverImageFile, setCoverImageFile] = useState();
  const [previousImageUrl, setPreviousImageUrl] = useState('');
  const [chapters, setChapters] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storyToEdit = await getStoryById(id);

        setTitle(storyToEdit.data.title);
        setAuthor(storyToEdit.data.author);
        setSynopsis(storyToEdit.data.synopsis);
        setCategory(storyToEdit.data.category);
        setTags(storyToEdit.data.tags.split(','));
        setStatus(storyToEdit.data.status);
        setCoverImageFile(storyToEdit.data.coverImage);
        setPreviousImageUrl(
          ...previousImageUrl,
          `http://localhost:3000/api/images/${storyToEdit.data.coverImage}`
        );

        try {
          const responseChapter = await getChaptersByStoryId(
            storyToEdit.data.id
          );
          setChapters(responseChapter);
        } catch (error) {
          console.log('Error fetching chapter data', error.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = e => {
    setCoverImageFile(e.target.files[0]);
  };

  const handleUpdate = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('synopsis', synopsis);
      formData.append('category', category);
      formData.append('tags', tags);
      formData.append('status', status);

      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }

      await updateStory(id, formData);

      setTitle('');
      setAuthor('');
      setSynopsis('');
      setCategory('Financial');
      setTags('');
      setStatus('Publish');

      history('/');
    } catch (error) {
      console.error('Error updating story:', error.message);
    }
  };

  const handleAddChapter = () => {
    history(`/editstory/addstorychapter/${id}`);
  };

  const handleDeleteChapter = async id => {
    try {
      await deleteChapter(id);
      const newData = chapters.filter(data => data.id !== id);
      setChapters(newData);
    } catch (error) {
      console.error('Error deleting chapter:', error.message);
    }
  };
  const calender = inputDate => {
    const date = new Date(inputDate);
    const format = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', format);
    return formattedDate;
  };

  return (
    <div>
      <h1
        className="text-center text-3xl font-bold mt-5"
        style={{ fontFamily: 'Open Sans' }}
      >
        Edit Story
      </h1>
      <form onSubmit={handleUpdate}>
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 h-1/2"
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
          <div className="-mx-3 md:flex mb-2 items-end">
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="file"
              >
                Cover Image
              </label>

              <div className="flex justify-center items-center border border-grey-lighter ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker  rounded py-3 px-4"
                  id="file"
                />
                {coverImageFile && (
                  <img
                    src={previousImageUrl}
                    alt="Previous Cover Image"
                    className="h-10 w-40"
                  />
                )}
              </div>
            </div>

            <div className="md:w-1/2 px-3 ">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-status"
              >
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8  rounded"
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
                  {chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border text-center">
                          {chapter.chapter_title}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {calender(chapter.updatedAt)}
                        </td>
                        <td className="px-4 py-2 border text-center flex gap-3">
                          <button
                            type="button"
                            className="text-white flex-1 hover:underline p-3 bg-yellow-500 rounded-md hover:cursor-pointer"
                            onClick={() =>
                              history(
                                `/editstory/${id}/editstorychapter/${chapter.id}`
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

          <div className=" flex justify-end items-end h-32 gap-4 mr-20">
            <button
              className="text-white  hover:underline p-3 bg-slate-500 rounded-md "
              onClick={() => history('/')}
            >
              Cancel
            </button>
            <button
              className="text-white hover:underline p-3 bg-blue-600 rounded-md"
              onClick={handleUpdate}
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStory;
