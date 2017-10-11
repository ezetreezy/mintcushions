import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchBoots} from '../actions';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import LoadingModule from './LoadingModule';


class BootListDisplay extends Component {

  //bootbrand is coming in as a wild card from react-router(/api/boots/bootbrand)
  //this.props.match.params is provided by react
  //match is top level, params is all the wild cards listed
  componentDidMount(){
    const {bootbrand} = this.props.match.params;
    this.props.fetchBoots(bootbrand);
  }

  //_map => take in an object and return an array so react can render them
  renderBoots(){
    return _.map(this.props.activeBootList, (boot) => {
      return (
        <li className="bootbox robot" key={boot.name}>
        <Link to={`/boots/${boot.brand}/${boot.name}`}>
          <span className="fa fa-diamond fa-3x" aria-hidden="true"></span>
              <h5>{boot.name}</h5>
          <h6>{boot.reviewCount + " "}reviews </h6>
            </Link>
        </li>
      );
    })
  }

  render(){
    const {activeBootList} = this.props;
    if(activeBootList)
    return(
      <div className="bootboxContainer">
          <ul className="removeDots">
            {this.renderBoots()}
          </ul>
      </div>
    );
    else {
      return(<LoadingModule text={"Loading Boots"}/>);
    }
  }
}


function mapStateToProps(state) {
  return {activeBootList: state.activeBootList};
}

export default connect(mapStateToProps,{fetchBoots})(BootListDisplay);
