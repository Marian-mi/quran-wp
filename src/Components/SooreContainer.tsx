import React from 'react';

type Props = {
    englishName: string;
    arabicName: string;
    finglishName: string;
    conuter: number;
}

const SooreContainer = ({
    englishName, arabicName, finglishName, conuter,
}: Props): JSX.Element => (

    <div className="soore">
        <p className="soore-name-arabic">{arabicName}</p>
        <div className="soore-name-english">
            <p>{finglishName}</p>
            <p className="soore-name-fin">{englishName}</p>
        </div>
        <div className="soore-number-counter">
            <p>{conuter}</p>
        </div>
    </div>

);

export default SooreContainer;
