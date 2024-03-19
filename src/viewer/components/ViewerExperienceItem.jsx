import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerExperienceItem = ({ experienceItem }) => {
    return(
        <>
            <h1 className="text-lg font-semibold">{experienceItem.companyName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{experienceItem.positionTitle}</p>
                <p className="text-right">{experienceItem.yearFrom} to {experienceItem.yearTo}</p>
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
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default ViewerExperienceItem;