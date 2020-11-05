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

var _ = require('lodash');

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // axios operations
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section className="first_section_home">
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

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);