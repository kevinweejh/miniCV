import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerEducationItem = ({ educationItem }) => {
    const currentlyStudying = educationItem.currentlyStudying;
    return (
        <>
            <h1 className="text-lg font-semibold">{educationItem.schoolName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{educationItem.titleOfStudy}</p>
                <p className="text-right">
                    {educationItem.yearFrom} to {currentlyStudying ? 'Present' : educationItem.yearTo}
                </p>
            </div>
            <ViewerItemAchievementsList achievementsList={educationItem.achievementsList} />
        </>
    );
};

ViewerEducationItem.propTypes = {
    educationItem: PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default ViewerEducationItem;
