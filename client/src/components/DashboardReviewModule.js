import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserReviews} from '../actions/index';
import _ from 'lodash';
import LoadingModule from './LoadingModule';

class DashboardReviewModule extends Component{

  componentDidMount(){
    this.props.fetchUserReviews();
  }

  renderReviews(){
    return _.map(this.props.reviewList, review => {
      return (
        <li className="list-group-item list-group-item-action flex-column align-items-start" key={review._reviewID}>
          <div className="reviewLeft">
            <h5>{review.title + " "}</h5>
            <small>{review.bootbrand + " " + review.bootname}</small>
          </div>
          <div className="reviewRight">
            <h6>Overall Rating: {review.ratingOverall}</h6>
            <small>{new Date(review.dateReviewed).toDateString()}</small>
          </div>
          <div className="reviewBody">
          {review.body}
          </div>
        </li>
      );
    })
  }

  render(){
    const {reviewList, authorizedUser} = this.props;
    if(!authorizedUser)
    return(<div><LoadingModule text={"Loading User Credientials"}/></div>);
    else
    {
    var reviews = authorizedUser.numberofReviews !== 1 ? " Reviews" : " Review";
    return(<div>
      <div className="reviewsDashboardInfo">
            <h4>Reviews</h4>
            <small>{authorizedUser.numberofReviews + reviews}</small>
        </div>
      {!reviewList ?   <LoadingModule text={"Loading Reviews"}/> : this.renderReviews()}
      </div>);
  }
  }

}

function mapStateToProps(state){
  return {reviewList: state.activeUserReviewList,
          authorizedUser: state.authorizedUser};
}

export default connect(mapStateToProps, {fetchUserReviews})(DashboardReviewModule);
