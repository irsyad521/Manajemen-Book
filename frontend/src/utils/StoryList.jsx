import { useState } from 'react';

const StoryList = ({ setFilter, onClose }) => {
  const [status, setStatus] = useState('Publish');
  const [category, setCategory] = useState('Financial');

  const handleFilterReset = () => {
    setStatus('Publish');
    setCategory('Financial');
  };

  const handleFilterSubmit = () => {
    setFilter({ status: status, category: category });
    onClose();
  };

  return (
    <>
      <div
        className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
        style={{ fontFamily: 'Open Sans' }}
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <form>
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
              <div className="w-full flex justify-start text-gray-600 mb-3"></div>
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                Filter
              </h1>
              <label
                htmlFor="category"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Category
              </label>
              <select
                id="category"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Financial">Financial</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
              </select>

              <label
                htmlFor="status"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Status
              </label>
              <select
                id="status"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="flex items-center justify-start w-full gap-3">
                <button
                  className="flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  onClick={handleFilterReset}
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="flex-1 focus:outline-nlsone focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  onClick={handleFilterSubmit}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  onClick={() => onClose()}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StoryList;
