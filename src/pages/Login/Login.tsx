import React from "react";
import './Login.scss';
import { Link } from "react-router-dom";

const Login: React.FC = () => {

  return (
    <main>
      <section className="form-box">
        <h2 className="h2_login">Login</h2>
        <form action="#" method="post">
          <div className="form-group">
            <label htmlFor="login-email">Email:</label><br /><br />
            <input
              type="email"
              id="login-email"
              name="login-email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password:</label> <br /><br />
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
            <label htmlFor="cbox_login" ><b> Remember login details</b> </label><br />
          </div>

          <div className="form-button-container">
            <Link to="/character-selection" className="button_login">Login</Link>
          </div>
        </form>

        <div>
          <p><b> Don't have an account? Click</b> <Link to="/register" className="button_register"><b> here</b> </Link><b> .</b> </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
