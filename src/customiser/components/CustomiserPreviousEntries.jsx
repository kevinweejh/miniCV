import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserPreviousEntriesDeletionDialog from './CustomiserPreviousEntriesDeletionDialog';

const CustomiserPreviousEntries = ({ entry, fullList, updaterFn, editHandler }) => {
    const [isDeletionDialogVisible, setIsDeletionDialogVisible] = useState(false);

    const handleOpenDeletionDialog = () => {
        setIsDeletionDialogVisible(true);
    };

    const handleDeletion = () => {
        setIsDeletionDialogVisible(false);
        const updatedList = fullList.filter((item) => item.id != entry.id);
        updaterFn(updatedList);
    };

    const handleCloseDeletionDialog = () => {
        setIsDeletionDialogVisible(false);
    };

    return (
        <div className="px-4 py-2">
            <span className="text-xl font-semibold">{entry.position}</span>
            <span> at </span>
            <span className="text-xl font-semibold">{entry.orgName}</span>
            <button className="border border-black rounded" onClick={() => editHandler(entry)}>
                Edit
            </button>
            <button className="border border-black rounded" onClick={handleOpenDeletionDialog}>
                X
            </button>

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
        }),
    ).isRequired,
    updaterFn: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
};

export default CustomiserPreviousEntries;
