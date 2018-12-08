import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoot, fetchReviews } from '../actions';
import _ from 'lodash';
import Chart from './Chart';
import CircularProgressbar from 'react-circular-progressbar';
import LoadingModule from './LoadingModule';

class BootDisplay extends Component {
  componentDidMount() {
    const { bootbrand, bootname } = this.props;
    this.props.fetchBoot(bootbrand, bootname);
    this.props.fetchReviews(bootbrand, bootname);
  }
  renderBootHeader() {
    const { boot, authorizedUser, activeReviewList } = this.props;

    let disabled = '';
    if (!_.isEmpty(activeReviewList) && authorizedUser != null) {
      var keys = Object.keys(activeReviewList);
      var filtered = keys.filter(function(key) {
        if (authorizedUser._id === activeReviewList[key]._user) disabled = 'disabled';
      });
    }

    return (
      <div className="boothub">
        <div className="bootinfoContainer">
          <h6>{boot.brand}</h6>
          <h3>{boot.name}</h3>
        </div>
        <button
          disabled={disabled}
          type="button"
          onClick={
            authorizedUser
              ? () => this.props.reviewEditing()
              : () => this.props.history.push('/login')
          }
          className="btn"
          data-toggle="tooltip"
          title="Review"
          data-placement="auto"
        >
          <span className="fa fa-commenting fa-lg" aria-hidden="true" />
        </button>
      </div>
    );
  }

  renderBootStats() {
    const { activeReviewList, bootname, boot } = this.props;

    if (!_.isEmpty(activeReviewList)) {
      const traction = Object.keys(activeReviewList).map(trac => {
        return activeReviewList[trac].ratingTraction;
      });
      const durability = Object.keys(activeReviewList).map(durab => {
        return activeReviewList[durab].ratingDurability;
      });
      const touch = Object.keys(activeReviewList).map(tou => {
        return activeReviewList[tou].ratingTouch;
      });
      const protection = Object.keys(activeReviewList).map(prot => {
        return activeReviewList[prot].ratingProtection;
      });
      const overall = Object.keys(activeReviewList).map(over => {
        return activeReviewList[over].ratingOverall;
      });

      return (
        <div>
          <div className="dataCircleContainer robot">
            <CircularProgressbar
              strokeWidth={6}
              className="circData"
              textForPercentage={percentage => `Overall Rating ${percentage / 10}`}
              percentage={
                overall.length > 0
                  ? Math.round((overall.reduce(getSum) / overall.length) * 10)
                  : 0
              }
            />

            <div className="bootTable">
              {/* <img src={require('../Assets/superfly3.png')} />*/}
              <table className="table table-striped table-hover table-sm table-responsive">
                <tbody>
                  <tr>
                    <td>
                      <small>Price:</small>
                    </td>
                    <td>
                      <small>{'$ ' + boot.price}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>Release:</small>
                    </td>
                    <td>
                      <small>{boot.release}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>Pattern:</small>
                    </td>
                    <td>
                      <small>{boot.pattern}</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CircularProgressbar
              strokeWidth={6}
              className="circData"
              textForPercentage={percentage => `${percentage} Reviews`}
              percentage={overall.length}
            />
          </div>
          <div className="quickStats">
            <h6> STATS </h6>
          </div>
          <div className="chartContainer robot">
            <Chart
              avg={
                traction.length > 0
                  ? Math.round(traction.reduce(getSum) / traction.length)
                  : 0
              }
              bar={false}
              styling="charts"
              stat="Traction"
              data={traction}
              color="#7B68EE"
              textColor="#7B68EE"
            />

            <Chart
              avg={
                durability.length > 0
                  ? Math.round(durability.reduce(getSum) / durability.length)
                  : 0
              }
              bar={false}
              styling="rest"
              stat="Durability"
              data={durability}
              color="#00BFFF"
              textColor="#00BFFF"
            />

            <Chart
              avg={touch.length > 0 ? Math.round(touch.reduce(getSum) / touch.length) : 0}
              bar={false}
              styling="rest"
              stat="Touch"
              data={touch}
              color="#483D8B"
              textColor="#483D8B"
            />

            <Chart
              avg={
                protection.length > 0
                  ? Math.round(protection.reduce(getSum) / protection.length)
                  : 0
              }
              bar={false}
              styling="rest"
              stat="Protection"
              data={protection}
              color="#FF6347"
              textColor="#FF6347"
            />
          </div>
        </div>
      );
    } else
      return (
        <div>
          <div className="dataCircleContainer robot">
            <h4>No Reviews</h4>

            <div className="bootTable">
              <table className="table table-striped table-hover table-sm table-responsive">
                <tbody>
                  <tr>
                    <td>
                      <small>Price:</small>
                    </td>
                    <td>
                      <small>{'$ ' + boot.price}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>Release:</small>
                    </td>
                    <td>
                      <small>{boot.release}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>Pattern:</small>
                    </td>
                    <td>
                      <small>{boot.pattern}</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CircularProgressbar
              strokeWidth={6}
              className="circData"
              textForPercentage={percentage => `${percentage}`}
              percentage={0}
            />
          </div>
          <div className="quickStats">
            <h6> STATS </h6>
          </div>
        </div>
      );
  }

  //_map => take in an object and return an array so react can render them
  renderReviews() {
    const { authorizedUser, activeReviewList } = this.props;
    return _.map(activeReviewList, review => {
      let isUserReview;
      if (authorizedUser && authorizedUser._id != null) {
        isUserReview =
          authorizedUser._id === review._user
            ? 'list-group-item list-group-item-action list-group-item-info flex-column align-items-start'
            : 'list-group-item list-group-item-action flex-column align-items-start';
      } else {
        isUserReview =
          'list-group-item list-group-item-action flex-column align-items-start';
      }

      return (
        <li className={isUserReview} key={review._reviewID}>
          <a href="#" onClick={() => this.props.changeID(review._reviewID)}>
            <div className="reviewLeft">
              <h5>{review.title + ' '}</h5>
              <small>{review.reviewName + ' '}</small>
            </div>
            <div className="reviewRight">
              <h6>Overall Rating: {review.ratingOverall}</h6>
              <small>{new Date(review.dateReviewed).toLocaleDateString()}</small>
            </div>
          </a>
        </li>
      );
    });
  }

  render() {
    const { activeReviewList, boot, reviewOpen, makingReview } = this.props;
    if (!activeReviewList || !boot)
      return (
        <div>
          <LoadingModule text={'Calculating Boot Stats'} />
        </div>
      );
    else
      return (
        <div
          className={
            reviewOpen || makingReview ? 'bootdisplay prevent-scroll' : 'bootdisplay'
          }
        >
          {this.renderBootHeader()}
          <div className="quickStats">
            <h6>DATA</h6>
          </div>
          <div>{this.renderBootStats()}</div>
          <div
            className={
              reviewOpen || makingReview
                ? 'list-group review robot pushback'
                : 'list-group review robot'
            }
          >
            {this.renderReviews()}
          </div>
        </div>
      );
  }
}

function getSum(total, num) {
  return total + num;
}

//ownprops is the second argument to mapStateToProps
//passed directly to the component
//this.props === ownProps
function mapStateToProps(state, ownProps) {
  return {
    boot: state.activeBootList[ownProps.bootname],
    activeReviewList: state.activeReviewList,
    authorizedUser: state.authorizedUser
  };
}

export default connect(
  mapStateToProps,
  { fetchBoot, fetchReviews }
)(BootDisplay);
