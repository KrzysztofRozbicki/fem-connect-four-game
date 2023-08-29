import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { boardReducer } from './board/boardSlice';
import { playerReducer } from './player/playerSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    player: playerReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
