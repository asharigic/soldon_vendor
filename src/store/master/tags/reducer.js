import {
    GET_TAGS_DROP_DOWN_LIST,
    GET_TAGS_DROP_DOWN_LIST_SUCCESS,
    GET_TAGS_DROP_DOWN_LIST_FAIL,
    ADD_NEW_TAG,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAIL,
} from "./actionTypes";

const initialState = {
    tags: [],
    tagsloading: false,
    tagserror: null,
    successtag:false,
    loading:false
}

const TagsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Tags Drop Down List
        case GET_TAGS_DROP_DOWN_LIST:
            return {
                ...state,
                tags: action.payload,
                loading: true
            };
        case GET_TAGS_DROP_DOWN_LIST_SUCCESS:
            return {
                ...state,
                tags: action.payload,
                loading: false
            };

        case GET_TAGS_DROP_DOWN_LIST_FAIL:
            return {
                ...state,
                tagserror: action.payload,
                loading: false
            };
        //Add Tag
        case ADD_NEW_TAG:
            return {
                ...state,
                tagsloading: true,
            };

        case ADD_TAG_SUCCESS:
            return {
                ...state,
                tagsloading: false,
                showtags: action.payload.tags,
                successtag: true
            };

        case ADD_TAG_FAIL:
            return {
                ...state,
                tagsloading: false,
                successtag: false,
                tagserror: action.payload,
            };
        default:
            state = { ...state }
    }
    return state
};

export default TagsReducer;