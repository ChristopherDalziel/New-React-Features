import React from "react";

export const Note = ({ note, removeNote }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
