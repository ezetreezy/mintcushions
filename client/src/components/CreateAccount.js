import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser, asyncValidate} from '../actions/index';
import $ from 'jquery';
//ReduxForm just handles the state of our form.

//field will invoke renderField at some point in the future
//component property of our Field interacts with the user
//must return some JSX
//renderField(field = contains some event handlers)
class CreateAccount extends Component {

  componentDidMount(){
    $('html, body').css({
    overflow: 'hidden',
    height: '100%'
    });
  }

  //field is a single input or state
  renderField(field)
  {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    var spanClassName = '';
    switch(field.label){
      case 'Email Address':
      spanClassName = 'fa fa-envelope-o fa-fw';
      break;
      case 'First Name':
      spanClassName = 'fa fa-user fa-fw';
      break;
      case 'Last Name':
      spanClassName = 'fa fa-users fa-fw';
      break;
      case 'Password':
      spanClassName = 'fa fa-key fa-fw';
      break;
      case 'Re-Enter Password':
      spanClassName = 'fa fa-unlock fa-fw';
      break;
      default:
      spanClassName = 'fa fa-envelope-o fa-fw';
      break;
    }
    return(
    <div className={className}>
          <div style={{color: 'red'}} className={field.asyncValidating ? 'async-validating' : ''}>
          <div className="input-group margin-bottom-sm">
          <span className="input-group-addon"><i className={spanClassName}></i></span>
          <input className="form-control"
          {...field.input}  placeholder={field.label} type={field.type}
          />
          </div>
          <div className="text-help">
          {touched ? error : ''}
          </div>
        </div>
    </div>
  );
}

  onSubmit(values) {
    //this === component (we need .bind(this)) below
    this.props.createUser(values, ()=>{this.props.history.push('/dashboard')});
  }

  render() {

    //passed to our component via redux-forms(helper functions)
    //takes into a function we defined handleSubmit hanldes validation
    //if form is valid, then we can call our callback onSubmit
    const { handleSubmit } = this.props;

    return(
        <div className="createAccountContainer robot">
         <div className="create-account">
          <h3>Join our app</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
              label = "Email Address"
              type="text"
              name="email"
              component={this.renderField}
              placeholder="Email Address"
              />
              <Field
              label = "First Name"
              type="text"
              name="firstname"
              component={this.renderField}
              placeholder="First Name"
              />
              <Field
              label = "Last Name"
              type="text"
              name="lastname"
              component={this.renderField}
              placeholder="Last Name"
              />
              <Field
              label = "Password"
              type="password"
              name="password"
              component={this.renderField}
              placeholder="Password"
              />
              <Field
              label = "Re-Enter Password"
              type="password"
              name="password2"
              component={this.renderField}
              placeholder="Re-Enter Password"
              />
              <div style={{margin: '10px'}} className="btn-group">
              <button type="submit" className="btn text-white" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
              <Link className="btn btn-secondary" to="/"> Cancel </Link>
              </div>
              <a style={{margin: '5px'}} className="btn btn-danger" href="/auth/google">
                Continue with Google+  <span className="fa fa-google-plus-official" aria-hidden="true"> </span></a>
              <div style={{margin: '5px'}}>
              <h6>Already a user? <a style={{margin: '5px'}} href="/login"> Login</a></h6>
              </div>
            </form>
          </div>
        </div>
        );
      }

    }

function validate(values)
{
  const errors = {};

  if(!values.email)
      errors.email = "Enter an email";

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Invalid email address';

  if(!values.firstname)
      errors.firstname = "Enter a first name";

  if(values.firstname)
  {
    if(values.firstname[0] !== values.firstname[0].toUpperCase())
      errors.firstname = "First letter must be capitalized"
  }

  if(!values.lastname)
      errors.lastname = "Enter a last name";

  if(values.lastname)
  {
    if(values.lastname[0] !== values.lastname[0].toUpperCase())
      errors.lastname = "First letter must be capitalized"
  }

  if(!values.password)
      errors.password = "Enter a password";

  if(values.password)
  {
      if(values.password.length < 8)
          errors.password = "Password must be atleast 8 characters";

      if(!/\d/.test(values.password))
          errors.password = "Password must contain at least one number";

      if(!/[A-Z]/.test(values.password))
          errors.password = "Password must contain a capital letter";

      if(!/[a-z]/.test(values.password))
          errors.password = "Password must contain a lowercase letter";
    }

  if(!values.password2)
    errors.password2 = "Confirm that password";

  if(values.password2 !== values.password)
    errors.password2 = "Password does not match 1st entry";

  return errors;

}

//form handler (must be a unique string)
//validate function is calls automatically when user tries to submit
export default reduxForm({
  form: 'NewAccountForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(
  connect(null, { createUser})(CreateAccount)
);
