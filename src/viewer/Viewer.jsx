import ViewerGeneral from './components/ViewerGeneral';
import ViewerEducation from './components/ViewerEducation';
import ViewerExperience from './components/ViewerExperience';
import PropTypes from 'prop-types';

const Viewer = ({ cvData }) => {
    return(
        <section className="p-6 w-full md:w-2/3 border my-4 rounded-md md:mx-4 md:max-h-full md:aspect-[210/297]">
            <ViewerGeneral info={cvData.generalInfo} />
            <ViewerEducation education={cvData.educationHistory} />
            <ViewerExperience experience={cvData.experienceHistory} />
        </section>
    )
}

Viewer.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default Viewer;