import ViewerNonGeneralItem from './ViewerNonGeneralItem';

interface ViewerNonGeneralProps {
    nonGeneralSection: {
        id: number;
        orgName: string;
        position: string;
        yearFrom: string;
        yearTo: string;
        currentStatus: boolean;
        achievementsList: { id: number; text: string; }[];
        formType: string;
    }[];
}

const ViewerNonGeneral: React.FC<ViewerNonGeneralProps> = ({ nonGeneralSection }) => {
    let formType = null;
    const isArrayFilled = nonGeneralSection.length > 0;
    const isObjectFilled = isArrayFilled
        ? Object.values(nonGeneralSection[0]).some((value) => value != null && value !== '' && !Array.isArray(value))
        : false;

    if (isArrayFilled) {
        formType = nonGeneralSection[0].formType;
    }

    return (
        <>
            {isArrayFilled && isObjectFilled && (
                <section className="flex flex-col grow mb-2">
                    <h1 className="text-2xl font-semibold">{formType === 'education' ? 'Education' : 'Experience'}</h1>
                    <hr></hr>
                    {nonGeneralSection.map((nonGeneralSectionItem) => (
                        <ViewerNonGeneralItem
                            key={nonGeneralSectionItem.id}
                            nonGeneralSectionItem={nonGeneralSectionItem}
                        />
                    ))}
                </section>
            )}
        </>
    );
};

export default ViewerNonGeneral;
