import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';


export default (props)=>{
  return(
    <div className="editingContainer reviewDisplay robot">
          <div className="theReview">
                <div className="reviewHeader">
                  <h6 className="rLeft">{props.review.title}</h6>
                  <h6 className="rRight">{new Date(props.review.dateReviewed).toDateString()}</h6>
                </div>
                <div className="quickStats"><h6>{props.review.reviewName}</h6></div>
                <div className="reviewBody">
                  <p>{props.review.body}</p>
                </div>
          </div>
          <div className="reviewBottom">
              <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Overall ${percentage/10}`}
              percentage={props.review.ratingOverall * 10} />
              <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Durability ${percentage/10}`}
              percentage={props.review.ratingDurability * 10} />
              <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Traction ${percentage/10}`}
              percentage={props.review.ratingTraction * 10} />
              <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Protection ${percentage/10}`}
              percentage={props.review.ratingProtection * 10} />
              <CircularProgressbar strokeWidth={7} className="circDataReview" textForPercentage={(percentage) => ` Touch ${percentage/10}`}
              percentage={props.review.ratingTouch * 10} />
          </div>
          <button type="button"
            onClick={() => props.reviewDone()}
            className="btn"
            data-toggle="tooltip"
            title="Back"
            data-placement="auto">
            <span className="fa fa-backward fa-lg" aria-hidden="true">
          </span></button>
        </div>

  );
}
