import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';

const CustomiserGeneral = ({ info, setInfo }) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [stateInputVis, setStateInputVis] = useState(false);
    const [state, setState] = useState(null);
    const [cityInputVis, setCityInputVis] = useState(false);
    const [city, setCity] = useState(null);

    const handleGeneralInfoSave = (e) => {
        e.preventDefault();

        const updatedGeneralInfo = {
            ...info,
            firstName: firstName,
            lastName: lastName,
            email: email,
            countryCode: parsePhoneNumber(formatPhoneNumberIntl(mobile)).country,
            mobile: formatPhoneNumberIntl(mobile),
            stateInputVis: stateInputVis,
            state: state,
            cityInputVis: cityInputVis,
            city: city,
        };
        setInfo(updatedGeneralInfo);

        const generalTab = document.querySelector('#generalTab');
        generalTab.removeAttribute('open');
    };

    return (
        <>
            <details id="generalTab">
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">
                    General
                </summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleGeneralInfoSave}>
                        <label htmlFor="firstNameInput" className="mt-2">
                            First Name:{' '}
                        </label>
                        <input
                            type="text"
                            id="firstNameInput"
                            name="firstNameInput"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="lastNameInput" className="mt-2">
                            Last Name:{' '}
                        </label>
                        <input
                            type="text"
                            id="lastNameInput"
                            name="lastNameInput"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="emailInput">E-Mail: </label>
                        <input
                            type="email"
                            id="emailInput"
                            name="emailInput"
                            placeholder="yourname@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="mobileInput" className="mt-2">
                            Mobile No.:{' '}
                        </label>
                        <PhoneInput
                            id="mobileInput"
                            name="mobileInput"
                            placeholder="Enter phone number"
                            value={mobile}
                            onChange={setMobile}
                            required
                        />
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="showStateSelector"
                                checked={stateInputVis}
                                onChange={(e) => setStateInputVis(e.target.checked)}
                            />
                            <label htmlFor="showStateSelector">Include state</label>
                        </div>

                        {stateInputVis && (
                            <>
                                <label htmlFor="stateInput">State: </label>
                                <input
                                    type="text"
                                    id="stateInput"
                                    name="stateInput"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                ></input>
                            </>
                        )}

                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="showCitySelector"
                                checked={cityInputVis}
                                onChange={(e) => setCityInputVis(e.target.checked)}
                            />
                            <label htmlFor="showCitySelector">Include city</label>
                        </div>

                        {cityInputVis && (
                            <>
                                <label htmlFor="cityInput">City: </label>
                                <input
                                    type="text"
                                    id="cityInput"
                                    name="cityInput"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                ></input>
                            </>
                        )}
                        <button
                            type="submit"
                            className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </details>
            <hr></hr>
        </>
    );
};

CustomiserGeneral.propTypes = {
    info: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        mobile: PropTypes.string,
    }),
    setInfo: PropTypes.func.isRequired,
};

export default CustomiserGeneral;
