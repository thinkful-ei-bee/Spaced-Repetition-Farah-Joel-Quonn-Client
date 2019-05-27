import React, { Component } from 'react'
import "../../components/App/App.css"

class DashboardRoute extends Component {
  render() {

    const hardcodedWords = [];

    return (
      <section className="practice-word">
        <div className="word-to-learn">
          <h2>Word to practice</h2>
          <table>
            <tr>
              <th>{' '}</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
            <tr>Word 1</tr>
            <tr>Word 2</tr>
          </table>
        </div>
        <div className="practice-btn">
          <button type="button">Practice</button>
        </div>
        
      </section>
    );
  }
}

export default DashboardRoute
