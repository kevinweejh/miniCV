import PropTypes from 'prop-types';
import ViewerOtherItem from './ViewerOtherItem';

const ViewerOthers = ({ otherSection }) => {
    let formType = null;
    const isArrayFilled = otherSection.length > 0;
    const isObjectFilled = isArrayFilled
        ? Object.values(otherSection[0]).some((value) => value != null && value !== '' && !Array.isArray(value))
        : false;

    if (isArrayFilled) {
        formType = otherSection[0].formType;
    }

    return (
        <>
            {isArrayFilled && isObjectFilled && (
                <section className="flex flex-col grow mb-2">
                    <h1 className="text-2xl font-semibold">{formType === 'skills' ? 'Skills' : 'Projects'}</h1>
                    <hr></hr>
                    {otherSection.map((otherSectionItem) => (
                        <ViewerOtherItem key={otherSectionItem.id} otherSectionItem={otherSectionItem} />
                    ))}
                </section>
            )}
        </>
    );
};

ViewerOthers.propTypes = {
    otherSection: PropTypes.arrayOf(
        PropTypes.shape({
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
        }),
    ).isRequired,
};

export default ViewerOthers;
