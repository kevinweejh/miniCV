import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntriesDeletionDialog from './CustomiserPreviousEntriesDeletionDialog';

const CustomiserPreviousEntries = ({ entry, fullList, updaterFn }) => {
    const [isDeletionDialogVisible, setIsDeletionDialogVisible] = useState(false);
    const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const isArrayFilled = education.length > 0;

    const handleOpenDeletionDialog = () => {
        setIsDeletionDialogVisible(true);
    };

    const handleDeletion = () => {
        setIsDeletionDialogVisible(false);
        const updatedList = fullList.filter((item) => item.id != entry.id);
        updaterFn(updatedList);
    };

    const handleCloseDeletionDialog = () => {
        setIsDeletionDialogVisible(false);
    };

    const handleOpenEditDialog = () => {
        setIsEditDialogVisible(true);
    };

    const handleEdit = () => {
        setIsEditDialogVisible(false);
        const updatedList = fullList.filter((item) => item.id != entry.id);
        updaterFn(updatedList);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogVisible(false);
    };

    return (
        <div className="px-4 py-2">
            <span className="text-xl font-semibold">
                {entry.titleOfStudy ? entry.titleOfStudy : entry.positionTitle}
            </span>
            <span> at </span>
            <span className="text-xl font-semibold">{entry.schoolName ? entry.schoolName : entry.companyName}</span>
            <button className="border border-black rounded" onClick={handleOpenEditDialog}>
                Edit
            </button>
            <button className="border border-black rounded" onClick={handleOpenDeletionDialog}>
                X
            </button>

            {isDeletionDialogVisible && (
                <CustomiserPreviousEntriesDeletionDialog
                    entry={entry}
                    handleDeletion={handleDeletion}
                    handleCloseDeletionDialog={handleCloseDeletionDialog}
                />
            )}

            {isEditDialogVisible && (
                <div className="p-4 bg-gray-200">
                    <dialog
                        open
                        className="border border-gray-400 bg-white rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10"
                    >
                        <form className="flex flex-col" onSubmit={handleEdit}>
                            <label htmlFor="schoolNameInput">School Name: </label>
                            <input
                                type="text"
                                id="schoolNameInput"
                                name="schoolNameInput"
                                placeholder="Berklee College of Music"
                            >
                                {entry.schoolName}
                            </input>
                            <label htmlFor="titleOfStudyInput">Title of Study: </label>
                            <input
                                type="text"
                                id="titleOfStudyInput"
                                name="titleOfStudyInput"
                                placeholder="Percussions"
                            >
                                {entry.titleOfStudy}
                            </input>
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <DatePicker
                                        id="yearFromInput"
                                        views={['year', 'month']}
                                        name="yearFromInput"
                                        value={entry.yearFrom}
                                        label="Start Date"
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
                                            value={entry.yearTo}
                                            label="End Date"
                                            onChange={setEndDate}
                                            disabled={isCurrent}
                                        />
                                    )}
                                </div>
                            </div>
                            <p>I am currently studying here.</p>
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
                                Save
                            </button>
                        </form>
                    </dialog>
                </div>
            )}
        </div>
    );
};

CustomiserPreviousEntries.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        companyName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
    }).isRequired,
    fullList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            schoolName: PropTypes.string,
            companyName: PropTypes.string,
            titleOfStudy: PropTypes.string,
            positionTitle: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            currentlyStudying: PropTypes.bool,
            achievementsList: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                }),
            ),
        }),
    ).isRequired,
    updaterFn: PropTypes.func.isRequired,
};

export default CustomiserPreviousEntries;
