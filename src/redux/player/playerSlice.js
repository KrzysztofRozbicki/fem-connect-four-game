import { createSlice } from '@reduxjs/toolkit';
import { changePlayerAction, resetPlayerAction } from './operations';

const initialState = {
  players: {
    1: {
      isActive: true,
      points: 0,
    },
    2: {
      isActive: false,
      points: 0,
    },
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changePlayer: changePlayerAction,
    resetPlayers: resetPlayerAction,
    incrementPlayerPoints: (state, action) => {
      state.players[action.payload].points++;
    },
  },
});

export const { changePlayer, resetPlayers, incrementPlayerPoints } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
