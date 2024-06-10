import { useState } from "react";
import "./App.css";
import StartPage from "./ui/StartPage";
import GamePage from "./ui/GamePage";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <>
      <header className="text-black text-3xl font-bold text-center p-4">RYM Higher Or Lower</header>
      {
        isGameStarted ? (
          <GamePage
            onGameEnd={(_) => {
              setIsGameStarted(false);
            }}
          />
        ) : (
          <StartPage onStart={() => setIsGameStarted(true)} />
        )
      }
    </>
  );
}

export default App;
