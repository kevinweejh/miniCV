import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerExperienceItem = ({ experienceItem }) => {
    const currentlyWorking = experienceItem.currentlyWorking;
    return(
        <>
            <h1 className="text-lg font-semibold">{experienceItem.companyName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{experienceItem.positionTitle}</p>
                <p className="text-right">{experienceItem.yearFrom} to {currentlyWorking ? 'Present' : experienceItem.yearTo}</p>
            </div>
            <ViewerItemAchievementsList achievementsList={experienceItem.achievementsList} />
        </>
    )
}

ViewerExperienceItem.propTypes = {
    experienceItem: PropTypes.shape({
        id: PropTypes.number,
        companyName: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyWorking: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default ViewerExperienceItem;