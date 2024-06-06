import React from "react";
import { connect } from "react-redux"
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar"
import RealizeProject from "./../../components/RealizeProject/RealizeProject";
import { getProjectStudent, getProject, studentStartsProject } from './../../appRedux/actions/projects'
import { getUser } from "../../appRedux/actions/users";
import { Spin } from "antd";

class StudentRealizeProject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            slug: ""
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    componentDidMount() {
        this.mounted=true
        if(this.mounted){

            this.setState({loading: false, slug: getUrlVars()['id']})
            this.props.getUser().then(() => {
                this.props.getProjectStudent(this.state.slug).then(() => {
                    this.setState({loading: false})
                })
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.loading && <div style={{textAlign:"center"}}><Spin size="large" /></div>}
                {!this.state.loading &&
                    <div>
                        <h1 className="title gx-mb-4" style={{ textAlign: "center" }}>
                            {<IntlMessages id="miuwi.sidebar.realizeProject" />}
                        </h1>
                        <RealizeProject project_student={this.props.project_student} />
                    </div>
                }
            </div>
        );
    }

};
const mapStateToProps = (state) => {

    return {
        project: state.projects.project,
        project_student: state.projects.project_student,
        student_payed_project: state.projects.student_payed_project
    }
};
export default connect(mapStateToProps, {
    getUser,
    getProjectStudent,
    getProject,
    studentStartsProject
})(StudentRealizeProject);
