/* eslint-disable */

// ayeMaker = (item: string[], index: number, count: number): JSX.Element | undefined => {
    //     const {
    //         start, scrolltoAye, isComingFromSearch,
    //     } = this.props.location.state;

    //     const { selectedTarjome } = this.state;

    //     const [ayeS, tarjomeS] = this.state.fontSize;

    //     if (index > item.length - 1) {
    //         return undefined;
    //     }
    //     return (
    //         <div
    //             className="aye-text"
    //             key={item[0][2] + index.toString()}
    //         >

    //             <div className="aye-texts-container">
    //                 <div className="ayeText ayeitself" style={{ fontSize: ayeS }}>

    //                     {item[index]}

    //                     {!isComingFromSearch
    //                         && (
    //                             <span className="aye-index">
    //                                 <p>
    //                                     {englishNumberToPersian(count + index + 1)}
    //                                 </p>
    //                             </span>
    //                         )}

    //                     {isComingFromSearch
    //                         && (
    //                             <span className="aye-index">
    //                                 <p>
    //                                     {englishNumberToPersian(
    //                                         scrolltoAye + count + index,
    //                                     )}
    //                                 </p>
    //                             </span>
    //                         )}

    //                 </div>
    //                 {selectedTarjome.length !== 0
    //                     && (
    //                         <p className="ayeText ayeTarjome" style={{ fontSize: tarjomeS }}>
    //                             {selectedTarjome[start + count + index - 1]}
    //                         </p>
    //                     )}
    //             </div>
    //             <div
    //                 className="aye-buttons-container"
    //                 ayeno={isComingFromSearch ? scrolltoAye + count + index : count + index + 1}
    //                 onClick={(e) => { this.onAyeChange(e); }}
    //                 onKeyUp={(e) => { if (e.key === 'Enter') this.onAyeChange(e); }}
    //                 role="button"
    //                 tabIndex={count + index + 1}
    //             >
    //                 {this.buttonMaker}
    //             </div>
    //         </div>
    //     );
    // }
// for (let i = 0; i < 20; i += 1) {
        //     arr.push(this.ayeMaker(item, i, index));
        //     if (i === 19) {
        //         this.stateUpdater(arr, index, currentScrollPosition);
        //     }
        // }

// elementMaker = (index: number): JSX.Element | null => {
//     const {
//         isComingFromSearch, scrolltoAye,
//     } = this.props.location.state;

//     const {
//         selectedTarjome, ayeCounter, fontSize, quranText,
//     } = this.state;

//     if (index > quranText.length - 1) return null;

//     return (
//         <AyeContainer
//             ayatCount={ayeCounter}
//             ayeText={quranText[ayeCounter + index]}
//             tarjomeText={selectedTarjome[ayeCounter + index]}
//             isComingFromSearch={isComingFromSearch}
//             startingAye={scrolltoAye}
//             index={ayeCounter + index}
//             key={index}
//             fontSize={fontSize}
//         >
//             <div
//                 className="aye-buttons-container"
//                 ayeno={
//                     isComingFromSearch
//                         ? scrolltoAye + index
//                         : index + 1
//                 }
//                 onClick={(e) => { this.onAyeChange(e); }}
//                 onKeyUp={(e) => { if (e.key === 'Enter') this.onAyeChange(e); }}
//                 role="button"
//                 tabIndex={index + 1}
//             >
//                 {this.buttonMaker}
//             </div>
//         </AyeContainer>
//     );
// }