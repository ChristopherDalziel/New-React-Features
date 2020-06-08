import React, { useContext } from "react";
import NotesContext from "../context/notesContext";

export const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <button
        onClick={() => dispatch({ type: "REMOVE_NOTE", note: note.title })}
      >
        x
      </button>
    </div>
  );
};
