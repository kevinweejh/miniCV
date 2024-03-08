import PropTypes from 'prop-types';

const ViewerEducationItem = ({ educationItem }) => {
    return(
        <>
            <h1 className="text-lg font-semibold">{educationItem.schoolName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-left">{educationItem.titleOfStudy}</p>
                <p className="text-right">{educationItem.yearFrom} to {educationItem.yearTo}</p>
            </div>
        </>
    )
}

ViewerEducationItem.propTypes = {
    educationItem: PropTypes.shape({
        id: PropTypes.number,
        schoolName: PropTypes.string,
        titleOfStudy: PropTypes.string,
        yearFrom: PropTypes.number,
        yearTo: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }).isRequired,
}

export default ViewerEducationItem;