/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react';

type props = {
    id?: number | string;
    textData: string;
    icon: JSX.Element;
    className: string;
    index: number;
    ayeNumber?: number;
    ayeChangeHandler(e: MouseEvent | KeyboardEvent): void;
}

function AyeButtons({
    id, textData, icon, className, ayeNumber, ayeChangeHandler, index,
}: props): JSX.Element {
    const playButtonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (playButtonRef.current) {
            playButtonRef.current.addEventListener('click', (e) => {
                ayeChangeHandler(e);
            });
        }
        return () => {
            playButtonRef.current?.removeEventListener('click', (e) => {
                ayeChangeHandler(e);
            });
        };
    }, []);
    if (index === 0) {
        return (
            <div
                className={className}
                ayeno={ayeNumber}
                id={id as string}
                ref={playButtonRef}
            >
                <div>{icon}</div>
                <p>
                    {textData}
                </p>
            </div>
        );
    }
    return (
        <div className={className} ayeno={ayeNumber} id={id as string}>
            <div>{icon}</div>
            <p>
                {textData}
            </p>
        </div>
    );
}

export default AyeButtons;
