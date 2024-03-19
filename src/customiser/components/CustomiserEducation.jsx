import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';

const CustomiserEducation = ({ education, setEducation }) => {

    const entryCount = education.length;

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isCurrent, setIsCurrent] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const handleCheckboxChange = (e) => {
        setIsCurrent(e.target.checked);
        setEndDate(e.target.checked ? 'Present' : endDate);
    }

    const handleAchievementsListAdd = (newAchievement) => {
        let newAchievementsList = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    }

    const handleEducationHistoryAdd = (e) => {
        e.preventDefault();

        const addedEducationItem = {
            id: entryCount,
            schoolName: e.target.schoolNameInput.value,
            titleOfStudy: e.target.titleOfStudyInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : '',
            yearTo: endDate ? (endDate === 'Present' ? 'Present' : endDate.format('MMM YYYY')) : '',
            achievementsList: achievementsList,
        }

        let newEducationHistory = [...education, addedEducationItem];

        setEducation(newEducationHistory);
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
                                <label htmlFor="yearFromInput">Start Date: </label>
                                <DatePicker id="yearFromInput" views={['year', 'month']} name="yearFromInput" value={startDate} onChange={setStartDate} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="yearToInput">End Date: </label>
                                <DatePicker id="yearToInput" views={['year', 'month']} name="yearToInput" value={endDate} onChange={setEndDate} disabled={isCurrent} />
                            </div>
                        </div>
                        <label htmlFor="yearToPresent">I am currently studying here.</label>
                        <input
                            type="checkbox"
                            id="currentCheckbox"
                            checked={isCurrent}
                            onChange={handleCheckboxChange}
                        />
                        <CustomiserItemAchievementsList achievementsList={achievementsList} handleAchievementsListAdd={handleAchievementsListAdd} />
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Save</button>
                    </form>
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
            achievements: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    setEducation: PropTypes.func.isRequired,
}

export default CustomiserEducation;