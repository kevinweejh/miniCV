import PropTypes from 'prop-types';
import ViewerEducationItem from './ViewerEducationItem';

const ViewerEducation = ({ education }) => {
    const isArrayFilled = education.length > 0;
    const isObjectFilled = isArrayFilled
        ? Object.values(education[0]).some((value) => value != null && value !== '')
        : false;

    return (
        <>
            {isArrayFilled && isObjectFilled && (
                <section>
                    <h1 className="text-2xl font-semibold">Education</h1>
                    <hr></hr>
                    {education.map((educationItem) => (
                        <ViewerEducationItem key={educationItem.id} educationItem={educationItem} />
                    ))}
                </section>
            )}
        </>
    );
};

ViewerEducation.propTypes = {
    education: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            schoolName: PropTypes.string,
            titleOfStudy: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
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

export default ViewerEducation;
