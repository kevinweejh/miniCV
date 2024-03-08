import PropTypes from 'prop-types';

const ViewerGeneral = ({ info }) => {
    const isObjectFilled = Object.values(info).some(value => value != null && value !== '');
    
    return(
        <>
            {isObjectFilled && 
                <section className="flex flex-col text-center">
                    <h1 className="text-2xl font-semibold">{info.firstName} {info.lastName}</h1>
                    <p>{info.email} | {info.mobile}</p>
                </section>
            }
        </>
    )
}

ViewerGeneral.propTypes = {
    info: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        mobile: PropTypes.string, 
    }).isRequired,
};

export default ViewerGeneral;