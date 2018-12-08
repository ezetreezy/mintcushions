import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { Field, reduxForm } from 'redux-form';
import {
  submitReview,
  fetchReviews,
  fetchReview,
  editReview,
  deleteReview
} from '../actions/index';
import LoadingModule from './LoadingModule';

class CreateReview extends Component {
  componentDidMount() {
    if (this.props.alreadyHaveValues) this.props.fetchReview(this.props.reviewID);
  }
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <div style={{ color: 'red' }}>
          <div className="input-group margin-bottom-sm">
            <input
              className={
                field.label === 'Express ya self!'
                  ? 'form-control reviewbodyForm'
                  : 'form-control'
              }
              {...field.input}
              placeholder={field.placeholder}
              type={field.type}
            />
          </div>
          <div className="text-help">{touched ? error : ''}</div>
        </div>
      </div>
    );
  }

  handleClickOutside(evt) {
    this.props.reviewDone();
  }

  onDelete() {
    const { bootbrand, bootname, reviewID } = this.props;
    this.props.deleteReview(bootname, reviewID, () =>
      this.props.fetchReviews(bootbrand, bootname)
    );
    this.props.reviewDone();
  }

  onSubmit(values) {
    const { reviewID, bootbrand, bootname } = this.props;
    values.bootbrand = bootbrand;
    values.bootname = bootname;

    if (!this.props.alreadyHaveValues)
      this.props.submitReview(values, () => {
        this.props.fetchReviews(bootbrand, bootname);
      });
    else {
      values._reviewID = reviewID;
      this.props.editReview(values, () => {
        this.props.fetchReviews(bootbrand, bootname);
      });
    }

    this.props.reviewDone();
  }

  render() {
    const { handleSubmit, review } = this.props;

    if (!this.props.alreadyHaveValues)
      return (
        <div className="editingContainer editingReview robot">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h3>{this.props.bootname}</h3>
            <Field
              label="Title of your review"
              type="text"
              name="title"
              component={this.renderField}
              placeholder="Title"
            />
            <Field
              label="Express ya self!"
              type="text"
              name="body"
              component={this.renderField}
              placeholder="Body"
            />
            <ul className="list-group">
              <li className="list-group-item">
                <div className="leftRating">
                  <Field
                    label="Durability Rating"
                    type="text"
                    name="ratingDurability"
                    component={this.renderField}
                    placeholder="Durability Score [0-10]"
                  />
                </div>
                <div className="rightRating">
                  <small>Wear or tear after repeated use?</small>
                </div>
              </li>
              <li className="list-group-item">
                <div className="leftRating">
                  <Field
                    label="Traction Rating"
                    type="text"
                    name="ratingTraction"
                    component={this.renderField}
                    placeholder="Traction Score [0-10]"
                  />
                </div>
                <div className="rightRating">
                  <small>Grip or slide on the pitch?</small>
                </div>
              </li>
              <li className="list-group-item">
                <div className="leftRating">
                  <Field
                    label="Touch Rating"
                    type="text"
                    name="ratingTouch"
                    component={this.renderField}
                    placeholder="Touch Score [0-10]"
                  />
                </div>
                <div className="rightRating">
                  <small>Mint cushions or like a sledgehammer?</small>
                </div>
              </li>
              <li className="list-group-item">
                <div className="leftRating">
                  <Field
                    label="Protection Rating"
                    type="text"
                    name="ratingProtection"
                    component={this.renderField}
                    placeholder="Protection Score [0-10]"
                  />
                </div>
                <div className="rightRating">
                  <small>Tank or egg shell protecting your toes?</small>
                </div>
              </li>
              <li className="list-group-item">
                <div className="leftRating">
                  <Field
                    label="Overall Rating"
                    type="text"
                    name="ratingOverall"
                    component={this.renderField}
                    placeholder="Overall Score [0-10]"
                  />
                </div>
                <div className="rightRating">
                  <small>What is your overall assessement?</small>
                </div>
              </li>
            </ul>

            <button
              type="submit"
              className="btn payment-btn text-white btn-space btn-space-top"
              style={{ backgroundColor: '#8A2BE2' }}
            >
              {' '}
              Submit{' '}
            </button>
            <button
              type="button"
              onClick={this.props.reviewDone}
              className="btn btn-secondary payment-btn text-white btn-space-top"
            >
              {' '}
              Cancel{' '}
            </button>
          </form>
        </div>
      );
    else {
      if (!review)
        return (
          <div>
            <LoadingModule text={'Loading Review'} />
          </div>
        );
      else
        return (
          <div className="editingContainer editingReview robot">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h3>{this.props.bootname}</h3>
              <small>Edit Your Previous Review</small>
              <Field
                label="Title of your review"
                type="text"
                name="title"
                component={this.renderField}
                placeholder={review.title}
              />
              <Field
                label="Express ya self!"
                type="text"
                name="body"
                component={this.renderField}
                placeholder={review.body}
              />
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="leftRating">
                    <Field
                      label="Durability Rating"
                      type="text"
                      name="ratingDurability"
                      component={this.renderField}
                      placeholder={review.ratingDurability}
                    />
                  </div>
                  <div className="rightRating">
                    <small>Wear or tear after repeated use?</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="leftRating">
                    <Field
                      label="Traction Rating"
                      type="text"
                      name="ratingTraction"
                      component={this.renderField}
                      placeholder={review.ratingTraction}
                    />
                  </div>
                  <div className="rightRating">
                    <small>Grip or slide on the pitch?</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="leftRating">
                    <Field
                      label="Touch Rating"
                      type="text"
                      name="ratingTouch"
                      component={this.renderField}
                      placeholder={review.ratingTouch}
                    />
                  </div>
                  <div className="rightRating">
                    <small>Mint cushions or like a sledgehammer?</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="leftRating">
                    <Field
                      label="Protection Rating"
                      type="text"
                      name="ratingProtection"
                      component={this.renderField}
                      placeholder={review.ratingProtection}
                    />
                  </div>
                  <div className="rightRating">
                    <small>Tank or egg shell protecting your toes?</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="leftRating">
                    <Field
                      label="Overall Rating"
                      type="text"
                      name="ratingOverall"
                      component={this.renderField}
                      placeholder={review.ratingOverall}
                    />
                  </div>
                  <div className="rightRating">
                    <small>What is your overall assessement?</small>
                  </div>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  this.onDelete();
                }}
                className="btn btn-danger text-white btn-space btn-space-top"
              >
                Delete
              </button>
              <button
                type="submit"
                className="btn payment-btn text-white btn-space btn-space-top"
                style={{ backgroundColor: '#8A2BE2' }}
              >
                {' '}
                Submit Edits
              </button>
              <button
                type="button"
                onClick={this.props.reviewDone}
                className="btn btn-secondary payment-btn text-white btn-space-top"
              >
                {' '}
                Cancel{' '}
              </button>
            </form>
          </div>
        );
    }
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) errors.title = 'Enter an title';

  if (!values.body) errors.body = 'Enter a body';

  if (!values.ratingOverall) errors.ratingOverall = 'Need a overall rating';
  else {
    values.ratingOverall = parseInt(values.ratingOverall, 10);
    if (values.ratingOverall > 10)
      errors.ratingOverall = 'Invalid Rating. [Must be between 0-10]';
  }

  if (!values.ratingDurability) errors.ratingDurability = 'Need a durability rating';
  else {
    values.ratingDurability = parseInt(values.ratingDurability, 10);
    if (values.ratingDurability > 10)
      errors.ratingDurability = 'Invalid Rating. [Must be between 0-10]';
  }

  if (!values.ratingTouch) errors.ratingTouch = 'Need a touch rating';
  else {
    values.ratingTouch = parseInt(values.ratingTouch, 10);
    if (values.ratingTouch > 10)
      errors.ratingTouch = 'Invalid Rating. [Must be between 0-10]';
  }

  if (!values.ratingTraction) errors.ratingTraction = 'Need a traction rating';
  else {
    values.ratingTraction = parseInt(values.ratingTraction, 10);
    if (values.ratingTraction > 10)
      errors.ratingTraction = 'Invalid Rating. [Must be between 0-10]';
  }

  if (!values.ratingProtection) errors.ratingProtection = 'Need a protections rating';
  else {
    values.ratingProtection = parseInt(values.ratingProtection, 10);
    if (values.ratingProtection > 10)
      errors.ratingProtection = 'Invalid Rating. [Must be between 0-10]';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    review: state.activeReviewList[ownProps.reviewID],
    authorizedUser: state.authorizedUser
  };
}

CreateReview = onClickOutside(CreateReview);
//form handler (must be a unique string)
//validate function is calls automatically when user tries to submit
export default reduxForm({
  validate,
  form: 'CreateReviewForm'
})(
  connect(
    mapStateToProps,
    { deleteReview, editReview, submitReview, fetchReviews, fetchReview }
  )(CreateReview)
);
