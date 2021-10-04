import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {Api, HTTP_METHOD} from "../api/Api";
import "./SearchBar.css"


function SearchBar(props: {location: string}) {
    const history = useHistory()
    const searchRef = useRef<HTMLInputElement>(null)
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (tags.length <= 0){
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                `/public/tags`,
                null
            ).then(tags => {
                if (tags) {
                    setTags(tags)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [tags, setTags])

    function handleSearch() {
        const toSearchBy = searchRef.current?.value
        console.log(toSearchBy)
        history.push(`search?nameToSearchBy=${toSearchBy}`)
    }

    function renderTag(tag: string, idx: number) {
        return (
            <li key={tag + idx}><button className="dropdown-item" onClick={() => {history.push(`/search?tagToSearchBy=${tag}`)}}>{tag}</button></li>

        )
    }


    return (
        <div className={`search-bar-${props.location}`}>
            <input type="text" className="form-control" id="exampleFormControlInput1" ref={searchRef}/>
            {/* <input type="text" id='home_search_bar' ref={searchRef}/> */}
            <button type="button" id='home_search_button' className="btn btn-primary"
                    onClick={handleSearch}>Search
            </button>
            <button type="button" className="btn btn-primary" data-bs-toggle="dropdown"
                    aria-expanded="false" id={"tag-dropdown"}>
                Tags
            </button>
            <ul className="dropdown-menu" id={"ddoptions"}>
                {tags.map(renderTag)}
            </ul>
        </div>
    )

}

export default SearchBar