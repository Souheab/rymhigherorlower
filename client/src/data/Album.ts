export default class Album {
  title: string;
  artist: string;
  releaseDate: string;
  genres: string;
  popularityRank: number;
  score: number;
  coverImageUrl?: string;

  constructor(
    title: string,
    artist: string,
    releaseDate: string,
    genres: string,
    popularityRank: number,
    score: number,
    coverImageUrl?: string,
  ) {
    this.title = title;
    this.artist = artist;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.popularityRank = popularityRank;
    this.score = score;
    this.coverImageUrl = coverImageUrl;
  }

  static createAlbumFromJSON(json: any) {
    const artists = json.artists;
    const artistString = artists.join(" & ");
    const genres = json.primaryGenres;
    const genresString = genres.join(", ");
    let coverImageUrl = undefined;

    if (json.coverArtThumb250 !== undefined) {
      coverImageUrl = json.coverArtThumb250;
    } else if (json.coverArtThumb500 !== undefined) {
      coverImageUrl = json.coverArtThumb1200;
    } else if (json.coverArtThumb1200 !== undefined) {
      coverImageUrl = json.coverArtThumb1200;
    } else if (json.coverArt !== undefined) {
      coverImageUrl = json.coverArt;
    }

    return new Album(
      json.title,
      artistString,
      json.releaseDate,
      genresString,
      // TODO change field to popularityRank in db?
      json.popularity_rank,
      json.score,
      coverImageUrl,
    );
  }
}
