import CustomiserGeneral from './components/CustomiserGeneral';
import CustomiserNonGeneral from './components/CustomiserNonGeneral';
import CustomiserOthers from './components/CustomiserOthers';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
// const doc = new jsPDF();

// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');

interface Info {
    firstName: string; 
    lastName: string; 
    email: string; 
    mobile: string | null;
}

interface AdditionalInfo {
    countryCode: string | undefined | null;
    portfolioInputVis: boolean;
    portfolio: string;
    gitHubInputVis: boolean;
    gitHub: string;
    stateInputVis: boolean;
    state: string;
    cityInputVis: boolean;
    city: string;
}
// Refer to CustomiserGeneral.tsx Lines 9 - 28 for reason behind naming of Form type
type Form = Info & AdditionalInfo;

interface CustomiserGeneralProps {
    info: Form;
    setInfo: React.Dispatch<React.SetStateAction<Form>>;
}

interface NonGeneralItem {
    id: number | null;
    orgName: string;
    position: string;
    yearFrom: string | dayjs.Dayjs;
    yearTo: string | dayjs.Dayjs;
    currentStatus: boolean;
    achievementsList: { id: number; text: string }[];
    formType: string;
}

interface CustomiserNonGeneralProps {
    nonGeneralSection: NonGeneralItem[];
    setNonGeneralSection: React.Dispatch<React.SetStateAction<NonGeneralItem[]>>;
    formType: string;
}

interface OtherItem {
    id: number | null;
    title: string;
    link: string;
    detailsList: { id: number; text: string }[]; 
    formType: string;
}

interface CustomiserOtherProps {
    otherSection: OtherItem[];
    setOtherSection: React.Dispatch<React.SetStateAction<OtherItem[]>>;
    formType: string;
}

interface CustomiserProps {
    cvData: {
        generalInfo: CustomiserGeneralProps['info'];
        educationHistory: CustomiserNonGeneralProps['nonGeneralSection'];
        experienceHistory: CustomiserNonGeneralProps['nonGeneralSection'];
        projectsList: CustomiserOtherProps['otherSection'];
        skillsList: CustomiserOtherProps['otherSection'];
    };
    setCvData: React.Dispatch<React.SetStateAction<CustomiserProps['cvData']>>;
}

const Customiser: React.FC<CustomiserProps> = ({ cvData, setCvData }) => {
    const setInfo: React.Dispatch<React.SetStateAction<CustomiserGeneralProps['info']>> = (newInfo): void => {
        setCvData((prevState) => ({ ...prevState, generalInfo: typeof newInfo === 'function' ? newInfo(prevState.generalInfo) : newInfo }));
    };

    const setEducation: React.Dispatch<React.SetStateAction<CustomiserNonGeneralProps['nonGeneralSection']>> = (newEducation): void => {
        setCvData((prevState) => ({ ...prevState, educationHistory: typeof newEducation === 'function' ? newEducation(prevState.educationHistory) : newEducation }));
    };

    const setExperience: React.Dispatch<React.SetStateAction<CustomiserNonGeneralProps['nonGeneralSection']>> = (newExperience): void => {
        setCvData((prevState) => ({ ...prevState, experienceHistory: typeof newExperience === 'function' ? newExperience(prevState.experienceHistory) : newExperience }));
    };

    const setSkills: React.Dispatch<React.SetStateAction<CustomiserOtherProps['otherSection']>> = (newSkills): void => {
        setCvData((prevState) => ({ ...prevState, skillsList: typeof newSkills === 'function' ? newSkills(prevState.skillsList) : newSkills }));
    };

    const setProjects: React.Dispatch<React.SetStateAction<CustomiserOtherProps['otherSection']>> = (newProjects): void => {
        setCvData((prevState) => ({ ...prevState, projectsList: typeof newProjects === 'function' ? newProjects(prevState.projectsList) : newProjects }));
    };

    return (
        <section className="flex flex-col border rounded-md border-regent-st-blue-400 h-fit my-4 w-full md:mx-4 md:w-1/3">
            <CustomiserGeneral info={cvData.generalInfo} setInfo={setInfo} />
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

export default Customiser;
