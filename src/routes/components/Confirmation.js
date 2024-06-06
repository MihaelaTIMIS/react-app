import React, { Component } from 'react'
import { activeUser } from '../../appRedux/actions/users'
import IntlMessages from "util/IntlMessages";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'antd';

class Confirmation extends Component {

    componentDidMount() {
        let urlActive = this.props.history.location.pathname
        let active = urlActive.substr(14)
        this.props.activeUser(active)
    }

    render() {
        return (
            <div>
                <p style={{textAlign:"center"}}>
                    <IntlMessages id="miuwi.signup.activate" />
                </p>
                <p style={{textAlign:"center"}}>
                    <Link to="/login"><Button type="primary" size={"large"}><IntlMessages id="miuwi.signup.iconnect" /></Button></Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userActive: state.user.userActive
    }

};

export default connect(mapStateToProps, { activeUser })(Confirmation)


