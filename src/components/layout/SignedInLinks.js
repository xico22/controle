import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right hide-on-med-and-down">
        <li><NavLink to='/create'>Novo Projeto</NavLink></li>
        <li><NavLink to='/report'>Relatório</NavLink></li>
        <li><a onClick={props.signOut}>Deslogar</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink></li>
      </ul>
      <Sidebar profile={props.profile} email={props.email} signOut={props.signOut}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

class Sidebar extends Component {

  componentDidMount() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem, {
          edge: "left",
          inDuration: 250,
          closeOnClick: true
      });
  }

  render() {
      return (
          <div>
              <ul id="slide-out" className="sidenav">
                  <div className="user-view">
              <div className="background"><img src="/img/mario-bg.png"/></div>
      <a href="#user"><NavLink to='/' className="btn btn-floating pink lighten-1">{this.props.profile.initials}</NavLink></a>
      <a href="#name"><span className="black-text name">{this.props.profile.firstName}</span></a>
      <a href="#email"><span className="black-text email">{this.props.email}</span></a>
    </div>
                  <li><div className="divider" /></li>
                  <li><NavLink to='/create' class="sidenav-close">Novo Projeto</NavLink></li>
                  <li><NavLink to='/report'class="sidenav-close">Relatório</NavLink></li>
                  <li><a onClick={this.props.signOut}class="sidenav-close">Deslogar</a></li>
              </ul>
              <a href="#" data-target="slide-out" className="sidenav-trigger">
                  <i className="material-icons">menu</i>
              </a>
          </div>
      );
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks,Sidebar)