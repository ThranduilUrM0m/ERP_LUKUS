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
                            {/* Picture of the fleet */}
                        </div>
                    </section>
				</Slide>
                <Slide>
					<section className="second_section_vehicules">
                        <div className="wrapper_full">
                            <h1>Des vehicules adaptés aux toutes sortes de besoins pour vous.</h1>
                            <div>
                                <span>
                                    <p>Notre flotte respecte dans tous les cas la réglementation.<br></br>La variété de notre gamme de véhicules assure une réponse rapide face à vos demandes quoique imprévue d´un service extraordinaire,<br></br>Le tout avec la qualité requise et dans un délai minimum.</p>
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
