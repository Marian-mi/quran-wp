/* eslint-disable react/require-default-props */
import React from 'react';

type props = {
    id?: number | string;
    textData: string;
    icon: JSX.Element;
    className: string;
    index: number;
    ayeNumber?: number;
    ayeChangeHandler(e: React.MouseEvent | React.KeyboardEvent): void;
}

function AyeButtons({
    id, textData, icon, className, ayeNumber, ayeChangeHandler, index,
}: props): JSX.Element {
    if (index === 0) {
        return (
            <div
                className={className}
                ayeno={ayeNumber}
                id={id as string}
                onClick={(e) => { ayeChangeHandler(e) }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') ayeChangeHandler(e);
                }}
                role="button"
                tabIndex={ayeNumber}
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
