import LandingHeader from "../components/landingPage/LandingHeader";
import LandingHero from "../components/landingPage/LandingHero";
import LandingFeatures from "../components/landingPage/LandingFeatures";
import TerminalMockup from "../components/landingPage/TerminalMockup";
import LandingFooter from "../components/landingPage/LandingFooter";

export default function LandingPage() {
  // ...auth check + redirect logic...

  return (
    <div>
      <LandingHeader />
      <hr />
      <main>
        <LandingHero />
        <hr />
        <LandingFeatures />
      </main>
      <hr />
      <TerminalMockup />
      <hr />
      <LandingFooter />
    </div>
  );
}