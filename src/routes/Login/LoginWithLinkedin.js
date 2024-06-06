import React, { Component } from 'react'
// import { LinkedIn } from 'react-linkedin-login-oauth2';
import IntlMessages from '../../util/IntlMessages';

class LoginWithLinkedin extends Component {

    state = {
        code: '',
        errorMessage: '',
    };


    handleSuccess = (data) => {
        this.setState({
            code: data.code,
            errorMessage: '',
        });
    }

    handleFailure = (error) => {
        this.setState({
            code: '',
            errorMessage: error.errorMessage,
        });
    }

    render() {
        const { code, errorMessage } = this.state;
        return (
            <div>
                {/* <LinkedIn
                    clientId="77t8queagb29b3"
                    onFailure={this.handleFailure}
                    onSuccess={this.handleSuccess}
                    redirectUri="http://localhost:3000/auth/signin-linkedin"
                >
                    <img alt="Illustration" style={{ width: "200px", cursor: "pointer" }} src={require("assets/images/Sign-In-Small---Default.png")}  />
                </LinkedIn>
                <p></p> */}
                
                <p><IntlMessages id="miuwi.user.loginlabel" /></p>
                {!code && false && <div>No code</div>}
                {code && <div>Code: {code}</div>}
                {errorMessage && <div>{errorMessage}</div>}

                {/* <img alt="Illustration" style={{ width: "200px", cursor: "pointer" }} src={require("assets/images/Sign-In-Small---Default.png")} onClick={() => this.linkedinLogin()} /> */}
            </div>
        )
    }
}
export default (LoginWithLinkedin)