import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar"
import { Col, Button, Row } from "antd";
import { getProject } from "../../appRedux/actions/projects";
import { MODE_ASSOCIATE } from "../../components/ReadProject/ProjectInfos";
import ProjectsUserAssociation from "../components/ProjectsUserAssociation";
import  RealizeProjectheader from "../../components/RealizeProject/RealizeProjectHeader";
let slug;
class ProjectAssociate extends React.Component {

    componentDidMount() {
        let slug = getUrlVars()["id"];
        
        if (!slug || slug === undefined) {
            if (
                this.props.aws_project &&
                this.props.aws_project.slug 
            ) {
                slug = this.props.aws_project.slug 
            }
        }
        
        this.props.getProject(slug);
        
    }
    
    render() {
        slug = getUrlVars()['id']
        return (
            <div >
                <Row className="gx-product-item" style={{ padding: '2%', margin: '1px' }}>
                   {/*  <ProjectInfos slug={slug} mode={MODE_ASSOCIATE}/> */}
                    <RealizeProjectheader slug={slug} mode={MODE_ASSOCIATE} />
                </Row>
                <br />
                <Row type="flex" justify="space-between" >
                    <Col>
                        <h1 >
                            {slug && <IntlMessages id="miuwi.project.diffusion.joinTitle" />}
                        </h1>
                    </Col>
                    <Col >
                        <Link to='/user?view=owner' style={{ float: 'right' }}>
                            <Button>
                                <IntlMessages id="miuwi.user.backToDashboard" />
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <ProjectsUserAssociation />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        project: state.projects.project
    }
}

export default connect(mapStateToProps, { getProject })(ProjectAssociate)
