import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserOtherPreviousEntriesDeletionDialog from './CustomiserOtherPreviousEntriesDeletionDialog';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/delete.svg?react';
import ShiftUpIcon from '../../assets/shift-up.svg?react';
import ShiftDownIcon from '../../assets/shift-down.svg?react';

interface OtherItem {
    id: number | null;
    title: string;
    link: string;
    detailsList: { id: number; text: string }[]; 
    formType: string;
}

interface CustomiserOtherPreviousEntriesProps {
    entry: OtherItem;
    fullList: OtherItem[];
    updaterFn: React.Dispatch<React.SetStateAction<OtherItem[]>>;
    editHandler: (entry: OtherItem) => void;
    order: number[];
    setOrder: React.Dispatch<React.SetStateAction<number[]>>;
    reorderUp: (entry: OtherItem) => void;
    reorderDown: (entry: OtherItem) => void;
}

const CustomiserOtherPreviousEntries: React.FC<CustomiserOtherPreviousEntriesProps> = ({
    entry,
    fullList,
    updaterFn,
    editHandler,
    order,
    setOrder,
    reorderUp,
    reorderDown,
}) => {
    const [isDeletionDialogVisible, setIsDeletionDialogVisible] = useState<boolean>(false);

    const formType: string = entry.formType;
    const skillsList: string[] = entry.detailsList.map((detail) => detail.text);

    const handleOpenDeletionDialog = (): void => {
        setIsDeletionDialogVisible(true);
    };

    const handleDeletion = (): void => {
        setIsDeletionDialogVisible(false);
        const updatedList: OtherItem[] = fullList.filter((item) => item.id != entry.id);
        const updatedOrder: number[] = order.filter((item) => item != entry.id);
        updaterFn(updatedList);
        setOrder(updatedOrder);
    };

    const handleCloseDeletionDialog = (): void => {
        setIsDeletionDialogVisible(false);
    };

    return (
        <div className="grid grid-cols-4 px-4 py-2 justify-between items-center bg-regent-st-blue-100 text-regent-st-blue-950">
            <div className="col-span-3 items-center">
                <span className="font-semibold">{entry.title}</span>
                {formType === 'skills' && <span>:&nbsp;{skillsList.join(', ')}</span>}
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
                <CustomiserOtherPreviousEntriesDeletionDialog
                    entry={entry}
                    handleDeletion={handleDeletion}
                    handleCloseDeletionDialog={handleCloseDeletionDialog}
                />
            )}
        </div>
    );
};

export default CustomiserOtherPreviousEntries;
