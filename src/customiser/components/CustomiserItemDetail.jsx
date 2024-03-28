import PropTypes from 'prop-types';

const CustomiserItemDetail = ({ text }) => {
    return <li className="list-disc list-inside break-words">{text}</li>;
};

CustomiserItemDetail.propTypes = {
    text: PropTypes.string.isRequired,
};

export default CustomiserItemDetail;
