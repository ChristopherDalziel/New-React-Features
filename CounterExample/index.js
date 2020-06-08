import React, { useState, useEffect } from "react";

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

export const App = (props) => {
  // count stores the count value, and setCount because it's setting the count. However these names can be anything.
  const [count, setCount] = useState(props.count);
  const [string, setString] = useState("");

  // This useEffect does not do anything when we update the title, however it runs away - for that reason we're going to restrict it's usage to only update when we update the count changes
  // useEffect runs once when the application renders, and then each time the there are changes made to the component state or props.
  // This means it's working as componentDidMount and componentDidUpdate but within a functional component instead of a class component.
  useEffect(() => {
    console.log("useEffect ran");
    // Sets the title of the document to 0 and updates each time we change the props by calling increment/decrement or reset
    document.title = count;
    // Adding count here below within an Array means this useEffect will only run when the count is updated
  }, [count]);

  // useEffect can be used as many times as we would like within the functional component, this means we can create one for each specific feature unlike previously when we would have just had to use 1 componentDidMount etc. useEffect(s) will run in the order they're listed within the component.
  useEffect(() => {
    console.log("this should only run once");
    // By adding an empty array it means this useEffect only runs once, because it depends on nothing.
  }, []);

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

// Setting the default of count to 0 if an amount is not added to the 'App' props.
App.defaultProps = {
  count: 0,
};
