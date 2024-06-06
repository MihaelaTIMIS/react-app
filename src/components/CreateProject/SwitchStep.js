import "./index.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Steps, Modal, Spin, Row, Col } from "antd";
import {
  getProject,
  addProject,
  inviteStudents,
  editProject,
  submitProject,
  getProjectPrice,
  getProjectsOwner
} from "../../appRedux/actions/projects";
import { screenNext, setNextValue } from "../../appRedux/actions/screen";
import { editExerciseError } from "../../library/editExerciseError";
import { getExercices } from "../../appRedux/actions/exercices";
import Step1 from "./CreateSteps/Step1";
import Step2 from "./CreateSteps/Step2";
import Step3 from "./CreateSteps/Step3";
import Step4 from "./CreateSteps/Step4";
import Step5 from "./CreateSteps/Step5";
import Step6 from "./CreateSteps/Step6";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

const Step = Steps.Step;
const steps = [
  {
    title: <IntlMessages id="miuwi.project.title.create" />
  },
  {
    title: <IntlMessages id="miuwi.project.title.presentation" />
  },
  {
    title: <IntlMessages id="miuwi.project.title.exercises" />
  },
  {
    title: <IntlMessages id="miuwi.project.title.contribution" />
  },
  {
    title: <IntlMessages id="miuwi.project.title.publication" />
  },
  {
    title: <IntlMessages id="miuwi.project.title.final" />
  }
];

class SwitchStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        visible: false,
        showEditError: false,
        exerciseBeingEdited: null
      },
      loading: false
    };

    this.mailToClick = this.mailToClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true
    });
  }

  componentDidMount() {
    this.setState({
      loading: false
    });

    if (this.props.slug) this.props.screenNext(2);
    else this.props.screenNext(0);

    if (this.props.slug) {
      this.setState({ loading: true });

      this.props
        .getProject(this.props.slug)
        .then(() => this.setState({ loading: false }));
    }

    if (this.props.project) this.props.getExercices(this.props.project.slug);
  }

  mailToClick(project) {
    window.location.href = `mailto:${[
      project.author1_email,
      project.author2_email,
      project.author3_email
    ]}`;
  }

  clickOnSaveAndClose(e) {
    //appel fonction qui test si un exercice est en cours d'édition
    let edit = editExerciseError(this.props.exercices);
    if (!edit) {
      this.next(null, null, false);
    } else {
      e.preventDefault();
      this.setState({
        nextOk: false,
        showEditError: true,
        exerciseBeingEdited: edit
      });
    }
  }

  next(current, nextOk, submitToPublish) {
    //le cas du step 4 Contribution
    if (!current) {
      current = this.props.current;
    }
    if (!nextOk) nextOk = this.props.nextOk;

    switch (current) {
      case 0: // Create
        this.handleCreateOrEdit();
        break;
      case 2:
        this.testExercises();
        break;
      case 4: {
        this.saveProjectPrice(submitToPublish);
        break;
      }
      default:
        if (nextOk) {
          const current = this.props.current + 1;
          this.props.screenNext(current);
        } else {
          NotificationManager.error(
            <IntlMessages id="miuwi.errorInput.title" />
          );
        }
        break;
    }
  }

  prev() {
    const current = this.props.current - 1;
    this.props.screenNext(current);
    window.scrollTo(0, 0);
  }

  addProjectTags = (project, tags) => {
    project &&
      project.tags &&
      project.tags.forEach(t => {
        if (tags && tags.indexOf(t.title) === -1) {
          tags.push(t.title);
        }
      });
    return tags;
  };

  handleCreateOrEdit() {
    const { form } = this.formRef.props;
    const { tags } = this.formRef.state;
    this.addProjectTags(this.props.project, tags);
    form.validateFields((error, values) => {
      if (error) {
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.clickMe" />,
          5000
        );
        return;
      }

      const { slug, title, resume, category, subCategory } = values;
      let project = {
        title,
        resume,
        category,
        subCategory,
        tags
      };
      // Edit/Update
      if (slug) {
        project = {
          slug: slug,
          archive: false,
          online: false,
          ...project
        };
        this.props
          .editProject(project)
          .then(() => {
            this.props.getProjectsOwner();
            this.props.setNextValue(true);
            this.props.screenNext(1);
            window.scrollTo(0, 0);
            NotificationManager.success(
              <IntlMessages id="notification.projectMessage.update" />,
              <IntlMessages id="notification.success" />
            );
            return;
          })
          .catch(error => {
            if (error.message.indexOf("code 401") !== -1) {
              this.setState({ invalid_token: true });
            } else {
              NotificationManager.error(
                <IntlMessages id="extraPages.500Msg" />,
                <IntlMessages id="notification.errorMessage" />,
                5000
              );
            }
            return;
          });

        // Create
      } else {
        this.props
          .addProject(project)
          .then(() => {
            this.props.setNextValue(true);
            const current = this.props.current + 1;
            this.props.screenNext(current);
            window.scrollTo(0, 0);
            NotificationManager.success(
              <IntlMessages id="notification.projectMessage.insert" />,
              <IntlMessages id="notification.success" />
            );
            return;
          })
          .catch(() => {
            NotificationManager.error(
              <IntlMessages id="notification.errorMessage" />,
              <IntlMessages id="notification.clickMe" />,
              5000
            );
            return;
          });
      }
    });
  }

  testExercises = () => {
    let exercises = this.props.project.exercices;
    if (exercises && exercises.length < 3) {
      NotificationManager.error(
        <IntlMessages id="notification.exercises.lessThan3" />,
        <IntlMessages id="notification.clickMe" />,
        5000
      );
    } else {
      let edit = editExerciseError(this.props.exercices);
      if (!edit) {
        const current = this.props.current + 1;
        this.props.screenNext(current);
        window.scrollTo(0, 0);
      } else {
        this.setState({
          nextOk: false,
          showEditError: true,
          exerciseBeingEdited: edit
        });
      }
    }
  };

  saveProjectPrice = submitToPublish => {
    let project = this.props.project;
    this.props.getProjectPrice(project);
    const { form } = this.formRef.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        NotificationManager.error(
          <IntlMessages id="miuwi.errorInput.isFree" />,
          <IntlMessages id="notification.clickMe" />,
          5000
        );
        return;
      } else if (
        values.value === 1 &&
        (!values.priceTTC || values.priceTTC === 0)
      ) {
        NotificationManager.error(<IntlMessages id="miuwi.errorInput.price" />);
      } else {
        const { slug } = values;
        const project_price = this.props.project_price;

        if (slug) this.evtSubmitProject(slug, project_price, submitToPublish);

        this.saveAudienceEmails();
      }
    });
  };

  saveAudienceEmails = () => {
    //save the emails of the audience
    let emails = this.formRef.emailRef.state.emails;
    emails.map(email => {
      if (this.props.project)
        this.props.inviteStudents(this.props.project.id, email);
      return email;
    });
  };

  evtSubmitProject = (slug, project_price, submitToPublish) => {
    let project = {
      slug: slug,
      ...this.project,
      ...project_price,
      submitted_project: submitToPublish,
      commission: project_price.is_free
        ? 0
        : Number.parseFloat(project_price.commission).toFixed(2),
      price: project_price.is_free
        ? 0
        : Number.parseFloat(project_price.price).toFixed(2),
      price_totalHT: project_price.is_free
        ? 0
        : Number.parseFloat(project_price.price_totalHT).toFixed(2),
      price_totalTTC: project_price.is_free
        ? 0
        : Number.parseFloat(project_price.price_totalTTC).toFixed(2)
    };

    if (project) {
      this.props.submitProject(project).then(() => {
        if (project.submitted_project) {
          NotificationManager.success(
            <IntlMessages id="notification.projectMessage.publishRequest" />,
            <IntlMessages id="notification.success" />
          );
        } else {
          NotificationManager.success(
            <IntlMessages id="notification.projectMessage.update" />,
            <IntlMessages id="notification.success" />
          );
        }
        this.next(true);
      });
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  saveSubmitRef = elements => {
    this.formRef = elements;
    this.emailRef = elements && elements.emailRef;
  };

  showModal = () => {
    this.setState({
      modal: { visible: true }
    });
    this.props.setNextValue(false);
  };

  hideModal = e => {
    this.setState({
      modal: { visible: false }
    });
  };

  publishConfirm() {
    this.props.setNextValue(true);
    this.hideModal();
    this.saveProjectPrice(true);
  }

  render() {
    const current = this.props.current;
    let project = this.props.project;

    if (this.state.loading)
      return (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      );
    else
      return (
        <Card className="gx-card">
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} id={item.id} />
            ))}
          </Steps>
          {current === 0 && (
            <Step1
              wrappedComponentRef={this.saveFormRef}
              slug={project && project.slug}
            />
          )}
          {current === 1 && <Step2 project={this.props.project} />}
          {current === 2 && <Step3 project={this.props.project} />}
          {current === 3 && (
            <Step4
              nextAction={() => this.next()}
              project={this.props.project}
            />
          )}
          {current === 4 && <Step5 wrappedComponentRef={this.saveSubmitRef} />}
          {current === 5 && <Step6 />}

          {/* when click to publish workshop */}
          <Modal
            visible={this.state.modal.visible}
            onCancel={() => this.hideModal()}
            footer={[
              <Button key="back" onClick={() => this.hideModal()}>
                <IntlMessages id="miuwi.project.cancelButton" />
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => this.publishConfirm()}
              >
                <IntlMessages id="miuwi.project.publishConfirmButton" />
              </Button>
            ]}
          >
            <p>
              <br />
              <IntlMessages id="miuwi.project.publishConfirmText" />{" "}
            </p>
          </Modal>

          {/* error when edit exercise */}
          <Modal
            visible={this.state.showEditError}
            onCancel={() => this.setState({ showEditError: false })}
            footer={[
              null,
              <Button
                key="submit"
                type="primary"
                onClick={() => this.setState({ showEditError: false })}
              >
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

          {/* footer buttons */}
          <Row className="steps-action" type="flex" justify="space-between">
            {/* previous button */}
            <Col>
              {current > 0 && current < steps.length - 1 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  <IntlMessages id="miuwi.project.previousButton" />
                </Button>
              )}
            </Col>

            {/* save and close button */}
            <Col className="save-and-close-desktop">
              {this.props.nextOk && (
                <Link
                  className="btnCentered"
                  to={`/user?view=owner`}
                  onClick={e => this.clickOnSaveAndClose(e)}
                >
                  <Button>
                    {this.props.current !== 5 && (
                      <IntlMessages id="miuwi.project.saveAndCancel" />
                    )}
                    {this.props.current === 5 && (
                      <IntlMessages id="miuwi.user.backToDashboard" />
                    )}
                  </Button>
                </Link>
              )}
            </Col>

            {/* next button */}
            <Col>
              {current < steps.length - 3 && (
                <Button
                  className="btnNext"
                  type="primary"
                  onClick={() => this.next()}
                  style={{ float: "right" }}
                >
                  <IntlMessages id="miuwi.project.create.nextButton" />
                </Button>
              )}

              {current === steps.length - 3 && (
                <Button
                  style={{
                    background: "#65328b",
                    color: "#ffffff",
                    float: "right"
                  }}
                  onClick={() => this.next()}
                >
                  <IntlMessages id="miuwi.project.diffusion.inviteCustomersButton" />
                </Button>
              )}

              {current === steps.length - 2 && (
                <Button
                  className="btnNext"
                  type="primary"
                  onClick={() => this.showModal()}
                  style={{ float: "right" }}
                >
                  <IntlMessages id="miuwi.project.publishButton" />
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            {/* save and close button */}
            <Col className="save-and-close-mobile">
              {this.props.nextOk && (
                <Link
                  className="btnCentered"
                  to={`/user?view=owner`}
                  onClick={e => this.clickOnSaveAndClose(e)}
                >
                  <Button>
                    {this.props.current !== 5 && (
                      <IntlMessages id="miuwi.project.saveAndCancel" />
                    )}
                    {this.props.current === 5 && (
                      <IntlMessages id="miuwi.user.backToDashboard" />
                    )}
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
          {/* mail to assistants button */}
          {project &&
            (project.author1_email ||
              project.author2_email ||
              project.author3_email) && (
              <Row>
                <Col className="btnCentered">
                  <Button
                    style={{ color: "#e40e20", borderColor: "#e40e20" }}
                    onClick={() => this.mailToClick(project)}
                  >
                    {this.props.current !== 5 && (
                      <IntlMessages id="miuwi.project.mailToAssistants" />
                    )}
                  </Button>
                </Col>
              </Row>
            )}
        </Card>
      );
  }
}
const mapStateToProps = state => {
  return {
    project: state.projects.project,
    project_price: state.projects.project_price,
    submitEmails: state.projects.submitEmails,
    exercices: state.exercices.exercices,
    current: state.screen.current,
    nextOk: state.screen.nextOk
  };
};

export default connect(
  mapStateToProps,
  {
    getProject,
    getExercices,
    getProjectPrice,
    addProject,
    editProject,
    submitProject,
    inviteStudents,
    screenNext,
    setNextValue,
    getProjectsOwner
  }
)(SwitchStep);
