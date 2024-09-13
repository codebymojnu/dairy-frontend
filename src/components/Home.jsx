import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal"; // Modal component for editing notes
import Note from "./Note"; // Note component to display each note
import WriteModal from "./WriteModal"; // Modal component for writing notes

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state

  const notesPerPage = window.innerWidth >= 768 ? 6 : 3; // 6 notes per page for desktop, 3 for mobile

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        "https://diaryaplusm.vercel.app/api/notes"
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://diaryaplusm.vercel.app/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdate = async (updatedNote) => {
    try {
      await axios.put(
        `https://diaryaplusm.vercel.app/api/notes/${updatedNote._id}`,
        updatedNote
      );
      fetchNotes();
      setSelectedNote(null); // Close the modal
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleWriteButtonClick = () => {
    setShowWriteModal(true);
  };

  const handleCloseWriteModal = () => {
    setShowWriteModal(false);
  };

  // Pagination logic
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(notes.length / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notes App</h1>
        <button
          onClick={handleWriteButtonClick}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
        >
          <FontAwesomeIcon icon={faPenNib} className="mr-2" />
          Write
        </button>
      </div>

      {/* Loader Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 016-7.75V6a6 6 0 00-6 6h1zm8-7.75A8 8 0 1120 12h-1a6 6 0 00-6-6v1z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentNotes.map((note) => (
              <Note
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {selectedNote && (
            <EditModal
              note={selectedNote}
              onClose={() => setSelectedNote(null)}
              onUpdate={handleUpdate}
            />
          )}
          {showWriteModal && (
            <WriteModal onClose={handleCloseWriteModal} onSave={fetchNotes} />
          )}
          <div className="flex justify-center mt-6">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
