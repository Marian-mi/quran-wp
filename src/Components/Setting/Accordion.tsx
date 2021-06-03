import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    children: JSX.Element | JSX.Element[],
    headerText: string,
    className: string,
    id: number;
}

const Accordion = ({ children, headerText, className, id, }: Props): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <SettingHeader
                text={headerText}
                toggleSetting={setIsOpen}
                isOpen={isOpen}
                id={id}
            />
            <div className={className} ref={bodyRef} style={{ height: isOpen ? bodyRef.current?.scrollHeight : 0 }}>
                {children}
            </div>
        </>
    );
};

export default Accordion;

type headerProps = {
    text: string;
    toggleSetting(param: boolean): void;
    isOpen: boolean;
    id: number;
}

const SettingHeader = ({ text, toggleSetting, isOpen, id }: headerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null)
    const observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
            setTimeout(() => {
                setIsVisible(true);
                observer.disconnect();
            }, id * 150);
        }
    })

    useEffect(() => {
        headerRef.current && observer.observe(headerRef.current)
    }, [])

    return (
        <div
            onClick={() => {
                if (isOpen) toggleSetting(false);
                else toggleSetting(true);
            }}
            onKeyUp={(e) => {
                if (e.key === 'Enter' && isOpen) toggleSetting(false);
                else if (e.key === 'Enter') toggleSetting(true);
            }}
            className={isVisible ? "body-headers" : "body-headers header-not-visible"}
            role="button"
            tabIndex={0}
            ref={headerRef}
        >
            {text}
            <div>
                <FontAwesomeIcon className="body-headers-icon" icon={isOpen ? faArrowAltCircleUp : faArrowAltCircleDown} />
            </div>
        </div>
    )
};
