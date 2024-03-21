import PropTypes from 'prop-types';

const CustomiserPreviousEntries = ({ entry }) => {
    return(
        <div className="px-4 py-2">
            <span className="text-xl font-semibold">{entry.titleOfStudy ? entry.titleOfStudy : entry.positionTitle}</span> 
            <span> at </span>
            <span className="text-xl font-semibold">{entry.schoolName ? entry.schoolName : entry.companyName}</span>
        </div>
    )
}

CustomiserPreviousEntries.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        companyName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        ),
    }).isRequired
};

export default CustomiserPreviousEntries;