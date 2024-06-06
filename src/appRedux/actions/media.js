import axios from "axios";
import { authToken } from "./Auth";
import { LOADING_FILE } from "../../constants/ActionTypes";
import { EXERCICE_AUTHOR, EXERCICE_STUDENT } from "./threadsAction";

const apiMedia = process.env.REACT_APP_SPLIIK_API + "/medias";
//const mediasProject = process.env.REACT_APP_SPLIIK_API + '/medias'
//const mediasExercise = process.env.REACT_APP_SPLIIK_API + '/medias/exercice'

export const MEDIA_TYPE_PROJECT = "MEDIA_TYPE_PROJECT";
export const MEDIA_TYPE_EXERCICE = "MEDIA_TYPE_EXERCICE";
export const MEDIA_TYPE_USER = "MEDIA_TYPE_USER";
export const MEDIA_TYPE_THREADS = "MEDIA_TYPE_THREADS";
export const MEDIA_TYPE_ANSWER = "MEDIA_TYPE_ANSWER";

export const uploadFile = (files, meta) => dispatch => {
  let urlPost = apiMedia + "/add?";
  const formData = new FormData();
  formData.append("file", files);
  formData.append("description", "description");
  formData.append("title", "title");
  formData.append("media_type", meta.type);

  switch (meta.type) {
    case MEDIA_TYPE_PROJECT:
      urlPost += "&id_project=" + meta.projectId;
      urlPost += "&number_media=" + meta.number_media;
      break;
    case MEDIA_TYPE_EXERCICE:
      urlPost += "&id_exercice=" + meta.exercice.id;
      break;
    case MEDIA_TYPE_USER:
      urlPost += "&id_user=" + meta.user.user.id;
      break;
    case MEDIA_TYPE_THREADS:
      urlPost += "&id_project=" + meta.projectId;
      if ([EXERCICE_STUDENT, EXERCICE_AUTHOR].indexOf(meta.thread_type) > -1)
        urlPost += "&id_exercice=" + meta.exerciceId;
      formData.append("thread_type", meta.thread_type);
      break;
    case MEDIA_TYPE_ANSWER:
      urlPost += "&id_exercice=" + meta.exerciceId;
      urlPost += "&id_project=" + meta.projectId;
      formData.append("student_answer_id", meta.student_answer.id);
      break;
    default:
      break;
  }

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    cache: false,
    processData: false
  };

  return axios
    .post(urlPost, formData, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: LOADING_FILE,
        file: res.status
      });
      return res;
    });
};

export const deleteFile = (type, slug, index_media, id_media) => dispatch => {
  if (!index_media) index_media = "1";
  return axios.delete(
    `${apiMedia}/?type=${type}&slug=${slug}&index_media=${index_media}&id_media=${id_media}`,
    authToken(localStorage.jwt)
  );
};
