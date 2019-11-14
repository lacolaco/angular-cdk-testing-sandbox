
import { createStore, createReducer, createSlice } from '@reduxjs/toolkit';

export const counterStore = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: state => {
      state.count++;
    }
  }
});
