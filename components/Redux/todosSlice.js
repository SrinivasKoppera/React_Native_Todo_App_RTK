import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  singleTodo: {},
};

export const todosSlicer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodoAction: (state, action) => {
      let updateTods = state.todos.filter(
        (todo, index) => index !== action.payload
      );
      state.todos = updateTods;
    },
    getSingleTodoAction: (state, action) => {
      state.singleTodo = {
        ...state.todos[action.payload],
        id: action.payload,
      };
    },
    updateTodoAction: (state, action) => {
      let updateTodo = state.todos;
      updateTodo[action.payload.id] = action.payload;
      state.todos = updateTodo;
    },
  },
});

export const {
  addTodo,
  deleteTodoAction,
  updateTodoAction,
  getSingleTodoAction,
} = todosSlicer.actions;

export default todosSlicer.reducer;
