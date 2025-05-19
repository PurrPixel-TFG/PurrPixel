// Register.tsx
import React, { useState } from "react";
import './Register.scss';
import '../Login/Login.scss';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/SupabaseClient";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname1, setSurname1] = useState("");
  const [surname2, setSurname2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username: name + " " + surname1,
        },
      ]);

      if (profileError) {
        console.error(profileError.message);
      }
    }

    setError(null);
    navigate("/character-selection");
  };

  return (
    <main>
      <section className="form-box">
        <h2 className="h2_register">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label><br /><br />
            <input
              type="text"
              id="register_name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="1st-surname">First surname:</label><br /><br />
            <input
              type="text"
              id="register_1st_surname"
              className="form-input"
              value={surname1}
              onChange={(e) => setSurname1(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="2nd-surname">Second surname:</label><br /><br />
            <input
              type="text"
              id="register_2nd_surname"
              className="form-input"
              value={surname2}
              onChange={(e) => setSurname2(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label><br /><br />
            <input
              type="email"
              id="register_email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Choose a password:</label><br /><br />
            <input
              type="password"
              id="register_password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="verify_password">Repeat password:</label><br /><br />
            <input
              type="password"
              id="verify_password"
              className="form-input"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input type="checkbox" className="cbox_terms" required />
            <span className="text-terms">
              I have read and accept the{" "}
              <Link to="/terms-and-conditions" className="read-terms">
                terms and conditions
              </Link>.
            </span>
          </div>

          <div className="form-button-container">
            <button type="submit" className="button_new_register">Create account</button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Register;
