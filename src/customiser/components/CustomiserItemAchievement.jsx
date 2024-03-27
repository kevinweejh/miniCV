import PropTypes from 'prop-types';

const CustomiserItemAchievement = ({ text }) => {
    return <li className="list-disc list-inside break-words">{text}</li>;
};

CustomiserItemAchievement.propTypes = {
    text: PropTypes.string.isRequired,
};

export default CustomiserItemAchievement;
