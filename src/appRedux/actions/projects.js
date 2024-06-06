import axios from "axios";
import { authToken } from "./Auth.js";

import algoliasearch from "algoliasearch";
import {
  PROJECTS_LOAD_ITEM,
  PROJECTS_LOADING,
  PROJECTS_GET_ITEMS,
  PROJECTS_EDIT_ITEM,
  PROJECTS_ADD_SUCCESS,
  PROJECTS_CATEGORY_LOAD_ITEM,
  PROJECTS_SUBCATEGORY_LOAD_ITEM,
  PROJECTS_OWNER_LOAD_ONE,
  PROJECTS_OWNER_LOAD_ITEM,
  PROJECTS_INVITE_AUTHOR,
  PROJECTS_AUTHOR_LOAD_ITEMS,
  PROJECT_AUTHOR_LOAD,
  PROJECTS_ASSOCIATE,
  ANNULATION_PROJECTS_ASSOCIATION,
  PROJECTS_ASSOCIATE_LOAD,
  PROJECTS_STUDENT_LOAD_MAIL,
  PROJECTS_GET_ALL_SUBMITTED,
  PROJECTS_STUDENT_LOAD,
  PROJECTS_STUDENT_LOAD_ALL,
  INVITE_EMAIL_PROJECT,
  PROJECTS_SEARCH_ITEMS,
  PROJECTS_INIT_SEARCH,
  PROJECTS_UPDATE_SEARCH_TEXT,
  PROJECT_UPDATE_PRICE,
  PROJECTS_STUDENTS_INVITED_LOAD,
  PROJECTS_HELPER_LOAD_ALL,
  PROJECTS_HELPER_LOAD,
  PROJECTS_INIT_CREATE,
  PROJECT_STUDENT_INIT,
  PROJECTS_GET_LAST_ITEMS,
  PROJECTS_GET_MOST_VIEWED,
  PROJECTS_GET_UNAVOIDABLES,
  AWS_PROJECTS_LOAD_ITEM,
  PROJECTS_GET_EXPERT_ARCHIVES,
  PROJECTS_GET_STUDENT_ARCHIVES,
  PROJECTS_GET_HELPER_ARCHIVES,
  PROJECTS_GET_ASSISTANT_ARCHIVES,
  PROJECT_AUTHORS_LOAD_ITEMS
} from "../../constants/ActionTypes";

const projectsUrl = process.env.REACT_APP_SPLIIK_API + "/projects";
const projectsAuthorUrl = process.env.REACT_APP_SPLIIK_API + "/assistant";
const apiProjectCategory =
  process.env.REACT_APP_SPLIIK_API + "/projects/categories";
const projectSubCategory =
  process.env.REACT_APP_SPLIIK_API + "/projects/subCategories";
const projectReader =
  process.env.REACT_APP_SPLIIK_API + "/projects/emailAuthor";
const projectAssociations =
  process.env.REACT_APP_SPLIIK_API + "/projects/associate";
const projectDissociate =
  process.env.REACT_APP_SPLIIK_API + "/projects/dissociate";
const readProjectAssociations =
  process.env.REACT_APP_SPLIIK_API + "/projects/projectsAssociation";
const projectToReject = projectsUrl + "/reject";
const projectsToPublish =
  process.env.REACT_APP_SPLIIK_API + "/projects/publish";
const projectToSubmit =
  process.env.REACT_APP_SPLIIK_API + "/projects/submit-project";
const projectStudent =
  process.env.REACT_APP_SPLIIK_API + "/projects/student-email";
const projectStartStudent = process.env.REACT_APP_SPLIIK_API + "/student/start";
const invitation = process.env.REACT_APP_SPLIIK_API + "/projects/inviteEmail";

const searchProject = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP,
  process.env.REACT_APP_ALGOLIA_API_KEY
);
const indexAlgolia = searchProject.initIndex(
  process.env.REACT_APP_ALGOLIA_INDEX
);

export const getProjects = () => dispatch => {
  return axios
    .get(
      process.env.REACT_APP_SPLIIK_API +
      "/projects?archive=false&online=true&q=",
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_GET_ITEMS,
        projects: res.data
      });
    });
};

export const getAllProjects = () => dispatch => {
  return axios.get(process.env.REACT_APP_SPLIIK_API + "/projects/all/projects");
  /*  .then(res => {
        dispatch({
            type: PROJECTS_GET_ALL_ITEMS,
            projects: res.data
            })
        }) */
};

