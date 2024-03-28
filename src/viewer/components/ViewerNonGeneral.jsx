import PropTypes from 'prop-types';
import ViewerNonGeneralItem from './ViewerNonGeneralItem';

const ViewerNonGeneral = ({ nonGeneralSection }) => {
    const formType = nonGeneralSection.formType;
    const isArrayFilled = nonGeneralSection.length > 0;
    const isObjectFilled = isArrayFilled
        ? Object.values(nonGeneralSection[0]).some((value) => value != null && value !== '' && !Array.isArray(value))
        : false;

    return (
        <>
            {isArrayFilled && isObjectFilled && (
                <section className="flex flex-col mb-2">
                    <h1 className="text-2xl font-semibold">{formType === 'education' ? 'Education' : 'Experience'}</h1>
                    <hr></hr>
                    {nonGeneralSection.map((nonGeneralSectionItem) => (
                        <ViewerNonGeneralItem
                            key={nonGeneralSectionItem.id}
                            nonGeneralSectionItem={nonGeneralSectionItem}
                        />
                    ))}
                </section>
            )}
        </>
    );
};

ViewerNonGeneral.propTypes = {
    nonGeneralSection: PropTypes.arrayOf(
        PropTypes.shape({
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
        }),
    ).isRequired,
};

export default ViewerNonGeneral;
