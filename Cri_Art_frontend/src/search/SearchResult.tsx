export class SearchResult {
    public artistlist?: Array<object>
    public worklist?: Array<object>

    setResults(artistlist?: Array<object>, worklist?: Array<object>) {
        this.artistlist = artistlist
        this.worklist = worklist
    }

}


export default SearchResult