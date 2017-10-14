import React,{Component} from 'react';
import {fetchReview} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';
import CircularProgressbar from 'react-circular-progressbar';
import CreateReview from './CreateReview';
import LoadingModule from './LoadingModule';


class ReviewDisplay extends Component {

  componentDidMount() {
    const {reviewID} = this.props;
    this.props.fetchReview(reviewID);
  }

  handleClickOutside(evt) {
    this.props.reviewDone();
  }

  render() {
    const {authorizedUser, review} = this.props;
    if(!review)
    return(<div className="editingContainer robot"><LoadingModule text={"Loading Reviews"}/></div>);
    else
    {
      if(authorizedUser && authorizedUser._id != null)
          if(authorizedUser._id !== review._user)
            return(<div className="editingContainer reviewDisplay robot">
                  <div className="theReview">
                        <div className="reviewHeader">
                          <h6 className="rLeft">{review.title}</h6>
                          <h6 className="rRight">{new Date(review.dateReviewed).toDateString()}</h6>
                        </div>
                        <div className="quickStats"><h6>{review.reviewName}</h6></div>
                        <div className="reviewBody">
                          <p>{review.body}</p>
                        </div>
                  </div>
                  <div className="reviewBottom">
                      <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Overall ${percentage/10}`}
                      percentage={review.ratingOverall * 10} />
                      <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Durability ${percentage/10}`}
                      percentage={review.ratingDurability * 10} />
                      <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Traction ${percentage/10}`}
                      percentage={review.ratingTraction * 10} />
                      <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Protection ${percentage/10}`}
                      percentage={review.ratingProtection * 10} />
                      <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Touch ${percentage/10}`}
                      percentage={review.ratingTouch * 10} />
                  </div>
                  <button type="button"
                    onClick={() => this.props.reviewDone()}
                    className="btn"
                    data-toggle="tooltip"
                    title="Back"
                    data-placement="auto">
                    <span className="fa fa-backward fa-lg" aria-hidden="true">
                  </span></button>
                </div>);
              else
              {
              return(<div><CreateReview reviewID={this.props.reviewID} alreadyHaveValues={true} bootname={this.props.bootname}
                                        bootbrand={this.props.bootbrand} reviewDone={this.props.reviewDone} /></div>);
              }
        }
  }
}

//this.props === ownprops
//ownprops is the props object headed to this component
function mapStateToProps(state, ownProps) {
  return {review: state.activeReviewList[ownProps.reviewID],
          authorizedUser: state.authorizedUser};
}

ReviewDisplay = onClickOutside(ReviewDisplay);
export default connect(mapStateToProps,{fetchReview})(ReviewDisplay);
