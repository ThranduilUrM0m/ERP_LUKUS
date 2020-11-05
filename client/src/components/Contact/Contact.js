import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import Footer from '../Footer/Footer';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        $('.fixedHeaderContainer').addClass('dark_mode');
    }
    handleClick(href) {
        $('html,body').animate({scrollTop: $('#'+href).offset().top}, 200, function() {
            $('#mail_content').focus();
        });
    }
    render() {
        return (
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_contact">
                        <div className="wrapper_full">
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
                            <div className="text">
                                <div className="email_me">
                                    <h6>For Inquiries</h6>
                                    <button id="reach_out_button" onClick={() => this.handleClick('footer_to')} type="button">
                                        <span>
                                            <span>
                                                <span data-attr-span="Reach Out.">
                                                    Reach Out.
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                </div>
                                <h1 className="talk_to_me">Talk To Us Now.</h1>
                            </div>
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
  
export default Contact