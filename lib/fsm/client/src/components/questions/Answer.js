import React, { Component } from "react";
import { connect } from "react-redux";

import { addAnswer } from "../../actions/questionActions";

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({ errors: nextProps.errorReducer });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { _id } = this.props.questionReducer.question;

    const newAnswer = {
      name: this.props.authReducer.user.name,
      body: this.state.body,
    };

    this.props.addAnswer(_id, newAnswer);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Answer" style={{ margin: "3.5rem 0" }}>
        Answer this question
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            name="body"
            placeholder="Answer this question"
            value={this.state.body}
            onChange={this.onChange}
          />
          {errors.body}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  errorReducer: state.errorReducer,
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, { addAnswer })(Answer);
