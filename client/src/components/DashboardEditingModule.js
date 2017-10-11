import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {updateUser, updateAvatar} from '../actions/index';
import onClickOutside from 'react-onclickoutside';
import Dropzone from 'react-dropzone';


class DashboardEditingModule extends Component {


  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  handleClickOutside(evt) {
    this.props.cancelUser();
  }

  renderDropzoneInput(field) {
  const files = field.input.value;
  return (
    <div className="thedrop">
      <Dropzone style={{"width" : "100%", "height" : "100%", "border" : "1px dotted black", 'min-height' : "350px"}}
                        name={field.name} onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}>
        <div style={{"paddingTop" : "5px", "paddingBottom" : "5px"}}>
        Drop or Click to add file for upload.<br/>
        Supported Image Extensions: jpg,jpeg,png,gif,svg<br/><br/>
        Click add features link in the navigation bar to enable this feature if the submit button is disabled.</div>
      </Dropzone>
      {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul className="nobullets">
          { files.map((file, i) =>
            <li className="list-group-item list-group-item-warning list-group-item-info flex-column align-items-start"
            key={i}>{file.name + " Selected to Upload"}</li>) }
        </ul>
      )}
    </div>
  );
}

  onSubmit(values) {

    if(this.props.avatar){
      var data = new FormData();
      Object.keys(values).forEach(( key ) => {
        data.append(key, values[key][0]);
      });
       //values.email = this.props.authorizedUser.email;
       this.props.updateAvatar(data,  ()=>{this.props.cancelUser()});
    }

    if(this.props.authorizedUser && !this.props.avatar)
    {
    values.email = this.props.authorizedUser.email;
    this.props.updateUser(values, ()=>{this.props.cancelUser()});
    }

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
    return(<div className="editingDashboardContainer robot">
           <h5 className="editingTitle">Editing Wall Module</h5>
           <hr/>
             <div className="editingDashboardInput more robot">
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
             </div>
           </div>);
    }
    else if(this.props.personal){
    return(<div className="editingDashboardContainer robot">
               <h5 className="editingTitle">Editing Personal Information Module</h5>
               <hr/>
               <div className="editingDashboardInput more robot">
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
               </div>
            </div>)
        }
        else if(this.props.setting){
          return(<div className="editingDashboardContainer robot">
                 <h5 className="editingTitle">Editing Settings Module</h5>
                 <hr/>
                 <div className="editingDashboardInput more robot">
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
                 </div>
                 </div>) }
              else if(this.props.avatar)
              return(<div className="editingDashboardContainer robot">
                      <h5 className="editingTitle">Editing Avatar</h5>
                      <hr/>
                      <div className="editingDashboardInput more robot">
                        <form encType="multipart/form-data" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field name="Avatar" type="file" component={this.renderDropzoneInput}/>
                            <button type="submit" disabled={this.props.authorizedUser.enabled ? '' : 'disabled'} className="btn payment-btn text-white btn-space" style={{backgroundColor: '#8A2BE2'}}> Submit </button>
                            <button type="button" onClick={this.props.cancelUser} className="btn payment-btn"> Cancel </button>
                        </form>
                      </div>
                      </div>)


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

DashboardEditingModule = onClickOutside(DashboardEditingModule);
export default reduxForm({
  validate,
  form: 'EditingAccountForm'
})(
  connect(mapStateToProps, { updateUser, updateAvatar })(DashboardEditingModule)
);
