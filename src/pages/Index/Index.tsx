import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/SupabaseClient";
import './Index.scss';

const Index: React.FC = () => {

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/character-selection");
      }
    };
    checkSession();
  }, []);


  return (
    <>
      <main className="main_container">
        <Link to="/instructions" className="index_button index_button_instructions">
          Instructions
          <span className="hoverEffect">
            <div></div>
          </span>
        </Link>

        <Link to="/login" className="index_button index_button_start">
          Start
          <span className="hoverEffect">
            <div></div>
          </span>
        </Link>
      </main>

    </>
  );
};

export default Index;