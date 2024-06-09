export default interface Album {
  title: string;
  artist: string;
  release_date: string;
  genres: string,
  popularity_rank: number;
  score: number;
  cover_image_url?: string;
}
