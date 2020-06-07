import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// useState allows us to do something we couldn't do before, inside functional components we can now manage component state
// useEffect is similar, this is sort of a lifecycle method replacement, so we can do it inside a functional component

// ❌ BAD ❌

// This is an example of a pattern we're used to, however when using hooks this does not work. This doesn't work because it combines the state into a singular function and it doesn't merge the changes, it completely replaces the old state with the new state. Causing issues when we make changes to multiple parts of our application, for example when we increment and then change the string value using our input, our count input is completely removed and vice-versa.
// To avoid this we need to need to break up our state objects into individual values, this is shown in the example below.
// 1. State doesn't need to be an object with use state
// 2. You can call useState as many times as you need in a given component
// 3. When you're using and you update the state, it completely replaces what was there before unlike in previous versions of React where it was merged.
// const App = (props) => {
//   const [state, setState] = useState({
//     count: props.count,
//     string: "",
//   });

//   const increment = () => {
//     setState({ count: state.count + 1 });
//   };

//   const decrement = () => {
//     setState({ count: state.count - 1 });
//   };

//   const reset = () => {
//     setState({ count: props.count });
//   };

//   const updateString = (e) => {
//     setState({ string: e.target.value });
//   };

//   return (
//     <div>
//       <p>
//         The current {state.string || "count"} is ${state.count}
//       </p>
//       <button onClick={increment}>+ 1</button>
//       <button onClick={decrement}>- 1</button>
//       <button onClick={reset}>reset</button>
//       <input value={state.string} onChange={updateString} />
//     </div>
//   );
// };

// ✅ GOOD ✅

const App = (props) => {
  // count stores the count value, and setCount because it's setting the count. However these names can be anything.
  const [count, setCount] = useState(props.count);
  const [string, setString] = useState("");

  // useEffect runs once when the application renders, and then each time the there are changes made to the component state or props.
  // This means it's working as componentDidMount and componentDidUpdate but within a functional component instead of a class component.
  useEffect(() => {
    console.log("useEffect ran");
    // Sets the title of the document to 0 and updates each time we change the props by calling increment/decrement or reset
    document.title = count;
  });

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(props.count);
  };

  const updateString = (e) => {
    setString(e.target.value);
  };

  return (
    <div>
      <p>
        The current {string || "count"} is ${count}
      </p>
      <button onClick={increment}>+ 1</button>
      <button onClick={decrement}>- 1</button>
      <button onClick={reset}>reset</button>
      <input value={string} onChange={updateString} />
    </div>
  );
};

const NoteApp = () => {
  // notesData allows us to save all our data to localStorage
  const notesData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(notesData || []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle("");
    setBody("");
  };

  const removeNote = (title) => {
    // Return an array that matches the filter, then return true when notes title does not match the title passed in and return false when they do match
    setNotes(notes.filter((note) => note.title !== title));
  };

  // Use effect loads every time our application loads and every time the props/app state is updated, so on submission of a new note it set's the item to localState but it also calls the data from localState on pageload?
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  return (
    <>
      <h1>Notes:</h1>
      <p>Add note:</p>
      {notes.map((note) => (
        <div key={note.title}>
          <h2>{note.title}</h2>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
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

// Setting the default of count to 0 if an amount is not added to the 'App' props.
App.defaultProps = {
  count: 0,
};

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
