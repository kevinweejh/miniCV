import { useState, useEffect, Fragment } from 'react';
import ViewerGeneral from './components/ViewerGeneral';
import ViewerNonGeneral from './components/ViewerNonGeneral';
import ViewerOthers from './components/ViewerOthers';
import ShiftUpIcon from '../assets/shift-up.svg?react';
import ShiftDownIcon from '../assets/shift-down.svg?react';
import PropTypes from 'prop-types';

const Viewer = ({ cvData }) => {
    // console.log(cvData);

    // Initial order of components
    const [viewOrder, setViewOrder] = useState([]);

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
    const reorderComponents = (index, direction, viewOrder, setViewOrder) => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === viewOrder.length - 1)) {
            return; // Do nothing if shifting first section up, or last section down.
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newOrder = [...viewOrder];
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]]; // Swap adjacent places
        setViewOrder(newOrder);
    };

    // Conditionally render the correct component based on type (General, NonGeneral, Others)
    const renderComponent = (component, index, viewOrder, setViewOrder) => {
        // console.log(component);
        const isEmpty = (component) =>
            Array.isArray(component.data)
                ? component.data.length === 0
                : typeof component.data === 'object' &&
                  component.data !== null &&
                  Object.keys(component.data).length === 0;

        // console.log(isEmpty(component));
        switch (component.type) {
            case 'ViewerGeneral':
                return (
                    !isEmpty(component) && (
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
                    )
                );
            case 'ViewerNonGeneral':
                return (
                    !isEmpty(component) && (
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
                    )
                );
            case 'ViewerOthers':
                return (
                    !isEmpty(component) && (
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
                    )
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

Viewer.propTypes = {
    cvData: PropTypes.object.isRequired,
};

export default Viewer;
