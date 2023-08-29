import { useSelector } from 'react-redux';

import css from './Player.module.css';
import { selectPlayerOnePoints, selectPlayerTwoPoints } from '../../redux/player/selectors';

export const Player = () => {
  const playerOnePoints = useSelector(selectPlayerOnePoints);
  const playerTwoPoints = useSelector(selectPlayerTwoPoints);

  return (
    <div className={css.playersWrapper}>
      <div className={css.player}>
        <p> Player 1: {playerOnePoints}</p>
      </div>
      <div>
        <p> Player 2: {playerTwoPoints}</p>
      </div>
    </div>
  );
};

export default Player;
