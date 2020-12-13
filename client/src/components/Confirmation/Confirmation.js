import React from 'react';
import axios from 'axios';
import API from "../../utils/API";
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import * as $ from "jquery";
import socketIOClient from "socket.io-client";

const socketURL =
    process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'localhost:8800';

const socket = socketIOClient(socketURL, { 'transports': ['websocket', 'polling'] });

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_msg: ''
        }
        this.confirmation = this.confirmation.bind(this);
    }
    componentWillMount() {
        let self = this;
        this.confirmation(self.props.match.params.token_id);
    }
    async confirmation(token) {
        let self = this;
        const { onSubmitNotification } = this.props;
        await API.confirmation({ token })
            .then((res) => {
                self.setState({
                    modal_msg: res.data.text
                }, () => {
                    socket.emit("USER_UPDATED", res.data.text);
                    $('#confirmation_modal').modal('toggle');
                    return axios.post('/api/notifications', {
                        type: 'Account verified',
                        description: 'Account with token \'' + token + '\' Verified.',
                        author: token
                    })
                        .then((res_n) => onSubmitNotification(res_n.data))
                        .catch(error => {
                            console.log(error)
                        });
                });
            })
            .catch((error) => {
                self.setState({
                    modal_msg: error.response.data.text
                }, () => {
                    $('#confirmation_modal').modal('toggle');
                });
            });
    }
    render() {
        const { modal_msg } = this.state;
        return (
            <FullPage>
                <Slide>
                    <section className="first_section_404">
                        <div className="wrapper_full">
                            <div className="_verification_message">
                                {modal_msg}
                            </div>
                        </div>
                    </section>
                </Slide>
            </FullPage>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSubmitNotification: data => dispatch({ type: 'SUBMIT_NOTIFICATION', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);