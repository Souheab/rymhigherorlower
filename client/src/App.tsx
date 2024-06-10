import { useState } from "react";
import "./App.css";
import StartPage from "./ui/StartPage";
import GamePage from "./ui/GamePage";
import GameOverPage from "./ui/GameOverPage";

function App() {
  // States, 0 = Game not started, 1 = Game started, 2 = Game over
  const [gameState, setGameState] = useState(0);
  const [score, setScore] = useState(0);

  let page = <StartPage onStart={() => setGameState(1)} />;

  switch (gameState) {
    case 0:
      page = <StartPage onStart={() => setGameState(1)} />;
      break;
    case 1:
      page = (
        <GamePage
          score={score}
          onScoreChange={(score) => setScore(score)}
          onGameEnd={() => setGameState(2)}
        />
      );
      break;
    case 2:
      page = (
        <GameOverPage
          score={score}
          onRestart={() => {
            setScore(0);
            setGameState(0);
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <>
      <header className="absolute top-2 left-1/2 transform -translate-x-1/2 text-black text-3xl font-bold text-center p-4">
        RYM Higher Or Lower
      </header>
      {page}
    </>
  );
}

export default App;