export const getProjectId = slug => dispatch => {
  localStorage.setItem("idPro", slug);
};

export const loaderProject = flag => dispatch => {
  dispatch({
    type: PROJECTS_LOADING,
    loader: flag
  });
};

export const getProject = slug => dispatch => {
  if (slug) {
    return axios
      .get(`${projectsUrl}/${slug}`, authToken(localStorage.jwt))
      .then(res => {
        dispatch({
          type: PROJECTS_LOAD_ITEM,
          project: res.data,
          loader: false
        });
        return res.data;
      })
      .catch(() => {
        dispatch({
          type: PROJECTS_LOADING,
          loader: false
        });
        return null;
      });
  } else return null;
};

export const getSlugProject = seo => dispatch => {
  return axios.get(`${projectsUrl}${seo}`)
};

export const getAwsProject = slug => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (slug) {
    return (
      axios
        .get(
          `${projectsUrl}/cache/${slug}`,
          config,
          authToken(localStorage.jwt)
        )
        /*  .get(`https://spliik-app-local.s3.eu-west-3.amazonaws.com/${slug}.json`, config) */
        .then(res => {
          // The specified key does not exist.
          if (res.data.statusCode && res.data.statusCode === 400) {
            dispatch({
              type: AWS_PROJECTS_LOAD_ITEM,
              project: null
            });
          } else {
            dispatch({
              type: AWS_PROJECTS_LOAD_ITEM,
              project: res.data
            });
          }
          return res.data;
        })
        .catch(() => {
          dispatch({
            type: PROJECTS_LOADING,
            loader: false
          });
          return null;
        })
    );
  } else return null;
};

export const addProject = project => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify(project);
  return axios
    .post(`${projectsUrl}`, body, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: PROJECTS_ADD_SUCCESS,
        project: res.data
      });
    });
};

export const workshopDuplicate = slug => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .post(`${projectsUrl}/copy/${slug}`, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: PROJECTS_ADD_SUCCESS,
        project: res.data
      });
    });
};

export const studentWorkshopDuplicate = slug => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .post(
      `${process.env.REACT_APP_SPLIIK_API}/student/copy/${slug}`,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
    });
};

export const studentWorkshopDownload = slug => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .post(
      `${process.env.REACT_APP_SPLIIK_API}/student/download/${slug}`,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });

      return res
    });
};

export const editProject = item => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(item);
  try {
    return axios
      .put(
        `${projectsUrl}/${item.slug}`,
        body,
        config,
        authToken(localStorage.jwt)
      )
      .then(response => {
        const data = response.data;
        dispatch({
          type: PROJECTS_EDIT_ITEM,
          project: {
            slug: data.slug,
            title: data.title,
            description: data.description,
            archive: data.archive,
            resume: data.resume,
            categoy: data.categoy
          }
        });
      });
  } catch (e) { }
};

export const archiveProject = (project, archive) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ archive });
  try {
    return axios
      .put(
        `${projectsUrl}/archive/${project.slug}`,
        body,
        config,
        authToken(localStorage.jwt)
      )
      .then(res => {
        dispatch({
          type: PROJECTS_EDIT_ITEM,
          project: res.data
        });
      });
  } catch (e) { }
};

export const getProjectWithCategory = id => dispatch => {
  return axios.get(`${apiProjectCategory}/${id}`).then(res => {
    dispatch({
      type: PROJECTS_CATEGORY_LOAD_ITEM,
      projects: res.data
    });
  });
};

export const getProjectWithSubCategory = id => dispatch => {
  return axios.get(`${projectSubCategory}/${id}`).then(res => {
    dispatch({
      type: PROJECTS_SUBCATEGORY_LOAD_ITEM,
      projects: res.data
    });
  });
};

export const getProjectsOwner = () => dispatch => {
  return axios.get(`${projectsUrl}/owner/projects`).then(res => {
    dispatch({
      type: PROJECTS_OWNER_LOAD_ITEM,
      projects: res.data
    });
  });
};

export const getProjectOwner = slug => dispatch => {
  return axios.get(`${projectsUrl}/owner/project/${slug}`).then(res => {
    dispatch({
      type: PROJECTS_OWNER_LOAD_ONE,
      project_owner: res.data
    });
  });
};

