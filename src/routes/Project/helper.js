import React from "react";
import { connect } from "react-redux"
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar"
import { getProjectHelper } from './../../appRedux/actions/projects'
import { getUser } from "../../appRedux/actions/users";
import HelperViewProject from "../../components/HelpToProject/HelperViewProject";
import { Spin, Card, Row, Col } from "antd";


class HelpProject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        const slug = getUrlVars()['id'];
        this.setState({loading: true})
        this.props.getUser()
            .then(() => {
                this.props.getProjectHelper(slug).then(() => {
                    this.setState({loading: false})
                })
            })
    }

    render() {
        return (
            <div>
                <h1 className="title gx-mb-4" style={{ textAlign: "center" }}>
                    {<IntlMessages id="miuwi.sidebar.contributeProject" />}
                </h1>
                {this.state.loading && <Card className="gx-card"><Row><Col span={24} style={{textAlign:"center"}}><Spin size="large" /></Col></Row></Card>}
                {!this.state.loading && <HelperViewProject />}
            </div>
        );
    }

};
const mapStateToProps = (state) => {
    return {
        project_helper: state.projects.project_helper,
        user: state.user.user
    }
};
export default connect(mapStateToProps, { getUser, getProjectHelper })(HelpProject);
