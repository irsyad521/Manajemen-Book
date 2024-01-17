import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faListCheck,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import StoryList from '../../utils/StoryList';
import {
  deleteStory,
  getAllDataStories,
} from '../../services/storiesApi';

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [sendData, setSendData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ status: '', category: '' });
  const [filteredData, setFilteredData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDataStories();
      setSendData(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = sendData.filter(story => {
      const matchesSearchTerm =
        !searchTerm ||
        (story.author &&
          story.author
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (story.title &&
          story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesFilter =
        (!filter.category || story.category === filter.category) &&
        (!filter.status || story.status === filter.status);

      return matchesSearchTerm && matchesFilter;
    });

    setFilteredData(filteredData);
  }, [sendData, searchTerm, filter]);

  useEffect(() => {
    if (showModal) {
      const filteredData = sendData.filter(story => {
        const matchesFilter =
          (!filter.category || story.category === filter.category) &&
          (!filter.status || story.status === filter.status);

        return matchesFilter;
      });

      setFilteredData(filteredData);
    }
  }, [sendData, showModal, filter]);

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = sendData => {
    setShowModal(false);
  };

  const handleDelete = async id => {
    try {
      const response = await deleteStory(id);
      setSendData(prevData =>
        prevData.filter(story => story.id !== id)
      );
    } catch (error) {
      return error.message;
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <nav className="flex items-center justify-start px-6 py-4 gap-3 bg-gray-800 text-white">
        <FontAwesomeIcon icon={faShopify} size="3x" />
        <h1
          className="text-3xl font-bold "
          style={{ fontFamily: 'Open Sans' }}
        >
          StoryKu
        </h1>
      </nav>

      <div
        className="flex justify-center items-start bg-slate-200 min-h-screen  w-full font-normal "
        style={{ fontFamily: 'Open Sans' }}
      >
        <div
          className="w-1/4 flex flex-col justify-start min-h-screen  gap-8 border border-solid border-r-4 border-slate-300 "
          style={{ fontFamily: 'Open Sans' }}
        >
          <div className="flex flex-col p-6 px-6 gap-4">
            <div className="flex gap-4">
              <FontAwesomeIcon
                icon={faHouse}
                size="2xl"
                style={{ color: 'blue' }}
              />{' '}
              <a
                href="#"
                className="text-blue-600 text-xl font-bold underline "
              >
                Home
              </a>
            </div>

            <div className="flex gap-4">
              <FontAwesomeIcon
                icon={faListCheck}
                size="2xl"
                style={{ color: 'blue' }}
              />
              <a
                href="#"
                className="text-blue-600 text-xl font-bold underline"
              >
                Management Story
              </a>
            </div>
          </div>
        </div>

        <div
          className="w-3/4 font-medium"
          style={{ fontFamily: 'Open Sans' }}
        >
          <div className="p-6 bg-slate-200 items-center flex ">
            <h1 className="text-3xl font-bold flex-1">List Story</h1>
            <input
              type="text"
              placeholder="Search by writer's name/title story"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border placeholder-blue-400 placeholder:font-semibold border-blue-400 rounded-md focus:outline-none text-xl text-blue-400 font-semibold"
            />
            <FontAwesomeIcon
              icon={faFilter}
              size="2xl"
              className="ml-4 mr-4 bg-white p-3 rounded-full border border-blue-400 hover:cursor-pointer hover:bg-blue-400 "
              onClick={handleFilterClick}
            />
            {showModal && (
              <StoryList
                onClose={handleCloseModal}
                setFilter={setFilter}
                initialFilter={filter}
              />
            )}

            <button
              type="button"
              onClick={() => history('/addstory')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4  ml-3 rounded"
            >
              Add Story
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <table className="w-full bg-white border rounded-md ">
              <thead className="font-bold">
                <tr>
                  <th className="px-4 py-2 text-center border ">
                    Title
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Author
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Category
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Tags
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Status
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((story, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-center border">
                      {story.title || null}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {story.author || null}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {story.category || null}
                    </td>
                    <td className="px-4 py-4 text-center border flex justify-center gap-3  ">
                      {story.tags
                        ? story.tags.split(',').map((tag, index) => (
                            <p
                              key={index}
                              className="text-center px-4 py-2 font-semibold rounded-full bg-slate-500 text-white"
                            >
                              {tag}
                            </p>
                          ))
                        : null}
                    </td>

                    <td className="px-4 py-2 text-center border">
                      <p className="text-center px-1 py-1 font-semibold rounded-full bg-slate-500 text-white">
                        {story.status || null}
                      </p>
                    </td>

                    <td className="px-4 py-2 border flex gap-3">
                      <button
                        className="text-white flex-1 hover:underline py-3 bg-yellow-500 rounded-md "
                        onClick={() =>
                          history(`/editstory/${story.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="text-white flex-1 hover:underline py-3 bg-blue-400 rounded-md"
                        onClick={() =>
                          history(`/storydetail/${story.id}`)
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="text-white flex-1 hover:underline py-3  bg-red-500 rounded-md"
                        onClick={() => handleDelete(story.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
