import axios from "axios"
import { useEffect, useState } from "react"

const MatchesDisplay = ({ matсhes, setClickedUser }) => {

    const [mathchedProfiles, setmathchedProfiles] = useState(null)

    const matchedUserIds = Array.from(matсhes)



    const getMaches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                params: { userIds: JSON.stringify(matchedUserIds) }
            })
            setmathchedProfiles(response.data)

        }
        catch (err) { console.log(err) }
    }



    useEffect(() => {
        getMaches()
    }, [])



    return (
        <>
            <div className="matches-display">
                {mathchedProfiles?.map((match, index) => {
                    return <div onClick={() => setClickedUser(match)}
                        key={index} className={'match-card'}>
                        <div className="image-container">
                            <img src={match?.url} alt={match?.first_name + 'profile'} />
                        </div>
                        <h3 >{match?.first_name}</h3>
                    </div>

                })}

            </div>
        </>

    )
}

export default MatchesDisplay