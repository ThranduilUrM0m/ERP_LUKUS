import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
/* import logo from '../../logo.svg';
import favicon from '../../favicon.svg'; */
import * as $ from "jquery";
import 'bootstrap';

const _ = require('lodash');

class Header extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            _reservations: [],
        };
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <header>
                <div>
                    <a className="logoHolder" href="/">
                        <img className="logo img-fluid" src="#" alt="APP_NAME"/>
                    </a>
                    <ul className="menu">
                        <li><span className="item item-0"><NavLink to='/vehicules' activeClassName='is-active' className="nav-link" id="_vehicules_link"> Nos Véhicules. </NavLink></span></li>
                        <li><span className="item item-1"><NavLink to='/reservation' activeClassName='is-active' className="nav-link" id="_reservation_link"> Reservation. </NavLink></span></li>
                        <li><span className="item item-2"><NavLink to='/contact' activeClassName='is-active' className="nav-link" id="_contact_link"> Contactez Nous. </NavLink></span></li>
                    </ul>
                    <a className="reservations" href="#">
                        <i className="fas fa-shopping-cart"></i>
                    </a>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);