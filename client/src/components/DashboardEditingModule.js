import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {updateUser} from '../actions/index';


class DashboardEditingModule extends Component {


  constructor(props) {

    super(props);
    this.renderField = this.renderField.bind(this);

  }
  onSubmit(values) {

    if(this.props.authorizedUser)
    values.email = this.props.authorizedUser.email;

    this.props.updateUser(values, ()=>{this.props.cancelUser()});

  }
  renderField(field) {
    var spanClassName = "";
    var placeholderValue = "";
    switch(field.label)
    {
      case "First Name":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.firstname
        : placeholderValue = field.label;
        spanClassName = 'fa fa-user fa-fw';
      break;
      case "Last Name":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.lastname
        : placeholderValue = field.label;
        spanClassName = 'fa fa-users fa-fw';
      break;
      case "Handle":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.handle
        : placeholderValue = field.label;
        spanClassName = 'fa fa-users fa-fw';
      break;
      case "Description":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.about
        : placeholderValue = field.label;
        spanClassName = 'fa fa-users fa-fw';
      break;
      case "FavBoots":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.favboots
        : placeholderValue = field.label;
        spanClassName = 'fa fa-plus-square fa-fw';
      break;
      case "FootballPos":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.footballpos
        : placeholderValue = field.label;
        spanClassName = 'fa fa-futbol-o fa-fw';
      break;
      case "TeamOn":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.teamon
        : placeholderValue = field.label;
        spanClassName = 'fa fa-users fa-fw';
      break;
      case "TeamSupport":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.teamsupport
        : placeholderValue = field.label;
        spanClassName = 'fa fa-user-circle fa-fw';
      break;
      case "Location":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.location
        : placeholderValue = field.label;
        spanClassName = 'fa fa-globe fa-fw';
      break;
      case "Email Address":
        this.props.authorizedUser ? placeholderValue = this.props.authorizedUser.email
        : placeholderValue = field.label;
        spanClassName = 'fa fa-envelope fa-fw';
      break;
      case "Password":
        placeholderValue = field.label;
        spanClassName = 'fa fa-key fa-fw';
      break;
      case "Password Again":
        placeholderValue = 'Repeat Password';
        spanClassName = 'fa fa-key fa-fw';
      break;
      case "New Password":
        placeholderValue = 'New Password';
        spanClassName = 'fa fa-unlock fa-fw';
      break;
      default:
        placeholderValue = field.label;
        spanClassName = 'fa fa-envelope-o fa-fw';
      break;
    }
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
    <div className={className}>
          <div style={{color: 'red'}}>
          <div className="input-group margin-bottom-sm">
          <span className="input-group-addon"><i className={spanClassName}></i></span>
          <input className="form-control"
          {...field.input}
          placeholder={placeholderValue}
          type={field.type}
          />
          </div>
          <div className="text-help">
          {touched ? error : ''}
          </div>
        </div>
    </div>
  );
  }
  render() {
    const { handleSubmit } = this.props;
    if(this.props.attribute)
    {
    return(<div className="editing">
           <p>Add some info about yourself. Ya know, those dank boots you are cutting them grass blades with.</p>
           <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
           <Field
           label= "FavBoots"
           type="text"
           name="favboots"
           component={this.renderField}
           placeholder="Your favorite boots"
           />
           <Field
           label= "FootballPos"
           type="text"
           name="footballpos"
           component={this.renderField}
           placeholder="Your Position"
           />
           <Field
           label= "TeamOn"
           type="text"
           name="teamon"
           component={this.renderField}
           placeholder="Team you play for"
           />
           <Field
           label= "Location"
           type="text"
           name="location"
           component={this.renderField}
           placeholder="Where ya from"
           />
           <Field
           label= "TeamSupport"
           type="text"
           name="teamsupport"
           component={this.renderField}
           placeholder="Team you support"
           />
           <button type="submit" className="btn payment-btn text-white btn-space" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
           <button type="button" onClick={this.props.cancelUser} className="btn payment-btn"> Cancel </button>
           </form>
           </div>);
    }
    else if(this.props.personal){
    return(<div className="editing">
           <p>Edit your personal information and upload your avatar.</p>
           <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
           <Field
           label= "First Name"
           type="text"
           name="firstname"
           component={this.renderField}
           placeholder="First Name"
           />
           <Field
           label= "Last Name"
           type="text"
           name="lastname"
           component={this.renderField}
           placeholder="Last Name"
           />
           <Field
           label= "Handle"
           type="text"
           name="handle"
           component={this.renderField}
           placeholder="Handle"
           />
           <Field
           label= "Description"
           type="text"
           name="description"
           component={this.renderField}
           placeholder="Description"
           />
           <button type="submit" className="btn payment-btn text-white btn-space" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
           <button type="button" onClick={this.props.cancelUser} className="btn payment-btn"> Cancel </button>
           </form>
           </div>)
        }
        else{
          return(<div className="editing">
                 <p>Edit your email and password settings.</p>
                 <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                 <Field
                 label= "Email Address"
                 type="text"
                 name="newemail"
                 component={this.renderField}
                 placeholder="Email Address"
                 />
                 <Field
                 label= "Password"
                 type="password"
                 name="password"
                 component={this.renderField}
                 placeholder="Old Password"
                 />
                 <Field
                 label= "Password Again"
                 type="password"
                 name="password2"
                 component={this.renderField}
                 placeholder="Repeat Old Password"
                 />
                 <Field
                 label= "New Password"
                 type="password"
                 name="newpassword"
                 component={this.renderField}
                 placeholder="New Password"
                 />
                 <button type="submit" className="btn payment-btn text-white btn-space" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
                 <button type="button" onClick={this.props.cancelUser} className="btn payment-btn"> Cancel </button>
                 </form>
                 </div>)
        }
  }
}

function mapStateToProps(state){
  return {authorizedUser: state.authorizedUser};
}


function validate(values)
{
  const errors = {};

  if(values.newpassword)
  {
      if(values.newpassword.length < 8)
          errors.newpassword = "Password must be atleast 8 characters";

      if(!/\d/.test(values.newpassword))
          errors.newpassword = "Password must contain at least one number";

      if(!/[A-Z]/.test(values.password))
          errors.newpassword = "Password must contain a capital letter";

      if(!/[a-z]/.test(values.newpassword))
          errors.newpassword = "Password must contain a lowercase letter";
    }

  if(values.password2 !== values.password)
      errors.password2 = "Password does not match 1st entry";


  return errors;

}


export default reduxForm({
  validate,
  form: 'EditingAccountForm'
})(
  connect(mapStateToProps, { updateUser })(DashboardEditingModule)
);
