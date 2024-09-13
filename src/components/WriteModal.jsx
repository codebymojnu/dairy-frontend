import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const WriteModal = ({ onClose, onSave }) => {
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
      const response = await axios.post(
        "https://diaryaplusm.vercel.app/api/notes",
        newNote
      );
      onSave(response.data); // Add the new note to the state in Home
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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:ring focus:ring-red-300"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Write a New Note
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring focus:ring-blue-200"
              placeholder="Write your note here..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Written By
            </label>
            <select
              value={writtenBy}
              onChange={(e) => setWrittenBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            >
              <option value="Mojnu">Mojnu</option>
              <option value="Asha">Asha</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSaveNote}
              className={`w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all focus:ring focus:ring-blue-300 ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
