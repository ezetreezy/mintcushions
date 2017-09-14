import {FETCH_USER} from '../actions/types';

export default function(state = null, action)
{
      //"" || false = if we are logged out -> return false
      //action.payload is our user model
      switch(action.type)
      {
        case FETCH_USER:
        return action.payload || false;
        default:
        return state;
      }


}
