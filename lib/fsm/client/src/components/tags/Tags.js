import React, { Component } from "react";
import { connect } from "react-redux";

class Tags extends Component {
  render() {
    const { questions } = this.props.questionReducer;

    return (
      <div>
        Tags
        <ul>
          {questions.map((question) => {
            return <li>{question.tags}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, null)(Tags);
