import axios from "axios";
import { authToken } from "./Auth";
import {
  VIDEO_SUCCESS,
  PROJECTS_DELETE_VIDEO,
  EXERCICES_DELETE_VIDEO
} from "../../constants/ActionTypes";
import { EXERCICE_STUDENT, EXERCICE_AUTHOR } from "./threadsAction";

const apiVideo = process.env.REACT_APP_SPLIIK_API + "/videos";

export const VIDEO_TYPE_PROJECT = "VIDEO_TYPE_PROJECT";
export const VIDEO_TYPE_EXERCICE = "VIDEO_TYPE_EXERCICE";
export const VIDEO_TYPE_THREAD = "VIDEO_TYPE_THREAD";
export const VIDEO_TYPE_ANSWER = "VIDEO_TYPE_ANSWER";

export const saveVideoFileInfo = meta => dispatch => {
  // meta.etag, url, thumbnail_url

  let urlPost = apiVideo + "/add?";

  let data = {
    etag: meta.etag,
    public_id: meta.public_id,
    url: meta.url,
    thumbnail_url: meta.thumbnail_url,
    format: meta.format,
    video_type: meta.type
  };
  switch (meta.type) {
    case VIDEO_TYPE_PROJECT:
      data = {
        ...data,
        id_project: meta.item_id
      };
      break;
    case VIDEO_TYPE_EXERCICE:
      data = {
        ...data,
        id_exercice: meta.item_id
      };
      break;
    case VIDEO_TYPE_THREAD:
      if ([EXERCICE_STUDENT, EXERCICE_AUTHOR].indexOf(meta.thread_type) > -1)
        data = {
          ...data,
          id_exercice: meta.id_exercice
        };
      data = {
        ...data,
        thread_type: meta.thread_type,
        id_project: meta.item_id
      };
      break;
    case VIDEO_TYPE_ANSWER:
      data = {
        ...data,
        id_project: meta.item_id,
        id_exercice: meta.id_exercice,
        student_answer_id: meta.student_answer && meta.student_answer.id
      };
      break;
    default:
      break;
  }

  return axios.post(urlPost, data, authToken(localStorage.jwt)).then(res => {
    dispatch({
      type: VIDEO_SUCCESS
    });
    return res;
  });
};

export const deleteVideo = (type, slug, public_id) => dispatch => {
  return axios
    .delete(
      `${apiVideo}/?type=${type}&slug=${slug}&public_id=${public_id}`,
      authToken(localStorage.jwt)
    )
    .then(result => {
      switch (type) {
        case VIDEO_TYPE_PROJECT:
          dispatch({
            type: PROJECTS_DELETE_VIDEO
          });
          break;
        case VIDEO_TYPE_EXERCICE:
          dispatch({
            type: EXERCICES_DELETE_VIDEO,
            id: result.data.id
          });
          break;
        default:
          break;
      }
      return new Promise((resolve, reject) => {
        resolve("ok");
      });
    })
    .catch(e => {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    });
};
