/* eslint-disable no-param-reassign */
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type props = {
    maincontainerClass: string;
    text: string;
    localstogrageKey: string;
}
type state = {
    ayeText: NodeListOf<HTMLParagraphElement>;
    ayeTarjome: NodeListOf<HTMLParagraphElement>
}

export default class FontButtons extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            ayeText: document.querySelectorAll<HTMLParagraphElement>('.ayeitself'),
            ayeTarjome: document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome'),
        };
    }

    mutrationCallback: MutationCallback = (entry) => {
        if (entry[0].type === 'childList') {
            const ayeTexts = document.querySelectorAll<HTMLParagraphElement>('.ayeitself');
            const tarjomeTexts = document.querySelectorAll<HTMLParagraphElement>('.ayeTarjome');
            this.setState({
                ayeText: ayeTexts,
                ayeTarjome: tarjomeTexts,
            });
        }
    }

    observer = new MutationObserver(this.mutrationCallback);

    componentDidMount(): void {
        const ayeContainer = document.querySelector('.aye-container') as HTMLDivElement;
        this.observer.observe(ayeContainer, {
            childList: true,
        });
    }

    componentWillUnmount(): void {
        this.observer.disconnect();
    }

    clickHandler = (e: React.MouseEvent, localStoragekey: string, increase: boolean): void => {
        e.preventDefault();
        let fontSize:number;
        const currentFontSize = localStorage.getItem(localStoragekey) ?? '35px';
        if (increase) {
            fontSize = parseInt(currentFontSize, 10) + 2;
        } else {
            fontSize = parseInt(currentFontSize, 10) - 2;
        }
        if (fontSize > 60 || fontSize < 10) return;
        if (localStoragekey === 'ayeFont') {
            localStorage.setItem(localStoragekey, `${fontSize}px`);
            this.state.ayeText.forEach((item) => {
                item.style.fontSize = `${fontSize}px`;
            });
        } else {
            localStorage.setItem(localStoragekey, `${fontSize}px`);
            this.state.ayeTarjome.forEach((item) => {
                item.style.fontSize = `${fontSize}px`;
            });
        }
    }

    render(): JSX.Element {
        return (
            <div className={this.props.maincontainerClass}>
                <div className="font-increase-button">
                    <FontAwesomeIcon
                        onClick={(e) => this.clickHandler(e, this.props.localstogrageKey, false)}
                        icon={faMinusCircle}
                    />
                </div>
                <div className="fontSize-currentAmount">
                    <p>
                        { this.props.text }
                    </p>
                </div>
                <div className="font-decrease-button">
                    <FontAwesomeIcon
                        onClick={(e) => this.clickHandler(e, this.props.localstogrageKey, true)}
                        icon={faPlusCircle}
                    />
                </div>
            </div>

        );
    }
}
