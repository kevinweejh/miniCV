import PropTypes from 'prop-types';
import { useState } from 'react'

const CustomiserPreviousEntries = ({ entry, fullList, updaterFn }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogVisible(true);
    }

    const handleDeletion = () => {
        setIsDialogVisible(false);
        const updatedList = fullList.filter((item) => item.id != entry.id);
        updaterFn(updatedList);
    }

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
    }

    return(
        <div className="px-4 py-2">
            <span className="text-xl font-semibold">{entry.titleOfStudy ? entry.titleOfStudy : entry.positionTitle}</span> 
            <span> at </span>
            <span className="text-xl font-semibold">{entry.schoolName ? entry.schoolName : entry.companyName}</span>
            <button onClick={handleOpenDialog}>X</button>

            {isDialogVisible && 
                <div id="deletionConfirmationDialog">
                    <dialog open className="border border-gray-400 bg-white rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-10/12 z-10">
                        <strong className="text-lg">Warning</strong>
                        <pre className="font-sans min-h-fit">You are about to delete&#160;
                            <span className="underline">
                                {entry.titleOfStudy ? entry.titleOfStudy : entry.positionTitle} at {entry.schoolName ? entry.schoolName : entry.companyName}
                            </span>
                            . Press OK to confirm.
                        </pre>
                        <form method="dialog" className="text-lg font-bold mt-5 flex flex-col text-center">
                            <button id="confirmBtn" onClick={handleDeletion} className="w-full p-2.5 border rounded-2xl text-white bg-blue-600 hover:bg-blue-500 hover:text-gray-200 cursor-pointer">OK</button>
                            <button id="cancelBtn" onClick={handleCloseDialog} className="w-full p-2.5 border rounded-2xl text-white bg-red-600 hover:bg-red-500 hover:text-gray-200 cursor-pointer">Cancel</button>
                        </form>
                    </dialog>
                    <div id="overlay" className="fixed top-0 left-0 w-full h-full bg-white/90 z-[1] pointer-events-none"></div>
                </div>
            }
        </div>
    )
}

CustomiserPreviousEntries.propTypes = {
    entry: PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        companyName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        ),
    }).isRequired,
    fullList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        companyName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        positionTitle: PropTypes.string,
        yearFrom: PropTypes.string,
        yearTo: PropTypes.string,
        currentlyStudying: PropTypes.bool,
        achievementsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
            })
        )
    })).isRequired, 
    updaterFn: PropTypes.func.isRequired,
};

export default CustomiserPreviousEntries;