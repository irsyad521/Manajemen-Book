import { useState } from 'react';

const Tags = () => {
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);

  const addTags = e => {
    if (e.keyCode === 13 && tagValue) {
      setTags([...tags, tagValue]);
      setTagValue('');
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full ">
      <h1>add you tags</h1>
      <div className=" w-1/2 p-5  flex flex-wrap  gap-3 ">
        {tags.map((item, index) => {
          return (
            <button
              className="p-4 bg-blue-300 rounded-full font-bold"
              key={index}
            >
              {item}
            </button>
          );
        })}
        <input
          type="text"
          placeholder="type and enter"
          value={tagValue}
          onChange={e => setTagValue(e.target.value)}
          onKeyDown={addTags}
          className="p-4 w-full   "
        />
      </div>
    </div>
  );
};

export default Tags;
