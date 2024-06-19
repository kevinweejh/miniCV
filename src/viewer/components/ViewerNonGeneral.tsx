import ViewerNonGeneralItem from './ViewerNonGeneralItem';
import dayjs from 'dayjs';

interface ViewerNonGeneralProps {
    nonGeneralSection: {
        id: number | null;
        orgName: string;
        position: string;
        yearFrom: string | dayjs.Dayjs;
        yearTo: string | dayjs.Dayjs;
        currentStatus: boolean;
        achievementsList: { id: number; text: string }[];
        formType: string;
    }[];
}

const ViewerNonGeneral: React.FC<ViewerNonGeneralProps> = ({ nonGeneralSection }) => {
    let formType: string | null = null;
    const isArrayFilled: boolean = nonGeneralSection.length > 0;
    const isObjectFilled: boolean = isArrayFilled
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
