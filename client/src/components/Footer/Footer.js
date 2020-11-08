import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'whatwg-fetch';
import API from '../../utils/API';
import * as $ from "jquery";
import 'bootstrap';
import 'css-doodle';

var _ = require('lodash');

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail_username : '',
            mail_location: '',
            mail_email: '',
            mail_phone: '',
            mail_content: '',
            window_height: '',
            window_width: '',
        }
        this._handleAlphabet = this._handleAlphabet.bind(this);
        this.send_mail = this.send_mail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        // axios operations
    }
    componentDidMount() {
        const self = this;
        $(document).ready(function () {
            self._handleAlphabet();
        });
    }
    _handleAlphabet() {
        var win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            x = win.innerWidth || docElem.clientWidth || body.clientWidth,
            y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
        var gridWidth;
        var gridHeight;
        var letterWidth = _.round(docElem.clientWidth / _.round(docElem.clientWidth / 30)); // @todo: make this dynamic
        var letterHeight = _.round(docElem.clientWidth / _.round(docElem.clientWidth / 30)); // @todo: make this dynamic
        var totalLetters;
        var letterArray = [];
        var currentLetters = 0;
        var resizeCount = 0;
        
        // the unicode values that we want to loop through (A-Z)
        // http://www.codingforums.com/showpost.php?s=ca38992f8716f43d325c12be6fc0198b&p=843844&postcount=3
        
        var charCodeRange = {
            start: 65,
            end: 90
        };
        
        // get the grid's width and height
        
        function getDimensions(){
            gridWidth = docElem.clientWidth;
            gridHeight = docElem.clientHeight;
        }
        
        // get the total possible letters needed to fill the grid
        // and store that in totalLetters
        
        function getTotalLetters(){
            var multiplierX = Math.round(gridWidth / letterWidth);
            var multiplierY = Math.round(gridHeight / letterHeight); 
            totalLetters = Math.round(multiplierX * multiplierY);
            //console.log('multiplierX: '+multiplierX, '\nmultiplierY: '+multiplierY, '\ntotalLetters: '+totalLetters);
        }
        
        // loop through the unicode values and push each character into letterArray
        
        function populateLetters() {
            for (var i = charCodeRange.start; i <= charCodeRange.end; i++) {
                letterArray.push(String.fromCharCode(i));
            }
        }
        
        // a function to loop a given number of times (value), each time
        // appending a letter from the letter array to the grid
        
        function drawLetters(value){
            var text;
            var span;
            var count = 0;
        
            for (var letter=0; letter <= value; letter++) {
                text = document.createTextNode(letterArray[count]);
                span = document.createElement('span');
                span.appendChild(text);
                $('.letter-grid').append(span);
                count++;
            
                // if our count equals the length of our letter array, then that
                // means we've reached the end of the array (Z), so we set count to 
                // zero again in order to start from the beginning of the array (A).
                // we keep looping over the letter array 'value' number of times.
            
                if (count === letterArray.length) {
                    count = 0;
                }
            
                // if our for counter var (letter) equals the passed in value argument
                // then we've finished our loop and we throw a class onto the grid element
                
                if (letter === value) {
                    $('.letter-grid').addClass('js-show-letters');
                }
            }
        }
        
        // get the length of the grid.find('span') jQuery object
        // essentially the current number of letters in the grid at this point
        
        function getCurrentLetters(){
            currentLetters = $('.letter-grid').find('span').length;
        }
        
        function init() {
            populateLetters();
            getDimensions();
            getTotalLetters();
            drawLetters(totalLetters);
            getCurrentLetters();
        }
        
        function onResize() {
            resizeCount++;
            getDimensions();
            getTotalLetters();
            if (currentLetters < totalLetters) {
                var difference = totalLetters - currentLetters;
                drawLetters(difference);
            }            
            getCurrentLetters();
        }
        
        init();
        
        window.addEventListener('resize', _.debounce(onResize, 100));
    }
    async send_mail() {
        const { mail_username, mail_location, mail_email, mail_phone, mail_content } = this.state;
        if (!mail_username || mail_username.length === 0) return;
        if (!mail_email || mail_email.length === 0) return;
        if (!mail_content || mail_content.length === 0) return;
        try {
            const { data } = await API.send_mail({ mail_username, mail_location, mail_email, mail_phone, mail_content });
            $('#mailSentModal').modal('toggle');
            $('#mailSentModal .modal-close').click(() => {
                this.setState({
                    mail_username : '',
                    mail_location: '',
                    mail_email: '',
                    mail_phone: '',
                    mail_content: '',
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return (
            <div className="footer" id="footer_to">
                <div className="modal fade" id="mailSentModal" tabIndex="-1" role="dialog" aria-labelledby="mailSentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                <h5 className="modal-title" id="mailSentModalLabel">Voilà!</h5>
                                <div>Your mail was sent, we thank you for trusting us, we'll reach out to you before you even know it.</div>
                                <div>How about you joins us, not only you can give a feedback to the post you're reading, but you can discover much more about out community.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="letter-grid"></div>
                <div className="wrapper">
                    <div className="top_shelf">
                        <div className="first_box">
                            <div>
                                <h5>Information.</h5>
                            </div>
                            <div>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Chaabane 2 n456, 92000 Larache, Morocco</span>
                            </div>
                            <div>
                                <i className="fas fa-phone"></i>
                                <span>(+212) 6 54 52 84 92</span>
                            </div>
                            <div>
                                <i className="fas fa-envelope"></i>
                                <span>contact@boutaleb.dev</span>
                            </div>
                        </div>
                        <div className="second_box">
                            <div>
                                <h5>Navigation.</h5>
                            </div>
                            <div>
                                <ul>
                                    <li key={0}>
                                        <NavLink to='/vehicules' activeClassName='is-active'>
                                            <span>Nos Véhicules.</span>
                                        </NavLink>
                                    </li>
                                    <li key={1}>
                                        <NavLink to='/reservation' activeClassName='is-active'>
                                            <span>Reservation.</span>
                                        </NavLink>
                                    </li>
                                    <li key={2}>
                                        <NavLink to='/contact' activeClassName='is-active'>
                                            <span>Contactez Nous.</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="third_box">
                            
                        </div>
                        <div className="fourth_box">
                            <div>
                                <h5>Localisation.</h5>
                            </div>
                            <div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417465.0584163796!2d-6.431550979614281!3d35.17044062975635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x828aa5eacb28a3fc!2slukus%20touristique!5e0!3m2!1sfr!2sma!4v1604831018991!5m2!1sfr!2sma" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="mail-modal">
                        <div className="modal-inner">
                            <div className="modal-left">
                                
                            </div>
                            <div className="modal-content">
                                <form className="mail_form">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input mail_username" 
                                                id="mail_username" 
                                                type="text" 
                                                name="mail_username" 
                                                required="required"
                                                value={this.state.mail_username} 
                                            onChange={this.handleChange}
                                            />
                                            <label htmlFor='mail_username'>username*</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input mail_location" 
                                                id="mail_location" 
                                                type="text" 
                                                name="mail_location"
                                                value={this.state.mail_location} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='mail_location'>address</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input mail_email" 
                                                id="mail_email" 
                                                type="text" 
                                                name="mail_email" 
                                                required="required"
                                                value={this.state.mail_email} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='mail_email'>email*</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input mail_phone" 
                                                id="mail_phone" 
                                                type="text" 
                                                name="mail_phone" 
                                                value={this.state.mail_phone} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='mail_phone'>phone</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea 
                                                className="validate form-group-input materialize-textarea mail_content" 
                                                id="mail_content" 
                                                name="mail_content" 
                                                required="required"
                                                value={this.state.mail_content} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='mail_content'>what can i do for you ?</label>
                                            <div className="form-group-line textarea_line"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <button 
                                                className="pull-right" 
                                                type="submit"
                                                name='btn_login' 
                                                onClick={this.send_mail}
                                            >
                                                <span>
                                                    <span>
                                                        <span data-attr-span="Submit.">
                                                            Submit.
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="low_shelf">
                        <span className="push-left">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#">Instagram</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">Facebook</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">Behance</a>
                                </li>
                                <li className="list-inline-item">
                                    <i className="far fa-copyright"></i>
                                    <span>{moment().format('YYYY')}</span> - With <i className="fas fa-heart"></i> from Zakariae boutaleb.
                                </li>
                            </ul>
                        </span>
                        <span className="push-right">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="# ">Legal Notice</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="# ">Newsroom</a>
                                </li>
                                <li className="list-inline-item">
                                    <span className="name">Lukus.</span>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);