import { Button } from "@mui/material";

interface GameOverPageProps {
  score: number;
  onRestart: () => void;
}

export default function GameOverPage(props: GameOverPageProps) {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-5xl">Game Over</h1>
      <p className="text-2xl mt-5 mb-5">Your score: {props.score}</p>
      <Button variant="contained" onClick={props.onRestart}>
        Try Again
      </Button>
    </div>
  );
}
