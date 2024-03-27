import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserPreviousEntriesDeletionDialog from './CustomiserPreviousEntriesDeletionDialog';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/delete.svg?react';
import ShiftUpIcon from '../../assets/shift-up.svg?react';
import ShiftDownIcon from '../../assets/shift-down.svg?react';

const CustomiserPreviousEntries = ({
    entry,
    fullList,
    updaterFn,
    editHandler,
    order,
    setOrder,
    reorderUp,
    reorderDown,
}) => {
    const [isDeletionDialogVisible, setIsDeletionDialogVisible] = useState(false);

    const handleOpenDeletionDialog = () => {
        setIsDeletionDialogVisible(true);
    };

    const handleDeletion = () => {
        setIsDeletionDialogVisible(false);
        const updatedList = fullList.filter((item) => item.id != entry.id);
        const updatedOrder = order.filter((item) => item != entry.id);
        updaterFn(updatedList);
        setOrder(updatedOrder);
    };

    const handleCloseDeletionDialog = () => {
        setIsDeletionDialogVisible(false);
    };

    return (
        <div className="grid grid-cols-4 px-4 py-2 justify-between bg-regent-st-blue-100 text-regent-st-blue-950">
            <div className="col-span-3 items-center font-medium">
                {entry.position} <br></br>
                <span className="font-normal">@ </span>
                {entry.orgName}
            </div>
            <div className="flex gap-2 col-span-1 justify-center">
                <div className="flex flex-col gap-2">
                    <button
                        className="border-2 p-1 border-regent-st-blue-500 rounded max-w-8 max-h-8 hover:bg-regent-st-blue-200 active:bg-regent-st-blue-200"
                        onClick={() => editHandler(entry)}
                    >
                        <EditIcon className="w-full h-auto" />
                    </button>
                    <button
                        className="border-2 p-1 border-regent-st-blue-500 rounded max-w-8 max-h-8 hover:bg-regent-st-blue-200 active:bg-regent-st-blue-200"
                        onClick={handleOpenDeletionDialog}
                    >
                        <DeleteIcon className="w-full h-auto" />
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        className="border-2 p-1 border-regent-st-blue-500 rounded max-w-8 max-h-8 hover:bg-regent-st-blue-200 active:bg-regent-st-blue-200"
                        onClick={() => reorderUp(entry)}
                    >
                        <ShiftUpIcon className="w-full h-auto" />
                    </button>
                    <button
                        className="border-2 p-1 border-regent-st-blue-500 rounded max-w-8 max-h-8 hover:bg-regent-st-blue-200 active:bg-regent-st-blue-200"
                        onClick={() => reorderDown(entry)}
                    >
                        <ShiftDownIcon className="w-full h-auto" />
                    </button>
                </div>
            </div>

            {isDeletionDialogVisible && (
                <CustomiserPreviousEntriesDeletionDialog
                    entry={entry}
                    handleDeletion={handleDeletion}
                    handleCloseDeletionDialog={handleCloseDeletionDialog}
                />
            )}
        </div>
    );
};

CustomiserPreviousEntries.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        orgName: PropTypes.string,
        position: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentStatus: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            }),
        ),
        formType: PropTypes.string,
    }).isRequired,
    fullList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            orgName: PropTypes.string,
            position: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string,
            currentStatus: PropTypes.bool,
            achievementsList: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                }),
            ),
            formType: PropTypes.string,
        }),
    ).isRequired,
    updaterFn: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    order: PropTypes.arrayOf(PropTypes.number),
    setOrder: PropTypes.func.isRequired,
    reorderUp: PropTypes.func.isRequired,
    reorderDown: PropTypes.func.isRequired,
};

export default CustomiserPreviousEntries;
