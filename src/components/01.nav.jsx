import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../store/01.auth.store";
import Theme from "./theme";

const Nav = () => {
  const { know, knowMe, logOut } = userAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    knowMe();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logOut();
      navigate("/login-signup");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav>
      <Link to="/">prepAI</Link>

      {" | "}

      <Link to="/features">Home</Link>

      {" | "}

      <Link to="/history">History</Link>

      {" | "}

      <Link to="/createNew">Create Interview</Link>

      {" | "}

      <Link to="/resume">Resume-Review</Link>
      {" | "}
      <Theme />

      {" | "}

      {know?.user ? (
        <>
          <span>{know.user.email}</span>

          {" | "}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </>
      ) : (
        <Link to="/login-signup">Login</Link>
      )}
    </nav>
  );
};

export default Nav;