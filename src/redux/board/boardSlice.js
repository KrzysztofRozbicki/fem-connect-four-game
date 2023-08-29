import { createSlice } from '@reduxjs/toolkit';
import { plainBoard, insertBall, checkWinner } from './operations';
import { TIME_PER_ROUND } from './operations';

const initialState = {
  board: plainBoard,
  winner: null,
  time: TIME_PER_ROUND,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard: state => {
      state.board = plainBoard;
      state.winner = null;
      state.time = TIME_PER_ROUND;
    },
    throwBall: (state, action) => {
      state.board = insertBall(state, action);
      state.winner = checkWinner(state, action);
      state.time = TIME_PER_ROUND;
    },
    updateTime: (state, action) => {
      const { time, activePlayer } = action.payload;
      state.time = time;
      if (state.time === 0) {
        if (activePlayer === 1) state.winner = 2;
        if (activePlayer === 2) state.winner = 1;
      }
    },
  },
});

export const { resetBoard, throwBall, updateTime } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
