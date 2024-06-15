import Album from "../data/Album";

interface AlbumSelectButtonProps {
  album: Album | undefined | null;
  onClick: () => void;
  onLoaded: () => void;
  loaded: boolean;
}

export default function AlbumSelectButton(props: AlbumSelectButtonProps) {
  if (props.album === undefined) {
    return (
      <div>
        <p>Can't fetch album</p>
      </div>
    );
  }

  if (props.album === null) {
    return (
      <></>
    );
  }

  let imageUrl = "https://place-hold.it/250";

  if (props.album.coverImageUrl) {
    imageUrl = props.album.coverImageUrl;
  }

  return (
    <img
      className="hover:brightness-75 hover:cursor-pointer border border-black object-fill w-[250px] h-[250px]"
      src={imageUrl}
      width={250}
      height={250}
      onClick={props.onClick}
      style={{ display: props.loaded ? "block" : "none"}}
      onLoad={props.onLoaded}
    ></img>
  );
}
