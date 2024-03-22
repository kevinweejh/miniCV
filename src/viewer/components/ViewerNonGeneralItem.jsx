import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerNonGeneralItem = ({ nonGeneralSectionItem }) => {
    return (
        <>
            <h1 className="text-lg font-semibold">{nonGeneralSectionItem.orgName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{nonGeneralSectionItem.position}</p>
                <p className="text-right">
                    {nonGeneralSectionItem.yearFrom} to{' '}
                    {nonGeneralSectionItem.currentStatus ? 'Present' : nonGeneralSectionItem.yearTo}
                </p>
            </div>
            <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
        </>
    );
};

ViewerNonGeneralItem.propTypes = {
    nonGeneralSectionItem: PropTypes.shape({
        id: PropTypes.number,
        orgName: PropTypes.string,
        position: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentStatus: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default ViewerNonGeneralItem;
