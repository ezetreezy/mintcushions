import React,{Component} from 'react';
import {fetchReview} from '../actions';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import CreateReview from './CreateReview';
import LoadingModule from './LoadingModule';
import Review from './Review';


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
    if(authorizedUser && authorizedUser._id != null){

            if(authorizedUser._id !== review._user)
            return(<Review review={review} reviewDone={this.props.reviewDone}/>);
            else
            return(<CreateReview reviewID={this.props.reviewID} alreadyHaveValues={true} bootname={this.props.bootname}
                                          bootbrand={this.props.bootbrand} reviewDone={this.props.reviewDone} />); }
    else
    return(<Review review={review} reviewDone={this.props.reviewDone}/>);

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
