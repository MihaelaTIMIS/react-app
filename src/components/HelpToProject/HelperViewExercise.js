import "./index.css";

import React from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { Row, Col, Button, Form, Card, Modal, Icon } from "antd";
import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import IntlMessages from "../../util/IntlMessages";
import Thumb from "../Media/Thumb";
import UploadVideo from "../../routes/components/Upload/UploadVideo";
import {
  extendExercice,
} from "../../appRedux/actions/exercices";
import { getProjectThreads } from "../../appRedux/actions/threadsAction";
import {
  VIDEO_TYPE_EXERCICE,
  VIDEO_TYPE_ANSWER
} from "../../appRedux/actions/videos";
import { getProjectSpecifiedStudent } from "../../appRedux/actions/projects";

class FormExercice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercice: this.props.exercice,
      thread: {
        title: <IntlMessages id="miuwi.project.title.exercise" />,
        visible: false,
        exerciseTitle: "",
        type: "",
        label: ""
      }
    };
  }

  onExtendExercise = (exercices, exercice, helper) => {
    this.props.extendExercice(exercices, exercice, true);
  };

  hideExercise = (exercices, exercice) => {
    this.props.extendExercice(exercices, exercice, false);
  };

  showThreads = (type, exerciseTitle, label, helper) => {
    if (helper) {
      let slug = helper.slug_project_student;
      let student = helper.student;
      this.props.getProjectSpecifiedStudent(slug, student.id).then(() => {
        this.props.getProjectThreads(slug, type).then(() => {
          this.setState({
            thread: {
              visible: true,
              exerciseTitle: exerciseTitle,
              type: type,
              label: label
            }
          });
        });
      });
    }
  };

  hideThreads = e => {
    this.setState({
      thread: { visible: false, type: "", exerciseTitle: "", label: "" }
    });
  };

  render() {
    let threads = this.props.threads;
    let exercice = this.props.exercice;
    let helper = this.props.helper;
    let project = helper && helper.project;
    let exercices = helper && helper.project.exercices;
    let student = this.props.project_student;
    let student_answer;
    let answers = exercice && exercice.students_answers;
    if (answers)
      for (var i = 0; i <= answers.length; i++) {
        if (answers[i] && answers[i].id_exercise === exercice.id) {
          if (
            helper &&
            helper.student &&
            answers[i].id_student === helper.student.id
          )
            student_answer = exercice.students_answers[i];
        }
      }

    return (
      <div>
        {!exercice.extend && (
          <Row className="gx-contact-item gx-dragndrop-item">
            <Col span={2}>
              {student_answer && (
                <Icon

                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              )}
            </Col>

            <Col xl={18} lg={18} md={18} sm={20} xs={20}>
              <p>
                <IntlMessages id="miuwi.project.title.exercise" /> n°
                {this.props.order} :{" "}
                <strong style={{ fontWeight: "500" }}>{exercice.idea}</strong>
              </p>
            </Col>
            <Col xl={4} lg={4} md={4} sm={24} xs={24} style={{ textAlign: "center" }}>
              <Button
                onClick={() =>
                  this.onExtendExercise(exercices, exercice, helper && helper)
                }
              >
                <IntlMessages id="miuwi.project.seeProject" />
              </Button>
            </Col>
            <div style={{ clear: "both", width: "100%" }} />
            <hr style={{ width: "100%" }} />
          </Row>
        )}
        {exercice.extend && (
          <>
            <span>
              <IntlMessages id="miuwi.project.title.exercise" /> n°
              {this.props.order}
            </span>
            <Card className="card">
              {/* TITRE */}
              <Row>
                <IntlMessages id="miuwi.titleLabel" />
                :&nbsp;
                <span style={{ fontWeight: "100" }}>{exercice.idea}</span>
              </Row>

              {/* VIDEO, IMAGE */}
              <Row type="flex" justify="space-around" span={24}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  {exercice.video1 && (
                    <UploadVideo
                      upload={false}
                      exercice={exercice}
                      video={exercice.video1}
                      type={VIDEO_TYPE_EXERCICE}
                    />
                  )}
                </Col>

                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  {exercice.media && <Thumb media={exercice.media} />}
                </Col>
              </Row>

              {/* PRÉSENTATION */}
              <Row>
                <IntlMessages id="miuwi.project.title.presentation" />
                :&nbsp;
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="blank" href={decoratedHref} key={key}>
                    {decoratedText}
                  </a>
                )}>
                  <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                    {exercice.detail}
                  </span>
                </Linkify>
              </Row>

              {/* EXEMPLE */}
              <Row>
                <IntlMessages id="miuwi.examplesLabel" />
                :&nbsp;
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="blank" href={decoratedHref} key={key}>
                    {decoratedText}
                  </a>
                )}>
                  <span
                    style={{
                      fontWeight: "100",
                      overflow: "ellipsis",
                      whiteSpace: "pre-line"
                    }}
                  >
                    {exercice.example}
                  </span>
                </Linkify>
              </Row>

              {/* ANSWER  */}
              <Row span={24}>
                <Col lg={16} md={16} sm={24}>
                  {helper && (
                    <div>
                      <IntlMessages id="miuwi.project.helper.answerLabel" />:
                      <br />
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
                        {student_answer && student_answer.answer}
                      </div>
                    </div>
                  )}
                </Col>

                <Col lg={8} md={8} sm={24}>
                  {student_answer && student_answer.media && (
                    <Row style={{ marginBottom: "20px" }}>
                      <Thumb media={student_answer.media} />
                    </Row>
                  )}

                  {student_answer && student_answer.video && (
                    <Row>
                      <UploadVideo
                        upload={false}
                        type={VIDEO_TYPE_ANSWER}
                        project={project}
                        exercice={exercice}
                        answer={student_answer}
                        video={student_answer.video}
                      />
                    </Row>
                  )}
                </Col>
              </Row>

              <Row type="flex" justify="end">
                {/* Bouton conversations */}
                <Button
                  type="primary"
                  onClick={() =>
                    this.showThreads(
                      "EXERCICE_STUDENT",
                      this.state.exercice.idea,
                      <IntlMessages id="miuwi.project.title.exercise" />,
                      helper
                    )
                  }
                >
                  <IntlMessages id="miuwi.thread.helper" />
                </Button>

                <Button
                  htmlType="submit"
                  onClick={e => this.hideExercise(exercices, exercice, e)}
                >
                  <IntlMessages id="miuwi.project.exercises.extendsButton" />
                </Button>
              </Row>

              {/* conversations */}
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
                        <span
                          style={{ fontWeight: "100", whiteSpace: "pre-line" }}
                        >
                          {exercice.detail}
                        </span>
                      </Linkify>
                    </p>
                    <p>
                      <IntlMessages id="miuwi.examplesLabel" />:{" "}
                      <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                        <span
                          style={{ fontWeight: "100", whiteSpace: "pre-line" }}
                        >
                          {exercice.example}
                        </span>
                      </Linkify>
                    </p>
                    <p>
                      <IntlMessages id="miuwi.project.student.exerciseAnswer" />
                      :{" "}
                      <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                        {student_answer && student_answer.answer}
                      </span>
                    </p>
                    <ConversationThreading
                      type={this.state.thread.type}
                      threads={threads}
                      exercice={exercice}
                      helper={helper}
                      student={student}
                    />
                  </div>
                )}
              </Modal>
            </Card>
          </>
        )}
      </div>
    );
  }
}
const HelperViewExercise = Form.create()(FormExercice);

const mapStateToProps = state => {
  return {
    state,
    threads: state.threads.threads,
    student_answer: state.exercices.answer,
    project_student: state.projects.project_student
  };
};

export default connect(mapStateToProps, {
  extendExercice,
  getProjectThreads,
  getProjectSpecifiedStudent
})(HelperViewExercise);
