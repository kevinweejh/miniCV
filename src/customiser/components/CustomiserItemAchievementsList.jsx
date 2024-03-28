import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserItemAchievement from './CustomiserItemAchievement';

const CustomiserItemAchievementsList = ({ achievementsList, handleAchievementsListAdd, formType }) => {
    const [newAchievement, setNewAchievement] = useState('');

    const handleAddClick = () => {
        if (newAchievement.trim()) {
            // Check if the input is not just empty spaces
            handleAchievementsListAdd(newAchievement);
            setNewAchievement(''); // Reset the input field
        }
    };

    return (
        <>
            <p className="mt-2 font-semibold">{formType === 'education' ? 'Additional details:' : 'Achievements:'}</p>
            <ul>
                {achievementsList.map((achievement) => (
                    <CustomiserItemAchievement key={achievement.id} text={achievement.text} />
                ))}
            </ul>
            <div className="grid grid-cols-12 gap-1 mt-2 items-center">
                <textarea
                    className="col-span-10 resize-none outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1"
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

CustomiserItemAchievementsList.propTypes = {
    achievementsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
        }),
    ).isRequired,
    handleAchievementsListAdd: PropTypes.func.isRequired,
    formType: PropTypes.string,
};

export default CustomiserItemAchievementsList;
