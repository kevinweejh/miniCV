import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Customiser from './customiser/Customiser';
import Viewer from './viewer/Viewer';
import dataStructure from './dataStructure.json';

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

interface AppGeneralProps {
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

interface AppNonGeneralProps {
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

interface AppOtherProps {
    otherSection: OtherItem[];
    setOtherSection: React.Dispatch<React.SetStateAction<OtherItem[]>>;
    formType: string;
}

interface AppProps {
    cvData: {
        generalInfo: AppGeneralProps['info'];
        educationHistory: AppNonGeneralProps['nonGeneralSection'];
        experienceHistory: AppNonGeneralProps['nonGeneralSection'];
        projectsList: AppOtherProps['otherSection'];
        skillsList: AppOtherProps['otherSection'];
    };
}

// Merge dataStructure with default values for Object generalInfo
// The rest do not need default values, as an empty array is valid

const initialDataStructure: AppProps['cvData'] = {
    ...dataStructure,
    generalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        countryCode: 'US',
        portfolioInputVis: false,
        portfolio: '',
        gitHubInputVis: false,
        gitHub: '',
        stateInputVis: false,
        state: '',
        cityInputVis: false,
        city: '',
    },
    "educationHistory": [],
    "experienceHistory": [],
    "projectsList": [],
    "skillsList": [],
    
}

const App = () => {
    const [cvData, setCvData] = useState<AppProps['cvData']>(initialDataStructure);
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

    useEffect(() => {
        const isMobile: boolean = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 768;
        if (isMobile) {
            setIsDialogVisible(true);
        }
    }, []);

    const handleCloseDialog = (): void  => {
        setIsDialogVisible(false);
    };

    return (
        <>
            {isDialogVisible && (
                <div id="mobileDialog">
                    <dialog
                        open
                        className="border border-regent-st-blue-400 bg-regent-st-blue-100 text-regent-st-blue-950 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10 md:hidden"
                    >
                        <strong className="text-lg">For Mobile Users</strong>
                        <p>
                            Please view generated PDF to get an accurate sense of the text formatting. Alternatively,
                            view using a laptop (or wider) screen.
                        </p>
                        <form method="dialog" className="mt-5 flex flex-col">
                            <button
                                id="dialogBtn"
                                onClick={handleCloseDialog}
                                className="text-lg font-bold text-center w-full p-2.5 border rounded-2xl text-regent-st-blue-50 bg-regent-st-blue-600 hover:bg-regent-st-blue-700 active:bg-regent-st-blue-800 hover:cursor-pointer"
                            >
                                OK
                            </button>
                        </form>
                    </dialog>
                    <div id="overlay" className="fixed top-0 left-0 w-full h-full bg-white/90 z-[1]"></div>
                </div>
            )}
            <div className="flex flex-col w-screen bg-regent-st-blue-100 md:flex-row p-2">
                <Customiser cvData={cvData} setCvData={setCvData} />
                <Viewer cvData={cvData} />
            </div>
        </>
    );
}

export default App;
