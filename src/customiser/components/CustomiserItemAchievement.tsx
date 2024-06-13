interface CustomiserItemAchievementProps {
    text: string;
}

const CustomiserItemAchievement: React.FC<CustomiserItemAchievementProps> = ({ text }) => {
    return <li className="list-disc list-inside break-words">{text}</li>;
};

export default CustomiserItemAchievement;
