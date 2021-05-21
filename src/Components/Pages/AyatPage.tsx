import React, { lazy, Suspense } from 'react';
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

const AudioPlayer = lazy(() => import('../AudioPlayer/AudioControlPanel'));
const Setting = lazy(() => import('../Setting/Setting'));

const getTranslation = async (name: string) => {
    const module = await import(`../../assets/ts/tarjomeh/fa.${name}.ts`);
    return module.default;
};

const getQuranText = async () => {
    const module = await import('../../assets/ts/quran-simple-plain');
    return module.default;
};

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        ayeno?: number;
        sooreno?: number;
        customvalue?: string;
        testid?: string;
    }
}
type propsType = {
    location: {
        state: {
            start: number;
            end: number;
            ayeName: string;
            sooreNumber: number;
            isComingFromSearch: boolean;
            scrolltoAye: number;
            ayatCount: number;
        }
    }
}

type state = {
    ayeCounter: number;
    selectedTarjome: string[];
    qari: string;
    quranText: string[];
    currentDivIndex: number;
    fontSize: string[];
    tarjomeIndex: string;
}

export default class AyatPage extends React.Component<propsType, state> {
    constructor(props: propsType) {
        super(props);
        this.state = {
            ayeCounter: 0,
            selectedTarjome: [],
            quranText: [],
            qari: localStorage.getItem('qariName') ?? 'Alafasymp3',
            currentDivIndex: 0,
            fontSize: ['35px', '26px'],
            tarjomeIndex: localStorage.getItem('tarjomeFile') ?? '0',
        };
    }

    copyNotifRef = React.createRef<HTMLDivElement>();

    scrollButtonRef = React.createRef<HTMLDivElement>();

    mainContainerRef = React.createRef<HTMLDivElement>();

    spinnerRef = React.createRef<HTMLDivElement>();

    ayeCointinerRef = React.createRef<HTMLDivElement>();

    translationFiles = ['ansarian', 'makarem', 'maleki'];

    qariChangeHandler = (selected: string): void => {
        this.setState({
            qari: selected,
        });
    }

    buttonsData = [
        { textData: 'Play', icon: <FontAwesomeIcon className="playButton" icon={faPlayCircle} />, id: 1 },
        { textData: 'Copy', icon: <FontAwesomeIcon onClick={(e) => { copyFunction(e); this.showCopyNotif(); }} className="copyButton" icon={faCopy} />, id: 3 },
        { textData: 'Share', icon: <FontAwesomeIcon icon={faShare} />, id: 4 },
    ]

    buttonMaker = (ayeNumber: number): JSX.Element[] => {
        const { scrolltoAye, isComingFromSearch } = this.props.location.state;
        const buttons = this.buttonsData.map((item, index) => (
            <Buttons
                className="ayeButtons"
                textData={item.textData}
                icon={item.icon}
                index={index}
                ayeNumber={isComingFromSearch ? scrolltoAye + ayeNumber : ayeNumber + 1}
                ayeChangeHandler={this.onAyeChange}
                key={item.id}
            />
        ));
        return buttons;
    }

    onAyeChange = (e: React.MouseEvent | React.KeyboardEvent ): void => {
        const target = e.currentTarget as HTMLDivElement;
        const index = target.getAttribute('ayeno') as string;
        const param = this.props.location.state.sooreNumber === 1 ? +index + 1 : +index;
        this.setCurrentDivIndex(param);
    }

    setCurrentDivIndex = (index: number): void => {
        this.setState({
            currentDivIndex: index,
        });
    }

    observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
            this.observerCallback();
        }
    }, { threshold: 0.3 });

    textDataLoader = async (index: number): Promise<void> => {
        this.observer.disconnect();

        if (this.spinnerRef.current) this.spinnerRef.current.style.display = 'block';
        const translationFile = await getTranslation(this.translationFiles[index]);
        const textFile = await getQuranText();

        const ayeText = textFile.filter((item, index) => {
            const { start, end } = this.props.location.state;
            if (index >= start && index < end) {
                return item;
            } return false;
        });

        this.setState({
            selectedTarjome: translationFile,
            quranText: ayeText,
            tarjomeIndex: index.toString(),
        });

        if (this.spinnerRef.current) this.spinnerRef.current.style.display = 'none';

        localStorage.setItem('tarjomeFile', index.toString());

        const lastNode = document.querySelector('.aye-page-footer') as HTMLDivElement;

        this.observer.observe(lastNode);
    }

    observerCallback = (): void => {
        const { quranText, ayeCounter } = this.state;

        const mainContainer = this.mainContainerRef.current as HTMLDivElement;
        const currentScrollPosition = mainContainer.scrollTop;
        const index = ayeCounter;
        if (index > quranText.length) return;
        this.stateUpdater(currentScrollPosition);
    }

    stateUpdater =
        (prevScrollHeight: number): void => {
            this.setState((state) => ({
                ayeCounter: state.ayeCounter + 20,
            }));

            if (this.mainContainerRef.current) {
                this.mainContainerRef.current.scrollTop = prevScrollHeight;
            }
        }

    showCopyNotif = (): void => {
        const copyAlert = this.copyNotifRef.current;

        if (copyAlert !== null) {
            copyAlert.style.transform = 'translateY(-20%)';
            setTimeout(() => {
                copyAlert.style.transform = 'translateY(-120%)';
            }, 2000);
        }
    }

    componentDidMount(): void {
        if (localStorage.getItem('tarjomeFile')) {
            const index = localStorage.getItem('tarjomeFile') as string;
            this.textDataLoader(+index);
        } else {
            this.textDataLoader(0);
        }

        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps: propsType, prevState: state): void {
        const { isComingFromSearch, scrolltoAye } = this.props.location.state;
        const { currentDivIndex } = this.state;
        if (currentDivIndex !== prevState.currentDivIndex && this.ayeCointinerRef.current) {
            const mainContChildren = this.ayeCointinerRef.current.children;
            const { sooreNumber } = this.props.location.state;
            let index = currentDivIndex + 2;
            if (sooreNumber === 1 || sooreNumber === 9) index -= 1;
            if (isComingFromSearch) index = index - scrolltoAye + 1;
            if (index > 1) {
                const targetChild = mainContChildren[index] as HTMLDivElement;
                const scrollAmount = targetChild.offsetTop - 100;
                this.scrollTo(scrollAmount);
            }
        }
    }

    componentWillUnmount(): void {
        this.observer.disconnect();
    }

    scrollToTop = (): void => {
        if (this.mainContainerRef.current !== null) {
            this.mainContainerRef.current.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }

    openSetting = (): void => {
        const settingContainer = document.querySelector('.setting-container') as HTMLDivElement;
        settingContainer.classList.add('settingOpen');
    }

    displayScrollButton = (): void => {
        const target = this.mainContainerRef.current;
        if (target !== null && this.scrollButtonRef.current !== null) {
            if (target.scrollTop > 800) {
                this.scrollButtonRef.current.style.display = 'block';
            } else {
                this.scrollButtonRef.current.style.display = 'none';
            }
        }
    }

    scrollTo(value: number): void {
        if (this.mainContainerRef.current) {
            this.mainContainerRef.current.scrollTop = value;
        }
    }

    render(): JSX.Element {
        const {
            isComingFromSearch, ayatCount, sooreNumber, ayeName, scrolltoAye, start,
        } = this.props.location.state;

        const totalAyats = isComingFromSearch ? ayatCount : this.state.quranText.length;

        const {
            ayeCounter, fontSize, quranText, selectedTarjome, currentDivIndex,
        } = this.state;

        return (
            <div className="aye-main" onScroll={this.displayScrollButton} ref={this.mainContainerRef}>
                <Suspense fallback={<div />}>
                    <Setting
                        qariChange={this.qariChangeHandler}
                        tarjomeSelection={this.textDataLoader}
                        selectedTarjomeIndex={this.state.tarjomeIndex}
                    />
                </Suspense>
                <div className="aye-container" ref={this.ayeCointinerRef}>
                    <div className="aye-page-header">
                        <Link to="/">
                            <FontAwesomeIcon icon={faChevronCircleLeft} className="backtohomeIcon" />
                        </Link>
                        <div className="copied" ref={this.copyNotifRef}>
                            <p>Copied to Clipboard!</p>
                        </div>
                        <FontAwesomeIcon icon={faCog} onClick={this.openSetting} className="settingIcon" />
                        <p>
                            {ayeName}
                        </p>
                    </div>

                    {sooreNumber !== 9 && <img loading="lazy" src={logo} alt="Bismillah" />}

                    <div ref={this.spinnerRef} className="aye-spinner">
                        <div></div>
                        <div></div>
                    </div>

                    {quranText.map((item, index) => {
                        if (index > ayeCounter - 1) return undefined;
                        let divIndex = !isComingFromSearch
                            ? currentDivIndex - 1
                            : currentDivIndex - scrolltoAye;
                        if (sooreNumber === 1 || sooreNumber === 9) divIndex -= 1;
                        return (
                            <AyeContainer
                                ayatCount={ayeCounter}
                                ayeText={item}
                                tarjomeText={selectedTarjome[start + index - 1]}
                                isComingFromSearch={isComingFromSearch}
                                startingAye={scrolltoAye}
                                index={index}
                                key={index}
                                fontSize={fontSize}
                                color={index === divIndex
                                    ? 'rgba(22, 114, 109, 0.815)'
                                    : 'rgba(34, 34, 34, 0.733)'}
                            >
                                <div className="aye-buttons-container">
                                    {this.buttonMaker(index)}
                                </div>
                            </AyeContainer>
                        );
                    })}
                    <div className="scrollTop" ref={this.scrollButtonRef}>
                        <FontAwesomeIcon icon={faChevronCircleUp} onClick={this.scrollToTop} />
                    </div>
                    <div className="aye-page-footer" />
                    <ErrorBoundary>
                        <Suspense fallback={<div />}>
                            <AudioPlayer
                                selectedQari={this.state.qari}
                                soreNumber={sooreNumber}
                                totalAyats={totalAyats}
                                currentDivIndex={this.state.currentDivIndex}
                                onAyeChange={this.setCurrentDivIndex}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

const getParentElement = (element: HTMLElement, cnt: number): HTMLElement => {
    let current = element;
    let parent;
    for (let i = 0; i < cnt; i += 1) {
        parent = current.parentElement as HTMLDivElement;
        current = parent;
    }
    return current;
};
const copyFunction = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const parent = getParentElement(target, 4);
    // eslint-disable-next-line
    const theTarget = parent.children[0]!.children[0]!;

    const r = document.createRange();

    r.selectNode(theTarget);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(r);
    document.execCommand('copy');
    window.getSelection()?.removeAllRanges();
};
