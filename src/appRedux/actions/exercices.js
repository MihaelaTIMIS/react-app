import {
  EXERCICES_GET_ITEMS,
  EXERCICES_ADD_SUCCESS,
  EXERCICES_ADD_ITEM,
  EXERCICES_UPDATED,
  EXERCICES_LOAD_ITEM,
  EXERCISE_LOAD_ANSWER,
  EXERCISE_UPDATE_ANSWER
} from "./../../constants/ActionTypes";
import axios from "axios";
import { authToken } from "./Auth";

const apiUrl = process.env.REACT_APP_SPLIIK_API + "/exercices/project";
const exUrl = process.env.REACT_APP_SPLIIK_API + "/exercices";
const answerUrl = process.env.REACT_APP_SPLIIK_API + "/answers";

export const extendExercice = (exercices, exercice, extend) => dispatch => {
  exercices.map(ex => {
    if (ex.id === exercice.id) {
      ex.extend = extend;
    }
    return ex;
  });
  dispatch({
    type: EXERCICES_GET_ITEMS,
    exercices: exercices
  });
};
export const updateExerciceOrder = (
  slug_project,
  slug_exercice,
  newOrder
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ slug_project, newOrder });

  return axios
    .put(
      `${exUrl}/${slug_exercice}/switch-order`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: EXERCICES_GET_ITEMS,
        exercices: res.data
      });
    });
};

export const editExercice = (exercices, exercice, edit) => dispatch => {
  exercices.map(ex => {
    if (ex.id === exercice.id) {
      ex.edit = edit;
    }
    return ex;
  });
  dispatch({
    type: EXERCICES_GET_ITEMS,
    exercices: exercices
  });
};
export const toggleExercices = (exercices, extended) => dispatch => {
  exercices.map(ex => {
    ex.extend = extended;
    return ex;
  });

  dispatch({
    type: EXERCICES_GET_ITEMS,
    exercices: exercices
  });
};

// Permute order exercice
export const dragDropExercices = (
  exercices,
  oldIndex,
  newIndex,
  slug
) => dispatch => {
  if (oldIndex === newIndex) return;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Permute Exo
  let exoUpdate = exercices[oldIndex];
  let exoPermute = exercices[newIndex];
  exoUpdate = {
    ...exoUpdate,
    order: newIndex
  };
  exoPermute = {
    ...exoPermute,
    order: oldIndex
  };
  return axios
    .put(
      `${exUrl}/${exoUpdate.id}`,
      { ...exoUpdate },
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      return axios
        .put(
          `${exUrl}/${exoPermute.id}`,
          { ...exoPermute },
          config,
          authToken(localStorage.jwt)
        )
        .then(res => {
          return axios
            .get(`${apiUrl}/${slug}`, authToken(localStorage.jwt))
            .then(res => {
              let exercices = res.data;
              exercices.map(ex => {
                ex.extend = false;
                return ex;
              });
              dispatch({
                type: EXERCICES_GET_ITEMS,
                exercices: exercices
              });
            });
        });
    });
};
export const getExercices = slug => dispatch => {
  if (slug)
    return axios
      .get(`${apiUrl}/${slug}`, authToken(localStorage.jwt))
      .then(res => {
        let exercices = res.data;
        exercices.map(ex => {
          ex.extend = false;
          return ex;
        });
        dispatch({
          type: EXERCICES_GET_ITEMS,
          exercices: exercices
        });
      });
};

export const addExercice = (exercices, exercice) => dispatch => {
  exercices.push(exercice);
  dispatch({
    type: EXERCICES_ADD_ITEM,
    data: exercice
  });
};
export const cancelAddExercice = (exercices, exercice) => dispatch => {
  exercices.splice(exercice);
  dispatch({
    type: EXERCICES_ADD_ITEM,
    data: exercice
  });
  return exercice;
};

export const saveExercice = (exercice, slug) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  if (exercice.id === null) {
    const body = JSON.stringify(exercice, slug);
    return axios
      .post(`${exUrl}/${slug}`, body, config, authToken(localStorage.jwt))
      .then(res => {
        dispatch({
          type: EXERCICES_ADD_SUCCESS,
          exercice: res.data
        });
      });
  } else {
    const body = JSON.stringify(exercice, exercice.id);
    return axios
      .put(`${exUrl}/${exercice.id}`, body, config, authToken(localStorage.jwt))
      .then(res => {
        dispatch({
          type: EXERCICES_UPDATED,
          exercice: res.data
        });
      });
  }
};

export const getExercice = exercice => dispatch => {
  if (exercice.id)
    return axios
      .get(`${exUrl}/${exercice.id}`, authToken(localStorage.jwt))
      .then(res => {
        dispatch({
          type: EXERCICES_LOAD_ITEM,
          exercice: res.data
        });
      });
};

export const deleteExercice = exercice => dispatch => {
  return axios.delete(`${exUrl}/${exercice.id}`, authToken(localStorage.jwt));
};

export const addExerciseAnswer = (
  slug_exercice,
  slug_project,
  new_answer,
  initial_answer
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!initial_answer || initial_answer.id === null) {
    const body = JSON.stringify({ answer: new_answer });
    return axios
      .post(
        `${exUrl}/${slug_exercice}/answer/${slug_project}`,
        body,
        config,
        authToken(localStorage.jwt)
      )
      .then(res => {
        dispatch({
          type: EXERCISE_LOAD_ANSWER,
          answer: res.data
        });
      });
  } else {
    const body = JSON.stringify({ answer: new_answer });
    return axios
      .put(
        `${exUrl}/${slug_exercice}/answer/${slug_project}`,
        body,
        config,
        authToken(localStorage.jwt)
      )
      .then(res => {
        dispatch({
          type: EXERCISE_UPDATE_ANSWER,
          answer: res.data
        });
      });
  }
};

//pour l'étudiant
export const getExerciseAnswer = (id_exercice, project_student) => dispatch => {
  try {
    if (id_exercice)
      return axios
        .get(
          `${answerUrl}/of-exercise/${id_exercice}/of-project/${project_student.id}`,
          authToken(localStorage.jwt)
        )
        .then(res => {
          dispatch({
            type: EXERCISE_LOAD_ANSWER,
            answer: res.data
          });
        });
  } catch (e) {}
};

/* //pour le soutien
export const getStudentExerciseAnswer = (
  id_exercice,
  id_project_student
) => dispatch => {
  try {
    if (id_exercice)
      return axios
        .get(
          `${answerUrl}/of-exercise/${id_exercice}/of-student/${id_project_student}`,
          authToken(localStorage.jwt)
        )
        .then(res => {
          dispatch({
            type: EXERCISE_LOAD_ANSWER,
            answer: res.data
          });
        });
  } catch (e) {}
}; */
