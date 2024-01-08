// src/reducers/myReducer.js

import { createSlice } from '@reduxjs/toolkit';

const myReducer = createSlice({
  name: 'myReducer',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});
console.log(myReducer.reducer)
export const { increment, decrement } = myReducer.actions;
export default myReducer.reducer;
