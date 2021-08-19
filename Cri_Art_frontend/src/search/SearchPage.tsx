import {Artist, SearchResult} from './SearchResult'
import {useHistory, useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
//import './SearchPage.css'


function SearchPage(props: any) {
    const history = useHistory()
    const [content, setContent] = useState<SearchResult>(new SearchResult())
    const [done, setDone] = useState<Boolean>(true)
    const searchParams = useLocation().search
    const name = new URLSearchParams(searchParams).get('nameToSearchBy');
    console.log(`Token: ${AuthService.getToken()}`)

    useEffect(() => {
        if (done) {
            setDone(false)
            Api?.fetchFromAPI(
                HTTP_METHOD.GET,
                `/public/home/search?nameToSearchBy=${name}&token=${AuthService.getToken()}`

                ).then(data => {
                    console.log(`Data fetched: ${data}`)
                    setContent(data)
                    setDone(true)
                }) 
                /* ).then(jsonResponse => setInitState(jsonResponse)) */
            console.log(content)
            
        } 
    }, [content, setContent])




    function renderArtists(artist: Artist) {
        const href = `/artist/${artist.id}`
        console.log(artist)
        return(
            <div className="card">
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
            <div>
                <h3>Search results</h3>
            </div>
            <div className={"search-results"}>
                {content.artistList?.map(renderArtists)}
            </div>
        </div>
    ) : ( <h1>Loading</h1> )
}

export default SearchPage