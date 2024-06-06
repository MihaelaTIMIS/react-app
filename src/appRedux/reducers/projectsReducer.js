import {
  PROJECTS_GET_ITEMS,
  PROJECTS_LOAD_ITEM,
  PROJECTS_LOADING,
  PROJECTS_ADD_ITEM,
  PROJECTS_UPDATE,
  PROJECTS_GET_ALL_ITEMS,
  PROJECTS_CATEGORY_LOAD_ITEM,
  PROJECTS_SUBCATEGORY_LOAD_ITEM,
  LOADING_FILE,
  PROJECTS_ADD_SUCCESS,
  PROJECTS_OWNER_LOAD_ONE,
  PROJECTS_OWNER_LOAD_ITEM,
  PROJECTS_INVITE_AUTHOR,
  PROJECT_AUTHOR_LOAD,
  PROJECTS_AUTHOR_LOAD_ITEMS,
  PROJECTS_STUDENT_LOAD_MAIL,
  PROJECTS_GET_ALL_SUBMITTED,
  ANNULATION_PROJECTS_ASSOCIATION,
  PROJECTS_ASSOCIATE_LOAD,
  PROJECTS_STUDENT_LOAD,
  PROJECTS_STUDENT_LOAD_ALL,
  INVITE_EMAIL_PROJECT,
  EMAIL_REFUSED_PROJECT,
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
  PROJECTS_DELETE_VIDEO,
  AWS_PROJECTS_LOAD_ITEM,
  PROJECTS_GET_EXPERT_ARCHIVES,
  PROJECTS_GET_STUDENT_ARCHIVES,
  PROJECTS_GET_HELPER_ARCHIVES,
  PROJECTS_GET_ASSISTANT_ARCHIVES,
  PROJECT_AUTHORS_LOAD_ITEMS
} from "../../constants/ActionTypes";

