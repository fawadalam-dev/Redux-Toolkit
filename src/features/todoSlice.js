import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      text: "Complete Html Project",
      completed: true,
    },
    {
      id: 2,
      text: "Complete Css Project",
      completed: false,
    },
    {
      id: 3,
      text: "Complete JavaScript Project",
      completed: false,
    },
    {
      id: 4,
      text: "Complete React Project",
      completed: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log("payload:", action.payload);
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
