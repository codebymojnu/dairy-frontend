import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const WriteModal = ({ onClose }) => {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [writtenBy, setWrittenBy] = useState("Mojnu");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async () => {
    if (!date || !text) {
      alert("Date and Note are required");
      return;
    }

    const newNote = { date, text, writtenBy };

    setIsSaving(true);

    try {
      await axios.post("https://diaryaplusm.vercel.app/api/notes", newNote);
      alert("Note saved successfully");
      setDate("");
      setText("");
      setWrittenBy("Mojnu");
      onClose(); // Close the modal after saving the note
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Close Button at the Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-700 text-white rounded-full hover:bg-red-800 focus:ring focus:ring-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <p className="font-bold mb-6 text-center">
          তারিখ, কে লিখেছে, এবং তোমার মেসেজ লিখে। সেভ নোট বাটনে ক্লিক কর।
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none"
            placeholder="Write your note here..."
          ></textarea>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Written By
          </label>
          <select
            value={writtenBy}
            onChange={(e) => setWrittenBy(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="Mojnu">Mojnu</option>
            <option value="Asha">Asha</option>
          </select>

          <div className="flex space-x-4">
            <button
              onClick={handleSaveNote}
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
