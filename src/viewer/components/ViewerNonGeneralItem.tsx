import ViewerItemAchievementsList from './ViewerItemAchievementsList';
import dayjs from 'dayjs';

interface ViewerNonGeneralItemProps {
    nonGeneralSectionItem: {
        id: number;
        orgName: string;
        position: string;
        yearFrom: string;
        yearTo: string;
        currentStatus: boolean;
        achievementsList:{
            id: number;
            text: string;
        }[];
        formType: string;
    }
}

const ViewerNonGeneralItem: React.FC<ViewerNonGeneralItemProps> = ({ nonGeneralSectionItem }) => {
    const formType: string = nonGeneralSectionItem.formType;
    const educationDateToObject = dayjs(nonGeneralSectionItem.yearTo);
    const graduated: boolean = educationDateToObject.isBefore(dayjs());
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
                                {graduated ? nonGeneralSectionItem.yearTo : `Expected ${nonGeneralSectionItem.yearTo}`}
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
                                {nonGeneralSectionItem.yearFrom} &#8211;{' '}
                                {nonGeneralSectionItem.currentStatus ? 'Present' : nonGeneralSectionItem.yearTo}
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
