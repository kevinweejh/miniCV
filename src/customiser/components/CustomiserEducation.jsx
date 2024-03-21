import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntries from './CustomiserPreviousEntries';

const CustomiserEducation = ({ education, setEducation }) => {

    const [educationIdCounter, setEducationIdCounter] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const isArrayFilled = education.length > 0;

    const handleAchievementsListAdd = (newAchievement) => {
        let newAchievementsList = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    }

    const handleEducationHistoryAdd = (e) => {
        e.preventDefault();

        const addedEducationItem = {
            id: educationIdCounter,
            schoolName: e.target.schoolNameInput.value,
            titleOfStudy: e.target.titleOfStudyInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : '',
            yearTo: endDate ? endDate.format('MMM YYYY') : '',
            currentlyStudying: isCurrent, 
            achievementsList: achievementsList,
        }

        let newEducationHistory = [...education, addedEducationItem];

        setEducation(newEducationHistory);
        setEducationIdCounter(educationIdCounter + 1);

        setStartDate(null);
        setEndDate(null);
        setIsCurrent(false);
        setAchievementsList([]);
        e.target.reset();
    }

    return(
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">Education</summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleEducationHistoryAdd}>
                        <label htmlFor="schoolNameInput">School Name: </label>
                        <input type="text" id="schoolNameInput" name="schoolNameInput" placeholder="Berklee College of Music"></input>
                        <label htmlFor="titleOfStudyInput">Title of Study: </label>
                        <input type="text" id="titleOfStudyInput" name="titleOfStudyInput" placeholder="Percussions"></input>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <DatePicker id="yearFromInput" views={['year', 'month']} name="yearFromInput" value={startDate} label="Start Date" onChange={setStartDate} />
                            </div>
                            <div className="flex flex-col">
                                {isCurrent 
                                    ? <input type="text" value="Present" disabled /> 
                                    : <DatePicker id="yearToInput" views={['year', 'month']} name="yearToInput" value={endDate} label="End Date" onChange={setEndDate} disabled={isCurrent} />
                                }
                            </div>
                        </div>
                        <p>I am currently studying here.</p>
                        <input
                            type="checkbox"
                            id="currentCheckbox"
                            checked={isCurrent}
                            onChange={ (e) => setIsCurrent(e.target.checked) }
                        />
                        <CustomiserItemAchievementsList achievementsList={achievementsList} handleAchievementsListAdd={handleAchievementsListAdd} />
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Save</button>
                    </form>
                </div>
                <div className="bg-gray-200 flex flex-col divide-y divide-gray-400 border-t-2 border-black">
                    {isArrayFilled && education.map((educationItem) => 
                        <CustomiserPreviousEntries key={educationItem.id} entry={educationItem} />
                    )}
                </div>
            </details>
            <hr></hr>
        </>
    )
}

CustomiserEducation.propTypes = {
    education: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            schoolName: PropTypes.string,
            titleOfStudy: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            currentlyStudying: PropTypes.bool,
            achievements: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    setEducation: PropTypes.func.isRequired,
}

export default CustomiserEducation;