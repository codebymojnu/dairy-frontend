// Note.js
import React from "react";

const Note = ({ note, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-2 flex justify-between">
        <div className="text-left">
          {new Date(note.date).toLocaleDateString()}
        </div>
        <div className="text-write font-thin border-b-2 border-black">
          {note.writtenBy}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{note.text}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white py-1 px-3 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
