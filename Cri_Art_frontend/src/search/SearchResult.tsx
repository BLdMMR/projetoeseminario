export class SearchResult {
  public artistList?: Array<Artist>
  public workList?: Array<object>

  setResults(artistlist?: Array<Artist>, worklist?: Array<object>) {
    this.artistList = artistlist
    this.workList = worklist
  }

}

export class Artist {
  public username: string
  public description: string
  public artist_id: string
  public reviews: number
  public tags: Array<string>

  constructor(username: string, description: string, artist_id: string, reviews: number, tags: Array<string>) {
    this.username = username;
    this.description = description;
    this.artist_id = artist_id;
    this.reviews = reviews;
    this.tags = tags
  }
}

export default SearchResult