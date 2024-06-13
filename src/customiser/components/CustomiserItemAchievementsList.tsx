import { useState } from 'react';
import CustomiserItemAchievement from './CustomiserItemAchievement';
import { Tooltip } from 'react-tooltip';
import TooltipIcon from '../../assets/tooltip.svg?react';

interface CustomiserItemAchievementsListProps {
    achievementsList: { id: number; text: string }[];
    handleAchievementsListAdd: (newAchievement: string) => void;
    formType: string;
}

const CustomiserItemAchievementsList: React.FC<CustomiserItemAchievementsListProps> = ({ achievementsList, handleAchievementsListAdd, formType }) => {
    const [newAchievement, setNewAchievement] = useState<string>('');

    const handleAddClick = () => {
        if (newAchievement.trim()) {
            // Check if the input is not just empty spaces
            handleAchievementsListAdd(newAchievement);
            setNewAchievement(''); // Reset the input field
        }
    };

    return (
        <>
            <div className="flex gap-2 mt-2">
                <p className="font-semibold">{formType === 'education' ? 'Additional Details' : 'Achievements'}</p>
                {formType === 'education' ? (
                    <div>
                        <a
                            href="#detailsTooltip"
                            aria-describedby="detailsTooltip"
                            data-tooltip-id="detailsTooltip"
                            data-tooltip-wrapper="div"
                            data-tooltip-html="<u>GPA</u><br/>Only include if above 3.75/4.00, or 4.50/5.00. <br/>E.g. GPA: 3.96/4.00 <br/><br/><u>Award(s)</u><br/>Only include if extremely impressive and widely known. <br/>E.g. Awarded the President's Scholarship 2022<br/><br/><u>Notable Coursework</u><br/>Only include if extremely specialized and relevant to the role. <br/>E.g. Notable Coursework: Underwater Autonomous Robotics"
                            data-tooltip-place="top"
                        >
                            <TooltipIcon className="max-w-6 max-h-6" />
                        </a>
                        <Tooltip id="detailsTooltip" className="max-w-[70%] md:max-w-[20%]" />
                    </div>
                ) : (
                    <div>
                        <a
                            href="#achievementsTooltip"
                            aria-describedby="achievementsTooltip"
                            data-tooltip-id="achievementsTooltip"
                            data-tooltip-wrapper="div"
                            data-tooltip-html="For roles where performance is evaluated based on <u>clear, quantitative outcomes</u>, use the <u>XYZ Method</u>. <br/>Accomplished [X] as measured by [Y], by doing [Z]. <br/>E.g. Grew revenue for 15 small and medium business clients by 10% QoQ by mapping new software features as solutions to their business goals. <br/><br/>For roles that prioritise <u>problem-solving skills and innovation</u>, use the <u>CAR Method</u>. <br/>Challenge, Action, Result <br/>E.g. Increased sales-per-hour from 23 to 38 by implementing a faster lookup system. <br/><br/>For <u>managerial</u> roles, use the <u>STAR Method</u>. <br/>Situation, Task, Action, Result <br/>E.g. Led a team project that identified workflow bottlenecks and implemented a new management tool, resulting in a 20% increase in productivity. "
                            data-tooltip-place="top"
                        >
                            <TooltipIcon className="max-w-6 max-h-6" />
                        </a>
                        <Tooltip id="achievementsTooltip" className="max-w-[70%] md:max-w-[20%]" />
                    </div>
                )}
            </div>
            <ul>
                {achievementsList.map((achievement) => (
                    <CustomiserItemAchievement key={achievement.id} text={achievement.text} />
                ))}
            </ul>
            <div className="grid grid-cols-12 gap-1 items-center">
                <textarea
                    className="col-span-10 resize-none outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                    id="newAchievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder={formType === 'education' ? 'Enter detail' : 'Enter achievement'}
                ></textarea>
                <div className="col-span-2 flex justify-end">
                    <button
                        onClick={handleAddClick}
                        type="button"
                        className="text-lg font-semibold text-center rounded-[50%] w-fit px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomiserItemAchievementsList;
