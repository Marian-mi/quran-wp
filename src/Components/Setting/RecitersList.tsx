import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    onQariChange(e: React.MouseEvent | React.KeyboardEvent): void;
    selectedQariIndex: number;
}

const RecitersList = ({ onQariChange, selectedQariIndex }: Props): JSX.Element => (
    <div className="qari-options-container">
        {recitersData.map((item, index) => (
            <div
                className="qari-option"
                customvalue={`${item.value}-${item.id}`}
                key={item.id}
                onClick={(e) => { onQariChange(e); }}
                onKeyUp={(e) => { if (e.key === 'Enter') onQariChange(e); }}
                role="button"
                tabIndex={item.id}
            >
                {selectedQariIndex === index && <FontAwesomeIcon className="selected-qari" icon={faCheckCircle} />}
                <p>{item.name}</p>
                {' '}
                {item.type && <span>{item.type}</span>}
            </div>
        ))}
    </div>
);

export default RecitersList;

const recitersData = [
    {
        id: 0,
        name: 'عبدلباسط',
        value: 'AbdulBaset/Mujawwadmp3',
        type: 'مجوّد',
    },
    {
        id: 1,
        name: 'عبدلباسط',
        value: 'AbdulBaset/Murattalmp3',
        type: 'مرتّل',
    },
    {
        id: 2,
        name: 'العفاسی',
        value: 'Alafasymp3',
        type: null,
    },
    {
        id: 3,
        name: 'خلیل‌الحصری',
        value: 'Husary/Mujawwadogg',
        type: 'مجوّد',
    },
    {
        id: 4,
        name: 'خلیل‌الحصری',
        value: 'Husary/Murattalogg',
        type: 'مرتّل',
    },
    {
        id: 5,
        name: 'منشاوی',
        value: 'Minshawi/Mujawwadmp3',
        type: 'مجوّد',
    },
    {
        id: 6,
        name: 'منشاوی',
        value: 'Minshawi/Murattalmp3',
        type: 'مرتّل',
    },
];
