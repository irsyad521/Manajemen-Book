import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStoryById } from '../../services/storiesApi';
import { getChaptersByStoryId } from '../../services/ChapterApi';

const StoryDetail = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('Financial');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('Publish');
  const [coverImageFile, setCoverImageFile] = useState();
  const [previousImageUrl, setPreviousImageUrl] = useState('');
  const [chapters, setChapters] = useState([]);

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
        setPreviousImageUrl([
          ...previousImageUrl,
          `http://localhost:3000/api/images/${storyToEdit.data.coverImage}`,
        ]);

        const chapters = await getChaptersByStoryId(
          storyToEdit.data.id
        );
        setChapters(chapters);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const calender = inputDate => {
    const date = new Date(inputDate);
    const format = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', format);
    return formattedDate;
  };

  return (
    <div
      className="flex justify-center min-h-screen "
      style={{ fontFamily: 'Open Sans' }}
    >
      <div className="  flex shadow-md  xl:flex-col w-1/2">
        <div className=" px-3">
          <h1 className="text-3xl  text-center mb-10 mt-10 font-bold">
            {' '}
            Cover Image
          </h1>

          <div className="flex justify-center  border w-full">
            {coverImageFile && (
              <img
                src={previousImageUrl}
                alt="Previous Cover Image"
                className="w-full h-full"
              />
            )}
          </div>
        </div>
        <div className=" min-h-screen font-medium">
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
            <h1 className="text-3xl font-semibold text-center mb-10">
              {' '}
              Detail
            </h1>
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
                  disabled
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
                  disabled
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
                  disabled
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
                    disabled
                  >
                    <option>Financial</option>
                    <option>Technology</option>
                    <option>Health</option>
                  </select>
                  <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
                </div>
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-tags"
                >
                  Tags/KeyWord Story
                </label>
                <div className="flex py-1  b flex-shrink-0 gap-2 overflow-x-auto   border bg-gray-100  rounded">
                  {tags.map((item, index) => (
                    <p
                      className="px-6 py-2 font-bold rounded-full  text-black  bg-slate-400 hover:cursor-pointer"
                      key={index}
                      onClick={() => removeTags(index)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-2 items-end justify-between">
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
                    disabled
                  >
                    <option>Publish</option>
                    <option>Draft</option>
                  </select>
                  <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
                </div>
              </div>
              <div className=" flex justify-end items-end h-32 gap-4 mr-20">
                <button
                  className="text-white  hover:underline p-3 hover:bg-blue-900 bg-blue-600 rounded-lg w-20 "
                  onClick={() => history('/')}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex justify-end mr-5 mb-6"></div>
              <div>
                <table
                  className="w-full bg-white border rounded-md font-bold"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  <thead>
                    <tr className="flex">
                      <th className="px-4 flex-1 py-2 text-center border">
                        Title
                      </th>
                      <th className="px-4 py-2 flex-1 text-center border">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.map((chapter, index) => (
                      <tr key={index} className="flex">
                        <td className="px-4 py-2 border flex-1 text-center">
                          {chapter.chapter_title}
                        </td>
                        <td className="px-4 py-2 border flex-1 text-center">
                          {calender(chapter.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
