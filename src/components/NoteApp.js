import React, { useEffect, useReducer } from "react";

import { notesReducer } from "../reducers/notes";
import NoteList from "./NoteList";
import AddNoteForm from "././AddNoteForm";

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  // useReducer is taking in ourReducer and then our default state.
  // notes is the state
  const [notes, dispatch] = useReducer(notesReducer, []);

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
      <AddNoteForm dispatch={dispatch} />
    </>
  );
};
export default NoteApp;
