import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntries from './CustomiserPreviousEntries';
import dayjs from 'dayjs';

const CustomiserNonGeneral = ({ nonGeneralSection, setNonGeneralSection, formType }) => {
    const [idCounter, setIdCounter] = useState(0);

    const [orgName, setOrgName] = useState(null);
    const [position, setPosition] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(false);

    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState(0);

    const [editingId, setEditingId] = useState(null);

    const [order, setOrder] = useState([]);

    const isArrayFilled = nonGeneralSection.length > 0;

    const sortNonGeneralSection = (nonGeneralSection, order) => {
        const sortedNonGeneralSection = nonGeneralSection.sort((a, b) => {
            const indexA = order.indexOf(a.id);
            const indexB = order.indexOf(b.id);
            return indexA - indexB;
        });

        setNonGeneralSection(sortedNonGeneralSection);
    };

    const handleAchievementsListAdd = (newAchievement) => {
        let newAchievementsList = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    };

    const handleNonGeneralItemAdd = (e) => {
        e.preventDefault();

        const addedNonGeneralItem = {
            id: editingId !== null ? editingId : idCounter,
            orgName: e.target.orgNameInput.value,
            position: e.target.positionInput.value,
            yearFrom: startDate ? startDate.format('MMM YYYY') : null,
            yearTo: endDate ? endDate.format('MMM YYYY') : null,
            currentStatus: currentStatus,
            achievementsList: achievementsList,
        };

        let newNonGeneralSectionHistory;

        if (editingId !== null) {
            // Editing -> Replace the existing entry with edited entry
            newNonGeneralSectionHistory = nonGeneralSection.map((nonGeneralSectionItem) => {
                return nonGeneralSectionItem.id === editingId ? addedNonGeneralItem : nonGeneralSectionItem;
            });
        } else {
            // New entry -> Append to array of entries
            newNonGeneralSectionHistory = [...nonGeneralSection, addedNonGeneralItem];
            setOrder([...order, idCounter]);
            setIdCounter(idCounter + 1);
        }

        setNonGeneralSection(newNonGeneralSectionHistory);

        setOrgName(null);
        setPosition(null);
        setStartDate(null);
        setEndDate(null);
        setCurrentStatus(false);
        setAchievementsList([]);
        setEditingId(null);
        e.target.reset();
    };

    const handleEdit = (entry) => {
        setOrgName(entry.orgName);
        setPosition(entry.position);
        setStartDate(entry.yearFrom ? dayjs(entry.yearFrom, 'MMM YYYY') : null);
        setEndDate(entry.yearTo ? dayjs(entry.yearTo, 'MMM YYYY') : null);
        setCurrentStatus(entry.currentStatus);
        setAchievementsList(entry.achievementsList);

        setEditingId(entry.id);
    };

    const reorderUp = (entry) => {
        const currentPos = order.indexOf(entry.id);

        // Already first item in order array
        if (currentPos <= 0) {
            return;
        }

        const newOrder = [...order];
        newOrder.splice(currentPos, 1);
        newOrder.splice(currentPos - 1, 0, entry.id);

        setOrder(newOrder);
        sortNonGeneralSection(nonGeneralSection, newOrder);
    };

    const reorderDown = (entry) => {
        const currentPos = order.indexOf(entry.id);

        // Already last item in order array
        if (currentPos === order.length - 1) {
            return;
        }

        const newOrder = [...order];
        newOrder.splice(currentPos, 1);
        newOrder.splice(currentPos + 1, 0, entry.id);

        setOrder(newOrder);
        sortNonGeneralSection(nonGeneralSection, newOrder);
    };

    return (
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">
                    {formType === 'education' ? 'Education' : 'Experience'}
                </summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleNonGeneralItemAdd}>
                        <label htmlFor="orgNameInput">
                            {formType === 'education' ? 'School Name:' : 'Company Name:'}
                        </label>
                        <input
                            type="text"
                            id="orgNameInput"
                            name="orgNameInput"
                            placeholder={formType === 'education' ? 'Enter school name' : 'Enter company name'}
                            value={orgName || null}
                            onChange={(e) => setOrgName(e.target.value)}
                        ></input>
                        <label htmlFor="positionInput">
                            {formType === 'education' ? 'Course:' : 'Position/Title:'}
                        </label>
                        <input
                            type="text"
                            id="positionInput"
                            name="positionInput"
                            placeholder={
                                formType === 'education'
                                    ? 'Enter your course of studies'
                                    : 'Enter your position or title'
                            }
                            value={position || null}
                            onChange={(e) => setPosition(e.target.value)}
                        ></input>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <DatePicker
                                    id="yearFromInput"
                                    views={['year', 'month']}
                                    name="yearFromInput"
                                    value={startDate ? dayjs(startDate) : null}
                                    onChange={(newValue) => setStartDate(newValue ? dayjs(newValue) : null)}
                                />
                            </div>
                            <div className="flex flex-col">
                                {currentStatus ? (
                                    <input type="text" value="Present" disabled />
                                ) : (
                                    <DatePicker
                                        id="yearToInput"
                                        views={['year', 'month']}
                                        name="yearToInput"
                                        value={endDate ? dayjs(endDate) : null}
                                        onChange={(newValue) => setEndDate(newValue ? dayjs(newValue) : null)}
                                        disabled={currentStatus}
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
                            checked={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.checked)}
                        />
                        <CustomiserItemAchievementsList
                            achievementsList={achievementsList}
                            handleAchievementsListAdd={handleAchievementsListAdd}
                        />
                        <button
                            type="submit"
                            className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400"
                        >
                            {editingId !== null ? 'Save' : 'Add'}
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
                                editHandler={handleEdit}
                                order={order}
                                setOrder={setOrder}
                                reorderUp={reorderUp}
                                reorderDown={reorderDown}
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
