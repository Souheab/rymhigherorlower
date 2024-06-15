import { useEffect, useState } from "react";
import { fetchAlbumPair } from "../api";
import AlbumSelectButton from "./AlbumSelectButton";
import Album from "../data/Album";
import AlbumInfo from "./AlbumInfo";
import LoadingSpinner from "./LoadingSpinner";
interface GamePageProps {
  onGameEnd: () => void;
  score: number;
  onScoreChange: (score: number) => void;
}

const totalImages = 2;

export default function GamePage(props: GamePageProps) {


  const [firstAlbum, setFirstAlbum] = useState(null as Album | undefined | null);
  const [secondAlbum, setSecondAlbum] = useState(
    null as Album | undefined | null,
  );
  const [numImagesLoaded, setNumImagesLoaded] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  function onGameEnd() {
    props.onGameEnd();
    setNumImagesLoaded(0);
  }

  useEffect(() => {
    if (numImagesLoaded >= totalImages) {
      setImagesLoaded(true);
    } else {
      setImagesLoaded(false);
      const timer = setTimeout(() => {
        if (numImagesLoaded < totalImages) {
          setImagesLoaded(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [numImagesLoaded]);

  useEffect(() => {
    fetchAlbumPair()
      .then((albumPair) => {
        setFirstAlbum(albumPair[0]);
        setSecondAlbum(albumPair[1]);
      })
      .catch((error) => {
        console.error("Error fetching albums: ", error);
        setFirstAlbum(undefined);
        setSecondAlbum(undefined);
      });
  }, [props.score]);

  const onLoaded = () => {
    setNumImagesLoaded(+numImagesLoaded + 1);
  };

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="text-4xl mt-16">Score: {props.score}</div>
      <div className="mt-[15%]">
        <div>
          Click on the album you think is rated higher on rateyourmusic.com
        </div>
        <div className="grid grid-cols-2 gap-16 justify-self-center mt-8">
          <AlbumSelectButton
            album={firstAlbum}
            onLoaded={onLoaded}
            loaded={imagesLoaded}
            onClick={() => {
              if (firstAlbum && secondAlbum) {
                if (firstAlbum.score >= secondAlbum.score) {
                  props.onScoreChange(props.score + 1);
                } else {
                  onGameEnd();
                }
              }

              setNumImagesLoaded(0);
            }}
          />
          <AlbumSelectButton
            album={secondAlbum}
            onLoaded={onLoaded}
            loaded={imagesLoaded}
            onClick={() => {
              if (firstAlbum && secondAlbum) {
                if (secondAlbum.score >= firstAlbum.score) {
                  props.onScoreChange(props.score + 1);
                } else {
                  onGameEnd();
                }
              }

              setNumImagesLoaded(0);
            }}
          />
          {imagesLoaded ?
            <>
              <AlbumInfo album={firstAlbum} />
              <AlbumInfo album={secondAlbum} />
            </>
            : <></>
          }
        </div>
        {!imagesLoaded && <LoadingSpinner />}
      </div>
    </div>
  );
}
