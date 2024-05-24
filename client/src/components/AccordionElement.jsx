import { useState } from "react";
import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import PropTypes from "prop-types";
import { RiArrowDownWideFill, RiArrowRightWideFill } from "react-icons/ri";

const AccordionElement = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <AccordionItem
            className="p-3 border-b-2 border-gray-200 dark:border-[#343A40] w-full transition duration-300"
        >
            <AccordionItemHeading onClick={toggleAccordion}>
                <AccordionItemButton className="font-bold flex items-center gap-3">
                    {
                        isExpanded ? 
                            <RiArrowRightWideFill className="text-2xl text-primary dark:text-gray-100"/> : <RiArrowDownWideFill className="text-2xl text-primary dark:text-gray-100"/>
                    }
                    {item?.question}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="mt-3">
                {item?.answer}
            </AccordionItemPanel>
        </AccordionItem>
    );
};

AccordionElement.propTypes = {
    item: PropTypes.object.isRequired,
};

export default AccordionElement;
