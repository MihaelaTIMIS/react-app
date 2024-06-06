import React from "react";
import { connect } from "react-redux";

import { Layout, Row, Col, Button, Spin } from "antd";

import { getUrlVars } from '../../library/urlVar'
import {
    toggleExercices,
} from '../../appRedux/actions/exercices'
import { getUser } from "../../appRedux/actions/users";
import { getProjectHelper } from "../../appRedux/actions/projects"
import IntlMessages from "../../util/IntlMessages";
import HelperViewExercise from "../HelpToProject/HelperViewExercise";

const { Content } = Layout;

class HelperViewAllExercises extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: false,
            loading: false
        }
    }

    componentDidMount() {
        let slug = getUrlVars()['id']
        this.setState({ loading: true })
        this.props.getUser().then(() => {
            this.props.getProjectHelper(slug).then(() => {
                this.setState({ loading: false })
            })
        }
        )
    }

    showHideAllExercises = (exercices) => {
        this.props.toggleExercices(exercices, !this.state.message)
        this.setState({ message: !this.state.message })
    }

    render() {
        let helper = this.props.project_helper
        let project = helper && helper.project
        let exercices = project && project.exercices
        return (
            <>
                {exercices && exercices.length > 0 &&
                    <div className="steps-content">
                        <Layout>
                            <Content>
                                <h1><IntlMessages id="miuwi.project.title.exercises" /> </h1>

                                {/* bouton ouvrir/replier tous les exercices */}
                                {(exercices && exercices.length > 1)
                                    && this.state.message ?
                                    <Button
                                        style={{ float: "right" }}
                                        onClick={() => this.showHideAllExercises(exercices)}>
                                        <IntlMessages id="miuwi.project.exercises.hideAllExosBtn" />
                                        &nbsp;
                                        {exercices.length}&nbsp;
                                        <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                                    </Button>
                                    : <Button style={{ float: "right" }}
                                        onClick={() => this.showHideAllExercises(exercices)}>
                                        <IntlMessages id="miuwi.project.exercises.seeAllExos1Btn" />
                                        &nbsp;
                                        {exercices.length}&nbsp;
                                        <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                                    </Button>
                                }

                                <br /> <br /><br />
                                {this.state.loading && <Spin size="large" />}

                                {!this.state.loading &&
                                    <Row span={24}>
                                        <Col span={24}>
                                            {exercices && exercices.map((exercice, index) => (
                                                <div key={index}>
                                                    {<>
                                                        <HelperViewExercise index={exercice && exercice.order} order={exercice && exercice.order}
                                                            exercice={exercice}
                                                            exercices={exercices}
                                                            helper={helper}
                                                        /></>
                                                    }
                                                </div>
                                            ))}
                                        </Col>
                                    </Row>
                                }
                            </Content>
                        </Layout>
                    </div >
                }
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        state,
        project_helper: state.projects.project_helper,
        user: state.user.user
    }
};

export default connect(mapStateToProps, {
    getUser,
    getProjectHelper,
    toggleExercices,
})(HelperViewAllExercises);