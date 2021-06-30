import {Api} from '../api/Api'

const api = new Api()

function Feed() {

    let aList: object
    async function getArtists() {
        const response = api.fetchFromAPI(
            'GET',
            '/public/home/search?nameToSearchBy=',
            undefined,
            undefined
        ).then(data=> {
            aList = data.artistlist
        })
        /* const result = await response
        artists = result.artistlist
        return artists */
    }

    getArtists()

    function getCards(artist :any) {

        return (
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
    }

    return (
        <div className='feed'>
            {/* {aList.map(getCards)} */}
        </div>
    )
}

export default Feed