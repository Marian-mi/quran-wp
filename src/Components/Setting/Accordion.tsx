import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface Props {
    children: JSX.Element | JSX.Element[],
    headerText: string,
    className: string,
}

const Accordion = ({ children, headerText, className }: Props): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <SettingHeader text={headerText} toggleSetting={setIsOpen} isOpen={isOpen} />
            <div className={className}>
                {isOpen && children}
            </div>
        </>
    );
};

export default Accordion;

type headerProps = {
    text: string;
    toggleSetting(param: boolean): void;
    isOpen: boolean;
}

const SettingHeader = ({ text, toggleSetting, isOpen }: headerProps) => (
    <div
        onClick={() => {
            if (isOpen) toggleSetting(false);
            else toggleSetting(true);
        }}
        onKeyUp={(e) => {
            if (e.key === 'Enter' && isOpen) toggleSetting(false);
            else if (e.key === 'Enter') toggleSetting(true);
        }}
        className="body-headers"
        role="button"
        tabIndex={0}
    >
        {text}
        <div><FontAwesomeIcon className="body-headers-icon" icon={isOpen ? faArrowAltCircleUp : faArrowAltCircleDown} /></div>
    </div>
);
