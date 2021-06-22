import React from 'react';
import {useEffect,  useState} from 'react';

export const Artists = () => {
    const [initialstate, setInitialstate] = useState([])
    useEffect(()=>{
    fetch('/artist').then(res =>{
        if(res.ok){
            return res.json()
        }
    }).then(jsonResponse => setInitialstate(jsonResponse))
    }, [])
    return(
        <div>
            {initialstate.length > 0 && initialstate.map(e =><li>{e}</li>)}
        </div>
    )
} 