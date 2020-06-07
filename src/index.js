import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Hooks are nothing more than functions

const App = (props) => {
  // count stores the count value, and setCount because it's setting the count. However these names can be anything.
  const [count, setCount] = useState(props.count);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(props.count);
  };

  return (
    <div>
      <p>The current count is ${count}</p>
      <button onClick={increment}>+ 1</button>
      <button onClick={decrement}>- 1</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

// Setting the default of count to 0 if an amount is not added to the 'App' props.
App.defaultProps = {
  count: 0,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
