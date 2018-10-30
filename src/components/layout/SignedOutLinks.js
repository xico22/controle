import {NavLink} from 'react-router-dom';
import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


const SignedOutLinks = () =>{
    return(
        <div>
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/signup'>Cadastrar</NavLink></li>
            <li><NavLink to='/signin'>Logar-se</NavLink></li>
        </ul>
        <Sidebar />
        </div>
    )
}

class Sidebar extends Component {

    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }
  
    render() {
        return (
            <div>
              <ul id="slide-out" className="sidenav">
                  <div className="user-view">
              <div className="background"><img src="/img/mario-bg.png"/></div>
    </div>
                  <li><div className="divider" /></li>
                    <li><NavLink to='/signup'>Cadastrar</NavLink></li>
                    <li><NavLink to='/signin'>Logar-se</NavLink></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
            </div>
        );
    }
  }


export default SignedOutLinks;