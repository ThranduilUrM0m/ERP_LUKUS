import React from "react";
import { connect } from 'react-redux';
import API from "../../utils/API";
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import 'bootstrap';
import * as $ from "jquery";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_user_email: '',
			_user_password: '',
			modal_msg: '',
		};
		this.send_login = this.send_login.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		if (localStorage.getItem('_user_email')) {
			window.location = "/dashboard";
		}
	}
	async send_login() {
		let self = this;
		const { _user_email, _user_password } = this.state;
		await API.login(_user_email, _user_password)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem('_user_email', res.data._user_email);
				localStorage.setItem('_user_username', res.data._user_username);
				window.location = "/dashboard";
			})
			.catch((error) => {
				self.setState({
					modal_msg: error.response.data.text
				}, () => {
					$('#login_modal').modal('toggle');
				});
			});
	}
	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	render() {
		const { _user_email, _user_password, modal_msg } = this.state;
		return (
			<FullPage>
				<Slide>
					<section className="first_section_login">
						<div className="wrapper_full">
							<div className="modal fade" id="login_modal" tabIndex="-1" role="dialog" aria-labelledby="signup_modalLabel" aria-hidden="true">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-body">
											<a title="Close" className="modal-close" data-dismiss="modal">Close</a>
											<h5 className="modal-title" id="signup_modalLabel">Hello!</h5>
											<div>{modal_msg}</div>
										</div>
									</div>
								</div>
							</div>
							<div className="Sidebar">
								<div className="wrap">
									<div className="Head_Login">
										<div>
											<h3>Login</h3>
										</div>
									</div>
									<div className="Login">
										<div className='row'>
											<div className='input-field col s12'>
												<input
													className='validate form-group-input'
													type='email'
													name='_user_email'
													id='_user_email'
													required="required"
													value={_user_email}
													onChange={this.handleChange}
												/>
												<label htmlFor='_user_email' className={_user_email ? 'active' : ''}>Email</label>
												<div className="form-group-line"></div>
											</div>
										</div>
										<div className='row'>
											<div className='input-field col s12'>
												<input
													className='validate form-group-input'
													type='password'
													name='_user_password'
													id='_user_password'
													required="required"
													value={_user_password}
													onChange={this.handleChange}
												/>
												<label htmlFor='_user_password' className={_user_password ? 'active' : ''}>Password</label>
												<div className="form-group-line"></div>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<button
													className="pull-right"
													type="submit"
													name='btn_login'
													onClick={this.send_login}
												>
													<span>
														<span>
															<span data-attr-span="login.">
																login.
															</span>
														</span>
													</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="Content">
								<div className="card">

								</div>
							</div>
						</div>
					</section>
				</Slide>
			</FullPage>
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);