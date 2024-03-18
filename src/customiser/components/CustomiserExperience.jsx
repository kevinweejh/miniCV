import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomiserExperience = ({ experience, setExperience }) => {

    const entryCount = experience.length;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsCurrent(e.target.checked);
        setEndDate(e.target.checked ? 'Present' : endDate);
    }


    const handleExperienceHistoryAdd = (e) => {
        e.preventDefault();

        const addedExperienceItem = {
            id: entryCount,
            companyName: e.target.companyNameInput.value,
            positionTitle: e.target.positionTitleInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : '',
            yearTo: endDate ? (endDate === 'Present' ? 'Present' : endDate.format('MMM YYYY')) : ''
        }

        let newExperienceHistory = [...experience, addedExperienceItem];

        setExperience(newExperienceHistory);
    }

    return(
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">Experience</summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleExperienceHistoryAdd}>
                        <label htmlFor="companyNameInput">Company Name: </label>
                        <input type="text" id="companyNameInput" name="companyNameInput" placeholder="Umbrella Corp."></input>
                        <label htmlFor="positionTitleInput">Position/Title: </label>
                        <input type="text" id="positionTitleInput" name="positionTitleInput" placeholder="Chief Scientist"></input>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <label htmlFor="yearFromInput">Start Date: </label>
                                <DatePicker id="yearFromInput" views={['year', 'month']} name="yearFromInput" value={startDate} onChange={setStartDate} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="yearToInput">End Date: </label>
                                <DatePicker id="yearToInput" views={['year', 'month']} name="yearToInput" value={endDate} onChange={setEndDate} disabled={isCurrent} />
                            </div>
                        </div>
                        <label htmlFor="yearToPresent">I am currently working here.</label>
                        <input
                            type="checkbox"
                            id="currentCheckbox"
                            checked={isCurrent}
                            onChange={handleCheckboxChange}
                        />
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Add</button>
                    </form>
                </div>
            </details>
            <hr></hr>
        </>
    )
}

CustomiserExperience.propTypes = {
    experience: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            companyName: PropTypes.string,
            positionTitle: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            // achievements: PropTypes.arrayOf(
            //     PropTypes.shape({
            //         id: PropTypes.number,
            //         text: PropTypes.string,
            //     })
            // ),
        })
    ).isRequired,
    setExperience: PropTypes.func.isRequired,
}

export default CustomiserExperience;