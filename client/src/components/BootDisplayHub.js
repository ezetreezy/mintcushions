import React,{Component} from 'react';
import BootDisplay from './BootDisplay';
import ReviewDisplay from './ReviewDisplay';
import CreateReview from './CreateReview';
import MessageBar from './MessageBar';
import $ from 'jquery';
//acts as a hub to allow user to read reviews, make review edit and delete.

class BootDisplayHub extends Component {

  componentDidMount(){
    $('html, body').css({
    overflow: 'auto',
    height: 'auto'
});
}

  constructor(props){
    super(props);
    const {bootbrand, bootname} = this.props.match.params;
    this.state={ bootbrand: bootbrand,
                 bootname: bootname,
                 reviewID: 0,
                 reviewOpen: false,
                 makingReview: false};
    this.changeID = this.changeID.bind(this);
    this.reviewDone = this.reviewDone.bind(this);
    this.reviewEditing = this.reviewEditing.bind(this);
  }

  changeID(id) {
    const {bootbrand, bootname} = this.props.match.params;
    this.setState({ bootbrand: bootbrand,
                    bootname: bootname,
                    reviewID: id,
                    reviewOpen: true,
                    makingReview: false });
  }

  reviewDone(){
    this.setState({ bootbrand: this.state.bootbrand,
                    bootname: this.state.bootname,
                    reviewID: this.state.reviewID,
                    reviewOpen: false,
                    makingReview: false });
  }

  reviewEditing(){

    this.setState({ bootbrand: this.state.bootbrand,
                    bootname: this.state.bootname,
                    reviewID: this.state.reviewID,
                    reviewOpen: false,
                    makingReview: true });
  }



  render() {
    return(<div>
           <MessageBar/>
           <div className={!this.state.reviewOpen && !this.state.makingReview ? 'dashboardDiv Hidden' : 'dashboardDiv'}> &nbsp; </div>
           <BootDisplay makingReview={this.state.makingReview} reviewEditing={this.reviewEditing}
                       reviewOpen={this.state.reviewOpen} bootname={this.state.bootname}
                       bootbrand={this.state.bootbrand} changeID={this.changeID}
                       history={this.props.history}/>

           {this.state.reviewOpen ? <ReviewDisplay reviewDone={this.reviewDone} reviewID={this.state.reviewID} bootname={this.state.bootname} bootbrand={this.state.bootbrand}/> : <div></div>}
           {this.state.makingReview ? <CreateReview alreadyHaveValues={false} bootname={this.state.bootname} bootbrand={this.state.bootbrand} reviewDone={this.reviewDone} /> : <div></div>}
           </div>
  );
  }
}

export default (BootDisplayHub);
