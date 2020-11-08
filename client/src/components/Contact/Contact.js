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
        $('header').addClass('dark_mode');
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
                            <div className="text">
                                {/* I Dunno what to put here dude */}
                                <div className="email_me">
                                    <h6>Pour nous contactez !</h6>
                                    <button id="reach_out_button" onClick={() => this.handleClick('footer_to')} type="button">
                                        <span>
                                            <span>
                                                <span data-attr-span="Contactez Nous.">
                                                    Contactez Nous.
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                </div>
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