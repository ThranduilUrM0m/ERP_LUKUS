import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import favicon from '../../favicon.svg';

/* 
cheuf l log w lfavicon dial CV ina taille 3endhum w red lukus f7alha bach yjiw 9edhum, 3ad generer favicon w 7eto blast li kayn daba */


import * as $ from "jquery";
import 'bootstrap';

const _ = require('lodash');

class Header extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            _reservations: [],
            logo_to_show: logo,
        };
    }
    componentDidMount() {
        const self = this;
        function displayWindowSize(){
            if ($(window).width() <= 425) {
                self.setState({
                    logo_to_show: favicon
                });
            } else {
                self.setState({
                    logo_to_show: logo
                });
            }
        }
        window.addEventListener("resize", displayWindowSize);
        displayWindowSize();

        let _url = window.location.pathname;
        if(_url === "/login" || _url === "/signup" || _url === "/dashboard")
            $('header').hide();
    }
    render() {
        const { logo_to_show } = this.state;
        return (
            <header>
                <div>
                    <a className="logoHolder" href="/">
                        <img className="logo img-fluid" src={logo_to_show} alt="APP_NAME"/>
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