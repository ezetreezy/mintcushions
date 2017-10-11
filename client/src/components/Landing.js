import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DeadSpaceErik from './DeadSpaceErik';
import VikingAmanda from './VikingAmanda';
import $ from 'jquery';

class Landing extends Component {

  componentDidMount(){
    $('html, body').css({
    overflow: 'auto',
    height: 'auto'
});
}

  render(){
  return (
        <div className="landingWhole">
        <div className="landingInformation robot">
        <h3>Welcome to mintcushions. An app built for sneakerhead footballers.</h3>
        <p>Soccer cleat reviews. Football boot reviews. Read them. Rate them.</p>
        </div>
        <div className="landingMain">
            <div className="landingWrapper robot">
                <Link className="landingWrapper-item medium adidas" to={'/boots/Adidas'}>
                      <div className="front">
                        <img src={require('../Assets/adidas.svg')} alt={"Adidas"}/>
                      </div>
                      <div className="back center">
                        <div className="envelope">
                          <span className="fa fa-envelope-open fa-5x" aria-hidden="true"></span>
                          <p>Review</p>
                        </div>
                      </div>
                </Link>
                <Link className="landingWrapper-item small nike" to={'/boots/Nike'}>
                    <div className="front">
                    <img src={require('../Assets/nikeLogo2.svg')} alt={"Nike"}/>
                    </div>
                    <div className="back">
                        <div className="envelope">
                          <span className="fa fa-envelope-open fa-4x" aria-hidden="true"></span>
                          <p>Review</p>
                        </div>
                    </div>
                </Link>
                <Link className="landingWrapper-item medium puma" to={'/boots/Puma'}>
                    <div className="front">
                    <img src={require('../Assets/pumaLogo2.svg')} alt={"Puma"}/>
                    </div>
                    <div className="back">
                        <div className="envelope">
                          <span className="fa fa-envelope-open fa-5x" aria-hidden="true"></span>
                          <p>Review</p>
                        </div>
                    </div>
                </Link>
                <Link className="landingWrapper-item small mizuno" to={'/boots/Mizuno'}>
                    <div className="front">
                          <img src={require('../Assets/mizunoLogo.svg')} alt={"Mizuno"} />
                    </div>
                    <div className="back" >
                          <div className="envelope">
                            <span className="fa fa-envelope-open fa-4x" aria-hidden="true"></span>
                            <p>Review</p>
                          </div>
                    </div>
                </Link>
                <Link className="landingWrapper-item wide under-armour" to={'/boots/UnderArmour'}>
                  <div className="front">
                    <img src={require('../Assets/underALogo.svg')} alt={"Under Armour"}/>
                  </div>
                  <div className="back">
                      <div className="envelope">
                        <span className="fa fa-envelope-open fa-5x" aria-hidden="true"></span>
                        <p>Review</p>
                      </div>
                  </div>
                </Link>
                <Link className="landingWrapper-item tall new-balance" to={'/boots/NewBalance'}>
                  <div className="front">
                      <img src={require('../Assets/nBalanceLogo.svg')} alt={"New Balance"}/>
                  </div>
                  <div className="back">
                      <div className="envelope">
                        <span className="fa fa-envelope-open fa-5x" aria-hidden="true"></span>
                        <p>Review</p>
                      </div>
                  </div>
                  </Link>
                <Link className="landingWrapper-item small umbro" to={'/boots/Umbro'}>
                  <div className="front">
                    <img src={require('../Assets/umbroLogo.svg')} alt={"Umbro"}/>
                  </div>
                  <div className="back">
                      <div className="envelope">
                        <span className="fa fa-envelope-open fa-4x" aria-hidden="true"></span>
                        <p>Review</p>
                      </div>
                  </div>
                </Link>
                <Link className="landingWrapper-item smalllong hummel" to={'/boots/Hummel'}>
                    <div className="front">
                      <img src={require('../Assets/hummelLogo.svg')} alt={"Hummel"}/>
                    </div>
                    <div className="back">
                        <div className="envelope">
                          <span className="fa fa-envelope-open fa-4x" aria-hidden="true"></span>
                          <p>Review</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className="techStack robot">
              <div className="builtWithdiv">
                <p>powered by:</p>
              </div>
              <div className="svgdiv">
                <img src={require('../Assets/nodeJSLogo.svg')} alt={"NodeJS"} />
                <img src={require('../Assets/bootstrapLogo.svg')} alt={"Bootstrap"}/>
                <img src={require('../Assets/reactLogo.svg')} alt={"React"} className="react"/>
                <img src={require('../Assets/reduxLogo.svg')} alt={"Redux"}/>
                <img src={require('../Assets/mongoDBLogo.svg')} alt={"MongoDB"}/>
              </div>
        </div>
        <div className="landingDetails">
              <div className="engineeredWithImages robot">
                <DeadSpaceErik />
                <VikingAmanda />
              </div>
            </div>
      </div>
  );
}
}
export default Landing;
