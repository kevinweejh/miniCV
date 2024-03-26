import PropTypes from 'prop-types';

const ViewerGeneral = ({ info }) => {
    const isObjectFilled = Object.values(info).some((value) => value != null && value !== '');

    return (
        <>
            {isObjectFilled && (
                <section className="flex flex-col text-center">
                    <h1 className="text-2xl font-semibold">
                        {info.firstName} {info.lastName}
                    </h1>
                    <p>
                        {info.email} | {info.mobile}
                        {info.portfolioInputVis ? ` | ${info.portfolio}` : ''}
                        {info.gitHubInputVis ? ` | github.com/${info.gitHub} ` : ''}
                        {info.stateInputVis ? ` | ${info.state}` : ''}
                        {info.cityInputVis && info.stateInputVis ? `, ${info.city}` : ''}
                    </p>
                </section>
            )}
        </>
    );
};

ViewerGeneral.propTypes = {
    info: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        countryCode: PropTypes.string,
        mobile: PropTypes.string,
        state: PropTypes.string,
        city: PropTypes.string,
        stateInputVis: PropTypes.bool,
        cityInputVis: PropTypes.bool,
        portfolio: PropTypes.string,
        gitHub: PropTypes.string,
        portfolioInputVis: PropTypes.bool,
        gitHubInputVis: PropTypes.bool,
    }).isRequired,
};

export default ViewerGeneral;
