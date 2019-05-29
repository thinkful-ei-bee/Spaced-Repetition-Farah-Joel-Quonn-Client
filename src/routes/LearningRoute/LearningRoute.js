import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageHeadContext from '../../contexts/LanguageHeadContext'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {
  state = {
    userGuess: "",
  }

  static contextType = LanguageHeadContext;
 
  componentWillMount() {
    languageService.getLanguageHead()
      .then(nextWord =>  nextWord.nextWord)
      .then(this.context.setNextWord)

    languageService.getLanguageHead()
      .then(totalScore =>  totalScore.totalScore)
      .then(this.context.setTotalScore)
    
    languageService.getLanguageHead()
      .then(wordCorrectCount =>  wordCorrectCount.wordCorrectCount)
      .then(this.context.setWordCorrectCount)

    languageService.getLanguageHead()
      .then(wordIncorrectCount =>  wordIncorrectCount.wordIncorrectCount)
      .then(this.context.setWordIncorrectCount)
  }

  /* DISPLAY WORD AND SCORE COUNT FUNCTIONS */
  displayWord() {
    const word = 
    <>
      <h2>Translate the word:</h2>
      <span>{this.context.nextWord}</span>
    </>
    return word;
  }

  displayTotalScore() {
      return <p>Your total score is: {this.context.totalScore}</p>
  }

  displayCorrectCount() {
    return <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
  }

  displayIncorrectCount() {
    return <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
  }
  /* END DISPLAY WORD AND SCORE COUNT FUNCTIONS */


  /* HANDLE USER INPUT AND POST FUNCTIONS */
  updateUserGuess = (userGuess) => {
    this.setState({ userGuess })
  }

  handleSubmitAnswer = (e) => {
      e.preventDefault();
      let body = { userGuess: e.currentTarget.answer.value}
      this.postUserGuess(body);
    }

  postUserGuess( apiBody ) {
    languageService.postGuess( apiBody )
      .then(response => {
        console.log(response)
        let userInput = { userGuess: apiBody.userGuess }
        console.log(userInput.userGuess)
      })
    
    // if (userInput.userGuess === response.answer) {
    //   console.log('Congrats!')
    // }
    
  }
  /* END HANDLE USER INPUT AND POST FUNCTIONS */

  render() {
    return (
      <main>
        <section className="quiz-wrapper">
          <div className="quiz-status-bar">
            Status bar
          </div>
          <article className="learning-quiz-question-box">
            {this.displayWord()}
          </article>
          {this.displayTotalScore()}
          <div className="answer-form">
            <form onSubmit={this.handleSubmitAnswer}>
              <Label htmlFor='learn-guess-input' className="translation-label">
                What's the translation for this word?
              </Label>
              <Input
                className="translation-input"
                ref={this.firstInput}
                id='answer'
                name='learn-guess-input'
                value={this.state.userGuess}
                onChange={e => this.updateUserGuess(e.target.value)}
                required
                />
              <Button type='submit' className="btn">
                Submit your answer
            </Button>
            </form>
            {this.displayCorrectCount()}
            {this.displayIncorrectCount()}
          </div>
        </section>
      </main>
    );
  }
}

export default LearningRoute
