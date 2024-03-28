import PropTypes from 'prop-types';

const CustomiserPreviousEntriesDeletionDialog = ({ entry, handleDeletion, handleCloseDeletionDialog }) => {
    return (
        <div id="deletionConfirmationDialog">
            <dialog
                open
                className="border border-regent-st-blue-400 bg-regent-st-blue-100 text-regent-st-blue-950 rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10"
            >
                <strong className="text-lg">Warning</strong>
                <p className="font-sans min-h-fit break-words">
                    You are about to delete&#160;
                    <span className="underline">
                        {entry.position} at {entry.orgName}
                    </span>
                    .
                </p>
                <form method="dialog" className="text-lg font-bold mt-5 flex flex-col text-center gap-2">
                    <button
                        id="confirmBtn"
                        onClick={handleDeletion}
                        className="w-full p-2.5 border rounded-2xl border-red-600 text-white bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                        Delete
                    </button>
                    <button
                        id="cancelBtn"
                        onClick={handleCloseDeletionDialog}
                        className="w-full p-2.5 border rounded-2xl border-regent-st-blue-400 text-white bg-regent-st-blue-400 hover:bg-regent-st-blue-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                </form>
            </dialog>
            <div id="overlay" className="fixed top-0 left-0 w-full h-full bg-white/90 z-[1] pointer-events-none"></div>
        </div>
    );
};

CustomiserPreviousEntriesDeletionDialog.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        orgName: PropTypes.string,
        position: PropTypes.string,
    }).isRequired,
    handleDeletion: PropTypes.func.isRequired,
    handleCloseDeletionDialog: PropTypes.func.isRequired,
};

export default CustomiserPreviousEntriesDeletionDialog;
