import PropTypes from 'prop-types';
import ViewerNonGeneralItem from './ViewerNonGeneralItem';

const ViewerNonGeneral = ({ nonGeneralSection }) => {
    const isArrayFilled = nonGeneralSection.length > 0;
    const isObjectFilled = isArrayFilled
        ? Object.values(nonGeneralSection[0]).some((value) => value != null && value !== '' && !Array.isArray(value))
        : false;

    return (
        <>
            {isArrayFilled && isObjectFilled && (
                <section className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
                        {nonGeneralSection[0].schoolName ? 'Education' : 'Experience'}
                    </h1>
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
        }),
    ).isRequired,
};

export default ViewerNonGeneral;
