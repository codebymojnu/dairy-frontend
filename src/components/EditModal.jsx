import React, { useState } from "react";

const EditModal = ({ note, onClose, onUpdate }) => {
  const [date, setDate] = useState(note.date);
  const [text, setText] = useState(note.text);
  const [writtenBy, setWrittenBy] = useState(note.writtenBy);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...note, date, text, writtenBy });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={new Date(date).toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value).toISOString())}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg h-32 focus:ring focus:ring-blue-200"
            placeholder="Write your note here..."
          ></textarea>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Written By
          </label>
          <select
            value={writtenBy}
            onChange={(e) => setWrittenBy(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="Mojnu">Mojnu</option>
            <option value="Asha">Asha</option>
          </select>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
