/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import '../../scss/setting.scss';
import FontSizeButtons from './FontSizeButton';
import RecitersList from './RecitersList';
import Accordion from './Accordion';

type Props = {
    tarjomeSelection(index: number): void;
    qariChange(selected: string): void;
    selectedTarjomeIndex: string;
}

const Settings = ({ tarjomeSelection, qariChange, selectedTarjomeIndex }: Props): JSX.Element => {
    const defaultQari = localStorage.getItem('qariIndex') ?? 2;
    const [selectedQari, setSelectedQari] = useState(+defaultQari);

    const selectedTarjomeStyle = {
        backgroundColor: '#316879',
        color: 'rgba(255, 255, 255, 0.705)',
    };

    const closeSetting = (e: React.MouseEvent): void => {
        if (e.target === e.currentTarget) {
            const settingContainer = e.target as HTMLDivElement;
            settingContainer.classList.remove('settingOpen');
        }
    };

    const getQariIndex = (e: React.MouseEvent | React.KeyboardEvent) => {
        const target = e.target as HTMLDivElement;
        const value = target.getAttribute('customvalue') as string;
        const [selectedQari, index] = value.split('-');
        localStorage.setItem('qariName', selectedQari);
        localStorage.setItem('qariIndex', index);
        qariChange(selectedQari);
        setSelectedQari(+index);
    };

    return (

        <div className="setting-container" onClick={closeSetting} role="button" tabIndex={0}>
            <div className="setting-headers">
                <p>تنظیمات</p>
            </div>
            <div className="setting-body-container">

                <Accordion
                    className="setting-body"
                    headerText="انتخاب سایز فونت"
                >
                    <>
                        <FontSizeButtons
                            maincontainerClass="setting-body1"
                            localstogrageKey="ayeFont"
                            text="سایز فونت متن عربی آیات"
                        />

                        <FontSizeButtons
                            maincontainerClass="setting-body1"
                            text="سایز فونت متن ترجمه آیات"
                            localstogrageKey="tarjomeFont"
                        />
                    </>
                </Accordion>
                <Accordion
                    className="qari-select-container"
                    headerText="انتخاب قاری"
                >
                    <div className="Qari-select">
                        <RecitersList
                            onQariChange={getQariIndex}
                            selectedQariIndex={selectedQari}
                        />
                    </div>
                </Accordion>
                <Accordion
                    className="tarjome-select-container"
                    headerText="انتخاب ترجمه"
                >
                    {translatorsName.map((reciter, index) => (
                        <div
                            role="button"
                            tabIndex={reciter.id}
                            key={reciter.id}
                            onClick={() => { tarjomeSelection(reciter.id); }}
                            style={index === +selectedTarjomeIndex ? selectedTarjomeStyle : {}}
                        >
                            <p>
                                {reciter.name}
                            </p>
                        </div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Settings;

const translatorsName = [
    {
        name: 'استاد انصاریان', id: 0,
    },
    {
        name: 'آیت الله مکارم شیرازی', id: 1,
    },
    {
        name: 'استاد ملکی', id: 2,
    },
];
