import PropTypes from 'prop-types';
import ViewerItemAchievementsList from './ViewerItemAchievementsList';

const ViewerOtherItem = ({ otherSectionItem }) => {
    const formType = otherSectionItem.formType;
    const skillsList = otherSectionItem.detailsList.map((detail) => detail.text);
    return (
        <>
            {formType === 'skills' ? (
                <>
                    <div className="flex flex-row">
                        <span className="font-semibold">{otherSectionItem.title}:&nbsp;</span>
                        <span>{skillsList.join(', ')}</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row justify-between mb-2">
                        <p className="font-semibold text-left">{otherSectionItem.title}</p>
                        <p className="text-right">{otherSectionItem.link}</p>
                    </div>
                    <ViewerItemAchievementsList achievementsList={otherSectionItem.detailsList} />
                </>
            )}
        </>
    );
};

ViewerOtherItem.propTypes = {
    otherSectionItem: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        link: PropTypes.string,
        detailsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
        formType: PropTypes.string,
    }).isRequired,
};

export default ViewerOtherItem;
