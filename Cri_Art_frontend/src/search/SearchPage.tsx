import UserCredentials from '../auth/UserCredentials'
import SearchResult from './SearchResult'
import { useLocation } from 'react-router-dom'
import React from 'react'

export interface SearchPageProps {
    creds: UserCredentials,
    params: SearchResult
}

function SearchPage(props: SearchPageProps) {
    const searchParams = useLocation().search
    const name = new URLSearchParams(searchParams).get('nameToSearchBy');
    console.log(`Parameter: ${name}`)

    /* props.creds.api?.fetchFromAPI(
        'GET',
        `/public/home/search?nameToSearchBy=${name}&token=${props.creds.token?.token}`,
        undefined,
        undefined
    )
    .then(data   => {
        function buildArtists() {
            
        }

        return (
            {data.artistlist?.map(buildArtists)}
                <div className="card">
                    <div className="card-header">
                        Artist
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{artist.username}</h5>
                        <p className="card-text">{artist.description}</p>
                        <a href="#" className="btn btn-primary">Go To Artist</a>
                    </div>
                </div>
        )
    }) */


    return (
        <div>
            
        </div>
    )
}

export default SearchPage