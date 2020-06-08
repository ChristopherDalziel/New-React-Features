import React, { useState, useEffect, useReducer } from "react";

import { notesReducer } from "../reducers/notes";
import NoteList from "./NoteList";

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  // useReducer is taking in ourReducer and then our default state.
  // notes is the state
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    // setNotes([
    //   ...notes,
    //   {
    //     title,
    //     body,
    //   },
    // ]);
    dispatch({ type: "ADD_NOTE", title, body });
    setTitle("");
    setBody("");
  };

  const removeNote = (title) => {
    // Return an array that matches the filter, then return true when notes title does not match the title passed in and return false when they do match
    // setNotes(notes.filter((note) => note.title !== title));
    dispatch({ type: "REMOVE_NOTE", title });
  };

  // Fetch existing note data on application load
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes });
    }
  }, []);

  // Set note data whenever notes are updated
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <h1>Notes:</h1>
      <p>Add note:</p>
      <NoteList notes={notes} removeNote={removeNote} />
      <form onSubmit={addNote}>
        <input
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button>Add note</button>
      </form>
    </>
  );
};
export default NoteApp;
