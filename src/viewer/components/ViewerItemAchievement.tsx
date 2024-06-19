interface ViewerItemAchievementProps {
    text: string;
}

const ViewerItemAchievement: React.FC<ViewerItemAchievementProps> = ({ text }) => {
    return <li className="list-disc list-inside">{text}</li>;
};

export default ViewerItemAchievement;