export const inviteReaders = (
  slug, emails
  // { author1_email, author2_email, author3_email }
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ emails /* author1_email, author2_email, author3_email  */ });
  return axios
    .post(`${projectReader}/${slug}`, body, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: PROJECTS_INVITE_AUTHOR,
        author: res.data
      });
    });
};
export const getWorkshopReaders = (id_project) => dispatch => {
  return axios.get(`${projectsUrl}/authors/${id_project}`).then(res => {
    dispatch({
      type: PROJECT_AUTHORS_LOAD_ITEMS,
      project_authors: res.data
    });

    return res.data
  });


}
export const expertRemovesReader = (reader_id) => dispatch => {
  return axios.delete(`${projectsUrl}/remove-author/${reader_id}`, authToken(localStorage.jwt));
};


export const getProjectsAuthor = () => dispatch => {
  return axios.get(`${projectsAuthorUrl}/projects`).then(res => {
    dispatch({
      type: PROJECTS_AUTHOR_LOAD_ITEMS,
      projects_author: res.data
    });
  });
};

export const getProjectAuthor = slug => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .get(
      `${projectsAuthorUrl}/project/${slug}`,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECT_AUTHOR_LOAD,
        project_author: res.data
      });
    });
};

export const inviteStudents = (idProject, student_email) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ student_email });
  return axios
    .post(
      `${projectStudent}/${idProject}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD_MAIL,
        student_email: res.data
      });
    });
};

export const submitProject = project => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(project);
  return axios
    .put(
      `${projectToSubmit}/${project.slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_EDIT_ITEM,
        submitted_project: res.data
      });
    });
};

export const getSubmittedProjects = () => dispatch => {
  return axios.get(projectsUrl + "/all/submitted").then(res => {
    dispatch({
      type: PROJECTS_GET_ALL_SUBMITTED,
      projects: res.data
    });
  });
};

export const getExpertArchivedProjects = () => dispatch => {
  return axios.get(projectsUrl + "/expert/archives").then(res => {
    dispatch({
      type: PROJECTS_GET_EXPERT_ARCHIVES,
      expert_archives: res.data
    });
  });
};

export const getStudentArchivedProjects = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/student/archives`)
    .then(res => {
      dispatch({
        type: PROJECTS_GET_STUDENT_ARCHIVES,
        student_archives: res.data
      });
    });
};

export const getHelperArchivedProjects = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/helper/archives`)
    .then(res => {
      dispatch({
        type: PROJECTS_GET_HELPER_ARCHIVES,
        helper_archives: res.data
      });
    });
};

export const getAssistantArchivedProjects = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/assistant/archives`)
    .then(res => {
      dispatch({
        type: PROJECTS_GET_ASSISTANT_ARCHIVES,
        assistant_archives: res.data
      });
    });
};

export const publishProject = (slug, online) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ online });
  return axios
    .put(
      `${projectsToPublish}/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_EDIT_ITEM,
        project: res.data
      });
    });
};

export const rejectProject = (
  slug,
  submitted_project,
  comment_rejected
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ submitted_project, comment_rejected });
  return axios
    .put(
      `${projectToReject}/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_EDIT_ITEM,
        project: res.data
      });
    });
};

export const associateProjects = (slug_project1, slug_project2) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ slug_project1, slug_project2 });
  return axios
    .post(`${projectAssociations}`, body, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: PROJECTS_ASSOCIATE,
        projectAssociate: res.data
      });
    });
};

export const dissociateProjects = (
  slug_project1,
  slug_project2
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ slug_project2 });
  return axios
    .post(
      `${projectDissociate}/${slug_project1}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: ANNULATION_PROJECTS_ASSOCIATION,
        annulateAssociation: res.data
      });
    });
};

export const readProjectAssociate = slug => dispatch => {
  return axios.get(`${readProjectAssociations}/${slug}`).then(res => {
    dispatch({
      type: PROJECTS_ASSOCIATE_LOAD,
      projectsAssociate: res.data
    });
  });
};

export const studentStartsProject = (slug, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ token: token });
  return axios
    .post(
      `${projectStartStudent}/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
      return res.data;
    });
};

export const getProjectsStudent = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/student/projects`)
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD_ALL,
        projects_student: res.data
      });
    });
};

export const getProjectStudent = slug => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/student/projects/${slug}`)
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
    });
};

export const getProjectSpecifiedStudent = (slug, student_id) => dispatch => {
  return axios
    .get(
      `${process.env.REACT_APP_SPLIIK_API}/student/projects/${slug}/of/${student_id}`
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
    });
};

export const getProjectsHelper = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/helper/projects`)
    .then(res => {
      dispatch({
        type: PROJECTS_HELPER_LOAD_ALL,
        projects_helper: res.data
      });
    });
};

