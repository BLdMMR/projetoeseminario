export class SearchResult {
    public artistList?: Array<object>
    public workList?: Array<object>

    setResults(artistlist?: Array<object>, worklist?: Array<object>) {
        this.artistList = artistlist
        this.workList = worklist
    }

}


export default SearchResult