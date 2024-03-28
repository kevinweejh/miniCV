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
                    <div className="mb-2">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 flex flex-wrap">
                                <span className="font-semibold text-left whitespace-nowrap">
                                    {nonGeneralSectionItem.orgName}&nbsp;
                                </span>
                                <span className="text-base">{nonGeneralSectionItem.position}</span>
                            </div>

                            <p className="text-right">
                                {graduated ? nonGeneralSectionItem.yearTo : `Expected ${nonGeneralSectionItem.yearTo}`}
                            </p>
                        </div>
                        <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-2">
                        <div className="flex flex-row justify-between">
                            <p className="text-left font-semibold">
                                {nonGeneralSectionItem.position},{' '}
                                <span className="font-normal">{nonGeneralSectionItem.orgName}</span>
                            </p>
                            <p className="text-right">
                                {nonGeneralSectionItem.yearFrom} &#8211;{' '}
                                {nonGeneralSectionItem.currentStatus ? 'Present' : nonGeneralSectionItem.yearTo}
                            </p>
                        </div>
                        <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
                    </div>
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
