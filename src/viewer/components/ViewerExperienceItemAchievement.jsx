import PropTypes from 'prop-types';

const ViewerExperienceItemAchievement = ({ text }) => {
    return(
        <li className="list-disc list-inside">{text}</li>
    )
}

ViewerExperienceItemAchievement.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ViewerExperienceItemAchievement;