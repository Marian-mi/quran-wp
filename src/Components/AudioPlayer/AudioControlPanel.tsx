/* eslint-disable no-param-reassign */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import AudioControlButtons from './AudioButtons';
import '../../scss/audioPlayer.scss';

type props = {
    totalAyats: number;
    soreNumber: number;
    selectedQari: string;
    currentDivIndex: number;
    onAyeChange(index: number): void;
}

const AudioControlPanel = ({
    totalAyats, soreNumber, selectedQari, currentDivIndex, onAyeChange,
}: props): JSX.Element => {
    const value = selectedQari;
    const audioType = value.slice(value.length - 3, value.length);
    const qari = value.slice(0, value.length - 3);

    const ayeSrcBuilder = (isPreload?: boolean) => {
        const aye = isPreload ? (ayeIndex + 1).toString().padStart(3, '0') : (ayeIndex).toString().padStart(3, '0');
        const soore = (soreNumber).toString().padStart(3, '0');

        return `https://audio.qurancdn.com/${qari}/${audioType}/${soore}${aye}.${audioType}`;
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const [ayeIndex, setAyeIndex] = useState<number>(currentDivIndex);
    const [ayeProgress, setAyeProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pannelvisibility, setPannelvisibility] = useState(false);

    const isReady = useRef<number>(1);

    const audioSrc = ayeSrcBuilder();
    let audioSrcPreload = '';

    if (ayeIndex < totalAyats - 1) audioSrcPreload = ayeSrcBuilder(true);

    const audioRef = useRef(new Audio());
    const audioRef1 = useRef(new Audio());
    const intervalRef = useRef(setInterval(() => null, 1000));

    useEffect(() => {
        audioRef.current.pause();
        setIsPlaying(false);
        const src = ayeSrcBuilder();
        audioRef.current = new Audio(src);
        if (soreNumber > 0) {
            if (isReady.current === 2 && ayeIndex > 0) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else if (isReady.current === 2 && ayeIndex > 1) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [selectedQari]);

    useEffect(() => {
        if (isReady.current === 2 && currentDivIndex > 0) {
            setAyeIndex(currentDivIndex);
            if (!pannelvisibility) setPannelvisibility(true);
        }
    }, [currentDivIndex]);

    const scrollButton = useRef<HTMLDivElement>(document.querySelector('.scrollTop'));

    const { duration } = audioRef.current;

    const toPrevAye = () => {
        if (soreNumber > 0) {
            if (ayeIndex >= 2) {
                setAyeIndex(ayeIndex - 1);
            }
        } else if (ayeIndex >= 3) {
            setAyeIndex(ayeIndex - 1);
        }
    };

    const toNextAye = () => {
        if (soreNumber > 0) {
            if (ayeIndex < totalAyats) {
                setAyeIndex(ayeIndex + 1);
            }
        } else if (ayeIndex < totalAyats + 1) {
            setAyeIndex(ayeIndex + 1);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            setIsLoading(true);
            audioRef.current.play().then(() => {
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });

            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => (() => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
    }), []);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        audioRef1.current = new Audio(audioSrcPreload);
        setAyeProgress(audioRef.current.currentTime);
        onAyeChange(ayeIndex);
        if (isReady.current === 2) {
            setIsLoading(true);
            audioRef.current.play().then(() => {
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
            setIsPlaying(true);
            const start = () => {
                startTimer();
            };
            start();
        } else {
            isReady.current += 1;
        }
    }, [ayeIndex]);

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextAye();
            } else {
                setAyeProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const onDrag = (value: string) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = +value;
        setAyeProgress(audioRef.current.currentTime);
    };

    const onDragEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const closePanel = () => {
        audioRef.current.pause();
        setAyeIndex(-1);
        setPannelvisibility(false);
        if (scrollButton.current !== null) scrollButton.current.style.bottom = '20px';
    };

    return (
        <div className="audio-player-container" style={{ display: pannelvisibility ? 'block' : 'none' }}>
            <div className="audio-control-buttons">
                <FontAwesomeIcon onClick={closePanel} className="audio-close-icon" icon={faTimesCircle} />
                <AudioControlButtons
                    isPlaying={isPlaying}
                    onPrevClick={toPrevAye}
                    onNextClick={toNextAye}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
            <div className="audio-input">
                <input
                    type="range"
                    value={ayeProgress}
                    min="0"
                    // eslint-disable-next-line no-unneeded-ternary
                    max={duration ? duration : `${duration}`}
                    onChange={(e) => onDrag(e.target.value)}
                    onMouseUp={onDragEnd}
                />
            </div>
            {isLoading && <div className="audio-loading-spinner"><FontAwesomeIcon icon={faSpinner} /></div>}
        </div>
    );
};

export default AudioControlPanel;
