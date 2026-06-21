// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const base_url = "https://prep-ai-backend-nine.vercel.app";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const at = params.get("at");
        const rt = params.get("rt");

        if (!at || !rt) {
            navigate("/login-with-google");
            return;
        }

        // Set cookies via direct fetch (not redirect)
        axios.get(`${base_url}/auth/setTokens?at=${at}&rt=${rt}`, {
            withCredentials: true
        }).then(() => {
            navigate("/features");
        }).catch(() => {
            navigate("/login-with-google");
        });
    }, []);

    return <div>Logging you in...</div>;
}