import PropTypes from 'prop-types';

const CustomiserExperience = ({ experience, setExperience }) => {
    return(
        <>
            <details>
                <summary className="flex flex-col p-2 text-2xl font-semibold text-center md:text-left hover:cursor-pointer hover:bg-gray-100">Experience</summary>
                <div className="p-4 bg-gray-200">
                    <form className="flex flex-col">
                        <label htmlFor="companyNameInput">Company Name: </label>
                        <input type="text" id="companyNameInput" placeholder="Umbrella Corp."></input>
                        <label htmlFor="positionTitleInput">Position/Title: </label>
                        <input type="text" id="positionTitleInput" placeholder="Chief Scientist"></input>
                        <label htmlFor="yearFromInput">Year Started: </label>
                        <input type="numeric" id="yearFromInput" placeholder="1984"></input>
                        <label htmlFor="yearToInput">Year Ended/Ending: </label>
                        <input type="text" id="yearToInput" placeholder="2003"></input>
                        <label htmlFor="yearToPresent">I am currently working here.</label>
                        <button type="submit" className="border rounded-md w-fit mt-4 ml-auto px-2 border-gray-400 hover:bg-gray-400">Add</button>
                    </form>
                </div>
            </details>
            <hr></hr>
        </>
    )
}

CustomiserExperience.propTypes = {
    experience: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            companyName: PropTypes.string,
            positionTitle: PropTypes.string,
            yearFrom: PropTypes.number, 
            yearTo: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            achievements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    setExperience: PropTypes.func.isRequired,
}

export default CustomiserExperience;