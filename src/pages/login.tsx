import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {

  return (
    <main>
      <section className="form-box">
        <h2 className="h2_login">Iniciar sesión</h2>
        <form action="#" method="post">
          <div className="form-group">
            <label htmlFor="login-email">Correo Electrónico:</label><br /><br />
            <input
              type="email"
              id="login-email"
              name="login-email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Contraseña:</label> <br /><br />
            <input
              type="password"
              id="login-password"
              name="login-password"
              className="form-input"
              required
            />
          </div>

          <div>
            <input type="checkbox" className="cbox_login" value="cbox_login" />&nbsp;&nbsp;
            <label htmlFor="cbox_login" ><b> Recordar datos de acceso</b> </label><br />
          </div>

          <div className="form-button-container">
            <Link to="/main-page" className="button_iniciar-sesion">Iniciar sesión</Link>
          </div>
        </form>

        <div>
          <p><b> ¿No tienes una cuenta? Pincha </b> <Link to="/register" className="button_registrar"><b> aquí</b> </Link><b> .</b> </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
