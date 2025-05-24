// Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/SupabaseClient";
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // checkbox status
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (remember) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }


        if (!existingProfile) {
          await supabase.from("profiles").insert([
            {
              id: user.id,
              username: "Usuario nuevo",
            },
          ]);
        }
      }

      setError(null);
      navigate("/character-selection");
    }
  };


  return (
    <main>
      <section className="form-box">
        <h2 className="h2_login">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email:</label><br /><br />
            <input
              type="email"
              id="login-email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password:</label> <br /><br />
            <input
              type="password"
              id="login-password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="checkbox"
              id="cbox_login"
              className="cbox_login"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor="cbox_login"><b> Remember login details</b></label>

          </div>

          <div className="form-button-container">
            <button type="submit" className="button_login">Login</button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        <div>
          <p><b>Don't have an account? Click</b> <Link to="/register" className="button_register"><b>here</b></Link><b>.</b></p>
        </div>
      </section>
    </main>
  );
};

export default Login;
