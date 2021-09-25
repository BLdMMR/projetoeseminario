import {Artist, SearchResult} from './SearchResult'
import {useHistory, useLocation} from 'react-router-dom'
import React, {useEffect, useRef, useState} from 'react'
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import './SearchPage.css'


function SearchPage(props: any) {
    const history = useHistory()
    const [content, setContent] = useState<SearchResult>(new SearchResult())
    const [done, setDone] = useState<Boolean>(true)
    const searchParams = useLocation().search
    const name = new URLSearchParams(searchParams).get('nameToSearchBy');
    const tag = new URLSearchParams(searchParams).get('tagToSearchBy')
    const searchPar = name? name : tag
    const [searchParam, setSearchParam] = useState<string>(searchPar!!)
    const searchRef = useRef<HTMLInputElement>(null)
    console.log(`Token: ${AuthService.getToken()}`)

    useEffect(() => {
        if (done) {
            setDone(false)
            const path = name == null?
                `/public/home/tags?tagToSearchBy=${searchParam}&token=${AuthService.getToken()}`:
                `/public/home/search?nameToSearchBy=${searchParam}&token=${AuthService.getToken()}`
            Api?.fetchFromAPI(
                HTTP_METHOD.GET,
                path
                ).then(data => {
                    console.log(`Data fetched: ${data}`)
                    setContent(data)
                    setDone(true)
                }) 
                /* ).then(jsonResponse => setInitState(jsonResponse)) */
            console.log(content)
            
        } 
    }, [content, setContent, searchParam, setSearchParam])




    function renderArtists(artist: Artist) {
        const href = `/artist/${artist.id}`
        console.log(artist)
        return(
            <div className="card" id={"search-card"}>
                <div className="card-header">
                    <h5 className="card-title">{artist.username}</h5>
                </div>
                <div className="card-body">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example">
                        <p className="card-text">{artist.description}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => {history.push(href)}}>Go To Artist</button>
                    {/*<a href={href} className="btn btn-primary">Go To Artist</a>*/}
                </div>
            </div>
        )
    }


    return done ? (
        <div>
            <div className={'re-search'}>
                <input type="text" className="form-control" id="header-search-bar" ref={searchRef} />
                <button type="button" id='header_search_button' className="btn btn-primary" onClick={() => setSearchParam(searchRef.current!.value)}>Search</button>
            </div>
            <div className={"search-results"}>
                <h3>Search results:</h3>
                {content.artistList?.map(renderArtists)}
            </div>
        </div>
    ) : ( <h1>Loading</h1> )
}

export default SearchPage