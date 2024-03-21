import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntries from './CustomiserPreviousEntries';

const CustomiserExperience = ({ experience, setExperience }) => {

    const [experienceIdCounter, setExperienceIdCounter] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const isArrayFilled = experience.length > 0;

    const handleAchievementsListAdd = (newAchievement) => {
        let newAchievementsList = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    }

    const handleExperienceHistoryAdd = (e) => {
        e.preventDefault();

        const addedExperienceItem = {
            id: experienceIdCounter,
            companyName: e.target.companyNameInput.value,
            positionTitle: e.target.positionTitleInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : '',
            yearTo: endDate ? endDate.format('MMM YYYY') : '',
            currentlyWorking: isCurrent,
            achievementsList: achievementsList,
        }

        let newExperienceHistory = [...experience, addedExperienceItem];

        setExperience(newExperienceHistory);
        setExperienceIdCounter(experienceIdCounter + 1);

        setStartDate(null);
        setEndDate(null);
        setIsCurrent(false);
        setAchievementsList([]);
        e.target.reset();
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
                                <DatePicker id="yearFromInput" views={['year', 'month']} name="yearFromInput" value={startDate} onChange={setStartDate} />
                            </div>
                            <div className="flex flex-col">
                                {isCurrent 
                                    ? <input type="text" value="Present" disabled />
                                    : <DatePicker id="yearToInput" views={['year', 'month']} name="yearToInput" value={endDate} onChange={setEndDate} disabled={isCurrent} />
                                }
                            </div>
                        </div>
                        <label htmlFor="currentCheckbox">I am currently working here.</label>
                        <input
                            type="checkbox"
                            id="currentCheckbox"
                            checked={isCurrent}
                            onChange={ (e) => setIsCurrent(e.target.checked) }
                        />
                        <CustomiserItemAchievementsList achievementsList={achievementsList} handleAchievementsListAdd={handleAchievementsListAdd} />
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Add</button>
                    </form>
                </div>
                <div className="bg-gray-200 flex flex-col divide-y divide-gray-400 border-t-2 border-black">
                    {isArrayFilled && experience.map((experienceItem) => 
                        <CustomiserPreviousEntries key={experienceItem.id} entry={experienceItem} fullList={experience} updaterFn={setExperience} />
                    )}
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
            currentlyWorking: PropTypes.bool,
            achievements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    setExperience: PropTypes.func.isRequired,
}

export default CustomiserExperience;