const initialState = {
  item: null,
  items: [],
  project: null,
  aws_project: null,
  project_price: null,
  projects: [],
  loading: false,
  loader: false,
  file: null,
  author: null,
  student_email: "",
  submitted_projects: [],
  annulateAssociation: null,
  projectsAssociate: [],
  project_student: null,
  projects_student: [],
  project_helper: null,
  projects_helper: [],
  invitationProject: null,
  projectRefused: null,
  foundProjects: [],
  searchText: "",
  project_students_invited: [],
  student_payed_project: false,
  last_projects: [],
  most_viewed_projects: [],
  unavoidable_projects: [],
  slug_project_student: null,
  project_author: null,
  projects_author: [],
  project_owner: null,
  expert_archives: [],
  student_archives: [],
  helper_archives: [],
  assistant_archives: [],
  project_authors: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROJECTS_GET_ITEMS:
      return {
        ...state,
        projects: action.projects
      };
    case PROJECTS_GET_ALL_ITEMS:
      return {
        ...state,
        projects: action.projects
      };
    case PROJECTS_CATEGORY_LOAD_ITEM:
      return {
        ...state,
        projects: action.projects
      };
    case PROJECTS_SUBCATEGORY_LOAD_ITEM:
      return {
        ...state,
        projects: action.projects
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loader: action.loader
      };
    case PROJECTS_LOAD_ITEM:
      return {
        ...state,
        project: action.project,
        loader: action.loader
      };
    case PROJECTS_ADD_SUCCESS:
      return {
        ...state,
        item: action.item,
        project: action.project
      };
    case PROJECTS_ADD_ITEM:
      return {
        ...state,
        items: [action.projects, ...state.items]
      };
    case LOADING_FILE:
      return {
        ...state,
        file: action.file
      };
    case PROJECTS_UPDATE:
      return {
        slug: action.slug,
        title: action.project.title,
        description: action.project.description,
        archive: action.project.archive,
        resume: action.project.resume,
        category: action.category
      };
    case PROJECTS_OWNER_LOAD_ONE:
      return {
        ...state,
        project_owner: action.project_owner
      };
    case PROJECTS_OWNER_LOAD_ITEM:
      return {
        ...state,
        projects: action.projects
      };
    case PROJECTS_INVITE_AUTHOR:
      return {
        ...state,
        author: action.author
      };
    case PROJECTS_AUTHOR_LOAD_ITEMS:
      return {
        ...state,
        projects_author: action.projects_author
      };
    case PROJECT_AUTHORS_LOAD_ITEMS:
      return {
        ...state,
        project_authors: action.project_authors
      };
    case PROJECT_AUTHOR_LOAD:
      return {
        ...state,
        project_author: action.project_author
      };
    case PROJECTS_STUDENT_LOAD:
      return {
        ...state,
        project_student: action.project_student
      };

    case PROJECTS_STUDENT_LOAD_ALL:
      return {
        ...state,
        projects_student: action.projects_student
      };

    case PROJECTS_STUDENT_LOAD_MAIL:
      return {
        ...state,
        student_email: action.student_email
      };

    case PROJECTS_HELPER_LOAD_ALL:
      return {
        ...state,
        projects_helper: action.projects_helper
      };
    case PROJECTS_HELPER_LOAD:
      return {
        ...state,
        project_helper: action.project_helper
      };
    case PROJECTS_GET_ALL_SUBMITTED:
      return {
        ...state,
        submitted_projects: action.projects
      };
    case ANNULATION_PROJECTS_ASSOCIATION:
      return {
        ...state,
        annulateAssociation: action.annulateAssociation
      };
    case PROJECTS_ASSOCIATE_LOAD:
      return {
        ...state,
        projectsAssociate: action.projectsAssociate
      };
    case INVITE_EMAIL_PROJECT:
      return {
        ...state,
        invitationProject: action.invitationProject
      };

    case EMAIL_REFUSED_PROJECT:
      return {
        ...state,
        projectRefused: action.projectRefused
      };
    case PROJECTS_SEARCH_ITEMS:
      return {
        ...state,
        foundProjects: action.foundProjects,
        searchText: action.searchText
      };
    case PROJECTS_INIT_SEARCH:
      return {
        ...state,
        foundProjects: [],
        searchText: null
      };
    case PROJECTS_UPDATE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      };
    case PROJECT_UPDATE_PRICE:
      return {
        ...state,
        project_price: action.project_price
      };
    case PROJECTS_STUDENTS_INVITED_LOAD:
      return {
        ...state,
        project_students_invited: action.project_students_invited
      };
    case PROJECTS_INIT_CREATE:
      return {
        ...state,
        project: null
      };
    case PROJECT_STUDENT_INIT:
      return {
        ...state,
        project_student: null
      };
    case PROJECTS_GET_LAST_ITEMS:
      return {
        ...state,
        last_projects: action.last_projects
      };
    case PROJECTS_GET_MOST_VIEWED:
      return {
        ...state,
        most_viewed_projects: action.most_viewed_projects
      };
    case PROJECTS_GET_UNAVOIDABLES:
      return {
        ...state,
        unavoidable_projects: action.unavoidable_projects
      };
    case PROJECTS_DELETE_VIDEO:
      return {
        ...state,
        project: { ...state.project, video1: null }
      };
    case AWS_PROJECTS_LOAD_ITEM:
      return {
        ...state,
        aws_project: action.project,
        loader: action.loader
      };
    case PROJECTS_GET_EXPERT_ARCHIVES:
      return {
        ...state,
        expert_archives: action.expert_archives
      };
    case PROJECTS_GET_STUDENT_ARCHIVES:
      return {
        ...state,
        student_archives: action.student_archives
      };
    case PROJECTS_GET_HELPER_ARCHIVES:
      return {
        ...state,
        helper_archives: action.helper_archives
      };
    case PROJECTS_GET_ASSISTANT_ARCHIVES:
      return {
        ...state,
        assistant_archives: action.assistant_archives
      };
    default:
      return state;
  }
}
