import React from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Card,
  Modal,
  Typography,
  Icon,
  Spin
} from "antd";
import { EXERCICE_AUTHOR } from "../../../../appRedux/actions/threadsAction";
import ConversationThreading from "../../../../components/CreateProject/CreateSteps/components/ConversationThreading";
import UploadPicture from "../../../../routes/components/Upload/UploadPicture";
import IntlMessages from "../../../../util/IntlMessages";
import { editExerciseError } from "../../../../library/editExerciseError";
import {
  cancelAddExercice,
  saveExercice,
  getExercices,
  extendExercice,
  editExercice,
  getExercice,
  deleteExercice,
  updateExerciceOrder
} from "../../../../appRedux/actions/exercices";
import { getProject } from "../../../../appRedux/actions/projects";
import UploadVideo from "../../../../routes/components/Upload/UploadVideo";
import { MEDIA_TYPE_EXERCICE } from "../../../../appRedux/actions/media";
import Thumb from "../../../Media/Thumb";
import { VIDEO_TYPE_EXERCICE } from "../../../../appRedux/actions/videos";
const { TextArea } = Input;
const { Text } = Typography;

class DragHandleExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercice: this.props.exercice,
      showUploadModule: false,
      thread: {
        title: <IntlMessages id="miuwi.project.title.exercise" />,
        visible: false,
        exerciseTitle: "",
        type: "",
        label: ""
      },
      loading: false,
      showEditError: false,
      exerciseBeingEdited: null
    };
    this.onChange = this.change.bind(this);
  }
  change = (event, stateName) => {
    let newValue = stateName === "order" ? event : event.target.value;

    let { exercice } = this.state;
    this.setState({ exercice: { ...exercice, [stateName]: newValue } });
  };

  extendExercice = (exercices, exercice, extend) => {
    let edit = editExerciseError(exercices);
    if (!edit) {
      this.props.extendExercice(exercices, exercice, extend);
    } else {
      this.setState({
        showEditError: true,
        exerciseBeingEdited: edit
      });
    }
  };

  cancelADD = (exercices, exercice) => {
    this.props.cancelAddExercice(exercices, exercice);
    this.props.getExercices(this.props.project.slug);
  };
  onEditExercice = (exercices, exercice, edit) => {
    this.setState({
      exercice: exercice
    });
    let isBeingEdited = editExerciseError(exercices);
    if (!isBeingEdited) {
      this.props.editExercice(exercices, exercice, edit);
    } else {
      this.setState({
        showEditError: true,
        exerciseBeingEdited: isBeingEdited
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  deleteOk = exercice => {
    this.props
      .deleteExercice(exercice)
      .then(() => {
        let project = this.props.project;
        this.props.getExercices(project.slug);
        this.props.getProject(project.slug);
      })
      .catch(error => {
        throw error;
      });

    this.setState({
      visible: false
    });
  };

  cancelDelete = e => {
    this.setState({
      visible: false
    });
  };

  whenAddImage(exercice) {
    exercice = { ...this.state.exercice, extend: false };

    this.props.saveExercice(exercice, this.props.project.slug).then(() => {
      if (!exercice.id) {
        this.setState({ exercice: this.props.exercice_insert });
      }
      this.setState({ showUploadModule: true });
    });
  }

  switchExercisesOrder(exercice, value) {
    let newOrder;
    if (value === "up") newOrder = exercice.order - 1;
    if (value === "down") newOrder = exercice.order + 1;
    if (newOrder > 0) {
      this.setState({
        loading: true
      });
      this.props
        .updateExerciceOrder(this.props.project.slug, exercice.slug, newOrder)
        .then(() => {
          this.props.getExercices(this.props.project.slug).then(() => {
            this.setState({ loading: false });
          });
        })
        .catch(e => {
          NotificationManager.error(<IntlMessages id="miuwi.sever.error" />);
          this.setState({ loading: false });
        });
    }
  }

  validateExercise(exercice, props) {
    exercice = {
      ...this.state.exercice,
      archive: false
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.saveExercice(exercice, props.project.slug).then(() => {
          this.props.getExercices(props.project.slug).then(() => {
            if (!exercice.id)
              this.setState({
                exercice: exercice
              });
          });
          this.props.getProject(props.project.slug);
          this.setState({ showUploadModule: false });
        });
      } else {
        NotificationManager.error(<IntlMessages id="miuwi.errorInput.title" />);
      }
    });
  }

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

  render() {
    const { getFieldDecorator } = this.props.form;
    let threads = this.props.threads;
    let exercice = this.props.exercice;
    let exercices = this.props.exercices;
    let slug = this.props.project && this.props.project.slug;
    return (
      <div>
        {!exercice.extend && (
          <Row className="gx-contact-item gx-dragndrop-item">
            {exercices.length > 1 && (
              /* up-down arrows */
              <Col span={1}>
                {this.state.loading ? (
                  <Spin />
                ) : (
                    <Row>
                      {exercice.order >= 1 &&
                        exercice.order !== exercices.length && (
                          <Icon
                            style={{ marginRight: "4px" }}
                            type="arrow-down"
                            onClick={() =>
                              this.switchExercisesOrder(exercice, "down")
                            }
                          />
                        )}
                      {exercice.order <= exercices.length &&
                        exercice.order !== 1 && (
                          <Icon
                            type="arrow-up"
                            onClick={() =>
                              this.switchExercisesOrder(exercice, "up")
                            }
                          />
                        )}
                    </Row>
                  )}{" "}
              </Col>
            )}
            <Col span={20}>
              <p>
                <IntlMessages id="miuwi.project.title.exercise" /> n°
                {exercice.order} :{" "}
                <strong style={{ fontWeight: "500" }}>{exercice.idea}</strong>
              </p>
            </Col>

            <Col span={3} className="show-exercise-btn">
              <Button
                style={{ float: "right" }}
                onClick={() => this.extendExercice(exercices, exercice, true)}
              >
                <IntlMessages id="miuwi.project.seeProject" />
              </Button>
            </Col>
          </Row>
        )}

        {/* exercise - mode view */}
        {exercice.extend && !exercice.edit && (
          <Form>
            <span>
              <IntlMessages id="miuwi.project.title.exercise" /> n°
              {exercice.order}
            </span>
            <Card className="card">
              {/* Titre */}
              <label>
                <IntlMessages id="miuwi.titleLabel" />
              </label>
              <Input
                disabled
                style={{ backgroundColor: "#FFFFFF", color: "#566573" }}
                defaultValue={exercice.idea}
              />
              {/* Présentation */}
              <label>
                <IntlMessages id="miuwi.project.title.presentation" />
              </label>
              <TextArea
                disabled
                rows={6}
                style={{ backgroundColor: "#FFFFFF", color: "#566573" }}
                defaultValue={exercice.detail}
              />
              {/* Exemples */}
              <label>
                <IntlMessages id="miuwi.examplesLabel" />
              </label>
              <TextArea
                style={{ backgroundColor: "#FFFFFF", color: "#566573" }}
                disabled
                rows={6}
                defaultValue={exercice.example}
              />
              {/* Media */}
              <Row type="flex" justify="space-around" align="middle">
                <Col>{exercice.media && <Thumb media={exercice.media} />}</Col>
                {exercice.video1 && (
                  <Col>
                    <UploadVideo
                      upload={false}
                      exercice={exercice.id ? exercice : this.state.exercice}
                      video={exercice.video1}
                      type={VIDEO_TYPE_EXERCICE}
                    />
                  </Col>
                )}
              </Row>
              <br />
              <br />
              {/* fil de discussion */}
              {slug && exercice && exercice.idea && (
                <Button
                  style={{ float: "right", color: "#F04E14", border: "none" }}
                  onClick={() =>
                    this.showThreads(
                      EXERCICE_AUTHOR,
                      this.state.exercice.idea,
                      <IntlMessages id="miuwi.project.title.exercise" />
                    )
                  }
                >
                  <IntlMessages id="miuwi.thread.link" />
                </Button>
              )}
              <br /> <br /> <br />
              {/* exercise order */}
              <label>
                <IntlMessages id="miuwi.project.exercises.positionLabel" />{" "}
                {exercice.order}/{exercices.length}
              </label>
              {/* buttons */}
              <Row type="flex" justify="end" className="edit-exercise-buttons">
                <Col span={3}>
                  <Button onClick={() => this.showModal()}>
                    <IntlMessages id="miuwi.project.exercises.deleteButton" />
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    type="primary"
                    onClick={() =>
                      this.onEditExercice(exercices, exercice, true)
                    }
                  >
                    <IntlMessages id="miuwi.project.exercises.editButton" />
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    onClick={() =>
                      this.extendExercice(exercices, exercice, false)
                    }
                  >
                    <IntlMessages id="miuwi.project.exercises.extendsButton" />
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
        )}

        {/* exercise - mode edit */}
        {exercice.extend && exercice.edit && (
          <Form>
            <div
              style={{
                padding: "10px",
                color: "white",
                backgroundColor: "rgba(251, 97, 22, 0.9)"
              }}
            >
              <IntlMessages id="miuwi.project.title.exercise" /> n°
              {exercice.order}
            </div>
            <Card
              className="card"
              style={{
                borderWidth: "2px",
                borderStyle: "dashed",
                borderTop: "none",
                borderColor: "rgba(251, 97, 22, 0.6)"
              }}
            >
              {/* Titre */}
              <label>
                <IntlMessages id="miuwi.titleLabel" />
              </label>
              {getFieldDecorator("idea", {
                initialValue: exercice.idea,
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.title" />
                  }
                ]
              })(
                <Input
                  maxLength={100}
                  type="text"
                  name="title"
                  placeholder="titre"
                  // defaultValue={exercice.idea}
                  onChange={e => this.change(e, "idea", 100)}
                />
              )}
              <span className="nb_characters">
                {" "}
                {this.state.exercice.idea && this.state.exercice.idea.length}
                /100 caractères
              </span>
              <br />
              {/* Présentation */}
              <label>
                <IntlMessages id="miuwi.project.title.presentation" />
              </label>
              {getFieldDecorator("detail", {
                initialValue: exercice.detail,
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.title" />
                  }
                ]
              })(
                <TextArea
                  rows={4}
                  name="presentation"
                  type="text"
                  placeholder="Développez la présentation l’action à faire dans cette étape "
                  // defaultValue={exercice.detail}
                  onChange={e => this.change(e, "detail")}
                />
              )}
              {/* Exemples */}
              <label>
                <IntlMessages id="miuwi.examplesLabel" />
              </label>
              {getFieldDecorator("example", {
                initialValue: exercice.example,
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.title" />
                  }
                ]
              })(
                <TextArea
                  rows={4}
                  name="example"
                  type="text"
                  placeholder="Donner des exemples pré rédigés permettra de passer à l’action plus facilement"
                  // defaultValue={exercice.example}
                  onChange={e => this.change(e, "example")}
                />
              )}
              <br />
              {/* Media */}
              <label>
                <IntlMessages id="miuwi.downloadButtonFile" />
              </label>
              <br />
              <Text type="secondary">
                <IntlMessages id="miuwi.project.edit.linkedFiles" />?
                <br /> Format : JPG, PNG, PDF /{" "}
                <IntlMessages id="miuwi.file.size" /> &lt; 10 Mo
              </Text>
              <br />
              <br />
              {/* when create exercise */}
              {!(exercice.media || exercice.id) && (
                <div className="btnCentered">
                  <Button
                    hidden={this.state.showUploadModule}
                    onClick={() => {
                      this.whenAddImage(exercice);
                    }}
                  >
                    <IntlMessages id="miuwi.form.addFile" />
                  </Button>
                </div>
              )}
              <div style={{ clear: "both" }}></div>
              {(this.state.showUploadModule ||
                exercice.media ||
                exercice.id) && (
                  <div>
                    {/* Add Image */}
                    <UploadPicture
                      type={MEDIA_TYPE_EXERCICE}
                      exercice={exercice.id ? exercice : this.state.exercice}
                      media={exercice ? exercice.media : {}}
                      labelBtn={<IntlMessages id="miuwi.form.addFile" />}
                    />
                    <div style={{ clear: "both" }}></div>
                    {/* Vidéo */}
                    <label>
                      <IntlMessages id="miuwi.videoText" />
                    </label>{" "}
                    <br />
                    <Text type="secondary">
                      <IntlMessages id="miuwi.project.exercises.examplesVideoText" />
                      <br />3 minutes max
                  </Text>
                    <UploadVideo
                      upload={true}
                      exercice={exercice.id ? exercice : this.state.exercice}
                      video={exercice.video1}
                      type={VIDEO_TYPE_EXERCICE}
                    />
                  </div>
                )}
              <br />
              {/* fil de discussion */}
              {exercice && exercice.idea && (
                <Button
                  style={{ float: "right", color: "#F04E14", border: "none" }}
                  onClick={() =>
                    this.showThreads(
                      EXERCICE_AUTHOR,
                      this.state.exercice.idea,
                      <IntlMessages id="miuwi.project.title.exercise" />
                    )
                  }
                >
                  <IntlMessages id="miuwi.thread.link" />
                </Button>
              )}
              <br /> <br /> <br />
              {/* exercise order */}
              <label>
                <IntlMessages id="miuwi.project.exercises.positionLabel" />{" "}
                {exercice.order}/{exercices.length}
              </label>
              {/* buttons */}
              <Row type="flex" justify="end" className="edit-exercise-buttons">
                <Col span={3}>
                  <Button onClick={() => this.cancelADD(exercices, exercice)}>
                    <IntlMessages id="miuwi.project.cancelButton" />
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() =>
                      this.validateExercise(exercice, this.props, true)
                    }
                  >
                    <IntlMessages id="miuwi.project.exercises.validateButton" />
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
        )}

        {/* when delete exercise */}
        <Modal
          title={<IntlMessages id="miuwi.project.exercises.deleteButton" />}
          visible={this.state.visible}
          onOk={() => this.deleteOk(exercice)}
          onCancel={this.cancelDelete}
        >
          <p>
            <IntlMessages id="miuwi.project.exercices.deleteConfirm" />{" "}
          </p>
        </Modal>

        {/* when conversation threading */}
        <Modal
          title={
            <p>
              <IntlMessages id="miuwi.thread.label" /> {this.state.thread.label}{" "}
              {`No ° : ${exercice.order}`}
            </p>
          }
          visible={this.state.thread.visible}
          // project={project}
          onCancel={() => this.hideThreads()}
          footer={[null, null]}
          width="60%"
        >
          {exercice && exercice.id && (
            <div>
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
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="blank" href={decoratedHref} key={key}>
                    {decoratedText}
                  </a>
                )}>
                  <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                    {exercice.example}
                  </span>
                </Linkify>
              </p>
              <p>
                <IntlMessages id="miuwi.titleLabel" />:{" "}
                <span style={{ fontWeight: "100" }}>{exercice.idea}</span>
              </p>
              <ConversationThreading
                type={this.state.thread.type}
                threads={threads}
                exercice={exercice}
                slug={slug}
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
              <p>{<IntlMessages id="miuwi.project.exercises.editError" />}</p>
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
    );
  }
}
const WrappedForm = Form.create()(DragHandleExercise);

const mapStateToProps = state => {
  return {
    state,
    exercices: state.exercices.exercices,
    exercice_insert: state.exercices.exercice,
    project: state.projects.project,
    threads: state.threads.threads
  };
};

export default connect(
  mapStateToProps,
  {
    cancelAddExercice,
    saveExercice,
    getExercices,
    extendExercice,
    editExercice,
    getExercice,
    deleteExercice,
    getProject,
    updateExerciceOrder
  }
)(WrappedForm);
