import React from 'react';
import { useEffect,  useState } from 'react';

function Artist() {
    const [initialstate, setInitialstate] = useState([])
    useEffect(() => {

        fetch('/api/artist')
            .then(res => {
                console.log(res)
                if(res.ok) {
                    return res.json()
                }
            }).then(jsonResponse => setInitialstate(jsonResponse))
    }, [])
    return(
        <div>
            { initialstate.length > 0 && initialstate.map(e => <li>{e}</li>) }
        </div>
    )
}

export default Artist;