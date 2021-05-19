import React from 'react';
import '../../scss/soore-list.scss';
import { Link } from 'react-router-dom';
import SooreList from '../SooreContainer';

const getSuraData = async () => {
    const file = await import('../../assets/ts/sura-data.json');
    return file.default;
};

type props = {

}
interface suraData {
    start: number,
    total: number,
    names: {
        english: string,
        arabic: string,
        finglish: string,
    }
    sooreNumber: number,
    origin: string,
}
type state = {
    elementCounter: number;
    Sura: Array<JSX.Element | null>;
    suraData: suraData[],
}
export default class SooreListPage extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            elementCounter: 0,
            Sura: [],
            suraData: [{
                sooreNumber: 2,
                start: 7,
                total: 286,
                origin: 'Medinan',
                names: {
                    english: 'The Cow',
                    arabic: 'البقرة',
                    finglish: 'Al-Baqara',
                },
            }],
        };
    }

    lastNode = React.createRef<HTMLDivElement>();

    itemMaker =
    (i: number, item: suraData[],
        Linkstyle: Record<string, unknown>, count: number): JSX.Element | null => {
        if (item[i].origin !== undefined) {
            return (
                <Link
                    style={Linkstyle}
                    key={item[i].sooreNumber}
                    to={{
                        pathname: `/Aye/${item[i].names.english}`,
                        state: {
                            start: item[i].start,
                            end: item[i].start + item[i].total,
                            sooreNumber: (count + i + 1),
                            ayeName: item[i].names.arabic,
                        },
                    }}
                >
                    <SooreList
                        arabicName={item[i].names.arabic}
                        conuter={(count + i + 1)}
                        finglishName={item[i].names.finglish}
                        englishName={item[i].names.english}
                        key={item[i].sooreNumber}
                    />
                </Link>
            );
        } return null;
    }

    observerCallback = (): void => {
        const { elementCounter, suraData } = this.state;
        const index = elementCounter;
        const arr = [];
        let j = 10; // number of elements to render on each call
        if (index === 110) {
            j = 5; // on the last call we hvae only 5 ayat to render
        }
        const item = suraData.slice((index), index + 11);
        for (let i = 0; i < j; i += 1) {
            if (index + i > (suraData.length - 1)) return;
            arr.push(this.itemMaker(i, item, { textDecoration: 'none' }, index));
            if (i === j - 1) { this.stateUpdater(arr, index); }
        }
    }

    stateUpdater = (arr: (JSX.Element | null)[], counter: number): void => {
        const newelementCount = counter + 10;
        this.setState((state) => ({
            Sura: [...state.Sura, ...arr],
            elementCounter: newelementCount,
        }));
    }

    componentDidMount(): void {
        const getData = async () => {
            const data = await getSuraData();
            this.setState({
                suraData: data as suraData[],
            });
        };
        getData();
    }

    observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
            this.observerCallback();
        }
    }, { threshold: 1 })

    componentDidUpdate(): void {
        this.observer.observe(this.lastNode.current as HTMLDivElement);
    }

    componentWillUnmount(): void {
        this.observer.disconnect();
    }

    render(): JSX.Element {
        return (
            <div className="soore-list-main">
                <div className="soore-list-top">
                    برای مشاهده آیات هر سوره کلیک کنید
                </div>
                <div className="soore-list-container">
                    {this.state.Sura}
                    <div ref={this.lastNode} id="lastnode" />
                </div>
            </div>
        );
    }
}
