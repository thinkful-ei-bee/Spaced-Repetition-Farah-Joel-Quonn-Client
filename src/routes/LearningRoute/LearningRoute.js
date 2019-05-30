import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageHeadContext from '../../contexts/LanguageHeadContext'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {
  state = {
    guess: '',
    nextWord: '',
    correctAnswer: '',
    isCorrect: null,
    hasSubmittedAnswer: false,
    translatedWord: true,
  }

  static contextType = LanguageHeadContext;

  componentWillMount() {
    languageService.getLanguageHead()
      .then(nextWord => nextWord.nextWord)
      .then(this.context.setNextWord)

    languageService.getLanguageHead()
      .then(totalScore => totalScore.totalScore)
      .then(this.context.setTotalScore)

    languageService.getLanguageHead()
      .then(wordCorrectCount => wordCorrectCount.wordCorrectCount)
      .then(this.context.setWordCorrectCount)

    languageService.getLanguageHead()
      .then(wordIncorrectCount => wordIncorrectCount.wordIncorrectCount)
      .then(this.context.setWordIncorrectCount)
  }

  /* DISPLAY WORD AND FEEDBACK MESSAGE FUNCTIONS */
  displayWord() {
    if (this.state.translatedWord) {
      const word =
      <>
        <h2 className="translateWord">Translate the word:</h2>
        <span>{this.context.nextWord}</span>
      </>
      return word;
    }
  }

  displayFeedbackMessage() {
    if (!this.state.translatedWord) {
      if (this.state.isCorrect === true) { return <h2>You were correct! :D</h2>}
      if (this.state.isCorrect === false) { return <h2>Good try, but not quite right :(</h2> }
      if (this.state.isCorrect === null) { return ''}
    }
  }

  displayHeaderMessage() {
    let headerMessage = (this.state.translatedWord) ?
      this.displayWord() : 
      <div className="DisplayFeedback">
        {this.displayFeedbackMessage()}
        <p>The correct translation for {this.context.nextWord} was {this.state.correctAnswer} and you chose {this.state.guess}!</p>
      </div>
    return headerMessage;
  }
  /* END ISPLAY WORD AND FEEDBACK MESSAGE FUNCTIONS */


  /* HANDLE USER INPUT AND POST FUNCTIONS */
  updateUserGuess = (guess) => {
    this.setState({ guess })
  }

  handleSubmitAnswer = (e) => {
    e.preventDefault();
    let body = { guess: e.currentTarget.id.value }
    this.postUserGuess(body);
  }

  handleNextWordButton = (e) => {
    e.preventDefault();
    this.setState({ 
      nextWord: this.state.nextWord,
      hasSubmittedAnswer: false,
      translatedWord: true,
      guess: ''
    })
    this.context.nextWord = this.state.nextWord;
  }

  postUserGuess() {
    languageService.postGuess(this.state.guess)
      .then(response => {
        this.context.setWordCorrectCount(response.wordCorrectCount)
        this.context.setWordIncorrectCount(response.wordIncorrectCount)
        this.context.setTotalScore(response.totalScore)
        if (response.isCorrect) {
          this.setState({
            nextWord: response.nextWord,
            correctAnswer: response.answer,
            isCorrect: true,
            hasSubmittedAnswer: true,
            translatedWord: false
          })
        } else {
          this.setState({ 
            nextWord: response.nextWord,
            correctAnswer: response.answer,
            isCorrect: false,
            hasSubmittedAnswer: true,
            translatedWord: false
          })
        }
      }
    )
  }
  /* END HANDLE USER INPUT AND POST FUNCTIONS */

  displayForm() {
    return (
    <form onSubmit={this.handleSubmitAnswer}>
      <Label htmlFor='learn-guess-input' className="translation-label">
        What's the translation for this word?
      </Label>
      <Input
        className="translation-input"
        ref={this.firstInput}
        id='learn-guess-input'
        name='learn-guess-input'
        value={this.state.guess}
        onChange={e => this.updateUserGuess(e.target.value)}
        required
      />
    <Button type='submit' className="btn">
        Submit your answer
    </Button>
    </form> )
  }

  displayButtons(){
    let displayForm = 
    (this.state.hasSubmittedAnswer === false) ? 
      this.displayForm()
    : <button type="button" className="btn" onClick={this.handleNextWordButton}>
               Try another word!
    </button>;

    return displayForm;
  }

  render() {
   return (
    <main>
      <section className="quiz-wrapper">
        <div className="quiz-status-bar">
          Status bar
        </div>
        <article className="learning-quiz-question-box">
          {this.displayHeaderMessage()}
        </article>
        
        <div className='DisplayScore'>
          <p>
            {`Your total score is: ${this.context.totalScore}`}
          </p>
        </div>

        <div className="answer-form">
          {this.displayButtons()}
          <div >
            <p >You have answered this word correctly {this.context.wordCorrectCount} times.</p>
            <p >You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
          </div>
        </div>

      </section>
    </main>
    );
  }
}
export default LearningRoute