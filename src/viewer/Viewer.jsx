import ViewerGeneral from './components/ViewerGeneral';
import ViewerNonGeneral from './components/ViewerNonGeneral';
import PropTypes from 'prop-types';

const Viewer = ({ cvData }) => {
    return (
        <section className="p-6 w-full md:w-2/3 border my-4 rounded-md md:mx-4 md:max-h-full md:aspect-[210/297]">
            <ViewerGeneral info={cvData.generalInfo} />
            <ViewerNonGeneral nonGeneralSection={cvData.educationHistory} formType="education" />
            <ViewerNonGeneral nonGeneralSection={cvData.experienceHistory} formType="experience" />
        </section>
    );
};

Viewer.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default Viewer;
