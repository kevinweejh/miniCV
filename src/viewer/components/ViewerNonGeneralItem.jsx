import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';
import dayjs from 'dayjs';

const ViewerNonGeneralItem = ({ nonGeneralSectionItem }) => {
    const formType = nonGeneralSectionItem.formType;
    const educationDateToObject = dayjs(nonGeneralSectionItem.yearTo);
    const graduated = educationDateToObject.isBefore(dayjs());
    return (
        <>
            {formType === 'education' ? (
                <>
                    <div className="flex flex-row justify-between">
                        <p className="text-lg font-semibold text-left">{nonGeneralSectionItem.orgName}</p>
                        <p className="text-right">
                            {graduated ? nonGeneralSectionItem.yearTo : `Expected ${nonGeneralSectionItem.yearTo}`}
                        </p>
                    </div>

                    <p className="text-base font-normal"> &#8226; {nonGeneralSectionItem.position}</p>
                </>
            ) : (
                <>
                    <h1 className="text-lg font-semibold">{nonGeneralSectionItem.orgName}</h1>
                    <div className="flex flex-row justify-between mb-2">
                        <p className="text-left">{nonGeneralSectionItem.position}</p>
                        <p className="text-right">
                            {nonGeneralSectionItem.yearFrom} &#8211;{' '}
                            {nonGeneralSectionItem.currentStatus ? 'Present' : nonGeneralSectionItem.yearTo}
                        </p>
                    </div>
                    <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
                </>
            )}
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
        formType: PropTypes.string,
    }).isRequired,
};

export default ViewerNonGeneralItem;
