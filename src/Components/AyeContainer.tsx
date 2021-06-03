/* eslint-disable react/require-default-props */
import React from 'react';

type Props = {
    ayeText: string;
    tarjomeText: string;
    index: number
    ayatCount: number;
    fontSize: string[];
    isComingFromSearch?: boolean;
    startingAye?: number;
    color: string;
    children: JSX.Element;
}

const AyeContainer = React.memo(({
    ayeText, ayatCount, tarjomeText, isComingFromSearch,
    startingAye, index, children, fontSize, color,
}: Props): JSX.Element => {
    return (
        <div className="aye-text" style={{ color }}>
            <div className="aye-texts-container">
                <div
                    className="ayeText ayeitself"
                    style={{ fontSize: fontSize[0] }}
                >
                    {ayeText}

                    {!isComingFromSearch
                        && (
                            <span className="aye-index">
                                <p>
                                    {englishNumberToPersian(index + 1)}
                                </p>
                            </span>
                        )}

                    {(isComingFromSearch && startingAye)
                        && (
                            <span className="aye-index">
                                <p>
                                    {englishNumberToPersian(
                                        startingAye + ayatCount + index - 20,
                                    )}
                                </p>
                            </span>
                        )}
                </div>
                <p className="ayeText ayeTarjome" style={{ fontSize: fontSize[1] }}>
                    {tarjomeText}
                </p>
            </div>
            {children}
        </div>
    );
})

export default AyeContainer;

export const englishNumberToPersian = (num: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const spiltted = num.toString().split('');
    const persianNumber = spiltted.map((item) => persianDigits[+item]);

    return persianNumber.join('');
};
