import React, {
    ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import Sura from '../../assets/ts/quran-metadata';
import Qurantext from '../../assets/ts/quran-simple-plain';
import '../../scss/Search.scss';
import { englishNumberToPersian } from '../AyeContainer';

type resObj = {
    item: string, index: number, cnt: number, start: number, end: number, ayeName: string
}[]

export default function SearchPage(): JSX.Element {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<resObj | undefined>();
    const [elementsResults, setelementsResults] = useState<(JSX.Element | null)[]>();
    const [displayedResults, setDisplayedresults] = useState<(JSX.Element | null)[]>();
    const [itemCount, setitemCount] = useState(0);
    const noResultRef = useRef<HTMLDivElement>(null);
    const lastNodeRef = useRef<HTMLDivElement>(null);

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const input = e.target.value;
            if (input.length > 2) {
                setQuery(input);
                setitemCount(0);
            }
        }, 500);
    };

    useEffect(() => {
        const result = [{
            item: 'none', index: 3, cnt: 0, start: 0, end: 0, ayeName: 'g',
        }];
        if (query.length > 3) {
            for (let i = 0; i < Qurantext.length; i += 1) {
                const pattern = RegExp(query, 'gi');
                const textWithoutArab = Qurantext[i]
                    // eslint-disable-next-line
                    .replace(/[ ْ ٌ ٍ ً ُ ِ َ ّ]/g, '')
                    .replace(/[إأآ]/g, 'ا')
                    .replace(/[ئ ي]/g, 'ی');

                if (pattern.test(Qurantext[i]) || pattern.test(textWithoutArab)) {
                    let theSura = 0; let start = 0; let end = 0; let name = '';

                    Sura.Sura.forEach((item, index, arr) => {
                        if (i >= item[0] && i < arr[index + 1][0]) {
                            theSura = index;
                            start = item[0] as number;
                            end = arr[index + 1][0] as number;
                            name = item[4] as string;
                        }
                    });

                    const info = {
                        item: Qurantext[i],
                        index: i,
                        cnt: theSura,
                        start,
                        end,
                        ayeName: name,
                    };
                    result.push(info);
                }
            }
        }

        setResults(result);

        if (result.length < 2 && noResultRef.current !== null) {
            noResultRef.current.style.display = 'block';
        } else if (noResultRef.current !== null) {
            noResultRef.current.style.display = 'none';
        }
    }, [query]);

    useEffect(() => {
        if (results !== undefined) {
            const res = results.map((item, index) => {
                const ayeData = `سوره ${item.ayeName} -- آیه شماره ${englishNumberToPersian((item.index - item.start + 1))}`;
                if (index !== 0) {
                    return (
                        <SearchResults 
                            data={item}
                            ayeInformation={ayeData}
                        />
                    );
                } return null;
            });
            setelementsResults(res);
        }
    }, [results]);

    useEffect(() => {
        if (elementsResults !== undefined) {
            const elementsTorender = elementsResults.splice(itemCount, itemCount + 10);
            setDisplayedresults(elementsTorender);
        }
    }, [elementsResults]);

    useEffect(() => {
        const lastnode = lastNodeRef.current as HTMLDivElement;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                itemMaker();
            }
        }, { threshold: 0.5 });

        observer.observe(lastnode);

        return () => {
            observer.disconnect();
        };
    }, [displayedResults]);

    const itemMaker = () => {
        if (elementsResults !== undefined
            && displayedResults !== undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            && results !== null && results!.length > 2 && itemCount < results!.length - 1) {
            const index = itemCount + 10;
            const elementsTorender = elementsResults.splice(index, index + 10);
            setDisplayedresults([...displayedResults, ...elementsTorender]);
            setitemCount(itemCount + 10);
        }
    };

    useEffect(() => {
        const searchInput = document.querySelector('#searchQuery') as HTMLInputElement;
        searchInput.focus();
        if (noResultRef.current) noResultRef.current.style.display = 'none';
    }, []);

    return (
        <div id="search-container">
            <p>
                با وارد کردن حداقل سه حرف جستجو را شروع کنید
            </p>
            <div className="search-box">

                <div className="search-input">
                    <input
                        type="text"
                        name="search"
                        id="searchQuery"
                        onChange={(e) => { searchHandler(e); }}
                        defaultValue=""
                        autoComplete="off"
                    />
                </div>

                <div className="search-results-container">
                    {displayedResults}
                </div>
            </div>
            <div id="lastNode" ref={lastNodeRef} />
            <div ref={noResultRef} id="noResult">
                <p>نتیجه ای یافت نشد</p>
            </div>

        </div>
    );
}

type resProps = {
    data: {
        index: number;
        cnt: number;
        start: number;
        item: string;
    }
    ayeInformation: string
}

const SearchResults = ({ data, ayeInformation }: resProps) => (
    <Link
        key={data.index}
        className="searchPageLinks"
        to={`/Aye/${data.cnt}?${data.index - data.start + 1}`}
        style={{
            textDecoration: 'none',
        }}
    >
        <div className="search-result" key={data.index - data.start + 1}>
            <p>
                {data.item}
            </p>
            <p>
                {ayeInformation}
            </p>
        </div>
    </Link>
)
