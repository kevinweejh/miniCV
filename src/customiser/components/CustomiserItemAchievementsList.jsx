import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserItemAchievement from './CustomiserItemAchievement';

const CustomiserItemAchievementsList = ({ achievementsList, handleAchievementsListAdd }) => {
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
            <p className="mt-2">Achievements:</p>
            <ul>
                {achievementsList.map((achievement) => (
                    <CustomiserItemAchievement key={achievement.id} text={achievement.text} />
                ))}
            </ul>
            <input
                className="mt-2"
                id="newAchievement"
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Enter achievement"
            ></input>
            <button
                onClick={handleAddClick}
                type="button"
                className="text-lg text-center rounded-md w-fit mt-4 ml-auto px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
            >
                Add achievement
            </button>
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
};

export default CustomiserItemAchievementsList;
