import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/01.auth.store";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StartInterviewCard from "../components/dashboard/StartInterviewCard";
import FeatureInfoList from "../components/dashboard/FeatureInfoList";
import DashboardFooter from "../components/dashboard/DashboardFooter";

const Features = () => {
  const { know, knowMe } = userAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await knowMe();
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked && !know?.user) {
      navigate("/login-signup");
    }
  }, [authChecked, know, navigate]);

  // Don't render anything until the auth check has actually resolved,
  // and don't render the dashboard for a logged-out user (the effect above
  // will redirect them away).
  if (!authChecked || !know?.user) {
    return null;
  }

  const userName = know?.user?.displayName || know?.user?.email?.split('@')[0] || "Guest";

  return (
    <div>
      <WelcomeSection userName={userName} />
      <StartInterviewCard />
      <FeatureInfoList />
      <DashboardFooter />
    </div>
  );
};

export default Features;
