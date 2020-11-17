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
        this.state = {
            _reservation_nombreadultes : '',
            _reservation_nombreenfants: '',
            _reservation_datereservation: '',
            _reservation_commentaire: '',
            _voyage_datedepart: '',
            _voyage_datearrive: '',
            _voyage_lieudepart: '',
            _voyage_lieuarrive: '',
            Vehicule: '',
            _client_prenomcontact: '',
            _client_nomcontact: '',
            _client_adresse: '',
            _client_telephone: '',
            _client_email: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        $('.fixedHeaderContainer').addClass('dark_mode');
    }
    handleClick(href) {
        $('html,body').animate({scrollTop: $('#'+href).offset().top}, 200, function() {
            $('#mail_content').focus();
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return (
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_reservation">
                        <div className="wrapper_full">
                            <div className="leftside">

                            </div>
                            <form className="mail_form">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _voyage_datedepart" 
                                            id="_voyage_datedepart" 
                                            type="text" 
                                            name="_voyage_datedepart" 
                                            value={this.state._voyage_datedepart} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_voyage_datedepart'>_voyage_datedepart</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _voyage_datearrive" 
                                            id="_voyage_datearrive" 
                                            type="text" 
                                            name="_voyage_datearrive" 
                                            value={this.state._voyage_datearrive} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_voyage_datearrive'>_voyage_datearrive</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _voyage_lieudepart" 
                                            id="_voyage_lieudepart" 
                                            type="text" 
                                            name="_voyage_lieudepart" 
                                            value={this.state._voyage_lieudepart} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_voyage_lieudepart'>_voyage_lieudepart</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _voyage_lieuarrive" 
                                            id="_voyage_lieuarrive" 
                                            type="text" 
                                            name="_voyage_lieuarrive" 
                                            value={this.state._voyage_lieuarrive} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_voyage_lieuarrive'>_voyage_lieuarrive</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input Vehicule" 
                                            id="Vehicule" 
                                            type="text" 
                                            name="Vehicule" 
                                            value={this.state.Vehicule} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='Vehicule'>Vehicule</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input _client_prenomcontact" 
                                                id="_client_prenomcontact" 
                                                type="text" 
                                                name="_client_prenomcontact" 
                                                value={this.state._client_prenomcontact} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='_client_prenomcontact'>_client_prenomcontact</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                        <div className="input-field col s6">
                                            <input 
                                                className="validate form-group-input _client_prenomcontact" 
                                                id="_client_nomcontact" 
                                                type="text" 
                                                name="_client_nomcontact" 
                                                value={this.state._client_nomcontact} 
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor='_client_nomcontact'>_client_nomcontact</label>
                                            <div className="form-group-line"></div>
                                        </div>
                                    </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _client_adresse" 
                                            id="_client_adresse" 
                                            type="text" 
                                            name="_client_adresse" 
                                            value={this.state._client_adresse} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_client_adresse'>_client_adresse</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _client_telephone" 
                                            id="_client_telephone" 
                                            type="text" 
                                            name="_client_telephone" 
                                            value={this.state._client_telephone} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_client_telephone'>_client_telephone</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _client_email" 
                                            id="_client_email" 
                                            type="text" 
                                            name="_client_email" 
                                            value={this.state._client_email} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_client_email'>_client_email</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate form-group-input _client_prenomcontact" 
                                            id="_client_prenomcontact" 
                                            type="text" 
                                            name="_client_prenomcontact" 
                                            value={this.state._client_prenomcontact} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_client_prenomcontact'>_client_prenomcontact</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _reservation_nombreadultes" 
                                            id="_reservation_nombreadultes" 
                                            type="text" 
                                            name="_reservation_nombreadultes" 
                                            required="required"
                                            value={this.state._reservation_nombreadultes} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_reservation_nombreadultes'>_reservation_nombreadultes*</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                    <div className="input-field col s6">
                                        <input 
                                            className="validate form-group-input _reservation_nombreenfants" 
                                            id="_reservation_nombreenfants" 
                                            type="text" 
                                            name="_reservation_nombreenfants"
                                            value={this.state._reservation_nombreenfants} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_reservation_nombreenfants'>_reservation_nombreenfants</label>
                                        <div className="form-group-line"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea 
                                            className="validate form-group-input materialize-textarea _reservation_commentaire" 
                                            id="_reservation_commentaire" 
                                            name="_reservation_commentaire" 
                                            required="required"
                                            value={this.state._reservation_commentaire} 
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor='_reservation_commentaire'>_reservation_commentaire</label>
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