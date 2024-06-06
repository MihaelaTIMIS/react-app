import React from 'react'
import { connect } from "react-redux";
import { getUrlVars } from '../../library/urlVar'
import IntlMessages from "util/IntlMessages";
import { Button } from 'antd';
import { getProjectStudent } from "../../appRedux/actions/projects";
import { history } from "./../../appRedux/store";
let slug

class ConfirmationPayment extends React.Component {

    componentDidMount() {
        slug = getUrlVars()['slug']
        if(slug)
        this.props.getProjectStudent(slug)
    }
    ok = () => {
        let project_student = this.props.project_student
        history.push('/project/student/?id=' + project_student.slug)
    }

    render() {
        return (
            <div style={{ position: "center", textAlign:"center" }} >
                <p><IntlMessages id="notification.successfullPayment" />.</p>
                <p><IntlMessages id="miuwi.project.student.start2" /></p>
                <p><IntlMessages id="miuwi.project.student.start3" /></p>
                <Button type="primary" onClick={this.ok} ><IntlMessages id="miuwi.project.student.start"/></Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        project_student: state.projects.project_student
    }
}
export default connect(mapStateToProps, { getProjectStudent })(ConfirmationPayment)
