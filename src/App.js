import "./App.css";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [updateNote, setUpdateNote] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");

  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  function addNoteOpener(e) {
    if (isNoteOpen) {
      setIsNoteOpen(false);
    } else {
      setIsNoteOpen(true);
    }
  }

  function addNoteHandler() {
    if ((note !== "") & (title !== "")) {
      const id = Math.ceil(Math.random() * 1000);
      const noteObj = {};
      noteObj.id = id;
      noteObj.title = title;
      noteObj.note = note;

      const copyNotes = notes;
      copyNotes.push(noteObj);

      setNotes(copyNotes);
      setIsNoteOpen(false);

      setNote("");
      setTitle("");
    } else {
      setIsNoteOpen(false);
      setTimeout(() => {
        alert("Enter Both Title And Note");
      }, 1);
    }
  }

  function editHandler(note) {
    setSelectedNoteId(note.id);
    setIsModalOpen(true);

    setUpdateNote(note.note);
    setUpdateTitle(note.title);
  }

  function deleteHandler(deleteThis) {
    const sortedNotes = notes.filter((note) => note.id !== deleteThis);
    setNotes(sortedNotes);
  }

  function updateHandler() {
    if ((updateNote !== "") & (updateTitle !== "")) {
      const updatedNotes = notes.map((note) => {
        if (note.id === selectedNoteId) {
          return {
            ...note,
            title: updateTitle,
            note: updateNote,
          };
        } else {
          return note;
        }
      });
      setNotes(updatedNotes);
      okClose();
    } else {
      alert("Blank Title or Note");
    }
  }

  function okClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="header">
        <div className="header-content-container">
          <h2>Keep Notes</h2>
          <div onClick={addNoteOpener} className="add-note">
            <p>Add Note</p>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1237/1237946.png"
              alt="add note"
              width="15px"
              height="15px"
            />
          </div>
          <button className="search-bar">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              className="search"
              placeholder="Search Note"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
              alt="search icon"
              width="12px"
              height="12px"
            />
          </button>
        </div>
      </div>
      {isNoteOpen ? (
        <div className="input-container">
          <label htmlFor="title">Enter Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            placeholder="Title"
          />
          <label htmlFor="note">Enter Note</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            type="text"
            placeholder="Your Note"
          />
          <button onClick={addNoteHandler} className="add">
            Add
          </button>
        </div>
      ) : null}
      <div className="main">
        <div className="notes">
          {notes.map((note) => {
            return (
              <div key={note.id} className="note">
                <button onClick={(e) => editHandler(note)} className="edit">
                  Edit
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/16900/16900151.png"
                    alt="edit icon"
                    width="14px"
                    height="14px"
                  />
                </button>
                <p className="title">{note.title}</p>
                <p className="note-content">{note.note}</p>
                <div onClick={() => deleteHandler(note.id)} className="delete">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
                    alt="delete icon"
                    width="14px"
                    height="14px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen ? (
        <div className="modal">
          <div className="inner-modal">
            <input
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
            <input
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              type="text"
              placeholder="Note"
            />
            <button onClick={updateHandler} className="update">
              Update
            </button>
            <button onClick={okClose} className="ok">
              Ok
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
