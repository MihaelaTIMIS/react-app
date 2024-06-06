import React from "react";
import "./index.css";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import { getProjectThreads } from "../../../appRedux/actions/threadsAction";
import {
  getExercice,
  getExerciseAnswer
} from "./../../../appRedux/actions/exercices";
import {
  getProject,
  getProjectStudent
} from "./../../../appRedux/actions/projects";
import IntlMessages from "../../../util/IntlMessages";
import {
  saveVideoFileInfo,
  deleteVideo,
  VIDEO_TYPE_PROJECT,
  VIDEO_TYPE_EXERCICE,
  VIDEO_TYPE_THREAD,
  VIDEO_TYPE_ANSWER
} from "./../../../appRedux/actions/videos";

let type;
var cloudinary = require("cloudinary-core");

class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      widget: null,
      video: null,
      modal: false,
      loading: false,
      item: null
    };
  }

  getObject() {
    type = this.props.type;
    switch (type) {
      case VIDEO_TYPE_EXERCICE:
        this.setState({
          item: this.props.exercice
        });
        break;
      case VIDEO_TYPE_ANSWER:
        this.setState({
          item: this.props.project_student
        });
        break;
      default:
        this.setState({
          item: this.props.project
        });
        break;
    }

    this.setState({ video: this.props.video });
  }

  showWidget() {
    // event.stopPropagation();
    this.state.widget.open();
  }

  handleCancel() {
    this.setState({ video: null, modal: false });
  }

  showConfirmDeleteVideo(video) {
    this.setState({ video: video, modal: true });
  }

  confirmDeleteVideo() {
    this.setState({ loading: true });
    this.props
      .deleteVideo(type, this.state.item.slug, this.state.video.public_id)
      .then(() => {
        this.setState({ url: "", video: null, modal: false, loading: false });
        this.props.getExercise(this.props.exercice.slug);
      })
      .catch(e => {
        this.setState({ modal: false, loading: false });
      });
  }

  checkUploadResult = resultevent => {
    if (resultevent.event === "success" && resultevent.info) {
      const public_id = resultevent.info.public_id;
      let url = resultevent.info.secure_url;
      let format = resultevent.info.format;

      //transform url if not mp4
      if (format !== "mp4") {
        // console.log("wait for conversion..... ")
        var cl = new cloudinary.Cloudinary({
          cloud_name: process.env.REACT_APP_VIDEO_CLOUDINARY_CLOUDNAME,
          secure: true
        });
        url = cl.video_url(public_id, { format: "mp4" });
        format = "mp4";

        // console.log("Video conversion finished.");
      }

      this.setState({ url: url });

      let meta = {
        etag: resultevent.info.etag,
        public_id: public_id,
        url: url,
        thumbnail_url: resultevent.info.thumbnail_url,
        format: format,
        type: type,
        item_id: this.state.item.id
      };
      if (type === VIDEO_TYPE_THREAD)
        meta = {
          ...meta,
          thread_type: this.props.thread_type,
          id_exercice: this.props.exercice ? this.props.exercice.id : null
        };

      if (type === VIDEO_TYPE_ANSWER)
        meta = {
          ...meta,
          id_exercice: this.props.exercice.id,
          student_answer: this.props.answer
        };

      this.props.saveVideoFileInfo(meta).then(res => {
        switch (type) {
          case VIDEO_TYPE_PROJECT:
            this.setState({ video: meta });
            this.props.getProject(res.data.slug);
            break;
          case VIDEO_TYPE_EXERCICE:
            this.setState({ video: meta });
            this.props.getExercice(res.data.slug);
            break;
          case VIDEO_TYPE_THREAD:
            let project = res.data.project || res.data.projectStudent;
            this.props.getProjectThreads(project.slug, meta.thread_type);
            break;
          case VIDEO_TYPE_ANSWER:
            this.setState({ video: meta });
            this.props.getExercice(meta.id_exercice);
            this.props.getExerciseAnswer(meta.id_exercice);
            break;
          default:
            break;
        }
      });
    }
  };

  componentDidMount() {
    this.getObject();
    if (window.cloudinary) {
      this.setState({
        widget: window.cloudinary.createUploadWidget(
          {
            unsigned: true,
            cloudName: process.env.REACT_APP_VIDEO_CLOUDINARY_CLOUDNAME,
            apiKey: process.env.REACT_APP_VIDEO_CLOUDINARY_APIKEY,
            uploadPreset: process.env.REACT_APP_VIDEO_CLOUDINARY_UPLOADPRESET
          },
          (error, result) => {
            this.checkUploadResult(result, window.cloudinary);
          }
        )
      });
    }
  }

  render() {
    let video = this.state.video;
    return (
      <div >
        <Modal
          visible={this.state.modal}
          title={<IntlMessages id="spliik.confirm" />}
          onCancel={() => this.handleCancel()}
          okText={<IntlMessages id="miuwi.videoText.delete" />}
          confirmLoading={this.state.loading}
          onOk={() => this.confirmDeleteVideo()}
        >
          <IntlMessages id="miuwi.videoText.delete.confirm" />
        </Modal>

        {video && (
             <video
               className="exercise-video"
              // height={this.props.height}
              // width={this.props.width}
              controls
            >
              <source src={video.url} type="video/mp4" />
            </video>
            /* {console.log(video)}
            <Video  cloudName= {process.env.REACT_APP_VIDEO_CLOUDINARY_CLOUDNAME} publicId={video.public_id}  height={this.props.height || "150"}
              width={this.props.width}
              controls>
              <Transformation format="mp4" />
            </Video> */
         
        )}
        {this.props.upload && !video && (
          <div>
            <div id="photo-from-container">
              <Button
                onClick={() => this.showWidget()}
                style={{ border: "none" }}
              >
                <VideoCameraAddOutlined
                  style={{ color: "#3065af", fontSize: "38px" }}
                />
              </Button>
            </div>
            <div id="my-gallery" style={{ maxWidth: "80%" }}></div>
          </div>
        )}
        {this.props.upload && video && (
          <div style={{ textAlign: type === VIDEO_TYPE_ANSWER && "center" }}>
            <Button onClick={() => this.showConfirmDeleteVideo(video)}>
              <IntlMessages id="miuwi.videoText.delete" />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, {
  saveVideoFileInfo,
  deleteVideo,
  getProject,
  getExercice,
  getExerciseAnswer,
  getProjectThreads,
  getProjectStudent
})(UploadVideo);
