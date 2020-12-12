import React from 'react';
import axios from 'axios';
import Swiper, { Navigation, Pagination } from 'swiper';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import * as $ from "jquery";
import 'bootstrap';

var _ = require('lodash');

class Vehicules extends React.Component {
    constructor(props) {
        super(props);
        this._handleDrag = this._handleDrag.bind(this);
    }
    componentWillMount() {
        const { onLoadVehicule } = this.props;
        const self = this;
        axios('/api/vehicule')
            .then((response) => {
                onLoadVehicule(response.data);
                function runAfterElementExists(jquery_selector, callback) {
                    var checker = window.setInterval(function () {
                        if ($(jquery_selector).length) {
                            clearInterval(checker);
                            callback();
                        }
                    }, 200);
                }
                runAfterElementExists(".second_section_vehicules .vehicules_slider_wrapper_cards_item", function () {
                    self._handleDrag();
                });
            })
            .catch((errors) => {
                console.log(errors);
            });

    }
    componentDidMount() {

    }
    _handleDrag() {
        // configure Swiper to use modules
        Swiper.use([Navigation, Pagination]);

        var mySwiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            direction: 'horizontal',
            grabCursor: true,
            slidesPerView: 3.25,
            centeredSlides: false,
            centeredSlidesBounds: false,
            paginationClickable: true,
            centerInsufficientSlides: false,
            spaceBetween: 0,
            autoResize: false,
            observer: true,
            watchOverflow: true,
            variableWidth: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 3,
                slideShadows: false
            },
            simulateTouch: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        $(window).resize(function () {
            if (window.innerHeight > window.innerWidth) {
                if ($(window).width() <= 640) {
                    mySwiper.params.slidesPerView = 1.25;
                    mySwiper.update();
                }
                if ($(window).width() <= 768) {
                    mySwiper.params.slidesPerView = 2.25;
                    mySwiper.update();
                }
            } else {
                if ($(window).width() <= 768) {
                    mySwiper.params.slidesPerView = 2.25;
                    mySwiper.update();
                }
            }
        });
        $(window).trigger('resize');
    }
    render() {
        const {
            _vehicules
        } = this.props;
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section className="first_section_vehicules">
                        <div className="wrapper_full">
                            <div className="text">
                                <h1>Nos véhicules vous lanceront<br></br>dans une aventure inoubliable.</h1>
                                <div>
                                    <span>
                                        <p>Nous avons un large choix de véhicules qui répondra à chacun de vos besoins.</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </Slide>
                <Slide>
                    <section className="second_section_vehicules">
                        <div className="wrapper_full">
                            <h1>Des vehicules adaptés<br></br>aux toutes sortes de besoins pour vous.</h1>
                            <div>
                                <span>
                                    <p>Notre flotte respecte dans tous les cas la réglementation.<br></br>La variété de notre gamme de véhicules assure une réponse rapide<br></br>face à vos demandes quoique imprévue d´un service extraordinaire,<br></br>Le tout avec la qualité requise et dans un délai minimum.</p>
                                </span>
                            </div>
                            <div className="vehicules_slider_wrapper swiper-container">
                                <div className="vehicules_slider_wrapper_cards swiper-wrapper">
                                    {
                                        _.map(_vehicules, (_v, index) => {
                                            return (
                                                <div className="vehicules_slider_wrapper_cards_item swiper-slide" data-name={_v._vehicule_categorie._vehicule_categorie_nom} id="vehicules_slider_wrapper_cards_item" key={index}>
                                                    <div className='vehicule_item'>
                                                        <div className={"col card card_" + index} data-title={_.snakeCase(_v._vehicule_marque)} data-index={_.add(index, 1)}>
                                                            <div className="card-bg" style={{backgroundImage: "url(" + _v._vehicule_image + ")"}}></div>
                                                            <div className="card-body">
                                                                <h1>{_v._vehicule_marque}</h1>
                                                                <h5>{_v._vehicule_categorie._vehicule_categorie_nom}</h5>
                                                                <p>Voiture à {_v._vehicule_categorie_nombrepassagers} places.</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_shadower"></div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="slider-btn btn-l swiper-button-prev"><i className="fas fa-long-arrow-alt-left"></i></div>
                                <div className="slider-btn btn-r swiper-button-next"><i className="fas fa-long-arrow-alt-right"></i></div>
                            </div>
                        </div>
                    </section>
                </Slide>
                <Slide>
                    <Footer />
                </Slide>
            </FullPage>
        )
    }
}

const mapStateToProps = state => ({
    _vehicules: state.home._vehicules,
});

const mapDispatchToProps = dispatch => ({
    onLoadVehicule: data => dispatch({ type: 'VEHICULE_PAGE_LOADED', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicules);
