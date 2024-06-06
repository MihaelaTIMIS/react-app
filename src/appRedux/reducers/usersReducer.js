import {
    USER_GET_ITEMS,
    USER_UPDATE_ITEM,
    USER_PROFILE_UPDATE_ITEM,
    ACTIVE_USER,
    USER_INFO_PROFILE,
    OWNER_INFO_PROFILE,
    USER_FOLLOWER,
    ANNULATION_FOLLOW,
    USER_FOLLOWED,
    PASSWORD_FORGOT,
    RESET_PASSWORD,
    USER_EARNINGS
} from '../../constants/ActionTypes';

const initialState = {
    user: null,
    earnings: {sum: "-"},
    userActive: null,
    profileOwner:null,
    loaderOwner:false,
    profileUser: null,
    followUser: null,
    annulateFollow: null,
    userFollowed: null,
    passwordForgotUser: null,
    passwordReset: null,
    resStatus: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case USER_GET_ITEMS:
            return {
                ...state,
                user: action.user
            };
        case USER_UPDATE_ITEM:
            return {
                lastname: action.user.lastname,
                firstname: action.user.firstname,
                pseudo: action.user.pseudo,
                headline: action.user.headline
            }  
            case USER_PROFILE_UPDATE_ITEM:
                return {
                    lastname: action.user.lastname,
                    firstname: action.user.firstname,
                    pseudo: action.user.pseudo,
                    headline: action.user.headline
                }  
            case ACTIVE_USER:
                return {
                    ...state,
                    userActive: action.userActive
                };  
                case USER_INFO_PROFILE:
                    return {
                        ...state,
                        profileUser: action.profileUser
                    }
                case OWNER_INFO_PROFILE:
                    return {
                        ...state,
                        profileOwner: action.profileOwner,
                        loaderOwner: action.loaderOwner
                    }
                case USER_FOLLOWER:
                    return {
                        ...state,
                        followUser: action.followUser
                    } 
                case ANNULATION_FOLLOW:
                    return {
                        ...state,
                        annulateFollow: action.annulateFollow
                    } 
                case USER_FOLLOWED:
                    return {
                        ...state,
                        userFollowed: action.userFollowed
                    }
                case PASSWORD_FORGOT:
                    return {
                        ...state,
                        passwordForgotUser: action.passwordForgotUser
                    } 
                case RESET_PASSWORD:
                    return {
                        ...state,
                        passwordReset: action.passwordReset,
                        resStatus: action.resStatus,
                    }     
                case USER_EARNINGS:
                    return {
                        ...state,
                        earnings: action.earnings
                    }     
        default:
            return state;
    }
}