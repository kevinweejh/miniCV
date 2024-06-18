import PropTypes from 'prop-types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomiserItemAchievementsList from './CustomiserItemAchievementsList';
import CustomiserPreviousEntries from './CustomiserPreviousEntries';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tooltip';
import TooltipIcon from '../../assets/tooltip.svg?react';

interface NonGeneralItem {
    id: number | null;
    orgName: string;
    position: string;
    yearFrom: string | dayjs.Dayjs;
    yearTo: string | dayjs.Dayjs;
    currentStatus: boolean;
    achievementsList: { id: number; text: string }[];
    formType: string;
}

interface AchievementItem {
    id: number; 
    text: string;
}

interface CustomiserNonGeneralProps {
    nonGeneralSection: NonGeneralItem[];
    setNonGeneralSection: React.Dispatch<React.SetStateAction<NonGeneralItem[]>>;
    formType: string;
}

interface FormItem {
    orgName: string;
    position: string;
    currentStatus: boolean;
}

const CustomiserNonGeneral: React.FC<CustomiserNonGeneralProps> = ({ 
    nonGeneralSection, 
    setNonGeneralSection, 
    formType 
}) => {
    const [idCounter, setIdCounter] = useState<number>(0);

    const [form, setForm] = useState<FormItem>({
        orgName: '',
        position: '',
        currentStatus: false,
    });

    const [startDate, setStartDate] = useState<string | dayjs.Dayjs>('');
    const [endDate, setEndDate] = useState<string| dayjs.Dayjs>('');

    const [achievementsList, setAchievementsList] = useState<AchievementItem[]>([]);
    const [achievementIdCounter, setAchievementIdCounter] = useState<number>(0);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [order, setOrder] = useState<number[]>([]);

    const isArrayFilled: boolean = nonGeneralSection.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // Handle 'checkbox' and value inputs accordingly
        const value: boolean | string = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value,
        });
    };

    const sortNonGeneralSection = (
        nonGeneralSection: NonGeneralItem[],
        order: number[]
    ): void => {
        const sortedNonGeneralSection: NonGeneralItem[] = nonGeneralSection.sort((a, b) => {
            const indexA = order.indexOf(a.id ?? -1);
            const indexB = order.indexOf(b.id ?? -1);
            return indexA - indexB;
        });

        setNonGeneralSection(sortedNonGeneralSection);
    };

    const handleAchievementsListAdd = (newAchievement: string): void => {
        let newAchievementsList: AchievementItem[] = [...achievementsList, { id: achievementIdCounter, text: newAchievement }];
        setAchievementsList(newAchievementsList);
        setAchievementIdCounter(achievementIdCounter + 1);
    };

    const handleNonGeneralItemAdd = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const addedNonGeneralItem: NonGeneralItem = {
            id: editingId !== null ? editingId : idCounter,
            orgName: form.orgName,
            position: form.position,
            yearFrom: startDate ? (typeof startDate === 'string' ? startDate : startDate.format('MMM YYYY')) : '',
            yearTo: endDate ? (typeof endDate === 'string' ? endDate : endDate.format('MMM YYYY')) : '',
            currentStatus: form.currentStatus,
            achievementsList: achievementsList,
            formType: formType,
        };

        let newNonGeneralSectionHistory: NonGeneralItem[];

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

        setForm({
            ...form,
            orgName: '',
            position: '',
            currentStatus: false,
        });
        setStartDate('');
        setEndDate('');
        setAchievementsList([]);
        setEditingId(null);
        e.target.reset();
    };

    const handleEdit = (entry: NonGeneralItem): void => {
        setForm({
            ...form,
            orgName: entry.orgName,
            position: entry.position,
            currentStatus: entry.currentStatus,
        });
        setStartDate(entry.yearFrom ? dayjs(entry.yearFrom, 'MMM YYYY') : '');
        setEndDate(entry.yearTo ? dayjs(entry.yearTo, 'MMM YYYY') : '');
        setAchievementsList(entry.achievementsList);

        setEditingId(entry.id);
    };

    const reorderUp = (entry: NonGeneralItem) => {
        const currentPos = order.indexOf(entry.id ?? -1);

        // Already first item in order array
        if (currentPos <= 0) {
            return;
        }

        const newOrder = [...order];
        newOrder.splice(currentPos, 1);
        newOrder.splice(currentPos - 1, 0, entry.id ?? -1);

        setOrder(newOrder);
        sortNonGeneralSection(nonGeneralSection, newOrder);
    };

    const reorderDown = (entry: NonGeneralItem) => {
        const currentPos = order.indexOf(entry.id ?? -1);

        // Already last item in order array
        if (currentPos === order.length - 1) {
            return;
        }

        const newOrder = [...order];
        newOrder.splice(currentPos, 1);
        newOrder.splice(currentPos + 1, 0, entry.id ?? -1);

        setOrder(newOrder);
        sortNonGeneralSection(nonGeneralSection, newOrder);
    };

    return (
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center border-t border-regent-st-blue-400 bg-regent-st-blue-500 text-regent-st-blue-50 md:text-left hover:cursor-pointer hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700">
                    {formType === 'education' ? 'Education' : 'Experience'}
                </summary>
                <div className="p-4 bg-regent-st-blue-100 text-regent-st-blue-950">
                    <form className="flex flex-col" onSubmit={handleNonGeneralItemAdd}>
                        <label htmlFor="orgName" className="mt-2 font-semibold">
                            {formType === 'education' ? 'School Name' : 'Company Name'}
                        </label>
                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                            id="orgName"
                            name="orgName"
                            placeholder={formType === 'education' ? 'Enter school name' : 'Enter company name'}
                            value={form.orgName || ''}
                            onChange={handleChange}
                        ></input>
                        <div className="flex gap-2 mt-2">
                            <label htmlFor="position" className="font-semibold">
                                {formType === 'education' ? 'Course' : 'Position/Title'}
                            </label>
                            {formType === 'education' && (
                                <div>
                                    <a
                                        href="#position"
                                        aria-describedby="courseTooltip"
                                        data-tooltip-id="courseTooltip"
                                        data-tooltip-wrapper="div"
                                        data-tooltip-html="Depending on your preference, you can either truncate: <br/>[BE in Mechanical Engineering] <br/>or write in full: <br/>[Bachelor <u>of</u> Engineering <u>in</u> Mechanical Engineering] <br/><br/><u>BE/BEng</u> = Bachelor of Engineering <br/><u>BS/BSc</u> = Bachelor of Science <br/><u>BA</u> = Bachelor of Arts <br/><u>MArch</u> = Master of Architecture <br/>For PhD, just write 'PhD in ___'"
                                        data-tooltip-place="top"
                                    >
                                        <TooltipIcon className="max-w-6 max-h-6" />
                                    </a>
                                    <Tooltip id="courseTooltip" className="max-w-[70%] md:max-w-[20%]" />
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            className="outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                            id="position"
                            name="position"
                            placeholder={
                                formType === 'education'
                                    ? 'Enter your course of studies'
                                    : 'Enter your position or title'
                            }
                            value={form.position || ''}
                            onChange={handleChange}
                        ></input>
                        <div className="grid grid-cols-8 gap-2 items-center mt-2">
                            {formType === 'experience' && (
                                <>
                                    <div className="col-span-1 text-center font-semibold">From</div>
                                    <div className="col-span-3 items-center">
                                        <DatePicker
                                            format="MMM YYYY"
                                            views={['year', 'month']}
                                            name="yearFromInput"
                                            value={startDate ? dayjs(startDate) : ''}
                                            onChange={(newValue) => setStartDate(newValue ? dayjs(newValue) : '')}
                                        />
                                    </div>
                                </>
                            )}
                            {formType === 'education' ? (
                                <>
                                    <div className="col-span-5 font-semibold">Date of Graduation:</div>
                                </>
                            ) : (
                                <>
                                    <div className="col-span-1 text-center font-semibold">To</div>
                                </>
                            )}

                            <div className="col-span-3 items-center">
                                {form.currentStatus ? (
                                    <input className="text-center" type="text" value="Present" disabled />
                                ) : (
                                    <DatePicker
                                        format="MMM YYYY"
                                        views={['year', 'month']}
                                        name="yearToInput"
                                        value={endDate ? dayjs(endDate) : ''}
                                        onChange={(newValue) => setEndDate(newValue ? dayjs(newValue) : '')}
                                        disabled={form.currentStatus}
                                    />
                                )}
                            </div>
                        </div>
                        {formType === 'experience' && (
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    className="accent-regent-st-blue-400"
                                    id="currentStatus"
                                    name="currentStatus"
                                    checked={form.currentStatus}
                                    onChange={handleChange}
                                />
                                <label htmlFor="currentStatus">I am currently working here.</label>
                            </div>
                        )}

                        <CustomiserItemAchievementsList
                            achievementsList={achievementsList}
                            handleAchievementsListAdd={handleAchievementsListAdd}
                            formType={formType}
                        />
                        <button
                            type="submit"
                            className="border text-lg font-semibold text-center rounded-md w-fit mt-4 ml-auto px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
                        >
                            {editingId !== null ? 'Save Entry' : 'Add Entry'}
                        </button>
                    </form>
                </div>
                <div className="bg-gray-200 flex flex-col divide-y divide-regent-st-blue-400 border-t border-regent-st-blue-400">
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
        </>
    );
};

export default CustomiserNonGeneral;
