import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import TooltipIcon from '../../assets/tooltip.svg?react';

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
                        <label htmlFor="firstNameInput" className="mt-2 font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
                            id="firstNameInput"
                            name="firstNameInput"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="lastNameInput" className="mt-2 font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
                            id="lastNameInput"
                            name="lastNameInput"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="emailInput" className="mt-2 font-semibold">
                            E-Mail
                        </label>
                        <input
                            type="email"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
                            id="emailInput"
                            name="emailInput"
                            placeholder="yourname@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="mobileInput" className="mt-2 font-semibold">
                            Mobile No.
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
                                className="accent-regent-st-blue-400"
                                id="showStateInput"
                                checked={stateInputVis}
                                onChange={(e) => setStateInputVis(e.target.checked)}
                            />
                            <label htmlFor="showStateInput">Include state</label>
                        </div>

                        {stateInputVis && (
                            <>
                                <label htmlFor="stateInput" className="font-semibold">
                                    State
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
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
                                className="accent-regent-st-blue-400"
                                id="showCityInput"
                                checked={cityInputVis}
                                onChange={(e) => setCityInputVis(e.target.checked)}
                            />
                            <label htmlFor="showCityInput">Include city</label>
                        </div>

                        {cityInputVis && (
                            <>
                                <label htmlFor="cityInput" className="font-semibold">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
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
                                className="accent-regent-st-blue-400"
                                id="showPortfolioInput"
                                checked={portfolioInputVis}
                                onChange={(e) => setPortfolioInputVis(e.target.checked)}
                            />
                            <label htmlFor="showPortfolioInput">Include portfolio</label>
                            <div>
                                <a
                                    data-tooltip-id="portfolioTooltip"
                                    data-tooltip-wrapper="div"
                                    data-tooltip-html="<u>Designers & Creatives</u><br/>Showcase your artistry, published work, and personal style by adding a link to your portfolio."
                                    data-tooltip-place="top"
                                >
                                    <TooltipIcon className="max-w-6 max-h-6" />
                                </a>
                                <Tooltip id="portfolioTooltip" className="max-w-[70%] md:max-w-[20%]" />
                            </div>
                        </div>

                        {portfolioInputVis && (
                            <>
                                <label htmlFor="portfolioInput" className="font-semibold">
                                    Portfolio URL
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
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
                                className="accent-regent-st-blue-400"
                                id="showGitHubInput"
                                checked={gitHubInputVis}
                                onChange={(e) => setGitHubInputVis(e.target.checked)}
                            />
                            <label htmlFor="showGitHubInput">Include GitHub profile</label>
                            <div>
                                <a
                                    data-tooltip-id="gitHubTooltip"
                                    data-tooltip-wrapper="div"
                                    data-tooltip-html="<u>Software Developers</u><br/>Showcase your coding skills, contributions to open-source
                                    projects, and collaboration abilities by adding your GitHub profile. <br/><br/>Just enter the
                                    underlined portion: <br/>
                                    https://github.com/<u>kevinweejh</u>"
                                    data-tooltip-place="top"
                                >
                                    <TooltipIcon className="max-w-6 max-h-6" />
                                </a>
                                <Tooltip id="gitHubTooltip" className="max-w-[70%] md:max-w-[20%]" />
                            </div>
                        </div>

                        {gitHubInputVis && (
                            <>
                                <label htmlFor="gitHubInput" className="font-semibold">
                                    GitHub Profile Name
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
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
                            className="text-lg font-semibold text-center rounded-md w-fit mt-4 ml-auto px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
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
