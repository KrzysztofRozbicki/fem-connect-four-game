export const changePlayerAction = state => {
  state.players[1].isActive = !state.players[1].isActive;
  state.players[2].isActive = !state.players[2].isActive;
};

export const resetPlayerAction = state => {
  state.players[1].isActive = true;
  state.players[2].isActive = false;
};
