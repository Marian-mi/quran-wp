import {
    faBackward, faForward, faPauseCircle, faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type props = {
    isPlaying: boolean;
    onPlayPauseClick(p1: boolean): void;
    onPrevClick(): void;
    onNextClick(): void;
}

class AudioControlButtons extends React.Component<props> {
    prevButtonRef = React.createRef<HTMLButtonElement>();

    nextButtonRef = React.createRef<HTMLButtonElement>();

    componentDidMount(): void {
        this.prevButtonRef.current?.addEventListener('click', () => { this.props.onPrevClick(); });
        this.nextButtonRef.current?.addEventListener('click', () => { this.props.onNextClick(); });
    }

    componentWillUnmount(): void {
        this.prevButtonRef.current?.removeEventListener('click', () => { this.props.onPrevClick(); });
        this.nextButtonRef.current?.removeEventListener('click', () => { this.props.onNextClick(); });
    }

    render(): JSX.Element {
        function scaleUp(e: React.MouseEvent) {
            const target = e.target as HTMLDivElement;
            target.classList.add('scale-up');
        }

        function scaleDown(e: React.MouseEvent) {
            const target = e.target as HTMLDivElement;
            target.classList.remove('scale-up');
        }

        return (
            <div className="audio-controls">

                <button
                    type="button"
                    ref={this.prevButtonRef}
                    onMouseDown={(e) => { scaleUp(e); }}
                    onMouseUp={(e) => { scaleDown(e); }}
                >
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                {this.props.isPlaying ? (
                    <button
                        type="button"
                        onClick={() => { this.props.onPlayPauseClick(false); }}
                        onMouseDown={(e) => { scaleUp(e); }}
                        onMouseUp={(e) => { scaleDown(e); }}
                    >
                        <FontAwesomeIcon icon={faPauseCircle} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => { this.props.onPlayPauseClick(true); }}
                        onMouseDown={(e) => { scaleUp(e); }}
                        onMouseUp={(e) => { scaleDown(e); }}
                    >
                        <FontAwesomeIcon icon={faPlayCircle} />
                    </button>
                )}
                <button
                    type="button"
                    ref={this.nextButtonRef}
                    onMouseDown={(e) => { scaleUp(e); }}
                    onMouseUp={(e) => { scaleDown(e); }}
                >
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
        );
    }
} export default AudioControlButtons;
