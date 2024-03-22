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
            <ul>
                {achievementsList.map((achievement) => (
                    <CustomiserItemAchievement key={achievement.id} text={achievement.text} />
                ))}
            </ul>
            <input
                id="newAchievement"
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Enter achievement"
            ></input>
            <button
                onClick={handleAddClick}
                type="button"
                className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400"
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
