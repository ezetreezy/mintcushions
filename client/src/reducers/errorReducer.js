import {LOGIN_MESSAGE_ERROR,
        LOGIN_MESSAGE_SUCCESS,
        SIGNUP_MESSAGE_SUCCESS,
        SIGNUP_MESSAGE_ERROR,
        PAYMENT_MESSAGE_SUCCESS,
        PAYMENT_MESSAGE_ERROR,
        UPDATE_MESSAGE_SUCCESS,
        UPDATE_MESSAGE_ERROR,
        SUBMIT_REVIEW_MESSAGE_SUCCESS,
        SUBMIT_REVIEW_MESSAGE_ERROR,
        SUBMIT_REVIEW_EDIT_MESSAGE_SUCCESS,
        SUBMIT_REVIEW_EDIT_MESSAGE_ERROR,
        ERROR_DELETE_REVIEW,
        SUCCESSFUL_DELETE_REVIEW,
        CLEAR_MESSAGE,
        CUSTOM_MESSAGE} from '../actions/types';

export default function(state = {message: "Empty"}, action)
{

      switch(action.type)
      {
        case LOGIN_MESSAGE_ERROR:
        return {message: "Error: Email/Password mismatch"};
        case LOGIN_MESSAGE_SUCCESS:
        return {message: "Successful Login"};
        case SIGNUP_MESSAGE_SUCCESS:
        return {message: "Successful Sign Up"};
        case SIGNUP_MESSAGE_ERROR:
        return {message: "Sorry, that email address is unavailable"};
        case PAYMENT_MESSAGE_SUCCESS:
        return {message: "Payment Successful: Features Added!"};
        case PAYMENT_MESSAGE_ERROR:
        return {message: "Error: The payment failed!"};
        case UPDATE_MESSAGE_SUCCESS:
        return {message: "Update Successful"};
        case UPDATE_MESSAGE_ERROR:
        return {message: "Error: The update failed!"};
        case SUBMIT_REVIEW_MESSAGE_SUCCESS:
        return {message: "Successful Review Posted!"};
        case SUBMIT_REVIEW_MESSAGE_ERROR:
        return {message: "Sorry, there was an error in posting that review."};
        case SUBMIT_REVIEW_EDIT_MESSAGE_SUCCESS:
        return {message: "Successfully Edited Review!"};
        case SUBMIT_REVIEW_EDIT_MESSAGE_ERROR:
        return {message: "Sorry, there was an error in editing review."};
        case SUCCESSFUL_DELETE_REVIEW:
        return {message: "Successfully Deleted Review!"};
        case ERROR_DELETE_REVIEW:
        return {message: "Sorry, there was an error in deleting that review"};
        case CUSTOM_MESSAGE:
        return {message: action.payload};
        case CLEAR_MESSAGE:
        return {message: "Empty"};
        default:
        return state;
      }


}
