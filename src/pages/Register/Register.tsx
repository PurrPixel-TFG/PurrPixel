import React from "react";
import './Register.scss';
import { Link } from "react-router-dom";

const Registrar: React.FC = () => {

    /**
     * Ojo, aquí cambia la id de todo con _register
     */

    return (
        <>
            <main>
                <section className="form-box">

                    <h2 className="h2_register">Registro</h2>

                    <form action="#" method="post">

                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label><br /><br />
                            <input
                                type="text"
                                id="nombre_register"
                                name="nombre"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido1">Primer apellido:</label><br /><br />
                            <input
                                type="text"
                                id="apellido1_register"
                                name="apellido1"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido2">Segundo apellido:</label><br /><br />
                            <input
                                type="text"
                                id="apellido2_register"
                                name="apellido2"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-email">Correo Electrónico:</label><br /><br />
                            <input
                                type="email"
                                id="email_register"
                                name="login-email"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Elige una contraseña:</label><br /><br />
                            <input
                                type="password"
                                id="password_register"
                                name="login-password"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Repita la contraseña:</label><br /><br />
                            <input
                                type="password"
                                id="password_register"
                                name="login-password"
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <input type="checkbox" className="cbox_terminos-condiciones" value="cbox_terminos-condiciones" /> <b> He leído y acepto los </b> <Link to="/terminos-condiciones" className="terminos-condiciones"><b> términos y condiciones.</b> </Link>
                        </div>

                        <div className="form-button-container">
                            <Link to="/main-page" className="button_iniciar-sesion">Crear cuenta</Link>
                        </div>

                    </form>

                </section>
            </main>
        </>
    );
};

export default Registrar;