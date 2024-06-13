import Album from "./data/Album";

const apiURL = "https://rymholapi.souheab.com";
const apiEndpoint = `${apiURL}/randomalbumpair`;

export async function fetchAlbumPair(
  start?: number,
  end?: number,
): Promise<Array<Album>> {
  if (start === undefined) {
    start = 1;
  }

  if (end === undefined) {
    end = 400;
  }

  if (start < 1 || end > 400 || start > end) {
    throw new Error("Invalid start or end value");
  }

  const api_url = `${apiEndpoint}?start=${start}&end=${end}`;
  console.log("Contactig API at: ", api_url);

  const response = await fetch(api_url);

  if (!response.ok) {
    throw new Error("Error fetching albums");
  }

  const responseJSON: Array<any> = await response.json();
  const firstAlbum = Album.createAlbumFromJSON(responseJSON[0]);
  const secondAlbum = Album.createAlbumFromJSON(responseJSON[1]);
  return [firstAlbum, secondAlbum];
}
