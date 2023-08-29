import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import css from './Board.module.css';

import { selectBoard, selectWinner } from '../../redux/board/selectors';
import { throwBall } from '../../redux/board/boardSlice';
import { selectActivePlayer } from '../../redux/player/selectors';
import { changePlayer, incrementPlayerPoints } from '../../redux/player/playerSlice';

export const Board = ({ children }) => {
  const dispatch = useDispatch();

  const board = useSelector(selectBoard);

  const activePlayer = useSelector(selectActivePlayer);
  const winner = useSelector(selectWinner);

  const handleRound = rowIndex => {
    dispatch(throwBall({ rowIndex, activePlayer }));
    dispatch(changePlayer());
  };

  useEffect(() => {
    if (winner) {
      dispatch(incrementPlayerPoints(winner));
    }
  }, [winner, dispatch]);

  return (
    <>
      {children}
      <div className={css.board}>
        {board.map((row, rowIndex) => (
          <div
            className={css.boardRow}
            id={`row-${rowIndex}`}
            key={rowIndex}
            onClick={() => {
              handleRound(rowIndex, activePlayer);
            }}
          >
            {row.map((value, columnIndex) => (
              <div
                className={`${css.boardCell} ${
                  value === 1 ? css.boardCellRed : value === 2 ? css.boardCellYellow : ''
                }`}
                id={`${rowIndex}-${columnIndex}`}
                key={`${rowIndex}-${columnIndex}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
//  className={`${css.boardCell} ${hoveredColumn === columnIndex ? css.hovered : ''} ${clickedColumn === columnIndex ? css.clicked : ''}`}
export default Board;
