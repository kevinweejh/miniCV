import PropTypes from 'prop-types';

const CustomiserEducation = ({ education, setEducation }) => {

    const entryCount = education.length;

    const handleEducationHistoryAdd = (e) => {
        e.preventDefault();

        const addedEducationItem = {
            id: entryCount,
            schoolName: e.target.schoolNameInput.value,
            titleOfStudy: e.target.titleOfStudyInput.value,
            yearFrom: e.target.yearFromInput.value,
            yearTo: e.target.yearToInput.value
        }

        let newEducationHistory;

        if (education[0].id === null) { // First educationItem being added
            newEducationHistory = [addedEducationItem, ...education.slice(1)];
        } else {
            newEducationHistory = [...education, addedEducationItem];
        }

        setEducation(newEducationHistory);
    }

    return(
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">Education</summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col" onSubmit={handleEducationHistoryAdd}>
                        <label htmlFor="schoolNameInput">School Name: </label>
                        <input type="text" id="schoolNameInput" name="schoolNameInput" placeholder="Berklee College of Music"></input>
                        <label htmlFor="titleOfStudyInput">Title of Study: </label>
                        <input type="text" id="titleOfStudyInput" name="titleOfStudyInput" placeholder="Percussions"></input>
                        <label htmlFor="yearFromInput">Year Started: </label>
                        <input type="text" id="yearFromInput" name="yearFromInput"></input>
                        <label htmlFor="yearToInput">Year Ended/Ending: </label>
                        <input type="text" id="yearToInput" name="yearToInput"></input>
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Add</button>
                    </form>
                </div>
            </details>
            <hr></hr>
        </>
    )
}

CustomiserEducation.propTypes = {
    education: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            schoolName: PropTypes.string,
            titleOfStudy: PropTypes.string,
            yearFrom: PropTypes.string,
            yearTo: PropTypes.string
        })
    ).isRequired,
    setEducation: PropTypes.func.isRequired,
}

export default CustomiserEducation;