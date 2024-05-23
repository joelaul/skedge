import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {loginUser} from "../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.authReducer.isAuthenticated) {
            this.props.history.push("/");
        }

        if (nextProps.errorReducer) {
            this.setState({errors: nextProps.errorReducer})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData)
    };

    render() {
        const {errors} = this.state;
        const {isAuthenticated, user} = this.props.authReducer;

        const outState = (
            <div className="outState">
                You must be logged in the ask a question.
                Login below or <Link to="/register">Signup</Link>
                <form noValidate onSubmit={this.onSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    {errors.email}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors.password}
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );

        const inState = (
            `You are currently logged in as ${user.name}.`
        );

        return (
            <div className="Login">
                {isAuthenticated ? inState : outState}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authReducer: state.authReducer,
    errorReducer: state.errorReducer
});

export default connect(mapStateToProps, {loginUser})(Login);