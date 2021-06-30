import UserCredentials from '../auth/UserCredentials'
import SearchResult from './SearchResult'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'

export interface SearchPageProps {
    creds: UserCredentials,
    params: SearchResult
}


function SearchPage(props: SearchPageProps) {
    const [content, setContent] = useState<SearchResult>(new SearchResult())
    const [initState, setInitState] = useState<any>({})
    const [done, setDone] = useState<Boolean>(true)
    const searchParams = useLocation().search
    const name = new URLSearchParams(searchParams).get('nameToSearchBy');
    console.log(`Parameter: ${name}`)

    useEffect(()=> {
        if (done) {
            props.creds.api?.fetchFromAPI(
                'GET',
                `/public/home/search?nameToSearchBy=${name}&token=${props.creds.token?.token}`,
                undefined,
                undefined
            ).then(jsonResponse => setInitState(jsonResponse))
            /* .then(data => {
                setInitState()
                console.log(data)
                setContent(data)
            })  */
            console.log(content)
            setDone(false)
        } else {
            setDone(true)
        }
    }, [content, setContent])




    function renderArtists(artist: object) {
        return(
            <h1>{artist}</h1>
        )
    }


    return (
        <div>
            { initState.length > 0 && initState.map((e: any) => {console.log("e:" + e);<h1>{e}</h1>}) }
        </div>
    )
}

export default SearchPage