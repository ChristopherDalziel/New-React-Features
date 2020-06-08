import React, { useState } from "react";

const NoteForm = ({ dispatch }) => {
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

  return (
    <>
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

export default NoteForm;
