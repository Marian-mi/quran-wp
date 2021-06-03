import React, { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/ayePage.scss';
import {
    faChevronCircleLeft, faChevronCircleUp, faCog, faCopy, faPlayCircle, faShare, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Buttons from '../AyeButton';
import logo from '../../assets/images/bismillah.png';
import ErrorBoundary from '../ErrorBoundary';
import AyeContainer from '../AyeContainer';
import suraData from '../../assets/ts/sura-data.json';


const AudioPlayer = lazy(() => import('../AudioPlayer/AudioControlPanel'));
const Setting = lazy(() => import('../Setting/Setting'));


const getTranslation = async (name: string) => {
    const module = await import(`../../assets/ts/tarjomeh/fa.${name}.ts`);
    return module.default;
};

const getQuranText = async () => {
    const module = await import(/* webpackPreload: true */ '../../assets/ts/quran-simple-plain');
    return module.default;
};

type propsType = {
    match: { params: { sooreNumber: string } }
}


const newAyePage = React.memo(() => {
    const [ayeRenderPositions, setAyeRenderPositions] = useState(
        {start: 0, end: 0,}
    );
    const [textData, setTextData] = useState(
        {quranText: [''], selectedTarjome: [''],
    });
    const [selectedQari, setSelectedQari] = useState(
        localStorage.getItem('qariName') ?? 'Alafasymp3'
    );
    const [tarjomeIndex, setTarjomeIndex] = useState(
        localStorage.getItem('tarjomeFile') ?? '0'
    );
    return (
        <div>
            
        </div>
    )
})

export default newAyePage
