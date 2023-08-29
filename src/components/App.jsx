import { Board } from './Board';
import { Player } from './Player';
import { Timer } from './Timer';
import { Wrapper } from './Wrapper';

export const App = () => {
  return (
    <Wrapper>
      <Board>
        <Player />
      </Board>
      <Timer />
    </Wrapper>
  );
};

export default App;
