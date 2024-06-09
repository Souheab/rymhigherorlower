import { Button } from "@mui/material";
interface StartPageProps {
  onStart: () => void;
}

export default function StartPage(props: StartPageProps) {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Button variant="contained" onClick={props.onStart}>
        Start Game
      </Button>
    </div>
  );
}
