"use client"

import AboutSection from "./AboutSection";
import Footer from "./Footer";
import PersonalShopper from "./PersonalShopper";
import Featured from "./featured";
import Main from "./main";
import NavBar from "./navbar";
import Top from "./top";
import Trend from "./trend";
import SmoothScroll from "@/component/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative w-full">

        {/* Navbar fixed overlay */}
        <div className="fixed top-0 left-0 w-full z-50">
          <NavBar />
        </div>

        <Main />
        <Featured />
        <Trend />
        <AboutSection />
        <PersonalShopper />
        <Footer />

      </div>
    </SmoothScroll>
  );
}