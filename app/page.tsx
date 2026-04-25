"use client"

import Featured from "./featured";
import Main from "./main";
import NavBar from "./navbar";
import Top from "./top";
import Trend from "./trend";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Top announcement bar */}
      <Top />

      {/* Navbar + Hero stacked so navbar overlays hero */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-50">
          <NavBar />
        </div>
        <Main />
      </div>
      <Featured/>
      <Trend/>
    </div>
  )
}
