import React from "react";
import { connect } from "react-redux";

import { Layout, Row, Col, Button, Alert, Modal, Spin, Icon } from "antd";

import IntlMessages from "../../../util/IntlMessages";
import FormExercice from "./components/FormExercice";
import {
  addExercice,
  getExercices,
  toggleExercices,
  dragDropExercices,
} from "../../../appRedux/actions/exercices";
import { getProject } from "../../../appRedux/actions/projects";
import { MODE_EXPERT } from "../../ReadProject/ProjectInfos";
import { editExerciseError } from "../../../library/editExerciseError";
import RealizeProjectHeader from "../../RealizeProject/RealizeProjectHeader";
const { Content } = Layout;

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      exMaxError: null,
      showEditError: false,
      exerciseBeingEdited: null,
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.props.getProject(this.props.project.slug).then(() => {
        this.props.getExercices(this.props.project.slug).then(() => {
          this.setState({
            loading: false,
          });
        });
      });
    }
  }

  showHideAllExercises = (exercices) => {
    let edit = editExerciseError(exercices);
    if (!edit) {
      this.props.toggleExercices(exercices, !this.state.message);
      this.setState({ message: !this.state.message });
    } else {
      this.setState({
        showEditError: true,
        exerciseBeingEdited: edit,
      });
    }
  };

  onAddExercice = () => {
    let edit = editExerciseError(this.props.exercices);
    if (!edit) {
      let exercices = this.props.exercices;
      if (exercices && exercices.length <= 20)
        this.props.addExercice(this.props.exercices, {
          id: null,
          idea: "",
          detail: "",
          example: "",
          order: this.props.exercices.length + 1,
          extend: true,
          edit: true,
        });
      else
        this.setState({
          exMaxError: (
            <Alert
              message="Vous avez déjà enregistré 20 exercices !"
              description="Voir la consigne tout en haut de la liste."
              type="error"
            />
          ),
        });
    } else {
      this.setState({
        showEditError: true,
        exerciseBeingEdited: edit,
      });
    }
  };

  render() {
    let exercices = this.props.exercices;
    if (this.state.loading)
      return (
        <div>
          <Spin />
        </div>
      );
    else
      return (
        <div className="steps-content">
          <Layout>
            <Content>
              <p>
                <IntlMessages id="miuwi.project.exercises.firstParagraph" />
              </p>
              {/*   <ProjectInfos mode={MODE_EXPERT} /> */}

              <RealizeProjectHeader mode={MODE_EXPERT} whenEditProject={true} />

              <div
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  fontSize: "15px",
                }}
              >
                <p style={{ whiteSpace: "pre-line" }}>
                  <IntlMessages id="miuwi.thread.expert.bubble" />
                  <br />
                </p>
                <Icon
                  type="message"
                  theme="twoTone"
                  twoToneColor="#EF7911"
                  style={{ fontSize: "35px", marginBottom: "15px" }}
                />
                <hr />
              </div>

              <p style={{ paddingTop: "25px" }}>
                <IntlMessages id="miuwi.project.edit.secondParagraph" />{" "}
              </p>

              {/* show/hide all exercises */}
              {exercices && exercices.length > 1 && (
                <>
                  {this.state.message ? (
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
                </>
              )}

              <br />
              <br />
              <br />

              <Row>
                <Col span={24}>
                  {exercices &&
                    exercices.map((exercice, index) => (
                      <div key={index}>
                        <FormExercice
                          index={index}
                          order={index + 1}
                          project={this.props.project}
                          exercice={exercice}
                          exercices={this.props.exercices}
                          threads={this.props.threads}
                        />
                      </div>
                    ))}
                </Col>
              </Row>

              {this.state.exMaxError}
              <div className="btnCentered">
                <Button onClick={() => this.onAddExercice()} type="primary">
                  <IntlMessages id="miuwi.project.exercises.addButton" />
                </Button>
              </div>

              {/* error when edit exercise */}
              <Modal
                // title
                visible={this.state.showEditError}
                onCancel={() => this.setState({ showEditError: false })}
                footer={[
                  null,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => this.setState({ showEditError: false })}
                  >
                    {" "}
                    OK
                  </Button>,
                ]}
              >
                {
                  <div>
                    <br />
                    <p>
                      {<IntlMessages id="miuwi.project.exercises.editError" />}
                    </p>
                    <p>
                      <IntlMessages id="miuwi.project.title.exercise" />{" "}
                      <IntlMessages id="miuwi.titleLabel" />:{" "}
                      {this.state.exerciseBeingEdited &&
                        this.state.exerciseBeingEdited.idea}
                    </p>
                  </div>
                }
              </Modal>
            </Content>
          </Layout>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    exercices: state.exercices.exercices,
    project: state.projects.project,
    threads: state.threads.threads,
  };
};

export default connect(mapStateToProps, {
  getProject,
  addExercice,
  getExercices,
  toggleExercices,
  dragDropExercices,
})(Step3);
