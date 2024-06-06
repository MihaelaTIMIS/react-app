import React from "react";
import UploadPicture from "../../../routes/components/Upload/UploadPicture";
import UploadVideo from "../../../routes/components/Upload/UploadVideo"
import IntlMessages from "../../../util/IntlMessages";
import { Layout, Row, Col } from "antd";
import { connect } from "react-redux"
import { getProjects, getProject } from "../../../appRedux/actions/projects";
import { MODE_EXPERT } from "../../ReadProject/ProjectInfos";
import { MEDIA_TYPE_PROJECT } from "../../../appRedux/actions/media";
import { getProjectThreads } from "../../../appRedux/actions/threadsAction";
import { VIDEO_TYPE_PROJECT } from "../../../appRedux/actions/videos";
import RealizeProjectHeader from "../../RealizeProject/RealizeProjectHeader";
const { Content } = Layout
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false

          };
    }
    componentWillMount() {
        this.setState({
            loading: true
        })
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    componentDidMount() {
        this.mounted = true
        this.setState({
            loading: false
        })
        if (this.mounted && this.props.project) {
            this.props.getProject(this.props.project.slug)
            this.props.getProjects()
             }
    }
  
    render() {
         return (
            <div className="steps-content">
                <Layout>
                    <Content>
                        <p className="justify-content-left">
                            <IntlMessages id="miuwi.project.edit.firstParagraph" />
                        </p>
                      {/*   <ProjectInfos allowUploadPicture1={true} mode={MODE_EXPERT} /> */}
                        <RealizeProjectHeader allowUploadPicture1={true} mode={MODE_EXPERT} whenEditProject={true} />
                        <Row className="divContent">
                            <Col>
                                <h3 className="text-info"><IntlMessages id="miuwi.attachmentsLabel" /></h3>
                                <p><IntlMessages id="miuwi.project.edit.attachmens.description" />
                                </p>
                                <Row className="btnCentered">
                                    <Col span={8} >
                                        <p><IntlMessages id="miuwi.file.format" />JPG, PNG, PDF / <IntlMessages id="miuwi.file.size" />&lsaquo;= 10Mo</p>
                                    </Col>
                                    <Col span={16}>
                                        <UploadPicture
                                            type={MEDIA_TYPE_PROJECT}
                                            indexMedia="2"
                                            projectId={this.props.project && this.props.project.id}
                                            projectSlug={this.props.project && this.props.project.slug}
                                            media={this.props.project && this.props.project.media2}
                                            labelBtn={<IntlMessages id="miuwi.form.addFile" />}
                                        />
                                        <UploadPicture
                                            type={MEDIA_TYPE_PROJECT}
                                            indexMedia="3"
                                            projectId={this.props.project && this.props.project.id}
                                            projectSlug={this.props.project && this.props.project.slug}
                                            media={this.props.project && this.props.project.media3}
                                            labelBtn={<IntlMessages id="miuwi.form.addFile" />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="divContent">
                            <Col>
                                <h3 className="text-info"><IntlMessages id="miuwi.videoLabel" /></h3>
                                <p><IntlMessages id="miuwi.project.edit.video.description" /><br />
                                    <IntlMessages id="miuwi.video.duration" />
                                </p>
                                <UploadVideo upload={true} project={this.props.project} video={this.props.project && this.props.project.video1} type={VIDEO_TYPE_PROJECT}/>
                            </Col>
                        </Row>
                        <p className="justify-content-left"><IntlMessages id="miuwi.project.edit-exercise.nextText" /></p>
    
                    </Content>
                </Layout >
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        projects: state.projects.projects,
        project: state.projects.project,
        threads: state.threads.threads,
    }
}

export default connect(mapStateToProps, { getProjects, getProject, getProjectThreads })(Step2);