export const getProjectHelper = slug => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_SPLIIK_API}/helper/projects/${slug}`)
    .then(res => {
      dispatch({
        type: PROJECTS_HELPER_LOAD,
        project_helper: res.data
      });
    });
};

export const emailInvite = (slug, inviteEmail) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ inviteEmail });
  return axios
    .post(`${invitation}/${slug}`, body, config, authToken(localStorage.jwt))
    .then(res => {
      dispatch({
        type: INVITE_EMAIL_PROJECT,
        invitationProject: res.data
      });
    });
};

export const emailInviteHelper = (slug, emailHelper) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ emailHelper });
  return axios
    .post(
      `${projectsUrl}/invite-helper/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: INVITE_EMAIL_PROJECT,
        invitationProject: res.data
      });
    });
};

export const initSearchProjects = () => dispatch => {
  dispatch({
    type: PROJECTS_INIT_SEARCH
  });
};
export const initProjectStudent = () => dispatch => {
  dispatch({
    type: PROJECT_STUDENT_INIT
  });
};
export const updateSearchText = query => dispatch => {
  dispatch({
    type: PROJECTS_UPDATE_SEARCH_TEXT,
    searchText: query
  });
};
export const searchProjects = title => dispatch => {
  initSearchProjects();
  return new Promise((revolve, reject) => {
    indexAlgolia.search(
      {
        query: title //filters: 'archived:false OR archived:null'
      },
      (err, { hits }) => {
        if (err) {
          console.log(err);
          reject();
          return;
        }
        dispatch({
          type: PROJECTS_SEARCH_ITEMS,
          foundProjects: hits,
          searchText: title
        });
        revolve();
      }
    );
  });
};

export const studentArchivesProject = (slug, archive) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ archive });
  return axios
    .put(
      `${process.env.REACT_APP_SPLIIK_API}/student/archive/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
    });
};

export const helperArchivesProject = (slug, archive) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ archive });
  return axios
    .put(
      `${process.env.REACT_APP_SPLIIK_API}/helper/archive/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_HELPER_LOAD,
        project_helper: res.data
      });
    });
};

export const assistantArchivesProject = (slug, archive) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ archive });
  return axios
    .put(
      `${process.env.REACT_APP_SPLIIK_API}/assistant/archive/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECT_AUTHOR_LOAD,
        project_author: res.data
      });
    });
};

export const studentFinalizesProject = slug => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios
    .put(
      `${process.env.REACT_APP_SPLIIK_API}/student/finalize/${slug}`,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENT_LOAD,
        project_student: res.data
      });
    });
};

export const getProjectPrice = project => dispatch => {
  dispatch({
    type: PROJECT_UPDATE_PRICE,
    project_price: project
  });
};

export const studentsInvitedToProject = project_id => dispatch => {
  return axios
    .get(`${projectsUrl}/students-invited/${project_id}`)
    .then(res => {
      dispatch({
        type: PROJECTS_STUDENTS_INVITED_LOAD,
        project_students_invited: res.data
      });
    });
};

export const emailInviteStudent = (slug, student_email) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ student_email });
  return axios
    .post(
      `${projectsUrl}/inviteStudentEmail/${slug}`,
      body,
      config,
      authToken(localStorage.jwt)
    )
    .then(res => {
      dispatch({
        type: INVITE_EMAIL_PROJECT,
        invitationProject: res.data
      });
    });
};

export const initCreateProject = () => dispatch => {
  dispatch({
    type: PROJECTS_INIT_CREATE
  });
};

export const getLastProjects = () => dispatch => {
  return axios
    .get(process.env.REACT_APP_SPLIIK_API + "/projects/last/4")
    .then(res => {
      dispatch({
        type: PROJECTS_GET_LAST_ITEMS,
        last_projects: res.data
      });
    });
};
export const getMostViewed = () => dispatch => {
  return axios
    .get(process.env.REACT_APP_SPLIIK_API + "/projects/most-viewed/4")
    .then(res => {
      dispatch({
        type: PROJECTS_GET_MOST_VIEWED,
        most_viewed_projects: res.data
      });
    });
};

export const getUnavoidables = () => dispatch => {
  return axios
    .get(process.env.REACT_APP_SPLIIK_API + "/projects/unavoidables/4")
    .then(res => {
      dispatch({
        type: PROJECTS_GET_UNAVOIDABLES,
        unavoidable_projects: res.data
      });
    });
};
