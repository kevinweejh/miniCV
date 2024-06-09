import CustomiserGeneral from './components/CustomiserGeneral';
import CustomiserNonGeneral from './components/CustomiserNonGeneral';
import CustomiserOthers from './components/CustomiserOthers';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
// const doc = new jsPDF();

// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');

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

    const setSkills = (newSkills) => {
        setCvData({ ...cvData, skillsList: newSkills });
    };

    const setProjects = (newProjects) => {
        setCvData({ ...cvData, projectsList: newProjects });
    };

    return (
        <section className="flex flex-col border rounded-md border-regent-st-blue-400 h-fit my-4 w-full md:mx-4 md:w-1/3">
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
            <CustomiserOthers otherSection={cvData.skillsList} setOtherSection={setSkills} formType="skills" />
            <CustomiserOthers otherSection={cvData.projectsList} setOtherSection={setProjects} formType="projects" />
        </section>
    );
};

Customiser.propTypes = {
    cvData: PropTypes.object.isRequired,
    setCvData: PropTypes.func.isRequired,
};

export default Customiser;
