import PropTypes from 'prop-types';
import ViewerExperienceItem from './ViewerExperienceItem';

const ViewerExperience = ({ experience }) => {
    const isArrayFilled = experience.length > 0;
    const isObjectFilled = isArrayFilled ? Object.values(experience[0]).some(value => value != null && value !== '' && !Array.isArray(value)) : false;

    return(
        <>
            {(isArrayFilled && isObjectFilled) && 
                <section className="flex flex-col">
                    <h1 className="text-2xl font-semibold">Experience History</h1>
                    <hr></hr>
                    {experience.map((experienceItem) => 
                        <ViewerExperienceItem key={experienceItem.id} experienceItem={experienceItem} />
                    )}
                </section>
            }
        </>
    )
}

ViewerExperience.propTypes = {
    experience: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            companyName: PropTypes.string,
            positionTitle: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            achievementsList: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                })
            ),
        })
    ).isRequired,
};

export default ViewerExperience;