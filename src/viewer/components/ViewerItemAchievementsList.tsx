import ViewerItemAchievement from './ViewerItemAchievement';

interface ViewerItemAchievementProps {
    achievementsList: { id: number; text: string; }[];
}

const ViewerItemAchievementsList: React.FC<ViewerItemAchievementProps> = ({ achievementsList }) => {
    return (
        <ul>
            {achievementsList.map((achievement) => (
                <ViewerItemAchievement key={achievement.id} text={achievement.text} />
            ))}
        </ul>
    );
};

export default ViewerItemAchievementsList;
