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

import minibus1 from '../../minibus1.jpg';
import minibus2 from '../../minibus2.jpg';
import minibus3 from '../../minibus3.jpg';
import minibus4 from '../../minibus4.jpg';
import minibus5 from '../../minibus5.jpg';
import minibus6 from '../../minibus6.jpg';
import minibus7 from '../../minibus7.jpg';
import minibus8 from '../../minibus8.jpg';
import minibus9 from '../../minibus9.jpg';
import minibus10 from '../../minibus10.jpg';
import minibus11 from '../../minibus11.jpg';

var _ = require('lodash');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        // axios operations
    }
    componentDidMount() {
        
    }
    handleClick(href) {
        $('html,body').animate({scrollTop: $('#'+href).offset().top}, 200, () => {
            $('#mail_content').focus();
        });
    }
    render() {
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section className="first_section_home">
                        <div className="wrapper_full">
                            <h1>Transport.</h1>
                            <div className="text">
                                <h2>Courtes ou longues distances.</h2>
                                <h2>Vous amener à destination beaucoup plus rapidement.</h2>
                            </div>
                            <h1>LUKUS Transport</h1>
                            <div className="slider">
                                <ul>
                                    <li><img src={minibus1}/></li>
                                    <li><img src={minibus2}/></li>
                                    <li><img src={minibus3}/></li>
                                    <li><img src={minibus4}/></li>
                                    <li><img src={minibus5}/></li>
                                    <li><img src={minibus6}/></li>
                                    <li><img src={minibus4}/></li>
                                    <li><img src={minibus8}/></li>
                                    <li><img src={minibus9}/></li>
                                    <li><img src={minibus10}/></li>
                                    <li><img src={minibus11}/></li>
                                </ul>
                            </div>
                            <button id="reach_out_button" onClick={() => this.handleClick('footer_to')} type="button">
                                <span>
                                    <span>
                                        <span data-attr-span="Contactez Nous.">
                                            Contactez Nous.
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <div>
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a href="https://www.instagram.com/boutaleblcoder/">Instagram</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://fb.me/boutaleblcoder">Facebook</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://www.behance.net/boutaleblcoder/">Behance</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </Slide>
                <Slide>
                    <section className="second_section_home">
                        <div className="wrapper_full">
                            <h1>Voyagez confortablement, en toute sécurité et avec efficacité.</h1>
                            <div>
                                <span>
                                    <i className="fas fa-briefcase"></i>
                                    <p><b>Transport du personnel</b><br></br><br></br>Des véhicules de haute gamme mis à votre disposition<br></br>Pour Assurer le transport, le déplacement et l’acheminement de votre personnel vers votre lieu d’activité.</p>
                                </span>
                                <span>
                                    <i className="fas fa-suitcase-rolling"></i>
                                    <p><b>Transport touristique</b><br></br><br></br>Vous accompagner lors de vos transferts, les voyages organisés et les circuits touristiques.<br></br>Individuel, en groupes ou voyage en famille.</p>
                                </span>
                            </div>
                            <h1>A propos de nous.</h1>
                            <div>
                                <div className="text">
                                    <h4>Ce que nous représentons.</h4>
                                    <h4>Sté Transport Lukus S.A.R.L</h4>
                                    <p>Notre société de transport est une entreprise de transport pratique, dotée d'excellents moyens et méthodes permettant le transfert des travailleurs, des employés, des touristes et des élèves, jeunes ou âgés, d'un lieu à un autre.</p>
                                    <p>Des méthodes développés et configurés pour offrir le confort et le luxe au voyages à courtes ou longues distances, pour assurer la sécurité d'abord et vous amener à destination beaucoup plus rapidement.</p>
                                    <p>Notre objectif est que vous arriviez dans une meilleure humeur et forme.</p>
                                </div>
                                <div className="squares">
                                    <span>
                                        <i className="far fa-clock"></i>
                                        <h5>Ponctualité</h5>
                                    </span>
                                    <span>
                                        <i className="fas fa-map-pin"></i>
                                        <h5>Optimisation</h5>
                                    </span>
                                    <span>
                                        <i className="fas fa-user-shield"></i>
                                        <h5>Securité</h5>
                                    </span>
                                    <span>
                                        <i className="fas fa-user-tie"></i>
                                        <h5>Expérience</h5>
                                    </span>
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

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);