import React from "react"
import { connect } from 'react-redux'

import { getProjects, getProjectsOwner, getProject } from '../../../../appRedux/actions/projects'
import IntlMessages from "../../../../util/IntlMessages";
import ProjectsUserAssociation from "../../../../routes/components/ProjectsUserAssociation";
import { getUrlVars } from "../../../../library/urlVar";

class JoinProject extends React.Component {
    componentDidMount() {
        this.props.getProject(getUrlVars()['id'])
    }
    render() {
        return (
            <div>
                {this.props.projects && this.props.projects.length > 1 &&
                    <>
                        <h3><IntlMessages id="miuwi.project.diffusion.joinTitle" /></h3>
                        <p><IntlMessages id="miuwi.project.diffusion.joinText" /></p>
                        <ProjectsUserAssociation project={this.props.project} />
                    </>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        projects: state.projects.projects,
        project: state.projects.project
    }
}

export default connect(mapStateToProps, { getProjects, getProjectsOwner, getProject })(JoinProject)