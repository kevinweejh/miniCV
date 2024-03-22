import CustomiserGeneral from './components/CustomiserGeneral';
import CustomiserNonGeneral from './components/CustomiserNonGeneral';
import PropTypes from 'prop-types';

const Customiser = ({ cvData, setCvData }) => {
    const setInfo = (newInfo) => {
        setCvData({ ...cvData, generalInfo: newInfo });
    };

    const setEducation = (newEducation) => {
        setCvData({ ...cvData, educationHistory: newEducation });
    };

    const setExperience = (newExperience) => {
        setCvData({ ...cvData, experienceHistory: newExperience });
    };

    return (
        <section className="flex flex-col border rounded-md shadow-md h-fit my-4 w-full md:mx-4 md:w-1/3">
            <CustomiserGeneral info={cvData.general} setInfo={setInfo} />
            <CustomiserNonGeneral
                nonGeneralSection={cvData.educationHistory}
                setNonGeneralSection={setEducation}
                formType="education"
            />
            <CustomiserNonGeneral
                nonGeneralSection={cvData.experienceHistory}
                setNonGeneralSection={setExperience}
                formType="experience"
            />
        </section>
    );
};

Customiser.propTypes = {
    cvData: PropTypes.object.isRequired,
    setCvData: PropTypes.func.isRequired,
};

export default Customiser;
