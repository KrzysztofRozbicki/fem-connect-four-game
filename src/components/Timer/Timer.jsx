import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectActivePlayer } from '../../redux/player/selectors';
import { selectTime, selectWinner } from '../../redux/board/selectors';
import { updateTime, resetBoard } from '../../redux/board/boardSlice';

export const Timer = () => {
  const activePlayer = useSelector(selectActivePlayer);
  const time = useSelector(selectTime);
  const dispatch = useDispatch();
  const winner = useSelector(selectWinner);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        dispatch(updateTime({ time: time - 1, activePlayer }));
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time, dispatch]);

  const handleStartNewGame = () => {
    dispatch(resetBoard());
  };

  return (
    <div>
      {winner ? (
        <>
          <p> Player {winner} </p>
          <p> WINS </p>
          <button onClick={() => handleStartNewGame()}> Play Again</button>
        </>
      ) : (
        <>
          <p>Player {activePlayer}`s Turn</p>
          <p>Time left: {time} </p>
        </>
      )}
    </div>
  );
};

export default Timer;
