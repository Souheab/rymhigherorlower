import { Button } from "@mui/material";
interface StartPageProps {
  onStart: () => void;
}

export default function StartPage(props: StartPageProps) {
  return (
    <>
    <div className="flex flex-col h-screen items-center justify-center mt-[-100px]">
      <img src="https://ia801309.us.archive.org/26/items/mbid-ffd6ebf5-10c1-3cca-915e-04c0aba926f3/mbid-ffd6ebf5-10c1-3cca-915e-04c0aba926f3-1761175461.jpg" width={400} height={400} className="mb-10"/>
      <Button variant="contained" onClick={props.onStart} sx={{width: '400px'}}>
        Start Game
      </Button>
    </div>
    </>
  );
}
