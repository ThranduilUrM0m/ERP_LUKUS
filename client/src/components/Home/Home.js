import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';

var _ = require('lodash');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._handleScroll = this._handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        // axios operations
    }
    componentDidMount() {
        this._handleScroll();
        $('.fixedHeaderContainer').removeClass('blog_header');
    }
    _handleScroll(){
        $(window).scroll(function() {
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 100) {
                $('.fixedHeaderContainer').addClass('blog_header');
            }
            else {
                $('.fixedHeaderContainer').removeClass('blog_header');
            }
        });
    }
    handleClick(href) {
        $('html,body').animate({scrollTop: $('#'+href).offset().top}, 200, function() {
            $('#mail_content').focus();
        });
    }
    render() {
        const { articles, projects } = this.props;
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section className="first_section">
                        <div id="social_media">
                            <div className="icons_gatherer">
                                <a href="#" className="icon-button dribbble"><i className="fab fa-dribbble"></i><span></span></a>
                                <a href="#" className="icon-button behance"><i className="fab fa-behance"></i><span></span></a>
                                <a href="#" className="icon-button linkedin"><i className="fab fa-linkedin-in"></i><span></span></a>
                                <a href="#" className="icon-button instagram"><i className="fab fa-instagram"></i><span></span></a>
                                <a href="#" className="icon-button facebook"><i className="icon-facebook"></i><span></span></a>
                                <a href="# " className="icon-button scroll">
                                    
                                </a>
                            </div>
                        </div>
                        <div className="wrapper_full">
                            
                        </div>
                    </section>
                </Slide>
                <Slide>
                    <Footer/>
                </Slide>
            </FullPage>
        )
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);