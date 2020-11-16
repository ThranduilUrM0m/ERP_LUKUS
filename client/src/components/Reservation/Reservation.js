import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import Footer from '../Footer/Footer';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';

class Reservation extends React.Component {
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
					<section className="first_section_reservation">
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
  
export default Reservation