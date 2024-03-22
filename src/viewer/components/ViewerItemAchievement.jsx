import PropTypes from 'prop-types';

const ViewerItemAchievement = ({ text }) => {
    return <li className="list-disc list-inside">{text}</li>;
};

ViewerItemAchievement.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ViewerItemAchievement;
