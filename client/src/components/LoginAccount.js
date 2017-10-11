import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser} from '../actions/index';
import MessageBar from './MessageBar';
import $ from 'jquery';
//ReduxForm just handles the state of our form.

//field will invoke renderField at some point in the future
//component property of our Field interacts with the user
//must return some JSX
//renderField(field = contains some event handlers)
class LoginAccount extends Component {

  componentDidMount(){
    $('html, body').css({
    overflow: 'hidden',
    height: '100%'
    });
  }

  renderField(field)
  {
      const { meta: {touched, error} } = field;
      const className = `form-group ${touched && error ? 'has-danger' : ''}`;
      var spanClassName = '';
      if(field.type === 'password')
      spanClassName = 'fa fa-key fa-fw';
      else
      spanClassName = 'fa fa-envelope-o fa-fw';
    return(
    <div className={className}>
          <div style={{color: 'red'}}>
          <div className="input-group margin-bottom-sm">
          <span className="input-group-addon"><i className={spanClassName}></i></span>
          <input className="form-control"
          {...field.input} placeholder={field.label} type={field.type}
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
    this.props.loginUser(values, ()=>{this.props.history.push('/dashboard')});
  }

  render() {

    //passed to our component via redux-forms(helper functions)
    //takes into a function we defined handleSubmit hanldes validation
    //if form is valid, then we can call our callback onSubmit
    const { handleSubmit } = this.props;

    return(
      <div className="createAccountContainer robot">
      <div className="create-account" >
      <h3>Login</h3>
      <MessageBar />
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
          label= "Email Address"
          type="text"
          name="email"
          component={this.renderField}
          placeholder="Email Address"
          />
          <Field
          label = "Password"
          type="password"
          name="password"
          component={this.renderField}
          placeholder="Password"
          />
          <div style={{margin: '10px'}} className="btn-group">
          <button type="submit" className="btn payment-btn text-white" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
          <Link className="btn btn-secondary" to="/"> Cancel </Link>
          </div>
          <a style={{margin: '5px'}} className="btn btn-danger" href="/auth/google">
            Continue with Google+  <span className="fa fa-google-plus-official" aria-hidden="true"> </span></a>
          <div style={{margin: '5px'}}>
          <h6>Not a user? <a style={{margin: '5px'}} href="/createaccount"> Sign Up</a></h6>
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

  if(!values.password)
      errors.password = "Enter a password";

  return errors;

}

//form handler (must be a unique string)
//validate function is calls automatically when user tries to submit
export default reduxForm({
  validate,
  form: 'LoginAccountForm'
})(
  connect(null, { loginUser })(LoginAccount)
);
