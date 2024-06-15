import Album from "../data/Album";

interface AlbumInfoProps {
  album: Album | undefined | null;
}

export default function AlbumInfo(props: AlbumInfoProps) {
  if (!props.album) {
    return <></>;
  }
  return (
    <div>
      <h2>{props.album.title}</h2>
      <p>{props.album.artist}</p>
      <p>{props.album.releaseDate}</p>
    </div>
  );
}
