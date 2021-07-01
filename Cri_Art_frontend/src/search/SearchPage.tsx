import UserCredentials from '../auth/UserCredentials'
import {SearchResult, Artist} from './SearchResult'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'

export interface SearchPageProps {
    creds: UserCredentials,
    params: SearchResult
}


function SearchPage(props: SearchPageProps) {
    const [content, setContent] = useState<SearchResult>(new SearchResult())
    const [done, setDone] = useState<Boolean>(true)
    const searchParams = useLocation().search
    const name = new URLSearchParams(searchParams).get('nameToSearchBy');
    console.log(`Parameter: ${name}`)

    useEffect(()=> {
        if (done) {
            setDone(false)
            props.creds.api?.fetchFromAPI(
                'GET',
                `/public/home/search?nameToSearchBy=${name}&token=${props.creds.token?.token}`,
                undefined,
                undefined
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
        const href = `/artist/${artist.artist_id}`
        return(
            <div className="card">
                <div className="card-header">
                    Artist
                </div>
                <div className="card-body">
                    <h5 className="card-title">{artist.username}</h5>
                    <p className="card-text">{artist.description}</p>
                    <a href={href} className="btn btn-primary">Go To Artist</a>
                </div>
            </div>
        )
    }


    return done ? (
        <div>
            <div>
                <h3>Search results</h3>
            </div>
            <div>
                {content.artistList?.map(renderArtists)}
            </div>
        </div>
    ) : ( <h1>Loading</h1> )
}

export default SearchPage