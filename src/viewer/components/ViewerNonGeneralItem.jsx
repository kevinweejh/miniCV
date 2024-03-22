import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerNonGeneralItem = ({ nonGeneralSectionItem }) => {
    const currentStatus = nonGeneralSectionItem.currentlyWorking || nonGeneralSectionItem.currentlyStudying;
    return (
        <>
            <h1 className="text-lg font-semibold">
                {nonGeneralSectionItem.schoolName
                    ? nonGeneralSectionItem.schoolName
                    : nonGeneralSectionItem.companyName}
            </h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">
                    {nonGeneralSectionItem.titleOfStudy
                        ? nonGeneralSectionItem.titleOfStudy
                        : nonGeneralSectionItem.positionTitle}
                </p>
                <p className="text-right">
                    {nonGeneralSectionItem.yearFrom} to {currentStatus ? 'Present' : nonGeneralSectionItem.yearTo}
                </p>
            </div>
            <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
        </>
    );
};

ViewerNonGeneralItem.propTypes = {
    nonGeneralSectionItem: PropTypes.shape({
        id: PropTypes.number,
        companyName: PropTypes.string,
        positionTitle: PropTypes.string,
        schoolName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyWorking: PropTypes.bool,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default ViewerNonGeneralItem;
