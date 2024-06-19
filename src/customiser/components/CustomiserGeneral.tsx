import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import E164Number from 'react-phone-number-input';
import { formatPhoneNumberIntl, parsePhoneNumber, PhoneNumber } from 'react-phone-number-input';
import { useState, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import TooltipIcon from '../../assets/tooltip.svg?react';

interface Info {
    firstName: string; 
    lastName: string; 
    email: string; 
    mobile: string | null;
}

interface AdditionalInfo {
    countryCode: string | undefined | null;
    portfolioInputVis: boolean;
    portfolio: string;
    gitHubInputVis: boolean;
    gitHub: string;
    stateInputVis: boolean;
    state: string;
    cityInputVis: boolean;
    city: string;
}

type Form = Info & AdditionalInfo;

interface CustomiserGeneralProps {
    info: Form;
    setInfo: React.Dispatch<React.SetStateAction<Form>>;
}

const CustomiserGeneral: React.FC<CustomiserGeneralProps> = ({ info, setInfo }) => {
    // const [mobile, setMobile] = useState<any>(null); // As required for PhoneInput component
    const [form, setForm] = useState<Form>({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        countryCode: '',
        portfolioInputVis: false,
        portfolio: '',
        gitHubInputVis: false,
        gitHub: '',
        stateInputVis: false,
        state: '',
        cityInputVis: false,
        city: '',
    });

    const generalTabRef = useRef<HTMLDetailsElement>(null); // For closing the 'General' tab on save

    // 'General' tab rarely needs further adjustments after initial input
    const handleRemoveAttribute = (): void => {
        if (generalTabRef.current) {
            generalTabRef.current.removeAttribute('open');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // Handle 'checkbox' and value inputs accordingly
        const value: boolean | string = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value,
        });
    };

    const handleMobileChange = (value: any): void => {
        setForm({
            ...form,
            mobile: value || null,
        });
    };

    const handleGeneralInfoSave = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Ensure mobile is not null or an empty string
        const formattedMobile = form.mobile ? formatPhoneNumberIntl(form.mobile) : null;
        const parsedPhoneNumber = formattedMobile ? parsePhoneNumber(formattedMobile) : null;
        const countryCode = parsedPhoneNumber ? parsedPhoneNumber.country : null;

        const updatedGeneralInfo: Form = {
            ...form,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            countryCode: countryCode,
            mobile: formattedMobile,
            portfolioInputVis: form.portfolioInputVis,
            portfolio: form.portfolio,
            gitHubInputVis: form.gitHubInputVis,
            gitHub: form.gitHub,
            stateInputVis: form.stateInputVis,
            state: form.state,
            cityInputVis: form.cityInputVis,
            city: form.city,
        };
        setInfo(updatedGeneralInfo);

        // Automatically closes the 'General' tab on save
        handleRemoveAttribute();
    };

    return (
        <>
            <details data-testid="generalTab" ref={generalTabRef}>
                <summary className="flex flex-col rounded-t-md p-2 text-2xl font-semibold text-center bg-regent-st-blue-500 text-regent-st-blue-50 md:text-left hover:cursor-pointer hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700">
                    General
                </summary>
                <div className="p-4 bg-regent-st-blue-100 text-regent-st-blue-950">
                    <form className="flex flex-col" onSubmit={handleGeneralInfoSave}>
                        <label htmlFor="firstName" className="mt-2 font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1mt-1"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        ></input>
                        <label htmlFor="lastName" className="mt-2 font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1mt-1"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        ></input>
                        <label htmlFor="email" className="mt-2 font-semibold">
                            E-Mail
                        </label>
                        <input
                            type="email"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1mt-1"
                            id="email"
                            name="email"
                            placeholder="yourname@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        ></input>
                        <label htmlFor="mobileInput" className="mt-2 font-semibold">
                            Mobile No.
                        </label>
                        <PhoneInput
                            id="mobileInput"
                            className="mt-1"
                            name="mobileInput"
                            placeholder="Enter phone number"
                            value={form.mobile || undefined}
                            onChange={handleMobileChange}
                            required
                        />
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                className="accent-regent-st-blue-400"
                                id="stateInputVis"
                                name="stateInputVis"
                                checked={form.stateInputVis}
                                onChange={handleChange}
                            />
                            <label htmlFor="stateInputVis">Include state</label>
                        </div>

                        {form.stateInputVis && (
                            <>
                                <label htmlFor="state" className="font-semibold">
                                    State
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                                    id="state"
                                    name="state"
                                    value={form.state}
                                    placeholder="Enter state"
                                    onChange={handleChange}
                                ></input>
                            </>
                        )}

                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                className="accent-regent-st-blue-400"
                                id="cityInputVis"
                                name="cityInputVis"
                                checked={form.cityInputVis}
                                onChange={handleChange}
                            />
                            <label htmlFor="cityInputVis">Include city</label>
                        </div>

                        {form.cityInputVis && (
                            <>
                                <label htmlFor="city" className="font-semibold">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    placeholder="Enter city"
                                    onChange={handleChange}
                                ></input>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                className="accent-regent-st-blue-400"
                                id="portfolioInputVis"
                                name="portfolioInputVis"
                                checked={form.portfolioInputVis}
                                onChange={handleChange}
                            />
                            <label htmlFor="portfolioInputVis">Include portfolio</label>
                            <div>
                                <a
                                    href="#portfolioInputVis"
                                    aria-describedby="portfolioTooltip"
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

                        {form.portfolioInputVis && (
                            <>
                                <label htmlFor="portfolio" className="font-semibold">
                                    Portfolio URL
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                                    id="portfolio"
                                    name="portfolio"
                                    value={form.portfolio}
                                    placeholder="Enter portfolio URL"
                                    onChange={handleChange}
                                ></input>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="checkbox"
                                className="accent-regent-st-blue-400"
                                id="gitHubInputVis"
                                name="gitHubInputVis"
                                checked={form.gitHubInputVis}
                                onChange={handleChange}
                            />
                            <label htmlFor="gitHubInputVis">Include GitHub profile</label>
                            <div>
                                <a
                                    href="#gitHubInputVis"
                                    aria-describedby="gitHubTooltip"
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

                        {form.gitHubInputVis && (
                            <>
                                <label htmlFor="gitHub" className="font-semibold">
                                    GitHub Profile Name
                                </label>
                                <input
                                    type="text"
                                    className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                                    id="gitHub"
                                    name="gitHub"
                                    value={form.gitHub}
                                    placeholder="Enter GitHub profile name"
                                    onChange={handleChange}
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

export default CustomiserGeneral;
