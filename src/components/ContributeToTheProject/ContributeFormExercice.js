import React from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { Row, Col, Button, Form, Card, Modal } from "antd";

import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import IntlMessages from "../../util/IntlMessages";
import {
  getExercices,
  extendExercice,
  getExercice
} from "../../appRedux/actions/exercices";
import { EXERCICE_AUTHOR } from "../../appRedux/actions/threadsAction";
import { getUser } from "../../appRedux/actions/users";
//import { getUrlApi } from "../../library/urlVar";
import Thumb from "../Media/Thumb";
import UploadVideo from "../../routes/components/Upload/UploadVideo";
import { VIDEO_TYPE_EXERCICE } from "../../appRedux/actions/videos";
class FormExercice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      this.props.getUser();
    }
  }
  onExtendExercise = () => {
    this.props.extendExercice(this.props.exercices, this.props.exercice, true);
    this.props.getExercice({ ...this.props.exercice, extend: true });
  };

  hideExercise = () => {
    this.props.extendExercice(this.props.exercices, this.props.exercice, false);
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
  render() {
    let threads = this.props.threads;
    let exercice = this.props.exercice;
    let user = this.props.user;
    let project = this.props.project;

    return (
      <div>
        {!exercice.extend && (
          <Row className="gx-contact-item gx-dragndrop-item">
            <Col lg={20} md={20} xs={24}>
              <p>
                <IntlMessages id="miuwi.project.title.exercise" /> n°
                {this.props.order} :{" "}
                <strong style={{ fontWeight: "500" }}>{exercice.idea}</strong>
              </p>
            </Col>

            <Col lg={4} md={4} xs={24} style={{textAlign: "center"}}>
              <Button
                onClick={() => this.onExtendExercise()}
              >
                <IntlMessages id="miuwi.project.seeProject" />
              </Button>
            </Col>
            <div style={{ clear: "both", width: "100%" }} />
            <hr style={{ width: "100%" }} />
          </Row>
        )}
        {exercice.extend && (
          <Form>
            <span>
              <IntlMessages id="miuwi.project.title.exercise" /> n°
              {this.props.order}
            </span>
            <Card className="card">
              {/* TITRE */}
              <Row>
                <IntlMessages id="miuwi.titleLabel" />&nbsp;:&nbsp;
                <span>{exercice.idea}</span>
              </Row>

              {/* VIDEO, IMAGE */}
              <Row type="flex" justify="center" span={24}>
                <Col lg={12} md={24}>
                  <UploadVideo
                    upload={false}
                    exercice={exercice}
                    video={exercice.video1}
                    type={VIDEO_TYPE_EXERCICE}
                  />
                </Col>

                <Col lg={12} md={24}>
                  {" "}
                  {exercice.media && <Thumb media={exercice.media} />}
                </Col>
              </Row>

              <hr/>
              {/* PRÉSENTATION */}
              <Row style={{marginTop:"10px"}}>
                <IntlMessages id="miuwi.project.title.presentation" />&nbsp;:&nbsp;
              </Row>
              <Row>
              <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>{exercice.detail}</span>
                </Linkify>
              </Row>
              <hr/>
              {/* EXEMPLE */}
              <Row style={{marginTop:"10px"}}>
                <IntlMessages id="miuwi.examplesLabel" />&nbsp;:&nbsp;
              </Row>
              <Row>
              <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                <div style={{ fontWeight: "100", whiteSpace: "pre-line" }}>{exercice.example}</div>
                </Linkify>
              </Row>

              <br />
              <br />
              <Row type='flex' justify="end">
                {!this.props.readonly && (
                  <Button
                    type="primary"
                    onClick={() =>
                      this.showThreads(
                        EXERCICE_AUTHOR,
                        this.state.exercice.idea,
                        <IntlMessages id="miuwi.project.title.exercise" />
                      )
                    }
                  >
                    {user.id === project.owner.id && (
                      <IntlMessages id="miuwi.thread.expert" />
                    )}
                    {user.id !== project.owner.id && (
                      <IntlMessages id="miuwi.thread.assistant" />
                    )}
                  </Button>
                )}

                <Button
                  onClick={() => this.hideExercise()}
                >
                  <IntlMessages id="miuwi.project.exercises.extendsButton" />
                </Button>
              </Row>

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
                      <span style={{ fontWeight: "100" }}>{exercice.idea}</span>{" "}
                    </p>
                    <p>
                      <IntlMessages id="miuwi.project.title.presentation" />:{" "}
                      <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                        {exercice.detail}
                      </span>
                    </p>
                    <p>
                      <IntlMessages id="miuwi.examplesLabel" />:{" "}
                      <span style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                        {exercice.example}
                      </span>
                    </p>
                    <ConversationThreading
                      type={this.state.thread.type}
                      threads={threads}
                      exercice={exercice}
                    />
                  </div>
                )}
              </Modal>
            </Card>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    user: state.user.user,
    exercices: state.exercices.exercices,
    project: state.projects.project,
    threads: state.threads.threads,
    location: state.routing.location
  };
};

export default connect(mapStateToProps, {
  getUser,
  getExercices,
  extendExercice,
  getExercice
})(FormExercice);
