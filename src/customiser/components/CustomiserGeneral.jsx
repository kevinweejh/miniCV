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
    const [portfolioInputVis, setPortfolioInputVis] = useState(false);
    const [portfolio, setPortfolio] = useState(null);
    const [gitHubInputVis, setGitHubInputVis] = useState(false);
    const [gitHub, setGitHub] = useState(null);
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
            portfolioInputVis: portfolioInputVis,
            portfolio: portfolio,
            gitHubInputVis: gitHubInputVis,
            gitHub: gitHub,
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
                <summary className="flex flex-col rounded-t-md p-2 text-2xl font-semibold text-center bg-regent-st-blue-500 text-regent-st-blue-50 md:text-left hover:cursor-pointer hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700">
                    General
                </summary>
                <div className="p-4 bg-regent-st-blue-100 text-regent-st-blue-950">
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
                                id="showStateInput"
                                checked={stateInputVis}
                                onChange={(e) => setStateInputVis(e.target.checked)}
                            />
                            <label htmlFor="showStateInput">Include state</label>
                        </div>

                        {stateInputVis && (
                            <>
                                <label htmlFor="stateInput">State: </label>
                                <input
                                    type="text"
                                    id="stateInput"
                                    name="stateInput"
                                    value={state}
                                    placeholder="Enter state"
                                    onChange={(e) => setState(e.target.value)}
                                ></input>
                            </>
                        )}

                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="showCityInput"
                                checked={cityInputVis}
                                onChange={(e) => setCityInputVis(e.target.checked)}
                            />
                            <label htmlFor="showCityInput">Include city</label>
                        </div>

                        {cityInputVis && (
                            <>
                                <label htmlFor="cityInput">City: </label>
                                <input
                                    type="text"
                                    id="cityInput"
                                    name="cityInput"
                                    value={city}
                                    placeholder="Enter city"
                                    onChange={(e) => setCity(e.target.value)}
                                ></input>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="showPortfolioInput"
                                checked={portfolioInputVis}
                                onChange={(e) => setPortfolioInputVis(e.target.checked)}
                            />
                            <label htmlFor="showPortfolioInput">Include portfolio</label>
                        </div>

                        {portfolioInputVis && (
                            <>
                                <label htmlFor="portfolioInput">Portfolio URL: </label>
                                <input
                                    type="text"
                                    id="portfolioInput"
                                    name="portfolioInput"
                                    value={portfolio}
                                    placeholder="Enter portfolio URL"
                                    onChange={(e) => setPortfolio(e.target.value)}
                                ></input>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="showGitHubInput"
                                checked={gitHubInputVis}
                                onChange={(e) => setGitHubInputVis(e.target.checked)}
                            />
                            <label htmlFor="showGitHubInput">Include GitHub profile</label>
                        </div>

                        {gitHubInputVis && (
                            <>
                                <label htmlFor="gitHubInput">GitHub profile name: </label>
                                <input
                                    type="text"
                                    id="gitHubInput"
                                    name="gitHubInput"
                                    value={gitHub}
                                    placeholder="Enter GitHub profile name"
                                    onChange={(e) => setGitHub(e.target.value)}
                                ></input>
                            </>
                        )}
                        <button
                            type="submit"
                            className="text-lg text-center rounded-md w-fit mt-4 ml-auto px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </details>
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
