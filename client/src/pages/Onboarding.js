import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useHistory } from "react-router-dom"
import Nav from "../components/Nav"

const OnBoarding = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const history = useHistory()
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: false,
        gender_identity: 'man',
        gender_interest: 'woman',
        email: '',
        url: '',
        about: '',
        matсhes: []

    })

    const handleChange = (ev) => {

        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        const name = ev.target.name
        console.log(formData)
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(formData)
    }
    const handleSubmit = async (ev) => {
        console.log('HandleSubmit')
        ev.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', { formData })
            const success = response.status === 200
            if (success) history.push('/dashboard')
        }
        catch (err) { console.log(err) }
    }

    return (
        <>
            <div><Link to={'/'} >
                <Nav minimal={true}


                    setShowModal={() => { }}
                    showModal={false}
                    setIsSignedUp={false}
                />
            </Link>
                <div className="onboarding">
                    <h2>CREATE ACCOUNT</h2>
                    <form onSubmit={handleSubmit}>
                        <section>


                            <label htmlFor="first_name" >Firstname</label>
                            <input
                                id="first_name"
                                type='text'
                                name='first_name'
                                placeholder="Имя"
                                required={true}
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <label  >Birthday</label>
                            <div className="multiple-input-container">

                                <input
                                    id="dob_day"
                                    type='number'
                                    name='dob_day'
                                    placeholder="DD"
                                    required={true}
                                    value={formData.dob_day}
                                    onChange={handleChange}
                                />

                                <input
                                    id="dob_month"
                                    type='number'
                                    name='dob_month'
                                    placeholder="MM"
                                    required={true}
                                    value={formData.dob_month}
                                    onChange={handleChange}
                                />
                                <input
                                    id="dob_year"
                                    type='number'
                                    name='dob_year'
                                    placeholder="YYYY"
                                    required={true}
                                    value={formData.dob_year}
                                    onChange={handleChange}
                                />
                            </div>
                            <label>GENDER</label>
                            <div className="multiple-input-container">

                                <input
                                    id="man-gender-identity"
                                    type='radio'
                                    name='gender_identity'
                                    value='man'
                                    onChange={handleChange}
                                    checked={formData.gender_identity === 'man'}
                                />
                                <label htmlFor="man-gender-identity" >Man</label>

                                <input
                                    id="woman-gender-identity"
                                    type='radio'
                                    name='gender_identity'
                                    value='woman'
                                    onChange={handleChange}
                                    checked={formData.gender_identity === 'woman'}
                                />
                                <label htmlFor="woman-gender-identity" >Woman</label>

                                <input
                                    id="more-gender-identity"
                                    type='radio'
                                    name='gender_identity'
                                    value='more'
                                    onChange={handleChange}
                                    checked={formData.gender_identity === 'more'}
                                />
                                <label htmlFor="more-gender-identity" >More</label>
                            </div>

                            <label htmlFor="show-gender" >Show gender on my profile
                                <input
                                    id="show-gender"
                                    type='checkbox'
                                    name='show_gender'
                                    onChange={handleChange}
                                    checked={formData.show_gender}
                                />
                            </label>
                            <label >Show me</label>
                            <div className="multiple-input-container">
                                <input
                                    id="man-gender-interest"
                                    type='radio'
                                    name='gender_interest'
                                    value='man'
                                    onChange={handleChange}
                                    checked={formData.gender_interest === 'man'}
                                />
                                <label htmlFor="man-gender-interest" >Man</label>

                                <input
                                    id="woman-gender-interest"
                                    type='radio'
                                    name='gender_interest'
                                    value='woman'
                                    onChange={handleChange}
                                    checked={formData.gender_interest === 'woman'}
                                />
                                <label htmlFor="woman-gender-interest" >Woman</label>

                                <input
                                    id="more-gender-interest"
                                    type='radio'
                                    name='gender_interest'
                                    value='everyone'
                                    onChange={handleChange}
                                    checked={formData.gender_interest === 'everyone'}
                                />
                                <label htmlFor="more-gender-interest" >Everyone</label>
                            </div>

                            <label htmlFor="about">About me</label>
                            <input
                                id='about'
                                type='text'
                                name='about'
                                required={true}
                                placeholder='i like walks...'
                                value={formData.about}
                                onChange={handleChange}
                            />
                            <input type='submit' />
                        </section>
                        <section>
                            <label htmlFor="url">Profile Photo</label>
                            <input
                                type='url'
                                name="url"
                                id='url'
                                onChange={handleChange}
                                required={true}
                            />
                            <div className="photo-container">
                                {formData.url && <img src={formData.url} alt='profile photo' />}
                            </div>
                        </section>
                        <section>

                        </section>

                    </form>

                </div>

            </div>
        </>
    )
}

export default OnBoarding