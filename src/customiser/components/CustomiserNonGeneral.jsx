import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntries from './CustomiserPreviousEntries';

const CustomiserNonGeneral = ({ nonGeneralSection, setNonGeneralSection, formType }) => {
    const [idCounter, setIdCounter] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const isArrayFilled = nonGeneralSection.length > 0;

    const handleAchievementsListAdd = (newAchievement) => {
        let newAchievementsList = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    };

    const handleNonGeneralItemAdd = (e) => {
        e.preventDefault();

        const addedNonGeneralItem = {
            id: idCounter,
            orgName: e.target.orgNameInput.value,
            position: e.target.positionInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : '',
            yearTo: endDate ? endDate.format('MMM YYYY') : '',
            currentStatus: isCurrent,
            achievementsList: achievementsList,
        };

        let newNonGeneralSectionHistory = [...nonGeneralSection, addedNonGeneralItem];

        setNonGeneralSection(newNonGeneralSectionHistory);
        setIdCounter(idCounter + 1);

        setStartDate(null);
        setEndDate(null);
        setIsCurrent(false);
        setAchievementsList([]);
        e.target.reset();
    };

    return (
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">
                    {formType === 'education' ? 'Education' : 'Experience'}
                </summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleNonGeneralItemAdd}>
                        {formType === 'education' ? (
                            <>
                                <label htmlFor="orgNameInput">School Name: </label>
                                <input
                                    type="text"
                                    id="orgNameInput"
                                    name="orgNameInput"
                                    placeholder="Berklee College of Music"
                                ></input>
                                <label htmlFor="positionInput">Title of Study: </label>
                                <input
                                    type="text"
                                    id="positionInput"
                                    name="positionInput"
                                    placeholder="Percussions"
                                ></input>
                            </>
                        ) : (
                            <>
                                <label htmlFor="orgNameInput">Company Name: </label>
                                <input
                                    type="text"
                                    id="orgNameInput"
                                    name="orgNameInput"
                                    placeholder="Umbrella Corp."
                                ></input>
                                <label htmlFor="positionTitleInput">Position/Title: </label>
                                <input
                                    type="text"
                                    id="positionInput"
                                    name="positionInput"
                                    placeholder="Chief Scientist"
                                ></input>
                            </>
                        )}
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <DatePicker
                                    id="yearFromInput"
                                    views={['year', 'month']}
                                    name="yearFromInput"
                                    value={startDate}
                                    onChange={setStartDate}
                                />
                            </div>
                            <div className="flex flex-col">
                                {isCurrent ? (
                                    <input type="text" value="Present" disabled />
                                ) : (
                                    <DatePicker
                                        id="yearToInput"
                                        views={['year', 'month']}
                                        name="yearToInput"
                                        value={endDate}
                                        onChange={setEndDate}
                                        disabled={isCurrent}
                                    />
                                )}
                            </div>
                        </div>
                        <label htmlFor="currentCheckbox">
                            {formType === 'education'
                                ? 'I am currently studying here.'
                                : 'I am currently working here.'}
                        </label>
                        <input
                            type="checkbox"
                            id="currentCheckbox"
                            checked={isCurrent}
                            onChange={(e) => setIsCurrent(e.target.checked)}
                        />
                        <CustomiserItemAchievementsList
                            achievementsList={achievementsList}
                            handleAchievementsListAdd={handleAchievementsListAdd}
                        />
                        <button
                            type="submit"
                            className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400"
                        >
                            Add
                        </button>
                    </form>
                </div>
                <div className="bg-gray-200 flex flex-col divide-y divide-gray-400 border-t-2 border-black">
                    {isArrayFilled &&
                        nonGeneralSection.map((nonGeneralSectionItem) => (
                            <CustomiserPreviousEntries
                                key={nonGeneralSectionItem.id}
                                entry={nonGeneralSectionItem}
                                fullList={nonGeneralSection}
                                updaterFn={setNonGeneralSection}
                            />
                        ))}
                </div>
            </details>
            <hr></hr>
        </>
    );
};

CustomiserNonGeneral.propTypes = {
    nonGeneralSection: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            orgName: PropTypes.string,
            position: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            currentStatus: PropTypes.bool,
            achievements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                }),
            ),
        }),
    ).isRequired,
    setNonGeneralSection: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
};

export default CustomiserNonGeneral;
