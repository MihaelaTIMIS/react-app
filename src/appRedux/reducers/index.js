import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from './authReducer';
import projectsReducer from './projectsReducer'
import exercicesReducer from './exercicesReducer'
import Settings from "./Settings";
import categoryReducer from "./categoryReducer";
import opinionReducer from "./opinionReducer";
import usersReducer from "./usersReducer";
import threadsReducer from "./threadsReducer"
import subCategoryReducer from "./subCategoryReducer";
import screenReducer from "./screenReducer";

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth: authReducer,
    projects: projectsReducer,
    exercices: exercicesReducer,
    categories: categoryReducer,
    opinion: opinionReducer,
    user: usersReducer,
    threads: threadsReducer,
    subCategories: subCategoryReducer,
    screen: screenReducer
});

export default reducers;