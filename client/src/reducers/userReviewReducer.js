import {FETCH_USER_REVIEWS} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action)
{
      switch(action.type)
      {
        case FETCH_USER_REVIEWS:
        //array of posts objects coming in -> [{'id': 3, 'title': "eee"},{'id':2, 'title" :"ee"}]
        //_.mapKeys(array of objects, property we want to pull to act as key)
        //->turns into {'3':{'id': 3, 'title': "hi"} }
        return _.mapKeys(action.payload, 'dateReviewed');
        default:
        return state;
      }


}
