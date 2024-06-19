import ViewerItemAchievementsList from './ViewerItemAchievementsList';
import dayjs from 'dayjs';

interface ViewerNonGeneralItemProps {
    nonGeneralSectionItem: {
        id: number | null;
        orgName: string;
        position: string;
        yearFrom: string | dayjs.Dayjs;
        yearTo: string | dayjs.Dayjs;
        currentStatus: boolean;
        achievementsList: { id: number; text: string }[];
        formType: string;
    }
}

const ViewerNonGeneralItem: React.FC<ViewerNonGeneralItemProps> = ({ nonGeneralSectionItem }) => {
    const formType: string = nonGeneralSectionItem.formType;
    const educationDateToObject = dayjs(nonGeneralSectionItem.yearTo);
    const graduated: boolean = educationDateToObject.isBefore(dayjs());

    const yearFromString = (typeof nonGeneralSectionItem.yearFrom === 'string') ? nonGeneralSectionItem.yearFrom : nonGeneralSectionItem.yearFrom.format('MMM YYYY'); 
    const yearToString = (typeof nonGeneralSectionItem.yearTo === 'string') ? nonGeneralSectionItem.yearTo : nonGeneralSectionItem.yearTo.format('MMM YYYY'); 
    return (
        <>
            {formType === 'education' ? (
                <>
                    <div className="mb-2">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 flex flex-wrap">
                                <span className="font-semibold text-left whitespace-nowrap">
                                    {nonGeneralSectionItem.orgName}&nbsp;
                                </span>
                                <span className="text-base">{nonGeneralSectionItem.position}</span>
                            </div>

                            <p className="text-right">
                                {graduated ? yearToString : `Expected ${yearToString}`}
                            </p>
                        </div>
                        <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-2">
                        <div className="flex flex-row justify-between">
                            <p className="text-left font-semibold">
                                {nonGeneralSectionItem.position},{' '}
                                <span className="font-normal">{nonGeneralSectionItem.orgName}</span>
                            </p>
                            <p className="text-right">
                                {yearFromString} &#8211;{' '}
                                {nonGeneralSectionItem.currentStatus ? 'Present' : yearToString}
                            </p>
                        </div>
                        <ViewerItemAchievementsList achievementsList={nonGeneralSectionItem.achievementsList} />
                    </div>
                </>
            )}
        </>
    );
};

export default ViewerNonGeneralItem;
