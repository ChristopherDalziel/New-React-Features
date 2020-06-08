// We need to create a reducer before we can call useReducer, using useReducer allows us to manage more complex state. Allowing us to remove this logic from our component and store it in a separate function and the component easier to manage and the reducer easier to re-use.
export const notesReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, { title: action.title, body: action.body }];
    case "REMOVE_NOTE":
      return state.filter((note) => note.title !== action.title);
    default:
      return state;
  }
};
