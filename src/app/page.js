import About from "@/components/About";
import Art from "@/components/Art";
import Cocktails from "@/components/Cocktails";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Cocktails/>
        <About/>
        <Art/>
        <Menu/>
        <Contact/>


      </main>
    </>
  );
};

export default page;
