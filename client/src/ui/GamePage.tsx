import { useEffect, useState } from "react";
import { fetchAlbumPair } from "../api";
import AlbumSelectButton from "./AlbumSelectButton";
import Album from "../data/Album";
import AlbumInfo from "./AlbumInfo";
interface GamePageProps {
  onGameEnd: (score: number) => void;
}

export default function GamePage(props: GamePageProps) {
  const [firstAlbum, setFirstAlbum] = useState(undefined as Album | undefined);
  const [secondAlbum, setSecondAlbum] = useState(
    undefined as Album | undefined,
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchAlbumPair()
      .then((albumPair) => {
        console.log("Fetched albums: ", albumPair);
        setFirstAlbum(albumPair[0]);
        setSecondAlbum(albumPair[1]);
      })
      .catch((error) => {
        console.error("Error fetching albums: ", error);
      });
  }, [score]);

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="text-4xl mt-8">Score: {score}</div>
      <div className="mt-[15%]">
        <div>
          Click on the album you think is rated higher on rateyourmusic.com?
        </div>
        <div className="grid grid-cols-2 gap-16 justify-self-center mt-8">
          <AlbumSelectButton album={firstAlbum}
            onClick={() => {
              if (firstAlbum && secondAlbum) {
                if (firstAlbum.score >= secondAlbum.score) {
                  setScore(score + 1);
                } else {
                  props.onGameEnd(score);
                  setScore(0);
                }
              }
            }}
          />
          <AlbumSelectButton album={secondAlbum}
            onClick={() => {
              if (firstAlbum && secondAlbum) {
                if (secondAlbum.score >= firstAlbum.score) {
                  setScore(score + 1);
                }
                else {
                  props.onGameEnd(score);
                  setScore(0);
                }
              }
            }}
          />
          <AlbumInfo album={firstAlbum} />
          <AlbumInfo album={secondAlbum} />
        </div>
      </div>
    </div>
  );
}
