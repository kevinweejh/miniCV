import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'

const CustomiserGeneral = ({ info, setInfo }) => {
    const [value, setValue] = useState();
    return(
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">General</summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col">
                        <label htmlFor="firstNameInput">First Name: </label>
                        <input type="text" id="firstNameInput" placeholder="John"></input>
                        <label htmlFor="lastNameInput">Last Name: </label>
                        <input type="text" id="lastNameInput" placeholder="Lee"></input>
                        <label htmlFor="emailInput">E-Mail: </label>
                        <input type="email" id="emailInput" placeholder="john.lee@gmail.com"></input>
                        <label htmlFor="mobileInput">Mobile No.: </label>
                        <PhoneInput 
                            id="mobileInput"
                            placeholder="Enter phone number"
                            value={value}
                            onChange={setValue} />
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Save</button>
                    </form>
                </div>
            </details>
            <hr></hr>
        </>
    )
}

CustomiserGeneral.propTypes = {
    info: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        mobile: PropTypes.string, 
    }),
    setInfo: PropTypes.func.isRequired,
}

export default CustomiserGeneral;