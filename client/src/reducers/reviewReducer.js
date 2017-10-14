import {FETCH_REVIEWS, FETCH_REVIEW} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action)
{
      switch(action.type)
      {
        case FETCH_REVIEW:
            ///...state (take all previous reviews we have fetched previously and put them into a new object)
            //const review = action.payload (the single review we want)
            //const newState = {...state};
            //newState[review._reviewID] = review
        return {...state, [action.payload._reviewID]: action.payload};
        case FETCH_REVIEWS:
        //array of posts objects coming in -> [{'id': 3, 'title': "eee"},{'id':2, 'title" :"ee"}]
        //_.mapKeys(array of objects, property we want to pull to act as key)
        //->turns into {'3':{'id': 3, 'title': "hi"} }
        return _.mapKeys(action.payload, '_reviewID');
        default:
        return state;
      }


}
