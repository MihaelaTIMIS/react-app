import React from "react"
import { connect } from 'react-redux'
import { Layout, Form, Input } from "antd";
import ShareProject from "./Step4Components/ShareProject";
import  { MODE_EXPERT } from "../../ReadProject/ProjectInfos";
import WorkshopPrice from "./components/WorkshopPrice";
import { getUrlVars } from "../../../library/urlVar";
import { getProject } from '../../../appRedux/actions/projects'
import RealizeProjectHeader from "../../RealizeProject/RealizeProjectHeader";
const { Content } = Layout

class Step5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
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
        this.setState({ loading: false })
        if (this.mounted) {
            let slug = getUrlVars()['id'];
            if (slug)
                this.props.getProject(slug)
        }
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    saveEmailRef = emailRef => {
        this.emailRef = emailRef;
    };
    render() {
        let project = this.props.project
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="steps-content">
                <Layout>
                    <Content>
                        <Form>
                            {getFieldDecorator('slug', { initialValue: project && project.slug })(<Input type="hidden" ></Input>)}
                        </Form>
                        {/* <ProjectInfos mode={MODE_EXPERT} /> */}
                        <RealizeProjectHeader mode={MODE_EXPERT} whenEditProject={true} />
                        <br />
                        <WorkshopPrice wrappedComponentRef={this.saveFormRef} />
                        <br />
                        <ShareProject wrappedComponentRef={this.saveEmailRef} mode={MODE_EXPERT} />

                    </Content>
                </Layout>
            </div>
        )
    }
}
const WrappedForm = Form.create({ name: 'project-step5' })(Step5);
const mapStateToProps = (state) => {
    return {
        project: state.projects.project
    }
}
export default connect(mapStateToProps, { getProject })(WrappedForm)



