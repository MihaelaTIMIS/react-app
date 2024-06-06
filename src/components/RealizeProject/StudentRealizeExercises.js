import "./index.css";
import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Spin } from "antd";
import { getUrlVars } from "../../library/urlVar";
import FormExercice from "./StudentFormExercise";
import { toggleExercices } from "../../appRedux/actions/exercices";
import { getUser } from "../../appRedux/actions/users";
import { getProjectStudent } from "../../appRedux/actions/projects";
import IntlMessages from "../../util/IntlMessages";

class StudentRealizeExercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.setState({ loading: false });
      let slug = getUrlVars()["id"];
      this.setState({ loading: true });
      this.props.getUser().then(() => {
        this.props.getProjectStudent(slug).then(() => {
          this.setState({ loading: false });
        });
      });
    }
  }

  showHideAllExercises = exercices => {
    this.props.toggleExercices(exercices, !this.state.message);
    this.setState({ message: !this.state.message });
  };

  saveExerciseRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    let project_student = this.props.project_student;
    let project = project_student && project_student.project;
    let exercices = project && project.exercices;
    return (
      <>
        {exercices && exercices.length > 0 && (
          <div
            className="steps-content"
            style={{ padding: "0", border: "initial" }}
          >
         
              <h1>
                <IntlMessages id="miuwi.project.title.exercises" />
              </h1>
              {/* bouton ouvrir/replier tous les exercices */}
              {exercices && exercices.length > 1 && this.state.message ? (
                <Button
                  style={{ float: "right" }}
                  onClick={() => this.showHideAllExercises(exercices)}
                >
                  <IntlMessages id="miuwi.project.exercises.hideAllExosBtn" />
                  &nbsp;
                  {exercices.length}&nbsp;
                  <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                </Button>
              ) : (
                <Button
                  style={{ float: "right" }}
                  onClick={() => this.showHideAllExercises(exercices)}
                >
                  <IntlMessages id="miuwi.project.exercises.seeAllExos1Btn" />
                  &nbsp;
                  {exercices.length}&nbsp;
                  <IntlMessages id="miuwi.project.exercises.seeAllExos2Btn" />
                </Button>
              )}
              <br /> <br />
              <br />
              {this.state.loading && <Spin size="large" />}
              {!this.state.loading && (
                <Row span={24}>
                  <Col span={24}>
                    {exercices &&
                      exercices.map((exercice, index) => (
                        <div key={index}>
                          {
                            <>
                              <FormExercice
                                wrappedComponentRef={this.saveExerciseRef}
                                index={exercice && exercice.order}
                                order={exercice && exercice.order}
                                exercice={exercice}
                                exercices={this.props.exercices}
                                //threads={this.props.threads}
                              />
                            </>
                          }
                        </div>
                      ))}
                  </Col>
                </Row>
              )}
           
          </div>
        )}
      </>
    );
  }
}

const WrappedForm = Form.create({ name: "student-realize-exercises" })(
  StudentRealizeExercises
);

const mapStateToProps = state => {
  return {
    state,
    project_student: state.projects.project_student,
    threads: state.threads.threads,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    getUser,
    getProjectStudent,
    toggleExercices
  }
)(WrappedForm);
