import { MouseEventHandler, useRef } from "react"
import { Api } from "../api/Api"
import UserCredentials from "../auth/UserCredentials"

export interface CreateArtistPageProps {
    creds: UserCredentials,
    api: Api
}

function CreateArtistPage(props: CreateArtistPageProps) {
    const tags = [
        'Web Design', 'Photoshop', "Arts 'n Crafts",
        'Movie Editing', 'Special Effects', '3D Modeling', 
        'Architecture', 'Character Design', 'Storytelling']
    const artistNameRef = useRef<HTMLInputElement>(null)
    const artistDescRef = useRef<HTMLInputElement>(null)
    let tagMap = new Map<string, boolean>()
    console.log(tagMap)
    
    
    tags.forEach(tag => {
        tagMap.set(tag, false)
    })

    function useReferenceOptions(tag: string) {
        tagMap.set(tag, false)
    }

    function handleTagChange(tag: string) {
        console.log("OnClick")
        tagMap.set(tag, !tagMap.get(tag))
        return undefined
    }

    function renderTags(tag: string) {
        //console.log(`<label htmlFor="">\n<input type="checkbox" name=${tag} id="tag_option" />${tag}\n</label>`)
        return (
            <label htmlFor="">
            <input type="button" onChange={handleTagChange(tag)} name={tag.toString()} id={tag.concat("_tag_option")}/>{tag}
            </label>
        )
    }

    function handleSubmit() {
        const aName = artistNameRef.current?.value
        const aDesc = artistDescRef.current?.value
        const tags = new Array()

        tagMap.forEach((key, value) => {
            if(key) tags.push(value)
        })

        console.log(`Artist Name: ${aName}\nArtist Description: ${aDesc}`)
        console.log(`Tags: ${tags}`)
        
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        props.api.fetchFromAPI(
            'POST',
            '/artist',
            headers,
            {
                username: aName,
                description: aDesc,
                tags: tags
            }
        ).then((data) => {
            console.log(data)
        })

    }

    function showTags() {
       console.log(tagMap)
    }


    return (
        <div>
            <div>
            <input type="text" ref={artistNameRef} placeholder='Artist Name'/>
            </div>
            <div>
            <input type="text" ref={artistDescRef} placeholder='Description'/>
            </div>
            <div>
            <label htmlFor="">
            <input type="checkbox" name="Web Design" onClick={()=>tagMap.set("Web Design", !tagMap.get("Web Design"))} id="tag_option" />Web Design
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Photoshop" onClick={()=>tagMap.set("Photoshop", !tagMap.get("Photoshop"))} id="tag_option" />Photoshop
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Arts 'n Crafts" onClick={()=>tagMap.set("Arts 'n Crafts", !tagMap.get("Arts 'n Crafts"))} id="tag_option" />Arts 'n' Crafts
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Movie Editing" onClick={()=>tagMap.set("Movie Editing", !tagMap.get("Movie Editing"))} id="tag_option" />Movie Editing
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Special Effects" onClick={()=>tagMap.set("Special Effects", !tagMap.get("Special Effects"))} id="tag_option" />Special Effects
            </label>
            <label htmlFor="">
            <input type="checkbox" name="3D Modeling" onClick={()=>tagMap.set("3D Modeling", !tagMap.get("3D Modeling"))} id="tag_option" />3D Modeling
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Architecture" onClick={()=>tagMap.set("Architecture", !tagMap.get("Architecture"))} id="tag_option" />Architecture
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Character Design" onClick={()=>tagMap.set("Character Design", !tagMap.get("Character Design"))} id="tag_option" />Character Design
            </label>
            <label htmlFor="">
            <input type="checkbox" name="Storytelling" onClick={()=>tagMap.set("Storytelling", !tagMap.get("Storytelling"))} id="tag_option" />Storytelling
            </label>
            </div>
            <div>
            <button type="button" onClick={handleSubmit}>Login</button>
            </div>
            <button onClick={showTags}>Show Tags</button>
        </div>
    )

}

export default CreateArtistPage

/*
<label htmlFor="">
<input type="checkbox" name=Web Design id="tag_option" />Web Design
</label>
 <label htmlFor="">
<input type="checkbox" name=Photoshop id="tag_option" />Photoshop
</label>
 <label htmlFor="">
<input type="checkbox" name=Arts & Crafts id="tag_option" />Arts & Crafts
</label>
 <label htmlFor="">
<input type="checkbox" name=Movie Editing id="tag_option" />Movie Editing
</label>
 <label htmlFor="">
<input type="checkbox" name=Special Effects id="tag_option" />Special Effects
</label>
 <label htmlFor="">
<input type="checkbox" name=3D Modeling id="tag_option" />3D Modeling
</label>
 <label htmlFor="">
<input type="checkbox" name=Architecture id="tag_option" />Architecture
</label>
 <label htmlFor="">
<input type="checkbox" name=Character Design id="tag_option" />Character Design
</label>
 <label htmlFor="">
<input type="checkbox" name=Storytelling id="tag_option" />Storytelling
</label>
*/