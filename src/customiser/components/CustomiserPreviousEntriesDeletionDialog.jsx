import PropTypes from 'prop-types';

const CustomiserPreviousEntriesDeletionDialog = ({ entry, handleDeletion, handleCloseDeletionDialog }) => {
    return (
        <div id="deletionConfirmationDialog">
            <dialog
                open
                className="border border-gray-400 bg-white rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10"
            >
                <strong className="text-lg">Warning</strong>
                <pre className="font-sans min-h-fit">
                    You are about to delete&#160;
                    <span className="underline">
                        {entry.position} at {entry.orgName}
                    </span>
                    . Press OK to confirm.
                </pre>
                <form method="dialog" className="text-lg font-bold mt-5 flex flex-col text-center">
                    <button
                        id="confirmBtn"
                        onClick={handleDeletion}
                        className="w-full p-2.5 border rounded-2xl text-white bg-blue-600 hover:bg-blue-500 hover:text-gray-200 cursor-pointer"
                    >
                        OK
                    </button>
                    <button
                        id="cancelBtn"
                        onClick={handleCloseDeletionDialog}
                        className="w-full p-2.5 border rounded-2xl text-white bg-red-600 hover:bg-red-500 hover:text-gray-200 cursor-pointer"
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
