import React, { Component } from "react";
import './Hangman.css';
import {randomWord} from "./words";
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
    /* by default, allow 6 guesses and use provided gallows images. */
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6]
    };

    constructor(props) {
        super(props)
        this.state = {
            numWrong: 0,
            guessed: new Set(),
            answer: randomWord()
        };
        this.handleGuess = this.handleGuess.bind(this);
        this.restart = this.restart.bind(this);
    }

    restart() {
        this.setState({
            numWrong: 0,
            guessed: new Set(),
            answer: randomWord()
        })
    }

    /* guessWord: show current-state of word:
        if guessed letters are {a,p,e}, show 'app_e' for 'apple'
     */
    guessWord() {
        return this.state.answer
            .split("")
            .map(char => {return(this.state.guessed.has(char) ? char : "_")});
    }

    /* handleGuess: handle a guessed letter:
     - add to guessed letters
     - if not in answer, increase number-wrong guesses
     */
    handleGuess(evt) {
        let word = evt.target.value;
        this.setState(prevState => ({
            guesses: prevState.guessed.add(word),
            numWrong: prevState.numWrong + (prevState.answer.includes(word) ? 0 : 1)
        }));
    }

    /* generateButtons: return array of letter buttons to render */
    generateButtons() {
        return 'abcdefghijklmnopqrstuvwxyz'.split("").map(word => (
            <button
                key={word}
                value={word}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(word)}
            >
                {word}
            </button>
        ))
    }

    /* render: render game */
    render() {
        const gameOver = this.state.numWrong >= this.props.maxWrong;
        const isWinner = this.guessWord().join("") === this.state.answer;
        const imgAltText = `${this.state.numWrong}/${this.props.maxWrong} of the body is hanged.`
        let gameState = this.generateButtons();
        if (isWinner) gameState = <p>You win!</p>
        if (gameOver) gameState = <p>You lose!</p>
        return(
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.numWrong]} alt={imgAltText}/>
                <p className='numWrong'>Wrong Guessed: {this.state.numWrong}/{this.props.maxWrong}</p>
                <p className='Hangman-word'>{!gameOver ? this.guessWord() : this.state.answer }</p>
                <p className='Hangman-button'>{gameState}</p>
                <button id='restart' onClick={this.restart}>Restart</button>
            </div>
        )
    }
}

export default Hangman;