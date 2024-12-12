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

//Get tickets list
export const getticketslist = (seachproduct, page) => ({
    type: GET_TICKET_LIST,
    payload: { seachproduct, page }
})

export const getticketslistSuccess = (seachproduct) => ({
    type: GET_TICKET_LIST_SUCCESS,
    payload: seachproduct,
})

export const getticketslistFail = (error) => ({
    type: GET_TICKET_LIST_FAIL,
    payload: error,
})
//Create ticket
export const createticketlist = (ticketsdata) => {
    return {
        type: CREATE_TICKET,
        payload: ticketsdata,
    }
}

export const createticketlistSuccess = (ticketsdata) => ({
    type: CREATE_TICKET_SUCCESS,
    payload: ticketsdata,
})

export const createticketlistFail = (error) => ({
    type: CREATE_TICKET_FAIL,
    payload: error,
})
//SHOW TICKET
export const showticketList = (ticketid) => ({
    type: SHOW_TICKET_LIST,
    payload: ticketid
})

export const showticketListSuccess = (tickets) => ({
    type: SHOW_TICKET_LIST_SUCCESS,
    payload: tickets,
})

export const showticketListFail = (error) => ({
    type: SHOW_TICKET_LIST_FAIL,
    payload: error,
})