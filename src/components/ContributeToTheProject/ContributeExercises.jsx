import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import FormExercice from "./ContributeFormExercice";
import {
  getExercices,
  toggleExercices
} from "../../appRedux/actions/exercices";
import { getProject } from "../../appRedux/actions/projects";
import IntlMessages from "../../util/IntlMessages";
import { getUrlVars } from "../../library/urlVar";
let slug;
class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    /* = getUrlVars()["id"]; */

    slug = this.props.slug || getUrlVars()["id"];

    this.props.getProject(slug);
    if (this.props.user) this.props.getExercices(slug);
    this.setState({ loading: false });
  }

  showHideAllExercises = exercices => {
    this.props.toggleExercices(exercices, !this.state.message);
    this.setState({ message: !this.state.message });
  };

  render() {
    let exercices = this.props.exercices;
    if (exercices && exercices.length > 0)
      return (
        <>
          <Row>
            <Col span={18}>
              <h3>
                <IntlMessages id="miuwi.project.title.exercises" />{" "}
              </h3>
            </Col>
            <Col span={6}>
              {exercices && exercices.length > 1 && this.state.message ? (
                <Button
                  style={{ float: "right" }}
                  onClick={() => this.showHideAllExercises(exercices)}
                >
                  <IntlMessages id="miuwi.project.exercises.hideAllExosBtn" />
                  &nbsp;{exercices.length}&nbsp;
                  <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                </Button>
              ) : (
                <Button
                  style={{ float: "right" }}
                  onClick={() => this.showHideAllExercises(exercices)}
                >
                  <IntlMessages id="miuwi.project.exercises.seeAllExos1Btn" />
                  &nbsp;{exercices.length}&nbsp;
                  <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {exercices &&
                exercices.map((exercice, index) => (
                  <div key={index}>
                    <FormExercice
                      index={index}
                      order={index + 1}
                      readonly={this.props.readonly}
                      exercice={exercice}
                      exercices={this.props.exercices}
                      threads={this.props.threads}
                    />
                  </div>
                ))}
            </Col>
          </Row>
        </>
      );
    else return null;
  }
}

const mapStateToProps = state => {
  return {
    state,
    exercices: state.exercices.exercices,
    project: state.projects.project,
    threads: state.threads.threads,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { getProject, getExercices, toggleExercices }
)(Step3);
