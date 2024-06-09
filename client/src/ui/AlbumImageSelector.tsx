import Album from "../data/Album";

interface AlbumImageSelectorProps {
  album: Album;
}

export default function AlbumImageSelector(props: AlbumImageSelectorProps) {
  let imageUrl = "https://place-hold.it/250"

  if (props.album.cover_image_url) {
    imageUrl = props.album.cover_image_url;
  }

  return (
    <img src={imageUrl} width={250} height={250}>
    </img>
  );
}
