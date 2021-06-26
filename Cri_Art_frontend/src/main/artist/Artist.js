import React from 'react';
import { useEffect,  useState } from 'react';

function Artist() {
    const [initialstate, setInitialstate] = useState([])
    const [id, setid] = useState([])
    useEffect(() => {

        fetch(`/api/artist/${id}`)
            .then(res => {
                console.log(res)
                if(res.ok) {
                    return res.json()
                }
            }).then(jsonResponse => setInitialstate(jsonResponse))
    }, [id])
    return(
        <div>
            { initialstate.length > 0 && initialstate.map(e => <li>{e}</li>) }
        </div>
    )
}

export default Artist;