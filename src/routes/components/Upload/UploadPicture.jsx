import React from "react";
import { Icon, Upload, Modal } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

import {
  uploadFile,
  deleteFile,
  MEDIA_TYPE_PROJECT,
  MEDIA_TYPE_USER,
  MEDIA_TYPE_EXERCICE,
  MEDIA_TYPE_THREADS,
  MEDIA_TYPE_ANSWER
} from "./../../../appRedux/actions/media";
import { getProject } from "../../../appRedux/actions/projects";
import { getExercice } from "../../../appRedux/actions/exercices";
import { getProjectThreads } from "../../../appRedux/actions/threadsAction";
import { getUser } from "../../../appRedux/actions/users";
import { connect } from "react-redux";
import IntlMessages from "../../../util/IntlMessages";
import { getExerciseAnswer } from "../../../appRedux/actions/exercices";
class UploadPicture extends React.Component {
  state = {
    previewVisible: false,
    visibleDelete: false,
    previewImage: "",
    filesList: [],
    description: "description",
    title: "title",
    item_slug: "",
    type: ""
  };
  handleCancel = () => this.setState({ previewVisible: false });

  cancelDelete = () => {
    this.setState({ visibleDelete: false });
    return;
  };
  deleteOk = () => {
    if (this.props.media) {
      this.props
        .deleteFile(
          this.state.type,
          this.state.item_slug,
          this.state.indexMedia,
          this.props.media.id
        )
        .then(() => {
          this.setState({ filesList: [] });
          switch (this.props.type) {
            /*  case MEDIA_TYPE_EXERCICE:
                        break;
                    case MEDIA_TYPE_PROJECT:
                        break; */
            case MEDIA_TYPE_USER:
              this.props.getUser();
              break;
            default:
              break;
          }
          this.setState({ visibleDelete: false });
          return;
        })
        .catch(e => {
          this.setState({ visibleDelete: false, filesList: [] });
        });
    } else {
      this.setState({ visibleDelete: false, filesList: [] });
    }
  };
  handleRemove = obj => {
    let { projectSlug, type, indexMedia, exercice } = this.props;

    switch (type) {
      case MEDIA_TYPE_PROJECT:
        this.setState({
          visibleDelete: true,
          item_slug: projectSlug,
          type: type,
          indexMedia: indexMedia
        });
        break;

      case MEDIA_TYPE_EXERCICE:
        this.setState({
          visibleDelete: true,
          item_slug: exercice.slug,
          type: type,
          indexMedia: indexMedia
        });
        break;
      default:
        this.setState({
          visibleDelete: true
        });
        break;
    }

    return;
  };
  handleChange = obj => {
    let { fileList } = obj;
    let meta;
    let { type } = this.props;
    if (fileList.length > 0) {
      switch (type) {
        case MEDIA_TYPE_EXERCICE:
          meta = { type, exercice: this.props.exercice };
          break;
        case MEDIA_TYPE_PROJECT:
          meta = {
            type,
            projectId: this.props.projectId,
            number_media: this.props.indexMedia
          };
          break;
        case MEDIA_TYPE_USER:
          meta = { type, user: this.props.user };
          break;
        case MEDIA_TYPE_THREADS:
          meta = {
            type,
            projectId: this.props.project.id,
            thread_type: this.props.thread_type,
            exerciceId: this.props.exercice ? this.props.exercice.id : null
          };
          break;
        case MEDIA_TYPE_ANSWER:
          meta = {
            type,
            exerciceId: this.props.exercice.id,
            projectId: this.props.project.id,
            student_answer: this.props.answer
          };
          break;
        default:
          break;
      }

      this.props.uploadFile(fileList[0].originFileObj, meta).then(res => {
        if (res.data) {
          this.setState({
            filesList: [
              {
                uid: -1,
                name: res.data.name,
                status: "done",
                url: res.data.path
              }
            ]
          });
          switch (this.props.type) {
            case MEDIA_TYPE_EXERCICE:
              break;
            case MEDIA_TYPE_PROJECT:
              this.props.getProject(this.props.projectSlug);
              break;
            case MEDIA_TYPE_USER:
              this.props.getUser();
              break;
            case MEDIA_TYPE_THREADS:
              this.props.getProjectThreads(
                this.props.project.slug,
                meta.thread_type
              );
              break;
            case MEDIA_TYPE_ANSWER:
              this.props.getExerciseAnswer(meta.exerciceId);
              break;
            default:
              break;
          }
        }
      });
    }
  };

  componentDidMount() {
    let { media } = this.props;
    if (media) {
      this.setState({
        filesList: [
          {
            uid: -1,
            name: media.name,
            status: "done",
            url: media.path
          }
        ]
      });
    }
  }

  render() {
    const { previewVisible, filesList } = this.state;

    const uploadButton = (
      <>
        <FileAddOutlined
          style={{ fontSize: "38px", cursor: "pointer", color: "#ef7911" }}
        />
        <div>{this.props.labelBtn ? this.props.labelBtn : "Ajouter"}</div>
      </>
    );
    const listType =
      this.props.type === MEDIA_TYPE_THREADS ? (
        <Icon
          type="picture"
          theme="twoTone"
          twoToneColor="#52c41a"
          style={{
            fontSize: "58px",
            cursor: "pointer"
          }}
        />
      ) : (
        "picture-card"
      );
    return (
      <div
        style={{
          alignContent: "center",
          alignSelf: "center"
        }}
      >
        <Upload
          listType={listType}
          fileList={this.props.type === MEDIA_TYPE_THREADS ? [] : filesList}
          onChange={obj => this.handleChange(obj)}
          onRemove={obj => this.handleRemove(obj)}
        >
          {this.props.type === MEDIA_TYPE_THREADS || filesList.length < 1
            ? uploadButton
            : null}
          {/*  {filesList.length >= 1 ? null : uploadButton} */}
        </Upload>
        <Modal
          title={"Confirmation de suppression"}
          visible={this.state.visibleDelete}
          onOk={() => this.deleteOk()}
          onCancel={this.cancelDelete}
        >
          <p>
            <IntlMessages id="miuwi.picture.delete.confirm" />
          </p>
        </Modal>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={
              this.props.media &&
              this.props.media.id &&
              process.env.REACT_APP_SPLIIK_API +
                "/medias/download/media/" +
                this.props.media.id
            }
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    uploadFile,
    deleteFile,
    getUser,
    getProject,
    getExercice,
    getProjectThreads,
    getExerciseAnswer
  }
)(UploadPicture);
