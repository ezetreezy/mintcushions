import {LOGIN_MESSAGE_ERROR,
        LOGIN_MESSAGE_SUCCESS,
        SIGNUP_MESSAGE_SUCCESS,
        SIGNUP_MESSAGE_ERROR,
        PAYMENT_MESSAGE_SUCCESS,
        PAYMENT_MESSAGE_ERROR,
        UPDATE_MESSAGE_SUCCESS,
        UPDATE_MESSAGE_ERROR,
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
        case CUSTOM_MESSAGE:
        return {message: action.payload};
        case CLEAR_MESSAGE:
        return {message: "Empty"};
        default:
        return state;
      }


}
