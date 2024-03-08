import PropTypes from 'prop-types';
import ViewerExperienceItemAchievement from './ViewerExperienceItemAchievement';

const ViewerExperienceItem = ({ experienceItem }) => {
    const viewerExperienceItemAchievements = experienceItem.achievements;
    return(
        <>
            <h1 className="text-lg font-semibold">{experienceItem.companyName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{experienceItem.positionTitle}</p>
                <p className="text-right">{experienceItem.yearFrom} to {experienceItem.yearTo}</p>
            </div>
            <ul>
                {viewerExperienceItemAchievements.map((viewerExperienceItemAchievement) => 
                    <ViewerExperienceItemAchievement key={viewerExperienceItemAchievement.id} text={viewerExperienceItemAchievement.text} />
                )}
            </ul>
        </>
    )
}

ViewerExperienceItem.propTypes = {
    experienceItem: PropTypes.shape({
        id: PropTypes.number,
        companyName: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.number, 
        yearTo: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        achievements: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default ViewerExperienceItem;