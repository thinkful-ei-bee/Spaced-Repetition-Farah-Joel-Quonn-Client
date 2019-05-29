import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageContext from '../../contexts/LanguageContext'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {

  static contextType = LanguageContext

  // state = {
  //   language: [],
  //   words: [],
  //   nextWord: []
  // }
  
  // Don't think I need getLanguage()
  // getLanguage = () => {
  //   languageService.getLanguage()
  //     .then(res => {
  //       this.setState({
  //         language: res.language,
  //         words: res.words
  //       })
  //       console.log(this.state.words)
  //     })
  // }

  // getLanguageHead = () => {
  //   languageService.getLanguageHead()
  //     .then(res => {
  //       this.setState({
  //         nextWord: [...this.state.nextWord, res]
  //       })
  //       console.log(this.state.nextWord)
  //     })
  // }

  // componentDidMount() {
  //  // this.getLanguage();  don't think I need this
  //   this.getLanguageHead();
  // }

  // displayWord = () => {
  //   const word = this.state.nextWord.map((word, i) => 
  //     <h2 key={i}>How do you say "{word.nextWord}"</h2>
  //     )
  //   return word;
  // }

  // handleSubmitAnswer = (e) => {
  //   e.preventDefault();
  //   const { answer } = e.target
  // }

  render() {
    console.log(this.context)
    
    return (
      <section className="quiz-wrapper">
        <div className="quiz-status-bar">
          Status bar
        </div>
        <article className="learning-quiz-question-box">
          {/* {this.displayWord()} */}
        </article>
        <div className="answer-form">
          <form>
            <Label htmlFor='translation-input' className="translation-label">
              Enter translation<Required />
            </Label>
            <Input
              className="translation-input"
              ref={this.firstInput}
              id='translation-input'
              name='answer'
              required
              />
            <Button type='submit' className="btn">
              Submit answer
          </Button>
          </form>
        </div>
      </section>
    );
  }
}

export default LearningRoute
