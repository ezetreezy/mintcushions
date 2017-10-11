import React from 'react';

//Loading Animation for when react/async requests are taking time

export default (props) => {
  return(<div className="loadingModule robot">
          <span className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></span>
        <h6>{props.text}</h6>
        </div>);
}
