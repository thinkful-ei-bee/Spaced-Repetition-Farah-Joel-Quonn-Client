import React, { Component } from 'react'

class DashboardRoute extends Component {
  render() {

    const hardcodedWords = [];

    return (
      <section className="word-to-learn">
        <div>
          <h3>Word to practice</h3>
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
      </section>
    );
  }
}

export default DashboardRoute
