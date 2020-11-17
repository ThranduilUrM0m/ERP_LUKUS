import React from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import * as $ from "jquery";
import 'bootstrap';

var _ = require('lodash');

class Vehicules extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        // axios operations
    }
    componentDidMount() {
        
    }
    render() {
        return(
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
                        
                            {/* Slider of all the vehicules categories */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Vehicules);
