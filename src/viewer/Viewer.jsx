import ViewerGeneral from './components/ViewerGeneral';
import ViewerNonGeneral from './components/ViewerNonGeneral';
import ViewerOthers from './components/ViewerOthers';
import PropTypes from 'prop-types';

const Viewer = ({ cvData }) => {
    return (
        <section className="p-6 w-full md:w-2/3 border border-regent-st-blue-400 bg-white my-4 rounded-md md:mx-4 md:max-h-full md:aspect-[210/297]">
            <ViewerGeneral info={cvData.generalInfo} />
            <ViewerNonGeneral nonGeneralSection={cvData.educationHistory} />
            <ViewerNonGeneral nonGeneralSection={cvData.experienceHistory} />
            <ViewerOthers otherSection={cvData.skillsList} />
            <ViewerOthers otherSection={cvData.projectsList} />
        </section>
    );
};

Viewer.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default Viewer;
