
import React from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { Row, Col, Button, Form, Card, Modal, Icon } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import IntlMessages from "../../util/IntlMessages";
import UploadVideo from "../../routes/components/Upload/UploadVideo";
import FormItem from "antd/lib/form/FormItem";
import { editExerciseError } from "../../library/editExerciseError";
import {
  editExercice,
  extendExercice,
  addExerciseAnswer,
  getExerciseAnswer
} from "../../appRedux/actions/exercices";
import { getProjectStudent } from "../../appRedux/actions/projects";
import {
  VIDEO_TYPE_EXERCICE,
  VIDEO_TYPE_ANSWER
} from "../../appRedux/actions/videos";
import UploadPicture from "../../routes/components/Upload/UploadPicture";
import { MEDIA_TYPE_ANSWER } from "../../appRedux/actions/media";
import Thumb from "../Media/Thumb";

class FormExercice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercice: this.props.exercice,
      media: null,
      video: null,
      thread: {
        title: <IntlMessages id="miuwi.project.title.exercise" />,
        visible: false,
        exerciseTitle: "",
        type: "",
        label: ""
      },
      showEditError: false,
      exerciseBeingEdited: null
    };
    this.change = this.change.bind(this);
  }

  onExtendExercise = (exercices, exercice) => {
    this.props.extendExercice(exercices, exercice, true);
    this.props.getExerciseAnswer(exercice.id, this.props.project_student);
  };
  editAnswer = (exercices, exercice, edit, e) => {
    this.props.getExerciseAnswer(exercice.id, this.props.project_student);
    let isBeingEdited = editExerciseError(exercices);
    if (!isBeingEdited) {
      this.props.editExercice(exercices, exercice, edit);
    } else {
      // e.preventDefault()
      this.setState({
        showEditError: true,
        exerciseBeingEdited: isBeingEdited
      });
    }
  };
  hideExercise = (exercices, exercice) => {
    this.props.extendExercice(exercices, exercice, false);
  };
  showThreads = (type, exerciseTitle, label) => {
    this.setState({
      thread: {
        visible: true,
        exerciseTitle: exerciseTitle,
        type: type,
        label: label
      }
    });
  };

  hideThreads = e => {
    this.setState({
      thread: { visible: false, type: "", exerciseTitle: "", label: "" }
    });
  };

  saveExercise = (exercises, exercise, project_student, e) => {
    e.preventDefault();
    this.props.form
      .validateFields((err, values) => {
        if (!err) {
          this.props
            .getExerciseAnswer(exercise.id, project_student)
            .then(() => {
              this.props
                .addExerciseAnswer(
                  exercise.slug,
                  project_student.slug,
                  values.answer,
                  this.props.student_answer
                )
                .then(() => {
                  this.props.getProjectStudent(
                    project_student && project_student.slug
                  );
                });
            });
        }
      })
      .catch(() => { });
  };

  change = event => {
    this.setState({
      [event.target.name]: event.target.value,

      exercice: {
        ...this.props.exercice,
        students_answers: {
          answer: event.target.value
        }
      }
    });
  };
  render() {
    let project_student = this.props.project_student;
    let project = project_student && project_student.project;
    let exercises = project && project.exercices;
    let threads = this.props.threads;
    let exercice = this.props.exercice;
    const { getFieldDecorator } = this.props.form;
    let answer;
    let media, video;

    let answers = exercice && exercice.students_answers;
    if (answers)
      for (var i = 0; i <= answers.length; i++) {
        if (answers[i] && answers[i].id_project === project_student.id) {
          answer = exercice.students_answers[i];
          media = exercice.students_answers[i].media;
          video = exercice.students_answers[i].video;
        }
      }

    return (
      <div>
        {!exercice.extend && (
          <div style={{ borderBottom: "1px dashed #e9e9e9" }}>
            <Row className="gx-contact-item gx-dragndrop-item">
              <Col
                span={2}
                style={{ textAlign: "center" }}
              >
                {answer && answer.answer ? (
                  <Icon
                    type="check-circle"
                    style={{ fontSize: "20px" }}
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                ) : !project_student.finish_date ? (
                  <Icon
                    type="question-circle"
                    style={{ fontSize: "20px" }}
                    theme="twoTone"
                  />
                ) : (
                      <Icon
                        type="exclamation-circle"
                        style={{ fontSize: "20px" }}
                        theme="twoTone"
                        twoToneColor="red"
                      />
                    )}
              </Col>
              <Col xl={18} lg={18} md={18} sm={20} xs={20}>
                <p>
                  <IntlMessages id="miuwi.project.title.exercise" /> n°
                  {this.props.order} <br />
                  <strong style={{ fontWeight: "500" }}>{exercice.idea}</strong>
                </p>
              </Col>
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={24}
                xs={24}
                style={{ textAlign: "center" }}
              >
                <Button
                  onClick={() => this.onExtendExercise(exercises, exercice)}
                >
                  <IntlMessages id="miuwi.project.seeProject" />
                </Button>
              </Col>
            </Row>
          </div>
        )}

        {exercice.extend && (
          <div>
            <div
              style={{
                fontWeight: "100",
                backgroundColor: "#FB6116",
                color: "white",
                padding: "5px",
                textAlign: "center",
                borderTopLeftRadius: "9px",
                borderTopRightRadius: "9px"
              }}
            >
              <IntlMessages id="miuwi.project.title.exercise" /> n°
              {this.props.order}
              <br />
              <span style={{ fontWeight: "500" }}>{exercice.idea}</span>
            </div>
            <Card
              className="card"
              style={{
                borderColor: "#FB6116",
                borderTopLeftRadius: "initial",
                borderTopRightRadius: "initial"
              }}
            >
              <Form>
                {/* TITRE */}

                {/* <p>
                  <IntlMessages id="miuwi.titleLabel" /> :{" "}
                  <span style={{ fontWeight: "100" }}>{exercice.idea}</span>
                </p> */}
                {/* VIDEO, IMAGE */}
                <Row type="flex" justify="space-around" span={24}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    {exercice.video1 && (
                      <UploadVideo
                        upload={false}
                        exercice={exercice}
                        project_student={project_student}
                        video={exercice.video1}
                        type={VIDEO_TYPE_EXERCICE}
                        width="100%"
                      />
                    )}
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    {exercice.media && <Thumb media={exercice.media} />}
                  </Col>
                </Row>

                {/* PRÉSENTATION */}
                <p style={{ lineHeight: "normal", whiteSpace: "pre-line" }}>
                  {/*  <Row style={{ lineHeight: "normal" }}> */}
                  <IntlMessages id="miuwi.project.title.presentation" /> :{" "}
                  <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="blank" href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}>
                    <span style={{ fontWeight: "100" }}>{exercice.detail}</span>
                  </Linkify>
                  {/*  </Row> */}
                </p>

                {/* EXEMPLE */}
                <p style={{ lineHeight: "normal", whiteSpace: "pre-line" }}>
                  <IntlMessages id="miuwi.examplesLabel" /> :{" "}
                  <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="blank" href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}>
                    <span style={{ fontWeight: "100" }}>{exercice.example}</span>
                  </Linkify>
                </p>

                {/* ANSWER BUTTON */}
                {!project_student.finish_date && !exercice.edit && (
                  <Button
                    type="primary"
                    onClick={e => this.editAnswer(exercises, exercice, true, e)}
                  >
                    <IntlMessages id="miuwi.project.exercises.answer.edit.button" />
                  </Button>
                )}

                {/* ANSWER */}
                <FormItem>
                  {project_student && ( //!project_student.finish_date ? (
                    <Row span={24} style={{ marginLeft: "0.5px" }}>
                      <Col lg={16} md={24} style={{ lineHeight: "normal" }}>
                        {project_student.finish_date && (
                          <>
                            <IntlMessages id="miuwi.project.student.answerLabel" />
                            <div
                              style={{
                                width: "100%",
                                lineHeight: "1.1em",
                                fontWeight: "100",
                                padding: "10px 10px",
                                marginBottom: "15px",
                                whiteSpace: "pre-line"
                              }}
                              className="ant-tag-geekblue"
                            >
                              {answer ? (
                                answer.answer
                              ) : (
                                  <IntlMessages id="miuwi.project.student.noanswer" />
                                )}
                            </div>
                            <Button
                              onClick={e =>
                                this.hideExercise(exercises, exercice, e)
                              }
                            >
                              <IntlMessages id="miuwi.project.exercises.extendsButton" />
                            </Button>
                            {answer ? (
                              <Icon
                                type="check-circle"
                                style={{ fontSize: "20px" }}
                                theme="twoTone"
                                twoToneColor="#52c41a"
                              />
                            ) : (
                                <Icon
                                  type="exclamation-circle"
                                  style={{ fontSize: "20px" }}
                                  theme="twoTone"
                                  twoToneColor="red"
                                />
                              )}
                          </>
                        )}

                        {!project_student.finish_date &&
                          getFieldDecorator("answer", {
                            initialValue: answer && answer.answer,
                            rules: [
                              {
                                required: true,
                                message: (
                                  <IntlMessages id="miuwi.errorInput.title" />
                                )
                              }
                            ]
                          })(
                            <TextArea
                              cols={100}
                              rows={10}
                              disabled={!exercice.edit}
                              name="answer"
                              id={exercice.id}
                              onChange={e => this.change(e)}
                            ></TextArea>
                          )}

                        {exercice.edit && (
                          <Button
                            htmlType="submit"
                            type="primary"
                            onClick={e =>
                              this.saveExercise(
                                exercises,
                                exercice,
                                project_student,
                                e
                              )
                            }
                          >
                            <IntlMessages id="miuwi.project.exercises.answer.save.button" />
                          </Button>
                        )}
                      </Col>

                      <Col lg={8} md={24} style={{ lineHeight: "normal" }}>
                        {exercice.edit && (
                          <>
                            <Row span={24} type="flex" justify="center">
                              <UploadPicture
                                type={MEDIA_TYPE_ANSWER}
                                project={project_student}
                                exercice={exercice}
                                answer={this.props.student_answer}
                                media={media}
                                labelBtn={
                                  <IntlMessages id="miuwi.form.addFile" />
                                }
                              />
                            </Row>
                            <Row type="flex" justify="center">
                              <span style={{ fontWeight: "100" }}>
                                {" "}
                                Format : JPG, PNG, PDF /{" "}
                                <IntlMessages id="miuwi.file.size" /> &lt; 10 Mo
                              </span>
                            </Row>
                            <Row
                              span={24}
                              type="flex"
                              justify="center"
                              style={{ marginTop: "10px" }}
                            >
                              <UploadVideo
                                upload={true}
                                type={VIDEO_TYPE_ANSWER}
                                project={project}
                                project_student={project_student}
                                exercice={exercice}
                                answer={this.props.student_answer}
                                video={video}
                                width="80%"
                              />
                            </Row>
                            <Row style={{ textAlign: "center" }}>
                              <IntlMessages id="miuwi.project.edit.video.description" />
                              <span style={{ fontWeight: "100" }}>
                                {" "}
                                <IntlMessages id="miuwi.video.duration" />
                              </span>
                            </Row>
                          </>
                        )}
                        {!exercice.edit && (
                          <>
                            <Row
                              type="flex"
                              justify="center"
                              style={{ lineHeight: "normal" }}
                            >
                              {media && <Thumb media={media} />}
                            </Row>

                            <Row type="flex"
                              justify="center"
                              style={{
                                marginTop: "10px",
                                lineHeight: "normal"
                              }}
                            >
                              {video && (
                                <UploadVideo
                                  upload={false}
                                  type={VIDEO_TYPE_ANSWER}
                                  project={project}
                                  exercice={exercice}
                                  answer={this.props.student_answer}
                                  video={video}
                                />
                              )}
                            </Row>
                          </>
                        )}
                      </Col>
                    </Row>
                  )}
                </FormItem>

                {/* conversations when helper */}
                <Row style={{ float: "right" }}>
                  {project_student &&
                    project_student.projectsHelper &&
                    project_student.projectsHelper.length !== 0 && (
                      <Button
                        style={{
                          color: "#F04E14",
                          border: "none",
                          boxShadow: "none",
                          maxWidth: "90%"
                        }}
                        onClick={() =>
                          this.showThreads(
                            "EXERCICE_STUDENT",
                            this.state.exercice.idea,
                            <IntlMessages id="miuwi.project.title.exercise" />
                          )
                        }
                      >
                        <IntlMessages id="miuwi.thread.link" />
                      </Button>
                    )}
                </Row>
              </Form>
            </Card>

            {/* modal conversations */}
            <Modal
              title={
                <p>
                  <IntlMessages id="miuwi.thread.label" />{" "}
                  {this.state.thread.label} {`No ° : ${this.props.order}`}
                </p>
              }
              visible={this.state.thread.visible}
              onCancel={() => this.hideThreads()}
              footer={[null, null]}
              width="60%"
            >
              {exercice && exercice.id && (
                <div>
                  <p>
                    <IntlMessages id="miuwi.titleLabel" />:{" "}
                    <span style={{ fontWeight: "100" }}>{exercice.idea}</span>
                  </p>
                  <p>
                    <IntlMessages id="miuwi.project.title.presentation" />:{" "}
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="blank" href={decoratedHref} key={key}>
                    {decoratedText}
                  </a>
                )}>
                    <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                      {exercice.detail}
                    </span>
                    </Linkify>
                  </p>
                  <p>
                    <IntlMessages id="miuwi.examplesLabel" />:{" "}
                    <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                      <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                        {exercice.example}
                      </Linkify>
                    </span>
                  </p>
                  <p>
                    <IntlMessages id="miuwi.project.student.exerciseAnswer" />:{" "}
                    <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                      {answer && answer.answer}
                    </span>
                  </p>
                  <ConversationThreading
                    type={this.state.thread.type}
                    threads={threads}
                    exercice={exercice}
                    student={project_student}
                  />
                </div>
              )}
            </Modal>

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
                </Button>
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
          </div>
        )}
      </div>
    );
  }
}
const StudentFormExercise = Form.create({ name: "student-form-exercise" })(
  FormExercice
);

const mapStateToProps = state => {
  return {
    state,
    project: state.projects.project,
    threads: state.threads.threads,
    student_answer: state.exercices.answer,
    project_student: state.projects.project_student
  };
};

export default connect(
  mapStateToProps,
  {
    editExercice,
    extendExercice,
    addExerciseAnswer,
    getExerciseAnswer,
    getProjectStudent
  }
)(StudentFormExercise);
