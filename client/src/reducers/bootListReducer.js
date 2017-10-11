import {FETCH_BOOTS, FETCH_BOOT} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action)
{
      switch(action.type)
      {
        case FETCH_BOOT:
        return {...state, [action.payload.name]: action.payload};
        case FETCH_BOOTS:
        return _.mapKeys(action.payload, 'name');
        default:
        return state;
      }


}
