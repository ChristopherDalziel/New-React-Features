import React, { useContext } from "react";
import NotesContext from "../context/notesContext";
import useMousePosition from "../hooks/useMousePosition";

export const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <p>
        Mouse position: {position.x}, {position.y}
      </p>

      <button
        onClick={() => dispatch({ type: "REMOVE_NOTE", note: note.title })}
      >
        x
      </button>
    </div>
  );
};
