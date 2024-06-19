interface CustomiserItemDetailProps {
    text: string;
}

const CustomiserItemDetail: React.FC<CustomiserItemDetailProps> = ({ text }) => {
    return <li className="list-disc list-inside break-words">{text}</li>;
};

export default CustomiserItemDetail;
