export const selectActivePlayer = state => {
  if (state.player.players[1].isActive) return 1;
  else if (state.player.players[2].isActive) return 2;
  return null;
};

export const selectPlayerOnePoints = state => {
  return state.player.players[1].points;
};

export const selectPlayerTwoPoints = state => {
  return state.player.players[2].points;
};
