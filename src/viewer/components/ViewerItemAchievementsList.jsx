import PropTypes from 'prop-types';
import ViewerItemAchievement from './ViewerItemAchievement';

const ViewerItemAchievementsList = ({ achievementsList }) => {
    return (
        <ul>
            {achievementsList.map((achievement) => (
                <ViewerItemAchievement key={achievement.id} text={achievement.text} />
            ))}
        </ul>
    );
};

ViewerItemAchievementsList.propTypes = {
    achievementsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
        }),
    ).isRequired,
};

export default ViewerItemAchievementsList;
