import { useRef } from "react"


function CreateArtistPage() {
    const tags = ['Web Design', 'Photoshop', 'Arts & Crafts', 'Movie Editing', 'Special Effects', '3D Modeling', 'Architecture', 'Character Design']
    const artistNameRef = useRef<HTMLInputElement>(null)
    const artistDescRef = useRef<HTMLInputElement>(null)
    const tagsRefs = new Array()
    
    
    tags.forEach(useReferenceOptions)

    function useReferenceOptions() {
        tagsRefs.push(useRef<HTMLInputElement>(null))
    }

    function renderTags(tag: string) {
        return (
            <label htmlFor="">
            <input type="checkbox" ref={tagsRefs[tags.indexOf(tag)]} name={tag} id="tag_option" />{tag}
            </label>
        )
    }

    function handleSubmit() {
        const aName = artistNameRef.current?.value
        const aDesc = artistDescRef.current?.value

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
            {tags.map(renderTags)}
            </div>
            <div>
            <button type="button" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )

}

export default CreateArtistPage