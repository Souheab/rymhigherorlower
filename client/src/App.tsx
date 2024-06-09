import { useState } from "react";
import "./App.css";
import StartPage from "./ui/StartPage";
import GamePage from "./ui/GamePage";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return isGameStarted ? (
    <GamePage />
  ) : (
    <StartPage onStart={() => setIsGameStarted(true)} />
  );
}

export default App;
