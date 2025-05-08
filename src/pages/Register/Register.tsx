import React from "react";
import './Register.scss';
import '../Login/Login.scss'
import { Link } from "react-router-dom";

const Register: React.FC = () => {

    return (
        <>
            <main>
                <section className="form-box">

                    <h2 className="h2_register">Register</h2>

                    <form action="#" method="post">

                        <div className="form-group">
                            <label htmlFor="name">Name:</label><br /><br />
                            <input
                                type="text"
                                id="register_name"
                                name="name"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="1st-surname">First surname:</label><br /><br />
                            <input
                                type="text"
                                id="register_1st_surname"
                                name="1st_surname"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="2nd-surname">Second surname:</label><br /><br />
                            <input
                                type="text"
                                id="register_2nd_surname"
                                name="2nd_surname"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label><br /><br />
                            <input
                                type="email"
                                id="register_email"
                                name="email"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Choose a password:</label><br /><br />
                            <input
                                type="password"
                                id="register_password"
                                name="password"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="verify_password">Repeat password:</label><br /><br />
                            <input
                                type="password"
                                id="verify_password"
                                name="verify_password"
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <input type="checkbox" className="cbox_terms" />
                            <span className="text-terms">
                                I have read and accept the{" "}
                                <Link to="/terms-and-conditions" className="read-terms">
                                    terms and conditions
                                </Link>.
                            </span>

                        </div>

                        <div className="form-button-container">
                            <Link to="/character-selection" className="button_new_register">Create account</Link>
                        </div>

                    </form>

                </section>
            </main>
        </>
    );
};

export default Register;