//actions.js

import {
    GET_TICKET_LIST,
    GET_TICKET_LIST_SUCCESS,
    GET_TICKET_LIST_FAIL,
    CREATE_TICKET,
    CREATE_TICKET_SUCCESS,
    CREATE_TICKET_FAIL,
    SHOW_TICKET_LIST,
    SHOW_TICKET_LIST_SUCCESS,
    SHOW_TICKET_LIST_FAIL

} from "./actionType";

const initialState = {
    getticketlists: [],
    createticket: null,
    showticketlist: null,
    ticketloading: false,
    ticketerror: null,
    successticket: false,

}

const TicketReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Ticket List
        case GET_TICKET_LIST:
            return {
                ...state,
                ticketloading: true,
                ticketerror: null,
                successticket: false,
            };
        case GET_TICKET_LIST_SUCCESS:
            return {
                ...state,
                ticketloading: false,
                getticketlists: action.payload,
                successticket: true,
            };

        case GET_TICKET_LIST_FAIL:
            return {
                ...state,
                ticketerror: action.payload,
                ticketloading: false
            };
        //create ticket
        case CREATE_TICKET:
            return {
                ...state,
                ticketloading: true
            };

        case CREATE_TICKET_SUCCESS:
            return {
                ...state,
                ticketloading: false,
                createticket: action.payload,
                successticket: true
            };

        case CREATE_TICKET_FAIL:
            return {
                ...state,
                ticketloading: false,
                ticketerror: action.payload,
                successticket: false,
            };
        //show Ticket List
        case SHOW_TICKET_LIST:
            return {
                ...state,
                ticketloading: true,
                ticketerror: null,
                successticket: false,
            };
        case SHOW_TICKET_LIST_SUCCESS:
            return {
                ...state,
                ticketloading: false,
                showticketlist: action.payload,
                successticket: true,
            };

        case SHOW_TICKET_LIST_FAIL:
            return {
                ...state,
                ticketerror: action.payload,
                ticketloading: false
            };

        default:
            state = { ...state }
    }
    return state
};

export default TicketReducer;

