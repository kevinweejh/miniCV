import ViewerItemAchievementsList from './ViewerItemAchievementsList';

interface ViewerOtherItemProps {
    otherSectionItem: {
        id: number;
        title: string;
        link: string;
        detailsList: { id: number; text: string; }[];
        formType: string;
    }
}

const ViewerOtherItem: React.FC<ViewerOtherItemProps> = ({ otherSectionItem }) => {
    const formType = otherSectionItem.formType;
    const skillsList = otherSectionItem.detailsList.map((detail) => detail.text);
    return (
        <>
            {formType === 'skills' ? (
                <>
                    <div className="flex flex-row">
                        <span className="font-semibold">{otherSectionItem.title}:&nbsp;</span>
                        <span>{skillsList.join(', ')}</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row justify-between mb-2">
                        <p className="font-semibold text-left">{otherSectionItem.title}</p>
                        <p className="text-right">{otherSectionItem.link}</p>
                    </div>
                    <ViewerItemAchievementsList achievementsList={otherSectionItem.detailsList} />
                </>
            )}
        </>
    );
};

export default ViewerOtherItem;
