import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  message: '',
  isLoading: true,
  isError: false,
  errorMsg: ''
};

const url = 'http://localhost:3000/api/random_greeting'

export const getMessage = createAsyncThunk('message/getMessage', async (_ ,thunkAPI) => {
  try {
    const response = await axios(url)
    return response.data;
  } catch (error) {
    const errorMsg = `${error.code}: ${error.message}`;
    return thunkAPI.rejectWithValue(errorMsg)
  }
});

const messageSlice = createSlice({
  name: 'message',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getMessage.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(getMessage.rejected, (state, action) => {
      state.isError = true;
      state.errorMsg =  action.payload ;
      state.isLoading = false;
    })
  },
});

export default messageSlice.reducer;