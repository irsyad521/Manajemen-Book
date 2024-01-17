import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Table from './components/StoryList/Table.jsx';
import AddStoryGeneral from './components/AddStory/AddStoryGeneral.jsx';
import EditStory from './components/EditStory/EditStory.jsx';
import AddStoryChapter from './components/AddStory/AddStoryChapter.jsx';
import EditStoryChapter from './components/EditStory/EditStoryChapter.jsx';
import EditAddStoryChapter from './components/EditStory/EditAddStoryChapter.jsx';
import EditEditStoryChapter from './components/EditStory/EditEditStoryChapter.jsx';
import StoryDetail from './components/StoryDetail/StoryDetail.jsx';
import ModalCancel from './utils/ModalCancel.jsx';
import Tags from './utils/Tags.jsx';

const App = () => {
  const [sendData, setSendData] = useState([]);

  const [onSaveDataChapter, setOnSaveDataChapter] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Table sendData={sendData} />,
    },
    {
      path: '/addstory',
      element: (
        <AddStoryGeneral
          setSendData={setSendData}
          onSaveDataChapter={onSaveDataChapter}
          setOnSaveDataChapter={setOnSaveDataChapter}
        />
      ),
    },
    {
      path: '/addstory/addstorychapter',
      element: <AddStoryChapter setOnSaveDataChapter={setOnSaveDataChapter} />,
    },
    {
      path: '/addstory/editstorychapter/:id',
      element: (
        <EditStoryChapter
          chapters={onSaveDataChapter}
          setChapters={setOnSaveDataChapter}
        />
      ),
    },
    {
      path: '/editstory/:id',
      element: <EditStory />,
    },
    {
      path: '/editstory/addstorychapter/:id',
      element: (
        <EditAddStoryChapter setOnSaveDataChapter={setOnSaveDataChapter} />
      ),
    },
    {
      path: '/editstory/:storyId/editstorychapter/:chapterId',
      element: (
        <EditEditStoryChapter
          chapters={onSaveDataChapter}
          setChapters={setOnSaveDataChapter}
        />
      ),
    },
    {
      path: '/storydetail/:id',
      element: <StoryDetail />,
    },
    {
      path: '/test',
      element: <Tags />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
