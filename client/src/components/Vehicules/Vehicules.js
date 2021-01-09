import React from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import * as $ from "jquery";
import 'bootstrap';

// import Swiper core and required components
import SwiperCore, { Scrollbar, A11y, EffectCoverflow, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';

// install Virtual module
SwiperCore.use([Scrollbar, A11y, Virtual, EffectCoverflow]);

var _ = require('lodash');

class Vehicules extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { onLoadVehicule } = this.props;
        const self = this;
        axios('/api/vehicule')
            .then((response) => {
                onLoadVehicule(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

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
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={4.25}
                                direction='horizontal'
                                effect='coverflow'
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 0,
                                    modifier: 3,
                                    slideShadows: false
                                }}
                                grabCursor='true'
                                watchOverflow='true'
                                slideToClickedSlide='true'
                                observer='true'
                                scrollbar={{ draggable: true }}
                            >
                                {
                                    _.map(_vehicules, (_v, index) => {
                                        return (
                                            <SwiperSlide virtualIndex={index}>
                                                <div className={"col card card_" + index} data-title={_.snakeCase(_v._vehicule_marque)} data-index={_.add(index, 1)}>
                                                    <div className="card-bg" style={{ backgroundImage: "url(" + _v._vehicule_image ? 'https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202018/Cars/June/CR-Cars-InlineHero-2019-BMW-X5-driving-6-18' : _v._vehicule_image + ")" }}></div>
                                                    <div className="card-body">
                                                        <h1>{_v._vehicule_marque}</h1>
                                                        <h5>{_v._vehicule_model}</h5>
                                                        <p>Voiture à {_v._vehicule_categorie._vehicule_categorie_nombrepassagers} places.</p>
                                                    </div>
                                                </div>
                                                <div className="card_shadower"></div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
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
