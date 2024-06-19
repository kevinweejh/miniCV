interface ViewerGeneralProps {
    info: {
        firstName: string;
        lastName: string;
        email: string;
        countryCode: string | undefined | null;
        mobile: string | null;
        state: string;
        city: string;
        stateInputVis: boolean;
        cityInputVis: boolean;
        portfolio: string;
        gitHub: string;
        portfolioInputVis: boolean;
        gitHubInputVis: boolean;
    }
}

const ViewerGeneral: React.FC<ViewerGeneralProps> = ({ info }) => {
    const isObjectFilled: boolean = Object.values(info).some((value) => value != null && value !== '');

    return (
        <>
            {isObjectFilled && (
                <section className="flex flex-col grow text-center mb-2">
                    <h1 className="text-2xl font-semibold">
                        {info.firstName} {info.lastName}
                    </h1>
                    <p>
                        {info.email}{info.mobile && ` | ${info.mobile}`}
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

export default ViewerGeneral;
