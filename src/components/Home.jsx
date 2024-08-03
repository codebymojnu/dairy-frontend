import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal"; // Modal component for editing notes
import Note from "./Note"; // Note component to display each note
import WriteModal from "./WriteModal"; // Modal component for writing notes

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "https://diaryaplusm.vercel.app/api/notes"
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mojnu and Asha's Diary</h1>
        <button
          onClick={handleWriteButtonClick}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
        >
          <FontAwesomeIcon icon={faPenNib} className="mr-2" />
          Write
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
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
      {showWriteModal && <WriteModal onClose={handleCloseWriteModal} />}
    </div>
  );
};

export default Home;
