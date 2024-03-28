import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomiserItemDetail from './CustomiserItemDetail';
import { Tooltip } from 'react-tooltip';
import TooltipIcon from '../../assets/tooltip.svg?react';

const CustomiserItemDetailsList = ({ detailsList, handleDetailsListAdd, formType }) => {
    const [newDetail, setNewDetail] = useState('');

    const handleAddClick = () => {
        if (newDetail.trim()) {
            // Check if the input is not just empty spaces
            handleDetailsListAdd(newDetail);
            setNewDetail(''); // Reset the input field
        }
    };

    return (
        <>
            <div className="flex gap-2 mt-2">
                <p className="font-semibold">{formType === 'skills' ? 'Skills' : 'Details'}</p>
                {formType === 'skills' ? (
                    <div>
                        <a
                            data-tooltip-id="skillsTooltip"
                            data-tooltip-wrapper="div"
                            data-tooltip-html=""
                            data-tooltip-place="top"
                        >
                            <TooltipIcon className="max-w-6 max-h-6" />
                        </a>
                        <Tooltip id="skillsTooltip" className="max-w-[70%] md:max-w-[20%]" />
                    </div>
                ) : (
                    <div>
                        <a
                            data-tooltip-id="detailsTooltip"
                            data-tooltip-wrapper="div"
                            data-tooltip-html=""
                            data-tooltip-place="top"
                        >
                            <TooltipIcon className="max-w-6 max-h-6" />
                        </a>
                        <Tooltip id="detailsTooltip" className="max-w-[70%] md:max-w-[20%]" />
                    </div>
                )}
            </div>
            <ul>
                {detailsList.map((detail) => (
                    <CustomiserItemDetail key={detail.id} text={detail.text} />
                ))}
            </ul>
            <div className="grid grid-cols-12 gap-1 items-center">
                <textarea
                    className="col-span-10 resize-none outline-regent-st-blue-400 border border-regent-st-blue-400 rounded-md p-1 mt-1"
                    id="newDetail"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder={formType === 'skills' ? 'Enter skill' : 'Enter project detail'}
                ></textarea>
                <div className="col-span-2 flex justify-end">
                    <button
                        onClick={handleAddClick}
                        type="button"
                        className="text-lg font-semibold text-center rounded-[50%] w-fit px-4 py-2 text-regent-st-blue-50 bg-regent-st-blue-500 hover:bg-regent-st-blue-600 active:bg-regent-st-blue-700 hover:cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
};

CustomiserItemDetailsList.propTypes = {
    detailsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
        }),
    ).isRequired,
    handleDetailsListAdd: PropTypes.func.isRequired,
    formType: PropTypes.string,
};

export default CustomiserItemDetailsList;
