import React, { useEffect, useReducer } from "react";

import { notesReducer } from "../reducers/notes";
import NoteList from "./NoteList";
import AddNoteForm from "././AddNoteForm";
import NotesContext from "../context/notesContext";

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  // useReducer is taking in ourReducer and then our default state.
  // notes is the state
  const [notes, dispatch] = useReducer(notesReducer, []);

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
    // Everything thats provided in the value is shared via the context, in this example we're sharing the notes array as well as our dispatch function
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes:</h1>
      <p>Add note:</p>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
};
export default NoteApp;
