import { useState, useEffect, Fragment } from 'react';
import ViewerGeneral from './components/ViewerGeneral';
import ViewerNonGeneral from './components/ViewerNonGeneral';
import ViewerOthers from './components/ViewerOthers';
import ShiftUpIcon from '../assets/shift-up.svg?react';
import ShiftDownIcon from '../assets/shift-down.svg?react';

interface ViewerGeneralProps {
    info: {
        firstName: string;
        lastName: string;
        email: string;
        countryCode: string;
        mobile: string;
        state: string;
        city: string;
        stateInputVis: boolean;
        cityInputVis: boolean;
        portfolio: string;
        gitHub: string;
        portfolioInputVis: boolean;
        gitHubInputVis: boolean;
    }
}

interface ViewerGeneralOrder {
    type: 'ViewerGeneral';
    data: ViewerGeneralProps['info'];
}

interface ViewerNonGeneralProps {
    nonGeneralSection: {
        id: number;
        orgName: string;
        position: string;
        yearFrom: string;
        yearTo: string;
        currentStatus: boolean;
        achievementsList: { id: number; text: string; }[];
        formType: string;
    }[];
}

interface ViewerNonGeneralOrder {
    type: 'ViewerNonGeneral';
    data: ViewerNonGeneralProps['nonGeneralSection'];
}

interface ViewerOthersProps {
    otherSection: {
        id: number;
        title: string;
        link: string;
        detailsList: { id: number; text: string; }[];
        formType: string;
    }[];
}

interface ViewerOthersOrder {
    type: 'ViewerOthers';
    data: ViewerOthersProps['otherSection'];
}

interface ViewerProps {
    cvData: {
        generalInfo: ViewerGeneralProps['info'];
        educationHistory: ViewerNonGeneralProps['nonGeneralSection'];
        experienceHistory: ViewerNonGeneralProps['nonGeneralSection'];
        projectsList: ViewerOthersProps['otherSection'];
        skillsList: ViewerOthersProps['otherSection'];
    }
}

type ViewOrder = ViewerGeneralOrder | ViewerNonGeneralOrder | ViewerOthersOrder;

const Viewer: React.FC<ViewerProps> = ({ cvData }) => {
    // console.log(cvData);

    // Initial order of components
    const [viewOrder, setViewOrder] = useState<ViewOrder[]>([]);

    useEffect(() => {
        setViewOrder([
            { type: 'ViewerGeneral', data: cvData.generalInfo },
            { type: 'ViewerNonGeneral', data: cvData.educationHistory },
            { type: 'ViewerNonGeneral', data: cvData.experienceHistory },
            { type: 'ViewerOthers', data: cvData.skillsList },
            { type: 'ViewerOthers', data: cvData.projectsList },
        ]);
    }, [cvData]);

    // Reorder the components when up/down button is clicked
    const reorderComponents = (
        index: number, 
        direction: 'up' | 'down', 
        viewOrder: ViewOrder[], 
        setViewOrder: React.Dispatch<React.SetStateAction<ViewOrder[]>>
    ): void => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === viewOrder.length - 1)) {
            return; // Do nothing if shifting first section up, or last section down.
        }

        const newIndex: number = direction === 'up' ? index - 1 : index + 1;
        const newOrder: ViewOrder[] = [...viewOrder];
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]]; // Swap adjacent places
        setViewOrder(newOrder);
    };

    // Conditionally render the correct component based on type (General, NonGeneral, Others)
    const renderComponent = (
        component: ViewOrder, 
        index: number, 
        viewOrder: ViewOrder[], 
        setViewOrder: React.Dispatch<React.SetStateAction<ViewOrder[]>>
    ): JSX.Element | null => {
        // console.log(component);
        const isEmpty = (component: ViewOrder): boolean =>
            Array.isArray(component.data)
                ? component.data.length === 0
                : typeof component.data === 'object' &&
                  component.data !== null &&
                  Object.keys(component.data).length === 0;

        // Avoid further processing if component turns up empty
        if (isEmpty(component)) {
            return null;
        }

        // console.log(isEmpty(component));
        switch (component.type) {
            case 'ViewerGeneral':
                return (
                    <>
                        <div className="flex relative">
                            <ViewerGeneral info={component.data} />
                            <div className="absolute right-0">
                                <button onClick={() => reorderComponents(index, 'up', viewOrder, setViewOrder)}>
                                    <ShiftUpIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                                <button onClick={() => reorderComponents(index, 'down', viewOrder, setViewOrder)}>
                                    <ShiftDownIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                            </div>
                        </div>
                    </>
                );
            case 'ViewerNonGeneral':
                return (
                    <>
                        <div className="flex relative">
                            <ViewerNonGeneral nonGeneralSection={component.data} />
                            <div className="absolute right-0">
                                <button onClick={() => reorderComponents(index, 'up', viewOrder, setViewOrder)}>
                                    <ShiftUpIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                                <button onClick={() => reorderComponents(index, 'down', viewOrder, setViewOrder)}>
                                    <ShiftDownIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                            </div>
                        </div>
                    </>
                );
            case 'ViewerOthers':
                return (
                    <>
                        <div className="flex relative">
                            <ViewerOthers otherSection={component.data} />
                            <div className="absolute right-0">
                                <button onClick={() => reorderComponents(index, 'up', viewOrder, setViewOrder)}>
                                    <ShiftUpIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                                <button onClick={() => reorderComponents(index, 'down', viewOrder, setViewOrder)}>
                                    <ShiftDownIcon className="w-8 h-auto hover:scale-110" />
                                </button>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <section className="p-6 w-full md:w-2/3 border border-regent-st-blue-400 bg-white my-4 rounded-md md:mx-4 md:max-h-full md:aspect-[210/297]">
            {viewOrder.map((component, index) => (
                <Fragment key={index}>{renderComponent(component, index, viewOrder, setViewOrder)}</Fragment>
            ))}
        </section>
    );
};

export default Viewer;
