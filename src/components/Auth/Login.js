import React from "react";
import PropTypes from "prop-types";

const Login = (props) => {
    return (
        <div className='login-container'>
            <nav className='login'>
                <h2>Login</h2>
                <p>Enter login and password from your GitHub account</p>
                <button className='github' onClick={() => props.authenticate()}>
                    Login
                </button>
            </nav>
        </div>
    )
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;