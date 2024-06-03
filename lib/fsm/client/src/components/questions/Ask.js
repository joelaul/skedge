import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createQuestion } from "../../actions/questionActions";

class Ask extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      errors: {},
    };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.authReducer;

    if (!isAuthenticated) {
      this.props.history.push("/login");
    }
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

    const newQuestion = {
      title: this.state.title,
      body: this.state.body,
    };

    this.props.createQuestion(newQuestion, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Ask">
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChange}
          />
          {errors.title}
          <input
            type="text"
            name="body"
            placeholder="Ask a question..."
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
});

export default connect(mapStateToProps, { createQuestion })(withRouter(Ask));
